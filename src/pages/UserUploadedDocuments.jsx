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
    FaBuilding,
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
    FaRegStar
} from "react-icons/fa";

import { BsClockHistory } from "react-icons/bs";



import "./UserProfile.css";
import PhoneInputModule from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInput =
    PhoneInputModule.default ||
    PhoneInputModule;



function UserUploadDocuments() {

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
   const saveDocuments = async () => {

  try {

    await axios.put(
      `${API_URL}/api/users/profile`,
      {
        ...user,
        documentsCompleted: true,
      },
      {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    navigate(
      "/user-account-verification"
    );

  } catch (error) {

    console.log(error);

  }

};
const handleDocumentUpload = async (
  e,
  documentType
) => {

  const file = e.target.files[0];

  if (!file) return;

  try {

    const formData =
      new FormData();

    formData.append(
      "document",
      file
    );

    formData.append(
      "documentType",
      documentType
    );

    const token =
      localStorage.getItem("token");

    await axios.post(
      `${API_URL}/api/users/upload-document`,
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

const documents = [
  {
    key: "panCard",
    title: "PAN Card",
    file: user.documents?.panCard,
    icon: <FaIdCard />,
    color: "green",
  },

  {
    key: "gstCertificate",
    title: "GST Registration Certificate",
    file: user.documents?.gstCertificate,
    icon: <FaFileInvoice />,
    color: "blue",
  },

  {
    key: "incorporationCertificate",
    title: "Incorporation Certificate",
    file: user.documents?.incorporationCertificate,
    icon: <FaAward />,
    color: "purple",
  },

  {
    key: "aadhaarCard",
    title: "Aadhaar Card",
    file: user.documents?.aadhaarCard,
    icon: <FaUserShield />,
    color: "orange",
  },

  {
    key: "bankStatement",
    title: "Bank Statement",
    file: user.documents?.bankStatement,
    icon: <FaUniversity />,
    color: "pink",
  },

  {
    key: "itrDocument",
    title: "ITR Document",
    file: user.documents?.itrDocument,
    icon: <FaFileAlt />,
    color: "gray",
  },
];








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

                        <div className="user-info"  onClick={handleLogout}>
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
                                className="tab-btn "
                            >
                                <FaBuilding />
                                <span>
                                    Business Details
                                </span>
                            </Link>

                            <Link
                                to="/user-uploaded-documents"
                                className="tab-btn active"
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
                                        Uploaded Documents
                                    </span>

                                </div>



                            


                        <div className="documents-list">

  {documents.map((doc) => (

    <div
      className="document-row"
      key={doc.key}
    >

      <div className="document-left">

        <div
          className={`document-icon ${doc.color}`}
        >
          {doc.icon}
        </div>

        <div className="document-content">

          <h4>{doc.title}</h4>

          <p>{doc.number}</p>

          <span>
            {doc.file
              ? "Document Uploaded"
              : "Document Not Uploaded"}
          </span>

        </div>

      </div>

      <div className="document-right">

        {!doc.file ? (

          <>
            <input
              type="file"
              id={doc.key}
              hidden
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) =>
                handleDocumentUpload(
                  e,
                  doc.key
                )
              }
            />

            <label
              htmlFor={doc.key}
              className="upload-btn"
            >
              Upload
            </label>

            <div className="pending-tag">
              <BsClockHistory />
              Pending
            </div>
          </>

        ) : (

          <div className="verified-tag">
            <FaCheckCircle />
            Verified
          </div>

        )}

      </div>

    </div>

  ))}

</div>

                          

<div className="documents-footer">

  <div className="footer-left">

    <FaInfoCircle className="footer-info-icon" />

    <span>
      Supported formats:
      PDF, JPG, PNG
      (Max. file size: 10MB)
    </span>

  </div>

  <div className="footer-right">

    <span>
      Need help?
    </span>

    <a href="/">
      View guidelines
    </a>

  </div>

</div>

                          <div className="save-wrapper">

    <button
      className="save-btn"
      onClick={saveDocuments}
    >
      Save & Continue
    </button>

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
<div className="upload-tips-card">

  <h3>Upload Tips</h3>

  <div className="tip-item">

    <div className="tip-icon blue-bg">
      <FaFileAlt />
    </div>

    <div className="tip-content">
      <h4>
        Ensure documents are clear
      </h4>

      <p>
        Upload clear and readable
        documents for faster
        verification.
      </p>
    </div>

  </div>

  <div className="tip-item">

    <div className="tip-icon blue-bg">
      <FaFileAlt />
    </div>

    <div className="tip-content">
      <h4>
        Use original documents
      </h4>

      <p>
        Scanned copies or
        screenshots are not
        accepted.
      </p>
    </div>

  </div>

  <div className="tip-item">

    <div className="tip-icon orange-bg">
      <FaFileAlt />
    </div>

    <div className="tip-content">
      <h4>
        Keep documents updated
      </h4>

      <p>
        Update your documents
        before they expire for
        smooth services.
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

export default UserUploadDocuments;
