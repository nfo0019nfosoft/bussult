import API_URL from "../config";

import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import UserSidebar from "../components/UserSidebar";
import { Link ,useNavigate } from "react-router-dom";

import {
  FaSearch,
  FaBell,
  FaRegCommentDots,
  FaUsers,
  FaCalendarCheck,
  FaHourglassHalf,
  FaCheckCircle,
  FaRupeeSign,
  FaCalendarAlt,
  FaFileAlt,
  FaEnvelope,
  FaVideo,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowRight,
  FaHeadset,
  FaRegFileAlt,
  FaBuilding,
  FaChartPie,
  FaCalculator
} from "react-icons/fa";

import "./UserDashboard.css";

function UserDashboard() {
    const navigate = useNavigate();

  const [user, setUser] = useState({});

  const [
    userdashboardStats,
    setUserdashboardStats
  ] = useState({
    totalEnquiries: 0,
    upcomingAppointments: 0,
    pendingResponses: 0,
    completedAppointments: 0,
    totalSpent: 0
  });

  const [
  userdashboardAppointments,
  setUserdashboardAppointments
] = useState([]);

const [
  userdashboardEnquiries,
  setUserdashboardEnquiries
] = useState([]);

const [
  userdashboardActivities,
  setUserdashboardActivities
] = useState([]);




const [
  userdashboardNotifications,
  setUserdashboardNotifications
] = useState([]);

const [
  userdashboardRecommendations,
  setUserdashboardRecommendations
] = useState([]);




  /* =====================
      FETCH USER PROFILE
  ===================== */

  const fetchUserProfile = async () => {

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
        res.data.user
      );

    }
    catch (error) {

      console.log(
        error
      );

    }

  };

  /* =====================
      FETCH DASHBOARD STATS
  ===================== */

 const fetchDashboardStats =
  async (userId) => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const enquiryRes =
        await axios.get(
          `${API_URL}/api/enquiries/user/${userId}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      const consultationRes =
        await axios.get(
          `${API_URL}/api/consultations/user/${userId}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      console.log(
        "Enquiries Response:",
        enquiryRes.data
      );

      console.log(
        "Consultation Response:",
        consultationRes.data
      );

      const enquiries =
        Array.isArray(
          enquiryRes.data
        )
          ? enquiryRes.data
          : enquiryRes.data.enquiries ||
            enquiryRes.data.data ||
            [];

      const consultations =
        Array.isArray(
          consultationRes.data
        )
          ? consultationRes.data
          : consultationRes.data.consultations ||
            consultationRes.data.appointments ||
            consultationRes.data.data ||
            [];

      setUserdashboardStats({

        totalEnquiries:
          enquiries.length,

        upcomingAppointments:
          consultations.filter(
            item =>
              item.status ===
              "upcoming"
          ).length,

        pendingResponses:
          enquiries.filter(
            item =>
              item.status ===
              "pending"
          ).length,

        completedAppointments:
          consultations.filter(
            item =>
              item.status ===
              "completed"
          ).length,

        totalSpent:
          consultations.reduce(
            (
              total,
              item
            ) =>
              total +
              (
                item.amount ||
                0
              ),
            0
          )

      });

    }
    catch (error) {

      console.log(
        error
      );

    }

  };








