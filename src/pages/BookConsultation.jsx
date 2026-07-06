import API_URL from "../config";
import { useState, useEffect } from "react";

import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import "./BookConsultation.css";
import {
  FaVideo,
  FaCheckCircle,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaFileUpload,
  FaStickyNote,
  FaCreditCard,
  FaShieldAlt,
  FaHourglassHalf,
  FaPhoneAlt,
  FaLock,
  FaUserCheck,
  FaPaperclip
} from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";


function BookConsultation() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] =
  useState("upi");
const [selectedDate, setSelectedDate] = useState(new Date());
  const { id } = useParams();

  const [vendor, setVendor] =
    useState(null);

  const [step, setStep] =
    useState(1);

  const [consultType, setConsultType] =
    useState("Video Call");

  

  
    const [selectedTime, setSelectedTime] = useState("");

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM"
];

  const [formData, setFormData] =
    useState({
      fullName: "",
      email: "",
      mobile: "",
      purpose: "",
      notes: ""
    });
useEffect(() => {

  if (
    formData.fullName &&
    formData.email &&
    formData.mobile &&
    formData.purpose
  ) {

    setStep(4);

  } else if (
    selectedDate &&
    selectedTime
  ) {

    setStep(3);

  } else if (
    consultType
  ) {

    setStep(2);

  } else {

    setStep(1);

  }

}, [
  consultType,
  selectedDate,
  selectedTime,
  formData.fullName,
  formData.email,
  formData.mobile,
  formData.purpose
]);
  useEffect(() => {
    fetchVendor();
  }, [id]);

  const fetchVendor = async () => {

    try {

      const res =
        await axios.get(
          `${API_URL}/api/vendor/${id}`
        );

      setVendor(
        res.data.vendor
      );

    } catch (error) {

      console.log(error);

    }

  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };

  const nextStep = () => {

    if (step < 4) {

      setStep(step + 1);

    }

  };

  const prevStep = () => {

    if (step > 1) {

      setStep(step - 1);

    }

  };

  const handleBooking = async () => {

    try {

      const payload = {

        vendorId:
          vendor._id,

        vendorName:
          vendor.fullName,

        consultationType:
          consultType,

        appointmentDate:
          selectedDate,

        appointmentTime:
          selectedTime,

        ...formData

      };

      console.log(payload);

      alert(
        "Booking Submitted Successfully"
      );

    } catch (error) {

      console.log(error);

    }

  };
const openRazorpay = async () => {

  try {

    if (!formData.purpose) {

      alert(
        "Please select a service"
      );

      return;

    }

    if (
      !consultationFee ||
      consultationFee < 1
    ) {

      alert(
        "Invalid consultation amount"
      );

      return;

    }

    console.log(
      "Consultation Fee:",
      consultationFee
    );

    const { data } =
      await axios.post(
        `${API_URL}/api/payment/create-order`,
        {
          amount:
            consultationFee
        }
      );

    const options = {

      key:
        "rzp_test_T71LVMkGCB6Mxh",

      amount:
        data.order.amount,

      currency:
        data.order.currency,

      order_id:
        data.order.id,

      name:
        "CA Connect",

      description:
        "Consultation Booking",

      handler:
        async function (
          response
        ) {

          try {

            const token =
              localStorage.getItem(
                "token"
              );

            const storedUser =
              JSON.parse(
                localStorage.getItem(
                  "user"
                )
              );

            // VERIFY PAYMENT + CREATE NOTIFICATION
await axios.post(
  `${API_URL}/api/payment/verify-payment`,
  {

    razorpay_order_id:
      response.razorpay_order_id,

    razorpay_payment_id:
      response.razorpay_payment_id,

    razorpay_signature:
      response.razorpay_signature,

    userId:
      storedUser._id,

    vendorId:
      vendor._id,

    amount:
      consultationFee

  }
);

            // SAVE CONSULTATION

            const bookingRes =
              await axios.post(
                `${API_URL}/api/consultations/book`,
                {

                  userId:
                    storedUser._id,

                  vendorId:
                    vendor._id,

                  serviceName:
                    formData.purpose,

                  appointmentDate:
                    selectedDate,

                  startTime:
                    selectedTime,

                  mode:
                    "video",

                  amount:
                    consultationFee,

                  paymentMethod,

                  paymentId:
                    response.razorpay_payment_id,

                  razorpayOrderId:
                    response.razorpay_order_id,

                  paymentStatus:
                    "paid",

                  notes:
                    formData.notes

                },
                {
                  headers: {
                    Authorization:
                      `Bearer ${token}`
                  }
                }
              );

            console.log(
              "Consultation Saved:",
              bookingRes.data
            );

            alert(
              "Booking Successful"
            );

            navigate(
              "/user-appointments"
            );

          }
          catch (
            error
          ) {

            console.log(
              "Booking Error:",
              error.response?.data ||
              error.message
            );

          }

        },

      prefill: {

        name:
          formData.fullName,

        email:
          formData.email,

        contact:
          formData.mobile

      },

      theme: {
        color:
          "#2563eb"
      }

    };

    const razorpay =
      new window.Razorpay(
        options
      );

    razorpay.open();

  }
  catch (err) {

    console.log(
      "Razorpay Error:",
      err
    );

  }

};
  if (!vendor) {

    return (
      <div>
        Loading...
      </div>
    );

  }
