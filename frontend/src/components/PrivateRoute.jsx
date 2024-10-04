import { Navigate } from "react-router-dom";
import useCurrentToken from "../hooks/useCurrentToken"


const PrivateRoute = ({ children }) => {
    const { token } = useCurrentToken()

    return token ? children : <Navigate to="/" replace={true} />
}

export default PrivateRoute;