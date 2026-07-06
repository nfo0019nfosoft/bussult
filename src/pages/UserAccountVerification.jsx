import API_URL from "../config";
import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";
import Sidebar from "../components/UserSidebar";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaBell,
  FaComments,
  FaUser,
  FaFileAlt,
  FaCheckCircle,
  FaShieldAlt,
  FaIdCard,
  FaInfoCircle,
  FaFileInvoice,
  FaUniversity,
  FaExclamationCircle,
  FaFileUpload,
  FaAward,
  FaUserShield,
  FaHeadset,
  FaArrowRight,
  FaEllipsisV,
  FaRocket,
  FaRegStar,
  FaEnvelopeOpenText,
  FaMobileAlt,
  FaBuilding,
  FaClock,
  FaChevronRight,

} from "react-icons/fa";

import "./UserProfile.css";
import PhoneInputModule from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInput =
  PhoneInputModule.default ||
  PhoneInputModule;



function UserAccountVerification() {

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

          <div className="header-right"   onClick={handleLogout}>

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
      {user?.name || "User"}
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
                className="tab-btn "
              >
                <FaBuilding />
                <span>
                  Business Details
                </span>
              </Link>

              <Link
                to="/user-uploaded-documents"
                className="tab-btn "
              >
                <FaFileAlt />
                <span>
                  Uploaded Documents
                </span>
              </Link>

              <Link
                to="/user-account-verification"
                className="tab-btn active"
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
                    Account Verification
                  </span>
                </div>


<div className="verification-panel">

  <div className="verification-header">

    <h2>Account Verification</h2>

    <p>
      Complete the verification process to
      build trust and get better support from
      our CA professionals.
    </p>

  </div>

  {/* Email */}

  <div className="verification-item">

    <div className="verification-left">

      <div className="verification-icon email-bg">
        <FaEnvelopeOpenText />
      </div>

      <div className="verification-content">

        <h4>Email Verification</h4>

        <p>
          Verifying your email ensures secure
          communication.
        </p>

        <span>
          Email:
          amit.patel@business.com
        </span>

      </div>

    </div>

    <div className="verification-right">

      <div className="verification-status verified">

        <FaCheckCircle />

        Verified

      </div>

      <small>
        Verified on:
        18 May 2024, 02:25 PM
      </small>

      <FaChevronRight className="arrow-icon" />

    </div>

  </div>

  {/* Mobile */}

  <div className="verification-item">

    <div className="verification-left">

      <div className="verification-icon mobile-bg">
        <FaMobileAlt />
      </div>

      <div className="verification-content">

        <h4>Mobile Verification</h4>

        <p>
          Verifying your mobile number ensures
          secure access.
        </p>

        <span>
          Mobile:
          +91 9876543210
        </span>

      </div>

    </div>

    <div className="verification-right">

      <div className="verification-status verified">

        <FaCheckCircle />

        Verified

      </div>

      <small>
        Verified on:
        18 May 2024, 02:27 PM
      </small>

      <FaChevronRight className="arrow-icon" />

    </div>

  </div>

  {/* GST */}

  <div className="verification-item">

    <div className="verification-left">

      <div className="verification-icon gst-bg">
        <FaFileInvoice />
      </div>

      <div className="verification-content">

        <h4>GST Verification</h4>

        <p>
          Verify your GST number to enable
          seamless compliance services.
        </p>

        <span>
          GST Number:
          24ABCDE1234F1Z5
        </span>

      </div>

    </div>

    <div className="verification-right">

      <div className="verification-status verified">

        <FaCheckCircle />

        Verified

      </div>

      <small>
        Verified on:
        20 May 2024, 11:50 AM
      </small>

      <FaChevronRight className="arrow-icon" />

    </div>

  </div>

  {/* PAN */}

  <div className="verification-item">

    <div className="verification-left">

      <div className="verification-icon pan-bg">
        <FaIdCard />
      </div>

      <div className="verification-content">

        <h4>PAN Verification</h4>

        <p>
          Verify your PAN to proceed with tax
          and financial services.
        </p>

        <span>
          PAN Number:
          ABCDE1234F
        </span>

      </div>

    </div>

    <div className="verification-right">

      <div className="verification-status verified">

        <FaCheckCircle />

        Verified

      </div>

      <small>
        Verified on:
        18 May 2024, 02:28 PM
      </small>

      <FaChevronRight className="arrow-icon" />

    </div>

  </div>

  {/* Business */}

  <div className="verification-item">

    <div className="verification-left">

      <div className="verification-icon business-bg">
        <FaBuilding />
      </div>

      <div className="verification-content">

        <h4>Business Verification</h4>

        <p>
          Verify your business details and
          registration information.
        </p>

        <span>
          Status:
          In Review
        </span>

      </div>

    </div>

    <div className="verification-right">

      <div className="verification-status review">

        <FaClock />

        In Review

      </div>

      <small>
        Submitted on:
        21 May 2024, 10:15 AM
      </small>

      <FaChevronRight className="arrow-icon" />

    </div>

  </div>

  {/* Bank */}

  <div className="verification-item">

    <div className="verification-left">

      <div className="verification-icon bank-bg">
        <FaUniversity />
      </div>

      <div className="verification-content">

        <h4>
          Bank Account Verification
        </h4>

        <p>
          Verify your bank account for secure
          transactions.
        </p>

        <span>
          Status:
          Pending
        </span>

      </div>

    </div>

    <div className="verification-right">

      <div className="verification-status pending">

        <FaClock />

        Pending

      </div>

      <button className="verify-now-btn">
        Verify Now
      </button>

      <FaChevronRight className="arrow-icon" />

    </div>

  </div>

  <div className="verification-footer">

    <div className="footer-left-info">

      <FaInfoCircle />

      <p>
        All verifications are safe and secure.
        Your information is encrypted and
        will never be shared.
      </p>

    </div>

    <a href="/">
      Contact Support
      <FaChevronRight />
    </a>

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
                    className={`step-dot ${steps.personal
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
                    className={`step-dot ${steps.business
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
                    className={`step-dot ${steps.documents
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
                    className={`step-dot ${steps.verification
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

              <div className="verification-benefits">

                <h3>Verification Benefits</h3>

                <div className="benefit-item">

                  <div className="benefit-icon green-bg">
                    <FaShieldAlt />
                  </div>

                  <div className="benefit-content">
                    <h4>Build Trust</h4>
                    <p>
                      Verified accounts get higher trust
                      from CA professionals.
                    </p>
                  </div>

                </div>

                <div className="benefit-item">

                  <div className="benefit-icon blue-bg">
                    <FaRocket />
                  </div>

                  <div className="benefit-content">
                    <h4>Faster Service</h4>
                    <p>
                      Get quicker responses and
                      priority support.
                    </p>
                  </div>

                </div>

                <div className="benefit-item">

                  <div className="benefit-icon orange-bg">
                    <FaRegStar />
                  </div>

                  <div className="benefit-content">
                    <h4>Unlock All Features</h4>
                    <p>
                      Access all services and advanced
                      features.
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

export default UserAccountVerification;
