import API_URL from "../config";
import React, { useEffect, useState } from "react";
import UserSidebar from "../components/UserSidebar";
import axios from "axios";
import { Link ,useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaBell,
  FaRegCommentDots,
  FaClipboardList,
  FaRegClock,
  FaHourglassHalf,
  FaCheckCircle,
  FaPlus,
  FaEye,
  FaChevronRight,
  FaQuestionCircle,
  FaCalendarAlt,
  FaHeadset,
  FaComments

} from "react-icons/fa";
import "./UserEnquiry.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function UserEnquiry() {

  const navigate = useNavigate();

  // ================= User =================
  const [user, setUser] = useState({});

  // ================= Enquiries =================
  const [enquiries, setEnquiries] = useState([]);

  // ================= Active Tab =================
  const [activeTab, setActiveTab] = useState("all");

  // ================= Stats =================
  const [stats, setStats] = useState({
    all: 0,
    active: 0,
    pending: 0,
    closed: 0,
  });

  useEffect(() => {
    fetchUser();
    fetchEnquiries();
  }, []);

  // ================= User Profile =================
 const fetchUser = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      `${API_URL}/api/users/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("PROFILE RESPONSE:", res.data);

    setUser(res.data.user);

  } catch (err) {
    console.log(err);
  }
};

  // ================= Enquiries =================
 const fetchEnquiries = async () => {
  try {

    const storedUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (!storedUser?._id) return;

    const token = localStorage.getItem("token");

    const res = await axios.get(
      `${API_URL}/api/enquiries/user/${storedUser._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = res.data.enquiries || [];

    setEnquiries(data);

    setStats({
      all: data.length,

      active: data.filter(
        item =>
          item.status === "contacted" ||
          item.status === "qualified"
      ).length,

      pending: data.filter(
        item =>
          item.status === "new"
      ).length,

      closed: data.filter(
        item =>
          item.status === "converted" ||
          item.status === "lost"
      ).length,
    });

  } catch (err) {

    console.log(err);

  }
};
  // ================= Filter =================
 const filteredEnquiries =
  activeTab === "all"
    ? enquiries
    : activeTab === "active"
    ? enquiries.filter(
        item =>
          item.status === "contacted" ||
          item.status === "qualified"
      )
    : activeTab === "pending"
    ? enquiries.filter(
        item =>
          item.status === "new"
      )
    : enquiries.filter(
        item =>
          item.status === "converted" ||
          item.status === "lost"
      );











      

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

    <>
   <UserSidebar />
    <div className="userenquiry-layout">
      <div className="userenquiry-header">

        <div className="userenquiry-left">

          <h1>My Enquiries</h1>

          <p>
            Manage and track all your enquiries in one place
          </p>

        </div>

        <div className="userenquiry-right">

          <div className="userenquiry-search">

            <FaSearch className="userenquiry-search-icon"/>

            <input
              type="text"
              placeholder="Search anything..."
            />

            <span>Ctrl + K</span>

          </div>

          <button className="userenquiry-icon">

            <FaRegCommentDots />

          </button>

          <button className="userenquiry-icon notification">

            <FaBell />

           

          </button>

        <div className="userenquiry-user"  onClick={handleLogout}>

  <img
    src={
      user?.profileImage
        ? `${API_URL}${user.profileImage}`
        : "/avatar.png"
    }
    alt=""
  />

  <div>
    <h4>
      {user?.name || "User Name"}
    </h4>

    <p>
        {user.role || "User"}
    </p>
  </div>

</div>

        </div>

      </div>







<div className="userenquiry-tabs-wrapper">

  <div className="userenquiry-tabs">

    <button
      type="button"
      className={`userenquiry-tab ${activeTab === "all" ? "active" : ""}`}
      onClick={() => setActiveTab("all")}
    >
      <FaClipboardList className="userenquiry-tab-icon" />

      <span className="userenquiry-tab-text">
        All Enquiries
      </span>

      <span className="userenquiry-count">
        {stats.all}
      </span>
    </button>

    <button
      type="button"
      className={`userenquiry-tab ${activeTab === "active" ? "active" : ""}`}
      onClick={() => setActiveTab("active")}
    >
      <FaRegClock className="userenquiry-tab-icon" />

      <span className="userenquiry-tab-text">
        Active Enquiries
      </span>

      <span className="userenquiry-count">
        {stats.active}
      </span>
    </button>

    <button
      type="button"
      className={`userenquiry-tab ${activeTab === "pending" ? "active" : ""}`}
      onClick={() => setActiveTab("pending")}
    >
      <FaHourglassHalf className="userenquiry-tab-icon" />

      <span className="userenquiry-tab-text">
        Pending Responses
      </span>

      <span className="userenquiry-count">
        {stats.pending}
      </span>
    </button>

    <button
      type="button"
      className={`userenquiry-tab ${activeTab === "closed" ? "active" : ""}`}
      onClick={() => setActiveTab("closed")}
    >
      <FaCheckCircle className="userenquiry-tab-icon" />

      <span className="userenquiry-tab-text">
        Closed Enquiries
      </span>

      <span className="userenquiry-count">
        {stats.closed}
      </span>
    </button>

  </div>

  <button
    type="button"
    className="userenquiry-new-btn"
    onClick={() => navigate("/new-enquiry")}
  >
    <FaPlus />
    <span>New Enquiry</span>
  </button>

</div>




