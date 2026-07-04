import React,{
  useEffect,
  useState
} from "react";

import axios from "axios";

import API_URL from "../config";

import Sidebar from "../components/Sidebar";

import "./VendorDashboard.css";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate }from "react-router-dom";

import {
  FaSearch,
  FaBell,
  FaRegCommentDots,
  FaUsers,
  FaUserPlus,
  FaChartLine,
  FaCheckCircle,
  FaCalendarAlt,
  FaCalendarCheck,
  FaRupeeSign,
  FaCrown,
  FaPlusCircle,
  FaTag,
  FaClock,
  FaHeadset,
  FaGift,
 
 
} from "react-icons/fa";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";





const VendorDashboard = () => {

const navigate =
  useNavigate();
  const [showCalendar,setShowCalendar] =
useState(false);

  const [dashboard,setDashboard] =
    useState({});

  const [vendor,setVendor] =
    useState(null);

  const [loading,setLoading] =
    useState(true);

  useEffect(()=>{

    fetchDashboard();

  },[]);

  const fetchDashboard = async()=>{

    try{

      const vendorId =
        localStorage.getItem(
          "vendorId"
        );

      const res =
        await axios.get(
          `${API_URL}/api/vendor/dashboard/${vendorId}`
        );
        console.log(
  "Notifications:",
  res.data.notifications
);
setDashboard(
  res.data || {}
);

      setVendor(
        res.data.vendor || null
      );

    }catch(err){

      console.log(err);

    }finally{

      setLoading(false);

    }

  };


















  const appointmentDates =
  dashboard?.upcomingAppointments?.map(
    item =>
      new Date(
        item.appointmentDate
      ).toDateString()
  ) || [];













const leadData = [
  {
    name: "New Leads",
    value: dashboard?.stats?.newLeads || 0,
    color: "#22c55e"
  },
  {
    name: "Active Leads",
    value: dashboard?.stats?.activeLeads || 0,
    color: "#f59e0b"
  },
  {
    name: "Converted Leads",
    value: dashboard?.stats?.convertedLeads || 0,
    color: "#8b5cf6"
  },
  {
    name: "Rejected Leads",
    value: dashboard?.stats?.rejectedLeads || 0,
    color: "#ec4899"
  }
];

const totalLeads =
  leadData.reduce(
    (sum,item)=>sum+item.value,
    0
  );







const newLeadPercent =
  totalLeads > 0
  ? Math.round(
      (dashboard?.stats?.newLeads || 0)
      / totalLeads * 100
    )
  : 0;

const activeLeadPercent =
  totalLeads > 0
  ? Math.round(
      (dashboard?.stats?.activeLeads || 0)
      / totalLeads * 100
    )
  : 0;

const convertedLeadPercent =
  totalLeads > 0
  ? Math.round(
      (dashboard?.stats?.convertedLeads || 0)
      / totalLeads * 100
    )
  : 0;

const rejectedLeadPercent =
  totalLeads > 0
  ? Math.round(
      (dashboard?.stats?.rejectedLeads || 0)
      / totalLeads * 100
    )
  : 0;

const conversionRate =
  totalLeads > 0
  ? (
      (dashboard?.stats?.convertedLeads || 0)
      / totalLeads * 100
    ).toFixed(2)
  : 0;




const [revenueFilter,setRevenueFilter] =
  useState("all");

const revenueData =
  (dashboard?.monthlyRevenueData || [])
  .map(item => ({
    day:
      item.day ||
      item._id?.day ||
      item._id?.month ||
      item._id?.year ||
      "N/A",

    revenue:
      item.revenue ||
      item.amount ||
      item.totalRevenue ||
      0,

    date:
      item.date ||
      item.createdAt ||
      null
  }));


  const filteredRevenue =
  revenueFilter === "thisMonth"
    ? revenueData.filter(
        item =>
          item.date
            ? new Date(item.date).getMonth() ===
              new Date().getMonth()
            : true
      )
    : revenueFilter === "lastMonth"
    ? revenueData.filter(
        item =>
          item.date
            ? new Date(item.date).getMonth() ===
              new Date().getMonth() - 1
            : true
      )
    : revenueData;



const quickActions = [
  {
    title: "Add New Service",
    icon: <FaPlusCircle />,
    className: "quick-blue",
    path: "/vendor-services"
  },

  {
    title: "Update Profile",
    icon: <FaUsers />,
    className: "quick-orange",
    path: "/vendor-profile"
  },

  {
    title: "Availability",
    icon: <FaClock />,
    className: "quick-green",
    path: "/vendor-availability"
  },

  {
    title: "Raise Ticket",
    icon: <FaHeadset />,
    className: "quick-purple",
    path: "/support"
  },

  {
    title: "Refer & Earn",
    icon: <FaGift />,
    className: "quick-pink",
    path: "/refer-earn"
  },

  {
    title: "Upgrade Plan",
    icon: <FaCrown />,
    className: "quick-yellow",
    path: "/vendor-subscription"
  }
];









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








  if(loading){

    return(
      <div
        className="vendor-dashboard-loading"
      >
        Loading...
      </div>
    );

  }

  return(

    <div className="vendor-dashboard-layout">

      <Sidebar/>

      <div className="vendor-dashboard-main">

        {/* HEADER */}

        <div className="vendor-dashboard-header">

          <div className="vendor-dashboard-header-left">

            <h1>
              Dashboard
            </h1>

            <span>
              Overview
            </span>

          </div>

          <div className="vendor-dashboard-header-right">

            <div className="vendor-dashboard-search-box">

              <FaSearch/>

              <input
                type="text"
                placeholder="Search here..."
              />

              <span className="vendor-dashboard-shortcut">
                Ctrl + K
              </span>

            </div>

            <button className="vendor-dashboard-icon-btn">

              <FaRegCommentDots/>

            </button>

            <button className="vendor-dashboard-icon-btn vendor-dashboard-bell">

              <FaBell/>

              {
                dashboard
                ?.unreadNotifications > 0 && (

                  <small>

                    {
                      dashboard
                      ?.unreadNotifications
                    }

                  </small>

                )
              }

            </button>

            <div className="vendor-dashboard-profile">

            
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

                  {
                    vendor?.fullName ||
                    "Vendor"
                  }

                </h4>

                <p>

                  {
                    vendor?.firmName ||
                    vendor?.designation
                  }

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* STATS */}

        <div className="vendor-dashboard-stats-grid">

          {/* CARD 1 */}

          <div className="vendor-dashboard-stat-card">

            <div>

              <p className="vendor-dashboard-card-title">
                Total Leads
              </p>

              <h2 className="vendor-dashboard-card-value">

                {
                  dashboard
                  ?.totalLeads || 0
                }

              </h2>

              <span className="vendor-dashboard-card-growth">

                ▲
                {
                  dashboard
                  ?.totalLeadGrowth || 0
                }
                %
                from last month

              </span>

            </div>

            <div className="vendor-dashboard-icon-circle vendor-dashboard-blue">

              <FaUsers/>

            </div>

          </div>

          {/* CARD 2 */}

          <div className="vendor-dashboard-stat-card">

            <div>

              <p className="vendor-dashboard-card-title">
                New Leads
              </p>

              <h2 className="vendor-dashboard-card-value">

                {
                  dashboard
                  ?.newLeads || 0
                }

              </h2>

              <span className="vendor-dashboard-card-growth">

                ▲
                {
                  dashboard
                  ?.newLeadGrowth || 0
                }
                %
                from last month

              </span>

            </div>

            <div className="vendor-dashboard-icon-circle vendor-dashboard-green">

              <FaUserPlus/>

            </div>

          </div>

          {/* CARD 3 */}

          <div className="vendor-dashboard-stat-card">

            <div>

              <p className="vendor-dashboard-card-title">
                Active Leads
              </p>

              <h2 className="vendor-dashboard-card-value">

                {
                  dashboard
                  ?.activeLeads || 0
                }

              </h2>

              <span className="vendor-dashboard-card-growth">

                ▲
                {
                  dashboard
                  ?.activeLeadGrowth || 0
                }
                %
                from last month

              </span>

            </div>

            <div className="vendor-dashboard-icon-circle vendor-dashboard-orange">

              <FaChartLine/>

            </div>

          </div>

          {/* CARD 4 */}

          <div className="vendor-dashboard-stat-card">

            <div>

              <p className="vendor-dashboard-card-title">
                Converted Leads
              </p>

              <h2 className="vendor-dashboard-card-value">

                {
                  dashboard
                  ?.convertedLeads || 0
                }

              </h2>

              <span className="vendor-dashboard-card-growth">

                ▲
                {
                  dashboard
                  ?.convertedGrowth || 0
                }
                %
                from last month

              </span>

            </div>

            <div className="vendor-dashboard-icon-circle vendor-dashboard-purple">

              <FaCheckCircle/>

            </div>

          </div>

          {/* CARD 5 */}

          <div className="vendor-dashboard-stat-card">

            <div>

              <p className="vendor-dashboard-card-title">
                Today's Appointments
              </p>

              <h2 className="vendor-dashboard-card-value">

                {
                  dashboard
                  ?.todayAppointments || 0
                }

              </h2>

              <span className="vendor-dashboard-calendar-link">

                View Calendar

              </span>

            </div>

            <div className="vendor-dashboard-icon-circle vendor-dashboard-sky">

              <FaCalendarAlt/>

            </div>

          </div>

          {/* CARD 6 */}

          <div className="vendor-dashboard-stat-card">

            <div>

              <p className="vendor-dashboard-card-title">
                Monthly Revenue
              </p>

              <h2 className="vendor-dashboard-card-value">

                ₹

                {
                  dashboard
                  ?.monthlyRevenue
                  ?.toLocaleString()
                  || 0
                }

              </h2>

              <span className="vendor-dashboard-card-growth">

                ▲
                {
                  dashboard
                  ?.revenueGrowth || 0
                }
                %
                from last month

              </span>

            </div>

            <div className="vendor-dashboard-icon-circle vendor-dashboard-pink">

              ₹

            </div>

          </div>

        </div>

    




<div className="vendor-dashboard-bottom-grid">

  {/* ===================== ROW 1 ===================== */}

  <div className="vendor-dashboard-row">

    {/* Upcoming Appointments */}
    <div className="vendor-dashboard-appointments-card">

      <div className="vendor-dashboard-card-top">

        <h3>
          Upcoming Appointments
        </h3>

        <span
          onClick={() =>
            setShowCalendar(true)
          }
        >
          View Calendar
        </span>

      </div>

      {
        dashboard?.upcomingAppointments?.map(
          (item) => (

            <div
              key={item._id}
              className="vendor-dashboard-appointment-row"
            >

              <div className="vendor-dashboard-time">

                <h4>
                  {
                    item.startTime ||
                    "10:00 AM"
                  }
                </h4>

                <small>
                  {
                    new Date(
                      item.appointmentDate
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        weekday:"short"
                      }
                    )
                  }
                </small>

              </div>

              <div className="vendor-dashboard-user">

                {
                  item.userId?.photo
                  ? (
                    <img
                      src={`${API_URL}/uploads/${item.userId.photo}`}
                      alt=""
                      className="vendor-dashboard-user-image"
                    />
                  )
                  : (
                    <div className="vendor-dashboard-avatar">

                      {
                        (
                          item.userId?.fullName ||
                          item.userId?.name ||
                          "C"
                        )
                        .charAt(0)
                        .toUpperCase()
                      }

                    </div>
                  )
                }

                <div>

                  <h4>

                    {
                      item.userId?.fullName ||
                      item.userId?.name ||
                      "Customer"
                    }

                  </h4>

                  <p>
                    {item.serviceName}
                  </p>

                </div>

              </div>

              <button
                className={`vendor-dashboard-mode-btn ${item.mode}`}
              >

                {
                  item.mode === "video"
                  ? "Video Call"
                  : item.mode === "phone"
                  ? "Phone"
                  : "In Person"
                }

              </button>

            </div>

          )
        )
      }

    </div>


    {/* Notifications */}

    <div className="vendor-dashboard-notifications-card">

      <div className="vendor-dashboard-card-top">

        <h3>
          Notifications
        </h3>

        <span>
          View All
        </span>

      </div>

      {
        dashboard?.notifications?.map(
          (item) => (

            <div
              key={item._id}
              className="vendor-dashboard-notification-row"
            >

              <div className="vendor-dashboard-notification-dot"/>

              <div>

                <h4>
                  {item.title}
                </h4>

                <p>
                  {item.message}
                </p>

              </div>

            </div>

          )
        )
      }

    </div>

  </div>



  {/* ===================== ROW 2 ===================== */}

  <div className="vendor-dashboard-row">

    {/* Lead Summary */}

    <div className="vendor-dashboard-summary-card">

      <div className="vendor-dashboard-card-top">

        <h3>
          Lead Summary
        </h3>
