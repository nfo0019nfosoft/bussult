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
  FaSignOutAlt,
  FaCrown,
  FaClock
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

    <div
      className={`sidebar-overlay ${
        menuOpen ? "active" : ""
      }`}
      onClick={() => setMenuOpen(false)}
    ></div>

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
     &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;Vendor Dashboard
  </span>

        {/* Menu */}

        <ul className="sidebar-menu">

          <li>

            <Link
              to="/vendor-dashboard"
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
              to="/vendor-profile"
              className={
                [
                  "/vendor-profile",
                  "/vendor-kyc",
                  "/vendor-services",
                  
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
              Vendor Profile
            </Link>

          </li>

          <li>

            <Link
              to="/vendor-leads"
              className={
                location.pathname ===
                "/leads"
                  ? "active"
                  : ""
              }
            >
              <FaClipboardList />
              My Leads
            </Link>

          </li>

          <li>

            <Link
              to="/vendor-appointments"
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
              to="/vendor-availability"
              className={
                location.pathname ===
                "/vendor-availability"
                  ? "active"
                  : ""
              }
            >
              <FaClock />
              Availability
            </Link>



          </li>












          <li>

            <Link
              to="/vendor-subscription"
              className={
                location.pathname ===
                "/subscription"
                  ? "active"
                  : ""
              }
            >
              <FaCreditCard />
              Subscription
            </Link>

          </li>

          <li>

            <Link
              to="/vendor-settings"
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
              to="/vendor-help"
              className={
                location.pathname ===
                "/vendor-help"
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
            to="/pricing-plans"
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