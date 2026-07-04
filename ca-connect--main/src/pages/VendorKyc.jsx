import API_URL from "../config";
import React, {
  useEffect,
  useState
} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PhoneInputModule from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Sidebar from "../components/Sidebar";
import "./VendorProfile.css";


const PhoneInput = PhoneInputModule.default || PhoneInputModule;

import {
  FaUser,
  FaFileAlt,
  FaBriefcase,
  FaTag,
  FaEye,
  FaCreditCard,
  FaSearch,
  FaBell,
  FaComments,
  FaCheckCircle
} from "react-icons/fa";

import {
  FaIdCard,
  FaMapMarkerAlt,
  FaCertificate
} from "react-icons/fa";

import {
  MdPhotoCamera
} from "react-icons/md";

import {
  RiGovernmentFill
} from "react-icons/ri";

function VendorKyc() {
    const navigate = useNavigate();
 
useEffect(() => {

  const token =
    localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
    return;
  }

  fetchProfile();

}, []);
  const [vendor, setVendor] =
    useState({});

const [steps, setSteps] = useState({
  profile: false,

  kyc: false,
  services: false,

  preview: false,
  payment: false,
});

const totalSteps = 5;

const completedSteps = [
  steps.profile,

  steps.kyc,
  steps.services,

  steps.preview,
  steps.payment,
].filter(Boolean).length;

const percentage = Math.round(
  (completedSteps / totalSteps) * 100
);

//   useEffect(() => {
//     fetchProfile();
//   }, []);
useEffect(() => {

  const token =
    localStorage.getItem("token");

  console.log("TOKEN =", token);

  fetchProfile();

}, []);
  const fetchProfile =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

      const res =
  await axios.get(
    `${API_URL}/api/vendor/profile`,
    {
     headers: {
  Authorization: `Bearer ${token}`,
},
    }
  );

        const data =
          res.data.vendor;

        setVendor(data);

        setSteps({
          profile:
            !!data.fullName &&
            !!data.email &&
            !!data.mobile,

          firm:
            !!data.firmName &&
            !!data.gstNumber,

          kyc:
            !!data.kyc
              ?.panCard,

          services:
            data.services
              ?.length > 0,

          pricing:
            true,

          preview:
            !!data.photo,

          payment:
            !!data
              .bankDetails
              ?.accountNumber
        });

      } catch (error) {
        console.log(error);
      }
    };

  const handleChange = (
    e
  ) => {

    setVendor({
      ...vendor,
      [e.target.name]:
        e.target.value
    });

  };
  const saveProfile = async () => {

  try {

    const token =
      localStorage.getItem("token");

 await axios.put(
  `${API_URL}/api/vendor/profile`,
  vendor,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);


    alert(
      "Profile Updated Successfully"
    );

    fetchProfile();

  } catch (error) {

    console.log(error);

    alert(
      "Update Failed"
    );
  }

};




  const [files, setFiles] = useState({
    panCard: null,
    aadhaarCard: null,
    photograph: null,
    addressProof: null,
    caCertificate: null,
  });

const handleFileChange = (
  field,
  file
) => {

  console.log("FIELD =>", field);
  console.log("FILE =>", file);

  setFiles((prev) => ({
    ...prev,
    [field]: file,
  }));
};

const saveKyc = async () => {

  const formData = new FormData();

  Object.keys(files).forEach((key) => {
    if (files[key]) {
      formData.append(key, files[key]);
    }
  });

  // DEBUG LOGS
  console.log("FILES =>", files);

  for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }

  try {

    const token =
      localStorage.getItem("token");

    const response =
      await fetch(
      `${API_URL}/api/vendor/kyc`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

    const data =
      await response.json();

    console.log(
      "KYC RESPONSE =>",
      data
    );

    if (data.success) {

      alert(
        "KYC Uploaded Successfully"
      );

      setTimeout(() => {
        navigate(
          "/vendor-services"
        );
      }, 500);

    }

  } catch (error) {

    console.log(error);

  }

};

const documents = [
  {
    key: "panCard",
    title: "PAN Card",
    desc: "Upload clear copy of your PAN card.",
    icon: <FaIdCard />,
  },
  {
    key: "aadhaarCard",
    title: "Aadhaar Card",
    desc: "Upload clear copy of your Aadhaar card.",
    icon: <RiGovernmentFill />,
  },
  {
    key: "photograph",
    title: "Photograph",
    desc: "Upload your recent passport size photograph.",
    icon: <MdPhotoCamera />,
  },
  {
    key: "addressProof",
    title: "Address Proof",
    desc: "Upload address proof document.",
    icon: <FaMapMarkerAlt />,
  },
  {
    key: "caCertificate",
    title: "CA Certificate",
    desc: "Upload your CA Membership Certificate.",
    icon: <FaCertificate />,
  },
];







