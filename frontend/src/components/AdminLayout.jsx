import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTachometerAlt, faUser, faUsers, faCog } from '@fortawesome/free-solid-svg-icons';

const AdminLayout = () => {
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      {/* Sidebar */}
      <nav className="bg-dark text-white" style={{ width: "250px" }}>
        <div className="sidebar-brand text-center py-3">
          <h4>NULL Dashboard</h4>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/">
              <FontAwesomeIcon icon={faHome} /> Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/dashboard">
              <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-white" to="/profile">
              <FontAwesomeIcon icon={faUser} /> Profile
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-white" to="/admin/users">
              <FontAwesomeIcon icon={faUsers} /> Users
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-white" to="/settings">
              <FontAwesomeIcon icon={faCog} /> Settings
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-grow-1">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/logout">Logout</Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
