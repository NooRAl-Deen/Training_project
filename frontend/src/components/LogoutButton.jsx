import { useContext } from "react";
import { CurrentTokenContext } from "../contexts/CurrentTokenContext";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LogoutButton = () => {
  const { logout } = useContext(CurrentTokenContext);
  const navigate = useNavigate();
  const { t } = useTranslation('navbar')

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Link className="nav-link" onClick={handleLogout}>{t('logout')}</Link>
  );
};

export default LogoutButton;
