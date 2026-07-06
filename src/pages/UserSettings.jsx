import API_URL from "../config";
import "./UserSettings.css";

import React,{
  useEffect,
  useState
} from "react";

import axios from "axios";

import UserSidebar from "../components/UserSidebar";

import {
  FaSearch,
  FaBell,
  FaRegCommentDots,
  FaCreditCard,
  FaWallet,
  FaEnvelope,
  FaLock,
  FaShieldAlt,
  FaFileInvoice,
  FaDownload,
  
} from "react-icons/fa";

function UserSettings(){

const [user,setUser] =
useState({});

const [payments,setPayments] =
useState([]);

const [activeMenu,setActiveMenu] =
useState("payment");



const fetchUserProfile =
async()=>{

try{

const token =
localStorage.getItem(
"token"
);

const res =
await axios.get(
`${API_URL}/api/users/profile`,
{
headers:{
Authorization:
`Bearer ${token}`
}
}
);

setUser(
res.data.user
);

}
catch(error){
console.log(error);
}

};





const fetchPayments =
async(userId)=>{

try{

const token =
localStorage.getItem(
"token"
);

const res =
await axios.get(
`${API_URL}/api/payments/user/${userId}`,
{
headers:{
Authorization:
`Bearer ${token}`
}
}
);

setPayments(
res.data.payments ||
[]
);

}
catch(error){

console.log(error);

setPayments([]);

}

};









const [passwordData,setPasswordData] =
useState({
currentPassword:"",
newPassword:"",
confirmPassword:""
});

const [privacySettings,setPrivacySettings] =
useState({
profileVisibility:"all",
dataSharing:true,
activityTracking:true,
marketingCommunications:false
});


const handlePasswordChange = (e)=>{
setPasswordData({
...passwordData,
[e.target.name]:e.target.value
});
};

const handlePrivacyChange = (key,value)=>{
setPrivacySettings(prev=>({
...prev,
[key]:value
}));
};




const handleEmailToggle =
async(key,value)=>{

try{

const token =
localStorage.getItem(
"token"
);

await axios.put(
`${API_URL}/api/users/email-preferences`,
{
key,
value
},
{
headers:{
Authorization:
`Bearer ${token}`
}
}
);

setUser(prev=>({
...prev,
emailPreferences:{
...prev.emailPreferences,
[key]:value
}
}));

}
catch(error){

console.log(error);

}

};



const handleNotificationToggle =
async(key,value)=>{

try{

const token =
localStorage.getItem(
"token"
);

await axios.put(
`${API_URL}/api/users/notification-preferences`,
{
key,
value
},
{
headers:{
Authorization:
`Bearer ${token}`
}
}
);

setUser(prev=>({
...prev,
notificationPreferences:{
...prev.notificationPreferences,
[key]:value
}
}));

}
catch(error){

console.log(error);

}

};









const updatePassword =
async()=>{

try{

const token =
localStorage.getItem(
"token"
);

await axios.put(
`${API_URL}/api/users/change-password`,
passwordData,
{
headers:{
Authorization:
`Bearer ${token}`
}
}
);

alert(
"Password updated successfully"
);

setPasswordData({
currentPassword:"",
newPassword:"",
confirmPassword:""
});

}
catch(error){

console.log(error);

alert(
error.response?.data?.message ||
"Failed to update password"
);

}

};



















const savePrivacySettings =
async()=>{

try{

const token =
localStorage.getItem(
"token"
);

await axios.put(
`${API_URL}/api/users/privacy-settings`,
privacySettings,
{
headers:{
Authorization:
`Bearer ${token}`
}
}
);

alert(
"Privacy settings updated"
);

}
catch(error){

console.log(error);

alert(
"Failed to update settings"
);

}

};










const handleDeleteAccount =
async()=>{

try{

const token =
localStorage.getItem(
"token"
);

await axios.delete(
`${API_URL}/api/users/delete-account`,
{
headers:{
Authorization:
`Bearer ${token}`
}
}
);

localStorage.removeItem(
"token"
);

window.location.href =
"/login";

}
catch(error){

console.log(error);

alert(
"Failed to delete account"
);

}

};
















const downloadMyData =
async()=>{

try{

const token =
localStorage.getItem(
"token"
);

const res =
await axios.get(
`${API_URL}/api/users/download-data`,
{
headers:{
Authorization:
`Bearer ${token}`
}
}
);

console.log(
res.data.data
);

alert(
"User data downloaded successfully"
);

}
catch(error){

console.log(error);

alert(
"Failed to download data"
);

}

};




















useEffect(()=>{

fetchUserProfile();

},[]);



useEffect(()=>{

if(user?._id){

fetchPayments(
user._id
);

}

},[user]);










const handleLogout = () => {

  const confirmLogout = window.confirm(
    "Are you sure you want to logout?"
  );

  if (!confirmLogout) return;

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/login");

};


return(

<div className="usersettings-layout">

  <UserSidebar/>

  <div className="usersettings-content">

    {/* HEADER */}

    <div className="usersettings-header">

      <div className="usersettings-header-left">
        <h1>Settings</h1>
        <p>
          Manage your account settings and preferences
        </p>
      </div>

      <div className="usersettings-header-right">

        <div className="usersettings-search-box">
          <FaSearch/>
          <input
            type="text"
            placeholder="Search anything..."
          />
          <span>Ctrl + K</span>
        </div>

        <button className="usersettings-icon-btn">
          <FaRegCommentDots/>
        </button>

        <button className="usersettings-icon-btn">
          <FaBell/>
          <div className="usersettings-count">
            2
          </div>
        </button>

        <div className="usersettings-user-box"  onClick={handleLogout}>

          <img
            src={
              user?.profileImage
              ? `${API_URL}${user.profileImage}`
              : "/avatar.png"
            }
            alt=""
          />

          <div>
            <h4>
      {user.name || "User Name"}
    </h4>

    <p>
      {user.role || "User"}
    </p>
          </div>

        </div>

      </div>

    </div>

    {/* MAIN */}

    <div className="usersettings-main">

      <div className="usersettings-tabs">

        <button
          className={`usersettings-tab ${
            activeMenu === "payment"
            ? "active"
            : ""
          }`}
          onClick={() =>
            setActiveMenu("payment")
          }
        >
          <FaCreditCard/>
          Payment History
        </button>

        <button
          className={`usersettings-tab ${
            activeMenu === "cards"
            ? "active"
            : ""
          }`}
          onClick={() =>
            setActiveMenu("cards")
          }
        >
          <FaWallet/>
          Saved Payment Methods
        </button>

        <button
          className={`usersettings-tab ${
            activeMenu === "email"
            ? "active"
            : ""
          }`}
          onClick={() =>
            setActiveMenu("email")
          }
        >
          <FaEnvelope/>
          Email Notifications
        </button>

        <button
          className={`usersettings-tab ${
            activeMenu === "notifications"
            ? "active"
            : ""
          }`}
          onClick={() =>
            setActiveMenu("notifications")
          }
        >
          <FaBell/>
          In-App Notifications
        </button>

        <button
          className={`usersettings-tab ${
            activeMenu === "password"
            ? "active"
            : ""
          }`}
          onClick={() =>
            setActiveMenu("password")
          }
        >
          <FaLock/>
          Password Change
        </button>

        <button
          className={`usersettings-tab ${
            activeMenu === "privacy"
            ? "active"
            : ""
          }`}
          onClick={() =>
            setActiveMenu("privacy")
          }
        >
          <FaShieldAlt/>
          Privacy Settings
        </button>

      </div>


      {/* PAYMENT HISTORY */}

      {
        activeMenu === "payment" && (

          <div className="usersettings-payment-card">

            <div className="usersettings-payment-header">

              <div>
                <h2>Payment History</h2>

                <p>
                  View all your payments and refunds
                </p>
              </div>

            </div>

            <div className="usersettings-payment-table-wrapper">

              <table className="usersettings-payment-table">

                <thead>

                  <tr>
                    <th>Transaction ID</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                  </tr>

                </thead>

                <tbody>

                  {
                    payments.length > 0
                    ?

                    payments.map((payment)=>(

                      <tr key={payment._id}>

                        <td>
                          {payment.transactionId}
                        </td>

                        <td>
                          {
                            new Date(
                              payment.createdAt
                            ).toLocaleDateString(
                              "en-IN"
                            )
                          }
                        </td>

                        <td>
                          {
                            payment.description
                          }
                        </td>

                        <td>
                          {
                            payment.type
                          }
                        </td>

                        <td>
                          ₹{payment.amount}
                        </td>

                        <td>
                          {
                            payment.paymentMethod
                          }
                        </td>

                        <td>

                          <span
                            className={`usersettings-payment-status ${
                              payment.status.toLowerCase()
                            }`}
                          >
                            {payment.status}
                          </span>

                        </td>

                      </tr>

                    ))

                    :

                    <tr>

                      <td
                        colSpan="7"
                        className="usersettings-no-data"
                      >
                        No payment history found
                      </td>

                    </tr>

                  }

                </tbody>

              </table>

            </div>

          </div>

        )
      }



{
activeMenu === "cards" && (

<div className="usersettings-settings-grid">

<div className="usersettings-settings-card">

<div className="usersettings-settings-top">

<div>
<h2>
Saved Payment Methods
</h2>

<p>
Manage your saved cards, UPI IDs and
other payment methods.
</p>
</div>

<button className="usersettings-add-btn">
+ Add New
</button>

</div>

{
user?.savedPaymentMethods?.length > 0
?

user.savedPaymentMethods.map((item)=>(

<div
className="usersettings-method-item"
key={item._id}
>

<div className="usersettings-method-left">

<div className="usersettings-method-icon">

{
item.type === "card"
? "💳"
:
item.type === "upi"
? "📱"
:
"🏦"
}

</div>

<div>

<h4>

{
item.type === "card"
?

`${item.cardBrand} •••• ${item.last4}`

:

item.type === "upi"
?

item.upiId

:

item.bankName

}

</h4>

<p>

{
item.type === "card"
?

`Expires ${item.expiryMonth}/${item.expiryYear}`

:

item.type === "upi"
?

"UPI Payment"

:

"Net Banking"

}

</p>

</div>

</div>

<div className="usersettings-method-right">

{
item.isDefault &&
<span className="default-badge">
Default
</span>
}

<button>
Remove
</button>

</div>

</div>

))

:

<div className="usersettings-empty">
No saved payment methods
</div>

}

</div>

</div>

)
}







{
activeMenu === "email" && (

<div className="usersettings-settings-card">

<h2>
Email Preferences
</h2>

<p>
Choose the emails you want to receive.
</p>

{
Object.entries(
user?.emailPreferences || {}
).map(([key,value])=>(

<div
className="usersettings-toggle-row"
key={key}
>

<div>

<h4>
{
key.replace(
/([A-Z])/g,
" $1"
)
}
</h4>

</div>

<label className="switch">

<input
type="checkbox"
checked={value}
onChange={()=>
handleEmailToggle(
key,
!value
)
}
/>

<span className="slider"></span>

</label>

</div>

))
}

</div>

)
}







{
activeMenu === "notifications" && (

<div className="usersettings-settings-card">

<h2>
In-App Notifications
</h2>

<p>
Manage notifications shown inside app.
</p>

{
Object.entries(
user?.notificationPreferences || {}
).map(([key,value])=>(

<div
className="usersettings-toggle-row"
key={key}
>

<div>

<h4>

{
key.replace(
/([A-Z])/g,
" $1"
)
}

</h4>

</div>

<label className="switch">

<input
type="checkbox"
checked={value}
onChange={()=>
handleNotificationToggle(
key,
!value
)
}
/>

<span className="slider"></span>

</label>

</div>

))
}

</div>

)
}








{
activeMenu === "password" && (

<div className="usersettings-security-grid">

<div className="usersettings-password-card">

<div className="usersettings-card-title">
<h2>Password Change</h2>
<p>
Update your password regularly to keep your account secure.
</p>
</div>

<div className="usersettings-password-body">

<div className="usersettings-password-left">

<div className="usersettings-input-group">
<label>Current Password</label>
<input
type="password"
name="currentPassword"
placeholder="Enter current password"
value={passwordData.currentPassword}
onChange={handlePasswordChange}
/>
</div>

<div className="usersettings-input-group">
<label>New Password</label>
<input
type="password"
name="newPassword"
placeholder="Enter new password"
value={passwordData.newPassword}
onChange={handlePasswordChange}
/>
</div>

<div className="usersettings-input-group">
<label>Confirm New Password</label>
<input
type="password"
name="confirmPassword"
placeholder="Confirm new password"
value={passwordData.confirmPassword}
onChange={handlePasswordChange}
/>
</div>

<button
className="usersettings-primary-btn"
onClick={updatePassword}
>
Update Password
</button>

</div>

<div className="usersettings-password-rules">

<h4>Password must contain:</h4>

<ul>
<li>✔ At least 8 characters</li>
<li>✔ One uppercase letter</li>
<li>✔ One lowercase letter</li>
<li>✔ One number</li>
<li>✔ One special character</li>
</ul>

</div>

</div>

</div>

</div>

)
}











{
activeMenu === "privacy" && (
<div className="usersettings-settings-card">

  <div className="usersettings-card-title">
    <h2>Privacy Settings</h2>
    <p>
      Manage your privacy preferences and data sharing settings.
    </p>
  </div>

  {/* Profile Visibility */}
  <div className="usersettings-privacy-item">

    <div className="usersettings-privacy-left">
      <h4>Profile Visibility</h4>
      <p>Control who can view your profile information</p>
    </div>

    <select
      className="usersettings-select"
      value={privacySettings.profileVisibility}
      onChange={(e)=>
        handlePrivacyChange(
          "profileVisibility",
          e.target.value
        )
      }
    >
      <option value="all">
        Visible to all
      </option>

      <option value="vendors">
        Only Vendors
      </option>

      <option value="private">
        Private
      </option>
    </select>

  </div>


  {/* Data Sharing */}
  <div className="usersettings-privacy-item">

    <div className="usersettings-privacy-left">
      <h4>Data Sharing</h4>
      <p>
        Allow sharing your data with trusted service providers
      </p>
    </div>

    <label className="switch">

      <input
        type="checkbox"
        checked={privacySettings.dataSharing}
        onChange={() =>
          handlePrivacyChange(
            "dataSharing",
            !privacySettings.dataSharing
          )
        }
      />

      <span className="slider"></span>

    </label>

  </div>


  {/* Activity Tracking */}
  <div className="usersettings-privacy-item">

    <div className="usersettings-privacy-left">
      <h4>Activity Tracking</h4>
      <p>
        Allow us to track activity to improve experience
      </p>
    </div>

    <label className="switch">

      <input
        type="checkbox"
        checked={privacySettings.activityTracking}
        onChange={() =>
          handlePrivacyChange(
            "activityTracking",
            !privacySettings.activityTracking
          )
        }
      />

      <span className="slider"></span>

    </label>

  </div>


  {/* Marketing */}
  <div className="usersettings-privacy-item">

    <div className="usersettings-privacy-left">
      <h4>Marketing Communications</h4>
      <p>
        Receive personalized recommendations and offers
      </p>
    </div>

    <label className="switch">

      <input
        type="checkbox"
        checked={
          privacySettings.marketingCommunications
        }
        onChange={() =>
          handlePrivacyChange(
            "marketingCommunications",
            !privacySettings.marketingCommunications
          )
        }
      />

      <span className="slider"></span>

    </label>

  </div>


  {/* Download Data */}
  <div className="usersettings-privacy-item">

    <div className="usersettings-privacy-left">
      <h4>Download My Data</h4>
      <p>
        Download a copy of your data
      </p>
    </div>

    <button
      className="usersettings-outline-btn"
      onClick={downloadMyData}
    >
      Download Data
    </button>

  </div>


  {/* Delete Account */}
  <div className="usersettings-privacy-item">

    <div className="usersettings-privacy-left">
      <h4>Delete Account</h4>
      <p>
        Permanently delete your account and data
      </p>
    </div>

    <button
      className="usersettings-danger-btn"
      onClick={handleDeleteAccount}
    >
      Delete Account
    </button>

  </div>


  {/* Save Button */}
  <div className="usersettings-privacy-save">

    <button
      className="usersettings-primary-btn"
      onClick={savePrivacySettings}
    >
      Save Settings
    </button>

  </div>

</div>

)
}



























    </div>

  </div>

</div>

);

}

export default UserSettings;