const fetchAppointments = async (userId) => {

  try {

    const token =
      localStorage.getItem(
        "token"
      );

    const res =
      await axios.get(
        `${API_URL}/api/consultations/user/${userId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    console.log(
      "Appointments Response:",
      res.data
    );

    const appointments =
      Array.isArray(res.data)
        ? res.data
        : res.data.consultations ||
          res.data.appointments ||
          [];

    setUserdashboardAppointments(
      appointments
    );

  }
  catch (error) {

    console.log(
      error
    );

    setUserdashboardAppointments(
      []
    );

  }

};













const fetchEnquiries =
async (userId) => {

  try {

    const token =
      localStorage.getItem(
        "token"
      );

    const res =
      await axios.get(
        `${API_URL}/api/enquiries/user/${userId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    console.log(
      "Enquiries Response:",
      res.data
    );

    const enquiries =
      Array.isArray(res.data)
        ? res.data
        : res.data.enquiries ||
          res.data.data ||
          [];

    setUserdashboardEnquiries(
      enquiries
    );

  }
  catch (error) {

    console.log(
      error
    );

    setUserdashboardEnquiries(
      []
    );

  }

};












const fetchActivities =
async (userId)=>{

  try{

    const token =
      localStorage.getItem(
        "token"
      );

    const res =
      await axios.get(
        `${API_URL}/api/activities/user/${userId}`,
        {
          headers:{
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    console.log(
      "Activities Response:",
      res.data
    );

    setUserdashboardActivities(
      res.data.activities || []
    );

  }
  catch(error){

    console.log(error);

  }

};





const fetchNotifications =
async(userId)=>{

  try{

    const token =
      localStorage.getItem(
        "token"
      );

    const res =
      await axios.get(
        `${API_URL}/api/notifications/user/${userId}`,
        {
          headers:{
            Authorization:
              `Bearer ${token}`
          }
        }
      );
      console.log(
  "Notifications Response:",
  res.data
      );

    setUserdashboardNotifications(
      res.data.notifications ||
      res.data ||
      []
    );

  }
  catch(error){

    console.log(error);

  }

};
















const fetchRecommendations =
async(userId)=>{

  try{

    const token =
      localStorage.getItem(
        "token"
      );

    const res =
      await axios.get(
        `${API_URL}/api/dashboard/recommendations/${userId}`,
        {
          headers:{
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    setUserdashboardRecommendations(
      res.data.recommendations ||
      res.data ||
      []
    );

  }
  catch(error){

    console.log(error);

  }

};





// load profile once
useEffect(() => {

  fetchUserProfile();

}, []);


// load dashboard data after profile loads
useEffect(() => {

  if (user?._id) {

    fetchDashboardStats(
      user._id
    );

    fetchAppointments(
      user._id
    );

    fetchEnquiries(
      user._id
    );

    fetchActivities(
      user._id
    );

    fetchNotifications(
      user._id
    );

    fetchRecommendations(
      user._id
    );

  }

}, [user]);





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

    <div className="userdashboard-page-layout">

      <UserSidebar />

      <div className="userdashboard-page-content">

        {/* HEADER */}

        <div className="userdashboard-page-header">

          <div className="userdashboard-page-header-left">

            <h1>
              Dashboard
            </h1>

            <p>
              Welcome back,
              {" "}
              {user?.name || "User"}
            </p>

          </div>

          <div className="userdashboard-page-header-right">

            <div className="userdashboard-page-search-box">

              <FaSearch />

              <input
                type="text"
                placeholder="Search anything..."
              />

              <span>
                Ctrl + K
              </span>

            </div>

            {/* Message */}

            <button className="userdashboard-page-message-btn">

              <FaRegCommentDots />

            </button>

            {/* Notification */}

            <button className="userdashboard-page-notification-btn">

              <FaBell />
{/* 
              <div className="userdashboard-page-notification-count">

                5

              </div> */}

            </button>

            {/* User */}

           <div
  className="userdashboard-page-user-box"
  onClick={handleLogout}
>

  <img
    src={
      user?.profileImage
        ? `${API_URL}${user.profileImage}`
        : "/avatar.png"
    }
    alt="User"
  />

  <div>

    <h4>
      {user?.name || "User"}
    </h4>


  </div>

</div>
          </div>

        </div>

        {/* STATS */}

        <div className="userdashboard-page-stats-grid">

          <div className="userdashboard-page-stat-card">

            <div className="userdashboard-page-stat-icon userdashboard-blue">

              <FaUsers />

            </div>

            <div>

              <h5>
                Total Enquiries
              </h5>

              <h2>
                {
                  userdashboardStats.totalEnquiries
                }
              </h2>

            </div>

          </div>

          <div className="userdashboard-page-stat-card">

            <div className="userdashboard-page-stat-icon userdashboard-green">

              <FaCalendarCheck />

            </div>

            <div>

              <h5>
                Upcoming Appointments
              </h5>

              <h2>
                {
                  userdashboardStats.upcomingAppointments
                }
              </h2>

            </div>

          </div>

          <div className="userdashboard-page-stat-card">

            <div className="userdashboard-page-stat-icon userdashboard-orange">

              <FaHourglassHalf />

            </div>

            <div>

              <h5>
                Pending Responses
              </h5>

              <h2>
                {
                  userdashboardStats.pendingResponses
                }
              </h2>

            </div>

          </div>

          <div className="userdashboard-page-stat-card">

            <div className="userdashboard-page-stat-icon userdashboard-purple">

              <FaCheckCircle />

            </div>

            <div>

              <h5>
                Completed Appointments
              </h5>

              <h2>
                {
                  userdashboardStats.completedAppointments
                }
              </h2>

            </div>

          </div>

          <div className="userdashboard-page-stat-card">

            <div className="userdashboard-page-stat-icon userdashboard-pink">

              <FaRupeeSign />

            </div>

            <div>

              <h5>
                Total Spent
              </h5>

              <h2>

                ₹
                {
                  userdashboardStats.totalSpent.toLocaleString()
                }

              </h2>

            </div>

          </div>

        </div>

      
      






<div className="userdashboard-section-grid">

  {/* APPOINTMENTS */}

<div className="userdashboard-section-card">

  <div className="userdashboard-section-top">

    <h3>
      Upcoming Appointments
    </h3>

    <button
      onClick={()=>
        navigate(
          "/user-appointments"
        )
      }
    >
      View Calendar
    </button>

  </div>

  {
    Array.isArray(
      userdashboardAppointments
    ) &&
    userdashboardAppointments
      .slice(0,3)
      .map((item)=>(

      <div
        className="userdashboard-appointment-item"
        key={item._id}
      >

        <div className="userdashboard-date-box">

          <h2>
            {
              new Date(
                item.appointmentDate
              ).getDate()
            }
          </h2>

          <span>
            {
              new Date(
                item.appointmentDate
              ).toLocaleString(
                "en-US",
                {
                  month:"short"
                }
              )
            }
          </span>

        </div>

        <div className="userdashboard-appointment-info">

          <h4>
            {
              item.serviceName
            }
          </h4>

          <p>
            {
              item.vendorId?.fullName
            }
          </p>

          <div className="userdashboard-appointment-meta">

            <span>

              {
                item.startTime
              }

              {
                item.endTime &&
                ` - ${item.endTime}`
              }

            </span>

            <span>

              {
                item.mode ===
                "video"
                ? "Video Call"
                : item.mode ===
                  "phone"
                ? "Phone Call"
                : "In Person"
              }

            </span>

          </div>

        </div>

        <span className="userdashboard-appointment-status">

          {
            item.status
          }

        </span>

      </div>

    ))
  }

  <button
    className="userdashboard-view-link"
    onClick={()=>
      navigate(
        "/user-appointments"
      )
    }
  >

    View All Appointments

    <FaArrowRight />

  </button>

</div>

  {/* ENQUIRIES */}

<div className="userdashboard-section-card">

  <div className="userdashboard-section-top">

    <h3>
      Recent Enquiries
    </h3>

    <button
      onClick={()=>
        navigate(
          "/user-enquiry"
        )
      }
    >
      View All
    </button>

  </div>

  {
    Array.isArray(
      userdashboardEnquiries
    ) &&
    userdashboardEnquiries
      .slice(0,3)
      .map((item)=>(

      <div
        className="userdashboard-enquiry-item"
        key={item._id}
      >

        <div className="userdashboard-enquiry-icon">

          <FaFileAlt />

        </div>

        <div className="userdashboard-enquiry-info">

          <h4>
            {
              item.serviceName
            }
          </h4>

          <p>

            Enquiry ID :

            {
              item._id
              ?.slice(-8)
            }

          </p>

        </div>

        <div className="userdashboard-enquiry-right">

          <span className="userdashboard-enquiry-status">

            {
              item.status
            }

          </span>

          <small>

            {
              new Date(
                item.createdAt
              ).toLocaleDateString()
            }

          </small>

        </div>

      </div>

    ))
  }

  <button
    className="userdashboard-view-link"
    onClick={()=>
      navigate(
        "/user-enquiry"
      )
    }
  >

    View All Enquiries

    <FaArrowRight />

  </button>

</div>

  {/* ACTIVITIES */}

  <div className="userdashboard-section-card">

    <div className="userdashboard-section-top">

      <h3>
        Recent Activities
      </h3>

      <button>
        View All
      </button>

    </div>

    {
      userdashboardActivities
      .slice(0,5)
      .map((item)=>(

      <div
        className="userdashboard-activity-item"
        key={item._id}
      >

        <div className="userdashboard-activity-icon">

          <FaEnvelope />

        </div>

        <div className="userdashboard-activity-info">

          <p>
            {
              item.message
            }
          </p>

          <small>
            {
              item.createdAt
            }
          </small>

        </div>

      </div>

    ))}

  </div>

</div>






<div className="userdashboard-bottom-grid">

  {/* Notifications */}

  <div className="userdashboard-bottom-card">

    <div className="userdashboard-bottom-header">

      <h3>
        Notifications
      </h3>

      <button
        onClick={()=>
          navigate(
            "/notifications"
          )
        }
      >
        View All
      </button>

    </div>

    {
      userdashboardNotifications
      .slice(0,4)
      .map((item)=>(

      <div
        className="userdashboard-notification-item"
        key={item._id}
      >

        <div className="userdashboard-notification-icon">

          <FaBell />

        </div>

        <div className="userdashboard-notification-content">

          <p>
            {
              item.message
            }
          </p>

          <small>

            {
              new Date(
                item.createdAt
              ).toLocaleDateString()
            }

          </small>

        </div>

      </div>

    ))}

  </div>

  {/* RECOMMENDATIONS */}

  <div className="userdashboard-bottom-card">

    <div className="userdashboard-bottom-header">

      <h3>
        Recommended Services
      </h3>

      <button
        onClick={()=>
          navigate(
            "/service"
          )
        }
      >
        View All
      </button>

    </div>

    <div className="userdashboard-recommend-grid">

      {
        userdashboardRecommendations
        .slice(0,4)
        .map((service)=>(

        <div
          className="userdashboard-recommend-card"
          key={service._id}
        >

          <div className="userdashboard-recommend-icon">

            <FaCalculator />

          </div>

          <h4>
            {
              service.name
            }
          </h4>

          <p>
            {
              service.description
            }
          </p>

          <h3>

            ₹
            {
              service.price
            }

          </h3>

          <button
            onClick={()=>
              navigate(
                `/service`
              )
            }
          >

            Explore

          </button>

        </div>

      ))}

    </div>

  </div>

  {/* HELP CARD */}

  <div className="userdashboard-help-card">

    <div className="userdashboard-help-icon">

      <FaHeadset />

    </div>

    <h3>
      Need Expert Help?
    </h3>

    <p>

      Connect with top Chartered
      Accountants and get your
      work done hassle-free.

    </p>

    <button
      onClick={()=>
        navigate(
          "/find-ca"
        )
      }
    >

      Find a CA Now

    </button>

    <button
      className="userdashboard-help-link"
      onClick={()=>
        navigate(
          "/find-ca"
        )
      }
    >

      Book a Consultation

      <FaArrowRight />

    </button>

  </div>

</div>

























    </div>
    </div>

  );

}

export default UserDashboard;