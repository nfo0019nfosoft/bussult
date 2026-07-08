import API_URL from "../config";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

import {
  FaSearch,
  FaBell,
  FaCalendarAlt,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaFilter
} from "react-icons/fa";

import "./AdminAccountsList.css";

function AdminAccountsList() {

  const navigate = useNavigate();
  const [selectedAdmin, setSelectedAdmin] =
useState(null);

const [showViewModal, setShowViewModal] =
useState(false);

const [showEditModal, setShowEditModal] =
useState(false);

const [showDeleteModal, setShowDeleteModal] =
useState(false);

const [deleteId, setDeleteId] =
useState(null);

  const [admins, setAdmins] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [dashboard, setDashboard] =
    useState({

      notificationCount: 5,

      adminPhoto: "/avatar.png",

      adminName: "Super Admin",

      adminRole: "Super Admin"

    });



    const [editForm, setEditForm] = useState({

  fullName: "",

  email: "",

  phone: "",

  role: "admin",

  status: "Active",

  emailNotifications: true,

  loginAccess: true,

  twoFactorEnabled: false

});



  useEffect(() => {

    const token =
      localStorage.getItem("token");

    const role =
      localStorage.getItem("role");

    if (
      !token ||
      ![
        "superadmin",
        "admin"
      ].includes(role)
    ) {

      navigate("/admin");

      return;

    }

    fetchAdmins();

  }, []);




const fetchAdmins = async () => {

  try {

    const token = localStorage.getItem("token");

    const res = await axios.get(

      `${API_URL}/api/admin-accounts`,

      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

    );

    setAdmins(res.data.admins);

  }

  catch (err) {

    console.log(err);

  }

  finally {

    setLoading(false);

  }

};

const handleView = async (id) => {

  try {

    const token = localStorage.getItem("token");

    const res = await axios.get(

      `${API_URL}/api/admin-accounts/${id}`,

      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

    );

    setSelectedAdmin(res.data.admin);

    setShowViewModal(true);

  }

  catch (err) {

    console.log(err);

  }

};

const handleDelete = (id) => {

  setDeleteId(id);

  setShowDeleteModal(true);

};

const confirmDelete = async () => {

  try {

    const token = localStorage.getItem("token");

    await axios.delete(

      `${API_URL}/api/admin-accounts/${deleteId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

    );

    setShowDeleteModal(false);

    setDeleteId(null);

    fetchAdmins();

  }

  catch (err) {

    console.log(err);

    alert("Delete Failed");

  }

};







const handleEdit = (admin) => {

  setSelectedAdmin(admin);

  setEditForm({

    fullName: admin.fullName,

    email: admin.email,

    phone: admin.phone,

    role: admin.role,

    status: admin.status,

    emailNotifications: admin.emailNotifications,

    loginAccess: admin.loginAccess,

    twoFactorEnabled: admin.twoFactorEnabled

  });

  setShowEditModal(true);

};

const handleEditChange = (e) => {

  const { name, value } = e.target;

  setEditForm((prev) => ({

    ...prev,

    [name]: value

  }));

};

const handleCheckboxChange = (e) => {

  const { name, checked } = e.target;

  setEditForm((prev) => ({

    ...prev,

    [name]: checked

  }));

};

const updateAdmin = async () => {

  try {

    const token =
      localStorage.getItem("token");

    await axios.put(

      `${API_URL}/api/admin-accounts/${selectedAdmin._id}`,

      editForm,

      {

        headers: {

          Authorization:
            `Bearer ${token}`

        }

      }

    );

    setShowEditModal(false);

    fetchAdmins();

  }

  catch (err) {

    console.log(err);

    alert("Update Failed");

  }

};


















  const filteredAdmins =
    admins.filter((item)=>

      item.fullName
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      )

      ||

      item.email
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      )

    );

  return(

<div className="admin-layout">

<AdminSidebar/>


<div className="admin-accounts-list-page">

<div className="admin-accounts-list-header">

<div>

<h1>
Admin Accounts
</h1>

<p>

Home

<span> / </span>

Administration

<span> / </span>

Admin Accounts

</p>

</div>

<div className="admin-accounts-list-right">

<div className="admin-accounts-list-date">

<FaCalendarAlt/>

<input
type="date"
/>

</div>

<div className="admin-accounts-list-bell">

<FaBell/>

<span>

{dashboard.notificationCount}

</span>

</div>

<div className="admin-accounts-list-profile">

<img
src={dashboard.adminPhoto}
alt=""
/>

<div>

<h4>

{dashboard.adminName}

</h4>

<p>

{dashboard.adminRole}

</p>

</div>

</div>

</div>

</div>

<div className="admin-accounts-list-toolbar">

<div className="admin-accounts-list-search">

<FaSearch/>

<input

type="text"

placeholder="Search admin..."

value={search}

onChange={(e)=>
setSearch(
e.target.value
)}

 />

</div>

<div className="admin-accounts-list-toolbar-right">

<button
className="admin-accounts-list-filter"
>

<FaFilter/>

Filter

</button>

<button

className="admin-accounts-list-add"

onClick={()=>navigate("/admin-accounts")}

>

<FaPlus/>

Add Team Member

</button>

</div>

</div>

<div className="admin-accounts-list-table-card">

<table className="admin-accounts-list-table">

<thead>

<tr>

<th>
Photo
</th>

<th>
Name
</th>

<th>
Email
</th>

<th>
Phone
</th>

<th>
Role
</th>

<th>
Status
</th>

<th>
Actions
</th>

</tr>

</thead>

<tbody>
    {
loading ?

<tr>

<td
colSpan="7"
className="admin-accounts-list-loading"
>

Loading Admin Accounts...

</td>

</tr>

:

filteredAdmins.length === 0 ?

<tr>

<td
colSpan="7"
className="admin-accounts-list-loading"
>

No Admin Accounts Found

</td>

</tr>

:

filteredAdmins.map((admin)=>(

<tr
key={admin._id}
>

<td>

<img

src={
admin.profilePhoto
?

`${API_URL}/${admin.profilePhoto}`

:

"/avatar.png"

}

alt=""

className="admin-accounts-list-avatar"

/>

</td>

<td>

<div className="admin-accounts-list-name">

<h4>

{admin.fullName}

</h4>

<p>

ID :
{admin._id.slice(-6)}

</p>

</div>

</td>

<td>

{admin.email}

</td>

<td>

{admin.phone}

</td>

<td>

<span
className={`admin-accounts-list-role ${admin.role}`}
>

{admin.role}

</span>

</td>

<td>

<span
className={`admin-accounts-list-status ${admin.status}`}
>

{admin.status}

</span>

</td>

<td>

<div
className="admin-accounts-list-actions"
>
<button

className="admin-accounts-list-view"

onClick={()=>
handleView(admin._id)
}

>

<FaEye/>

</button>




<button

className="admin-accounts-list-edit"

onClick={()=>
handleEdit(admin)
}

>

<FaEdit/>

</button>




<button

className="admin-accounts-list-delete"

onClick={()=>
handleDelete(admin._id)
}

>

<FaTrash/>

</button>

</div>

</td>

</tr>

))

}

</tbody>

</table>

</div>





</div>







{showViewModal && selectedAdmin && (

<div className="admin-view-modal-overlay">

<div className="admin-view-modal">

<div className="admin-view-modal-header">

<h2>
Admin Details
</h2>

<button
onClick={() =>
setShowViewModal(false)
}
>
✕
</button>

</div>

<div className="admin-view-modal-body">

<img
src={
selectedAdmin.profilePhoto
?
`${API_URL}/${selectedAdmin.profilePhoto}`
:
"/avatar.png"
}
alt=""
className="admin-view-photo"
/>

<div className="admin-view-row">

<label>
Full Name
</label>

<p>
{selectedAdmin.fullName}
</p>

</div>

<div className="admin-view-row">

<label>
Email
</label>

<p>
{selectedAdmin.email}
</p>

</div>

<div className="admin-view-row">

<label>
Phone
</label>

<p>
{selectedAdmin.phone}
</p>

</div>

<div className="admin-view-row">

<label>
Role
</label>

<p>
{selectedAdmin.role}
</p>

</div>

<div className="admin-view-row">

<label>
Status
</label>

<p>
{selectedAdmin.status}
</p>

</div>

<div className="admin-view-row">

<label>
Login Access
</label>

<p>
{
selectedAdmin.loginAccess
?
"Enabled"
:
"Disabled"
}
</p>

</div>

<div className="admin-view-row">

<label>
Email Notifications
</label>

<p>
{
selectedAdmin.emailNotifications
?
"Enabled"
:
"Disabled"
}
</p>

</div>

<div className="admin-view-row">

<label>
Two Factor Authentication
</label>

<p>
{
selectedAdmin.twoFactorEnabled
?
"Enabled"
:
"Disabled"
}
</p>

</div>

<div className="admin-view-row">

<label>
Created On
</label>

<p>
{
new Date(
selectedAdmin.createdAt
).toLocaleDateString()
}
</p>

</div>

</div>

<div className="admin-view-modal-footer">

<button
className="admin-view-close-btn"
onClick={() =>
setShowViewModal(false)
}
>

Close

</button>

</div>

</div>

</div>

)}








{showEditModal && (

<div className="admin-view-modal-overlay">

<div className="admin-view-modal">

<div className="admin-view-modal-header">

<h2>Edit Team Member</h2>

<button
onClick={() =>
setShowEditModal(false)
}
>
✕
</button>

</div>

<div className="admin-view-modal-body">

<div className="admin-edit-grid">

<input
type="text"
name="fullName"
placeholder="Full Name"
value={editForm.fullName}
onChange={handleEditChange}
/>

<input
type="email"
name="email"
placeholder="Email"
value={editForm.email}
onChange={handleEditChange}
/>

<input
type="text"
name="phone"
placeholder="Phone"
value={editForm.phone}
onChange={handleEditChange}
/>

<select
name="role"
value={editForm.role}
onChange={handleEditChange}
>

<option value="superadmin">
Super Admin
</option>

<option value="admin">
Admin
</option>

<option value="manager">
Manager
</option>

<option value="sales">
Sales
</option>

<option value="support">
Support
</option>

</select>

<select
name="status"
value={editForm.status}
onChange={handleEditChange}
>

<option value="Active">
Active
</option>

<option value="Inactive">
Inactive
</option>

</select>

</div>

<div className="admin-edit-checks">

<label>

<input
type="checkbox"
name="loginAccess"
checked={editForm.loginAccess}
onChange={handleCheckboxChange}
/>

Login Access

</label>

<label>

<input
type="checkbox"
name="emailNotifications"
checked={editForm.emailNotifications}
onChange={handleCheckboxChange}
/>

Email Notifications

</label>

<label>

<input
type="checkbox"
name="twoFactorEnabled"
checked={editForm.twoFactorEnabled}
onChange={handleCheckboxChange}
/>

Two Factor Authentication

</label>

</div>

</div>

<div className="admin-view-modal-footer">

<button
className="admin-view-close-btn"
onClick={() =>
setShowEditModal(false)
}
>

Cancel

</button>

<button
className="admin-view-close-btn"
onClick={updateAdmin}
>

Update

</button>

</div>

</div>

</div>

)}


















{showDeleteModal && (

<div className="admin-view-modal-overlay">

<div className="admin-delete-modal">

<div className="admin-delete-icon">

🗑️

</div>

<h2>

Delete Team Member

</h2>

<p>

Are you sure you want to delete this team member?

<br/>

This action cannot be undone.

</p>

<div className="admin-delete-buttons">

<button

className="admin-delete-cancel"

onClick={() => {

setShowDeleteModal(false);

setDeleteId(null);

}}

>

Cancel

</button>

<button

className="admin-delete-confirm"

onClick={confirmDelete}

>

Delete

</button>

</div>

</div>

</div>

)}







</div>

);
}



export default AdminAccountsList;