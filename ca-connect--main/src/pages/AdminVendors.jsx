import API_URL from "../config";
import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminVendors.css";
import AdminSidebar from "../components/AdminSidebar";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";

import {
    FaUsers,
    FaStore,
    FaClock,
    FaShieldAlt,
    FaCalendarAlt,
    FaPlus,
    FaBell,
    FaCheckCircle,
    FaAward,
    FaEye,
    FaEllipsisV,
    FaTrash
} from "react-icons/fa";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Legend
);

function AdminVendors() {
     const navigate = useNavigate();
  useEffect(() => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {

      navigate("/admin");

    }

  }, [navigate]);

    const [dashboard, setDashboard] = useState({});
    const [vendors, setVendors] = useState([]);

    const [dateRange, setDateRange] = useState("");

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [vendorType, setVendorType] = useState("");
    const [plan, setPlan] = useState("");
    const [userType, setUserType] = useState("");
    const [region, setRegion] = useState("");
    const [date, setDate] = useState("");



    const exportExcel = () => {

        const data = vendors.map((vendor) => ({

            VendorName: vendor.firmName || vendor.fullName,

            Email: vendor.email,

            Phone: vendor.mobile,

            Type: vendor.businessType,

            Plan: vendor.plan || "Basic",

            Status: vendor.available ? "Active" : "Blocked",

            RegisteredOn: new Date(
                vendor.createdAt
            ).toLocaleDateString()

        }));


        const worksheet =
            XLSX.utils.json_to_sheet(data);

        const workbook =
            XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Vendors"
        );

        const excelBuffer =
            XLSX.write(workbook, {
                bookType: "xlsx",
                type: "array"
            });

        const fileData = new Blob(
            [excelBuffer],
            {
                type:
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            }
        );

        saveAs(
            fileData,
            "vendors.xlsx"
        );

    };

    const lineOptions = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {

                position: "top"

            }

        },

        scales: {

            y: {

                beginAtZero: true

            }

        },

        elements: {

            line: {

                borderWidth: 3

            },

            point: {

                radius: 4

            }

        }

    };


    const lineData = {

        labels: dashboard.chartLabels || [],

        datasets: [

            {

                label: "Total Vendors",

                data: dashboard.totalVendorChart || [],

                borderColor: "#2563eb",

                backgroundColor: "#2563eb",

                tension: 0.4

            },

            {

                label: "Active Vendors",

                data: dashboard.activeVendorChart || [],

                borderColor: "#10b981",

                backgroundColor: "#10b981",

                tension: 0.4

            },

            {

                label: "Pending Approval",

                data: dashboard.pendingVendorChart || [],

                borderColor: "#f59e0b",

                backgroundColor: "#f59e0b",

                tension: 0.4

            },

            {

                label: "Blocked Vendors",

                data: dashboard.blockedVendorChart || [],

                borderColor: "#ef4444",

                backgroundColor: "#ef4444",

                tension: 0.4

            }

        ]

    };


    const doughnutOptions = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {

                display: false

            }

        },

        cutout: "70%"

    };


    const doughnutData = {

        labels: [

            "Active Vendors",

            "Pending Approval",

            "Blocked Vendors"

        ],

        datasets: [

            {

                data: [

                    dashboard.activeVendors || 0,

                    dashboard.pendingApproval || 0,

                    dashboard.blockedVendors || 0

                ],

                backgroundColor: [

                    "#10b981",

                    "#f59e0b",

                    "#ef4444"

                ],

                borderWidth: 0

            }

        ]

    };


    useEffect(() => {

        fetchDashboard();

        fetchVendors();

    }, [dateRange]);


    // ======================
    // DASHBOARD STATS
    // ======================

    const fetchDashboard = async () => {

        try {

            const res = await axios.get(
                `${API_URL}/api/admin/vendor-stats`,
                {
                    params: {
                        dateRange
                    }
                }
            );

            if (res.data.success) {

                setDashboard(res.data);

            }

        }

        catch (err) {

            console.log(err);

        }

    };


    // ======================
    // FETCH VENDORS
    // ======================

    const fetchVendors = async () => {

        try {

            const res = await axios.get(
                `${API_URL}/api/vendor`,
                {
                    params: {
                        search,
                        status,
                        vendorType,
                        plan,
                        userType,
                        region,
                        date
                    }
                }
            );

            console.log("Vendor API Response :", res.data);

            if (res.data.success) {

                setVendors(res.data.vendors);

            } else {

                setVendors([]);

            }

        }

        catch (err) {

            console.log(err);

            setVendors([]);

        }

    };

    // ======================
    // RESET FILTERS
    // ======================

    const resetFilters = () => {

        setSearch("");
        setStatus("");
        setVendorType("");
        setPlan("");
        setUserType("");
        setRegion("");
        setDate("");

        fetchVendors();

    };


    // ======================
    // CARDS
    // ======================

    const cards = [

        {
            title: "Total Vendors",
            value: dashboard.totalVendors || 0,
            icon: <FaUsers />,
            color: "#8b5cf6"
        },

        {
            title: "Active Vendors",
            value: dashboard.activeVendors || 0,
            icon: <FaStore />,
            color: "#10b981"
        },

        {
            title: "Pending Approval",
            value: dashboard.pendingApproval || 0,
            icon: <FaClock />,
            color: "#f59e0b"
        },

        {
            title: "Blocked Vendors",
            value: dashboard.blockedVendors || 0,
            icon: <FaShieldAlt />,
            color: "#ef4444"
        },

        {
            title: "Verified Vendors",
            value: dashboard.verifiedVendors || 0,
            icon: <FaCheckCircle />,
            color: "#3b82f6"
        },

        {
            title: "Experienced Vendors",
            value: dashboard.experiencedVendors || 0,
            icon: <FaAward />,
            color: "#2563eb"
        }

    ];








    const deleteVendor = async (id) => {

  if (
    !window.confirm(
      "Delete this vendor?"
    )
  )
    return;

  try {

    await axios.delete(

      `${API_URL}/api/admin/vendors/${id}`

    );

    fetchVendors();

  }

  catch (err) {

    console.log(err);

  }

};





    return (

        <div className="adminvendors-layout">

            <AdminSidebar />

            <div className="adminvendors-main">

                {/* TOP BAR */}

                <div className="adminvendors-topbar">

                    <div className="adminvendors-heading">

                        <h1>Vendor Management</h1>

                        <p>
                            Manage and monitor all vendors across the platform
                        </p>

                    </div>

                    <div className="adminvendors-right">

                        <div className="date-box">

                            <FaCalendarAlt />

                            <input
                                type="date"
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                            />

                        </div>

                        <button className="add-btn">

                            <FaPlus />

                            Add Vendor

                        </button>

                        <div className="notification">

                            <FaBell />

                            <span>
                                {dashboard.notificationCount || 0}
                            </span>

                        </div>

                        <div className="profile">

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

                <div className="adminvendors-grid">

                    {

                        cards.map((item, index) => (

                            <div
                                className="vendor-card"
                                key={index}
                            >

                                <div
                                    className="icon-box"
                                    style={{
                                        background: item.color + "20",
                                        color: item.color
                                    }}
                                >

                                    {item.icon}

                                </div>

                                <div className="card-content">

                                    <h5>
                                        {item.title}
                                    </h5>

                                    <h2>
                                        {item.value}
                                    </h2>

                                </div>

                            </div>

                        ))

                    }

                </div>


                {/* FILTERS */}

                <div className="vendor-filters">

                    <div className="filter-search">

                        <input
                            type="text"
                            placeholder="Search by vendor name, email, or phone..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>


                    <div className="filter-box">

                        <label>Status</label>

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">All Status</option>
                            <option>Active</option>
                            <option>Pending</option>
                            <option>Blocked</option>
                        </select>

                    </div>


                    <div className="filter-box">

                        <label>Vendor Type</label>

                        <select
                            value={vendorType}
                            onChange={(e) => setVendorType(e.target.value)}
                        >
                            <option value="">All Types</option>
                            <option>CA</option>
                            <option>CS</option>
                            <option>Lawyer</option>
                        </select>

                    </div>


                    <div className="filter-box">

                        <label>Subscription Plan</label>

                        <select
                            value={plan}
                            onChange={(e) => setPlan(e.target.value)}
                        >
                            <option value="">All Plans</option>
                            <option>Basic</option>
                            <option>Premium</option>
                            <option>Enterprise</option>
                        </select>

                    </div>


                    <div className="filter-box">

                        <label>User Type</label>

                        <select
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                        >
                            <option value="">All User Types</option>
                            <option>Individual</option>
                            <option>Business</option>
                        </select>

                    </div>


                    <div className="filter-box">

                        <label>Region</label>

                        <select
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                        >
                            <option value="">All Regions</option>
                            <option>North</option>
                            <option>South</option>
                            <option>East</option>
                            <option>West</option>
                        </select>

                    </div>


                    <div className="filter-box">

                        <label>Registered Date</label>

                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />

                    </div>


                    <button
                        className="apply-btn"
                        onClick={fetchVendors}
                    >

                        Apply Filter

                    </button>


                    <button
                        className="reset-btn"
                        onClick={resetFilters}
                    >

                        Reset

                    </button>

                </div>










                {/* ================= CHARTS ================= */}

                <div className="vendor-charts">

                    {/* LEFT */}
                    <div className="overview-chart">

                        <div className="chart-header">

                            <h3>Vendor Overview</h3>

                            <select>
                                <option>This Week</option>
                                <option>This Month</option>
                            </select>

                        </div>

                        <div className="line-chart-wrapper">

                            <Line
                                data={lineData}
                                options={lineOptions}
                            />

                        </div>

                    </div>


                    {/* RIGHT */}

                    <div className="status-chart">

                        <h3>Vendors by Status</h3>

                        <div className="status-chart-content">

                            <div className="donut-chart">

                                <Doughnut
                                    data={doughnutData}
                                    options={doughnutOptions}
                                />

                            </div>


                            <div className="status-list">

                                <div className="status-item">
                                    <span className="green-dot"></span>
                                    <p>Active Vendors</p>
                                    <strong>{dashboard.activeVendors || 0}</strong>
                                </div>

                                <div className="status-item">
                                    <span className="yellow-dot"></span>
                                    <p>Pending Approval</p>
                                    <strong>{dashboard.pendingApproval || 0}</strong>
                                </div>

                                <div className="status-item">
                                    <span className="red-dot"></span>
                                    <p>Blocked Vendors</p>
                                    <strong>{dashboard.blockedVendors || 0}</strong>
                                </div>


                            </div>

                        </div>

                    </div>

                </div>







                <div className="vendors-table-card">

                    <div className="vendors-table-header">

                        <h3>All Vendors</h3>

                        <button className="export-btn">
                            Export
                        </button>

                    </div>

                    <div className="vendors-table-wrapper">

                        <table className="vendors-table">

                            <thead>

                                <tr>

                                    <th>Vendor Name</th>

                                    <th>Email</th>

                                    <th>Phone</th>

                                    <th>Type</th>

                                    <th>Plan</th>

                                    <th>Status</th>

                                    <th>Registered On</th>

                                    <th>Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    vendors.length > 0 ?

                                        vendors.map((vendor) => (

                                            <tr key={vendor._id}>

                                                <td>
                                                    {vendor.firmName || vendor.fullName}
                                                </td>

                                                <td>
                                                    {vendor.email}
                                                </td>

                                                <td>
                                                    {vendor.mobile}
                                                </td>

                                                <td>
                                                    {vendor.businessType || "Tax Consultant"}
                                                </td>

                                                <td>
                                                    {vendor.plan || "Basic"}
                                                </td>

                                                <td>

                                                    <span
                                                        className={`status-badge ${vendor.available
                                                                ? "active"
                                                                : "blocked"
                                                            }`}
                                                    >

                                                        {
                                                            vendor.available
                                                                ? "Active"
                                                                : "Blocked"
                                                        }

                                                    </span>

                                                </td>

                                                <td>

                                                    {

                                                        new Date(
                                                            vendor.createdAt
                                                        ).toLocaleDateString(
                                                            "en-US",
                                                            {
                                                                month: "short",
                                                                day: "numeric",
                                                                year: "numeric"
                                                            }
                                                        )

                                                    }

                                                </td>

                                                <td>

                                                    <div className="vtable-actions">

                                                        <button className="vview-btn">

                                                            <FaEye />

                                                        </button>

                                                        <button
                                                            className="vdelete-btn"
                                                            onClick={() =>
                                                                deleteVendor(vendor._id)
                                                            }
                                                        >

                                                            <FaTrash />

                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        ))

                                        :

                                        <tr>

                                            <td
                                                colSpan="8"
                                                className="no-data"
                                            >

                                                No Vendors Found

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

export default AdminVendors;