import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAuth from "../hooks/useAuth";
import useCreateMutation from "../hooks/queries/useCreateMutation";

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation("navbar");
  const logoutMutation = useCreateMutation('/logout');

  const handleLogout = async () => {
    try {
      logout();
      navigate('/login');
      await logoutMutation.mutateAsync({}); 
    } catch (error) {
      console.error('Error during logout:', error);
      //
    }
  };

  return (
    <Link className="dropdown-item" onClick={handleLogout}>
      {t("logout")}
    </Link>
  );
};

export default LogoutButton;