<span
  onClick={() =>
    navigate("/vendor-leads")
  }
  className="vendor-dashboard-view-all"
>
  View All Leads
</span>

      </div>

      <div className="vendor-dashboard-chart-wrapper">

        <div className="vendor-dashboard-chart">

          <ResponsiveContainer
            width={180}
            height={180}
          >

            <PieChart>

              <Pie
                data={leadData}
                innerRadius={55}
                outerRadius={80}
                dataKey="value"
                stroke="none"
              >

                {
                  leadData.map(
                    (
                      entry,
                      index
                    ) => (
                      <Cell
                        key={index}
                        fill={entry.color}
                      />
                    )
                  )
                }

              </Pie>

            </PieChart>

          </ResponsiveContainer>

          <div className="vendor-dashboard-chart-center">

            <h2>
              {totalLeads}
            </h2>

            <span>
              Total
            </span>

          </div>

        </div>
<div className="vendor-dashboard-summary-list">

  <div className="vendor-dashboard-summary-row">

    <div className="vendor-dashboard-summary-left">

      <span
        className="vendor-dashboard-color-dot"
        style={{
          background:"#22c55e"
        }}
      />

      <span>
        New Leads
      </span>

    </div>

    <strong>
      {
        dashboard?.stats?.newLeads || 0
      }
      {" "}
      ({newLeadPercent}%)
    </strong>

  </div>

  <div className="vendor-dashboard-summary-row">

    <div className="vendor-dashboard-summary-left">

      <span
        className="vendor-dashboard-color-dot"
        style={{
          background:"#f59e0b"
        }}
      />

      <span>
        Active Leads
      </span>

    </div>

    <strong>
      {
        dashboard?.stats?.activeLeads || 0
      }
      {" "}
      ({activeLeadPercent}%)
    </strong>

  </div>

  <div className="vendor-dashboard-summary-row">

    <div className="vendor-dashboard-summary-left">

      <span
        className="vendor-dashboard-color-dot"
        style={{
          background:"#8b5cf6"
        }}
      />

      <span>
        Converted Leads
      </span>

    </div>

    <strong>
      {
        dashboard?.stats?.convertedLeads || 0
      }
      {" "}
      ({convertedLeadPercent}%)
    </strong>

  </div>

  <div className="vendor-dashboard-summary-row">

    <div className="vendor-dashboard-summary-left">

      <span
        className="vendor-dashboard-color-dot"
        style={{
          background:"#ec4899"
        }}
      />

      <span>
        Rejected Leads
      </span>

    </div>

    <strong>
      {
        dashboard?.stats?.rejectedLeads || 0
      }
      {" "}
      ({rejectedLeadPercent}%)
    </strong>

  </div>