<div className="userenquiry-container">

  {/* LEFT SIDE */}
  <div className="userenquiry-left">

    {/* Filters */}
    <div className="userenquiry-filters">

      <div className="filter-group">
        <label>Search Enquiries</label>
        <input
          type="text"
          placeholder="Search by subject, service or ID..."
        />
      </div>

      <div className="filter-group">
        <label>Service Category</label>
        <select>
          <option>All Categories</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Status</label>
        <select>
          <option>All Status</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Date Range</label>
        <input type="date" />
      </div>

      <button className="filter-btn">
        Filters
      </button>

    </div>

    {/* Table */}
    <div className="userenquiry-table-card">

      <table className="userenquiry-table">

        <thead>
          <tr>
            <th>Enquiry ID</th>
            <th>Subject</th>
            <th>Service Category</th>
            <th>Status</th>
            <th>Last Response</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {filteredEnquiries.map((item) => (

            <tr key={item._id}>

              <td>#{item._id.slice(-8)}</td>

             <td>
  <strong className="userenquiry-subject">
    {item.requirements}
  </strong>
</td>

              <td>
                {item.serviceName?.join(", ")}
              </td>
<td>
  <span className={`enquiry-status ${item.status}`}>
    {item.status}
  </span>
</td>
<td>

  <div className="enquiry-vendor">

    <img
      src={
        item.vendorId?.photo
          ? `${API_URL}/uploads/${item.vendorId.photo}`
          : "/avatar.png"
      }
      alt=""
      className="enquiry-vendor-img"
    />

    <div>

      <h4>
        {item.vendorId?.fullName ||
          "Awaiting CA Response"}
      </h4>

     <p>
  {item.vendorId
    ? dayjs(
        item.updatedAt
      ).fromNow()
    : "Awaiting response"}
</p>
    </div>

  </div>

</td>
<td>

  <div className="enquiry-date-box">

    <span>
      {new Date(
        item.createdAt
      ).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )}
    </span>

    <small>
      {new Date(
        item.createdAt
      ).toLocaleTimeString(
        "en-IN",
        {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }
      )}
    </small>

  </div>

</td>

            <td>

<div className="enquiry-actions">

  <button
  className="action-btn view"
  onClick={() =>
    navigate(
      `/enquiry-details/${item._id}`
    )
  }
>
  <FaEye />
</button>

  <button
    className="action-btn open"
    onClick={() =>
      navigate(
        `/vendor/${item.vendorId?._id}`
      )
    }
  >
    <FaChevronRight />
  </button>

</div>

</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>

  {/* RIGHT SIDE */}
<div className="userenquiry-rightpanel">

  {/* OVERVIEW */}
  <div className="overview-card">

    <h3>Enquiries Overview</h3>

    <div className="overview-grid">

      <div className="overview-box total">
        <div className="overview-top">
          <h2>{stats.all}</h2>
          <FaClipboardList className="overview-icon" />
        </div>

        <p>Total Enquiries</p>
      </div>

      <div className="overview-box active">
        <div className="overview-top">
          <h2>{stats.active}</h2>
          <FaRegCommentDots className="overview-icon" />
        </div>

        <p>Active Enquiries</p>
      </div>

      <div className="overview-box pending">
        <div className="overview-top">
          <h2>{stats.pending}</h2>
          <FaHourglassHalf className="overview-icon" />
        </div>

        <p>Pending Responses</p>
      </div>

      <div className="overview-box closed">
        <div className="overview-top">
          <h2>{stats.closed}</h2>
          <FaCheckCircle className="overview-icon" />
        </div>

        <p>Closed Enquiries</p>
      </div>

    </div>

  </div>

  {/* QUICK ACTIONS */}
<div className="quick-actions">

  <h3>Quick Actions</h3>

  <div
    className="quick-item"
    onClick={() => navigate("/find-ca")}
  >
    <div className="quick-left">

      <div className="quick-icon blue">
        <FaPlus />
      </div>

      <div>
        <h4>New Enquiry</h4>
        <p>Ask a new question</p>
      </div>

    </div>

    <FaChevronRight />
  </div>

  <div className="quick-item">

    <div className="quick-left">

      <div className="quick-icon purple">
        <FaSearch />
      </div>

      <div>
        <h4>Check Enquiry Status</h4>
        <p>Track your enquiry status</p>
      </div>

    </div>

    <FaChevronRight />

  </div>

  <div
    className="quick-item"
    onClick={() => navigate("/service")}
  >

    <div className="quick-left">

      <div className="quick-icon green">
        <FaClipboardList />
      </div>

      <div>
        <h4>Browse Services</h4>
        <p>Explore our services</p>
      </div>

    </div>

    <FaChevronRight />

  </div>

  <div
    className="quick-item"
    onClick={() =>
      navigate(
        `/book-consultation/${enquiries[0]?.vendorId?._id}`
      )
    }
  >

    <div className="quick-left">

      <div className="quick-icon orange">
        <FaRegClock />
      </div>

      <div>
        <h4>Schedule Appointment</h4>
        <p>Book a consultation</p>
      </div>

    </div>

    <FaChevronRight />

  </div>

</div>

  {/* HELP */}
<div className="help-card">

  <div className="help-header">

    <div className="help-icon">
      <FaHeadset />
    </div>

    <h3>Need Help?</h3>

  </div>

  <p>
    Our support team is here to assist you
    with your enquiries.
  </p>

  <Link
    to="/support"
    className="help-btn"
  >
    Contact Support
    <FaChevronRight />
  </Link>

</div>

</div>

</div>






</div>









    </>

  );
}

export default UserEnquiry;