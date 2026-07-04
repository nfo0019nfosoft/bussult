import API_URL from "../config";
import { useState } from "react";
import { Link } from "react-router-dom";

import {
  FaChevronRight,
  FaCalendarAlt,
  FaCheckCircle,
  FaFilePdf,
  FaHeadset,
  FaArrowRight,
  FaClipboardCheck,
} from "react-icons/fa";

import termsImg from "../assets/terms.png";
import refundImg from "../assets/refund.png";

import "./TermsAndConditions.css";

function TermsAndConditions() {
  const [activeTab, setActiveTab] = useState("terms");

  return (
    <section className="terms-page">

      {/* Breadcrumb */}
      <div className="terms-breadcrumb">
        <Link to="/">Home</Link>
        <FaChevronRight />
        <span>
          {activeTab === "terms"
            ? "Terms & Conditions"
            : "Refund Policy"}
        </span>
      </div>

      {/* Tabs */}
      <div className="legal-tabs">

        <button
          className={
            activeTab === "terms"
              ? "tab-btn active"
              : "tab-btn"
          }
          onClick={() => setActiveTab("terms")}
        >
          Terms & Conditions
        </button>

        <button
          className={
            activeTab === "refund"
              ? "tab-btn active"
              : "tab-btn"
          }
          onClick={() => setActiveTab("refund")}
        >
          Refund Policy
        </button>

      </div>

      {/* TERMS CONTENT */}
      {activeTab === "terms" && (
        <>

          {/* Hero */}
          <div className="legal-hero">

            <div className="legal-content">

              <span className="legal-tag">
                LEGAL
              </span>

              <h1>Terms & Conditions</h1>

              <p>
                These terms and conditions outline the
                rules and regulations for the use of
                CA Connect's website and services.
                By accessing this website, you agree
                to these terms in full.
              </p>

              <div className="last-updated">
                <FaCalendarAlt />
                <span>
                  Last updated: 20 May 2025
                </span>
              </div>

            </div>

            <div className="legal-image">
              <img
                src={termsImg}
                alt="Terms and Conditions"
              />
            </div>

          </div>

          {/* Main Layout */}
          <div className="legal-layout">

            {/* LEFT CONTENT */}
            <div className="legal-main">

              <div className="legal-section">

                <h2>1. Acceptance of Terms</h2>

                <p>
                  By accessing or using CA Connect's
                  website and services, you agree to
                  be bound by these Terms &
                  Conditions and our Privacy Policy.
                </p>

              </div>

              <div className="legal-section">

                <h2>2. Services</h2>

                <p>
                  CA Connect provides information,
                  professional connections and
                  consultation booking services.
                  We do not provide professional
                  advice directly.
                </p>

              </div>

              <div className="legal-section">

                <h2>3. User Responsibilities</h2>

                <p>You agree to:</p>

                <ul>

                  <li>
                    <FaCheckCircle />
                    Provide accurate and complete information
                  </li>

                  <li>
                    <FaCheckCircle />
                    Use the website only for lawful purposes
                  </li>

                  <li>
                    <FaCheckCircle />
                    Not misuse or attempt to disrupt services
                  </li>

                  <li>
                    <FaCheckCircle />
                    Maintain confidentiality of your account
                  </li>

                </ul>

              </div>

              <div className="legal-section">

                <h2>4. Intellectual Property</h2>

                <p>
                  All content on this website including
                  text, graphics, logos and images are
                  the property of CA Connect and are
                  protected by copyright and trademark laws.
                </p>

                <button className="pdf-btn">
                  <FaFilePdf />
                  Read Full Terms (PDF)
                </button>

              </div>

            </div>

            {/* SIDEBAR */}
            <div className="legal-sidebar">

              <div className="page-card">

                <h3>On this page</h3>

                <ul>
                  <li>1. Acceptance of Terms</li>
                  <li>2. Services</li>
                  <li>3. User Responsibilities</li>
                  <li>4. Intellectual Property</li>
                  <li>5. Limitation of Liability</li>
                  <li>6. Indemnification</li>
                  <li>7. Governing Law</li>
                  <li>8. Changes to Terms</li>
                  <li>9. Contact Us</li>
                </ul>

              </div>

              <div className="help-card">

                <h3>
                  Need help understanding
                  our terms?
                </h3>

                <p>
                  Our support team is here
                  to clarify your queries.
                </p>

                <Link
                  to="/support"
                  className="support-btn"
                >
                  <FaHeadset />
                  Visit Support Center
                  <FaArrowRight />
                </Link>

                <div className="help-email">
                  <span>or Email us at</span>

                  <a href="mailto:support@caconnect.com">
                    support@caconnect.com
                  </a>
                </div>

              </div>

            </div>

          </div>

          {/* CTA */}
          <div className="legal-cta">

            <div className="cta-left">

              <div className="cta-icon">
                <FaClipboardCheck />
              </div>

              <div>

                <h3>
                  Clear terms. Transparent relationship.
                </h3>

                <p>
                  We believe in transparency and
                  building trust with our users
                  through clear and simple terms.
                </p>

              </div>

            </div>

            <Link
              to="/"
              className="consult-btn"
            >
              Book a Consultation
              <FaArrowRight />
            </Link>

          </div>

        </>
      )}

      {/* REFUND POLICY */}
      {activeTab === "refund" && (
        <>

          <div className="legal-hero">

            <div className="legal-content">

              <span className="legal-tag">
                LEGAL
              </span>

              <h1>Refund Policy</h1>

              <p>
                This Refund Policy outlines the
                circumstances under which refunds
                may be granted for services booked
                through CA Connect.
              </p>

              <div className="last-updated">
                <FaCalendarAlt />
                <span>
                  Last updated: 20 May 2025
                </span>
              </div>

            </div>

            <div className="legal-image">
              <img
                src={refundImg}
                alt="Refund Policy"
              />
            </div>

          </div>

          <div className="legal-layout">

            <div className="legal-main">

              <div className="legal-section">
                <h2>1. Refund Eligibility</h2>
                <p>
                  Refunds may be granted only
                  for eligible services where
                  work has not substantially started.
                </p>
              </div>

              <div className="legal-section">
                <h2>2. Non-Refundable Fees</h2>
                <p>
                  Government charges, filing fees
                  and completed services are
                  non-refundable.
                </p>
              </div>

              <div className="legal-section">
                <h2>3. Refund Processing</h2>
                <p>
                  Approved refunds are processed
                  within 7–10 business days.
                </p>
              </div>

              <div className="legal-section">
                <h2>4. Contact Support</h2>
                <p>
                  For refund related queries,
                  please contact our support team.
                </p>
              </div>

            </div>

            <div className="legal-sidebar">

              <div className="page-card">
                <h3>Refund Policy</h3>

                <ul>
                  <li>1. Refund Eligibility</li>
                  <li>2. Non-Refundable Fees</li>
                  <li>3. Refund Processing</li>
                  <li>4. Contact Support</li>
                </ul>
              </div>

              <div className="help-card">

                <h3>Need Help?</h3>

                <p>
                  Our support team is available
                  to answer refund related queries.
                </p>

                <Link
                  to="/support"
                  className="support-btn"
                >
                  <FaHeadset />
                  Visit Support Center
                </Link>

              </div>

            </div>

          </div>

        </>
      )}

    </section>
  );
}

export default TermsAndConditions;