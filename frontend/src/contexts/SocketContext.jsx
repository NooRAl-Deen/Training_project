import { createContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import useAuth from "@/hooks/useAuth";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const userId = user.id;
  const socket = useRef(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.current = io("ws://localhost:3000");

    if (userId) {
      socket.current.emit("addUser", userId);
    }

    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.current.disconnect();
    };
  }, [userId]);

  const sendMessage = (data) => {
    socket.current.emit("sendMessage", data);
  };

  const onMessage = (callback) => {
    socket.current.on("getMessage", callback);
  };

  let dataToExport = {
    socket: socket.current,
    onlineUsers,
    sendMessage,
    onMessage,
  };

  return (
    <SocketContext.Provider value={dataToExport}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
