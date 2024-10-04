import { useContext } from "react"
import { ErrorContext } from "../contexts/ErrorContext"


const useError = () => {
    return useContext(ErrorContext)
}

export default useError;