const handleLogout = ()=>{

  const confirmLogout =
    window.confirm(
      "Are you sure you want to logout?"
    );

  if(!confirmLogout) return;

  localStorage.removeItem(
    "vendorToken"
  );

  localStorage.removeItem(
    "vendorId"
  );

  navigate(
    "/login"
  );

};











  return (
    <div className="profile-layout">

      <Sidebar />

      <div className="profile-content">

        {/* Header */}

        <div className="top-header">

          <div>

            <h2>
              My Profile
            </h2>

            <p>
              Home /
              My Profile /
              Profile Information
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

            <div className="vendor-info">

       <img
  src={
    vendor.photo
      ? `${API_URL}/uploads/${vendor.photo}`
      : "/avatar.png"
  }
  alt="Profile"
  onClick={handleLogout}
  style={{
    cursor: "pointer"
  }}
/>


              <div>

                <h4>
                  {
                    vendor.fullName
                  }
                </h4>

                <p>
                  {
                    vendor.firmName
                  }
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Tabs */}

     <div className="profile-tabs">

  <Link
    to="/vendor-profile"
    className="tab-link "
  >
    <FaUser />
    Profile Information
  </Link>

  <Link
    to="/vendor-kyc"
    className="tab-link active"
  >
    <FaFileAlt />
    KYC Verification
  </Link>

  <Link
    to="/vendor-services"
    className="tab-link"
  >
    <FaBriefcase />
    Services Offered
  </Link>

  

  <Link
    to="/vendor-preview"
    className="tab-link"
  >
    <FaEye />
    Public Profile Preview
  </Link>

  <Link
    to="/vendor-payment"
    className="tab-link"
  >
    <FaCreditCard />
    Payment Details
  </Link>

</div>
        <div className="profile-wrapper">

          {/* LEFT */}

  
  <div className="kyc-card">

  <h2>KYC Verification</h2>

  {documents.map((doc) => (
    <div
      className="kyc-row"
      key={doc.key}
    >

      {/* LEFT ICON */}

      <div className="doc-icon">
        {doc.icon}
      </div>

      {/* DOCUMENT INFO */}

      <div className="kyc-info">

        <h4>
          {doc.title}
        </h4>

        <p>
          {doc.desc}
        </p>

      </div>

      {/* UPLOAD BOX */}


<div className="upload-box">
  <label
    htmlFor={doc.key}
    className="upload-label"
  >
    <div className="upload-content">

      {vendor?.kyc?.[doc.key] ? (
        <>
          <div className="upload-icon">✅</div>
          <strong>File Uploaded</strong>
          <p>Click here to replace</p>
        </>
      ) : (
        <>
          <div className="upload-icon">☁</div>
          <strong>Click to upload</strong>
          <p>or drag and drop</p>
        </>
      )}

    </div>
  </label>

  <input
    id={doc.key}
    type="file"
    hidden
    onChange={(e) =>
      handleFileChange(doc.key, e.target.files[0])
    }
  />
</div>



      {/* FILE INFO */}

      <div className="file-info">

        <span>
          Supported formats:
        </span>

        <p>
          JPG, PNG, PDF
        </p>

        <small>
          (Max. 5MB)
        </small>

      </div>

    </div>
  ))}

  {/* NOTE */}

  <div className="kyc-note">

    <strong>
      Note:
    </strong>

    <ul>

      <li>
        Ensure all documents are
        valid and not expired.
      </li>

      <li>
        Document size should not
        exceed 5MB.
      </li>

    </ul>

  </div>

  {/* BUTTONS */}

<div className="kyc-buttons">

  <button
    className="draft-btn"
    onClick={saveKyc}
  >
    Save as Draft
  </button>
<button
  type="button"
  className="save-btn"
  onClick={saveKyc}
>
  Save & Continue
</button>

</div>

</div>


          {/* RIGHT */}

<div className="completion-card">

  <h3>Profile Completion</h3>

  <div className="completion-top">

    <div className="progress-circle">
      {percentage}%
    </div>

    <div className="progress-text">
      <p>
        Complete your profile to get
        more leads and visibility.
      </p>

      <a href="#">
        View Profile
      </a>
    </div>

  </div>

  <div className="steps-list">

    <div className="step-item">
      <span
        className={`step-dot ${
          steps.profile ? "active" : ""
        }`}
      ></span>

      <span className="step-label">
        Profile Information
      </span>

      {steps.profile ? (
        <FaCheckCircle className="green" />
      ) : (
        <div className="empty-circle"></div>
      )}
    </div>

    

    <div className="step-item">
      <span
        className={`step-dot ${
          steps.kyc ? "active" : ""
        }`}
      ></span>

      <span className="step-label">
        KYC Verification
      </span>

      {steps.kyc ? (
        <FaCheckCircle className="green" />
      ) : (
        <div className="empty-circle"></div>
      )}
    </div>

    <div className="step-item">
      <span
        className={`step-dot ${
          steps.services ? "active" : ""
        }`}
      ></span>

      <span className="step-label">
        Services Offered
      </span>

      {steps.services ? (
        <FaCheckCircle className="green" />
      ) : (
        <div className="empty-circle"></div>
      )}
    </div>

  

    <div className="step-item">
      <span
        className={`step-dot ${
          steps.preview ? "active" : ""
        }`}
      ></span>

      <span className="step-label">
        Public Profile Preview
      </span>

      {steps.preview ? (
        <FaCheckCircle className="green" />
      ) : (
        <div className="empty-circle"></div>
      )}
    </div>

    <div className="step-item">
      <span
        className={`step-dot ${
          steps.payment ? "active" : ""
        }`}
      ></span>

      <span className="step-label">
        Payment Details
      </span>

      {steps.payment ? (
        <FaCheckCircle className="green" />
      ) : (
        <div className="empty-circle"></div>
      )}
    </div>

  </div>

</div>

        </div>

      </div>

    </div>














  );
}

export default VendorKyc;