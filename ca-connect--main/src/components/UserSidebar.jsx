import API_URL from "../config";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

import {
  FaBars,
  FaTachometerAlt,
  FaUser,
  FaClipboardList,
  FaCalendarAlt,
  FaCreditCard,
  FaCog,
  FaHeadset,
  FaHeart,
  FaSignOutAlt,
  FaCrown,
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar() {

  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";

  };

  return (
    <>
      <button
        className="mobile-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <FaBars />
      </button>

      <aside
        className={
          menuOpen
            ? "sidebar active"
            : "sidebar"
        }
      >

        {/* Logo */}

        <div className="sidebar-logo">

          <img
            src={logo}
            alt="CA Connect"
            className="sidebar-logo-img"
          />

        </div>
        <span className="admin-super-admin">
          &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
          User Dashboard
        </span>

        {/* Menu */}

        <ul className="sidebar-menu">

          <li>

            <Link
              to="/user-dashboard"
              className={
                location.pathname ===
                  "/vendor-dashboard"
                  ? "active"
                  : ""
              }
            >
              <FaTachometerAlt />
              Dashboard
            </Link>

          </li>

          <li>

            <Link
              to="/user-profile"
              className={
                [
                  "/user-profile",
                  "/vendor-kyc",
                  "/vendor-services",
                  "/vendor-pricing",
                  "/vendor-preview",
                  "/vendor-payment"
                ].includes(
                  location.pathname
                )
                  ? "active"
                  : ""
              }
            >
              <FaUser />
              My Profile
            </Link>

          </li>

          <li>

            <Link
              to="/user-enquiry"
              className={
                location.pathname ===
                  "/leads"
                  ? "active"
                  : ""
              }
            >
              <FaClipboardList />
              My Enquiry
            </Link>

          </li>

          <li>

            <Link
              to="/user-appointments"
              className={
                location.pathname ===
                  "/appointments"
                  ? "active"
                  : ""
              }
            >
              <FaCalendarAlt />
              Appointments
            </Link>

          </li>

          <li>

            <Link
              to="/user-saved-ca"
              className={
                location.pathname === "/user-saved-ca"
                  ? "active"
                  : ""
              }
            >
              <FaHeart />
              Saved CAs
            </Link>

          </li>

          <li>

            <Link
              to="/user-settings"
              className={
                location.pathname ===
                  "/settings"
                  ? "active"
                  : ""
              }
            >
              <FaCog />
              Settings
            </Link>

          </li>

          <li>

            <Link
              to="/user-help"
              className={
                location.pathname ===
                  "/user-help"
                  ? "active"
                  : ""
              }
            >
              <FaHeadset />
              Help & Support
            </Link>

          </li>

        </ul>

        {/* Upgrade Card */}

        <div className="upgrade-card">

          <FaCrown className="crown-icon" />

          <h4>
            Upgrade Your Plan
          </h4>

          <p>
            Unlock more features and
            grow your business.
          </p>

          <Link
            to="/subscription"
            className="upgrade-btn"
          >
            Upgrade Now
          </Link>

        </div>

        {/* Logout */}

        <button
          className="sidebar-logout"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          Logout
        </button>

      </aside>
    </>
  );
}

export default Sidebar;