</div>



      </div>

<div className="vendor-dashboard-conversion-rate">

  <span>
    Leads conversion rate
  </span>

  <div>

    <strong>
      {conversionRate}%
    </strong>

    <span className="vendor-dashboard-growth">
  ▲ {conversionRate}%
</span>

  </div>

</div>
    </div>


    {/* Recent Activities */}

 <div className="vendor-dashboard-widget">

  <div className="vendor-dashboard-widget-header">

    <h3>
      Recent Activities
    </h3>

    <span>
      View All
    </span>

  </div>

  {
    dashboard?.activities?.length > 0
    ? (
      dashboard.activities.map(
        (item) => (

          <div
            key={item._id}
            className="vendor-dashboard-activity-item"
          >

            <div className="vendor-dashboard-activity-left">

              <div
                className={`vendor-dashboard-activity-icon ${item.type}`}
              >

                {
                  item.type === "lead"
                  ? <FaUserPlus />
                  : item.type === "appointment"
                  ? <FaCalendarCheck />
                  : item.type === "payment"
                  ? <FaRupeeSign />
                  : item.type === "subscription"
                  ? <FaCrown />
                  : <FaBell />
                }

              </div>

              <div className="vendor-dashboard-activity-content">

                <h4>
                  {item.message}
                </h4>

                <p>
                  {item.title}
                </p>

              </div>

            </div>

            <span className="vendor-dashboard-activity-time">

              {
                dayjs(
                  item.createdAt
                ).fromNow()
              }

            </span>

          </div>

        )
      )
    )
    : (

      <div className="vendor-dashboard-no-activity">

        No recent activities found

      </div>

    )
  }

