import API_URL from "../config";
import { useEffect, useState } from "react";
import axios from "axios";

import "./FreeEnquiry.css";
import { useParams, useNavigate } from "react-router-dom";

import {
  FaCheckCircle,
  FaMapMarkerAlt,
  FaBuilding,
  FaShieldAlt,
  FaClock,
  FaBriefcase,
  FaCloudUploadAlt,
  FaStar,
  FaFileAlt,
  FaWhatsapp,
  FaBolt,
  FaLock,
  FaHeadset,
  FaPhoneAlt,
  FaEnvelope,
  FaUserTie,
  FaUsers,
  FaUserCheck,



} from "react-icons/fa";

function FreeEnquiry() {
  const [enquiry, setEnquiry] = useState(null);
  
  const { id } = useParams();

useEffect(() => {
  if(id){
    fetchEnquiry();
  }
}, [id]);

const fetchEnquiry = async () => {
  try {

    const token =
      localStorage.getItem("token");

    const res =
      await axios.get(
        `${API_URL}/api/enquiries/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    const enquiry =
      res.data.enquiry;

    setEnquiry(enquiry);

    setFormData({
      serviceName:
        enquiry.serviceName || [],
      fullName:
        enquiry.fullName || "",
      email:
        enquiry.email || "",
      mobile:
        enquiry.mobile || "",
      city:
        enquiry.city || "",
      state:
        enquiry.state || "",
      preferredContact:
        enquiry.preferredContact || "Call",
      preferredTime:
        enquiry.preferredTime || "",
      businessType:
        enquiry.businessType || "",
      annualTurnover:
        enquiry.annualTurnover || "",
      businessStructure:
        enquiry.businessStructure || "",
      panNumber:
        enquiry.panNumber || "",
      gstRequired:
        enquiry.gstRequired || "",
      hearAboutUs:
        enquiry.hearAboutUs || "",
      budget:
        enquiry.budget || "",
      timeline:
        enquiry.timeline || "",
      requirements:
        enquiry.requirements || "",
      files: [],
    });
    if (
  enquiry.vendorId &&
  typeof enquiry.vendorId === "object"
) {

  setVendor(
    enquiry.vendorId
  );

} else if (
  enquiry.vendorId
) {

  const vendorRes =
    await axios.get(
      `${API_URL}/api/vendor/${enquiry.vendorId}`
    );

  setVendor(
    vendorRes.data.vendor
  );
}

  } catch (err) {

    console.log(err);

  }
};

  const { vendorId } = useParams();

  const navigate = useNavigate();

  const [vendor, setVendor] =
    useState(null);

  const [step, setStep] =
    useState(1);



    const handleSubmit = async () => {
  try {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const data = new FormData();

    // Required IDs
    data.append(
  "vendorId",
  vendor?._id || vendorId
);

    data.append(
      "userId",
      user?._id || ""
    );

    // Normal Fields
    Object.keys(formData).forEach(
      (key) => {

        if (
          key !== "files" &&
          key !== "serviceName"
        ) {
          data.append(
            key,
            formData[key]
          );
        }

      }
    );

    // Services
    formData.serviceName.forEach(
      (service) => {
        data.append(
          "serviceName",
          service
        );
      }
    );

    // Documents
    formData.files.forEach(
      (file) => {
        data.append(
          "documents",
          file
        );
      }
    );

    // Submit Enquiry
    await axios.post(
      `${API_URL}/api/enquiries`,
      data,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    alert(
      "Enquiry Submitted Successfully"
    );

    navigate(
      "/user-enquiry"
    );

  } catch (err) {

    console.log(err);

    alert(
      "Failed to submit enquiry"
    );

  }
};

  const steps = [
    {
      id: 1,
      title: "Select Service",
      subtitle:
        "Choose the service you need",
    },
    {
      id: 2,
      title:
        "Your Details",
      subtitle:
        "Tell us about yourself",
    },
    {
      id: 3,
      title:
        "Business Details",
      subtitle:
        "Provide business information",
    },
    {
      id: 4,
      title:
        "Requirements",
      subtitle:
        "Add more details",
    },
    {
      id: 5,
      title:
        "Review & Submit",
      subtitle:
        "Confirm and send enquiry",
    },
  ];
const [formData, setFormData] = useState({
  serviceName: [],
  fullName: "",
  email: "",
  mobile: "",

  city: "",
  state: "",

  preferredContact: "Call",
  preferredTime: "",

  businessType: "",
  annualTurnover: "",
  businessStructure: "",

  panNumber: "",

  gstRequired: "",
  hearAboutUs: "",

  budget: "",
  timeline: "",

  requirements: "",
  files: [],
});

 const [agreeTerms, setAgreeTerms] =
  useState(false);

  const isFormValid =
  formData.serviceName.length > 0 &&
  formData.fullName &&
  formData.email &&
  formData.mobile &&
  formData.businessType &&
  formData.businessStructure &&
  formData.requirements?.trim() &&
  agreeTerms;
useEffect(() => {

  if (id) {

    fetchEnquiry();

  } else if (vendorId) {

    fetchVendor();

  }

}, [vendorId, id]);
useEffect(() => {

  let currentStep = 1;

  if (formData.serviceName.length > 0) {
  currentStep = 2;
}

  if (
  formData.serviceName.length > 0 &&
  formData.fullName &&
  formData.email &&
  formData.mobile
) {
    currentStep = 3;
  }

  if (
  formData.serviceName.length > 0 &&
  formData.fullName &&
  formData.email &&
  formData.mobile &&
  formData.businessType &&
  formData.businessStructure
) {
    currentStep = 4;
  }

  if (
  formData.serviceName.length > 0 && 
    formData.fullName &&
    formData.email &&
    formData.mobile &&
    formData.businessType &&
    formData.businessStructure &&
    formData.requirements?.trim() &&
    agreeTerms
  ) {
    currentStep = 5;
  }

  setStep(currentStep);

}, [formData, agreeTerms]);




 const fetchVendor = async () => {
  try {
    const res = await axios.get(
      `${API_URL}/api/vendor/${vendorId}`
    );

    console.log("FULL RESPONSE =", res.data);
    console.log("VENDOR =", res.data.vendor);
    console.log("SERVICES =", res.data.vendor?.services);
    console.log("EXPERIENCE =", res.data.vendor?.experience);

    setVendor(res.data.vendor);
  } catch (error) {
    console.log(error);
  }
};

  if (!vendor) {


    
    return (
      <div
        style={{
          padding: "100px",
          textAlign:
            "center",
        }}
      >
        Loading...
      </div>
    );

  }

  return (
    <div className="vendor-page">

      <div className="breadcrum">

        <span>Home</span>

        <span className="separator">
          ›
        </span>

        <span>
          Services
        </span>

        <span className="separator">
          ›
        </span>

        <span>
          Income Tax Services
        </span>

        <span className="separator">
          ›
        </span>

        <span>
          CA Professionals in{" "}
          {vendor.city}
        </span>

        <span className="separator">
          ›
        </span>

        <span>
          {vendor.fullName}
        </span>

        <span className="separator">
          ›
        </span>

        <span className="active">
          Enquiry
        </span>

      </div>

      <div className="enquiry-header">

  <h1>
    Send Enquiry to{" "}
    <span>{vendor.fullName}</span>
  </h1>

  <p>
    Fill in your details and our team
    will get in touch with you shortly.
  </p>

</div>

<div className="stepper-wrapper">

  {steps.map((item, index) => (

    <div
      key={item.id}
      className="step-item"
    >

      <div className="step-top">

        <div
          className={`step-circle ${
            step >= item.id
              ? "active"
              : ""
          }`}
        >
          {item.id}
        </div>

        {index !==
          steps.length - 1 && (

          <div
            className={`step-line ${
              step > item.id
                ? "active"
                : ""
            }`}
          />

        )}

      </div>

      <div className="step-content">

        <h4>
          {item.title}
        </h4>

        <p>
          {item.subtitle}
        </p>

      </div>

    </div>

  ))}

</div>



<div className="enquiry-layout">
<div className="left-enquiry">

  {/* ======================
      1. SELECT SERVICE
  ======================= */}

 <div className="enquiry-card">

  <h3>
    1. Select Service
  </h3>

  <p className="section-subtitle">
    Choose the service you need help with
  </p>

  <div className="service-grid">

    {vendor.services?.map((service) => (

      <div
        key={service._id}
        className={`service-box ${
          formData.serviceName.includes(
            service.serviceName
          )
            ? "active"
            : ""
        }`}
        onClick={() => {

          const exists =
            formData.serviceName.includes(
              service.serviceName
            );

          if (exists) {

            setFormData((prev) => ({
              ...prev,
              serviceName:
                prev.serviceName.filter(
                  (item) =>
                    item !==
                    service.serviceName
                ),
            }));

          } else {

            setFormData((prev) => ({
              ...prev,
              serviceName: [
                ...prev.serviceName,
                service.serviceName,
              ],
            }));

          }

        }}
      >

        <FaBriefcase />

        <h4>
          {service.serviceName}
        </h4>

        <p>
          ₹{service.price}
        </p>

        {formData.serviceName.includes(
          service.serviceName
        ) && (
          <span className="selected-badge">
            ✓ Selected
          </span>
        )}

      </div>

    ))}

  </div>

  {formData.serviceName.length === 0 && (
    <p className="service-note">
      Please select at least one service to continue
    </p>
  )}

</div>

  {/* ======================
      2. YOUR DETAILS
  ======================= */}

  <div className="enquiry-card">

    <h3>
      2. Your Details
    </h3>

    <p className="section-subtitle">
      Please provide your personal details
    </p>

    <div className="form-grid">

      <div className="form-group">

        <label>
          Full Name *
        </label>

        <input
          type="text"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({
              ...formData,
              fullName:
                e.target.value,
            })
          }
        />

      </div>

      <div className="form-group">

        <label>
          Email Address *
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email:
                e.target.value,
            })
          }
        />

      </div>

      <div className="form-group">

        <label>
          Mobile Number *
        </label>

        <input
          type="text"
          placeholder="Enter mobile number"
          value={formData.mobile}
          onChange={(e) =>
            setFormData({
              ...formData,
              mobile:
                e.target.value,
            })
          }
        />

      </div>

  <div className="form-group">

  <label>
    City *
  </label>

  <input
    type="text"
    placeholder="Enter your city"
    value={formData.city}
    onChange={(e) =>
      setFormData({
        ...formData,
        city: e.target.value
      })
    }
  />

</div>

<div className="form-group">

  <label>
    State *
  </label>

  <input
    type="text"
    placeholder="Enter your state"
    value={formData.state}
    onChange={(e) =>
      setFormData({
        ...formData,
        state: e.target.value
      })
    }
  />

</div>

      <div className="form-group">

        <label>
          Preferred Time To Contact
        </label>

        <select
          value={
            formData.preferredTime
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              preferredTime:
                e.target.value,
            })
          }
        >

          <option value="">
            Select Time Slot
          </option>

          <option>
            09:00 AM - 11:00 AM
          </option>

          <option>
            11:00 AM - 01:00 PM
          </option>

          <option>
            02:00 PM - 04:00 PM
          </option>

          <option>
            04:00 PM - 06:00 PM
          </option>

        </select>

      </div>

    

    <div className="radio-group">

      <label>

        <input
          type="radio"
          value="Call"
          checked={
            formData.preferredContact ===
            "Call"
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              preferredContact:
                e.target.value,
            })
          }
        />

        Call

      </label>

      <label>

        <input
          type="radio"
          value="WhatsApp"
          checked={
            formData.preferredContact ===
            "WhatsApp"
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              preferredContact:
                e.target.value,
            })
          }
        />

        WhatsApp

      </label>

      <label>

        <input
          type="radio"
          value="Email"
          checked={
            formData.preferredContact ===
            "Email"
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              preferredContact:
                e.target.value,
            })
          }
        />

        Email

      </label>

    </div>

  </div>
</div>
  {/* ======================
      3. BUSINESS DETAILS
  ======================= */}

  <div className="enquiry-card">

    <h3>
      3. Business Details
    </h3>

    <p className="section-subtitle">
      Tell us about your business
    </p>

    <div className="form-grid">

      <div className="form-group">

        <label>
          Business Type
        </label>

        <select
          value={
            formData.businessType
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              businessType:
                e.target.value,
            })
          }
        >

          <option value="">
            Select Business Type
          </option>

          <option>
            Proprietorship
          </option>

          <option>
            Partnership
          </option>

          <option>
            LLP
          </option>

          <option>
            Private Limited
          </option>

        </select>

      </div>

      <div className="form-group">

        <label>
          PAN Number
        </label>

        <input
          type="text"
          placeholder="Enter PAN Number"
          value={
            formData.panNumber
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              panNumber:
                e.target.value,
            })
          }
        />

      </div>

      <div className="form-group">

        <label>
          Annual Turnover
        </label>

        <select
          value={
            formData.annualTurnover
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              annualTurnover:
                e.target.value,
            })
          }
        >

          <option value="">
            Select Turnover
          </option>

          <option>
            Below ₹10 Lakhs
          </option>

          <option>
            ₹10L - ₹50L
          </option>

          <option>
            ₹50L - ₹1Cr
          </option>

          <option>
            Above ₹1Cr
          </option>

        </select>

      </div>

      <div className="form-group">

        <label>
          Business Structure
        </label>

        <select
          value={
            formData.businessStructure
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              businessStructure:
                e.target.value,
            })
          }
        >

          <option value="">
            Select Structure
          </option>

          <option>
            Individual
          </option>

          <option>
            Firm
          </option>

          <option>
            Company
          </option>

          <option>
            Startup
          </option>

        </select>

      </div>

    
    <div className="form-group">

  <label>
    GST Required
  </label>

  <select
    value={formData.gstRequired}
    onChange={(e) =>
      setFormData({
        ...formData,
        gstRequired: e.target.value,
      })
    }
  >
    <option value="">
      Select GST Requirement
    </option>

    <option value="Yes">
      Yes
    </option>

    <option value="No">
      No
    </option>

  </select>

</div>

<div className="form-group">

  <label>
    How did you hear about us?
  </label>

  <select
    value={formData.hearAboutUs}
    onChange={(e) =>
      setFormData({
        ...formData,
        hearAboutUs: e.target.value,
      })
    }
  >
    <option value="">
      Select Source
    </option>

    <option value="Google Search">
      Google Search
    </option>

    <option value="Social Media">
      Social Media
    </option>

    <option value="Friend or Family">
      Friend or Family
    </option>

    

    <option value="LinkedIn">
      LinkedIn
    </option>


    <option value="Advertisement">
      Advertisement
    </option>

    <option value="Referral">
      Referral
    </option>

    <option value="Other">
      Other
    </option>

  </select>

</div>
</div>

  </div>

  {/* ======================
      4. REQUIREMENTS
  ======================= */}

  <div className="enquiry-card">

    <h3>
      4. Requirements
    </h3>

    <p className="section-subtitle">
      Share more details about your requirement
    </p>


<div className="requirement-extra-fields">

  <div className="form-group">
    <label>Budget Range</label>

    <select
      value={formData.budget}
      onChange={(e) =>
        setFormData({
          ...formData,
          budget: e.target.value
        })
      }
    >
      <option value="">
        Select Budget
      </option>

      <option>Below ₹1,000</option>
      <option>₹1,000 - ₹2,000</option>
      <option>₹3,000 - ₹4,000</option>
      <option>₹4,000 - ₹5,000</option>
      <option>Above ₹5,000</option>
    </select>

  </div>

  <div className="form-group">

    <label>Expected Timeline</label>

    <select
      value={formData.timeline}
      onChange={(e) =>
        setFormData({
          ...formData,
          timeline: e.target.value
        })
      }
    >
      <option value="">
        Select Timeline
      </option>

      <option>Immediate</option>
      <option>Within 1 Week</option>
      <option>Within 2 Weeks</option>
      <option>Within 1 Month</option>
      <option>Flexible</option>
    </select>

  </div>

</div>









    <textarea
      rows="6"
      placeholder="Tell us more about your requirement..."
      value={
        formData.requirements
      }
      onChange={(e) =>
        setFormData({
          ...formData,
          requirements:
            e.target.value,
        })
      }
    />

  </div>

  {/* ======================
      5. DOCUMENTS
  ======================= */}

  <div className="file-upload">

  <FaCloudUploadAlt />

  <h4>
    Drag & Drop Files
    or Browse
  </h4>

  <p>
    PDF, JPG, PNG
    (Max 5MB each)
  </p>

  <input
    type="file"
    multiple
    onChange={(e) =>
      setFormData({
        ...formData,
        files: [
          ...e.target.files,
        ],
      })
    }
  />

</div>






  <div className="terms-box">

  <label>

    <input
      type="checkbox"
      checked={agreeTerms}
      onChange={(e) =>
        setAgreeTerms(
          e.target.checked
        )
      }
    />

    <span>
      I agree to the
      <a href="#">
        Terms &
        Conditions
      </a>
      and
      <a href="#">
        Privacy Policy
      </a>
    </span>

  </label>

</div>
{!isFormValid && (
  <p className="enquiry-warning">
    Please fill all the details to submit your enquiry.
  </p>
)}
<div className="enquiry-footer">

  <button
    className="canel-btn"
    onClick={() => navigate(-1)}
  >
    Cancel
  </button>

  <button
    className={`review-btn ${
      !isFormValid ? "disabled" : ""
    }`}
    disabled={!isFormValid}
    onClick={handleSubmit}
  >
    Submit Enquiry →
  </button>
  

</div>

</div>
<div className="right-sidebar">

  {/* Vendor Card */}

<div className="enquiry-vendor-card">

  <div className="enquiry-vendor-top">

    <img
      src={
        vendor.photo
          ? `${API_URL}/uploads/${vendor.photo}`
          : "/avatar.png"
      }
      alt={vendor.fullName}
    />

    <div className="enquiry-vendor-info">

      <h3>
        {vendor.fullName}
        {vendor.isVerified && (
          <FaCheckCircle className="enquiry-verified-icon" />
        )}
      </h3>

      <p>{vendor.qualification}</p>

      <p>
        {vendor.services
          ?.slice(0, 3)
          .map(service => service.serviceName)
          .join(", ")}
      </p>

      <div className="enquiry-vendor-rating">
        <FaStar />
        4.9 (128 Reviews)
      </div>

      <div className="enquiry-vendor-tags">
        <span>Verified CA</span>

        <span>
          {vendor.experience}+ Years Exp.
        </span>
      </div>

    </div>

  </div>

</div>
  {/* Enquiry Summary */}

  <div className="sidebar-card">

    <h3>
      Enquiry Summary
    </h3>

    <div className="summary-item">

      <FaFileAlt />

      <div>

        <h5>
          Selected Service
        </h5>

        <p>
  {formData.serviceName.length > 0
    ? formData.serviceName.join(", ")
    : "Not Selected"}
</p>

      </div>

    </div>

    <div className="summary-item">

      <FaWhatsapp />

      <div>

        <h5>
          Preferred Contact
        </h5>

        <p>
          {formData.preferredContact ||
            "Not Selected"}
        </p>

      </div>

    </div>

    <div className="summary-item">

      <FaClock />

      <div>

        <h5>
          Preferred Time
        </h5>

        <p>
          {formData.preferredTime ||
            "Not Selected"}
        </p>

      </div>

    </div>

    <div className="summary-item">

      <FaFileAlt />

      <div>

        <h5>
          Attachments
        </h5>

        <p>
          {formData.files
            ?.length || 0}
          {" "}
          Files Uploaded
        </p>

      </div>

    </div>

  </div>

  {/* Why Send Enquiry */}

  <div className="sidebar-card">

    <h3>
      Why send enquiry?
    </h3>

    <div className="feature-row">

      <div className="feature-icon">

        <FaShieldAlt />

      </div>

      <div>

        <h4>
          100% Free
        </h4>

        <p>
          No hidden charges
          for enquiry
        </p>

      </div>

    </div>

    <div className="feature-row">

      <div className="feature-icon">

        <FaBolt />

      </div>

      <div>

        <h4>
          Quick Response
        </h4>

        <p>
          We usually respond
          within few hours
        </p>

      </div>

    </div>

    <div className="feature-row">

      <div className="feature-icon">

        <FaLock />

      </div>

      <div>

        <h4>
          Data Safe &
          Secure
        </h4>

        <p>
          Your information
          is protected
        </p>

      </div>

    </div>

  </div>

  {/* Need Help */}

  <div className="sidebar-card">

    <h3>
      Need Help?
    </h3>

    <p className="help-text">
      Our support team is
      here to help you.
    </p>

    <div className="help-item">

      <FaPhoneAlt />

      <span>
        +91 98765 43210
      </span>

    </div>

    <div className="help-item">

      <FaEnvelope />

      <span>
        support@caconnect.com
      </span>

    </div>

    <div className="help-item">

      <FaUserTie />

      <span>
        Mon - Sat |
        9 AM - 7 PM
      </span>

    </div>

  </div>

</div>
    </div>




<div className="trust-strip-wrapper">

  <div className="trust-strip-item">
    <FaUsers className="trust-strip-icon" />
    <span>
      Trusted by 10,000+ Clients
    </span>
  </div>

  <div className="trust-strip-item">
    <FaUserCheck className="trust-strip-icon" />
    <span>
      Verified CA Professionals
    </span>
  </div>

  <div className="trust-strip-item">
    <FaShieldAlt className="trust-strip-icon" />
    <span>
      Secure & Confidential
    </span>
  </div>

  <div className="trust-strip-item">
    <FaBolt className="trust-strip-icon" />
    <span>
      Quick & Easy Process
    </span>
  </div>

</div>
    </div>
  );
}

export default FreeEnquiry;