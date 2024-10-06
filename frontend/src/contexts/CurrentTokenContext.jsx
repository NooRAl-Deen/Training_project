import { createContext, useState, useEffect } from "react";

const CurrentTokenContext = createContext();

const CurrentTokenProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || "";
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  let exportToken = {
    token,
    setToken,
    logout,
  };

  return (
    <CurrentTokenContext.Provider value={exportToken}>
      {children}
    </CurrentTokenContext.Provider>
  );
};

export { CurrentTokenContext, CurrentTokenProvider };