</div>




















  </div>



{/* ===================== ROW 3 ===================== */}

<div className="vendor-dashboard-row">

  {/* Monthly Revenue */}
 <div className="vendor-dashboard-widget vendor-dashboard-revenue-widget">

  <div className="vendor-dashboard-revenue-top">

    <div>

      <h3>
        Monthly Revenue Overview
      </h3>

      <h1>
        ₹
        {
          (
            dashboard?.stats?.monthlyRevenue || 0
          ).toLocaleString()
        }
      </h1>

      <p>
        Total Revenue
      </p>

    </div>

    <select
      value={revenueFilter}
      onChange={(e)=>
        setRevenueFilter(
          e.target.value
        )
      }
    >

      <option value="thisMonth">
        This Month
      </option>

      <option value="lastMonth">
        Last Month
      </option>

      <option value="all">
        All Time
      </option>

    </select>

  </div>

  <ResponsiveContainer
    width="100%"
    height={250}
  >

    <AreaChart
      data={filteredRevenue}
      margin={{
        top:20,
        right:20,
        left:0,
        bottom:0
      }}
    >

      <defs>

        <linearGradient
          id="colorRevenue"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >

          <stop
            offset="5%"
            stopColor="#2563eb"
            stopOpacity={0.3}
          />

          <stop
            offset="95%"
            stopColor="#2563eb"
            stopOpacity={0}
          />

        </linearGradient>

      </defs>

      <CartesianGrid
        strokeDasharray="3 3"
        vertical={false}
      />

      <XAxis
        dataKey="day"
      />

      <YAxis
        tickFormatter={
          value =>
            `₹${(
              value / 1000
            ).toFixed(1)}k`
        }
      />

      <Tooltip
        formatter={
          value => [
            `₹${Number(
              value
            ).toLocaleString()}`,
            "Revenue"
          ]
        }
      />

      <Area
        type="monotone"
        dataKey="revenue"
        stroke="#2563eb"
        strokeWidth={3}
        fillOpacity={1}
        fill="url(#colorRevenue)"
      />

    </AreaChart>

  </ResponsiveContainer>

