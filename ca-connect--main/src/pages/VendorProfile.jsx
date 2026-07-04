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
  FaCheckCircle
} from "react-icons/fa";

import Sidebar from "../components/Sidebar";
import "./VendorProfile.css";

function VendorProfile() {





  const [vendor, setVendor] = useState({
  fullName: "",
  email: "",
  mobile: "",
  designation: "",
  qualification: "",
  experience: "",
  about: "",
  profileType: "individual",
});

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

  if (!token) {
    window.location.href = "/login";
    return;
  }

  fetchProfile();

}, []);
 const fetchProfile = async () => {

  const token =
    localStorage.getItem("token");

  try {

    const res = await axios.get(
      `${API_URL}/api/vendor/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`
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

      kyc:
        !!data.kyc?.panCard,

      services:
        data.services?.length > 0,

      preview:
        !!data.photo,

      payment:
        !!data.bankDetails
          ?.accountNumber,
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
const handlePhotoChange = async (e) => {

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
      `${API_URL}/api/vendor/photo`,
      formData,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    fetchProfile();

    alert(
      "Photo Updated Successfully"
    );

  } catch (error) {

    console.log(error);

    alert(
      "Photo Upload Failed"
    );

  }

};
const saveProfile = async () => {

  console.log("VENDOR DATA =>", vendor);

  if (!vendor.mobile) {
    alert("Mobile Number Missing");
    return;
  }

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

    alert("Profile Updated Successfully");

    fetchProfile();

  } catch (error) {

    console.log(error);

    alert("Update Failed");
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
    className="tab-link active"
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

          <div className="profile-main">

            <div className="profile-car">

              <h3>
                Profile Information
              </h3>

              <p>
                Manage your
                personal details
              </p>

          <div className="profile-section">

  <div className="profile-image">

    <img
      src={
        vendor.photo
          ? `${API_URL}/uploads/${vendor.photo}`
          : "/avatar.png"
      }
      alt=""
    />

    <input
      type="file"
      id="photo"
      hidden
      accept="image/*"
      onChange={handlePhotoChange}
    />

    <label
      htmlFor="photo"
      className="save-btn"
    >
      Change Photo
    </label>

  </div>

  <div className="form-area">

    <div className="form-grid">

      <div className="form-group">
        <label>Full Name</label>
        <input
          name="fullName"
          value={vendor.fullName || ""}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Email Address</label>
        <input
          name="email"
          value={vendor.email || ""}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Mobile Number(91)</label>
        <input
          name="mobile"
          value={vendor.mobile || ""}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Designation / Position</label>
        <input
          name="designation"
          value={vendor.designation || ""}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Experience (In Years)</label>
        <input
          name="experience"
          value={vendor.experience || ""}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Qualification</label>
        <input
          name="qualification"
          value={vendor.qualification || ""}
          onChange={handleChange}
        />
      </div>

    </div>

    <div className="form-group full-width">

      <label>About You</label>

      <textarea
        name="about"
        value={vendor.about || ""}
        onChange={handleChange}
      />

    </div>

  </div>

</div>
<div className="firm-card">

  <h3>Firm Details</h3>
  <p>Provide your firm or professional details.</p>

  <div className="profile-type-wrapper">

    <label className="type-card">
      <input
        type="radio"
        name="profileType"
        value="individual"
        checked={vendor.profileType === "individual"}
        onChange={handleChange}
      />
      <div>
        <h4>Individual (CA)</h4>
        <p>You are practicing as an individual</p>
      </div>
    </label>

    <label className="type-card">
      <input
        type="radio"
        name="profileType"
        value="firm"
        checked={vendor.profileType === "firm"}
        onChange={handleChange}
      />
      <div>
        <h4>Firm</h4>
        <p>You are practicing as a firm</p>
      </div>
    </label>

  </div>

  {/* =========================
      INDIVIDUAL SECTION
  ========================= */}

  {vendor.profileType !== "firm" && (
<div className="firm-grid">

  <div className="form-group">
    <label>CA Number</label>
    <input
      name="caNumber"
      value={vendor.caNumber || ""}
      onChange={handleChange}
    />
  </div>

  <div className="form-group">
    <label>Membership Number</label>
    <input
      name="membershipNumber"
      value={vendor.membershipNumber || ""}
      onChange={handleChange}
    />
  </div>

  <div className="form-group">
    <label>Contact Number</label>
    <PhoneInput
      country={"in"}
      enableSearch
      value={vendor.officeMobile || ""}
      onChange={(value, data) => {
        setVendor({
          ...vendor,
          officeMobile: value,
          officeCountryCode: data?.dialCode
            ? `+${data.dialCode}`
            : "+91",
        });
      }}
    />
  </div>

  <div className="form-group">
    <label>Address Line 1</label>
    <input
      name="addressLine1"
      value={vendor.addressLine1 || ""}
      onChange={handleChange}
    />
  </div>

  <div className="form-group">
    <label>Address Line 2</label>
    <input
      name="addressLine2"
      value={vendor.addressLine2 || ""}
      onChange={handleChange}
    />
  </div>

  <div className="form-group">
    <label>Country</label>
    <input
      name="country"
      value={vendor.country || ""}
      onChange={handleChange}
    />
  </div>

  <div className="form-group">
    <label>State</label>
    <input
      name="state"
      value={vendor.state || ""}
      onChange={handleChange}
    />
  </div>

  <div className="form-group">
    <label>City</label>
    <input
      name="city"
      value={vendor.city || ""}
      onChange={handleChange}
    />
  </div>

  <div className="form-group">
    <label>Pincode</label>
    <input
      name="pincode"
      value={vendor.pincode || ""}
      onChange={handleChange}
    />
  </div>

</div>

  )}

  {/* =========================
      FIRM SECTION
  ========================= */}

  {vendor.profileType === "firm" && (
<div className="firm-grid">

  <div className="form-group">
    <label>Firm Name</label>
    <input
      name="firmName"
      value={vendor.firmName || ""}
      onChange={handleChange}
    />
  </div>

  <div className="form-group">
    <label>Firm Registration No</label>
    <input
      name="firmRegistrationNo"
      value={vendor.firmRegistrationNo || ""}
      onChange={handleChange}
    />
  </div>

  <div className="form-group">
    <label>Firm Type</label>
    <select
      name="firmType"
      value={vendor.firmType || ""}
      onChange={handleChange}
    >
      <option value="">Select Firm Type</option>
      <option value="Proprietorship">Proprietorship</option>
      <option value="Partnership">Partnership</option>
      <option value="LLP">LLP</option>
      <option value="Private Limited">Private Limited</option>
    </select>
  </div>

  <div className="form-group">
    <label>Established On</label>
    <input
      type="date"
      name="establishedOn"
      value={
        vendor.establishedOn
          ? vendor.establishedOn.slice(0, 10)
          : ""
      }
      onChange={handleChange}
    />
  </div>

  <div className="form-group">
    <label>GST Number</label>
    <input
      name="gstNumber"
      value={vendor.gstNumber || ""}
      onChange={handleChange}
    />
  </div>

  <div className="form-group">
    <label>PAN Number</label>
    <input
      name="panNumber"
      value={vendor.panNumber || ""}
      onChange={handleChange}
    />
  </div>

  <div className="form-group">
    <label>Address Line 1</label>
    <input
      name="addressLine1"
      value={vendor.addressLine1 || ""}
      onChange={handleChange}
    />
  </div>

  <div className="form-group">
    <label>Address Line 2</label>
    <input
      name="addressLine2"
      value={vendor.addressLine2 || ""}
      onChange={handleChange}
    />
  </div>

  <div className="form-group">
    <label>Country</label>
    <input
      name="country"
      value={vendor.country || ""}
      onChange={handleChange}
    />
  </div>

  <div className="form-group">
    <label>State</label>
    <input
      name="state"
      value={vendor.state || ""}
      onChange={handleChange}
    />
  </div>

  <div className="form-group">
    <label>City</label>
    <input
      name="city"
      value={vendor.city || ""}
      onChange={handleChange}
    />
  </div>

  <div className="form-group">
    <label>Pincode</label>
    <input
      name="pincode"
      value={vendor.pincode || ""}
      onChange={handleChange}
    />
  </div>

  <div className="form-group">
    <label>Landmark</label>
    <input
      name="landmark"
      value={vendor.landmark || ""}
      onChange={handleChange}
    />
  </div>

  <div className="form-group">
    <label>Office Contact Number</label>
    <PhoneInput
      country={"in"}
      enableSearch
      value={vendor.officeMobile || ""}
      onChange={(value, data) => {
        setVendor({
          ...vendor,
          officeMobile: value,
          officeCountryCode: data?.dialCode
            ? `+${data.dialCode}`
            : "+91",
        });
      }}
    />
  </div>

  <div className="form-group">
    <label>Email Address</label>
    <input
      name="officeEmail"
      value={vendor.officeEmail || ""}
      onChange={handleChange}
    />
  </div>

  <div className="form-group">
    <label>Website</label>
    <input
      name="website"
      value={vendor.website || ""}
      onChange={handleChange}
    />
  </div>

</div>

  )}
<div className="service-buttons">

 <button
  className="draft-btn"
  onClick={saveProfile}
>
  Save as Draft
</button>
  <Link
    to="/vendor-kyc"
    className="save-btn"
    onClick={saveProfile}
  >
    Save & Continue
  </Link>

</div>

</div>

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

export default VendorProfile;