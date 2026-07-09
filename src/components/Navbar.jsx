import API_URL from "../config";
import "./Navbar.css";
import { useState, useEffect, useRef } from "react";
import logo from "../assets/logo.png";

import {
  NavLink,
  Link,
  useLocation,
} from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaCalendarAlt,
  FaUserCircle,
  FaSignOutAlt,
  FaUser,
  FaCog,
} from "react-icons/fa";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const location = useLocation();

  const profileRef = useRef();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  useEffect(() => {

    const closeOutside = (e) => {

      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }

    };

    document.addEventListener(
      "mousedown",
      closeOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        closeOutside
      );

  }, []);

  useEffect(() => {

    setMenuOpen(false);
    setServiceOpen(false);
    setProfileOpen(false);

  }, [location.pathname]);

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";

  };

  const closeMenu = () => {

    setMenuOpen(false);
    setServiceOpen(false);

  };

  return (

    <header className="navbar">

      <div className="navbar-container">

        {/* ================= Logo ================= */}

        <Link
          to="/"
          className="logo"
        >
          <img
            src={logo}
            alt="CA Connect"
          />
        </Link>

        {/* ================= Menu ================= */}

        <ul
          className={
            menuOpen
              ? "nav-links active"
              : "nav-links"
          }
        >

          <li>

            <NavLink
              to="/"
              end
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive ? "nav-active" : ""
              }
            >
              Home
            </NavLink>

          </li>

          <li>

        <li>
  <NavLink
    to="/find-ca"
    onClick={closeMenu}
    className={({ isActive }) =>
      isActive ? "nav-highlight nav-active" : "nav-highlight"
    }
  >
    Find CA
  </NavLink>
</li>
          </li>

          {/* ================= Services ================= */}

          <li
            className={
              serviceOpen
                ? "dropdown active"
                : "dropdown"
            }
          >

            <div className="service-nav">

              <NavLink
                to="/service"
                className={({ isActive }) =>
                  isActive ? "nav-active" : ""
                }
              >
                Services
              </NavLink>

              <FaChevronDown
                className={
                  serviceOpen
                    ? "down-icon rotate"
                    : "down-icon"
                }
                onClick={(e) => {

                  e.preventDefault();

                  setServiceOpen(
                    !serviceOpen
                  );

                }}
              />

            </div>

            <ul className="dropdown-menu">

              <li>
                <Link
                  to="/service"
                  onClick={closeMenu}
                >
                  GST Filing
                </Link>
              </li>

              <li>
                <Link
                  to="/service"
                  onClick={closeMenu}
                >
                  Income Tax Filing
                </Link>
              </li>

              <li>
                <Link
                  to="/service"
                  onClick={closeMenu}
                >
                  Company Registration
                </Link>
              </li>

              <li>
                <Link
                  to="/service"
                  onClick={closeMenu}
                >
                  ROC Filing
                </Link>
              </li>

              <li>
                <Link
                  to="/service"
                  onClick={closeMenu}
                >
                  Audit & Assurance
                </Link>
              </li>

              <li>
                <Link
                  to="/service"
                  onClick={closeMenu}
                >
                  Bookkeeping
                </Link>
              </li>

              <li>
                <Link
                  to="/service"
                  onClick={closeMenu}
                >
                  Payroll Services
                </Link>
              </li>

            </ul>

          </li>

          {/* AI Assistant */}

          <li>
            <NavLink
              to="/ai-assistant"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive ? "nav-active" : ""
              }
            >
              AI Assistant
            </NavLink>
          </li>

          {/* Blogs */}

          <li>
            <NavLink
              to="/blogs"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive ? "nav-active" : ""
              }
            >
              Blogs
            </NavLink>
          </li>

          {/* About */}

          <li>
            <NavLink
              to="/AboutUs"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive ? "nav-active" : ""
              }
            >
              About Us
            </NavLink>
          </li>

          {/* Contact */}

          <li>
            <NavLink
              to="/contact"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive ? "nav-active" : ""
              }
            >
              Contact
            </NavLink>
          </li>

          {/* ================= Mobile Buttons ================= */}

          <li className="mobile-buttons">

            <Link
              to="/find-ca"
              className="book-btn"
              onClick={closeMenu}
            >
              <FaCalendarAlt />
              Book Consultation
            </Link>

            {user ? (

              <div
                className="profile-wrapper"
                ref={profileRef}
              >

                <div
                  className="profile-trigger"
                  onClick={() =>
                    setProfileOpen(!profileOpen)
                  }
                >
                  <FaUserCircle className="profile-icon" />
                </div>

                {profileOpen && (

                  <div className="profile-popup">

                    <Link
                      to="/user-profile"
                      className="profile-link"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                    >
                      <FaUser />
                      My Profile
                    </Link>

                    <Link
                      to="/user-profile"
                      className="profile-link"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                    >
                      <FaCog />
                      Settings
                    </Link>

                    <button
                      className="profile-link logout-btn"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>

                  </div>

                )}

              </div>

            ) : (

              <Link
                to="/login"
                className="login-outline-btn"
              >
                Login / Register
              </Link>

            )}

          </li>

        </ul>

        {/* ================= Right Side ================= */}

        <div className="nav-actions">

          <Link
            to="/find-ca"
            className="book-btn"
          >
            <FaCalendarAlt />
            Book Consultation
          </Link>

          {user ? (

            <div
              className="profile-wrapper"
              ref={profileRef}
            >

              <div
                className="profile-trigger"
                onClick={() =>
                  setProfileOpen(!profileOpen)
                }
              >
                <FaUserCircle className="profile-icon" />
              </div>

              {profileOpen && (

                <div className="profile-popup">

                  <Link
                    to="/user-profile"
                    className="profile-link"
                    onClick={() =>
                      setProfileOpen(false)
                    }
                  >
                    <FaUser />
                    My Profile
                  </Link>

                  <Link
                    to="/user-profile"
                    className="profile-link"
                    onClick={() =>
                      setProfileOpen(false)
                    }
                  >
                    <FaCog />
                    Settings
                  </Link>

                  <button
                    className="profile-link logout-btn"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>

                </div>

              )}

            </div>

          ) : (

            <Link
              to="/login"
              className="login-outline-btn"
            >
              Login / Register
            </Link>

          )}

        </div>

        {/* ================= Hamburger ================= */}

        <div
          className="hamburger"
          onClick={() => {

            setMenuOpen(!menuOpen);

            if (menuOpen) {
              setServiceOpen(false);
            }

          }}
        >

          {
            menuOpen
              ? <FaTimes />
              : <FaBars />
          }

        </div>

      </div>

    </header>

  );

}

export default Navbar;