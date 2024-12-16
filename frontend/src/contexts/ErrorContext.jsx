import { createContext, useState } from "react";

const ErrorContext = createContext();

const ErrorProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const triggerError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  };

  const toExport = {
    errorMessage,
    setErrorMessage,
    triggerError,
  };

  return (
    <ErrorContext.Provider value={toExport}>{children}</ErrorContext.Provider>
  );
};

export { ErrorContext, ErrorProvider };
