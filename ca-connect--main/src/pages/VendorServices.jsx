import API_URL from "../config";
import React, {
  useEffect,
  useState
} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PhoneInputModule from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInput = PhoneInputModule.default || PhoneInputModule;

import {
  FaUser,
  FaFileAlt,
  FaBriefcase,
  FaTag,
  FaEye,
  FaCreditCard,
  FaSearch,
  FaBell,
  FaComments,
  FaCheckCircle,

  FaRocket,
  FaCalculator,
 
  FaBuilding,

  FaChartBar,
  FaClipboardCheck,
  FaInfoCircle
} from "react-icons/fa";

import {
  FaFileInvoiceDollar,
  FaFileSignature,
  FaFileInvoice,
  FaMoneyCheck
} from "react-icons/fa6";

import Sidebar from "../components/Sidebar";
// import "./VendorProfile.css";
import "./VendorServices.css";

function VendorServices() {
 
useEffect(() => {

  const token =
    localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
    return;
  }

  fetchProfile();

}, []);
  const [vendor, setVendor] =
    useState({});
const [steps, setSteps] = useState({
  profile: false,

  kyc: false,
  services: false,
 
  preview: false,
  payment: false,
});

const totalSteps = 5;

const completedSteps = [
  steps.profile,

  steps.kyc,
  steps.services,

  steps.preview,
  steps.payment,
].filter(Boolean).length;

const percentage = Math.round(
  (completedSteps / totalSteps) * 100
);
const [selectedServices, setSelectedServices] =
  useState([]);

const [pricingData, setPricingData] =
  useState({});

const handleServiceSelect = (service) => {

  const exists = selectedServices.some(
    (s) => s.serviceName === service.name
  );

  if (exists) {

    setSelectedServices(
      selectedServices.filter(
        (s) => s.serviceName !== service.name
      )
    );

  } else {

    setSelectedServices([
      ...selectedServices,
      {
        serviceName: service.name,
        description: service.description,
      },
    ]);

  }

};
const finalServices =
  selectedServices.map(
    (service) => ({
      serviceName:
        service.serviceName,

      pricingModel:
        pricingData[
          service.serviceName
        ]?.pricingModel || "",

      price:
        pricingData[
          service.serviceName
        ]?.price || 0,

      deliveryTime:
        pricingData[
          service.serviceName
        ]?.deliveryTime || "",

      description:
        pricingData[
          service.serviceName
        ]?.includes || "",
    })
  );
const removeService = (serviceName) => {

  setSelectedServices(
    selectedServices.filter(
      (item) =>
        item.serviceName !== serviceName
    )
  );

  setPricingData((prev) => {
    const updated = { ...prev };

    delete updated[serviceName];

    return updated;
  });

};
useEffect(() => {

  const token =
    localStorage.getItem("token");

  console.log("TOKEN =", token);

  fetchProfile();

}, []);
  const fetchProfile =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );
