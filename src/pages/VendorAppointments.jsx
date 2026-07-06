import React,{
  useEffect,
  useState
} from "react";

import axios from "axios";

import API_URL from "../config";

import Sidebar from "../components/Sidebar";

import "./VendorAppointments.css";

import {useNavigate}
from "react-router-dom";

import {
   FaSearch,
  FaBell,
  FaRegCommentDots,
  FaEye,
  FaEllipsisV,
  FaFilter,
  FaVideo,
  FaPhoneAlt,
  FaMapMarkerAlt
} from "react-icons/fa";


const VendorAppointments = ()=>{

const navigate =
useNavigate();

const [appointments,
setAppointments] =
useState([]);

const [counts,
setCounts] =
useState({});

const [vendor,
setVendor] =
useState(null);

const [loading,
setLoading] =
useState(true);

const [search,
setSearch] =
useState("");

const [service,
setService] =
useState("");

const [status,
setStatus] =
useState("");

const [dateRange,
setDateRange] =
useState("");

const [showAvailability,
setShowAvailability] =
useState(false);

useEffect(()=>{

 fetchAppointments();

},[]);


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

const fetchAppointments =
async()=>{

 try{

   const vendorId =
   localStorage.getItem(
     "vendorId"
   );

   const res =
   await axios.get(
   `${API_URL}/api/vendor/appointments/${vendorId}`
   );
console.log(res.data);
   setAppointments(
     res.data.appointments
   );

   setCounts(
     res.data.counts
   );

   setVendor(
     res.data.vendor
   );

 }catch(err){

   console.log(err);

 }finally{

   setLoading(false);

 }

};















return(

<div className="vendorappointments-layout">

<Sidebar/>

<div className="vendorappointments-main">

{/* HEADER */}

<div className="vendorappointments-header">

<div className="vendorappointments-left">

<h1>
Appointments
</h1>

<p>
Home /
Appointments
</p>

</div>

<div className="vendorappointments-right">

<div className="vendorappointments-search">

<FaSearch/>

<input
type="text"
placeholder="Search appointments..."
value={search}
onChange={(e)=>
setSearch(
e.target.value
)}
/>

</div>

<button
className="vendorappointments-icon-btn"
>
<FaRegCommentDots/>
</button>

<button
className="vendorappointments-icon-btn"
>
<FaBell/>
</button>

<div
className="vendorappointments-profile"
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
    cursor:"pointer"
  }}
/>

<div>

  <h4>
      {
        vendor?.fullName ||
        vendor?.name ||
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
<div className="vendorappointments-tabs">

<div className="appt-tab active">
All
<span>
{counts.all || 0}
</span>
</div>

<div className="appt-tab">
Upcoming
<span>
{counts.upcoming || 0}
</span>
</div>

<div className="appt-tab">
Today
<span>
{counts.today || 0}
</span>
</div>

<div className="appt-tab">
Completed
<span>
{counts.completed || 0}
</span>
</div>

<div className="appt-tab">
Cancelled
<span>
{counts.cancelled || 0}
</span>
</div>

<div className="appt-tab">
No Show
<span>
{counts.noShow || 0}
</span>
</div>

</div>
<div className="vendorappointments-filters">

<div className="vendorappointments-searchbar">

<FaSearch/>

<input
type="text"
placeholder="Search by client name or service"
/>

</div>

<select>
<option>
All Services
</option>
</select>

<select>
<option>
All Status
</option>
</select>

<input
type="date"
/>

<button
className="vendorappointments-filter-btn"
>
<FaFilter/>
Filters
</button>

</div>
<div
className="vendorappointments-banner"
>

<p>
Let clients book appointments
with you by setting your
availability.
</p>

<button
onClick={()=>
navigate(
"/vendor-availability"
)
}
>
Set Availability
</button>

</div>
<div
className="vendorappointments-table-card"
>

<table
className="vendorappointments-table"
>

<thead>

<tr>

<th>
Client / Service
</th>

<th>
Date & Time
</th>

<th>
Mode
</th>

<th>
Status
</th>

<th>
Amount
</th>

<th>
Actions
</th>

</tr>

</thead>

<tbody>

{
appointments?.length > 0
?

appointments.map((item)=>(

<tr key={item._id}>

  {/* CLIENT / SERVICE */}

  <td>

    <div className="client-box">

      {
        item.userId?.photo
        ? (
          <img
            src={`${API_URL}/uploads/${item.userId.photo}`}
            alt=""
          />
        )
        : (
          <div className="client-avatar">

            {
              (
                item.userId?.fullName ||
                item.userId?.name ||
                item.customerName ||
                "C"
              )
              .charAt(0)
              .toUpperCase()
            }

          </div>
        )
      }

      <div className="client-details">

        <h4>

          {
            item.userId?.fullName ||
            item.userId?.name ||
            item.customerName ||
            "Customer"
          }

        </h4>

        <p>

          {
            item.serviceName ||
            "Consultation"
          }

        </p>

        <small>

          ID:
          {
            item.consultationId ||
            item.bookingId ||
            `APT-${item._id
              .slice(-6)
              .toUpperCase()}`
          }

        </small>

      </div>

    </div>

  </td>


  {/* DATE & TIME */}

  <td>

    <h4>

      {
        new Date(
          item.appointmentDate
        ).toLocaleDateString(
          "en-IN",
          {
            day:"2-digit",
            month:"short",
            year:"numeric"
          }
        )
      }

    </h4>

    <p>

      {
        item.startTime ||
        "10:00 AM"
      }

    </p>

    <small>

      ID:
      {
        item.consultationId ||
        item.bookingId ||
        `APT-${item._id
          .slice(-6)
          .toUpperCase()}`
      }

    </small>

  </td>


  {/* MODE */}

  <td>

  <div className="appointment-mode">

  {
    item.mode === "video"
    ? (
      <>
        <FaVideo />
        Video Call
      </>
    )
    : item.mode === "phone"
    ? (
      <>
        <FaPhoneAlt />
        Phone Call
      </>
    )
    : (
      <>
        <FaMapMarkerAlt />
        In Person
      </>
    )
  }

</div>

  </td>


  {/* STATUS */}

  <td>

    <span
      className={`status-badge ${
        item.status
      }`}
    >

      {
        item.status ||
        "Upcoming"
      }

    </span>

  </td>


  {/* AMOUNT */}

  <td>

    <h4>

      ₹{
        Number(
          item.amount || 0
        ).toLocaleString()
      }

    </h4>

    <p>

      {
        item.paymentStatus ||
        "Pending"
      }

    </p>

  </td>


  {/* ACTIONS */}

  <td>

    <div className="action-buttons">

      <button>

        <FaEye/>

      </button>

      <button>

        <FaEllipsisV/>

      </button>

    </div>

  </td>

</tr>

))

:

<tr>

  <td
    colSpan="6"
    style={{
      textAlign:"center",
      padding:"40px"
    }}
  >

    No appointments found

  </td>

</tr>

}

</tbody>

</table>

</div>
</div>
</div>
);

};

export default
VendorAppointments;