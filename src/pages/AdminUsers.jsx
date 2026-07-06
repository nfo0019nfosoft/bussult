import API_URL from "../config";
import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminUsers.css";
import AdminSidebar from "../components/AdminSidebar";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";

import {
  FaUsers,
  FaUserCheck,
  FaUserPlus,
  FaShieldAlt,
  FaCheckCircle,
  FaGlobe,
  FaCalendarAlt,
  FaPlus,
  FaBell,
   FaEye,
  FaTrash,
  FaBan,
 
} from "react-icons/fa";

function AdminUsers() {
   const navigate = useNavigate();
  useEffect(() => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {

      navigate("/admin");

    }

  }, [navigate]);
    const exportExcel = () => {

  const excelData = users.map((user) => ({

    Name: user.name,

    Email: user.email,

    Phone: user.phone,

    Company: user.companyName,

    Region: user.state,

    Status: user.accountStatus,

    Registered: new Date(
      user.createdAt
    ).toLocaleDateString()

  }));


  const worksheet =
    XLSX.utils.json_to_sheet(
      excelData
    );

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Users"
  );

  const excelBuffer =
    XLSX.write(
      workbook,
      {
        bookType: "xlsx",
        type: "array"
      }
    );

  const fileData = new Blob(
    [excelBuffer],
    {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    }
  );

  saveAs(
    fileData,
    "Users.xlsx"
  );

};

  const [dashboard, setDashboard] = useState({});
 

  const [dateRange, setDateRange] = useState("");

  const [search, setSearch] = useState("");
  const [userType, setUserType] = useState("");
  const [status, setStatus] = useState("");
  const [region, setRegion] = useState("");
  const [date, setDate] = useState("");

const [users, setUsers] = useState([]);

useEffect(() => {

  fetchUsers();

}, []);

  // =========================
  // DASHBOARD
  // =========================

  const fetchDashboard = async () => {

    try {

      const res = await axios.get(
        `${API_URL}/api/admin/user-stats`
      );

      if (res.data.success) {

        setDashboard(res.data);

      }

    }

    catch (err) {

      console.log(err);

    }

  };


  // =========================
  // USERS
  // =========================
const fetchUsers = async () => {

  try {

    const res = await axios.get(
      `${API_URL}/api/admin/users`,
      {
        params: {
          search,
          userType,
          status,
          region,
          date
        }
      }
    );

    if (res.data.success) {

      setUsers(res.data.users);

    }

  }

  catch (err) {

    console.log(err);

    setUsers([]);

  }

};
  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.href = "/admin-login";

  };


  // =========================
  // RESET FILTERS
  // =========================

  const resetFilters = () => {

    setSearch("");

    setUserType("");

    setStatus("");

    setRegion("");

    setDate("");

    fetchUsers();

  };



  const deleteUser = async (id) => {

  if (!window.confirm("Delete this user ?")) return;

  try {

    await axios.delete(
      `${API_URL}/api/admin/users/${id}`
    );

    fetchUsers();

  }

  catch (err) {

    console.log(err);

  }

};