const res = await axios.get(
  `${API_URL}/api/vendor/profile`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
  

        const data =
          res.data.vendor;

        setVendor(data);
          

        if (data.services?.length > 0) {

  setSelectedServices(
    data.services.map((service) => ({
      serviceName: service.serviceName,
      description: service.description,
    }))
  );

  const pricingObj = {};

  data.services.forEach((service) => {
    pricingObj[service.serviceName] = {
      pricingModel: service.pricingModel || "",
      price: service.price || "",
      deliveryTime: service.deliveryTime || "",
      includes: service.description || "",
    };
  });

  setPricingData(pricingObj);
}


        setSteps({
          profile:
            !!data.fullName &&
            !!data.email &&
            !!data.mobile,

          firm:
            !!data.firmName &&
            !!data.gstNumber,

          kyc:
            !!data.kyc
              ?.panCard,

          services:
            data.services
              ?.length > 0,

          pricing:
            true,

          preview:
            !!data.photo,

          payment:
            !!data
              .bankDetails
              ?.accountNumber
        });

      } catch (error) {
        console.log(error);
      }
    };

  const handleChange = (
    e
  ) => {

    setVendor({
      ...vendor,
      [e.target.name]:
        e.target.value
    });

  };
 const saveServices = async () => {

  try {

    const token =
      localStorage.getItem("token");

    await axios.put(
  `${API_URL}/api/vendor/services`,
  {
    services: finalServices,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    alert(
      "Services Saved Successfully"
    );

  } catch (error) {

    console.log(error);

    alert("Save Failed");

  }
};
const services = [
  {
    name: "Income Tax Filing",
    icon: <FaFileInvoiceDollar />,
    description:
      "ITR filing for individuals, HUF, firms, companies, etc.",
  },
  {
    name: "GST Registration",
    icon: <FaFileSignature />,
    description:
      "New GST registration for businesses.",
  },
  {
    name: "GST Return Filing",
    icon: <FaFileInvoice />,
    description:
      "GSTR-1, GSTR-3B and other GST returns.",
  },
  {
    name: "TDS Return Filing",
    icon: <FaFileAlt />,
    description:
      "TDS return preparation and filing.",
  },
  {
    name: "Tax Planning & Advisory",
    icon: <FaRocket />,
    description:
      "Tax planning and savings strategies.",
  },
  {
    name: "ROC Compliance",
    icon: <FaClipboardCheck />,
    description:
      "Company registration, ROC filings.",
  },
  {
    name: "Accounting & Bookkeeping",
    icon: <FaCalculator />,
    description:
      "Maintain books and bank reconciliation.",
  },
  {
    name: "Audit & Assurance",
    icon: <FaSearch />,
    description:
      "Statutory audit and internal audit.",
  },
  {
    name: "Business Registration",
    icon: <FaBuilding />,
    description:
      "Pvt Ltd, LLP, OPC registration.",
  },
  {
    name: "Payroll Management",
    icon: <FaMoneyCheck />,
    description:
      "Payroll processing and compliance.",
  },
  {
    name: "Project Reports / CMA Data",
    icon: <FaChartBar />,
    description:
      "Project reports and CMA data.",
  },
  {
    name: "Other Services",
    icon: <FaBriefcase />,
    description:
      "Any other professional services.",
  },
];








const handleLogout = ()=>{

  const confirmLogout =
    window.confirm(
      "Are you sure you want to logout?"
    );

  if(!confirmLogout) return;

  localStorage.removeItem(
    "vendorToken"
  );

  localStorage.removeItem(
    "vendorId"
  );

  navigate(
    "/login"
  );

};
















  return (
    <div className="profile-layout">

      <Sidebar />

      <div className="profile-content">

        {/* Header */}

        <div className="top-header">

          <div>

            <h2>
              My Profile
            </h2>

            <p>
              Home /
              My Profile /
              Profile Information
            </p>

          </div>

          <div className="header-right">

            <div className="search-box">

              <FaSearch />

              <input
                type="text"
                placeholder="Search anything..."
              />

            </div>

            <FaComments className="icon" />

            <FaBell className="icon" />

            <div className="vendor-info">
<img
  src={
    vendor.photo
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
                    vendor.fullName
                  }
                </h4>

                <p>
                  {
                    vendor.firmName
                  }
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Tabs */}

     <div className="profile-tabs">

  <Link
    to="/vendor-profile"
    className="tab-link "
  >
    <FaUser />
    Profile Information
  </Link>

  <Link
    to="/vendor-kyc"
    className="tab-link"
  >
    <FaFileAlt />
    KYC Verification
  </Link>

  <Link
    to="/vendor-services"
    className="tab-link active"
  >
    <FaBriefcase />
    Services Offered
  </Link>

 

  <Link
    to="/vendor-preview"
    className="tab-link"
  >
    <FaEye />    
    Public Profile Preview
  </Link>

  <Link
    to="/vendor-profile"
    className="tab-link"
  >
    <FaCreditCard />
    Payment Details
  </Link>

</div>
        <div className="profile-wrapper">

          {/* LEFT */}
<div className="services-card">

  <h2>Services Offered</h2>

  <p className="section-desc">
    Select the services you provide and add pricing,
    delivery time and other relevant details.
  </p>

  <div className="info-box">

    <FaInfoCircle />

    <div>
      <strong>Select Services</strong>

      <p>
        Choose all the services that you provide
        to your clients.
      </p>
    </div>

  </div>

  <h4 className="service-section-title">
    Select Services
    <span>
      (You can choose multiple services)
    </span>
  </h4>

  {/* SERVICES GRID */}

  <div className="services-grid">

    {services.map((service) => {

      const isSelected =
        selectedServices.some(
          (s) =>
            s.serviceName === service.name
        );

      return (

        <div
          key={service.name}
          className={`service-card ${
            isSelected ? "active" : ""
          }`}
          onClick={() =>
            handleServiceSelect(service)
          }
        >

          <div className="service-header">

            <div className="service-icon">
              {service.icon}
            </div>

            <input
              type="checkbox"
              checked={isSelected}
              readOnly
            />

          </div>

          <h4>{service.name}</h4>

          <p>{service.description}</p>

        </div>

      );

    })}

  </div>

  <p className="selected-count">
    Selected {selectedServices.length} Services
  </p>

  {/* PRICING SECTION */}

  <div className="pricing-card">

  <h2>
    Set Pricing & Service Details
  </h2>

  <p className="section-desc">
    Set your pricing, delivery time and
    other details for the selected services.
  </p>

  <div className="table-wrapper">

    <table className="pricing-table">

      <thead>

        <tr>
          <th>Service</th>
          <th>Pricing Model</th>
          <th>Charges (₹)</th>
          <th>Delivery Time</th>
          <th>Includes</th>
          <th>Actions</th>
        </tr>

      </thead>

      <tbody>

        {selectedServices.length > 0 ? (

          selectedServices.map(
            (service, index) => (

            <tr key={index}>

              <td>
                {service.serviceName}
              </td>

              {/* Pricing Model */}

              <td>

                <select
                  value={
                    pricingData[
                      service.serviceName
                    ]?.pricingModel || ""
                  }
                  onChange={(e) =>
                    setPricingData({
                      ...pricingData,
                      [service.serviceName]: {
                        ...pricingData[
                          service.serviceName
                        ],
                        pricingModel:
                          e.target.value,
                      },
                    })
                  }
                >

                  <option value="">
                    Select
                  </option>

                  <option value="Fixed Price">
                    Fixed Price
                  </option>

                  <option value="Per Return">
                    Per Return
                  </option>

                  <option value="Hourly Basis">
                    Hourly Basis
                  </option>

                  <option value="Monthly">
                    Monthly
                  </option>

                </select>

              </td>

              {/* Charges */}

              <td>

                <input
                  type="number"
                  placeholder="2499"
                  value={
                    pricingData[
                      service.serviceName
                    ]?.price || ""
                  }
                  onChange={(e) =>
                    setPricingData({
                      ...pricingData,
                      [service.serviceName]: {
                        ...pricingData[
                          service.serviceName
                        ],
                        price:
                          e.target.value,
                      },
                    })
                  }
                />

              </td>

              {/* Delivery Time */}

              <td>

                <input
                  type="text"
                  placeholder="3 - 5 Days"
                  value={
                    pricingData[
                      service.serviceName
                    ]?.deliveryTime || ""
                  }
                  onChange={(e) =>
                    setPricingData({
                      ...pricingData,
                      [service.serviceName]: {
                        ...pricingData[
                          service.serviceName
                        ],
                        deliveryTime:
                          e.target.value,
                      },
                    })
                  }
                />

              </td>

              {/* Includes */}

              <td>

                <input
                  type="text"
                  placeholder="What's Included?"
                  value={
                    pricingData[
                      service.serviceName
                    ]?.includes || ""
                  }
                  onChange={(e) =>
                    setPricingData({
                      ...pricingData,
                      [service.serviceName]: {
                        ...pricingData[
                          service.serviceName
                        ],
                        includes:
                          e.target.value,
                      },
                    })
                  }
                />

              </td>

              {/* Delete */}

              <td>

             <button
  className="delete-btn"
  onClick={() =>
    removeService(
      service.serviceName
    )
  }
>
  Delete
</button>

              </td>

            </tr>

          ))

        ) : (

          <tr>

            <td
              colSpan="6"
              className="empty-row"
            >
              No Services Selected
            </td>

          </tr>

        )}

      </tbody>

    </table>

  </div>

  <div className="service-buttons">

    <button className="draft-btn">
      Save as Draft
    </button>

     <Link
       to="/vendor-payment"
       className="save-btn"
       onClick={saveServices}
     >
       Save & Continue
     </Link>

  </div>

</div>

</div>
          

          {/* RIGHT */}

<div className="completion-card">

  <h3>Profile Completion</h3>

  <div className="completion-top">

    <div className="progress-circle">
      {percentage}%
    </div>

    <div className="progress-text">
      <p>
        Complete your profile to get
        more leads and visibility.
      </p>

      <a href="#">
        View Profile
      </a>
    </div>

  </div>

  <div className="steps-list">

    <div className="step-item">
      <span
        className={`step-dot ${
          steps.profile ? "active" : ""
        }`}
      ></span>

      <span className="step-label">
        Profile Information
      </span>

      {steps.profile ? (
        <FaCheckCircle className="green" />
      ) : (
        <div className="empty-circle"></div>
      )}
    </div>

    

    <div className="step-item">
      <span
        className={`step-dot ${
          steps.kyc ? "active" : ""
        }`}
      ></span>

      <span className="step-label">
        KYC Verification
      </span>

      {steps.kyc ? (
        <FaCheckCircle className="green" />
      ) : (
        <div className="empty-circle"></div>
      )}
    </div>

    <div className="step-item">
      <span
        className={`step-dot ${
          steps.services ? "active" : ""
        }`}
      ></span>

      <span className="step-label">
        Services Offered
      </span>

      {steps.services ? (
        <FaCheckCircle className="green" />
      ) : (
        <div className="empty-circle"></div>
      )}
    </div>

   

    <div className="step-item">
      <span
        className={`step-dot ${
          steps.preview ? "active" : ""
        }`}
      ></span>

      <span className="step-label">
        Public Profile Preview
      </span>

      {steps.preview ? (
        <FaCheckCircle className="green" />
      ) : (
        <div className="empty-circle"></div>
      )}
    </div>

    <div className="step-item">
      <span
        className={`step-dot ${
          steps.payment ? "active" : ""
        }`}
      ></span>

      <span className="step-label">
        Payment Details
      </span>

      {steps.payment ? (
        <FaCheckCircle className="green" />
      ) : (
        <div className="empty-circle"></div>
      )}
    </div>

  </div>

</div>

        </div>

      </div>

    </div>














  );
}

export default VendorServices;