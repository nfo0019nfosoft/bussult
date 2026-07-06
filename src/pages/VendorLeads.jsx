import API_URL from "../config";
import { useEffect, useState } from "react";
import axios from "axios";
import "./VendorLeads.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

import {
  FaSearch,
  FaBell,
  FaEye,
  FaUserCircle,
  FaRegCommentDots,
FaFilter
} from "react-icons/fa";

const MyLeads = () => {
const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [vendor, setVendor] = useState(null);

  const newLeads =
    leads.filter(
      lead => lead.status === "new"
    ).length;

  const inProgressLeads =
    leads.filter(
      lead => lead.status === "in_progress"
    ).length;

  const convertedLeads =
    leads.filter(
      lead => lead.status === "converted"
    ).length;

  const closedLeads =
    leads.filter(
      lead => lead.status === "closed"
    ).length;

  const unreadLeads =
    leads.filter(
      lead => lead.status === "new"
    ).length;

  useEffect(() => {
    fetchLeads();
    fetchVendor();
  }, []);

  const fetchLeads = async () => {
  try {

    const vendorId =
      localStorage.getItem("vendorId");

    const res = await axios.get(
      `${API_URL}/api/enquiries/vendor/${vendorId}`
    );

    setLeads(
      res.data.enquiries || []
    );

  } catch (err) {

    console.log(err);

  } finally {

    setLoading(false);

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

 const filteredLeads =
  leads.filter((lead) =>
    lead.fullName
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );







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










  if (loading) {

    return (
      <div className="loading">
        Loading...
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
  alt="Profile"
  onClick={handleLogout}
  style={{
    cursor:"pointer"
  }}
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
        {/* Tabs */}
<div className="leads-page">

  {/* Tabs */}

  <div className="lead-status-tabs">

    <button className="active">
      All Leads
      <span>{leads.length}</span>
    </button>

    <button>
      New Leads
      <span>{newLeads}</span>
    </button>

    <button>
      In Progress
      <span>{inProgressLeads}</span>
    </button>

    <button>
      Converted
      <span>{convertedLeads}</span>
    </button>

    <button>
      Closed
      <span>{closedLeads}</span>
    </button>

    <button>
      Unread
      <span>{unreadLeads}</span>
    </button>

  </div>

  <div className="leads-main-layout">

    {/* LEFT */}

    <div className="leads-left-section">

      <div className="lead-section-header">

        <div>

          <h2>All Leads</h2>

          <p>
            Manage and track all the
            leads you have received.
          </p>

        </div>

        <div className="lead-actions">

          <button className="filte-btn">
            <FaFilter />
            Filters
          </button>

          <select>
            <option>
              Newest First
            </option>
          </select>

        </div>

      </div>

      {/* Lead Cards */}

  {filteredLeads.map((lead) => (

  <div
    className="lead-row-card"
    key={lead._id}
  >

    <div className="lead-user-block">

      <div className="lead-avatar">

        {lead.fullName?.charAt(0)}

      </div>

      <div>

        <div className="lead-name-status">

          <h3>
            {lead.fullName}
          </h3>

          <span
            className={`status ${lead.status || "new"}`}
          >
            {lead.status || "new"}
          </span>

        </div>

        <p>
          Email: {lead.email}
        </p>

        <p>
          Phone: {lead.mobile}
        </p>

        <h5>
          Service Required:
          {" "}
          {Array.isArray(lead.serviceName)
            ? lead.serviceName.join(", ")
            : lead.serviceName}
        </h5>

        <small>
          Received on:
          {" "}
          {new Date(
            lead.createdAt
          ).toLocaleString()}
        </small>

      </div>

    </div>

    <div className="lead-budget-box">

       <span>Budget</span>

  <h5>
    {lead.budget || "Not Provided"}
  </h5>


  <span>Timeline</span>

  <h5>
    {lead.timeline || "Not Provided"}
  </h5>

    </div>

    <div className="lead-action-box">

     <button
  className="details-btn"
  onClick={() =>
    navigate(`/lead-details/${lead._id}`)
  }
>
  View Details
</button>

    </div>

  </div>

))}

    </div>

    {/* RIGHT */}

    <div className="leads-right-section">

      <div className="overview-card">

        <h3>
          Leads Overview
        </h3>

        <div className="overview-grid">

          <div className="overview-box">
            <h2>{leads.length}</h2>
            <p>Total Leads</p>
          </div>

          <div className="overview-box">
            <h2>{newLeads}</h2>
            <p>New Leads</p>
          </div>

          <div className="overview-box">
            <h2>
              {inProgressLeads}
            </h2>
            <p>In Progress</p>
          </div>

          <div className="overview-box">
            <h2>
              {convertedLeads}
            </h2>
            <p>Converted</p>
          </div>

        </div>

      </div>

      <div className="filter-card">

        <h3>
          Quick Filters
        </h3>

        <select>
          <option>
            All Services
          </option>
        </select>

        <select>
          <option>
            All Sources
          </option>
        </select>

        <input
          type="date"
        />

        <button
          className="clear-btn"
        >
          Clear Filters
        </button>

      </div>
  <div className="sidebar-card">

    <div className="help-icon">
      ?
    </div>

    <h4>Need Help?</h4>

    <p>
      If you have any questions or need assistance,
      we're here to help.
    </p>

    <a href="Support">
      Contact Support
    </a>

  </div>

    </div>

  </div>

</div>
        {/* Content */}

       

      </div>

    </div>

  );

};

export default MyLeads;