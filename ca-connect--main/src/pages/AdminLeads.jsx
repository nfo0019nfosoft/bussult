import API_URL from "../config";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminLeads.css";
import { useNavigate } from "react-router-dom";

import {
    FaUsers,
    FaUserPlus,
    FaUserCheck,
    FaCheckCircle,
    FaTimesCircle,
    FaChartLine,
    FaCalendarAlt,
    FaBell,
    FaPlus,
    FaSearch,
    FaFilter,
    FaEye,
    FaEdit,
    FaTrash,
    FaEllipsisV
} from "react-icons/fa";

function AdminLeads() {
 const navigate = useNavigate();
  useEffect(() => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {

      navigate("/admin");

    }

  }, [navigate]);
    const [dashboard, setDashboard] = useState({
        notificationCount: 0,
        adminPhoto: "/avatar.png",
        adminName: "Super Admin",
        adminRole: "Admin"
    });

    const [stats, setStats] = useState({
        totalLeads: 0,
        totalLeadsGrowth: 0,
        newLeads: 0,
        newLeadsGrowth: 0,
        assignedLeads: 0,
        assignedGrowth: 0,
        convertedLeads: 0,
        convertedGrowth: 0,
        lostLeads: 0,
        lostGrowth: 0,
        conversionRate: 0,
        rateGrowth: 0
    });

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [source, setSource] = useState("");
    const [assignedTo, setAssignedTo] = useState("");
    const [region, setRegion] = useState("");
    const [date, setDate] = useState("");

    const [leads, setLeads] = useState([]);

    const [startDate, setStartDate] = useState("2024-05-16");
    const [endDate, setEndDate] = useState("2024-05-22");

    useEffect(() => {

        fetchDashboard();

    }, [startDate, endDate]);


    useEffect(() => {

        fetchLeads();

    }, []);




    const handleDeleteLead = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this lead?"
  );

  if (!confirmDelete) return;

  try {

    await axios.delete(
      `${API_URL}/api/admin/leads/${id}`
    );

    setLeads(
      leads.filter(
        (lead) => lead._id !== id
      )
    );

  }

  catch (err) {

    console.log(err);

  }

};


    const fetchDashboard = async () => {

        try {

            const res = await axios.get(
                `${API_URL}/api/admin/lead-stats`,
                {
                    params: {
                        startDate,
                        endDate
                    }
                }
            );

            if (res.data.success) {

                setDashboard({
                    notificationCount: res.data.notificationCount || 0,
                    adminPhoto: res.data.adminPhoto || "/avatar.png",
                    adminName: res.data.adminName || "Super Admin",
                    adminRole: "Admin"
                });

                setStats({
                    totalLeads: res.data.totalLeads || 0,
                    totalLeadsGrowth: res.data.totalLeadsGrowth || 0,

                    newLeads: res.data.newLeads || 0,
                    newLeadsGrowth: res.data.newLeadsGrowth || 0,

                    assignedLeads: res.data.contactedLeads || 0,
                    assignedGrowth: 0,

                    convertedLeads: res.data.convertedLeads || 0,
                    convertedGrowth: 0,

                    lostLeads: res.data.lostLeads || 0,
                    lostGrowth: 0,

                    conversionRate: res.data.conversionRate || 0,
                    rateGrowth: 0
                });

            }

        }

        catch (err) {

            console.log(err);

        }

    };


    const fetchLeads = async () => {

        try {

            const res = await axios.get(
                `${API_URL}/api/admin/leads`
            );

            if (res.data.success) {

                setLeads(res.data.enquiries);

            }

        }

        catch (err) {

            console.log(err);

        }

    };


    const applyFilters = () => {

        console.log({
            search,
            status,
            source,
            assignedTo,
            region,
            date
        });

    };


    const resetFilters = () => {

        setSearch("");
        setStatus("");
        setSource("");
        setAssignedTo("");
        setRegion("");
        setDate("");

    };


    const handleLogout = () => {

        localStorage.removeItem("token");

        window.location.href = "/admin-login";

    };
    return (

        <div className="admin-layout">

            <AdminSidebar />

            <div className="admin-main-content">

                <div className="admin-leads-page">


                    {/* HEADER */}

                    <div className="admin-leads-header">

                        <div className="admin-leads-heading">

                            <h1>
                                Lead Management
                            </h1>

                            <p>
                                Capture, track and convert leads across the platform.
                            </p>

                        </div>


                        <div className="admin-leads-actions">


                            <div className="admin-leads-date-picker">

                                <FaCalendarAlt />

                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) =>
                                        setStartDate(e.target.value)
                                    }
                                />

                                <span>
                                    -
                                </span>

                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) =>
                                        setEndDate(e.target.value)
                                    }
                                />

                            </div>


                            <button className="admin-leads-add-btn">

                                <FaPlus />

                                Add Lead

                            </button>


                            <div className="admin-leads-notification">

                                <FaBell />

                                <span>

                                    {dashboard.notificationCount || 0}

                                </span>

                            </div>


                            <div
                                className="admin-leads-profile"
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

                                        {dashboard.adminName ||
                                            "Super Admin"}

                                    </h4>

                                    <p>

                                        {dashboard.adminRole ||
                                            "Admin"}

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* CARDS */}

                    <div className="admin-leads-overview-cards">


                        <div className="admin-leads-overview-card">

                            <div className="admin-leads-card-icon leads-purple">
                                <FaUsers />
                            </div>

                            <div>

                                <h6>Total Leads</h6>

                                <h2>
                                    {stats.totalLeads}
                                </h2>

                                <p className="up-growth">
                                    ↑ {stats.totalLeadsGrowth}% vs last week
                                </p>

                            </div>

                        </div>


                        <div className="admin-leads-overview-card">

                            <div className="admin-leads-card-icon leads-green">
                                <FaUserPlus />
                            </div>

                            <div>

                                <h6>New Leads</h6>

                                <h2>
                                    {stats.newLeads}
                                </h2>

                                <p className="up-growth">
                                    ↑ {stats.newLeadsGrowth}% vs last week
                                </p>

                            </div>

                        </div>


                        <div className="admin-leads-overview-card">

                            <div className="admin-leads-card-icon leads-orange">
                                <FaUserCheck />
                            </div>

                            <div>

                                <h6>Assigned Leads</h6>

                                <h2>
                                    {stats.assignedLeads}
                                </h2>

                                <p className="up-growth">
                                    ↑ {stats.assignedGrowth}% vs last week
                                </p>

                            </div>

                        </div>


                        <div className="admin-leads-overview-card">

                            <div className="admin-leads-card-icon leads-teal">
                                <FaCheckCircle />
                            </div>

                            <div>

                                <h6>Converted Leads</h6>

                                <h2>
                                    {stats.convertedLeads}
                                </h2>

                                <p className="up-growth">
                                    ↑ {stats.convertedGrowth}% vs last week
                                </p>

                            </div>

                        </div>


                        <div className="admin-leads-overview-card">

                            <div className="admin-leads-card-icon leads-red">
                                <FaTimesCircle />
                            </div>

                            <div>

                                <h6>Lost Leads</h6>

                                <h2>
                                    {stats.lostLeads}
                                </h2>

                                <p className="down-growth">
                                    ↓ {stats.lostGrowth}% vs last week
                                </p>

                            </div>

                        </div>


                        <div className="admin-leads-overview-card">

                            <div className="admin-leads-card-icon leads-blue">
                                <FaChartLine />
                            </div>

                            <div>

                                <h6>Conversion Rate</h6>

                                <h2>
                                    {stats.conversionRate}%
                                </h2>

                                <p className="up-growth">
                                    ↑ {stats.rateGrowth}% vs last week
                                </p>

                            </div>

                        </div>

                    </div>

                </div>




                <div className="adminleads-filters-card">

                    {/* Search */}
                    <div className="adminleads-filter-search">
                        <FaSearch className="adminleads-filter-icon" />
                        <input
                            type="text"
                            placeholder="Search by name, email, phone or company..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Lead Status */}
                    <div className="adminleads-filter-group">
                        <label>Lead Status</label>

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">All Status</option>
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Qualified">Qualified</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>

                    {/* Source */}
                    <div className="adminleads-filter-group">
                        <label>Source</label>

                        <select
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                        >
                            <option value="">All Sources</option>
                            <option value="Website">Website</option>
                            <option value="WhatsApp">WhatsApp</option>
                            <option value="Instagram">Instagram</option>
                            <option value="Referral">Referral</option>
                        </select>
                    </div>

                    {/* Assigned To */}
                    <div className="adminleads-filter-group">
                        <label>Assigned To</label>

                        <select
                            value={assignedTo}
                            onChange={(e) => setAssignedTo(e.target.value)}
                        >
                            <option value="">All Users</option>
                            <option value="Admin">Admin</option>
                            <option value="Sales Team">Sales Team</option>
                            <option value="Support Team">Support Team</option>
                        </select>
                    </div>

                    {/* Region */}
                    <div className="adminleads-filter-group">
                        <label>Region</label>

                        <select
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                        >
                            <option value="">All Regions</option>
                            <option value="North">North</option>
                            <option value="South">South</option>
                            <option value="East">East</option>
                            <option value="West">West</option>
                        </select>
                    </div>

                    {/* Date */}
                    <div className="adminleads-filter-group">
                        <label>Created Date</label>

                        <div className="adminleads-date-input">
                            <FaCalendarAlt className="adminleads-filter-icon" />

                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="adminleads-filter-buttons">

                        <button
                            className="adminleads-apply-btn"
                            onClick={applyFilters}
                        >
                            Apply Filter
                        </button>

                        <button
                            className="adminleads-reset-btn"
                            onClick={resetFilters}
                        >
                            Reset
                        </button>


                    </div>

                </div>


















                <div className="adminleads-table-card">

                    <div className="adminleads-table-top">

                        <h3>All Leads</h3>

                        <button className="adminleads-export-btn">
                            Export
                        </button>

                    </div>

                    <div className="adminleads-table-wrapper">

                        <table className="adminleads-table">

                            <thead>

                                <tr>

                                    <th>Lead Name</th>
                                    <th>Contact</th>
                                    <th>Company</th>
                                    <th>Source</th>
                                    <th>Status</th>
                                    <th>Assigned To</th>
                                    <th>Region</th>
                                    <th>Created On</th>
                                    <th>Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {leads.length > 0 ? (

                                    leads.map((lead) => (

                                        <tr key={lead._id}>

                                            {/* Lead Name */}
                                            <td className="adminleads-name-col">

                                                <h5>
                                                    {lead.userId?.fullName || lead.fullName}
                                                </h5>

                                            </td>

                                            {/* Contact */}
                                            <td className="adminleads-contact-col">

                                                <p>
                                                    {lead.userId?.email || lead.email}
                                                </p>

                                                <span>
                                                    +91 {lead.userId?.mobile || lead.mobile}
                                                </span>

                                            </td>

                                            {/* Company */}
                                            <td>

                                                {lead.userId?.businessName ||
                                                    lead.companyName ||
                                                    "-"}

                                            </td>

                                            {/* Source */}
                                            <td>

                                                {lead.source || "Website"}

                                            </td>

                                            {/* Status */}
                                            <td>

                                                <span
                                                    className={`adminleads-status-badge ${lead.status?.toLowerCase()}`}
                                                >

                                                    {lead.status}

                                                </span>

                                            </td>

                                            {/* Assigned To */}
                                            <td>

                                                {lead.vendorId?.fullName || "-"}

                                            </td>

                                            {/* Region */}
                                            <td>

                                                {lead.userId?.country ||
                                                    lead.region ||
                                                    "-"}

                                            </td>

                                            {/* Created Date */}
                                            <td>

                                                <div className="adminleads-date-col">

                                                    <p>

                                                        {new Date(
                                                            lead.createdAt
                                                        ).toLocaleDateString()}

                                                    </p>

                                                    <span>

                                                        {new Date(
                                                            lead.createdAt
                                                        ).toLocaleTimeString([], {
                                                            hour: "2-digit",
                                                            minute: "2-digit"
                                                        })}

                                                    </span>

                                                </div>

                                            </td>

                                            {/* Actions */}
                                            {/* Actions */}
                                            <td>

                                                <div className="adminleads-action-icons">

                                                    <FaEye
                                                        className="adminleads-view-icon"
                                                    />

                                                    <FaEdit
                                                        className="adminleads-edit-icon"
                                                    />

                                                    <FaTrash
                                                        className="adminleads-delete-icon"
                                                        onClick={() => handleDeleteLead(lead._id)}
                                                    />

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="9"
                                            style={{
                                                textAlign: "center",
                                                padding: "40px",
                                                color: "#94a3b8"
                                            }}
                                        >

                                            No Leads Found

                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>
                    </div>

                </div>







            </div>

        </div>

    );

}

export default AdminLeads;