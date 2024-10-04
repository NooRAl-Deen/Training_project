
import  { useContext } from "react";
import { CurrentTokenContext } from "../contexts/CurrentTokenContext"; 
import { useNavigate } from "react-router-dom"; 

const LogoutButton = () => {
    const { logout } = useContext(CurrentTokenContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login"); 
    };

    return (
        <button onClick={handleLogout} className="btn btn-danger">
            Logout
        </button>
    );
};

export default LogoutButton;
