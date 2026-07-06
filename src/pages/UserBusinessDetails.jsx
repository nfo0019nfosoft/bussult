import API_URL from "../config";
import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";
import Sidebar from "../components/UserSidebar";
import {Link, useNavigate} from "react-router-dom";
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

import "./UserProfile.css";
import PhoneInputModule from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInput =
  PhoneInputModule.default ||
  PhoneInputModule;



function  UserBusinessDetails() {

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
    industrySector: "",
natureOfBusiness: "",
registrationType: "",
dateOfEstablishment: "",
gstStatus: "",
gstRegistrationDate: "",
annualTurnover: "",
teamSize: "",
numberOfBranches: "",
accountingMethod: "",
financialYear: "",
tdsApplicable: "",
businessDescription: "",
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

  
const defaultServices = [
  "GST Compliance",
  "Income Tax Filing",
  "Accounting & Bookkeeping",
  "TDS Return Filing",
  "ROC Compliance",
  "Audit & Assurance",
];

const extraServices = [
  "Business Registration",
  "GST Registration",
  "Company Incorporation",
  "Payroll Management",
  "Trademark Registration",
  "Startup Advisory",
  "Project Reports",
  "Tax Planning",
  "Import Export License",
];

const [showMore, setShowMore] =
  useState(false);

const [selectedServices, setSelectedServices] =
  useState([]);

const handleServiceChange = (
  service
) => {

  if (
    selectedServices.includes(service)
  ) {

    setSelectedServices(
      selectedServices.filter(
        (item) => item !== service
      )
    );

  } else {

    setSelectedServices([
      ...selectedServices,
      service,
    ]);

  }

};



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

  setSelectedServices(
    res.data.user
      .preferredServices || []
  );

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
   SAVE BUSINESS
===================== */
const saveBusinessDetails = async () => {

  await axios.put(
    `${API_URL}/api/users/profile`,
    {
      ...user,

      preferredServices:
        selectedServices,

      businessCompleted: true,
    },
    {
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  navigate(
    "/user-uploaded-documents"
  );

};








const handleLogout = () => {

  const confirmLogout = window.confirm(
    "Are you sure you want to logout?"
  );

  if (!confirmLogout) return;

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/login");

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

            <div className="user-info"   onClick={handleLogout}>
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
       {user.role || "User"}
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
    className="tab-btn "
  >
    <FaUser />
    <span>
      Personal Information
    </span>
  </Link>

  <Link
    to="/user-business-details"
    className="tab-btn active"
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
<div className="profile-card">

  <div className="card-header">

    <div className="breadcrumb">

  <Link to="/">
    Home
  </Link>

  <span className="separator">
    ›
  </span>

  <Link to="/user-profile">
    My Profile
  </Link>

  <span className="separator">
    ›
  </span>

  <span className="current-page">
    Business Details
  </span>

</div>

  

  


<div className="company-info-card">

  <div className="company-info-header">

    <h3 className="company-info-title">
      Business Details
    </h3>

    <p className="company-info-subtitle">
      Provide information about your business
      to help us connect you with the right
      CA professionals.
    </p>

  </div>

  <div className="company-form-grid">

    <div className="company-form-item">
      <label>Company / Firm Name</label>

      <input
        type="text"
        className="company-textbox"
        name="companyName"
        value={user.companyName}
        onChange={handleChange}
      />
    </div>

    <div className="company-form-item">
      <label>Industry / Business Sector</label>

      <select
        className="company-dropdown"
        name="industrySector"
        value={user.industrySector}
        onChange={handleChange}
      >
        <option value="">Select Sector</option>
        <option value="Trading">Trading</option>
        <option value="Manufacturing">Manufacturing</option>
        <option value="Services">Services</option>
        <option value="IT">IT</option>
      </select>
    </div>

    <div className="company-form-item">
      <label>Nature Of Business</label>

      <select
        className="company-dropdown"
        name="natureOfBusiness"
        value={user.natureOfBusiness}
        onChange={handleChange}
      >
        <option value="">Select</option>
        <option value="Wholesale Trading">
          Wholesale Trading
        </option>
        <option value="Retail Trading">
          Retail Trading
        </option>
        <option value="Service Provider">
          Service Provider
        </option>
      </select>
    </div>

    <div className="company-form-item">
      <label>Business Type</label>

      <select
        className="company-dropdown"
        name="businessType"
        value={user.businessType}
        onChange={handleChange}
      >
        <option value="">
          Select Business Type
        </option>

        <option value="Proprietorship">
          Proprietorship
        </option>

        <option value="Partnership">
          Partnership
        </option>

        <option value="Private Limited">
          Private Limited
        </option>
      </select>
    </div>

    <div className="company-form-item">
      <label>Registration Type</label>

      <select
        className="company-dropdown"
        name="registrationType"
        value={user.registrationType}
        onChange={handleChange}
      >
        <option value="">
          Select Registration
        </option>

        <option value="GST Registered">
          GST Registered
        </option>

        <option value="GST Exempt">
          GST Exempt
        </option>
      </select>
    </div>

    <div className="company-form-item">
      <label>Date Of Establishment</label>

      <input
        type="date"
        className="company-textbox"
        name="dateOfEstablishment"
        value={user.dateOfEstablishment}
        onChange={handleChange}
      />
    </div>

    <div className="company-form-item">
      <label>GST Status</label>

      <select
        className="company-dropdown"
        name="gstStatus"
        value={user.gstStatus}
        onChange={handleChange}
      >
        <option value="">Select</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>

    <div className="company-form-item">
      <label>GST Number</label>

      <input
        type="text"
        className="company-textbox"
        name="gstNumber"
        value={user.gstNumber}
        onChange={handleChange}
      />
    </div>

    <div className="company-form-item">
      <label>GST Registration Date</label>

      <input
        type="date"
        className="company-textbox"
        name="gstRegistrationDate"
        value={user.gstRegistrationDate}
        onChange={handleChange}
      />
    </div>

    <div className="company-form-item">
      <label>Annual Turnover</label>

      <select
        className="company-dropdown"
        name="annualTurnover"
        value={user.annualTurnover}
        onChange={handleChange}
      >
        <option value="">
          Select Turnover
        </option>

        <option value="Below 10L">
          Below 10L
        </option>

        <option value="10L - 50L">
          10L - 50L
        </option>

        <option value="50L - 1Cr">
          50L - 1Cr
        </option>

        <option value="1Cr - 5Cr">
          1Cr - 5Cr
        </option>
      </select>
    </div>

    <div className="company-form-item">
      <label>Team Size</label>

      <select
        className="company-dropdown"
        name="teamSize"
        value={user.teamSize}
        onChange={handleChange}
      >
        <option value="">
          Select Team Size
        </option>

        <option value="1-5 Employees">
          1-5 Employees
        </option>

        <option value="5-10 Employees">
          5-10 Employees
        </option>

        <option value="10-50 Employees">
          10-50 Employees
        </option>
      </select>
    </div>

    <div className="company-form-item">
      <label>Number Of Branches</label>

      <input
        type="number"
        className="company-textbox"
        name="numberOfBranches"
        value={user.numberOfBranches}
        onChange={handleChange}
      />
    </div>

    <div className="company-form-item">
      <label>Accounting Method</label>

      <select
        className="company-dropdown"
        name="accountingMethod"
        value={user.accountingMethod}
        onChange={handleChange}
      >
        <option value="">
          Select Method
        </option>

        <option value="Accrual Basis">
          Accrual Basis
        </option>

        <option value="Cash Basis">
          Cash Basis
        </option>
      </select>
    </div>

    <div className="company-form-item">
      <label>Financial Year</label>

      <select
        className="company-dropdown"
        name="financialYear"
        value={user.financialYear}
        onChange={handleChange}
      >
        <option value="">
          Select Financial Year
        </option>

        <option value="April-March">
          April - March
        </option>
      </select>
    </div>

    <div className="company-form-item">
      <label>TDS Applicable</label>

      <select
        className="company-dropdown"
        name="tdsApplicable"
        value={user.tdsApplicable}
        onChange={handleChange}
      >
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </div>

  </div>

  <div className="company-service-section">

    <label className="company-service-heading">
      Preferred CA Services
      <span>
        (Select all that apply)
      </span>
    </label>

    <div className="company-service-grid">

      {defaultServices.map((service) => (

        <label
          key={service}
          className="company-service-box"
        >
          <input
            type="checkbox"
            checked={selectedServices.includes(service)}
            onChange={() =>
              handleServiceChange(service)
            }
          />

          <span>{service}</span>
        </label>

      ))}

      {showMore &&
        extraServices.map((service) => (

          <label
            key={service}
            className="company-service-box"
          >
            <input
              type="checkbox"
              checked={selectedServices.includes(service)}
              onChange={() =>
                handleServiceChange(service)
              }
            />

            <span>{service}</span>
          </label>

        ))}

      <button
        type="button"
        className="company-service-btn"
        onClick={() =>
          setShowMore(!showMore)
        }
      >
        {showMore
          ? "Show Less"
          : "+ Add More"}
      </button>

    </div>

  </div>

  <div className="company-description-box">

    <label>
      Business Description
    </label>

    <textarea
      rows="5"
      name="businessDescription"
      value={user.businessDescription}
      onChange={handleChange}
    />

  </div>

  <div className="company-action-area">

    <button
      className="company-submit-btn"
      onClick={saveBusinessDetails}
    >
      Save & Continue
    </button>

  </div>

  <div className="company-note-card">

    <div className="company-note-icon">
      <FaShieldAlt />
    </div>

    <div className="company-note-content">

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

  <div className="profile-benefits">

  <h3>
    Why complete your profile?
  </h3>

  <div className="benefit-item">

    <div className="benefit-icon green-bg">
      <FaShieldAlt />
    </div>

    <div className="benefit-text">
      <h4>
        Get better CA recommendations
      </h4>

      <p>
        We match you with CAs who
        specialize in your business needs.
      </p>
    </div>

  </div>

  <div className="benefit-item">

    <div className="benefit-icon purple-bg">
      <FaCheckCircle />
    </div>

    <div className="benefit-text">
      <h4>
        Faster and accurate responses
      </h4>

      <p>
        CAs understand your business
        upfront and respond better.
      </p>
    </div>

  </div>

  <div className="benefit-item">

    <div className="benefit-icon orange-bg">
      <FaBuilding />
    </div>

    <div className="benefit-text">
      <h4>
        Manage everything in one place
      </h4>

      <p>
        Keep your documents and
        preferences organized and secure.
      </p>
    </div>

  </div>

</div>

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
  );
}

export default UserBusinessDetails;
