import API_URL from "../config";
import "./Navbar.css";
import { useState } from "react";
import logo from "../assets/logo.png";
import {
  NavLink,
  Link,
  useNavigate,
  useLocation
} from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserCircle,
  FaPhoneAlt,
  FaUserTag,
  FaSignOutAlt,
  FaUser,
  FaCog,
} from "react-icons/fa";

function Navbar() {
const [menuOpen, setMenuOpen] = useState(false);
const [serviceOpen, setServiceOpen] = useState(false);
const [profileOpen, setProfileOpen] = useState(false);
const location = useLocation();



const navigate = useNavigate();


const user = JSON.parse(
  localStorage.getItem("user") || "null"
);

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

        <Link to="/" className="logo">
          <img src={logo} alt="CA Connect" />
        </Link>

        <ul className={menuOpen ? "nav-links active" : "nav-links"}>

          <li>
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
          </li>
<li>
  <Link
    to="/find-ca"
    onClick={closeMenu}
    className="active-link"
  >
    Find CA
  </Link>
</li>

          <li className={serviceOpen ? "dropdown active" : "dropdown"}>

            <div className="service-nav">

              <Link to="/service" onClick={closeMenu}>
                Services
              </Link>

              <FaChevronDown
                className="down-icon"
                onClick={(e) => {
                  e.preventDefault();
                  setServiceOpen(!serviceOpen);
                }}
              />

            </div>

            <ul className="dropdown-menu">

              <li>
                <Link to="/service" onClick={closeMenu}>
                  GST Filing
                </Link>
              </li>

              <li>
                <Link to="/service" onClick={closeMenu}>
                  Income Tax Filing
                </Link>
              </li>

              <li>
                <Link to="/service" onClick={closeMenu}>
                  Company Registration
                </Link>
              </li>

              <li>
                <Link to="/service" onClick={closeMenu}>
                  ROC Filing
                </Link>
              </li>

                <li>
                <Link to="/service" onClick={closeMenu}>
                  Audit & Assurance
                </Link>
              </li>

                <li>
                <Link to="/service" onClick={closeMenu}>
                  Bookkeping
                </Link>
              </li>

                <li>
                <Link to="/service" onClick={closeMenu}>
                 Payroll Services
                </Link>
              </li>

            </ul>

          </li>

          <li>
            <Link to="/ai-assistant" onClick={closeMenu}>
              AI Assistant
            </Link>
          </li>

          <li>
            <Link to="/blogs" onClick={closeMenu}>
              Blogs
            </Link>
          </li>

          <li>
            <Link to="/AboutUs" onClick={closeMenu}>
              About Us
            </Link>
          </li>

          <li>
            <Link to="/contact" onClick={closeMenu}>
              Contact Us
            </Link>
          </li>

          <li className="mobile-buttons">

            <Link
              to="/find-ca"
              className="login-btn"
              onClick={closeMenu}
            >
              <FaCalendarAlt />
              Book Consultation
            </Link>

{user ? (
<div className="profil-wrapper">

  <div
    className="profile-trigger"
    onClick={() =>
      setProfileOpen(!profileOpen)
    }
  >
    <FaUserCircle
      className="profile-icon"
    />
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
        onClick={handleLogout}
        className="profile-link logout-btn"
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
    className="consult-btn"
  >
    Login / Register
  </Link>
)}:          </li>

        </ul>

        <div className="nav-actions">

          <Link to="/find-ca" className="login-btn">
            <FaCalendarAlt />
            Book Consultation
          </Link>

        
{user ? (
 <div className="profil-wrapper">

  <div
    className="profile-trigger"
    onClick={() =>
      setProfileOpen(!profileOpen)
    }
  >
    <FaUserCircle
      className="profile-icon"
    />
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
        onClick={handleLogout}
        className="profile-link logout-btn"
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
    className="consult-btn"
  >
    Login / Register
  </Link>
)}
        </div>

        <div
          className="hamburger"
          onClick={() => {
            setMenuOpen(!menuOpen);

            if (menuOpen) {
              setServiceOpen(false);
            }
          }}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

      </div>
    </header>
  );
}

export default Navbar;