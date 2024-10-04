import { createContext, useState } from "react";


const ErrorContext = createContext()

const ErrorProvider = ({ children }) => {
    const [errorMessage, setErrorMessage] = useState('')

    const triggerError = (message) => {
        setErrorMessage(message);
        // Clear the error after a few seconds (optional)
        setTimeout(() => {
          setErrorMessage('');
        }, 5000); // Example: Error disappears after 5 seconds
      };

    const toExport = {
        errorMessage,
        setErrorMessage,
        triggerError
    }

    return (
        <ErrorContext.Provider value={toExport}>
            {children}
        </ErrorContext.Provider>
    );


}

export { ErrorContext, ErrorProvider }