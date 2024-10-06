import { useContext } from "react";
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
    <button
      onClick={handleLogout}
      className="btn btn-danger rounded-pill shadow-sm px-4 py-2"
      style={{
        transition: "background-color 0.3s, transform 0.2s",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = "#c82333";
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = "";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
