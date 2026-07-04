import API_URL from "../config";
import { Link } from "react-router-dom";
import {
  FaChevronRight,
  FaCalendarAlt,
  FaCheckCircle,
  FaShieldAlt,
  FaHeadset,
  FaArrowRight,
  FaFilePdf,
} from "react-icons/fa";

import privacyImg from "../assets/privacy.png";

import "./PrivacyPolicy.css";

function PrivacyPolicy() {
  return (
    
    <section className="privacy-page">

      {/* Breadcrumb */}
      <div className="privacy-breadcrumb">
        <Link to="/">Home</Link>
        <FaChevronRight />
        <span>Privacy Policy</span>
      </div>

      {/* Hero Section */}
      <div className="privacy-hero">

        <div className="privacy-hero-content">

          <span className="privacy-tag">
            LEGAL
          </span>

          <h1>Privacy Policy</h1>

          <p>
            At CA Connect, we value your privacy and are
            committed to protecting your personal data.
            This Privacy Policy explains how we collect,
            use, disclose and safeguard your information
            when you use our website and services.
          </p>

          <div className="last-updated">
            <FaCalendarAlt />
            <span>Last updated: 20 May 2025</span>
          </div>

        </div>

        <div className="privacy-image">
          <img
            src={privacyImg}
            alt="Privacy Policy"
          />
        </div>

      </div>

      {/* Main Content */}
      <div className="privacy-layout">

        {/* Left Content */}
        <div className="privacy-content">

          {/* Section 1 */}
          <div className="policy-section">
            <h2>1. Information We Collect</h2>

            <p>
              We collect the following types of information
              to provide and improve our services:
            </p>

            <ul>
              <li>
                <FaCheckCircle />
                <span>
                  Personal Information: Name, email
                  address, phone number, company name,
                  GSTIN, PAN, etc.
                </span>
              </li>

              <li>
                <FaCheckCircle />
                <span>
                  Usage Data: Information about how you
                  use our website and services.
                </span>
              </li>

              <li>
                <FaCheckCircle />
                <span>
                  Cookies & Tracking Technologies:
                  To enhance user experience and
                  analyze website traffic.
                </span>
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="policy-section">
            <h2>2. How We Use Your Information</h2>

            <p>
              We use the information we collect to:
            </p>

            <ul>
              <li>
                <FaCheckCircle />
                <span>
                  Provide, operate and maintain our services.
                </span>
              </li>

              <li>
                <FaCheckCircle />
                <span>
                  Respond to your inquiries and support requests.
                </span>
              </li>

              <li>
                <FaCheckCircle />
                <span>
                  Send important updates, newsletters and
                  promotional offers (with your consent).
                </span>
              </li>

              <li>
                <FaCheckCircle />
                <span>
                  Improve our website, services and user experience.
                </span>
              </li>

              <li>
                <FaCheckCircle />
                <span>
                  Comply with legal obligations.
                </span>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="policy-section">
            <h2>3. Sharing of Information</h2>

            <p>
              We do not sell your personal data.
              We may share your information with:
            </p>

            <ul>
              <li>
                <FaCheckCircle />
                <span>
                  Trusted service providers who help
                  us operate our business.
                </span>
              </li>

              <li>
                <FaCheckCircle />
                <span>
                  Professional advisors, auditors or
                  regulatory authorities when required by law.
                </span>
              </li>

              <li>
                <FaCheckCircle />
                <span>
                  Third parties in case of a business transfer,
                  merger or acquisition.
                </span>
              </li>
            </ul>

            <button className="pdf-btn">
              <FaFilePdf />
              Read Full Policy (PDF)
            </button>
          </div>

        </div>

        {/* Sidebar */}
        <div className="privacy-sidebar">

          <div className="page-nav">

            <h3>On this page</h3>

            <ul>
              <li>1. Information We Collect</li>
              <li>2. How We Use Your Information</li>
              <li>3. Sharing of Information</li>
              <li>4. Data Security</li>
              <li>5. Your Rights</li>
              <li>6. Cookies Policy</li>
              <li>7. Third-Party Links</li>
              <li>8. Changes to This Policy</li>
              <li>9. Contact Us</li>
            </ul>

          </div>

          <div className="questions-card">

            <h3>Have questions?</h3>

            <p>
              If you have any questions about this
              Privacy Policy, feel free to reach out.
            </p>

           <Link to="/support" className="support-btn">
  <FaHeadset />
  Visit Support Center
  <FaArrowRight />
</Link>

            <div className="email-box">
              <span>Or Email us at</span>
              <a href="mailto:support@caconnect.com">
                support@caconnect.com
              </a>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom CTA */}
      <div className="privacy-cta">

        <div className="cta-left">

          <div className="cta-icon">
            <FaShieldAlt />
          </div>

          <div>
            <h3>Your privacy matters to us</h3>

            <p>
              We take every reasonable measure to
              protect your personal information and
              ensure a secure experience.
            </p>
          </div>

        </div>

       <Link to="/" className="consult-btn">
  Book a Consultation
  <FaArrowRight />
</Link>

      </div>

    </section>
  );
}

export default PrivacyPolicy;