import { Link } from "react-router-dom";
import useCurrentToken from "../hooks/useCurrentToken";
import LogoutButton from "./LogoutButton";

const NavComponent = () => {
  const { token } = useCurrentToken();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light header shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          MyApp
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
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            {token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/posts">
                    Posts
                  </Link>
                </li>
                <LogoutButton />
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavComponent;
