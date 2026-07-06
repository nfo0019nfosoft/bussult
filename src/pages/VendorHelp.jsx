import React, {
    useEffect,
    useState
} from "react";

import axios from "axios";

import API_URL from "../config";

import Sidebar from "../components/Sidebar";

import "./VendorHelp.css";

import {
    FaBookOpen,
    FaTicketAlt,
    FaComments,
    FaQuestionCircle,
    FaArrowRight,
    FaSearch,
    FaRegCommentDots,
    FaBell,
    FaCopy,
    FaGift,
    FaUsers,
    FaWallet,
    FaPlayCircle,
    FaClock,
    FaHeadset,

} from "react-icons/fa";

import {
    useNavigate
} from "react-router-dom";

const helpCards = [
    {
        id: 1,
        title: "Help Center",
        description:
            "Find guides and resources to help you get started.",
        button: "View Articles",
        icon: <FaBookOpen />,
        color: "#4F7CFF",
        link: "/vendor/help-center"
    },

    {
        id: 2,
        title: "Raise Ticket",
        description:
            "Facing an issue? Submit a ticket and we'll help resolve it.",
        button: "Submit Ticket",
        icon: <FaTicketAlt />,
        color: "#22C55E",
        // link: "/vendor/ticket"
    },

    {
        id: 3,
        title: "Chat Support",
        description:
            "Chat with our support team in real-time.",
        button: "Start Chat",
        icon: <FaComments />,
        color: "#A855F7",
        status: "Online",
        link: "/vendor/chat-support"
    },

    {
        id: 4,
        title: "FAQs",
        description:
            "Find quick answers to the most common questions.",
        button: "View FAQs",
        icon: <FaQuestionCircle />,
        color: "#F59E0B",
        link: "/vendor/faqs"
    }
];

