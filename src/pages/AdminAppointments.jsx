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
  FaTimesCircle,
  FaUserTimes,
  FaChartLine,
  FaSearch,
  FaClock,
  FaSyncAlt,
  FaRedoAlt,

} from "react-icons/fa";


import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Label,
  AreaChart,
  Area
} from "recharts";



function AdminAppointments() {






const performanceCards = [
  {
    title: "Completion Rate",
    key: "completionRate",
    icon: <FaCheckCircle />,
    iconClass: "green",
    stroke: "#22c55e",
    fill: "#dcfce7"
  },
  {
    title: "Cancellation Rate",
    key: "cancellationRate",
    icon: <FaTimesCircle />,
    iconClass: "red",
    stroke: "#ef4444",
    fill: "#fee2e2"
  },
  {
    title: "No Show Rate",
    key: "noShowRate",
    icon: <FaUserTimes />,
    iconClass: "orange",
    stroke: "#f59e0b",
    fill: "#fef3c7"
  },
  {
    title: "Reschedule Rate",
    key: "rescheduleRate",
    icon: <FaRedoAlt />,
    iconClass: "purple",
    stroke: "#7c3aed",
    fill: "#ede9fe"
  }
];
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


    const [period, setPeriod] =
useState("thisWeek");

const [trendData, setTrendData] =
useState({
  labels:[],
  total:[],
  completed:[],
  cancelled:[],
  noShow:[]
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

const [dashboardData, setDashboardData] = useState({
  insights: {
    peakTime: "-",
    averageDuration: "-",
    rescheduleRate: "0%",
    cancellationRate: "0%"
  }
});


const [performanceData, setPerformanceData] =
useState({

  completionRate: {},

  cancellationRate: {},

  noShowRate: {},

  rescheduleRate: {}

});



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





const fetchDashboard =
async () => {

  const res =
  await axios.get(
    `${API_URL}/api/admin/appointment-dashboard`
  );

  if(res.data.success){

    setDashboardData(
      res.data
    );

  }

};












const fetchPerformanceOverview =
async () => {

  try {

    const token =
    localStorage.getItem(
      "token"
    );

    const res =
    await axios.get(

      `${API_URL}/api/admin/performance-overview`,

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

      setPerformanceData(

        res.data.performance

      );

    }

  }

  catch(err){

    console.log(err);

  }

};



const createTrendData = (trend = []) => {

  return trend.map((value, index) => ({

    day: index + 1,

    value

  }));

};




const fetchTrendData = async () => {

  try {

    const token =
      localStorage.getItem("token");

    const res =
      await axios.get(

        `${API_URL}/api/admin/appointment-trends?period=${period}`,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      );

    if (res.data.success) {

      // ================= Appointment Type =================

      const typeColors = [
        "#2563eb",
        "#10b981",
        "#f59e0b",
        "#8b5cf6",
        "#ec4899",
        "#06b6d4",
        "#f43f5e"
      ];

      res.data.appointmentTypes =
        (res.data.appointmentTypes || []).map((item, index) => ({
          ...item,
          color: typeColors[index % typeColors.length]
        }));


      // ================= Appointment Status =================

      const statusColors = {
        Completed: "#2563eb",
        Scheduled: "#10b981",
        Cancelled: "#f59e0b",
        "No-show": "#ec4899",
        "No Show": "#ec4899",
        "In Progress": "#8b5cf6"
      };

      res.data.appointmentStatus =
        (res.data.appointmentStatus || []).map((item) => ({
          ...item,
          color:
            statusColors[item.name] || "#94a3b8"
        }));


      // ================= Appointment Source =================

      const sourceColors = {
        Website: "#2563eb",
        Referral: "#10b981",
        Advertisement: "#f59e0b",
        "Social Media": "#8b5cf6",
        Others: "#14b8a6"
      };

      res.data.appointmentSources =
        (res.data.appointmentSources || []).map((item) => ({
          ...item,
          color:
            sourceColors[item.name] || "#94a3b8"
        }));


      setTrendData(res.data);

    }

  }

  catch (err) {

    console.log(err);

  }

};














useEffect(() => {

    fetchHeaderData();

    fetchStats();

    fetchUsers();

    fetchAppointments();

    fetchDashboard();

    fetchPerformanceOverview();

}, []);

useEffect(() => {

    fetchTrendData();

}, [period]);



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




useEffect(() => {

  const token = localStorage.getItem("token");

  const role = localStorage.getItem("role");

  if (
    !token ||
    !["superadmin", "admin"].includes(role)
  ) {
    navigate("/admin");
  }

}, [navigate]);











 




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

























{/* ===========================================
        APPOINTMENTS TREND
=========================================== */}

<div className="admin-trend-wrapper">

  <div className="admin-trend-card">

    <div className="admin-trend-header">

      <h3>
        Appointments Trend
      </h3>

      <select
        className="admin-trend-filter"
        value={period}
        onChange={(e)=>
          setPeriod(
            e.target.value
          )
        }
      >

        <option value="thisWeek">
          This Week
        </option>

        <option value="lastWeek">
          Last Week
        </option>

        <option value="thisMonth">
          This Month
        </option>

      </select>

    </div>



    {/* Legend */}

    <div className="admin-trend-legend">

      <div className="legend-item">

        <span
          className="legend-dot blue"
        ></span>

        <p>Total</p>

      </div>

      <div className="legend-item">

        <span
          className="legend-dot green"
        ></span>

        <p>Completed</p>

      </div>

      <div className="legend-item">

        <span
          className="legend-dot orange"
        ></span>

        <p>Cancelled</p>

      </div>

      <div className="legend-item">

        <span
          className="legend-dot pink"
        ></span>

        <p>No Show</p>

      </div>

    </div>



    <div className="admin-trend-chart">

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <LineChart

          data={

            trendData.labels.map(

              (
                label,
                index

              ) => ({

                label,

                total:
                trendData.total[index],

                completed:
                trendData.completed[index],

                cancelled:
                trendData.cancelled[index],

                noShow:
                trendData.noShow[index]

              })

            )

          }

        >

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#edf2f7"
          />

          <XAxis
            dataKey="label"
            tick={{
              fontSize:12
            }}
          />

          <YAxis
            tick={{
              fontSize:12
            }}
          />

          <Tooltip/>

          <Line

            type="monotone"

            dataKey="total"

            stroke="#2563eb"

            strokeWidth={3}

            dot={{
              r:4,
              fill:"#2563eb"
            }}

            activeDot={{
              r:6
            }}

          />



          <Line

            type="monotone"

            dataKey="completed"

            stroke="#10b981"

            strokeWidth={3}

            dot={{
              r:4,
              fill:"#10b981"
            }}

          />



          <Line

            type="monotone"

            dataKey="cancelled"

            stroke="#f59e0b"

            strokeWidth={3}

            dot={{
              r:4,
              fill:"#f59e0b"
            }}

          />



          <Line

            type="monotone"

            dataKey="noShow"

            stroke="#ec4899"

            strokeWidth={3}

            dot={{
              r:4,
              fill:"#ec4899"
            }}

          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  </div>
</div>









{/* ===========================================
        APPOINTMENTS BY TYPE
=========================================== */}

<div className="admin-type-card">

    <div className="admin-type-header">

        <h3>
            Appointments by Type
        </h3>

    </div>

    <div className="admin-type-body">

        {/* Donut Chart */}

        <div className="admin-type-chart">

            <ResponsiveContainer
                width="100%"
                height={260}
            >

                <PieChart>

                    <Pie

                      data={trendData.appointmentTypes}
                        cx="50%"

                        cy="50%"

                        innerRadius={65}

                        outerRadius={95}

                        paddingAngle={3}

                        dataKey="value"

                    >

                        {

                            trendData.appointmentTypes?.map(

                                (
                                    entry,
                                    index
                                ) => (

                                    <Cell

                                        key={index}

                                        fill={
                                            entry.color
                                        }

                                    />

                                )

                            )

                        }

                        <Label

                            position="center"

                            content={() => (

                                <text

                                    x="50%"

                                    y="47%"

                                    textAnchor="middle"

                                >

                                    <tspan

                                        x="50%"

                                        dy="-2"

                                        fontSize="28"

                                        fontWeight="700"

                                        fill="#111827"

                                    >

                                        {

                                          trendData.totalAppointments

                                        }

                                    </tspan>

                                    <tspan

                                        x="50%"

                                        dy="28"

                                        fontSize="14"

                                        fill="#6b7280"

                                    >

                                        Total

                                    </tspan>

                                </text>

                            )}

                        />

                    </Pie>

                    <Tooltip />

                </PieChart>

            </ResponsiveContainer>

        </div>



        {/* Legend */}

        <div className="admin-type-list">

            {

                trendData.appointmentTypes?.map(

                    (item) => (

                        <div

                            key={item.name}

                            className="admin-type-item"

                        >

                            <div
                                className="admin-type-left"
                            >

                                <span

                                    className="admin-type-color"

                                    style={{
                                        background:
                                        item.color
                                    }}

                                ></span>

                                <p>

                                    {
                                        item.name
                                    }

                                </p>

                            </div>

                            <strong>

                                {

                                    item.value
                                }

                                {" ("}

                                {

                                    (

                                        (

                                            item.value

                                            /

                                            trendData.total

                                        )

                                        *

                                        100

                                    ).toFixed(1)

                                }

                                %)

                            </strong>

                        </div>

                    )

                )

            }

        </div>

    </div>

</div>











{/* ============================
   Appointments by Status
============================ */}

<div className="admin-status-card">

  <div className="admin-chart-card-header">

    <h3>
      Appointments by Status
    </h3>

  </div>

  <div className="admin-status-body">

    {/* Donut */}

    <div className="admin-status-chart">

      <ResponsiveContainer
        width="100%"
        height={260}
      >

        <PieChart>

          <Pie
            data={
              trendData.appointmentStatus
            }
            dataKey="value"
            nameKey="name"
            innerRadius={72}
            outerRadius={105}
            paddingAngle={2}
            stroke="#fff"
            strokeWidth={4}
          >

            {
              trendData.appointmentStatus?.map(
                (item, index) => (

                  <Cell
                    key={index}
                    fill={item.color}
                  />

                )
              )
            }

            <Label
              position="center"
              content={() => (

                <g>

                  <text
                    x="50%"
                    y="46%"
                    textAnchor="middle"
                    fontSize="32"
                    fontWeight="700"
                    fill="#0f172a"
                  >

                    {
                      trendData.totalAppointments
                    }

                  </text>

                  <text
                    x="50%"
                    y="58%"
                    textAnchor="middle"
                    fontSize="16"
                    fill="#64748b"
                  >

                    Total

                  </text>

                </g>

              )}
            />

          </Pie>

        </PieChart>

      </ResponsiveContainer>

    </div>



    {/* Legend */}

    <div className="admin-status-legend">

      {

        trendData
          .appointmentStatus
          ?.map((item, index) => (

            <div
              key={index}
              className="admin-status-row"
            >

              <div
                className="admin-status-left"
              >

                <span

                  className="admin-status-dot"

                  style={{

                    background:
                      item.color

                  }}

                />

                <span>

                  {
                    item.name
                  }

                </span>

              </div>

              <strong>

                {

                  item.value

                }

                {" ("}

                {

                  trendData.totalAppointments > 0

                    ?

                    (

                      (

                        item.value /

                        trendData.totalAppointments

                      ) * 100

                    ).toFixed(1)

                    :

                    0

                }

                %)

              </strong>

            </div>

          ))

      }

    </div>

  </div>

</div>

{/* ============================
    Appointments by Source
============================ */}

<div className="admin-source-card">

  <div className="admin-chart-card-header">

    <h3>
      Appointments by Source
    </h3>

  </div>

  <div className="admin-source-list">

    {

      trendData.appointmentSources?.map(

        (item, index) => {

          const percentage =

            trendData.totalAppointments > 0

              ?

              (

                item.value /

                trendData.totalAppointments

              ) * 100

              :

              0;

          return (

            <div
              key={index}
              className="admin-source-row"
            >

              {/* Source Name */}

              <div className="admin-source-name">

                {item.name}

              </div>


              {/* Progress */}

              <div className="admin-source-progress">

                <div
                  className="admin-source-fill"

                  style={{

                    width: `${percentage}%`,

                    background: item.color

                  }}

                />

              </div>


              {/* Count */}

              <div className="admin-source-value">

                <strong>

                  {item.value}

                </strong>

                <span>

                  (

                  {percentage.toFixed(1)}

                  %)

                </span>

              </div>

            </div>

          );

        }

      )

    }

  </div>

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
  className={`admin-appointment-status-badge ${appointment.status.toLowerCase()}`}
>
  {appointment.status}
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





   {/* =======================
      Appointments Bottom
======================= */}

<div className="admin-appointments-bottom">

  {/* ================= Upcoming ================= */}

  <div className="admin-appointments-bottom-card">

    <div className="admin-appointments-bottom-header">

      <h3>Upcoming Appointments</h3>

      <button
        className="admin-appointments-view-btn"
      >
        View All
      </button>

    </div>

    <div className="admin-appointments-upcoming-list">

      {

        appointments

        .filter((appointment)=>{

          if(
            appointment.status !==
            "upcoming"
          ) return false;

          return new Date(
            appointment.appointmentDate
          ) >= new Date();

        })

        .sort(
          (a,b)=>

            new Date(
              a.appointmentDate
            )

            -

            new Date(
              b.appointmentDate
            )

        )

        .slice(0,5)

        .map((appointment)=>(

          <div
            key={appointment._id}
            className="admin-appointments-upcoming-item"
          >

            <div className="admin-appointments-upcoming-left">

              <div className="admin-appointments-upcoming-icon">

                <FaCalendarAlt/>

              </div>

              <div className="admin-appointments-upcoming-content">

                <h4>

                  {
                    appointment.userId?.fullName ||

                    appointment.userId?.name ||

                    "User"
                  }

                </h4>

                <p>

                  {
                    appointment.serviceName ||

                    "Consultation"
                  }

                </p>

                <span>

                  {

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

                  }

                  {" • "}

                  {

                    appointment.startTime ||

                    appointment.time

                  }

                </span>

              </div>

            </div>

            <div className="admin-appointments-upcoming-right">

              <span>

                {

                  appointment.startTime ||

                  appointment.time

                }

              </span>

            </div>

          </div>

        ))

      }

    </div>

  </div>



  {/* ================= Insights ================= */}

<div className="admin-appointments-insights-card">

  <div className="admin-appointments-bottom-header">

    <h3>
      Appointment Insights
    </h3>

  </div>

  <div className="admin-appointments-insights-list">

    {/* Peak Time */}

    <div className="admin-appointments-insight-item">

      <div className="admin-appointments-insight-left">

        <div className="admin-appointments-insight-icon blue">
          <FaClock />
        </div>

        <span>
          Peak appointments time
        </span>

      </div>

      <strong>
        {dashboardData?.insights?.peakTime || "-"}
      </strong>

    </div>


    {/* Average Duration */}

    <div className="admin-appointments-insight-item">

      <div className="admin-appointments-insight-left">

        <div className="admin-appointments-insight-icon green">
          <FaClock />
        </div>

        <span>
          Average duration
        </span>

      </div>

      <strong>
        {dashboardData?.insights?.averageDuration || "-"}
      </strong>

    </div>


    {/* Reschedule Rate */}

    <div className="admin-appointments-insight-item">

      <div className="admin-appointments-insight-left">

        <div className="admin-appointments-insight-icon purple">
          <FaRedoAlt />
        </div>

        <span>
          Reschedule rate
        </span>

      </div>

      <strong>
        {dashboardData?.insights?.rescheduleRate || "0%"}
      </strong>

    </div>


    {/* Cancellation Rate */}

    <div className="admin-appointments-insight-item">

      <div className="admin-appointments-insight-left">

        <div className="admin-appointments-insight-icon red">
          <FaTimesCircle />
        </div>

        <span>
          Cancellation rate
        </span>

      </div>

      <strong>
        {dashboardData?.insights?.cancellationRate || "0%"}
      </strong>

    </div>

  </div>

</div>

</div>
      
      
      
<div className="admin-performance-grid">

  {performanceCards.map((card) => {

    const data = performanceData[card.key] || {};

    return (

      <div
        className="admin-performance-card"
        key={card.key}
      >

        <div className="admin-performance-left">

          <div
            className={`admin-performance-icon ${card.iconClass}`}
          >
            {card.icon}
          </div>

          <div className="admin-performance-content">

            <h5>{card.title}</h5>

            <h2>
              {data.value || 0}%
            </h2>

            <span>
              {data.change || "0%"}
            </span>

          </div>

        </div>

        <div className="admin-performance-chart">

          <ResponsiveContainer
            width="100%"
            height={55}
          >

            <AreaChart
              data={createTrendData(
                data.trend || []
              )}
            >

              <Tooltip />

              <Area
                type="monotone"
                dataKey="value"
                stroke={card.stroke}
                fill={card.fill}
                strokeWidth={2}
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </div>

    );

  })}

</div>
      
      
      
      </div>
      </div>

  );

}

export default AdminAppointments;