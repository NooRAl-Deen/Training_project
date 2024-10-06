import React from "react";
import "./NavSkeletonLoader.css";

const NavSkeletonLoader = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="placeholder brand-placeholder"></div>
        <div className="navbar-toggler-placeholder"></div>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <div className="placeholder nav-link-placeholder"></div>
            </li>
            <li className="nav-item">
              <div className="placeholder nav-link-placeholder"></div>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <div className="placeholder nav-link-placeholder"></div>
            </li>
            <li className="nav-item">
              <div className="placeholder nav-link-placeholder"></div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavSkeletonLoader;
