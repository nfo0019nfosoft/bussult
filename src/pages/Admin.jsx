import API_URL from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserShield,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import "./Admin.css";
import adminImg from "../assets/admin.png";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await fetch(
        `${API_URL}/api/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await res.json();

      console.log("STATUS =>", res.status);
console.log("RESPONSE =>", data);

      if (data.success) {

        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "role",
          data.role
        );

        localStorage.setItem(
          "admin",
          JSON.stringify(data.admin)
        );
console.log("TOKEN SAVED =>", data.token);
console.log("ROLE SAVED =>", data.role);

localStorage.setItem("token", data.token);
localStorage.setItem("role", data.role);
localStorage.setItem("admin", JSON.stringify(data.admin));

console.log("LOCAL TOKEN =>", localStorage.getItem("token"));
console.log("LOCAL ROLE =>", localStorage.getItem("role"));


        navigate("/admin-dashboard");

      } else {

        alert(data.message);

      }

    } catch (err) {

      console.log(err);

      alert("Login Failed");

    }
  };

  return (
    <div className="adminlogin-page">

      <div className="adminlogin-container">

        <div className="adminlogin-left">

          <img
            src={adminImg}
            alt="Admin"
            className="adminlogin-image"
          />

        </div>

        <div className="adminlogin-right">

          <div className="adminlogin-card">

            <div className="adminlogin-icon">
              <FaUserShield />
            </div>

            <h2 className="adminlogin-title">
              Sign In to Your Account
            </h2>

            <p className="adminlogin-subtitle">
              Access the CA Connect Admin Portal
            </p>

            <form onSubmit={handleLogin}>

              <label>Email Address</label>

              <div className="adminlogin-input-group">

                <FaEnvelope />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

              <label>Password</label>

              <div className="adminlogin-input-group">

                <FaLock />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <span
                  className="adminlogin-eye"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {
                    showPassword
                      ? <FaEyeSlash />
                      : <FaEye />
                  }
                </span>

              </div>

              <div className="adminlogin-remember">

                <input type="checkbox" />

                <span>
                  Remember Me
                </span>

              </div>

              <button
                type="submit"
                className="adminlogin-btn"
              >
                Sign In
              </button>

            </form>

            <div className="adminlogin-secure">

              <FaLock />

              <div>

                <h4>
                  Secure Access
                </h4>

                <p>
                  Your information is protected
                  with advanced encryption.
                </p>

              </div>

            </div>

            <div className="adminlogin-footer">

              <div className="adminlogin-footer-bottom">

                <p>
                  © 2026 CA Platform. All Rights Reserved.
                </p>

                <div className="adminlogin-footer-links">

                  <a href="/PrivacyPolicy">
                    Privacy Policy
                  </a>

                  <a href="/TermsAndConditions">
                    Terms & Conditions
                  </a>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;