const selectedService =
  vendor?.services?.find(
    (service) =>
      service.serviceName ===
      formData.purpose
  );

const consultationFee =
  selectedService?.price || 0;
  return (
    <>
    <div className="consultation-header">

  <div className="consultation-breadcrumb">

    <span>Home</span>
    <span>›</span>

    <span>Services</span>
    <span>›</span>

    <span>
      {vendor?.services?.[0]?.serviceName ||
        "CA Services"}
    </span>

    <span>›</span>

    <span>
      CA Professionals in {
        vendor?.city || "India"
      }
    </span>

    <span>›</span>

    <span>
      {vendor?.fullName}
    </span>

    <span>›</span>

    <span className="active-breadcrumb">
      Book a Consultation
    </span>

  </div>

  <h1 className="consultation-title">

    Book a Consultation with

    <span>
      {" "}
      {vendor?.fullName}
    </span>

  </h1>

  <p className="consultation-subtitle">

    Schedule a one-to-one virtual
    consultation at your convenience.

  </p>

</div>

    

<div className="consult-stepper">

  <div
    className={`consult-step ${
      step >= 1 ? "active" : ""
    }`}
  >
    <div className="consult-step-circle">
      1
    </div>

    <h4>
      Consultation Type
    </h4>

    <p>
      Select consultation type
    </p>
  </div>

  <div
    className={`consult-line ${
      step >= 2 ? "active" : ""
    }`}
  ></div>

  <div
    className={`consult-step ${
      step >= 2 ? "active" : ""
    }`}
  >
    <div className="consult-step-circle">
      2
    </div>

    <h4>
      Choose Date & Time
    </h4>

    <p>
      Select your preferred slot
    </p>
  </div>

  <div
    className={`consult-line ${
      step >= 3 ? "active" : ""
    }`}
  ></div>

  <div
    className={`consult-step ${
      step >= 3 ? "active" : ""
    }`}
  >
    <div className="consult-step-circle">
      3
    </div>

    <h4>
      Your Details
    </h4>

    <p>
      Provide your details
    </p>
  </div>

  <div
    className={`consult-line ${
      step >= 4 ? "active" : ""
    }`}
  ></div>

  <div
    className={`consult-step ${
      step >= 4 ? "active" : ""
    }`}
  >
    <div className="consult-step-circle">
      4
    </div>

    <h4>
      Confirm & Payment
    </h4>

    <p>
      Review and pay
    </p>
  </div>

</div>




<div className="bookconsult-layout">

  {/* LEFT SIDE */}

  <div className="bookconsult-left">

   
     <div className="bc-card">

  <h3>
    1. Consultation Type
  </h3>

  <p>
    Select the mode of consultation.
  </p>

  <div
    className="bc-consult-option"
    onClick={() =>
      setConsultType(
        "Virtual Meeting"
      )
    }
  >

    <div className="bc-consult-icon">
      <FaVideo />
    </div>

    <div className="bc-consult-content">

      <h4>
        Virtual Meeting
      </h4>

      <span>
        Consult online via Google Meet / Zoom
      </span>

    </div>

    <FaCheckCircle className="bc-selected-icon" />

  </div>

</div>


    <div className="bc-card">

  <h3>
    2. Choose Date & Time
  </h3>

  <p>
    Select a convenient date and time slot.
  </p>

  <div className="bc-datetime-grid">

     <div className="bc-calendar-box">
    <Calendar
      onChange={setSelectedDate}
      value={selectedDate}
    />
  </div>

  <div className="bc-times-grid">
    {timeSlots.map((time) => (
      <button
        key={time}
        className={
          selectedTime === time
            ? "bc-time-btn active"
            : "bc-time-btn"
        }
        onClick={() => setSelectedTime(time)}
      >
        {time}
      </button>
    ))}
  </div>


{/* 
    <div className="bc-times-grid">

      {[
        "09:00 AM",
        "09:30 AM",
        "10:00 AM",
        "10:30 AM",
        "11:00 AM",
        "11:30 AM",
        "12:00 PM",
        "12:30 PM",
        "01:00 PM",
        "02:00 PM",
        "02:30 PM",
        "03:00 PM",
        "04:00 PM",
        "04:30 PM",
        "05:00 PM",
        "05:30 PM"
      ].map((time) => (

        <button
          key={time}
          className={
            selectedTime === time
              ? "bc-time-btn active"
              : "bc-time-btn"
          }
          onClick={() =>
            setSelectedTime(time)
          }
        >
          {time}
        </button>

      ))}

    </div> */}

  </div>

</div>
   

     <div className="bc-card">

  <h3>
    3. Your Details & Additional Details
  </h3>

  <p>
    Please provide your details.
  </p>

  <div className="bc-form-grid">

    <div className="bc-input-group">

      <FaUser />

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
      />

    </div>

    <div className="bc-input-group">

      <FaEnvelope />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
      />

    </div>

    <div className="bc-input-group">

      <FaPhoneAlt />

      <input
        type="text"
        name="mobile"
        placeholder="Mobile Number"
        value={formData.mobile}
        onChange={handleChange}
      />

    </div>
<select
  name="purpose"
  value={formData.purpose}
  onChange={handleChange}
>

  <option value="">
    Select Purpose
  </option>

  {vendor?.services?.map((service) => (

    <option
      key={service._id}
      value={service.serviceName}
    >
      {service.serviceName}
    </option>

  ))}

</select>

  </div>

  <textarea
    rows="5"
    name="notes"
    placeholder="Tell us about your query"
    value={formData.notes}
    onChange={handleChange}
  ></textarea>



    

 <div className="bc-upload-section">

  <label>
    Upload Documents (Optional)
  </label>

  <div className="bc-upload-box">

    <FaFileUpload
      className="bc-upload-icon"
    />

    <div>

      <p>
        Drag & drop files or
        <span> browse</span>
      </p>

      <small>
        PDF, JPG, PNG
        (Max. 5MB each)
      </small>

    </div>

    <input
      type="file"
      multiple
      className="bc-file-input"
    />

  </div>

</div>


<div className="bc-notes-section">

  <label>
    Additional Notes (Optional)
  </label>

  <textarea
    rows="4"
    maxLength="500"
    placeholder="Type your notes here..."
    name="notes"
    value={formData.notes}
    onChange={handleChange}
  />

  <span className="bc-char-count">
    {formData.notes.length}/500
  </span>

</div>
</div>

<div className="bc-card">

  <h3>4. Confirm & Payment</h3>

  <p>
    Review your booking details and complete payment.
  </p>

  <div className="bc-payment-summary">

    <div>
      <span>Consultation Fee</span>

      <strong>
        ₹ {consultationFee}
      </strong>
    </div>

  </div>

  <div className="bc-secure-box">
    <FaShieldAlt />

    <div>
      <h4>100% Secure Checkout</h4>
      <span>
        Your payment is safe and encrypted.
      </span>
    </div>
  </div>

  <h4 className="bc-payment-title">
    Select Payment Method
  </h4>

  <div className="bc-payment-methods">

    <div
      className={`bc-payment-option ${
        paymentMethod === "upi"
          ? "active"
          : ""
      }`}
      onClick={() =>
        setPaymentMethod("upi")
      }
    >
      <input
        type="radio"
        checked={
          paymentMethod === "upi"
        }
        readOnly
      />

      <div>
        <h5>UPI</h5>
        <span>
          Pay using any UPI app
        </span>
      </div>
    </div>

    <div
      className={`bc-payment-option ${
        paymentMethod === "card"
          ? "active"
          : ""
      }`}
      onClick={() =>
        setPaymentMethod("card")
      }
    >
      <input
        type="radio"
        checked={
          paymentMethod === "card"
        }
        readOnly
      />

      <div>
        <h5>Credit / Debit Card</h5>
        <span>
          Visa, MasterCard
        </span>
      </div>
    </div>

    <div
      className={`bc-payment-option ${
        paymentMethod ===
        "netbanking"
          ? "active"
          : ""
      }`}
      onClick={() =>
        setPaymentMethod(
          "netbanking"
        )
      }
    >
      <input
        type="radio"
        checked={
          paymentMethod ===
          "netbanking"
        }
        readOnly
      />

      <div>
        <h5>Net Banking</h5>
        <span>
          Pay using your bank
        </span>
      </div>
    </div>

  </div>

  <button
    className="bc-pay-btn"
    onClick={openRazorpay}
  >
    <FaLock />

    Pay ₹ {consultationFee}
    & Confirm Booking
  </button>

</div>

    

  </div>

  {/* RIGHT SIDE */}

 <div className="bookconsult-right">

  {/* Professional Card */}

  <div className="bc-side-card">

    <h4>
      Professional
    </h4>

    <div className="bc-vendor-top">

      <img
        src={
          vendor?.photo
            ? `${API_URL}/uploads/${vendor.photo}`
            : "/avatar.png"
        }
        alt={vendor?.fullName}
        className="bc-vendor-img"
      />

      <div className="bc-vendor-info">

        <h3>

          {vendor?.fullName}

          {vendor?.isVerified && (
            <FaCheckCircle
              className="bc-blue-tick"
            />
          )}

        </h3>

        <p>
          {vendor?.qualification}
        </p>

        <p>
          {vendor?.services?.[0]
            ?.serviceName}
        </p>

        <div className="bc-rating">

          ⭐ 4.9

          <span>
            (128 Reviews)
          </span>

        </div>

      </div>

    </div>

    <div className="bc-badges">

      <span>
        Verified CA
      </span>

      <span>
        {vendor?.experience}
        + Years Exp.
      </span>

    </div>

  </div>

  {/* Consultation Summary */}

  <div className="bc-side-card">

    <h4>
      Consultation Summary
    </h4>

    <div className="bc-summary-row">

      <FaVideo />

      <div>

        <span>
          Type
        </span>

        <strong>
          {consultType}
        </strong>

      </div>

    </div>

    <div className="bc-summary-row">

      <FaCalendarAlt />

      <div>

        <span>
          Date
        </span>

      <strong>
  {selectedDate
    ? selectedDate.toLocaleDateString("en-IN")
    : "Not Selected"}
</strong>

      </div>

    </div>

    <div className="bc-summary-row">

      <FaClock />

      <div>

        <span>
          Time
        </span>

        <strong>
          {selectedTime ||
            "Not Selected"}
        </strong>

      </div>

    </div>
    <div className="bc-summary-row">

  <FaHourglassHalf />

  <div>

    <span>
      Duration
    </span>

    <strong>
      30 Minutes
    </strong>

  </div>

</div>

    <div className="bc-summary-row">

      <FaCreditCard />

      <div>

        <span>
          Consultation Fee
        </span>

        <strong>

          
         ₹{consultationFee}

        </strong>

      </div>

    </div>

  </div>

  {/* Why Book Consultation */}

<div className="bc-side-card">

  <h4>
    Why Book a Consultation?
  </h4>

  <ul className="bc-benefits">

    <li>
      <FaCheckCircle />
      Get expert advice for your query
    </li>

    <li>
      <FaCheckCircle />
      One-to-one session with{" "}
      <strong>
        {vendor?.fullName}
      </strong>
    </li>

    <li>
      <FaCheckCircle />
      Clear solutions tailored to your needs
    </li>

    <li>
      <FaCheckCircle />
      Secure & confidential discussion
    </li>

  </ul>

</div>

  {/* Need Help */}

  <div className="bc-side-card">

    <h4>
      Need Help?
    </h4>

    <p className="bc-help-text">
      Our support team is available
      Monday - Saturday.
    </p>

    <div className="bc-help-row">

      <FaPhone />

      <span>

        {vendor?.officeMobile ||
          "+91 9876543210"}

      </span>

    </div>

    <div className="bc-help-row">

      <FaEnvelope />

      <span>

        {vendor?.officeEmail ||
          "support@example.com"}

      </span>

    </div>

  </div>

</div>

</div>


<div className="consult-trust-strip">

  <div className="consult-trust-item">
    <FaShieldAlt className="consult-trust-icon" />
    <span>Trusted by 10,000+ Clients</span>
  </div>

  <div className="consult-trust-item">
    <FaUserCheck className="consult-trust-icon" />
    <span>Verified CA Professionals</span>
  </div>

  <div className="consult-trust-item">
    <FaLock className="consult-trust-icon" />
    <span>100% Secure & Confidential</span>
  </div>

  <div className="consult-trust-item">
    <FaPaperclip className="consult-trust-icon" />
    <span>Quick & Easy Booking</span>
  </div>

</div>
</>
    
  );
}

export default BookConsultation;