</div>

  {/* Quick Actions */}

 <div className="vendor-dashboard-widget">

  <div className="vendor-dashboard-widget-header">

    <h3>
      Quick Actions
    </h3>

  </div>

  <div className="vendor-dashboard-actions-grid">

    {
      quickActions.map(
        (
          item,
          index
        ) => (

          <div
            key={index}
            className={`vendor-dashboard-action-card ${item.className}`}
            onClick={() =>
              navigate(
                item.path
              )
            }
          >

            <div className="vendor-dashboard-action-icon">

              {item.icon}

            </div>

            <p>

              {item.title}

            </p>

          </div>

        )
      )
    }

  </div>

</div>

</div>

</div>

























{
  showCalendar && (

    <div
      className="vendor-calendar-overlay"
      onClick={() =>
        setShowCalendar(false)
      }
    >

      <div
        className="vendor-calendar-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        <div className="vendor-calendar-header">

          <h2>
            Appointments Calendar
          </h2>

          <button
            className="vendor-calendar-close"
            onClick={() =>
              setShowCalendar(false)
            }
          >
            ✕
          </button>

        </div>

      <Calendar
  tileContent={({
    date,
    view
  }) => {

    if(
      view === "month" &&
      appointmentDates.includes(
        date.toDateString()
      )
    ){
      return(
        <div className="calendar-dot"></div>
      );
    }

    return null;

  }}
/>

      </div>

    </div>

  )
}


    </div>
    </div>
    

  );

};

export default VendorDashboard;