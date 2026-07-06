import API_URL from "../config";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import contact from "../assets/contact.png";
import "./Contact.css";

import {
  FaQuestionCircle,
  FaChevronDown,
  FaChevronUp,
  FaBookOpen,
  FaHeadset,
  FaCalendarCheck ,
  FaChevronRight,
  FaEnvelope,
  FaShieldAlt,
  FaArrowRight,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaUser,
  FaPhone,
  FaPaperPlane,
} from "react-icons/fa";
function Contact() {
    
const navigate = useNavigate();
const [openFaq, setOpenFaq] = useState(null);
const faqData = [
  {
    question: "How do I book a consultation?",
    answer:
      "You can book a consultation by selecting a service and scheduling an appointment through our platform."
  },
  {
    question: "How do I reschedule or cancel a consultation?",
    answer:
      "Go to your dashboard, open bookings and choose reschedule or cancel."
  },
  {
    question: "What payment methods do we accept?",
    answer:
      "We accept UPI, Credit Cards, Debit Cards, Net Banking and Wallet payments."
  },
  {
    question: "How to download invoice?",
    answer:
      "Invoices are available in your account under Billing & Payments."
  },
  {
    question: "How to reset your password?",
    answer:
      "Click Forgot Password on the login page and follow the instructions sent to your email."
  }
];

  return (
    <>
    <section className="contact-hero-section">
      {/* Breadcrumb */}
      <div className="privacy-breadcrumb">
        <Link to="/">Home</Link>
        <FaChevronRight />
        <span>Contact Us</span>
      </div>

      <div className="contact-hero-wrapper">

        {/* Left Side */}

        <div className="contact-hero-card">

          <div className="contact-content">

            <h1>We're here to help!</h1>

            <p>
              Have a question, feedback or need assistance?
              Our team is ready to support you.
            </p>

            <div className="feature-item">
              <div className="feature-icon">
                <FaEnvelope />
              </div>

              <div>
                <h4>Quick Responses</h4>
                <p>We reply as soon as possible</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <FaHeadset />
              </div>

              <div>
                <h4>Expert Support</h4>
                <p>Get help from our CA experts</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <FaShieldAlt />
              </div>

              <div>
                <h4>Secure & Reliable</h4>
                <p>Your privacy and trust are our priority</p>
              </div>
            </div>

          </div>

          <div className="contact-image">
            <img
                              src={contact}
                              alt="Support Team"
                            />
          </div>

        </div>

        {/* Right Side */}

        <div className="contact-info-card">

          <h3>Get in touch</h3>

          <div className="info-item">
            <div className="info-icon">
              <FaPhoneAlt />
            </div>

            <div>
              <h4>Phone</h4>
              <p>+91 99999 99999</p>
              <span>Mon - Sat | 9:00 AM - 7:00 PM</span>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">
              <FaEnvelope />
            </div>

            <div>
              <h4>Email</h4>
              <p>support@bussult.com</p>
              <span>We reply within 24 hours</span>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">
              <FaMapMarkerAlt />
            </div>

            <div>
              <h4>Office</h4>
              <p>
                Bussult Private Limited,
                12th Floor, Times Square Building,
                Andheri East,
                Mumbai - 400059,India
              </p>
            </div>
          </div>

        </div>

      </div>

    </section>




<section className="contact-support-section">

  <div className="contact-support-wrapper">

    {/* LEFT SIDE */}

    <div className="contact-form-card">

      <h2 className="form-title">
        Send us a message
      </h2>

      <div className="form-grid">

        {/* Full Name */}

        <div className="form-group">

          <label>Full Name*</label>

          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Enter your full name"
              className="contact-input"
            />

            <FaUser className="input-icon" />
          </div>

        </div>

        {/* Email */}

        <div className="form-group">

          <label>Email Address*</label>

          <div className="input-wrapper">
            <input
              type="email"
              placeholder="Enter your email address"
              className="contact-input"
            />

            <FaEnvelope className="input-icon" />
          </div>

        </div>

        {/* Phone */}

        <div className="form-group">

          <label>Phone Number</label>

          <div className="input-wrapper">
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="contact-input"
            />

            <FaPhoneAlt className="input-icon" />
          </div>

        </div>

        {/* Subject */}

        <div className="form-group">

          <label>Subject*</label>

          <select className="contact-input">
            <option>Select a subject</option>
          <option>GST Filing</option>
<option>Income Tax Filing</option>
<option>Company Registration</option>
<option>ROC Filing</option>
<option>Audit & Assurance</option>
<option>Bookkeeping</option>
<option>Payroll Services</option>
          </select>

        </div>

      </div>

      {/* Message */}

      <div className="form-group message-group">

        <label>Message*</label>

        <textarea
          rows="6"
          placeholder="Type your message here..."
          className="contact-textarea"
        />

        <span className="char-count">
          0/1000
        </span>

      </div>

      <button className="send-message-btn">

        <FaPaperPlane />

        Send Message

      </button>

    </div>

    {/* RIGHT SIDE */}

    <div className="contact-right-section">

  <div className="contact-faq-card">

    <div className="contact-faq-header">

      <h3>Frequently Asked Questions</h3>

      <Link to="/faq" className="contact-faq-link">
        View all FAQs →
      </Link>

    </div>

   <div className="contact-faq-list">

  {faqData.map((faq, index) => (

    <div
      className={`contact-faq-item ${
        openFaq === index ? "active-faq" : ""
      }`}
      key={index}
    >

      <button
        className="contact-faq-question"
        onClick={() =>
          setOpenFaq(
            openFaq === index ? null : index
          )
        }
      >

        <div className="contact-faq-left">
          <FaQuestionCircle />

          <span>{faq.question}</span>
        </div>

        {openFaq === index ? (
          <FaChevronDown />
        ) : (
          <FaChevronRight />
        )}

      </button>

      {openFaq === index && (
        <div className="contact-faq-answer">
          {faq.answer}
        </div>
      )}

    </div>

  ))}

</div>

  </div>

  <div className="contact-support-card">

    <h3>Need more support?</h3>

    <p>
      Explore our support resources for quick help.
    </p>

    <div className="contact-support-grid">

      <div className="contact-support-box">

        <div className="contact-support-icon">
          <FaBookOpen />
        </div>

        <div className="contact-support-content">
          <h4>Help Center</h4>
          <span>
            Browse articles and step-by-step guides
          </span>
        </div>

        <FaChevronRight className="contact-support-arrow" />

      </div>

      <div className="contact-support-box">

        <div className="contact-support-icon">
          <FaHeadset />
        </div>

        <div className="contact-support-content">
          <h4>Support Center</h4>
          <span>
            Track tickets and get personalized support
          </span>
        </div>

        <FaChevronRight className="contact-support-arrow" />

      </div>

    </div>

  </div>

</div>

  </div>

</section>


<section className="consultation-cta">
  <div className="consultation-content">
    

    <div className="consultation-left">

      <div className="consultation-icon">
        <FaCalendarCheck />
      </div>

      <div className="consultation-text">
        <h3>Ready to get started?</h3>

        <p>
          Book a consultation with our CA experts and get the
          right guidance for your needs.
        </p>
      </div>

    </div>

    <button
  className="consultation-btn"
  onClick={() => navigate("/find-ca")}
>
  <FaCalendarCheck className="btn-icon" />
  <span>Book a Consultation</span>
  <FaArrowRight className="btn-arrow" />
</button>

  </div>
</section>




    </>
  );
}


export default Contact;