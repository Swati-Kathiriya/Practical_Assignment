import React from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if the current path is active
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // Get user data from localStorage
  const userJson = localStorage.getItem('user');
  let user;
  try {
    user = userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error('Error parsing user data from localStorage:', error);
    user = null;
  }

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand fs-3" to="/">
          IoT Device Manager
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/") ? "active" : ""}`}
                to="/"
              >
                <i className="fas fa-home"></i> Devices
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/add-device") ? "active" : ""}`}
                to="/add-device"
              >
                <i className="fas fa-plus-circle"></i> Add New Device
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <ul className="navbar-nav ms-auto">
        {user ? (
          <>
            <li className="nav-item">
              <span className="nav-link text-white fw-bold">
                Welcome, {user.name}
              </span>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-link text-white nav-link"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/login">
                <i className="fas fa-sign-in-alt"></i> Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/register">
                <i className="fas fa-user-plus"></i> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
