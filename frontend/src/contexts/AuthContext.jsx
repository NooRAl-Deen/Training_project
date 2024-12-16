import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : {};
  });

  // const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const logout = () => {
    setUser({});
    localStorage.removeItem("user");
    // navigate('/login')
  };

  let dataToExport = {
    user,
    setUser,
    logout,
  };

  return (
    <AuthContext.Provider value={dataToExport}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