const toggleStatus = async (id) => {

  try {

    await axios.put(
      `${API_URL}/api/admin/users/block/${id}`
    );

    fetchUsers();

  }

  catch (err) {

    console.log(err);

  }

};

 return (

<div className="adminusers-layout">

  <AdminSidebar />

  <div className="adminusers-main">

    {/* HEADER */}

    <div className="adminusers-header">

      <div className="adminusers-heading">

        <h1>User Management</h1>

        <p>
          Manage and monitor all platform users.
        </p>

      </div>


      <div className="adminusers-actions">

        <div className="date-picker">

          <FaCalendarAlt />

          <input
            type="date"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          />

        </div>


        <button className="add-user-btn">

          <FaPlus />

          Add User

        </button>


        <div className="notification-box">

          <FaBell />

          <span>

            {dashboard.notificationCount || 0}

          </span>

        </div>


        <div
          className="admin-profile"
          onClick={handleLogout}
        >

          <img
  src={
    dashboard.adminPhoto ||
    "/avatar.png"
  }
  alt=""
/>

          <div>

            <h4>

              {dashboard.adminName || "Super Admin"}

            </h4>

            <p>

              Admin

            </p>

          </div>

        </div>

      </div>

    </div>


    {/* CARDS */}

   {/* ================= CARDS ================= */}

<div className="users-overview-cards">

  <div className="users-overview-card">

    <div className="users-card-icon users-blue">
      <FaUsers />
    </div>

    <div className="users-card-content">

      <h6>Total Users</h6>

      <h2>
        {dashboard.totalUsers || 0}
      </h2>

      <p className="up-growth">
        ↑ {dashboard.totalUsersGrowth || 0}% vs last week
      </p>

    </div>

  </div>


  <div className="users-overview-card">

    <div className="users-card-icon users-green">
      <FaUserCheck />
    </div>

    <div className="users-card-content">

      <h6>Active Users</h6>

      <h2>
        {dashboard.activeUsers || 0}
      </h2>

      <p className="up-growth">
        ↑ {dashboard.activeUsersGrowth || 0}% vs last week
      </p>

    </div>

  </div>


  <div className="users-overview-card">

    <div className="users-card-icon users-orange">
      <FaUserPlus />
    </div>

    <div className="users-card-content">

      <h6>New Users</h6>

      <h2>
        {dashboard.newUsers || 0}
      </h2>

      <p className="up-growth">
        ↑ {dashboard.newUsersGrowth || 0}% vs last week
      </p>

    </div>

  </div>


  <div className="users-overview-card">

    <div className="users-card-icon users-red">
      <FaShieldAlt />
    </div>

    <div className="users-card-content">

      <h6>Blocked Users</h6>

      <h2>
        {dashboard.blockedUsers || 0}
      </h2>

      <p className="down-growth">
        ↓ {dashboard.blockedUsersGrowth || 0}% vs last week
      </p>

    </div>

  </div>


  <div className="users-overview-card">

    <div className="users-card-icon users-teal">
      <FaCheckCircle />
    </div>

    <div className="users-card-content">

      <h6>Email Verified Users</h6>

      <h2>
        {dashboard.emailVerifiedUsers || 0}
      </h2>

      <p className="up-growth">
        ↑ {dashboard.emailVerifiedGrowth || 0}% vs last week
      </p>

    </div>

  </div>


  <div className="users-overview-card">

    <div className="users-card-icon users-sky">
      <FaGlobe />
    </div>

    <div className="users-card-content">

      <h6>Users by Region</h6>

      <h2>
        {dashboard.region || "All Regions"}
      </h2>

      <span className="region-link">
        View Details →
      </span>

    </div>

  </div>

</div>


{/* ================= FILTERS ================= */}

<div className="users-filter-section">

  <div className="users-search-box">

    <input
      type="text"
      placeholder="Search by name, email, or phone..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

  </div>


  <div className="users-filter-box">

    <label>User Type</label>

    <select
      value={userType}
      onChange={(e) => setUserType(e.target.value)}
    >

      <option value="">
        All User Types
      </option>

      <option value="Individual">
        Individual
      </option>

      <option value="Business">
        Business
      </option>

    </select>

  </div>


  <div className="users-filter-box">

    <label>Status</label>

    <select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >

      <option value="">
        All Status
      </option>

      <option value="Active">
        Active
      </option>

      <option value="Blocked">
        Blocked
      </option>

    </select>

  </div>


  <div className="users-filter-box">

    <label>Region</label>

    <select
      value={region}
      onChange={(e) => setRegion(e.target.value)}
    >

      <option value="">
        All Regions
      </option>

      <option value="North">
        North
      </option>

      <option value="South">
        South
      </option>

      <option value="East">
        East
      </option>

      <option value="West">
        West
      </option>

    </select>

  </div>


  <div className="users-filter-box">

    <label>Registered Date</label>

    <input
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
    />

  </div>


  <button
    className="apply-filter-btn"
    onClick={fetchUsers}
  >

    Apply Filter

  </button>


  <button
    className="reset-filter-btn"
    onClick={resetFilters}
  >

    Reset

  </button>

</div>

  </div>






<div className="allusers-card">

  <div className="allusers-header">

    <h3>All Users</h3>

    <button
      className="export-btn"
      onClick={exportExcel}
    >
      Export
    </button>

  </div>

  <div className="allusers-table-wrapper">

    <table className="allusers-table">

      <thead>

        <tr>

          <th>User Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Company</th>
          <th>Region</th>
          <th>Status</th>
          <th>Registered On</th>
          <th>Last Login</th>

        </tr>

      </thead>

      <tbody>

        {

          users.map((user) => (

            <tr key={user._id}>

              <td className="user-info">

                <img
                  src={
                    user.profileImage ||
                    "/avatar.png"
                  }
                  alt=""
                />

                <div>

                  <h5>{user.name}</h5>

                  <p>{user.designation || "User"}</p>

                </div>

              </td>

              <td>{user.email}</td>

              <td>{user.phone}</td>

              <td>{user.companyName || "-"}</td>

              <td>{user.state || "-"}</td>

              <td>

                <span
                  className={
                    user.accountStatus === "active"
                      ? "active-badge"
                      : "blocked-badge"
                  }
                >
                  {user.accountStatus}
                </span>

              </td>

              <td>

                {
                  new Date(
                    user.createdAt
                  ).toLocaleDateString()
                }

              </td>

              <td>

                {
                  user.lastLogin
                    ? new Date(
                        user.lastLogin
                      ).toLocaleString()
                    : "-"
                }

              </td>
              <td>

  <div className="user-actions">

    <button
      className="view-user-btn"
    >
      <FaEye />
    </button>

    

    <button
      className="delete-user-btn"
      onClick={() =>
        deleteUser(user._id)
      }
    >
        <FaTrash />
    </button>

  </div>

</td>

            </tr>

          ))

        }

      </tbody>

    </table>

  </div>

</div>



















</div>

);

}

export default AdminUsers;