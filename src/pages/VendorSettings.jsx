import React,{
useEffect,
useState
} from "react";

import axios from "axios";

import API_URL from "../config";

import Sidebar from "../components/Sidebar";

import "./VendorSettings.css";

import {
FaBell,
FaRegCommentDots,
FaCog,
FaShieldAlt,
FaLock,
FaSearch,
} from "react-icons/fa";

import {
useNavigate
} from "react-router-dom";
const VendorSettings = ()=>{
    const navigate =
useNavigate();


const [activeTab,setActiveTab] =
useState("general");

const [vendor,
setVendor] =
useState(null);

const [loading,
setLoading] =
useState(true);

const [formData,
setFormData] =
useState({
businessName:"",
businessEmail:"",
phone:"",
businessAddress:"",
city:"",
state:"",
pinCode:"",
timeZone:"Asia/Kolkata",
dateFormat:"DD/MM/YYYY",
timeFormat:"12 Hour",

emailNotifications:{
newLead:true,
appointmentBooked:true,
appointmentReminder:true,
paymentReceived:true,
systemUpdates:true
},

smsNotifications:{
newLead:true,
appointmentBooked:true,
appointmentReminder:true,
paymentReceived:false
},

security:{
twoFactorEnabled:false,
loginAlerts:true
}
});

const [passwordData,
setPasswordData] =
useState({
currentPassword:"",
newPassword:"",
confirmPassword:""
});
useEffect(()=>{

fetchSettings();

},[]);
const fetchSettings =
async()=>{

try{

const token =
localStorage.getItem(
"vendorToken"
);

const res =
await axios.get(
`${API_URL}/api/vendor/settings`,
{
headers:{
Authorization:
`Bearer ${token}`
}
}
);


const vendor =
res.data.vendor;

setVendor(vendor);

setFormData({
  businessName:
    vendor.businessName ||
    vendor.firmName ||
    vendor.fullName ||
    "",

  businessEmail:
    vendor.businessEmail ||
    vendor.officeEmail ||
    vendor.email ||
    "",

  phone:
    vendor.officeMobile ||
    vendor.mobile ||
    vendor.contactNumber ||
    "",

  businessAddress:
    vendor.businessAddress ||
    vendor.addressLine1 ||
    "",

  city:
    vendor.city || "",

  state:
    vendor.state || "",

  pinCode:
    vendor.pincode || "",

  timeZone:
    vendor.timeZone ||
    "Asia/Kolkata",

  dateFormat:
    vendor.dateFormat ||
    "DD/MM/YYYY",

  timeFormat:
    vendor.timeFormat ||
    "12 Hour",

  emailNotifications:
    vendor.emailNotifications || {
      newLead:true,
      appointmentBooked:true,
      appointmentReminder:true,
      paymentReceived:true,
      systemUpdates:true
    },

  smsNotifications:
    vendor.smsNotifications || {
      newLead:true,
      appointmentBooked:true,
      appointmentReminder:true,
      paymentReceived:false
    },

  security:
    vendor.security || {
      twoFactorEnabled:false,
      loginAlerts:true
    }
});

}catch(err){

console.log(err);

}finally{

setLoading(false);

}

};








const handleChange = (e) => {

setFormData({

...formData,

[e.target.name]:
e.target.value

});

};






const saveSettings =
async()=>{

try{

const token =
localStorage.getItem(
"vendorToken"
);

await axios.put(
`${API_URL}/api/vendor/settings`,
formData,
{
headers:{
Authorization:
`Bearer ${token}`
}
}
);

alert(
"Settings Updated Successfully"
);

}catch(err){

console.log(err);

alert(
"Failed to Save Settings"
);

}

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

localStorage.removeItem(
"vendor"
);

navigate(
"/login"
);

};




const changePassword = async()=>{

  try{

    const token =
      localStorage.getItem(
        "vendorToken"
      );

    const res =
    await axios.put(
      `${API_URL}/api/vendor/settings/change-password`,
      passwordData,
      {
        headers:{
          Authorization:
          `Bearer ${token}`
        }
      }
    );

    alert(
      res.data.message
    );

    setPasswordData({
      currentPassword:"",
      newPassword:"",
      confirmPassword:""
    });

  }catch(err){

    alert(
      err.response?.data?.message ||
      "Something went wrong"
    );

  }

};








if(loading){
  return (
    <div>
      Loading...
    </div>
  );
}










return(

<div className="vendorsettings-layout">

<Sidebar/>

<div className="vendorsettings-main">
    <div className="vendorsettings-header">

<div>

<h1>
Settings
</h1>

<p>
Home / Settings
</p>

</div>

<div className="vendorsettings-header-right">



  <div className="vendorsettings-search-box">

  <input
    type="text"
    placeholder="Search settings..."
  />

  <FaSearch className="vendorsettings-search-icon"/>

</div>

<button className="settings-icon">
<FaRegCommentDots/>
</button>

<button className="settings-icon">
<FaBell/>
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
    cursor:"pointer"
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


<div className="vendorsettings-tabs-wrapper">

  <button
    className={`vendorsetings-tab-btn ${
      activeTab === "general"
        ? "vendorsettings-tab-active"
        : ""
    }`}
    onClick={()=>
      setActiveTab("general")
    }
  >
    General Settings
  </button>

  <button
    className={`vendorsetings-tab-btn ${
      activeTab === "notification"
        ? "vendorsettings-tab-active"
        : ""
    }`}
    onClick={()=>
      setActiveTab("notification")
    }
  >
    Notification Settings
  </button>

  <button
    className={`vendorsetings-tab-btn ${
      activeTab === "security"
        ? "vendorsettings-tab-active"
        : ""
    }`}
    onClick={()=>
      setActiveTab("security")
    }
  >
    Security Settings
  </button>

  <button
    className={`vendorsetings-tab-btn ${
      activeTab === "password"
        ? "vendorsettings-tab-active"
        : ""
    }`}
    onClick={()=>
      setActiveTab("password")
    }
  >
    Change Password
  </button>

</div>



<div className="vendorsettings-card">

<div className="vendorsettings-left">

<div className="vendorsettings-icon">
<FaCog/>
</div>

<div>

<h3>
General Settings
</h3>

<p>
Manage your business information,
contact details and preferences.
</p>

</div>

</div>

<div className="vendorsettings-right">

<h3 className="business-title">
Business Information
</h3>

<div className="vendorsettings-grid">

<div className="vendorsettings-field">
<label>
Business Name
</label>

<input
type="text"
name="businessName"
value={formData.businessName}
onChange={handleChange}
/>
</div>

<div className="vendorsettings-field">
<label>
Business Email
</label>

<input
type="email"
name="businessEmail"
value={formData.businessEmail}
onChange={handleChange}
/>
</div>

<div className="vendorsettings-field">
<label>
Phone Number
</label>

<input
type="text"
name="phone"
value={formData.phone}
onChange={handleChange}
/>
</div>

<div className="vendorsettings-field vendorsettings-full">
<label>
Business Address
</label>

<input
type="text"
name="businessAddress"
value={formData.businessAddress}
onChange={handleChange}
/>
</div>

<div className="vendorsettings-field">
<label>
City
</label>

<input
type="text"
name="city"
value={formData.city}
onChange={handleChange}
/>
</div>

<div className="vendorsettings-field">
<label>
State
</label>

<input
type="text"
name="state"
value={formData.state}
onChange={handleChange}
/>
</div>

<div className="vendorsettings-field">
<label>
PIN Code
</label>

<input
type="text"
name="pinCode"
value={formData.pinCode}
onChange={handleChange}
/>
</div>

<div className="vendorsettings-field">
<label>
Time Zone
</label>

<select
name="timeZone"
value={formData.timeZone}
onChange={handleChange}
>
<option>
Asia/Kolkata
</option>

<option>
Asia/Dubai
</option>

<option>
Europe/London
</option>

</select>
</div>

<div className="vendorsettings-field">
<label>
Date Format
</label>

<select
name="dateFormat"
value={formData.dateFormat}
onChange={handleChange}
>

<option>
DD/MM/YYYY
</option>

<option>
MM/DD/YYYY
</option>

<option>
YYYY-MM-DD
</option>

</select>

</div>

<div className="vendorsettings-field">
<label>
Time Format
</label>

<select
name="timeFormat"
value={formData.timeFormat}
onChange={handleChange}
>

<option>
12 Hour
</option>

<option>
24 Hour
</option>

</select>

</div>

</div>

<button
className="vendorsettings-save-btn"
onClick={saveSettings}
>

Save Changes

</button>

</div>

</div>








<div className="vendorsettings-section-card">

  <div className="vendorsettings-side-info">

    <div className="vendorsettings-side-icon">
      <FaBell/>
    </div>

    <div>
      <h3>Notification Settings</h3>

      <p>
        Choose how you want to receive
        notifications and stay updated.
      </p>
    </div>

  </div>

  <div className="vendorsettings-section-content">

    <div className="notification-wrapper">

      {/* EMAIL */}

      <div className="notification-column">

        <h4>Email Notifications</h4>

        <p>
          Receive email notifications for important updates.
        </p>

        <label>
          <input
            type="checkbox"
            checked={formData.emailNotifications?.newLead}
            onChange={(e)=>
              setFormData({
                ...formData,
                emailNotifications:{
                  ...formData.emailNotifications,
                  newLead:e.target.checked
                }
              })
            }
          />
          New Lead Received
        </label>

        <label>
          <input
            type="checkbox"
            checked={formData.emailNotifications?.appointmentBooked}
            onChange={(e)=>
              setFormData({
                ...formData,
                emailNotifications:{
                  ...formData.emailNotifications,
                  appointmentBooked:e.target.checked
                }
              })
            }
          />
          Appointment Booked
        </label>

        <label>
          <input
            type="checkbox"
            checked={formData.emailNotifications?.appointmentReminder}
            onChange={(e)=>
              setFormData({
                ...formData,
                emailNotifications:{
                  ...formData.emailNotifications,
                  appointmentReminder:e.target.checked
                }
              })
            }
          />
          Appointment Reminder
        </label>

        <label>
          <input
            type="checkbox"
            checked={formData.emailNotifications?.paymentReceived}
            onChange={(e)=>
              setFormData({
                ...formData,
                emailNotifications:{
                  ...formData.emailNotifications,
                  paymentReceived:e.target.checked
                }
              })
            }
          />
          Payment Received
        </label>

        <label>
          <input
            type="checkbox"
            checked={formData.emailNotifications?.systemUpdates}
            onChange={(e)=>
              setFormData({
                ...formData,
                emailNotifications:{
                  ...formData.emailNotifications,
                  systemUpdates:e.target.checked
                }
              })
            }
          />
          System Updates
        </label>

      </div>

      {/* SMS */}

      <div className="notification-column">

        <h4>SMS Notifications</h4>

        <p>
          Receive SMS notifications for important updates.
        </p>

        <label>
          <input
            type="checkbox"
            checked={formData.smsNotifications?.newLead}
            onChange={(e)=>
              setFormData({
                ...formData,
                smsNotifications:{
                  ...formData.smsNotifications,
                  newLead:e.target.checked
                }
              })
            }
          />
          New Lead Received
        </label>

        <label>
          <input
            type="checkbox"
            checked={formData.smsNotifications?.appointmentBooked}
            onChange={(e)=>
              setFormData({
                ...formData,
                smsNotifications:{
                  ...formData.smsNotifications,
                  appointmentBooked:e.target.checked
                }
              })
            }
          />
          Appointment Booked
        </label>

        <label>
          <input
            type="checkbox"
            checked={formData.smsNotifications?.appointmentReminder}
            onChange={(e)=>
              setFormData({
                ...formData,
                smsNotifications:{
                  ...formData.smsNotifications,
                  appointmentReminder:e.target.checked
                }
              })
            }
          />
          Appointment Reminder
        </label>

        <label>
          <input
            type="checkbox"
            checked={formData.smsNotifications?.paymentReceived}
            onChange={(e)=>
              setFormData({
                ...formData,
                smsNotifications:{
                  ...formData.smsNotifications,
                  paymentReceived:e.target.checked
                }
              })
            }
          />
          Payment Received
        </label>

      </div>

    </div>

    <button
      className="notification-save-btn"
      onClick={saveSettings}
    >
      Save Changes
    </button>

  </div>

</div>







<div className="vendorsettings-section-card">

  <div className="vendorsettings-side-info">

    <div className="vendorsettings-side-icon">
      <FaShieldAlt/>
    </div>

    <div>
      <h3>Security Settings</h3>

      <p>
        Manage your account security and access preferences.
      </p>
    </div>

  </div>

  <div className="vendorsettings-section-content">

    {/* 2FA */}
<div className="security-row">

  <div className="security-left">
    <h4>Two-Factor Authentication</h4>
    <p>Require OTP verification during login.</p>
  </div>

  <label className="switch">
    <input
      type="checkbox"
      checked={formData.security?.twoFactorEnabled}
      onChange={(e)=>
        setFormData({
          ...formData,
          security:{
            ...formData.security,
            twoFactorEnabled:e.target.checked
          }
        })
      }
    />
    <span className="slider"></span>
  </label>

</div>

<div className="security-row">

  <div className="security-left">
    <h4>Login Alerts</h4>
    <p>
      Get notified about new logins to your account.
    </p>
  </div>

  <label className="switch">
    <input
      type="checkbox"
      checked={formData.security?.loginAlerts}
      onChange={(e)=>
        setFormData({
          ...formData,
          security:{
            ...formData.security,
            loginAlerts:e.target.checked
          }
        })
      }
    />
    <span className="slider"></span>
  </label>

</div>

<button
  className="notification-save-btn"
  onClick={saveSettings}
>
  Save Changes
</button>

    

  </div>

</div>









<div className="vendorsettings-section-card">

<div className="vendorsettings-side-info">

<div className="vendorsettings-side-icon">
<FaLock/>
</div>

<div>

<h3>
Change Password
</h3>

<p>
Update your password to keep your account secure.
</p>

</div>

</div>

<div className="vendorsettings-section-content">

<div className="password-grid">

<input
type="password"
placeholder="Current Password"
value={
passwordData.currentPassword
}
onChange={(e)=>
setPasswordData({
...passwordData,
currentPassword:
e.target.value
})
}
/>

<input
type="password"
placeholder="New Password"
value={
passwordData.newPassword
}
onChange={(e)=>
setPasswordData({
...passwordData,
newPassword:
e.target.value
})
}
/>

<input
type="password"
placeholder="Confirm New Password"
value={
passwordData.confirmPassword
}
onChange={(e)=>
setPasswordData({
...passwordData,
confirmPassword:
e.target.value
})
}
/>

</div>

<button
className="password-update-btn"
onClick={
changePassword
}
>
Update Password
</button>

</div>

</div>





















</div>   
</div>   

);

};      

export default VendorSettings;