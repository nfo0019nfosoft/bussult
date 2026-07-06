import API_URL from "../config";
import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  FaSearch,
  FaBell,
  FaRegCommentDots,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaPlus,
  FaClock,
  FaArrowRight,
  FaHeadset,
   FaClipboardList,
  FaStar,
  FaRegClock,
  FaVideo,
  FaPhone,
  FaMapMarkerAlt,
  FaEye,
  FaChevronRight,
  FaEllipsisV,


} from "react-icons/fa";

import {
  useNavigate
} from "react-router-dom";

import UserSidebar from "../components/UserSidebar";

import "./UserAppointments.css";

function UserAppointments() {

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // =========================
  // STATES
  // =========================

  const [user, setUser] =
    useState({});

  const [
    appointments,
    setAppointments
  ] = useState([]);

  const [
    activeTab,
    setActiveTab
  ] = useState(
    "upcoming"
  );

  // =========================
  // LOAD DATA
  // =========================

  useEffect(() => {

    fetchUser();

    fetchAppointments();

  }, []);

  // =========================
  // USER PROFILE
  // =========================

  const fetchUser =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(
            `${API_URL}/api/users/profile`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setUser(
          res.data.user || {}
        );

      } catch (err) {

        console.log(err);

      }

    };

  // =========================
  // APPOINTMENTS
  // =========================

  const fetchAppointments =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const storedUser =
          JSON.parse(
            localStorage.getItem(
              "user"
            )
          );

        if (
          !storedUser?._id
        ) return;

        const res =
          await axios.get(
            `${API_URL}/api/consultations/user/${storedUser._id}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

console.log(
  "Appointments:",
  res.data.consultations
);

        setAppointments(
          res.data.consultations || []
        );

      } catch (err) {

        console.log(
          err
        );

      }

    };

  // =========================
  // FILTER
  // =========================

  const filteredAppointments =
appointments
.filter(item => {

  const statusMatch =
    activeTab === "upcoming"
      ? item.status === "upcoming"
      : activeTab === "completed"
      ? item.status === "completed"
      : item.status === "cancelled";

  const searchMatch =
    item.serviceName
      ?.toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      ) ||

    item.vendorId?.fullName
      ?.toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      );

  return (
    statusMatch &&
    searchMatch
  );

});















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

    <div className="userappointments-layout">

      <UserSidebar />

      <div className="userappointments-main">

        {/* HEADER */}

        <div className="userappointments-header">

          <div className="userappointments-header-left">

            <h1>
              My Appointments
            </h1>

            <p>
              Manage and track all your appointments in one place
            </p>

          </div>

          <div className="userappointments-header-right">

            <div className="userappointments-search">

              <FaSearch />

           <input
  type="text"
  placeholder="Search anything..."
  value={searchTerm}
  onChange={(e)=>
    setSearchTerm(
      e.target.value
    )
  }
/>
              <span>
                Ctrl + K
              </span>

            </div>

            <button className="userappointments-icon">
              <FaRegCommentDots />
            </button>

            <button className="userappointments-icon userappointments-notification">
              <FaBell />
            </button>

            <div className="userappointments-user"   onClick={handleLogout}>

              <img
                src={
                  user?.profileImage
                    ? `${API_URL}${user.profileImage}`
                    : "/avatar.png"
                }
                alt="user"
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

        {/* TABS */}

        <div className="userappointments-tabs">

          <button
            className={`userappointments-tab ${
              activeTab ===
              "upcoming"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveTab(
                "upcoming"
              )
            }
          >

            <FaCalendarAlt />

            <span>
              Upcoming
            </span>

            <div className="tab-count">
              {
                appointments.filter(
                  item =>
                    item.status ===
                    "upcoming"
                ).length
              }
            </div>

          </button>

          <button
            className={`userappointments-tab ${
              activeTab ===
              "completed"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveTab(
                "completed"
              )
            }
          >

            <FaCheckCircle />

            <span>
              Completed
            </span>

            <div className="tab-count">
              {
                appointments.filter(
                  item =>
                    item.status ===
                    "completed"
                ).length
              }
            </div>

          </button>

          <button
            className={`userappointments-tab ${
              activeTab ===
              "cancelled"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveTab(
                "cancelled"
              )
            }
          >

            <FaTimesCircle />

            <span>
              Cancelled
            </span>

            <div className="tab-count">
              {
                appointments.filter(
                  item =>
                    item.status ===
                    "cancelled"
                ).length
              }
            </div>

          </button>

          <button
            className="book-appointment-btn"
            onClick={() =>
              navigate(
                "/find-ca"
              )
            }
          >

            <FaPlus />

            Book Appointment

          </button>

        </div>

      




{/* APPOINTMENTS SECTION */}

<div className="userappointments-content">

  {/* LEFT SIDE */}

 {/* ================= FILTERS ================= */}

{/* ================= FILTERS ================= */}

<div className="userappointments-left">

  {/* ================= FILTERS ================= */}

  <div className="ua-left-filters">

    <select className="ua-filter-select">
      <option>All Categories</option>
    </select>

    <select className="ua-filter-select">
      <option>All Types</option>
      <option>Video Call</option>
      <option>Phone Call</option>
      <option>In Person</option>
    </select>

    <input
      type="date"
      className="ua-filter-date"
    />

    <select className="ua-filter-select">
      <option>All Status</option>
      <option>Upcoming</option>
      <option>Completed</option>
      <option>Cancelled</option>
    </select>

    <button className="ua-filter-btn">
      <FaSearch />
      Filters
    </button>

  </div>


  {/* ================= TABLE HEADER ================= */}

  <div className="ua-table-header">

    <div>Appointment Details</div>

    <div>CA / Expert</div>

    <div>Date & Time</div>

    <div>Type</div>

    <div>Status</div>

    <div>Action</div>

  </div>


  {/* ================= APPOINTMENTS ================= */}

  {
    filteredAppointments.length > 0 ? (

      filteredAppointments.map((item) => (

        <div
          className="ua-appointment-row"
          key={item._id}
        >



  {/* APPOINTMENT DETAILS */}

  <div className="ua-service-info">

    <div className="ua-service-icon">
      <FaClipboardList />
    </div>

    <div className="ua-service-content">

      <h3>
        {item.serviceName}
      </h3>

      <p className="ua-service-category">
        {
          item.category ||
          item.vendorId?.services?.[0]?.serviceName ||
          "CA Service"
        }
      </p>

      <span className="ua-service-id">
        Appointment ID :
        #APT-{item._id.slice(-6)}
      </span>

    </div>

  </div>


  {/* CA DETAILS */}

 <div className="ua-ca-info">

  <img
    src={
      item.vendorId?.photo
        ? `${API_URL}/uploads/${item.vendorId.photo}`
        : "/avatar.png"
    }
    alt=""
  />

  <div className="ua-ca-content">

    <h4>
      {item.vendorId?.fullName || "CA Expert"}
    </h4>

    <p>
      CA{
        item.vendorId?._id?.slice(-6) ||
        "123456"
      }
    </p>

    <span className="ua-ca-rating">

      <FaStar />

      {
        item.vendorId?.rating ??
        4.8
      }

      (
      {
        item.vendorId?.reviewsCount ??
        128
      }
      reviews)

    </span>

  </div>

</div>

  {/* DATE & TIME */}

  <div className="ua-date-info">

    <div className="ua-date-row">

      <FaCalendarAlt />

      <span>
        {
          new Date(
            item.appointmentDate
          ).toLocaleDateString(
            "en-IN",
            {
              day: "numeric",
              month: "short",
              year: "numeric",
            }
          )
        }
      </span>

    </div>

    <p>
      {
        new Date(
          item.appointmentDate
        ).toLocaleDateString(
          "en-IN",
          {
            weekday: "long",
          }
        )
      }
    </p>

    <div className="ua-time-row">

      <FaRegClock />

      <span>
        {item.startTime}

        {
          item.endTime &&
          ` - ${item.endTime}`
        }
      </span>

    </div>

    <small>
      {
        item.duration ||
        "(1 Hour)"
      }
    </small>

  </div>


  {/* MODE */}

  <div className="ua-mode-info">

    <span
      className={`ua-mode-badge ${item.mode}`}
    >

      {
        item.mode === "video"
          ? (
            <>
              <FaVideo />
              Video Call
            </>
          )
          : item.mode === "phone"
          ? (
            <>
              <FaPhone />
              Phone Call
            </>
          )
          : (
            <>
              <FaMapMarkerAlt />
              In Person
            </>
          )
      }

    </span>

  </div>


  {/* STATUS */}

  <div className="ua-status-info">

    <span
      className={`ua-status-badge ${item.status}`}
    >
      {
        item.status === "upcoming"
          ? "Confirmed"
          : item.status
      }
    </span>

  </div>


  {/* ACTIONS */}

  <div className="ua-row-actions">

    {/* <button
      className="ua-row-action-btn"
      title="View Details"
      onClick={() =>
        navigate(
          `/appointment-details/${item._id}`
        )
      }
    >
      <FaEye />
    </button> */}

    {/* <button
      className="ua-row-action-btn"
      title="Open Vendor"
      onClick={() =>
        navigate(
          `/vendor/${item.vendorId?._id}`
        )
      }
    >
      <FaChevronRight />
    </button> */}

    <button
      className="ua-row-action-btn"
      title="More Options"
    >
      <FaEllipsisV />
    </button>

  </div>

</div>

        

      ))

    ) : (

      <div className="ua-empty-state">

        <img
          src="/empty.png"
          alt=""
        />

        <h2>
          No Appointments Found
        </h2>

        <p>
          {
            activeTab === "upcoming"
              ? "You don't have any upcoming appointments."
              : activeTab === "completed"
              ? "You don't have any completed appointments."
              : "You don't have any cancelled appointments."
          }
        </p>

        <button
          className="ua-empty-btn"
          onClick={() =>
            navigate("/find-ca")
          }
        >
          <FaPlus />
          Book Appointment
        </button>

      </div>

    )
  }

</div>

  {/* RIGHT SIDE */}
<div className="userappointments-right">

  {/* OVERVIEW */}

  <div className="ua-right-overview">

    <h3>
      Appointments Overview
    </h3>

    <div className="ua-overview-grid">

      <div className="ua-overview-card upcoming">

        <div className="ua-overview-icon">
          <FaCalendarAlt />
        </div>

        <h2>
          {
            appointments.filter(
              item =>
                item.status === "upcoming"
            ).length
          }
        </h2>

        <p>
          Upcoming Appointments
        </p>

      </div>

      <div className="ua-overview-card completed">

        <div className="ua-overview-icon">
          <FaCheckCircle />
        </div>

        <h2>
          {
            appointments.filter(
              item =>
                item.status === "completed"
            ).length
          }
        </h2>

        <p>
          Completed Appointments
        </p>

      </div>

      <div className="ua-overview-card cancelled">

        <div className="ua-overview-icon">
          <FaClock />
        </div>

        <h2>
          {
            appointments.filter(
              item =>
                item.status === "cancelled"
            ).length
          }
        </h2>

        <p>
          Cancelled Appointments
        </p>

      </div>

      <div className="ua-overview-card total">

        <div className="ua-overview-icon">
          <FaCalendarAlt />
        </div>

        <h2>
          {appointments.length}
        </h2>

        <p>
          Total Appointments
        </p>

      </div>

    </div>

  </div>


  {/* QUICK ACTIONS */}

  <div className="ua-quick-actions">

    <h3>
      Quick Actions
    </h3>

    <div
      className="ua-quick-card"
      onClick={() =>
        navigate("/find-ca")
      }
    >

      <div className="ua-quick-left">

        <div className="ua-quick-icon">
          <FaPlus />
        </div>

        <div>

          <h4>
            Book Appointment
          </h4>

          <p>
            Schedule a new appointment
          </p>

        </div>

      </div>

      <FaArrowRight />

    </div>


    <div className="ua-quick-card">

      <div className="ua-quick-left">

        <div className="ua-quick-icon">
          <FaCalendarAlt />
        </div>

        <div>

          <h4>
            Reschedule Appointment
          </h4>

          <p>
            Change your appointment
          </p>

        </div>

      </div>

      <FaArrowRight />

    </div>


    <div className="ua-quick-card">

      <div className="ua-quick-left">

        <div className="ua-quick-icon">
          <FaClock />
        </div>

        <div>

          <h4>
            View Available Slots
          </h4>

          <p>
            Check CA availability
          </p>

        </div>

      </div>

      <FaArrowRight />

    </div>


    <div
      className="ua-quick-card"
      onClick={() =>
        navigate("/support")
      }
    >

      <div className="ua-quick-left">

        <div className="ua-quick-icon">
          <FaHeadset />
        </div>

        <div>

          <h4>
            Need Help?
          </h4>

          <p>
            Contact support team
          </p>

        </div>

      </div>

      <FaArrowRight />

    </div>

  </div>


  {/* HELP CARD */}

  <div className="ua-help-card">

    <div className="ua-help-icon">
      <FaHeadset />
    </div>

    <h3>
      Need Help?
    </h3>

    <p>
      Our support team is here
      to assist you with your appointments.
    </p>

    <button
      className="ua-help-btn"
      onClick={() =>
        navigate("/support")
      }
    >
      Contact Support
      <FaArrowRight />
    </button>

  </div>

</div>

</div>


























      

      </div>

    </div>

  );
}

export default UserAppointments;