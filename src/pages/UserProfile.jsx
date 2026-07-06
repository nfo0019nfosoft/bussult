import API_URL from "../config";
import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";
import Sidebar from "../components/UserSidebar";

import {
  FaSearch,
  FaBell,
  FaComments,
  FaUser,
  FaBuilding,
  FaFileAlt,
  FaCheckCircle,
  FaShieldAlt,

  FaExclamationCircle,
  FaFileUpload,

 
  FaHeadset,
  FaArrowRight
} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";

import "./UserProfile.css";
import PhoneInputModule from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInput =
  PhoneInputModule.default ||
  PhoneInputModule;



function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",

    designation: "",
    companyName: "",
    businessCategory: "",
    businessType: "",

    gstNumber: "",
    panNumber: "",

    businessEmail: "",
    website: "",
    officeContactNumber: "",

    addressLine1: "",
    addressLine2: "",
    country: "",
    state: "",
    city: "",
    pincode: "",

    profileImage: "",
    role: "Business User",

    personalCompleted: false,
    businessCompleted: false,
    documentsCompleted: false,
    verificationCompleted: false,
  });

  const [loading, setLoading] = useState(false);

  const steps = {
    personal: user.personalCompleted,
    business: user.businessCompleted,
    documents: user.documentsCompleted,
    verification: user.verificationCompleted,
  };

  const completedSteps =
    Object.values(steps).filter(Boolean).length;

  const percentage = Math.round(
    (completedSteps / 4) * 100
  );

  




/* =====================
   GET PROFILE
===================== */

