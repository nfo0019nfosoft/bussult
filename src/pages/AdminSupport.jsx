import API_URL from "../config";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminSupport.css";
import {
    FaBell,
    FaCalendarAlt,
    FaChevronDown,
    FaClipboardList,
    FaFolderOpen,
    FaSpinner,
    FaCheckCircle,
    FaTimesCircle,
    FaSearch,
    FaPlus,
    FaEye,
    FaChevronUp


} from "react-icons/fa";


function AdminSupportHeader() {

    const [dashboard, setDashboard] =
        useState({
            notificationCount: 0,
            adminPhoto: "/avatar.png",
            adminName: "Super Admin",
            adminRole: "Admin"
        });

    const today =
        new Date()
            .toISOString()
            .split("T")[0];

    const [startDate, setStartDate] =
        useState(today);

    const [endDate, setEndDate] =
        useState(today);


    const [tickets, setTickets] =
        useState([]);



    const [selectedTicket, setSelectedTicket] =
        useState(null);


    const [reply, setReply] =
        useState("");

    const ticketDetailsRef = useRef(null);

    const fetchStats = async () => {
        try {

            const res = await axios.get(
                `${API_URL}/api/admin/support-stats`
            );

            if (res.data.success) {
                setStats(res.data.stats);
            }

        } catch (error) {
            console.log(error);
        }
    };



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






    const [stats, setStats] = useState({
        totalTickets: 0,
        openTickets: 0,
        inProgress: 0,
        resolved: 0,
        closed: 0
    });




    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [category, setCategory] = useState("");
    const [dateRange, setDateRange] = useState("");




    const filteredTickets =
        tickets.filter((ticket) => {

            const keyword =
                search.toLowerCase();

            return (

                ticket.ticketId
                    .toLowerCase()
                    .includes(keyword)

                ||

                ticket.name
                    .toLowerCase()
                    .includes(keyword)

                ||

                ticket.email
                    .toLowerCase()
                    .includes(keyword)

                ||

                ticket.subject
                    .toLowerCase()
                    .includes(keyword)

            );

        });





    const fetchTickets =
        async () => {

            try {

                const res =
                    await axios.get(
                        `${API_URL}/api/admin/tickets`
                    );

                if (res.data.success) {

                    setTickets(
                        res.data.tickets
                    );

                }

            }

            catch (err) {

                console.log(err);

            }

        };




    const sendReply = async () => {

        if (!reply.trim()) {
            return;
        }

        try {

            const res = await axios.post(

                `${API_URL}/api/admin/tickets/${selectedTicket._id}/reply`,

                {
                    message: reply
                }

            );

            if (res.data.success) {

                setSelectedTicket(
                    res.data.ticket
                );

                setTickets(

                    tickets.map((ticket) =>

                        ticket._id ===
                            res.data.ticket._id

                            ? res.data.ticket

                            : ticket

                    )

                );

                setReply("");

            }

        }

        catch (err) {

            console.log(err);

        }

    };




    const updateTicketStatus =
        async (id, status) => {

            try {

                const res =
                    await axios.put(
                        `${API_URL}/api/admin/tickets/${id}/status`,
                        { status }
                    );

                if (res.data.success) {

                    setSelectedTicket({
                        ...selectedTicket,
                        status
                    });

                    setTickets(
                        tickets.map((ticket) =>
                            ticket._id === id
                                ? {
                                    ...ticket,
                                    status
                                }
                                : ticket
                        )
                    );
       fetchStats();
                }

            }

            catch (err) {

                console.log(err);

            }

        };





    const openTicket = (ticket) => {

        setSelectedTicket(ticket);

        setTimeout(() => {

            ticketDetailsRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 100);

    };




    useEffect(() => {

        fetchStats();

        fetchTickets();

        fetchHeaderData();

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

        <div className="admin-support-layout">

            <AdminSidebar />

            <div className="admin-support-content">

                <div className="admin-support-header">

                    {/* Left */}
                    <div className="admin-support-title">

                        <h1>Support</h1>

                        <p>
                            Manage and respond to customer support requests.
                        </p>

                    </div>

                    {/* Right */}
                    <div className="admin-support-right">

                        <div className="admin-support-date">

                            <FaCalendarAlt />

                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) =>
                                    setStartDate(e.target.value)
                                }
                            />

                            <span>-</span>

                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) =>
                                    setEndDate(e.target.value)
                                }
                            />

                        </div>

                        <div className="admin-support-notification">

                            <FaBell />

                            <span>
                                {dashboard.notificationCount}
                            </span>

                        </div>

                        <div
                            className="admin-support-profile"
                            onClick={handleLogout}
                        >

                            <img
                                src={dashboard.adminPhoto}
                                alt="Admin"
                            />

                            <div>

                                <h4>
                                    {dashboard.adminName}
                                </h4>

                                <p>
                                    {dashboard.adminRole}
                                </p>

                            </div>

                            <FaChevronDown />

                        </div>

                    </div>

                </div>




                <div className="support-stats-grid">

                    <div className="support-card purple">

                        <div className="support-icon">
                            <FaClipboardList />
                        </div>

                        <div className="support-info">
                            <p>Total Tickets</p>
                            <h2>{stats.totalTickets}</h2>
                        </div>

                    </div>

                    <div className="support-card orange">

                        <div className="support-icon">
                            <FaFolderOpen />
                        </div>

                        <div className="support-info">
                            <p>Open Tickets</p>
                            <h2>{stats.openTickets}</h2>
                        </div>

                    </div>

                    <div className="support-card blue">

                        <div className="support-icon">
                            <FaSpinner />
                        </div>

                        <div className="support-info">
                            <p>In Progress</p>
                            <h2>{stats.inProgress}</h2>
                        </div>

                    </div>

                    <div className="support-card green">

                        <div className="support-icon">
                            <FaCheckCircle />
                        </div>

                        <div className="support-info">
                            <p>Resolved</p>
                            <h2>{stats.resolved}</h2>
                        </div>

                    </div>

                    <div className="support-card pink">

                        <div className="support-icon">
                            <FaTimesCircle />
                        </div>

                        <div className="support-info">
                            <p>Closed</p>
                            <h2>{stats.closed}</h2>
                        </div>

                    </div>

                </div>





                <div className="support-filter-bar">

                    {/* Search */}

                    <div className="support-search-box">

                        <FaSearch className="search-icon" />

                        <input
                            type="text"
                            placeholder="Search by ticket ID, name, email or subject..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>


                    {/* Status */}

                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                    >
                        <option value="">
                            All Status
                        </option>

                        <option value="Open">
                            Open
                        </option>

                        <option value="In Progress">
                            In Progress
                        </option>

                        <option value="Resolved">
                            Resolved
                        </option>

                        <option value="Closed">
                            Closed
                        </option>
                    </select>


                    {/* Priority */}

                    <select
                        value={priority}
                        onChange={(e) =>
                            setPriority(e.target.value)
                        }
                    >
                        <option value="">
                            All Priority
                        </option>

                        <option value="Low">
                            Low
                        </option>

                        <option value="Medium">
                            Medium
                        </option>

                        <option value="High">
                            High
                        </option>

                        <option value="Urgent">
                            Urgent
                        </option>
                    </select>


                    {/* Category */}

                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value)
                        }
                    >
                        <option value="">
                            All Category
                        </option>

                        <option value="Technical">
                            Technical
                        </option>

                        <option value="Payment">
                            Payment
                        </option>

                        <option value="Account">
                            Account
                        </option>

                        <option value="Other">
                            Other
                        </option>

                    </select>


                    {/* Date */}

                    <div className="support-date-filter">

                        <FaCalendarAlt />

                        <input
                            type="date"
                            value={dateRange}
                            onChange={(e) =>
                                setDateRange(e.target.value)
                            }
                        />

                    </div>


                    {/* Reset */}

                    <button
                        className="support-reset-btn"
                        onClick={() => {
                            setSearch("");
                            setStatus("");
                            setPriority("");
                            setCategory("");
                            setDateRange("");
                        }}
                    >
                        Reset
                    </button>


                    {/* New Ticket */}

                    <button
                        className="support-new-ticket-btn"
                    >

                        <FaPlus />

                        New Ticket

                    </button>

                </div>











                <div className="support-dashboard">

                    <div className="support-table-wrapper">

                        <table className="support-table">

                            <thead>

                                <tr>
                                    <th>Ticket ID</th>
                                    <th>Customer</th>
                                    <th>Email</th>
                                    <th>Subject</th>
                                    <th>Category</th>
                                    <th>Priority</th>
                                    <th>Status</th>
                                    <th>Last Updated</th>
                                    <th>Actions</th>
                                </tr>

                            </thead>

                            <tbody>

                                {
                                    tickets.length > 0 ? (

                                        filteredTickets.map((ticket) => (

                                            <tr key={ticket._id}>

                                                {/* Ticket ID */}
                                                <td>
                                                    #{ticket.ticketId}
                                                </td>

                                                {/* Customer Name */}
                                                <td>
                                                    {
                                                        ticket.raisedBy === "user"
                                                            ? ticket.userId?.name
                                                            : ticket.vendorId?.name || "Vendor"
                                                    }
                                                </td>

                                                {/* Email */}
                                                <td>
                                                    {
                                                        ticket.raisedBy === "user"
                                                            ? ticket.userId?.email
                                                            : ticket.vendorId?.email
                                                    }
                                                </td>

                                                {/* Subject */}
                                                <td>
                                                    {ticket.subject}
                                                </td>

                                                {/* Category */}
                                                <td>
                                                    {ticket.category}
                                                </td>

                                                {/* Priority */}
                                                <td>

                                                    <span
                                                        className={`priority-badge ${ticket.priority.toLowerCase()}`}
                                                    >
                                                        {ticket.priority}
                                                    </span>

                                                </td>

                                                {/* Status */}
                                                <td>

                                                    <span
                                                        className={`status-badge ${ticket.status
                                                            .replace(/\s+/g, "-")
                                                            .toLowerCase()
                                                            }`}
                                                    >
                                                        {ticket.status}
                                                    </span>

                                                </td>

                                                {/* Updated */}
                                                <td>
                                                    <div className="date-cell">
                                                        <span>
                                                            {new Date(ticket.updatedAt).toLocaleDateString()}
                                                        </span>

                                                        <small>
                                                            {new Date(ticket.updatedAt).toLocaleTimeString()}
                                                        </small>
                                                    </div>
                                                </td>

                                                {/* Actions */}
                                                <td>


                                                    <button
                                                        className="view-btn"
                                                        onClick={() =>
                                                            openTicket(ticket)
                                                        }
                                                    >
                                                        <FaEye />
                                                    </button>



                                                </td>

                                            </tr>

                                        ))

                                    ) : (

                                        <tr>

                                            <td
                                                colSpan="9"
                                                className="no-data"
                                            >
                                                No Tickets Found
                                            </td>

                                        </tr>

                                    )
                                }

                            </tbody>

                        </table>

                    </div>

                </div>








                {
                    selectedTicket && (

                        <div
                            ref={ticketDetailsRef}
                            className="ticket-details-panel"
                        >

                            {/* HEADER */}

                            <div className="ticket-details-header">

                                <h3>
                                    Ticket Details
                                </h3>

                                <button
                                    onClick={() =>
                                        setSelectedTicket(null)
                                    }
                                >
                                    Close
                                </button>

                            </div>


                            {/* TOP BADGES */}

                            <div className="ticket-top-badges">

                                <span className="ticket-id-badge">
                                    #{selectedTicket.ticketId}
                                </span>

                                <span
                                    className={`ticket-status-badge ${selectedTicket.status
                                        .toLowerCase()
                                        .replace(" ", "-")
                                        }`}
                                >
                                    {selectedTicket.status}
                                </span>

                            </div>


                            {/* USER INFO */}

                            <div className="ticket-user-info">

                                <div className="ticket-avatar">

                                    {
                                        selectedTicket.raisedBy === "user"
                                            ? selectedTicket.userId?.name
                                                ?.charAt(0)
                                                ?.toUpperCase()
                                            : selectedTicket.vendorId?.name
                                                ?.charAt(0)
                                                ?.toUpperCase() || "V"
                                    }

                                </div>

                                <div className="ticket-user-details">

                                    <h4>

                                        {
                                            selectedTicket.raisedBy === "user"
                                                ? selectedTicket.userId?.name
                                                : selectedTicket.vendorId?.name ||
                                                "Vendor"
                                        }

                                    </h4>

                                    <p>

                                        {
                                            selectedTicket.raisedBy === "user"
                                                ? selectedTicket.userId?.email
                                                : selectedTicket.vendorId?.email
                                        }

                                    </p>

                                    <span>

                                        {
                                            selectedTicket.raisedBy === "user"
                                                ? "User Ticket"
                                                : "Vendor Ticket"
                                        }

                                    </span>

                                </div>

                            </div>


                            {/* META DATA */}

                            <div className="ticket-meta">

                                <div className="ticket-meta-box">

                                    <span>
                                        Category
                                    </span>

                                    <p>
                                        {selectedTicket.category}
                                    </p>

                                </div>


                                <div className="ticket-meta-box">

                                    <span>
                                        Priority
                                    </span>

                                    <p
                                        className={
                                            `priority-${selectedTicket.priority.toLowerCase()}`
                                        }
                                    >
                                        {selectedTicket.priority}
                                    </p>

                                </div>


                                <div className="ticket-meta-box">

                                    <span>
                                        Status
                                    </span>

                                    <p>
                                        {selectedTicket.status}
                                    </p>

                                </div>


                                <div className="ticket-meta-box">

                                    <span>
                                        Created On
                                    </span>

                                    <p>

                                        {
                                            new Date(
                                                selectedTicket.createdAt
                                            ).toLocaleString()
                                        }

                                    </p>

                                </div>

                            </div>


                            {/* SUBJECT */}

                            <div className="ticket-section">

                                <h5>
                                    Subject
                                </h5>

                                <p>
                                    {selectedTicket.subject}
                                </p>

                            </div>


                            {/* DESCRIPTION */}

                            <div className="ticket-section">

                                <h5>
                                    Description
                                </h5>

                                <p>
                                    {selectedTicket.description}
                                </p>

                            </div>


                            {/* CONVERSATION */}

                            <div className="ticket-conversation">

                                <h5>
                                    Conversation
                                </h5>

                                {
                                    selectedTicket.messages &&
                                        selectedTicket.messages.length > 0 ? (

                                        selectedTicket.messages.map(
                                            (msg, index) => (

                                                <div
                                                    key={index}
                                                    className={
                                                        msg.sender === "admin"
                                                            ? "admin-message"
                                                            : "user-message"
                                                    }
                                                >

                                                    <div className="message-card">

                                                        <div className="message-top">

                                                            <span className="message-name">

                                                                {
                                                                    msg.sender === "admin"
                                                                        ? "Support Admin"
                                                                        : selectedTicket.raisedBy ===
                                                                            "user"
                                                                            ? selectedTicket.userId?.name
                                                                            : selectedTicket.vendorId?.name
                                                                }

                                                            </span>

                                                            <span className="message-time">

                                                                {
                                                                    new Date(
                                                                        msg.createdAt
                                                                    ).toLocaleString()
                                                                }

                                                            </span>

                                                        </div>

                                                        <div className="message-text">
                                                            {msg.message}
                                                        </div>

                                                    </div>

                                                </div>

                                            )
                                        )

                                    ) : (

                                        <div className="no-conversation">
                                            No conversation available
                                        </div>

                                    )
                                }

                            </div>


                            {/* REPLY BOX */}

                            <div className="ticket-reply-box">

                                <input
                                    type="text"
                                    value={reply}
                                    onChange={(e) =>
                                        setReply(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Type your reply..."
                                />

                                <button
                                    onClick={sendReply}
                                >
                                    Send Reply
                                </button>

                            </div>


                            {/* STATUS UPDATE */}

                            <div className="ticket-status-action">

                                <select
                                    value={selectedTicket.status}
                                    onChange={(e) =>
                                        updateTicketStatus(
                                            selectedTicket._id,
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="Open">
                                        Open
                                    </option>

                                    <option value="In Progress">
                                        In Progress
                                    </option>

                                    <option value="Resolved">
                                        Resolved
                                    </option>

                                    <option value="Closed">
                                        Closed
                                    </option>

                                </select>

                            </div>

                        </div>

                    )
                }







            </div>

        </div>

    );

}

export default AdminSupportHeader;