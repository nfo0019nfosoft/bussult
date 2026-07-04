import API_URL from "../config";
import "./Service.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FaFileInvoiceDollar,
  FaReceipt,
  FaBuilding,
  FaClipboardCheck,
  FaCalculator,
  FaUsers,
  FaTrademark,
  FaRocket,
  FaBriefcase,
  FaSearch,
  FaKey,
  FaEllipsisH,
  FaArrowRight,
  FaCheck,
  FaChevronRight,
  FaThLarge,
  FaCalendarAlt,
  FaShieldAlt,
  FaRupeeSign,
  FaHeadset,

} from "react-icons/fa";

function Service() {
  const [activeTab, setActiveTab] = useState("all");






const allServices = [
  {
    category: "taxation",
    iconClass: "tax-icon",
    icon: <FaFileInvoiceDollar />,
    title: "Income Tax Services",
    description: "ITR Filing, Tax Planning, TDS, Refund & more",
    points: [
      "ITR Filing",
      "Tax Planning",
      "TDS Compliance",
      "Income Tax Notice Handling",
    ],
  },

  {
    category: "taxation",
    iconClass: "gst-icon",
    icon: <FaReceipt />,
    title: "GST Services",
    description: "GST Registration, Filing, Returns & Compliance",
    points: [
      "GST Registration",
      "GST Return Filing",
      "GST Notice Handling",
      "GST Audit & Compliance",
    ],
  },

  {
    category: "business",
    iconClass: "business-icon",
    icon: <FaBuilding />,
    title: "Business Registration",
    description: "Private Limited, LLP, OPC, Partnership & more",
    points: [
      "Private Limited Company",
      "LLP Registration",
      "OPC Registration",
      "Partnership Firm Registration",
    ],
  },

  {
    category: "compliance",
    iconClass: "compliance-icon",
    icon: <FaClipboardCheck />,
    title: "Compliance & Filings",
    description: "ROC Compliance, Annual Filing, Audit & more ",
    points: [
      "ROC Filing",
      "Annual Compliance",
      "Board Resolutions",
      "Statutory Audit",
    ],
  },

  {
    category: "accounting",
    iconClass: "accounting-icon",
    icon: <FaCalculator />,
    title: "Accounting & Bookkeeping",
    description: "Bookkeeping, Financial Statements & more",
    points: [
      "Bookkeeping",
      "Financial Statements",
      "Bank Reconciliation",
      "MIS Reports",
    ],
  },

  {
    category: "payroll",
    iconClass: "payroll-icon",
    icon: <FaUsers />,
    title: "Payroll Services",
    description: "Payroll Management, PF, ESI, TDS & more",
    points: [
      "Payroll Processing",
      "PF & ESI Compliance",
      "TDS on Salary",
      "Form 16 & 12BA",
    ],
  },

  {
    category: "business",
    iconClass: "trademark-icon",
    icon: <FaTrademark />,
    title: "Trademark & IP",
    description: "Trademark Registration, Patent, Copyright  & more ",
    points: [
      "Trademark Registration",
      "Copyright Registration",
      "Patent Filing",
      "IP Consultation",
    ],
  },

  {
    category: "business",
    iconClass: "startup-icon",
    icon: <FaRocket />,
    title: "Startup Services",
    description: "Startup Registration, MSME, IEC, DSC &  more ",
    points: [
      "MSME Registration",
      "IEC Registration",
      "DSC Services",
      "Startup India Registration",
    ],
  },

  {
    category: "compliance",
    iconClass: "company-icon",
    icon: <FaBriefcase />,
    title: "Company Secretarial",
    description: "Board Meetings, Minutes, AGM, EGM & more",
    points: [
      "Board Meetings",
      "Minutes Drafting",
      "AGM & EGM",
      "Annual Return Filing",
    ],
  },

  {
    category: "compliance",
    iconClass: "audit-icon",
    icon: <FaSearch />,
    title: "Audit & Assurance",
    description: "Internal Audit, Statutory Audit, Tax Audit & more",
    points: [
      "Statutory Audit",
      "Internal Audit",
      "Tax Audit",
      "Limited Review",
    ],
  },

  {
    category: "other",
    iconClass: "dsc-icon",
    icon: <FaKey />,
    title: "Digital Signature (DSC)",
    description: "Class 2 & Class 3 DSC for individuals & companies ",
    points: [
      "Individual DSC",
      "Director DSC",
      "Company DSC",
      "DGFT DSC",
    ],
  },

  {
    category: "other",
    iconClass: "other-icon",
    icon: <FaEllipsisH />,
    title: "Other Services",
    description: "NRI Services, Litigation Support and the Business Valuation  ",
    points: [
      "NRI Taxation",
      "Business Valuation",
      "Litigation Support",
      "Other Professional Services",
    ],
  },
];












  return (
      <>
    <section className="service-hero">

      <div className="service-container">

        <div className="privacy-breadcrumb">
               <Link to="/">Home</Link>
               <FaChevronRight />
               <span>Services</span>
             </div>

        <h1 className="service-title">
          Our Services
        </h1>

        <p className="service-description">
          Comprehensive CA services to support individuals, businesses
          and professionals at every step.
        </p>

        <div className="service-search">
          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search for a service (e.g., GST Filing, ITR, Company Registration...)"
          />
        </div>

      </div>

    </section>










<section className="services-section">

<div className="service-tabs">

  <button
    className={activeTab === "all" ? "active" : ""}
    onClick={() => setActiveTab("all")}
  >
    <FaThLarge />
    All Services
  </button>

  <button
    className={activeTab === "taxation" ? "active" : ""}
    onClick={() => setActiveTab("taxation")}
  >
    <FaFileInvoiceDollar />
    Taxation
  </button>

  <button
    className={activeTab === "business" ? "active" : ""}
    onClick={() => setActiveTab("business")}
  >
    <FaBuilding />
    Business Services
  </button>

  <button
    className={activeTab === "compliance" ? "active" : ""}
    onClick={() => setActiveTab("compliance")}
  >
    <FaClipboardCheck />
    Compliance
  </button>

  <button
    className={activeTab === "accounting" ? "active" : ""}
    onClick={() => setActiveTab("accounting")}
  >
    <FaCalculator />
    Accounting
  </button>

  <button
    className={activeTab === "payroll" ? "active" : ""}
    onClick={() => setActiveTab("payroll")}
  >
    <FaUsers />
    Payroll
  </button>

  <button
    className={activeTab === "other" ? "active" : ""}
    onClick={() => setActiveTab("other")}
  >
    <FaEllipsisH />
    Other Services
  </button>

</div>

  <div className="services-grid">

    {allServices
      .filter(
        service =>
          activeTab === "all" ||
          service.category === activeTab
      )
      .map((service, index) => (
        <div className="service-card" key={index}>

          <div className="service-header">

            <div
              className={`service-icon ${service.iconClass}`}
            >
              {service.icon}
            </div>

            <div className="service-content">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>

          </div>

          <ul className="service-list">
            {service.points.map((point, i) => (
              <li key={i}>
                <FaCheck />
                {point}
              </li>
            ))}
          </ul>

          <button className="arrow-btn">
            <FaArrowRight />
          </button>

        </div>
      ))}

  </div>

</section>





<section className="consultation-section">
  <div className="consultation-card">

    <div className="consultation-left">

      <div className="consultation-icon">
        <FaCalendarAlt />
      </div>

      <div>
        <h3>Need a personalized solution?</h3>

        <p>
          Book a consultation with our experts and get
          the right guidance for your needs.
        </p>
      </div>

    </div>

    <button className="consultation-btn">
      <FaCalendarAlt />
      Book Consultation
    </button>

  </div>
</section>









<section className="trust-section">

  <div className="trust-card">

    <div className="trust-item">
      <div className="trust-icon">
        <FaShieldAlt />
      </div>

      <div>
        <h4>100% Secure</h4>
        <p>
          Your data is safe with
          bank-level security
        </p>
      </div>
    </div>

    <div className="trust-item">
      <div className="trust-icon">
        <FaUsers />
      </div>

      <div>
        <h4>Verified Professionals</h4>
        <p>
          Connect with experienced
          CA experts
        </p>
      </div>
    </div>

    <div className="trust-item">
      <div className="trust-icon">
        <FaRupeeSign />
      </div>

      <div>
        <h4>Transparent Pricing</h4>
        <p>
          No hidden charges.
          Complete clarity.
        </p>
      </div>
    </div>

    <div className="trust-item">
      <div className="trust-icon">
        <FaHeadset />
      </div>

      <div>
        <h4>24/7 Support</h4>
        <p>
          Our support team is always
          here to help you
        </p>
      </div>
    </div>

  </div>

</section>








</>
  );
}

export default Service;