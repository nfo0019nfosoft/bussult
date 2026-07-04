import API_URL from "../config";
import "./Support.css";
import support from "../assets/support.png";
import { Link } from "react-router-dom";

import {
  FaSearch,
  FaUserCircle,
  FaCalendarAlt,
  FaFileInvoiceDollar,
  FaTools,
  FaComments,
  FaEllipsisH,
  FaArrowRight,
  FaEnvelope,
  FaPhoneAlt,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaFileAlt,
  FaChevronRight
} from "react-icons/fa";

function Support() {
  const articles = [
    "How to book a consultation?",
    "How to reschedule or cancel a consultation?",
    "How to download invoice?",
    "What payment methods do we accept?",
    "How to reset your password?",
  ];

  const helpCards = [
    {
      icon: <FaUserCircle />,
      title: "My Account",
      text: "Manage your account, profile, and security settings.",
    },
    {
      icon: <FaCalendarAlt />,
      title: "Consultations",
      text: "Book, reschedule or manage your consultations.",
    },
    {
      icon: <FaFileInvoiceDollar />,
      title: "Payments & Invoices",
      text: "View invoices, payment history and refund queries.",
    },
    {
      icon: <FaFileAlt />,
      title: "Services",
      text: "Know more about our services and how we can help.",
    },
    {
      icon: <FaComments />,
      title: "Technical Support",
      text: "Get help with technical issues and platform support.",
    },
    {
      icon: <FaEllipsisH />,
      title: "Other Queries",
      text: "If you need help with something else, we're here for you.",
    },
  ];

  return (
    <section className="support-page">

      {/* Breadcrumb */}
    
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <FaChevronRight />
        <span>AI Assistant</span>
      </div>

      {/* Hero */}
      <div className="support-top-grid">

        <div className="support-hero">

          <div className="hero-content">
            <h1>Support Center</h1>

            <p>
              We're here to help! Find answers, get support
              and resolve your queries.
            </p>

            <div className="search-box">
              <FaSearch />
              <input
                type="text"
                placeholder="Search for help articles, topics or keywords..."
              />
            </div>
          </div>

          <div className="hero-image">
            <img src={support} alt="Support" />
          </div>

        </div>

        {/* Popular Articles */}
        <div className="popular-articles">
          <h3>Popular Articles</h3>

          {articles.map((item, index) => (
            <div key={index} className="article-item">
              <FaFileAlt />
              <span>{item}</span>
            </div>
          ))}

          <a href="/">View all articles →</a>
        </div>

      </div>

      {/* Help Section */}
      <h2 className="help-title">
        How can we help you?
      </h2>

      <div className="help-layout">

        <div className="help-grid">

          {helpCards.map((card, index) => (
            <div key={index} className="help-card">

              <div className="help-icon">
                {card.icon}
              </div>

              <h4>{card.title}</h4>

              <p>{card.text}</p>

              <FaArrowRight className="card-arrow" />

            </div>
          ))}

        </div>

        {/* Right Sidebar */}

        <div className="support-sidebar">

          <div className="need-help-card">
            <h3>Still need help?</h3>

            <p>
              Our support team is available to assist
              you between 9:00 AM to 7:00 PM.
            </p>

            <button className="primary-btn">
              <FaEnvelope />
              Contact Support
            </button>

            <button className="secondary-btn">
              <FaPhoneAlt />
              Request a Call Back
            </button>
          </div>

          <div className="social-card">
            <h3>Connect with us</h3>

            <p>
              We're active on our social channels
            </p>

            <div className="social-icons">
              <FaFacebookF />
              <FaLinkedinIn />
              <FaTwitter />
              <FaInstagram />
            </div>
          </div>

        </div>

      </div>

      {/* Track Issue */}

      <div className="track-card">

        <div>
          <h3>Track your Issue</h3>
          <p>
            Enter your ticket ID to check status.
          </p>
        </div>

        <input
          type="text"
          placeholder="Enter Ticket ID"
        />

        <button>
          Track Status
        </button>

      </div>

    </section>
  );
}

export default Support;