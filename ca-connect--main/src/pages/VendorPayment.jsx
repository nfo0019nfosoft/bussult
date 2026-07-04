import API_URL from "../config";
import React, {
  useEffect,
  useState
} from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
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

function VendorPayment() {

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
if (data.bankDetails) {
  setBankData({
    accountHolderName:
      data.bankDetails.accountHolderName || "",

    bankName:
      data.bankDetails.bankName || "",

    accountNumber:
      data.bankDetails.accountNumber || "",

    confirmAccountNumber:
      data.bankDetails.accountNumber || "",

    ifscCode:
      data.bankDetails.ifscCode || "",

    branchName:
      data.bankDetails.branchName || "",

    accountType:
      data.bankDetails.accountType ||
      "Current Account",

    upiId:
      data.bankDetails.upiId || "",

    preferredPayoutMethod:
      data.bankDetails.preferredPayoutMethod ||
      "NEFT / IMPS",

    payoutFrequency:
      data.bankDetails.payoutFrequency ||
      "Weekly",

    minimumPayoutThreshold:
      data.bankDetails.minimumPayoutThreshold ||
      1000,
  });
}



    console.log("VENDOR =", data);
    console.log("BANK =", data.bankDetails);
    console.log(
      "Payment Step =",
      !!data.bankDetails?.accountNumber
    );
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

  const navigate = useNavigate();
const token =
  localStorage.getItem("token");
const [bankData, setBankData] = useState({
  accountHolderName: "",
  bankName: "",
  accountNumber: "",
  confirmAccountNumber: "",
  ifscCode: "",
  branchName: "",
  accountType: "Current Account",
  upiId: "",
  preferredPayoutMethod: "NEFT / IMPS",
  payoutFrequency: "Weekly",
  minimumPayoutThreshold: 1000,
});

const [accountError, setAccountError] =
  useState("");

  

 const saveBankDetails = async () => {

  try {

    const token =
      localStorage.getItem("token");

    const res = await axios.put(
      `${API_URL}/api/vendor/update-bank-details`,
      {
        bankDetails: bankData,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(
      "SAVE RESPONSE =",
      res.data
    );

    await fetchProfile();

    alert(
      "Bank Details Saved Successfully"
    );

  } catch (error) {

    console.log(
      "SAVE ERROR =",
      error.response?.data ||
      error.message
    );

  }

};

 const handleSaveBankDetails =
  async () => {

  if (
    bankData.accountNumber !==
    bankData.confirmAccountNumber
  ) {

    setAccountError(
      "Account Number and Confirm Account Number do not match"
    );

    return;
  }

  setAccountError("");

  await saveBankDetails();
};






















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
    className="tab-link"
  >
    <FaBriefcase />
    Services Offered
  </Link>

 

  <Link
    to="/vendor-preview"
    className="tab-link "
  >
    <FaEye />
    Public Profile Preview
  </Link>

  <Link
    to="/vendor-payment"
    className="tab-link active"
  >
    <FaCreditCard />
    Payment Details
  </Link>

</div>
        <div className="profile-wrapper">

          {/* LEFT */}
<div className="services-card">

  <h2>Payment Details</h2>

  <p className="section-desc">
   Add Your bank account details to receive payments from clinets securely
  </p>

  <div className="info-box">

    <FaInfoCircle />

    <div>
      <strong>Important Note</strong>

      <p>
       Ensure the bank details provided are accurate.
  Payments will be processed to this account only.
      </p>
    </div>

  </div>

  <h4 className="service-section-title">
    Bank Acoount Details
   
  </h4>

  {/* SERVICES GRID */}

<div className="vendor-bank-card">

  <h2>
    Bank Account Details
  </h2>

  <p className="vendor-bank-desc">
    Enter your bank account details for receiving payouts.
  </p>

 <div className="vendor-bank-grid">

  <div className="vendor-bank-field">
    <label>Account Holder Name</label>

    <input
      type="text"
      value={bankData.accountHolderName}
      onChange={(e) =>
        setBankData({
          ...bankData,
          accountHolderName:
            e.target.value,
        })
      }
    />
  </div>

  <div className="vendor-bank-field">
    <label>Bank Name</label>

    <select
      value={bankData.bankName}
      onChange={(e) =>
        setBankData({
          ...bankData,
          bankName:
            e.target.value,
        })
      }
    >
      <option value="">
        Select Bank
      </option>

      <option>
        HDFC Bank
      </option>

      <option>
        ICICI Bank
      </option>

      <option>
        SBI
      </option>

      <option>
        Axis Bank
      </option>
    </select>
  </div>

  <div className="vendor-bank-field">
    <label>Account Number</label>

    <input
      type="text"
      value={bankData.accountNumber}
      onChange={(e) =>
        setBankData({
          ...bankData,
          accountNumber:
            e.target.value,
        })
      }
    />
  </div>

  <div className="vendor-bank-field">
    <label>IFSC Code</label>

    <input
      type="text"
      value={bankData.ifscCode}
      onChange={(e) =>
        setBankData({
          ...bankData,
          ifscCode:
            e.target.value,
        })
      }
    />
  </div>

  <div className="vendor-bank-field">
    <label>Account Type</label>

    <select
      value={bankData.accountType}
      onChange={(e) =>
        setBankData({
          ...bankData,
          accountType:
            e.target.value,
        })
      }
    >
      <option>
        Current Account
      </option>

      <option>
        Savings Account
      </option>
    </select>
  </div>

  <div className="vendor-bank-field">
    <label>Branch Name</label>

    <input
      type="text"
      value={bankData.branchName}
      onChange={(e) =>
        setBankData({
          ...bankData,
          branchName:
            e.target.value,
        })
      }
    />
  </div>

  <div className="vendor-bank-field">
    <label>UPI ID (Optional)</label>

    <input
      type="text"
      value={bankData.upiId}
      onChange={(e) =>
        setBankData({
          ...bankData,
          upiId:
            e.target.value,
        })
      }
    />
  </div>

  <div className="vendor-bank-field">
    <label>
      Confirm Account Number
    </label>

    <input
      type="text"
      value={
        bankData.confirmAccountNumber
      }
      onChange={(e) =>
        setBankData({
          ...bankData,
          confirmAccountNumber:
            e.target.value,
        })
      }
    />
  </div>

</div>

{accountError && (
  <p className="account-error">
    {accountError}
  </p>
)}

<div className="bank-success-box">
  ✓ Your bank details are secure and
  will only be used for processing
  payments.
</div>

<div className="additional-payout-box">

  <h3>
    Additional Information
  </h3>

  <div className="additional-grid">

    <div className="vendor-bank-field">

      <label>
        Preferred Payout Method
      </label>

     <div className="radio-group">

  <label className="radio-option">
    <input
      type="radio"
      name="payoutMethod"
      value="NEFT / IMPS"
      checked={
        bankData.preferredPayoutMethod ===
        "NEFT / IMPS"
      }
      onChange={(e) =>
        setBankData({
          ...bankData,
          preferredPayoutMethod:
            e.target.value,
        })
      }
    />

    <span>NEFT / IMPS</span>
  </label>

  <label className="radio-option">
    <input
      type="radio"
      name="payoutMethod"
      value="UPI"
      checked={
        bankData.preferredPayoutMethod ===
        "UPI"
      }
      onChange={(e) =>
        setBankData({
          ...bankData,
          preferredPayoutMethod:
            e.target.value,
        })
      }
    />

    <span>UPI</span>
  </label>

</div>

    </div>

    <div className="vendor-bank-field">

      <label>
        Payout Frequency
      </label>

      <select
        value={
          bankData.payoutFrequency
        }
        onChange={(e) =>
          setBankData({
            ...bankData,
            payoutFrequency:
              e.target.value,
          })
        }
      >
        <option>Weekly</option>
        <option>Monthly</option>
      </select>

    </div>

    <div className="vendor-bank-field">

      <label>
        Minimum Payout Threshold
      </label>

      <input
        type="number"
        value={
          bankData.minimumPayoutThreshold
        }
        onChange={(e) =>
          setBankData({
            ...bankData,
            minimumPayoutThreshold:
              e.target.value,
          })
        }
      />

    </div>

  </div>

  <div className="note-box">
    <strong>Note:</strong>
    Payouts are processed as per the
    selected frequency. You will be
    notified via email once payment
    is initiated.
  </div>

</div>



 



   <div className="service-buttons">
  
      <button className="draft-btn">
        Save as Draft
      </button>
  
       <Link
        //  to="/vendor-dashboard"
         className="save-btn"
         onClick={handleSaveBankDetails}
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

export default VendorPayment;