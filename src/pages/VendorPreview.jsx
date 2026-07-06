import API_URL from "../config";
import React, {
  useEffect,
  useState
} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PhoneInputModule from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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
  FaCheckCircle,
  FaClock,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaFileInvoiceDollar,
  FaGlobeAsia


} from "react-icons/fa";

import Sidebar from "../components/Sidebar";
import "./VendorProfile.css";

function VendorPreview() {

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
                Authorization:
                  `Bearer ${token}`
              }
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
            Authorization:
              `Bearer ${token}`
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
            className="tab-link"
          >
            <FaUser />
            Profile Information
          </Link>

          <Link
            to="/vendor-kyc"
            className="tab-link"
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
            className="tab-link active"
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
              {/* LEFT */}
        <div className="profile-wrapper">

              <div className="preview-card">


          <div className="preview-header">

            <div className="preview-user">

              <img
                src={
                  vendor.photo
                    ? `${API_URL}/uploads/${vendor.photo}`
                    : "/avatar.png"
                }
                alt={vendor.fullName}
                className="preview-photo"
              />

              <div className="preview-user-info">

                <h2>
                  {vendor.fullName || "Vendor Name"}
                </h2>

                <h4>
                  {vendor.firmName || "Firm Name"}
                </h4>

                <div className="preview-meta">

                  <span>
                    <FaMapMarkerAlt />
                    {vendor.city
                      ? `${vendor.city}${vendor.state
                        ? `, ${vendor.state}`
                        : ""
                      }`
                      : "Location Not Added"}
                  </span>

                  <span className="dot">
                    •
                  </span>

                  <span>
                    <FaBriefcase />
                    {vendor.experience
                      ? `${vendor.experience}+ Years Experience`
                      : "Experience Not Added"}
                  </span>

                </div>

              </div>

            </div>

            <div className="verified-badge">

              <FaCheckCircle />

              <span>
                {vendor.isVerified
                  ? "Verified CA"
                  : "Verification Pending"}
              </span>

            </div>

          </div>

          {/* ABOUT */}

          <div className="preview-section">

            <h3>
              About
            </h3>

            <p>
              {vendor.about ||
                "No description added yet."}
            </p>

          </div>

          {/* SERVICES */}

          <div className="preview-section">

            <h3>
              Services Offered
            </h3>

            <div className="services-preview-grid">

              {vendor.services?.length > 0 ? (

                vendor.services.map(
                  (service, index) => (

                    <div
                      key={index}
                      className="service-preview-box"
                    >

                      <FaFileInvoiceDollar />

                      <span>
                        {service.serviceName}
                      </span>

                    </div>

                  )
                )

              ) : (

                <p>
                  No Services Added
                </p>

              )}

            </div>

          </div>

          {/* PRICING */}

          <div className="preview-section">

            <h3>
              Pricing (Starting From)
            </h3>

            <div className="pricing-preview-grid">

              {vendor.services?.length > 0 ? (

                vendor.services.map(
                  (service, index) => (

                    <div
                      key={index}
                      className="price-preview-box"
                    >

                      <h4>
                        ₹
                        {service.price ||
                          "Not Set"}
                      </h4>

                      <p>
                        {service.serviceName}
                      </p>

                    </div>

                  )
                )

              ) : (

                <p>
                  No Pricing Added
                </p>

              )}

            </div>

          </div>

          {/* BOTTOM INFO */}

         <div className="bottom-info-grid">

  <div className="bottom-info-box">

    <FaComments />

    <div>

      <h5>
        Mode of Communication
      </h5>

      <p>
        Email, Phone, In-person
      </p>

    </div>

  </div>

  <div className="bottom-info-box">

    <FaCalendarAlt />

    <div>

      <h5>
        Working Days
      </h5>

      <p>
        Mon - Sat
      </p>

    </div>

  </div>

  <div className="bottom-info-box">

    <FaClock />

    <div>

      <h5>
        Working Hours
      </h5>

      <p>
        10:00 AM - 07:00 PM
      </p>

    </div>

  </div>

  <div className="bottom-info-box">

    <FaGlobeAsia />

    <div>

      <h5>
        Timezone
      </h5>

      <p>
        (IST) India Standard Time
      </p>

    </div>

  </div>

</div>

<div className="service-buttons">

  <button className="draft-btn">
    Save as Draft
  </button>

  <Link
    to="/vendor-payment"
    className="save-btn"
  >
    Save & Continue
  </Link>

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

export default VendorPreview;