const VendorHelp = () => {






    const navigate = useNavigate();

    const [vendor, setVendor] =
        useState(null);





    useEffect(() => {

        fetchVendor();

    }, []);




    const fetchVendor = async () => {

        console.log("fetchVendor called");

        try {

            const token =
                localStorage.getItem(
                    "vendorToken"
                );

            console.log(
                "Token:",
                token
            );

            const res =
                await axios.get(
                    `${API_URL}/api/vendor/profile`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            console.log(
                "API Response:",
                res.data
            );

            const vendorData =
                res.data.vendor ||
                res.data;

            console.log(
                "Vendor Data:",
                vendorData
            );

            console.log(
                "Referral Code:",
                vendorData?.referralCode
            );

            setVendor(
                vendorData
            );

        } catch (err) {

            console.log(
                "Fetch Error:",
                err.response?.data ||
                err.message
            );

        }

    };



    const handleLogout = () => {

        const confirmLogout =
            window.confirm(
                "Are you sure you want to logout?"
            );

        if (!confirmLogout) return;

        localStorage.removeItem(
            "vendorToken"
        );

        localStorage.removeItem(
            "vendorId"
        );

        localStorage.removeItem(
            "vendor"
        );

        navigate(
            "/login"
        );

    };




    const [showTicketPopup, setShowTicketPopup] = useState(false);

    const [ticketData, setTicketData] = useState({
        category: "",
        subject: "",
        priority: "Medium",
        description: "",
        attachment: null
    });




    
const handleSubmitTicket = async () => {

    try {

        const formData = new FormData();

        formData.append("category", ticketData.category);
        formData.append("subject", ticketData.subject);
        formData.append("priority", ticketData.priority);
        formData.append("description", ticketData.description);

        if (ticketData.attachment) {
            formData.append(
                "attachment",
                ticketData.attachment
            );
        }

        await axios.post(
            `${API_URL}/api/tickets`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("vendorToken")}`,
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        alert("Ticket submitted successfully");

        setTicketData({
            category: "",
            subject: "",
            priority: "Medium",
            description: "",
            attachment: null
        });

        setShowTicketPopup(false);

    } catch (err) {

        console.log(err);

        alert(
            err.response?.data?.message ||
            "Failed to submit ticket"
        );

    }

};





    const tutorials = [
        {
            _id: 1,
            title: "GST Return Filing & GST Basics",
            description:
                "Learn GST registration, return filing and compliance process.",
            duration: "12 min",
            videoUrl:
                "https://www.youtube.com/watch?v=C-N1Ckrgfrg",
            thumbnail:
                "https://img.youtube.com/vi/C-N1Ckrgfrg/maxresdefault.jpg"
        },

        {
            _id: 2,
            title: "Income Tax Filing & Tax Planning",
            description:
                "Understand income tax filing and tax planning concepts.",
            duration: "18 min",
            videoUrl:
                "https://www.youtube.com/watch?v=eyXKvOrDoqw",
            thumbnail:
                "https://img.youtube.com/vi/eyXKvOrDoqw/maxresdefault.jpg"
        },

        {
            _id: 3,
            title: "Financial Accounting Fundamentals",
            description:
                "Master accounting concepts used by CA professionals.",
            duration: "15 min",
            videoUrl:
                "https://www.youtube.com/watch?v=C-N1Ckrgfrg",
            thumbnail:
                "https://img.youtube.com/vi/C-N1Ckrgfrg/maxresdefault.jpg"
        },

        {
            _id: 4,
            title: "CA Course & Career Roadmap",
            description:
                "Career guidance for aspiring Chartered Accountants.",
            duration: "10 min",
            videoUrl:
                "https://www.youtube.com/watch?v=eyXKvOrDoqw",
            thumbnail:
                "https://img.youtube.com/vi/eyXKvOrDoqw/maxresdefault.jpg"
        }
    ];













    const referralLink =
        `https://bussult.com/ref/${vendor?.referralCode || ""
        }`;



    const copyReferralLink = async () => {

        try {

            await navigator.clipboard.writeText(
                referralLink
            );

            alert(
                "Referral link copied successfully"
            );

        } catch (err) {

            const textArea =
                document.createElement(
                    "textarea"
                );

            textArea.value =
                referralLink;

            document.body.appendChild(
                textArea
            );

            textArea.select();

            document.execCommand(
                "copy"
            );

            document.body.removeChild(
                textArea
            );

            alert(
                "Referral link copied successfully"
            );

        }

    };






    const [openFaq, setOpenFaq] =
        useState(null);

    const toggleFaq = (index) => {

        if (openFaq === index) {
            setOpenFaq(null);
        } else {
            setOpenFaq(index);
        }

    };

    const faqs = [
        {
            question:
                "How do I update my profile information?",
            answer:
                "Navigate to Vendor Profile and click Edit Profile."
        },
        {
            question:
                "How can I manage my leads?",
            answer:
                "Go to My Leads section to manage all incoming leads."
        },
        {
            question:
                "How do I schedule an appointment?",
            answer:
                "Open Appointments page and click Schedule Appointment."
        },
        {
            question:
                "How do subscriptions and plans work?",
            answer:
                "Subscriptions can be upgraded from Subscription page."
        },
        {
            question:
                "How do I update my billing information?",
            answer:
                "Billing information can be updated under Settings."
        },
        {
            question:
                "How can I contact support?",
            answer:
                "Use the Contact Support button to reach our team."
        }
    ];





    return (
        <div className="vendorhelp-layout">

            <Sidebar />

            <div className="vendorhelp-main">

                {/* Header */}

                <div className="vendorsettings-header">

                    <div>

                        <h1>
                            Help & Support
                        </h1>

                        <p>
                            Home / Help & support
                        </p>

                    </div>

                    <div className="vendorsettings-header-right">



                        <div className="vendorsettings-search-box">

                            <input
                                type="text"
                                placeholder="Search settings..."
                            />

                            <FaSearch className="vendorsettings-search-icon" />

                        </div>

                        <button className="settings-icon">
                            <FaRegCommentDots />
                        </button>

                        <button className="settings-icon">
                            <FaBell />
                        </button>

                        <div
                            className="vendorsettings-profile"
                            onClick={handleLogout}
                        >


                            <img
                                src={
                                    vendor?.photo
                                        ? `${API_URL}/uploads/${vendor.photo}`
                                        : "/avatar.png"
                                }
                                alt="Profile"
                                onClick={handleLogout}
                                style={{
                                    cursor: "pointer"
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
                                        vendor?.firmName
                                    }
                                </p>

                            </div>

                        </div>

                    </div>

                </div>
                {/* Cards */}

               <div className="vendorsupport-grid">

    {/* HELP CENTER */}

    <div className="vendorsupport-card">

        <div className="vendorsupport-card-icon blue">

            <FaBookOpen />

        </div>

        <h3>
            Help Center
        </h3>

        <p>
            Find guides and resources
            to help you get started.
        </p>

        <button
            onClick={() =>
                navigate("/help-center")
            }
        >
            View Articles

            <FaArrowRight />

        </button>

    </div>

    {/* TICKET */}

    <div className="vendorsupport-card">

        <div className="vendorsupport-card-icon green">

            <FaTicketAlt />

        </div>

        <h3>
            Raise Ticket
        </h3>

        <p>
            Submit a support ticket
            and we'll help resolve it.
        </p>

        <button
    type="button"
    onClick={() => {
        console.log("Popup:", showTicketPopup);
        setShowTicketPopup(true);
    }}
>
    Submit Ticket
</button>

    </div>

    {/* CHAT */}

    <div className="vendorsupport-card">

        <span className="vendorsupport-online">
            Online
        </span>

        <div className="vendorsupport-card-icon purple">

            <FaComments />

        </div>

        <h3>
            Chat Support
        </h3>

        <p>
            Chat with our support
            team in real time.
        </p>

        <button
            onClick={() =>
                navigate("/user-chat")
            }
        >
            Start Chat

            <FaArrowRight />

        </button>

    </div>

    {/* FAQ */}

    <div className="vendorsupport-card">

        <div className="vendorsupport-card-icon orange">

            <FaQuestionCircle />

        </div>

        <h3>
            FAQs
        </h3>

        <p>
            Find quick answers to
            common questions.
        </p>

        <button
            onClick={() =>
                navigate("/faq")
            }
        >
            View FAQs

            <FaArrowRight />

        </button>

    </div>

</div>






                <div className="vendorhelp-bottom-section">

                    {/* ================= Tutorials ================= */}

                    <div className="vendorhelp-tutorials">

                        <div className="vendorhelp-section-header">

                            <div>
                                <h3>
                                    Tutorials / Onboarding
                                </h3>

                                <p>
                                    Learn how to make the most out of CA Connect.
                                </p>
                            </div>

                            <button className="vendorhelp-viewall-btn">
                                View All Tutorials
                                <FaArrowRight />
                            </button>

                        </div>

                        <div className="vendorhelp-tutorial-list">

                            {tutorials.map((item) => (

                                <div
                                    key={item._id}
                                    className="vendorhelp-tutorial-item"
                                >

                                    <div className="vendorhelp-video-thumbnail">

                                        <img
                                            src={
                                                item.thumbnail ||
                                                "https://placehold.co/120x70"
                                            }
                                            alt={item.title}
                                            className="vendorhelp-tutorial-image"
                                        />

                                        <div className="vendorhelp-play-icon">
                                            <FaPlayCircle />
                                        </div>

                                    </div>

                                    <div className="vendorhelp-tutorial-content">

                                        <h4>
                                            {item.title}
                                        </h4>

                                        <p>
                                            {item.description}
                                        </p>

                                        <span className="vendorhelp-duration">
                                            <FaClock />
                                            {item.duration}
                                        </span>

                                    </div>
                                    <button
                                        className="vendorhelp-watch-btn"
                                        onClick={() =>
                                            window.open(
                                                item.videoUrl,
                                                "_blank"
                                            )
                                        }
                                    >
                                        Watch Now
                                    </button>

                                </div>

                            ))}

                        </div>

                    </div>

                    {/* ================= Refer & Earn ================= */}

                    <div className="vendorhelp-referral">

                        <h3>
                            Refer & Earn
                        </h3>

                        <p className="vendorhelp-referral-desc">
                            Refer other professionals and earn exciting rewards.
                        </p>

                        <div className="vendorhelp-referral-box">

                            <h4>
                                Share your referral link
                            </h4>

                            <p>
                                Invite your friends and colleagues to join CA Connect.
                            </p>

                            <div className="vendorhelp-copy-box">

                                <input
                                    type="text"
                                    readOnly
                                    value={referralLink}
                                />

                                <button
                                    onClick={copyReferralLink}
                                    title="Copy Link"
                                >
                                    <FaCopy />
                                </button>

                            </div>

                        </div>

                        <div className="vendorhelp-referral-stats">

                            <div className="vendorhelp-stat-card">

                                <FaUsers className="vendorhelp-stat-icon users" />

                                <h5>
                                    People Joined
                                </h5>

                                <h2>
                                    {vendor?.totalReferrals || 0}
                                </h2>

                            </div>

                            <div className="vendorhelp-stat-card">

                                <FaGift className="vendorhelp-stat-icon rewards" />

                                <h5>
                                    Rewards Earned
                                </h5>

                                <h2>
                                    ₹{(vendor?.rewardsEarned || 0).toLocaleString()}
                                </h2>

                            </div>

                            <div className="vendorhelp-stat-card">

                                <FaWallet className="vendorhelp-stat-icon pending" />

                                <h5>
                                    Pending Rewards
                                </h5>

                                <h2>
                                    ₹{(vendor?.pendingRewards || 0).toLocaleString()}
                                </h2>

                            </div>

                        </div>

                        <button className="vendorhelp-referral-btn">

                            View Referral Details

                            <FaArrowRight />

                        </button>

                    </div>

                </div>

















                <div className="vendorhelpfaq-wrapper">

                    <div className="vendorhelpfaq-left">

                        <div className="vendorhelpfaq-header">

                            <h3>
                                Popular FAQs
                            </h3>

                            <button className="vendorhelpfaq-view-btn">
                                View All FAQs →
                            </button>

                        </div>

                        <div className="vendorhelpfaq-grid">

                            {faqs.map((faq, index) => (

                                <div
                                    key={index}
                                    className="vendorhelpfaq-item"
                                    onClick={() =>
                                        toggleFaq(index)
                                    }
                                >

                                    <div className="vendorhelpfaq-question">

                                        <span>
                                            {faq.question}
                                        </span>

                                        <span className="vendorhelpfaq-icon">
                                            {
                                                openFaq === index
                                                    ? "−"
                                                    : "+"
                                            }
                                        </span>

                                    </div>

                                    {
                                        openFaq === index &&
                                        (
                                            <div className="vendorhelpfaq-answer">
                                                {faq.answer}
                                            </div>
                                        )
                                    }

                                </div>

                            ))}

                        </div>

                    </div>

                    <div className="vendorhelpfaq-support-card">
                        <div className="vendorhelpfaq-support-icon">
                            <FaHeadset />
                        </div>

                        <h3>
                            Still Need Help?
                        </h3>

                        <p>
                            Our support team is here to help you with any questions or issues.
                        </p>

                        <button
                            className="vendorhelpfaq-support-btn"
                            onClick={() =>
                                navigate("/support")
                            }
                        >
                            Contact Support
                        </button>

                        <span className="vendorhelpfaq-response-time">
                            Response time: Within a few minutes
                        </span>

                    </div>

                </div>


{/* ================= Ticket Popup ================= */}

{showTicketPopup && (
    <div
        className="vendorticket-overlay"
        onClick={() => setShowTicketPopup(false)}
    >
        <div
            className="vendorticket-modal"
            onClick={(e) => e.stopPropagation()}
        >

            <div className="vendorticket-header">

                <h2>
                    Raise Support Ticket
                </h2>

                <button
                    className="vendorticket-close"
                    onClick={() => setShowTicketPopup(false)}
                >
                    ✕
                </button>

            </div>

            <div className="vendorticket-body">

                <div className="vendorticket-group">
                    <label>Category</label>

                    <select
                        value={ticketData.category}
                        onChange={(e)=>
                            setTicketData({
                                ...ticketData,
                                category:e.target.value
                            })
                        }
                    >
                        <option value="">
                            Select Category
                        </option>

                        <option value="Technical Issue">
                            Technical Issue
                        </option>

                        <option value="Billing">
                            Billing
                        </option>

                        <option value="Subscription">
                            Subscription
                        </option>

                        <option value="Profile">
                            Profile
                        </option>

                        <option value="Other">
                            Other
                        </option>

                    </select>

                </div>

                <div className="vendorticket-group">
                    <label>Subject</label>

                    <input
                        type="text"
                        value={ticketData.subject}
                        onChange={(e)=>
                            setTicketData({
                                ...ticketData,
                                subject:e.target.value
                            })
                        }
                    />
                </div>

                <div className="vendorticket-group">
                    <label>Priority</label>

                    <select
                        value={ticketData.priority}
                        onChange={(e)=>
                            setTicketData({
                                ...ticketData,
                                priority:e.target.value
                            })
                        }
                    >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Urgent</option>
                    </select>
                </div>

                <div className="vendorticket-group">
                    <label>Attachment</label>

                    <input
                        type="file"
                        onChange={(e)=>
                            setTicketData({
                                ...ticketData,
                                attachment:e.target.files[0]
                            })
                        }
                    />
                </div>

                <div className="vendorticket-group vendorticket-full-width">

                    <label>Description</label>

                    <textarea
                        rows="5"
                        value={ticketData.description}
                        onChange={(e)=>
                            setTicketData({
                                ...ticketData,
                                description:e.target.value
                            })
                        }
                    />

                </div>

            </div>

            <div className="vendorticket-footer">

                <button
                    className="vendorticket-cancel"
                    onClick={() => setShowTicketPopup(false)}
                >
                    Cancel
                </button>

                <button
                    className="vendorticket-submit"
                    onClick={handleSubmitTicket}
                >
                    Submit Ticket
                </button>

            </div>

        </div>

    </div>
)}


            </div>

        </div>
    );
};















export default VendorHelp;