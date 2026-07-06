import API_URL from "../config";
import { useEffect, useState } from "react";
import axios from "axios";

import AdminSidebar from "../components/AdminSidebar";

import "./AdminAppointments.css";

import {
  FaBell,
  FaCalendarAlt,
  FaChevronDown,
  FaPlus,
  FaClipboardList,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaUserTimes,
  FaChartLine,
  FaSearch
} from "react-icons/fa";

function AdminAppointments() {



    const [users, setUsers] =
useState([]);

  const [dashboard, setDashboard] =
    useState({
      notificationCount: 0,
      adminPhoto: "/avatar.png",
      adminName: "Super Admin",
      adminRole: "Admin"
    });

  const [stats, setStats] =
    useState({
      totalAppointments: 0,
      completedAppointments: 0,
      scheduledAppointments: 0,
      cancelledAppointments: 0,
      noShowAppointments: 0,
      completionRate: 0
    });

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const [startDate, setStartDate] =
    useState(today);

  const [endDate, setEndDate] =
    useState(today);



  
      const fetchHeaderData =
          async () => {
  
              try {
  
                  const res =
                      await axios.get(
                          `${API_URL}/api/admin/support-header`
                      );
  
                  if (
                      res.data.success
                  ) {
  
                      setDashboard({
  
                          notificationCount:
                              res.data.notificationCount || 0,
  
                          adminPhoto:
                              res.data.adminPhoto ||
                              "/avatar.png",
  
                          adminName:
                              res.data.adminName ||
                              "Super Admin",
  
                          adminRole:
                              res.data.adminRole ||
                              "Admin"
  
                      });
  
                  }
  
              }
  
              catch (err) {
  
                  console.log(err);
  
              }
  
          };
  



  const fetchStats =
    async () => {

      try {

        const res =
          await axios.get(
            `${API_URL}/api/admin/appointment-stats`
          );

        if (res.data.success) {

          setStats(
            res.data.stats
          );

        }

      }

      catch (err) {

        console.log(err);

      }

    };



    const [search, setSearch] =
useState("");

const [appointmentType, setAppointmentType] =
useState("");

const [status, setStatus] =
useState("");

const [source, setSource] =
useState("");

const [assignee, setAssignee] =
useState("");

const [filterDate, setFilterDate] =
useState("");









const fetchUsers =
async () => {

    try {

        const res =
        await axios.get(
            `${API_URL}/api/admin/users`
        );

        if(
            res.data.success
        ){

            setUsers(
                res.data.users
            );

        }

    }

    catch(err){

        console.log(err);

    }

};







const [appointments, setAppointments] =
useState([]);

const fetchAppointments =
async () => {

    try {

        const token =
        localStorage.getItem(
            "token"
        );

        const res =
        await axios.get(
            `${API_URL}/api/admin/appointments`,
            {
                headers:{
                    Authorization:
                    `Bearer ${token}`
                }
            }
        );

        if(
            res.data.success
        ){

            setAppointments(
                res.data.appointments || []
            );

        }

    }

    catch(err){

        console.log(err);

    }

};






useEffect(() => {

    fetchHeaderData();

    fetchStats();

    fetchUsers();

    fetchAppointments();

}, []);





  const handleLogout =
    () => {

      const confirmLogout =
        window.confirm(
          "Are you sure you want to logout?"
        );

      if (!confirmLogout)
        return;

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "role"
      );

      window.location.href =
        "/admin-login";

    };
















 




  return (

    <div className="admin-appointment-layout">

      <AdminSidebar />

      <div className="admin-appointment-content">

        {/* ================= HEADER ================= */}

        <div className="admin-appointment-header">

          <div className="admin-appointment-title">

            <h1>
              Appointments Management
            </h1>

            <p>
              Schedule, manage and track all appointments across the platform.
            </p>

          </div>



          <div className="admin-appointment-right">

            {/* Date Filter */}

            <div className="admin-appointment-date-filter">

              <FaCalendarAlt />

              <input
                type="date"
                value={startDate}
                onChange={(e) =>
                  setStartDate(
                    e.target.value
                  )
                }
              />

              <span>-</span>

              <input
                type="date"
                value={endDate}
                onChange={(e) =>
                  setEndDate(
                    e.target.value
                  )
                }
              />

            </div>



            {/* Add Appointment */}

            <button
              className="admin-appointment-add-btn"
            >

              <FaPlus />

              Add Appointment

            </button>



            {/* Notification */}

            <div className="admin-appointment-notification">

              <FaBell />

              <span>

                {
                  dashboard.notificationCount
                }

              </span>

            </div>



            {/* Profile */}

            <div
              className="admin-appointment-profile"
              onClick={handleLogout}
            >

              <img
                src={
                  dashboard.adminPhoto
                }
                alt="Admin"
              />

              <div className="admin-appointment-profile-info">

                <h4>

                  {
                    dashboard.adminName
                  }

                </h4>

                <p>

                  {
                    dashboard.adminRole
                  }

                </p>

              </div>

              <FaChevronDown />

            </div>

          </div>

        </div>



        {/* ================= STATS ================= */}

        <div className="admin-appointment-stats-grid">


          {/* Total */}

          <div className="admin-appointment-stat-card">

            <div className="admin-appointment-stat-icon admin-appointment-blue">

              <FaClipboardList />

            </div>

            <div className="admin-appointment-stat-content">

              <p>
                Total Appointments
              </p>

              <h2>

                {
                  stats.totalAppointments
                }

              </h2>

            </div>

          </div>



          {/* Completed */}

          <div className="admin-appointment-stat-card">

            <div className="admin-appointment-stat-icon admin-appointment-green">

              <FaCheckCircle />

            </div>

            <div className="admin-appointment-stat-content">

              <p>
                Completed
              </p>

              <h2>

                {
                  stats.completedAppointments
                }

              </h2>

            </div>

          </div>



          {/* Scheduled */}

          <div className="admin-appointment-stat-card">

            <div className="admin-appointment-stat-icon admin-appointment-orange">

              <FaClock />

            </div>

            <div className="admin-appointment-stat-content">

              <p>
                Scheduled
              </p>

              <h2>

                {
                  stats.scheduledAppointments
                }

              </h2>

            </div>

          </div>



          {/* Cancelled */}

          <div className="admin-appointment-stat-card">

            <div className="admin-appointment-stat-icon admin-appointment-red">

              <FaTimesCircle />

            </div>

            <div className="admin-appointment-stat-content">

              <p>
                Cancelled
              </p>

              <h2>

                {
                  stats.cancelledAppointments
                }

              </h2>

            </div>

          </div>



          {/* No Show */}

          <div className="admin-appointment-stat-card">

            <div className="admin-appointment-stat-icon admin-appointment-pink">

              <FaUserTimes />

            </div>

            <div className="admin-appointment-stat-content">

              <p>
                No Show
              </p>

              <h2>

                {
                  stats.noShowAppointments
                }

              </h2>

            </div>

          </div>



          {/* Completion Rate */}

          <div className="admin-appointment-stat-card">

            <div className="admin-appointment-stat-icon admin-appointment-purple">

              <FaChartLine />

            </div>

            <div className="admin-appointment-stat-content">

              <p>
                Completion Rate
              </p>

              <h2>

                {
                  stats.completionRate
                }%

              </h2>

            </div>

          </div>


        </div>














      <div className="admin-appointment-filter-bar">

    {/* Search */}

    <div className="admin-appointment-search-box">

        <FaSearch />

        <input
            type="text"
            placeholder="Search by appointment ID, lead name..."
            value={search}
            onChange={(e)=>
                setSearch(
                    e.target.value
                )
            }
        />

    </div>


    {/* Appointment Type */}

    <div className="admin-appointment-filter-item">

        <label>
            Appointment Type
        </label>

        <select
            value={appointmentType}
            onChange={(e)=>
                setAppointmentType(
                    e.target.value
                )
            }
        >
            <option value="">
                All Types
            </option>

            <option value="Video">
                Video
            </option>

            <option value="Phone">
                Phone
            </option>

            <option value="In Person">
                In Person
            </option>

        </select>

    </div>


    {/* Status */}

    <div className="admin-appointment-filter-item">

        <label>
            Status
        </label>

        <select
            value={status}
            onChange={(e)=>
                setStatus(
                    e.target.value
                )
            }
        >
            <option value="">
                All Status
            </option>

            <option value="Scheduled">
                Scheduled
            </option>

            <option value="Completed">
                Completed
            </option>

            <option value="Cancelled">
                Cancelled
            </option>

            <option value="No Show">
                No Show
            </option>

        </select>

    </div>


    {/* Source */}

    <div className="admin-appointment-filter-item">

        <label>
            Source
        </label>

        <select
            value={source}
            onChange={(e)=>
                setSource(
                    e.target.value
                )
            }
        >
            <option value="">
                All Sources
            </option>

            <option value="Website">
                Website
            </option>

            <option value="Referral">
                Referral
            </option>

            <option value="Campaign">
                Campaign
            </option>

        </select>

    </div>


    {/* Assignee */}

    <div className="admin-appointment-filter-item">

        <label>
            Assignee
        </label>

     <select
    value={assignee}
    onChange={(e)=>
        setAssignee(
            e.target.value
        )
    }
>

    <option value="">
        All Users
    </option>
{/* 
    {
        users.map(
            (user)=>(
                <option
                    key={user._id}
                    value={user._id}
                >
                    {user.name}
                </option>
            )
        )
    } */}

</select>

    </div>


    {/* Date */}

    <div className="admin-appointment-filter-item">

        <label>
            Date Range
        </label>

        <input
            type="date"
            value={filterDate}
            onChange={(e)=>
                setFilterDate(
                    e.target.value
                )
            }
        />

    </div>


    {/* Buttons */}

    <button
        className="admin-appointment-apply-btn"
    >
        Apply Filter
    </button>


    <button
        className="admin-appointment-reset-btn"
        onClick={()=>{
            setSearch("");
            setAppointmentType("");
            setStatus("");
            setSource("");
            setAssignee("");
            setFilterDate("");
        }}
    >
        Reset
    </button>

</div>








<div className="admin-appointments-table-section">

    <div className="admin-appointments-table-header">

        <div>
            <h2>
                Appointments
            </h2>

            <p>
                Total Appointments :
                {appointments.length}
            </p>
        </div>

    </div>

  <div className="admin-appointments-table-wrapper">

    <table className="admin-appointments-table">

        <thead>

            <tr>
                <th>S.No</th>
                <th>Appointment ID</th>
                <th>User Name</th>
                <th>Vendor Name</th>
                <th>Service</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
            </tr>

        </thead>

        <tbody>

            {
                appointments?.length > 0
                ?

                appointments.map(
                    (
                        appointment,
                        index
                    ) => (

                        <tr
                            key={
                                appointment._id
                            }
                        >

                            <td>
                                {
                                    index + 1
                                }
                            </td>

                            <td>

                                {
                                    appointment.consultationId ||
                                    appointment.bookingId ||
                                    appointment.appointmentId ||
                                    `APT-${appointment._id
                                        ?.slice(-6)
                                        ?.toUpperCase()}`
                                }

                            </td>

                            <td>

                                {
                                    appointment.userId?.fullName ||
                                    appointment.userId?.name ||
                                    appointment.customerName ||
                                    "N/A"
                                }

                            </td>

                            <td>

                                {
                                    appointment.vendorId?.firmName ||
                                    appointment.vendorId?.fullName ||
                                    appointment.vendorId?.name ||
                                    "N/A"
                                }

                            </td>

                            <td>

                                {
                                    appointment.serviceName ||
                                    "Consultation"
                                }

                            </td>

                            <td>

                                {
                                    appointment.appointmentDate
                                    ?
                                    new Date(
                                        appointment.appointmentDate
                                    ).toLocaleDateString(
                                        "en-IN",
                                        {
                                            day:"2-digit",
                                            month:"short",
                                            year:"numeric"
                                        }
                                    )
                                    :
                                    "-"
                                }

                            </td>

                            <td>

                                {
                                    appointment.startTime ||
                                    appointment.time ||
                                    "-"
                                }

                            </td>

                            <td>

                                <span
                                    className={`admin-appointment-status-badge ${
                                        (
                                            appointment.status ||
                                            "upcoming"
                                        ).toLowerCase()
                                    }`}
                                >

                                    {
                                        appointment.status ||
                                        "Upcoming"
                                    }

                                </span>

                            </td>

                        </tr>

                    )
                )

                :

                <tr>

                    <td
                        colSpan="8"
                        className="admin-appointments-empty-row"
                    >

                        No Appointments Found

                    </td>

                </tr>
            }

        </tbody>

    </table>

</div>

</div>





      
      
      
      
      
      
      
      
      </div>
      </div>

  );

}

export default AdminAppointments;