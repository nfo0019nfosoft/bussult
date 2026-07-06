import API_URL from "../config";
import { useEffect, useState } from "react";
import axios from "axios";
import "./VendorLeads.css";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

import {
  FaSearch,
  FaBell,
  FaEye,
  FaUserCircle,
  FaRegCommentDots,
  FaFilter,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClipboardList,
  FaStickyNote,
  FaCalendarAlt,
  FaFileAlt,
  FaHistory,
  FaBuilding,
  FaClock,
  FaIdCard,
  FaWallet,
  FaUpload,
  FaSave,
  FaArrowLeft,
  FaCheck,
  

} from "react-icons/fa";

const LeadDetails = () => {

const navigate = useNavigate();
 const { id } = useParams();

const [lead, setLead] = useState(null);
const [vendor, setVendor] = useState(null);
const [loading, setLoading] = useState(true);
const [notes, setNotes] = useState("");

useEffect(() => {

  fetchLead();
  fetchVendor();

}, []);





const fetchLead = async () => {
  try {

    const res = await axios.get(
      `${API_URL}/api/enquiries/${id}`
    );

    setLead(res.data.enquiry);

    setNotes(
      res.data.enquiry.notes || ""
    );

  } catch (err) {

    console.log(err);

  } finally {

    setLoading(false);

  }
};




const saveNotes = async () => {

  try {

    await axios.put(
      `${API_URL}/api/enquiries/${id}/notes`,
      {
        notes
      }
    );

    alert("Notes saved successfully");

  } catch (err) {

    console.log(err);

    alert("Failed to save notes");

  }

};








const fetchVendor = async () => {

  try {

    const vendorId =
      localStorage.getItem("vendorId");

    const res = await axios.get(
      `${API_URL}/api/vendor/${vendorId}`
    );

    setVendor(res.data.vendor);

  } catch (err) {

    console.log(err);

  }

};

if (loading) {

  return (
    <div className="loading">
      Loading...
    </div>
  );

}

if (!lead) {

  return (
    <div className="loading">
      No Lead Found
    </div>
  );

}
  return (

    <div className="vendor-layout">

      <Sidebar />

      <div className="myleads-container">

        {/* Header */}
<div className="leads-topbar">

  <div className="leads-topbar-left">

    <h1>My Leads</h1>

    <div className="breadcrumb">

      <span>Home</span>

      <span>›</span>

      <span>My Leads</span>

       <span>›</span>

        <span>Lead Details</span>

    </div>

  </div>

  <div className="leads-topbar-right">

    <div className="lead-search-box">

      <FaSearch />

      <input
        type="text"
        placeholder="Search leads..."
      />

      <span className="shortcut-key">
        Ctrl + K
      </span>

    </div>

    <button className="message-btn">

      <FaRegCommentDots />

    </button>

    <button className="notification-btn">

      <FaBell />

    

    </button>

    <div className="vendor-header-profile">

    <img
  src={
    vendor?.photo
      ? `${API_URL}/uploads/${vendor.photo}`
      : "/avatar.png"
  }
  alt=""
/>

      <div>

        <h4>
          {vendor?.fullName}
        </h4>

        <p>
          {vendor?.firmName}
        </p>

      </div>

    </div>

  </div>

</div>
<div className="leaddetails-header-actions">

  <button
    className="leaddetails-back-btn"
    onClick={() => navigate("/vendor-leads")}
  >
    <FaArrowLeft />
    Back to Leads
  </button>

  <button className="leaddetails-convert-btn">
    <FaCheck />
    Mark as Converted
  </button>

  <button className="leaddetails-schedule-btn">
    <FaCalendarAlt />
    Schedule Appointment
  </button>

</div>
        {/* Tabs */}
        <div className="lead-main-content">



<div className="lead-details-page">

  {/* Top Card */}

 <div className="leaddetails-profile-card">

  <div className="leaddetails-profile-left">

    <div className="leaddetails-avatar-circle">
      {lead?.fullName?.charAt(0)}
    </div>

    <div>

      <h2>{lead?.fullName}</h2>

      <p className="leaddetails-date">
        New Lead • Received on{" "}
        {lead?.createdAt
          ? new Date(
              lead.createdAt
            ).toLocaleString()
          : "N/A"}
      </p>

      <div className="leaddetails-contact-row">

        <span>
          <FaEnvelope />
          {lead?.email || "N/A"}
        </span>

        <span>
          <FaPhoneAlt />
          {lead?.mobile || "N/A"}
        </span>

       
         <span>
  <FaMapMarkerAlt />
  {lead?.city}, {lead?.state}
</span>
      

      </div>

    </div>

  </div>
<div className="leaddetails-profile-right">

  <div className="leaddetails-budget-box">

    <span className="leaddetails-profile-label">
      Budget
    </span>

    <h4 className="leaddetails-profile-value">
      {lead?.budgetMin || lead?.budgetMax
        ? `₹${lead?.budgetMin || 0} - ₹${lead?.budgetMax || 0}`
        : lead?.budget || "Not Provided"}
    </h4>

  </div>

  <div className="leaddetails-timeline-box">

    <span className="leaddetails-profile-label">
      Timeline
    </span>

    <h4 className="leaddetails-profile-value">
      {lead?.timeline || "Not Provided"}
    </h4>

  </div>

</div>
</div>
  {/* Tabs */}

  <div className="lead-tabs">

    <button className="active">
      <FaClipboardList />
      Overview
    </button>

    <button>
      <FaClipboardList />
      Requirements
    </button>

    <button>
      <FaRegCommentDots />
      Messages
    </button>

    <button>
      <FaStickyNote />
      Notes
    </button>

    <button>
      <FaCalendarAlt />
      Appointments
    </button>

    <button>
      <FaFileAlt />
      Documents
    </button>

    <button>
      <FaHistory />
      Activity Log
    </button>

  </div>

  {/* Lead Information */}

<div className="leaddetails-info-card">

  <h3 className="leaddetails-info-title">
    Lead Information
  </h3>

  <div className="leaddetails-info-grid">

    <div className="leaddetails-info-item">
      <small>Service Required</small>

      <h4>
        {Array.isArray(lead?.serviceName)
          ? lead.serviceName.join(", ")
          : lead?.serviceName || "N/A"}
      </h4>
    </div>

    <div className="leaddetails-info-item">
      <small>Preferred Contact Time</small>

      <h4>
        {lead?.preferredTime || "N/A"}
      </h4>
    </div>

    <div className="leaddetails-info-item">
      <small>PAN</small>

      <h4>
        {lead?.panNumber || "N/A"}
      </h4>
    </div>

    <div className="leaddetails-info-item">
      <small>
        Preferred Mode Of Communication
      </small>

      <h4>
        {lead?.preferredContact || "N/A"}
      </h4>
    </div>

    <div className="leaddetails-info-item">
      <small>
        Company / Business Name
      </small>

      <h4>
        {lead?.businessName ||
          lead?.companyName ||
          lead?.firmName ||
          lead?.businessType ||
          "N/A"}
      </h4>
    </div>

    <div className="leaddetails-info-item">
      <small>
        GST Required
      </small>

      <h4>
        {lead?.gstRequired || "N/A"}
      </h4>
    </div>

    <div className="leaddetails-info-item">
      <small>
        How Did You Hear About Us?
      </small>

      <h4>
        {lead?.hearAboutUs || "N/A"}
      </h4>
    </div>

    <div className="leaddetails-info-item">
      <small>
        Annual Turnover
      </small>

      <h4>
        {lead?.annualTurnover || "N/A"}
      </h4>
    </div>

    <div className="leaddetails-info-item">
      <small>
        Additional Requirements
      </small>

      <h4>
        {lead?.requirements ||
          lead?.description ||
          "N/A"}
      </h4>
    </div>

  </div>

</div>
  {/* Notes */}
<div className="notes-card">

  <h3>
    Lead Notes (Internal)
  </h3>

  <textarea
    value={notes}
    onChange={(e) =>
      setNotes(e.target.value)
    }
    placeholder="Add your notes about this lead..."
  />

  <button
    className="save-note-btn"
    onClick={saveNotes}
  >

    <FaSave />

    Save Note

  </button>

</div>

  {/* Attachments */}

 <div className="attachment-card">

  <h3>
    Attachments (
    {lead?.documents?.length || 0}
    )
  </h3>

  {
    lead?.documents?.length > 0 ? (

      <div className="attachments-list">

        {
          lead.documents.map(
            (doc, index) => (

              <div
                className="attachment-item"
                key={index}
              >

                <div className="attachment-left">

                  <FaFileAlt />

                  <div>

                    <h4>
                      {doc.fileName}
                    </h4>

                    <small>
                      Uploaded by customer
                    </small>

                  </div>

                </div>

                <a
                  href={`${API_URL}/uploads/${doc.fileUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="attachment-view-btn"
                >
                  View
                </a>

              </div>

            )
          )
        }

      </div>

    ) : (

      <div className="attachment-box">

        <div>

          <FaFileAlt />

          <p>
            No documents uploaded yet
          </p>

          <small>
            Upload documents shared by the lead
          </small>

        </div>

        <button className="upload-btn">

          <FaUpload />

          Upload Document

        </button>

      </div>

    )
  }

</div>


  

</div>
        {/* Content */}
<div className="leaddetails-sidebar">

  {/* Lead Status */}
  <div className="leaddetails-status-card">

    <h3>Lead Status</h3>

    <select className="leaddetails-status-select">

      <option>
        {lead.status || "New"}
      </option>

      <option>
        In Progress
      </option>

      <option>
        Converted
      </option>

      <option>
        Closed
      </option>

    </select>

    <p className="leaddetails-status-text">
      Update the status of this lead as you move forward.
    </p>

    <div className="leaddetails-status-list">

      <div className="leaddetails-status-item">

        <span className="leaddetails-dot leaddetails-blue"></span>

        <div>

          <h5>New</h5>

          <small>
            Just received
          </small>

        </div>

      </div>

      <div className="leaddetails-status-item">

        <span className="leaddetails-dot leaddetails-blue"></span>

        <div>

          <h5>
            In Progress
          </h5>

          <small>
            Contacted the lead
          </small>

        </div>

      </div>

      <div className="leaddetails-status-item">

        <span className="leaddetails-dot leaddetails-green"></span>

        <div>

          <h5>
            Converted
          </h5>

          <small>
            Lead converted to client
          </small>

        </div>

      </div>

      <div className="leaddetails-status-item">

        <span className="leaddetails-dot leaddetails-red"></span>

        <div>

          <h5>
            Closed
          </h5>

          <small>
            Not interested / Lost
          </small>

        </div>

      </div>

    </div>

  </div>

  {/* Lead Activity */}
  <div className="leaddetails-activity-card">

    <h3>
      Lead Activity
    </h3>

    <div className="leaddetails-activity-item">

      <FaEnvelope />

      <div>

        <h5>
          Lead received
        </h5>

        <small>
          {
            lead?.createdAt
              ? new Date(
                  lead.createdAt
                ).toLocaleString()
              : "N/A"
          }
        </small>

      </div>

    </div>

    <div className="leaddetails-activity-item">

      <FaEye />

      <div>

        <h5>
          Lead viewed your profile
        </h5>

        <small>
          {
            lead?.createdAt
              ? new Date(
                  lead.createdAt
                ).toLocaleString()
              : "N/A"
          }
        </small>

      </div>

    </div>

    <div className="leaddetails-activity-item">

      <FaEnvelope />

      <div>

        <h5>
          Email opened
        </h5>

        <small>
          {
            lead?.createdAt
              ? new Date(
                  lead.createdAt
                ).toLocaleString()
              : "N/A"
          }
        </small>

      </div>

    </div>

    <div className="leaddetails-activity-item">

      <FaRegCommentDots />

      <div>

        <h5>
          Message sent to lead
        </h5>

        <small>
          {
            lead?.createdAt
              ? new Date(
                  lead.createdAt
                ).toLocaleString()
              : "N/A"
          }
        </small>

      </div>

    </div>

  </div>

  {/* Quick Actions */}
  <div className="leaddetails-quickactions-card">

    <h3>
      Quick Actions
    </h3>

    <button className="leaddetails-quick-btn">

      <FaRegCommentDots />

      Send Message

    </button>

    <button className="leaddetails-quick-btn">

      <FaStickyNote />

      Add Note

    </button>

    <button className="leaddetails-quick-btn">

      <FaUpload />

      Upload Document

    </button>

  </div>

  {/* Need Help */}
  <div className="leaddetails-help-card">

    <div className="leaddetails-help-icon">
      ?
    </div>

    <h4>
      Need Help?
    </h4>

    <p>
      If you have any questions or need assistance,
      we're here to help.
    </p>

    <a href="/support">
      Contact Support
    </a>

  </div>

</div>

      </div>

    </div>
    </div>

  );

};

export default LeadDetails;