import { Link } from "react-router-dom";
import useCurrentToken from "../hooks/useCurrentToken";
import LogoutButton from "./LogoutButton";
import { useTranslation } from "react-i18next";

const NavComponent = () => {
  const { token } = useCurrentToken();
  const { t } = useTranslation('navbar')
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light header shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          {t('brand_name')}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
              {t('home_link')}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
              {t('about_link')}
              </Link>
            </li>
            {token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                  {t('profile_link')}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/posts">
                  {t('posts_link')}
                  </Link>
                </li>
                
              </>
            ) : ''}
          </ul>
          <ul className="navbar-nav">
          {token ? <LogoutButton /> : 
            (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                  {t('login_link')}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                  {t('register_link')}
                  </Link>
                </li>
              </>
            )
          }
          
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavComponent;
