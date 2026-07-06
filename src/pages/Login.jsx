import API_URL from "../config";
import "./Login.css";
import logo from "../assets/logo.png";
import otpImg from "../assets/otp.png";

import { useState } from "react";

import PhoneInputModule from "react-phone-input-2";

const PhoneInput = PhoneInputModule.default;

import "react-phone-input-2/lib/style.css";

import {
  FaUser,
  FaBriefcase,
  FaShieldAlt,
  FaHeadset,
  FaCheckCircle,
} from "react-icons/fa";

function Login() {
  const [phone, setPhone] = useState("");
  const [userType, setUserType] = useState("user");
  
const handleOtp = async () => {
  try {

    console.log("PHONE SENT =>", phone);
    console.log("ROLE SENT =>", userType);

    const loginUrl =
      userType === "ca"
        ? `${API_URL}/api/vendor/login`
        : `${API_URL}/api/auth/login`;

    const response = await fetch(
      loginUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          userType === "ca"
            ? {
                mobile: phone,
              }
            : {
                phone,
              }
        ),
      }
    );

    const data = await response.json();

    console.log("FULL RESPONSE =>", data);
    console.log("SUCCESS =>", data.success);

    if (data.success) {

      console.log(
        "LOGIN SUCCESS =>",
        data
      );
      console.log("TOKEN =>", data.token);

      localStorage.setItem(
        "token",
        data.token || ""
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          data.user || {}
        )
      );

if (userType === "ca") {

  console.log(
    "VENDOR DATA =>",
    data.vendor
  );

  console.log(
    "USER DATA =>",
    data.user
  );

  console.log(
    "VENDOR ID =>",
    data.vendor?._id ||
    data.user?._id
  );

  localStorage.setItem(
    "vendorToken",
    data.token || ""
  );

  localStorage.setItem(
    "vendorId",
    data.vendor?._id ||
    data.user?._id ||
    ""
  );

  localStorage.setItem(
    "vendor",
    JSON.stringify(
      data.vendor ||
      data.user
    )
  );

  window.location.href =
    "/vendor-profile";

}
else {

        window.location.href =
          "/";

      }

    } else {

      console.log(
        "LOGIN FAILED =>",
        data
      );

      alert(
        data.message ||
        "Login Failed"
      );

    }

  } catch (error) {

    console.log(
      "ERROR =>",
      error
    );

    alert(
      "Server not running"
    );

  }
};
  return (
    <section className="login-page">
      <div className="login-card">

        {/* Logo */}
        <div className="login-logo">
          <img src={logo} alt="CA Connect" />
        </div>

        {/* Header */}
        <div className="login-header">
          <h2>Welcome to CA Connect</h2>
          <p>Login or sign up to continue</p>
        </div>

        {/* User Types */}
        <div className="user-types">

          <div
            className={`user-type ${
              userType === "user" ? "active" : ""
            }`}
            onClick={() => setUserType("user")}
          >
            <FaUser className="user-icon" />

            <div>
              <h4>User</h4>
              <span>Looking for CA services</span>
            </div>
          </div>

          <div
            className={`user-type ${
              userType === "ca" ? "active" : ""
            }`}
            onClick={() => setUserType("ca")}
          >
            <FaBriefcase className="user-icon" />

            <div>
              <h4>CA Professional</h4>
              <span>Offering professional services</span>
            </div>
          </div>

        </div>

        {/* Form */}
        <div className="login-form">

          <div className="form-title">
            Login / Sign Up
          </div>

          <div className="form-divider"></div>

          <div className="otp-image">
            <img
              src={otpImg}
              alt="OTP"
            />
          </div>

          <h3>
            Enter Your Mobile Number
          </h3>

          <p className="otp-desc">
            We will send you a One-Time Password (OTP)
            <br />
            to verify your number
          </p>

          {/* Phone Input */}

          <div className="phone-wrapper">
<PhoneInput
  country="in"
  enableSearch
  searchPlaceholder="Search country..."
  containerClass="phone-container"
  dropdownClass="phone-dropdown"
  value={phone}
  onChange={(value) => setPhone(value)}
/>

          </div>

         <button
  className="otp-btn"
  onClick={handleOtp}
>
Login
</button>

          <div className="secure-text">
            <FaShieldAlt />

            <span>
              Your data is safe and secure with us
            </span>
          </div>

        </div>

        {/* Footer */}

        <div className="login-features">

          <div className="feature">
            <FaShieldAlt />
            <span>
              Secure & Trusted
            </span>
          </div>

          <div className="feature">
            <FaCheckCircle />
            <span>
              Verified Professionals
            </span>
          </div>

          <div className="feature">
            <FaHeadset />
            <span>
              24/7 Support
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Login;