const fetchProfile = async () => {

  try {

    const token =
      localStorage.getItem("token");

    const res = await axios.get(
      `${API_URL}/api/users/profile`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    if (res.data.user) {

     setUser((prev) => ({
  ...prev,
  ...res.data.user,
}));

    }

  } catch (error) {

    console.log(error);

  }

};

/* =====================
   LOAD DATA
===================== */

useEffect(() => {

  fetchProfile();

}, []);

/* =====================
   COMMON INPUT CHANGE
===================== */

const handleChange = (e) => {

  const { name, value } =
    e.target;

  setUser((prev) => ({
    ...prev,
    [name]: value,
  }));

};


/* =====================
   PROFILE IMAGE
===================== */
const handleImageUpload = async (e) => {

  const file = e.target.files[0];

  if (!file) return;

  try {

    const token =
      localStorage.getItem("token");

    const formData =
      new FormData();

    formData.append(
      "photo",
      file
    );

    await axios.post(
      `${API_URL}/api/users/photo`,
      formData,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    fetchProfile();

  } catch (error) {

    console.log(error);

  }

};
/* =====================
   SAVE PROFILE
===================== */
const saveProfile = async () => {
  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    console.log("Sending Data:", user);

    const res = await axios.put(
      `${API_URL}/api/users/profile`,
      {
        ...user,
        personalCompleted: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Response:", res.data);

    setUser(res.data.user);

  } catch (error) {
    console.log("SAVE ERROR:", error.response?.data || error);
  } finally {
    setLoading(false);
  }
};










  return (
    <div className="profile-layout">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <div className="profile-content">

        {/* Header */}

        <div className="top-header">

          <div className="header-left">

            <h2>My Profile</h2>

            <p>
              Manage your business profile and
              account details
            </p>

          </div>

          <div className="header-right">

            <div className="search-box">

              <FaSearch />

              <input
                type="text"
                placeholder="Search anything..."
              />

            </div>

            <FaComments className="icon" />

            <FaBell className="icon" />

            <div className="user-info">
<img
  src={
    user.profileImage
      ? `${API_URL}${user.profileImage}`
      : "/avatar.png"
  }
  alt="Profile"
/>

  <div>
    <h4>
      {user.name || "User Name"}
    </h4>

    <p>
      {user.role || "Business User"}
    </p>
  </div>

</div>

          </div>

        </div>

        {/* Content Area */}

        <div className="profile-wrapper">

          {/* Left Content */}
<div className="left-content">

  {/* Tabs */}

<div className="profile-tabs">

  <Link
    to="/user-profile"
    className="tab-btn active"
  >
    <FaUser />
    <span>
      Personal Information
    </span>
  </Link>

  <Link
    to="/user-business-details"
    className="tab-btn"
  >
    <FaBuilding />
    <span>
      Business Details
    </span>
  </Link>

  <Link
    to="/user-uploaded-documents"
    className="tab-btn"
  >
    <FaFileAlt />
    <span>
      Uploaded Documents
    </span>
  </Link>

  <Link
    to="/user-account-verification"
    className="tab-btn"
  >
    <FaCheckCircle />
    <span>
      Account Verification
    </span>
  </Link>

</div>

  {/* Card */}
<div className="account-info-panel">

  <div className="account-panel-top">

    <div className="account-heading-wrap">
      <h3>Personal Information</h3>

      <p>
        Update your personal and business
        contact details.
      </p>
    </div>

    <label className="upload-avatar-btn">
      Change Photo

      <input
        type="file"
        accept="image/*"
        hidden
        onChange={handleImageUpload}
      />
    </label>

  </div>

  <div className="avatar-preview-area">

    <img
      src={
        user.profileImage
          ? `${API_URL}${user.profileImage}`
          : "/avatar.png"
      }
      alt="Profile"
    />

  </div>

  <div className="account-fields-layout">

    <div className="form-group">
      <label>Full Name</label>

      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>Email Address</label>

      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>Mobile Number</label>

      <PhoneInput
        country={"in"}
        enableSearch
        value={user.phone || ""}
        onChange={(value, data) => {
          setUser({
            ...user,
            phone: value,
            countryCode: data?.dialCode
              ? `+${data.dialCode}`
              : "+91",
          });
        }}
      />
    </div>

    <div className="form-group">
      <label>Designation</label>

      <select
        name="designation"
        value={user.designation}
        onChange={handleChange}
      >
        <option value="">
          Select Designation
        </option>

        <option value="Proprietor / Owner">
          Proprietor / Owner
        </option>

        <option value="Director">
          Director
        </option>

        <option value="Partner">
          Partner
        </option>
      </select>
    </div>

    <div className="form-group">
      <label>
        Company / Business Name
      </label>

      <input
        type="text"
        name="companyName"
        value={user.companyName}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>
        Business Category
      </label>

      <input
        type="text"
        name="businessCategory"
        value={user.businessCategory}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>
        Business Type
      </label>

      <input
        type="text"
        name="businessType"
        value={user.businessType}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>
        GST Number
      </label>

      <input
        type="text"
        name="gstNumber"
        value={user.gstNumber}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>
        PAN Number
      </label>

      <input
        type="text"
        name="panNumber"
        value={user.panNumber}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>
        Business Email
      </label>

      <input
        type="email"
        name="businessEmail"
        value={user.businessEmail}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>
        Website
      </label>

      <input
        type="text"
        name="website"
        value={user.website}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>Contact Number</label>

      <PhoneInput
        country={"in"}
        enableSearch
        value={
          user.officeContactNumber || ""
        }
        onChange={(value, data) => {
          setUser({
            ...user,
            officeContactNumber: value,
            officeCountryCode:
              data?.dialCode
                ? `+${data.dialCode}`
                : "+91",
          });
        }}
      />
    </div>

  </div>

  <div className="business-location-section">

    <h4 className="business-location-title">
      Business Address
    </h4>

    <div className="location-row-two">

      <div className="form-group">
        <label>
          Address Line 1
        </label>

        <input
          type="text"
          name="addressLine1"
          value={user.addressLine1}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>
          Address Line 2
        </label>

        <input
          type="text"
          name="addressLine2"
          value={user.addressLine2}
          onChange={handleChange}
        />
      </div>

    </div>

    <div className="location-row-four">

      <div className="form-group">
        <label>Country</label>

        <input
          type="text"
          name="country"
          value={user.country}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>State</label>

        <input
          type="text"
          name="state"
          value={user.state}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>City</label>

        <input
          type="text"
          name="city"
          value={user.city}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Pincode</label>

        <input
          type="text"
          name="pincode"
          value={user.pincode}
          onChange={handleChange}
        />
      </div>

    </div>

  </div>

  <div className="action-btn-area">

  <Link
  to="/user-business-details"
  className="continue-save-btn"
  onClick={saveProfile}
>
  Save & Continue
</Link>

  </div>

  <div className="security-note-box">

    <div className="security-note-icon">
      <FaShieldAlt />
    </div>

    <div className="security-note-text">

      <h4>Note:</h4>

      <p>
        This information will help us match you
        with the right CA professionals and
        relevant services.
      </p>

    </div>

  </div>

</div>

</div>

          {/* Right Content */}

<div className="right-content">

  <div className="completion-card">

    <h3>Profile Completion</h3>

    <div className="completion-top">

      <div
        className="progress-circle"
        style={{
          background: `conic-gradient(
            #22c55e 0deg,
            #22c55e ${percentage * 3.6}deg,
            #2563eb ${percentage * 3.6}deg,
            #2563eb 360deg
          )`
        }}
      >
        <div className="progress-inner">
          {percentage}%
        </div>
      </div>

      <div className="completion-text">

        <p>
          Great! You're almost there.
          Complete your profile to get
          better matches.
        </p>

        <Link
          to="/user-profile"
          className="view-profile-btn"
        >
          View My Profile
        </Link>

      </div>

    </div>

    <div className="steps-list">

      <div className="step-item">

        <span
          className={`step-dot ${
            steps.personal
              ? "active"
              : ""
          }`}
        ></span>

        <span className="step-label">
          Personal Information
        </span>

        {steps.personal ? (
          <FaCheckCircle className="green" />
        ) : (
          <div className="empty-circle"></div>
        )}

      </div>

      <div className="step-item">

        <span
          className={`step-dot ${
            steps.business
              ? "active"
              : ""
          }`}
        ></span>

        <span className="step-label">
          Business Details
        </span>

        {steps.business ? (
          <FaCheckCircle className="green" />
        ) : (
          <div className="empty-circle"></div>
        )}

      </div>

      <div className="step-item">

        <span
          className={`step-dot ${
            steps.documents
              ? "active"
              : ""
          }`}
        ></span>

        <span className="step-label">
          Uploaded Documents
        </span>

        {steps.documents ? (
          <FaCheckCircle className="green" />
        ) : (
          <div className="empty-circle"></div>
        )}

      </div>

      <div className="step-item">

        <span
          className={`step-dot ${
            steps.verification
              ? "active"
              : ""
          }`}
        ></span>

        <span className="step-label">
          Account Verification
        </span>

        {steps.verification ? (
          <FaCheckCircle className="green" />
        ) : (
          <FaExclamationCircle className="orange" />
        )}

      </div>

    </div>

    <div className="quick-actions-section">

      <h3>Quick Actions</h3>

      <Link
        to="/user-uploaded-documents"
        className="quick-item"
      >

        <div className="quick-left">

          <div className="quick-icon green-bg">
            <FaFileUpload />
          </div>

          <div className="quick-text">
            <h4>Upload Documents</h4>
            <p>
              Upload your business documents
            </p>
          </div>

        </div>

        <FaArrowRight />

      </Link>

      <Link
        to="/user-account-verification"
        className="quick-item"
      >

        <div className="quick-left">

          <div className="quick-icon blue-bg">
            <FaShieldAlt />
          </div>

          <div className="quick-text">
            <h4>Verify Your Account</h4>
            <p>
              Complete account verification
            </p>
          </div>

        </div>

        <FaArrowRight />

      </Link>

      <Link
        to="/user-account-verification"
        className="quick-item"
      >

        <div className="quick-left">

          <div className="quick-icon orange-bg">
            <FaBuilding />
          </div>

          <div className="quick-text">
            <h4>Update Business Details</h4>
            <p>
              Edit your business information
            </p>
          </div>

        </div>

        <FaArrowRight />

      </Link>

      <div className="help-section">

        <div className="help-icon">
          <FaHeadset />
        </div>

        <h4>Need Help?</h4>

        <p>
          Our support team is here to help
          you with your profile and account.
        </p>

        <Link
          to="/support"
          className="support-link"
        >
          Contact Support
          <FaArrowRight />
        </Link>

      </div>

    </div>

  </div>

</div>
        </div>

      </div>

    </div>
  );
}

export default UserProfile;
