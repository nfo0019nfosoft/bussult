import API_URL from "../config";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

import "./VendorDetails.css";
import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";


import {
  FaStar,
  FaMapMarkerAlt,
  FaBuilding,
  FaCheckCircle,
  FaCalendarCheck,
  FaLanguage,
  FaGraduationCap,
  FaBriefcase,
  FaClock,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaUserTie,
  FaQuestionCircle,
  FaBookmark,
  FaShareAlt,
  FaShieldAlt,
  FaCommentDots,
  FaRegCommentDots,
 
  
 

} from "react-icons/fa";





function VendorDetails() {
  const recentAdded = useRef(false);
  const { id } = useParams();
const navigate = useNavigate();
  const [vendor, setVendor] =
    useState(null);
useEffect(() => {
  fetchVendor();

  if (!recentAdded.current) {
    recentAdded.current = true;
    addRecentView();
  }
}, [id]);

  const fetchVendor = async () => {
    try {
      const res =
        await axios.get(
          `${API_URL}/api/vendor/${id}`
        );

      setVendor(
        res.data.vendor
      );
    } catch (error) {
      console.log(error);
    }
  };



  const addRecentView = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) return;

    await axios.post(
      `${API_URL}/api/recent/view`,
      {
        vendorId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    console.log(err);
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





  if (!vendor)
    return (
      <div className="loading">
        Loading...
      </div>
    );







      return (
  <>


  <div className="vendor-page">

    <div className="consultation-breadcrumb">

    <span>Home</span>
    <span>›</span>

    <span>Services</span>
    <span>›</span>

    <span>
      {vendor?.services?.[0]?.serviceName ||
        "CA Services"}
    </span>

    <span>›</span>

    <span>
      CA Professionals in {
        vendor?.city || "India"
      }
    </span>

    <span>›</span>

    <span>
      {vendor?.fullName}
    </span>

    <span>›</span>

    <span className="active-breadcrumb">
      Book a Consultation
    </span>

  </div>

    {/* TOP PROFILE CARD */}
    <div className="profile-card">

  {/* LEFT SIDE */}

  <div className="profile-left">

    <img
      src={
        vendor.photo
          ? `${API_URL}/uploads/${vendor.photo}`
          : "/avatar.png"
      }
      alt={vendor.fullName}
      className="profile-photo"
    />

    <div className="profile-info">

      <div className="profile-name-row">

        <h1>{vendor.fullName}</h1>

        {vendor.isVerified && (
          <FaCheckCircle className="verified-icon" />
        )}

      </div>

      <p className="profile-designation">
        {vendor.designation ||
          vendor.qualification}
      </p>

      <p className="profile-services">

        {vendor.services?.length > 0
          ? vendor.services
              .slice(0, 3)
              .map(
                (s) =>
                  s.serviceName
              )
              .join(", ")
          : "CA Services"}

      </p>

      <div className="profile-stats">

      
  <span>
  <FaStar className="star-icon" />
  {vendor.rating || 4.9} ({vendor.totalReviews || 128} Reviews)
</span>

        <span>
          <FaBriefcase />
          {vendor.experience}
          + Years Exp.
        </span>

        <span>
          <FaCheckCircle className="success-icon" />
          98% On-Time
        </span>

      </div>

      <div className="profile-location">

        <span>
          <FaMapMarkerAlt />
          {vendor.city ||
            "Mumbai"}
        </span>

        <span>
          <FaBuilding />
          {vendor.firmName ||
            "Independent Practice"}
        </span>

      </div>

      <div className="profile-tags">

        {vendor.isVerified && (
          <span className="verified-tag">

            <FaCheckCircle />

            Verified CA

          </span>
        )}

        <span className="pricing-tag">

          <FaShieldAlt />

          Trusted Professional

        </span>

        <span className="available-tag">

          <FaClock />

          {vendor.available
            ? "Available Today"
            : "Unavailable"}

        </span>

      </div>

    </div>

  </div>

  {/* RIGHT SIDE */}

  <div className="profile-actions">

   <button
  className="primary-btn"
  onClick={() =>
    navigate(
      `/free-enquiry/${vendor._id}`
    )
  }
>

      <FaQuestionCircle />

      <span>
        Enquire Now
      </span>

    </button>

   <button
  className="outline-btn"
  onClick={() =>
    navigate(
      `/book-consultation/${vendor._id}`
    )
  }
>
  <FaCalendarCheck />
  <span>Book Consultation</span>
</button>

    <button className="outline-btn">

      <FaBookmark />

      <span>
        Save Profile
      </span>

    </button>

    <button className="outline-btn">

      <FaShareAlt />

      <span>
        Share Profile
      </span>

    </button>

  </div>

</div>

    {/* TABS */}
    <div className="tabs-row">
      <button>Overview</button>
      <button>Services</button>
      <button>About</button>
      <button>Reviews</button>
      <button>Experience</button>
      <button>Qualification</button>
      <button>Articles</button>
    </div>

    {/* CONTENT */}
    <div className="content-grid">

     <div className="left-content">

  {/* ABOUT */}

  <div className="card">

    <div className="section-title">

      <FaUserTie />

      <h3>About</h3>

    </div>

    <p className="about-text">
      {vendor.about ||
        "No description available"}
    </p>

  </div>

  {/* SERVICES */}

  <div className="card">

    <div className="section-title">

      <FaBriefcase />

      <h3>
        Services Offered
      </h3>

    </div>

    <div className="service-grid">

      {vendor.services?.map(
        (service) => (

          <div
            key={service._id}
            className="service-box"
          >

            <div className="service-top">

              <h4>
                {service.serviceName}
              </h4>

              <span className="price">
                ₹{service.price}
              </span>

            </div>

            <p>
              {
                service.description
              }
            </p>

            <div className="service-bottom">

              <span>
                <FaClock />
                {
                  service.deliveryTime
                }
              </span>

            </div>

          </div>

        )
      )}

    </div>

  </div>

  {/* REVIEWS */}

  <div className="card">

    <div className="section-title">

      <FaStar />

      <h3>
        Reviews & Ratings
      </h3>

    </div>

    <div className="empty-section">

      <FaCommentDots />

      <h4>
        No Reviews Yet
      </h4>

      <p>
        Reviews will appear here once
        customers submit feedback.
      </p>

    </div>

  </div>

  {/* EXPERIENCE */}

  <div className="card">

    <div className="section-title">

      <FaGraduationCap />

      <h3>
        Experience
      </h3>

    </div>

    <div className="experience-box">

      <div className="experience-item">

        <FaBriefcase />

        <div>

          <h4>
            {vendor.firmName ||
              "Professional Practice"}
          </h4>

          <p>
            {vendor.experience}
            + Years Experience
          </p>

        </div>

      </div>

      <div className="experience-item">

        <FaCheckCircle />

        <div>

          <h4>
            Qualification
          </h4>

          <p>
            {
              vendor.qualification
            }
          </p>

        </div>

      </div>

    </div>

  </div>

</div>
    
<div className="right-content">

  {/* Availability */}

  <div className="side-card">

    <div className="side-title">
      <FaClock />
      <h4>Availability</h4>
    </div>

    <h5 className="available-now">
      {vendor.available
        ? "Available Today"
        : "Currently Unavailable"}
    </h5>

    <p className="side-value">
      {vendor.workingHours}
    </p>

    <h6>Working Days</h6>

    <p className="side-value">
      {vendor.workingDays?.length > 0
        ? vendor.workingDays.join(", ")
        : "Not Provided"}
    </p>

  </div>

  {/* Communication */}

  <div className="side-card">

    <div className="side-title">
      <FaGlobe />
      <h4>
        Communication Modes
      </h4>
    </div>

    <div className="language-tags">

      {vendor.communicationModes
        ?.length > 0 ? (

        vendor.communicationModes.map(
          (mode, index) => (
            <span key={index}>
              {mode}
            </span>
          )
        )

      ) : (

        <span>
          Not Provided
        </span>

      )}

    </div>

  </div>

  {/* Qualification */}

  <div className="side-card">

    <div className="side-title">
      <FaGraduationCap />
      <h4>
        Qualification
      </h4>
    </div>

    <h5>
      {vendor.qualification ||
        "Not Provided"}
    </h5>

    <p>
      Membership No :
      {" "}
      {vendor.membershipNumber ||
        "N/A"}
    </p>

  </div>

  {/* Professional Details */}

  <div className="side-card">

    <div className="side-title">
      <FaShieldAlt />
      <h4>
        Professional Details
      </h4>
    </div>

    <ul className="membership-list">

      <li>
        CA Number :
        {" "}
        {vendor.caNumber ||
          "N/A"}
      </li>

      <li>
        Profile Type :
        {" "}
        {vendor.profileType}
      </li>

      <li>
        Experience :
        {" "}
        {vendor.experience}
        + Years
      </li>

    </ul>

  </div>

  {/* Firm Details */}

  {vendor.firmName && (

    <div className="side-card">

      <div className="side-title">
        <FaBuilding />
        <h4>
          Firm Details
        </h4>
      </div>

      <p>
        {vendor.firmName}
      </p>

      <p>
        {vendor.firmType}
      </p>

      <p>
        {vendor.officeEmail}
      </p>

      <p>
        {vendor.officeMobile}
      </p>

    </div>

  )}

  {/* Areas Served */}

  <div className="side-card">

    <div className="side-title">
      <FaMapMarkerAlt />
      <h4>
        Areas Served
      </h4>
    </div>

    <p>
      {[
        vendor.city,
        vendor.state,
        vendor.country,
      ]
        .filter(Boolean)
        .join(", ")}
    </p>

    <p>
      {vendor.pincode}
    </p>

  </div>

</div>
    </div>
    <div className="bottom-action-bar">

  <button
  className="bottom-enquire-btn"
  onClick={() =>
    navigate(
      `/free-enquiry/${vendor._id}`
    )
  }
>

    <FaRegCommentDots />

    <span>
      Enquire Now
    </span>

  </button>

  <button
  className="bottom-consult-btn"
  onClick={() =>
    navigate(
      `/book-consultation/${vendor._id}`
    )
  }
>
  <FaCalendarCheck />
  <span>Book Consultation</span>
</button>

</div>

  </div>


</>
        );
}

export default VendorDetails;