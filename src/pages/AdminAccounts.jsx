import API_URL from "../config";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

import {
  FaCalendarAlt,
  FaBell,
  FaCheckCircle,
  FaEnvelope,
  FaCloudUploadAlt,
  FaUserShield,
  FaUsers,
  FaChartLine,
  FaHeadset,
} from "react-icons/fa";

import "./AdminAccounts.css";

function AdminAccounts() {

  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (
      !token ||
      ![
        "superadmin",
        "admin"
      ].includes(role)
    ) {

      navigate("/admin");

    }

  }, [navigate]);

  const [dashboard, setDashboard] = useState({

    notificationCount: 0,

    adminPhoto: "/avatar.png",

    adminName: "Super Admin",

    adminRole: "Super Admin"

  });

  const [startDate, setStartDate] =
    useState("2024-05-16");

  const [endDate, setEndDate] =
    useState("2024-05-22");

  const [success, setSuccess] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({

      fullName: "",

      email: "",

      phone: "",

      password: "",

      confirmPassword: "",

      role: "admin",

      status: "Active",

      emailNotifications: true,

      loginAccess: true,

      twoFactorEnabled: false,

      profilePhoto: null

    });

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {

      setDashboard({

        notificationCount: 5,

        adminPhoto: "/avatar.png",

        adminName: "Super Admin",

        adminRole: "Super Admin"

      });

    }

    catch (err) {

      console.log(err);

    }

  };

  const handleChange = (e) => {

    const {

      name,

      value,

      type,

      checked

    } = e.target;

    setFormData({

      ...formData,

      [name]:

        type === "checkbox"

          ? checked

          : value

    });

  };

  const handlePhoto = (e) => {

    setFormData({

      ...formData,

      profilePhoto:
        e.target.files[0]

    });

  };

  const handleRole = (role) => {

    setFormData({

      ...formData,

      role

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (

      formData.password !==
      formData.confirmPassword

    ) {

      alert(
        "Passwords do not match."
      );

      return;

    }

    try {

      setLoading(true);

      const data =
        new FormData();

      Object.keys(formData).forEach((key) => {

        data.append(

          key,

          formData[key]

        );

      });

      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await axios.post(

          `${API_URL}/api/admin-accounts/create`,

          data,

          {

            headers: {

              Authorization:
                `Bearer ${token}`

            }

          }

        );

      if (

        res.data.success

      ) {

        setSuccess(
          "Admin account created successfully."
        );

        setFormData({

          fullName: "",

          email: "",

          phone: "",

          password: "",

          confirmPassword: "",

          role: "admin",

          status: "Active",

          emailNotifications: true,

          loginAccess: true,

          twoFactorEnabled: false,

          profilePhoto: null

        });

      }

    }

    catch (err) {

      console.log(err);

      alert(

        err.response?.data?.message ||

        "Unable to create admin."

      );

    }

    finally {

      setLoading(false);

    }

  };

  const handleLogout = () => {

    localStorage.clear();

    window.location.href =
      "/admin";

  };




  const sendLoginDetails = async () => {

  try {

    const token =
      localStorage.getItem("token");

    if (!formData.email) {

      alert("Please enter email.");

      return;

    }

    if (!formData.password) {

      alert("Password not available.");

      return;

    }

    const res =
      await axios.post(

        `${API_URL}/api/admin-accounts/send-login`,

        {

          fullName: formData.fullName,

          email: formData.email,

          password: formData.password,

          role: formData.role

        },

        {

          headers: {

            Authorization:
              `Bearer ${token}`

          }

        }

      );

    alert(res.data.message);

  }

  catch (err) {

    console.log(err);

    alert(

      err.response?.data?.message ||

      "Unable to send login details."

    );

  }

};

  return (

    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-main-content">

        <div className="admin-accounts-page">

          {/* HEADER */}

          <div className="admin-accounts-header">

            <div className="admin-accounts-heading">

              <h1>
                Add New Admin
              </h1>

              <p>

                Home

                <span> / </span>

                Admin Accounts

                <span> / </span>

                Add New Admin

              </p>

            </div>

            <div className="admin-accounts-actions">

              <div className="admin-accounts-date">

                <FaCalendarAlt />

                <input
                  type="date"
                  value={startDate}
                  onChange={(e)=>
                    setStartDate(
                      e.target.value
                    )
                  }
                />

                <span>-</span>

                <input
                  type="date"
                  value={endDate}
                  onChange={(e)=>
                    setEndDate(
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="admin-accounts-notification">

                <FaBell />

                <span>

                  {dashboard.notificationCount}

                </span>

              </div>

              <button
  className="admin-accounts-list-btn"
  onClick={() =>
    navigate("/admin-accounts-list")
  }
>
  Account List
</button>

              <div
                className="admin-accounts-profile"
                onClick={handleLogout}
              >

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

          {
            success &&

            <div className="admin-accounts-success">

              <FaCheckCircle />

              <div>

                <h4>

                  {success}

                </h4>

                <p>

                  Login details can now be shared with the admin.

                </p>

              </div>

            </div>
          }

          <form
            onSubmit={handleSubmit}
            className="admin-accounts-form"
          >


                      <div className="admin-accounts-grid">

              {/* LEFT */}

              <div className="admin-accounts-left">

                <div className="admin-accounts-card">

                  <h3>
                    Admin Information
                  </h3>

                  <div className="admin-accounts-row">

                    <div className="admin-accounts-field">

                      <label>
                        Full Name
                      </label>

                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        required
                      />

                    </div>

                    <div className="admin-accounts-field">

                      <label>
                        Email Address
                      </label>

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        required
                      />

                    </div>

                  </div>

                  <div className="admin-accounts-row">

                    <div className="admin-accounts-field">

                      <label>
                        Phone Number
                      </label>

                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        required
                      />

                    </div>

                    <div className="admin-accounts-field">

                      <label>
                        Profile Photo
                      </label>

                      <label className="admin-accounts-upload">

                        <FaCloudUploadAlt />

                        Upload Photo

                        <input
                          type="file"
                          hidden
                          onChange={handlePhoto}
                        />

                      </label>

                    </div>

                  </div>

                  <div className="admin-accounts-row">

                    <div className="admin-accounts-field">

                      <label>
                        Password
                      </label>

                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        required
                      />

                    </div>

                    <div className="admin-accounts-field">

                      <label>
                        Confirm Password
                      </label>

                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm password"
                        required
                      />

                    </div>

                  </div>

                </div>



                <div className="admin-accounts-card">

                  <h3>
                    Select Role
                  </h3>

                  <div className="admin-accounts-role-grid">

                    <div
                      className={`admin-accounts-role-card ${formData.role === "admin" ? "active" : ""}`}
                      onClick={() => handleRole("admin")}
                    >

                      <FaUserShield />

                      <h4>
                        Admin
                      </h4>

                      <p>
                        Platform Management
                      </p>

                    </div>

                    <div
                      className={`admin-accounts-role-card ${formData.role === "manager" ? "active" : ""}`}
                      onClick={() => handleRole("manager")}
                    >

                      <FaUsers />

                      <h4>
                        Manager
                      </h4>

                      <p>
                        Team Management
                      </p>

                    </div>

                    <div
                      className={`admin-accounts-role-card ${formData.role === "sales" ? "active" : ""}`}
                      onClick={() => handleRole("sales")}
                    >

                      <FaChartLine />

                      <h4>
                        Sales
                      </h4>

                      <p>
                        Sales & Revenue
                      </p>

                    </div>

                    <div
                      className={`admin-accounts-role-card ${formData.role === "support" ? "active" : ""}`}
                      onClick={() => handleRole("support")}
                    >

                      <FaHeadset />

                      <h4>
                        Support
                      </h4>

                      <p>
                        Customer Support
                      </p>

                    </div>

                  </div>

                </div>

              </div>

                            {/* RIGHT */}

              <div className="admin-accounts-right">

                <div className="admin-accounts-card">

                  <h3>
                    Account Settings
                  </h3>

                  <div className="admin-accounts-switch">

                    <div>

                      <h4>
                        Email Notifications
                      </h4>

                      <p>
                        Send important account notifications.
                      </p>

                    </div>

                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={formData.emailNotifications}
                      onChange={handleChange}
                    />

                  </div>

                  <div className="admin-accounts-switch">

                    <div>

                      <h4>
                        Login Access
                      </h4>

                      <p>
                        Allow this admin to login.
                      </p>

                    </div>

                    <input
                      type="checkbox"
                      name="loginAccess"
                      checked={formData.loginAccess}
                      onChange={handleChange}
                    />

                  </div>

                  <div className="admin-accounts-switch">

                    <div>

                      <h4>
                        Two Factor Authentication
                      </h4>

                      <p>
                        Extra security for admin account.
                      </p>

                    </div>

                    <input
                      type="checkbox"
                      name="twoFactorEnabled"
                      checked={formData.twoFactorEnabled}
                      onChange={handleChange}
                    />

                  </div>

                </div>



                <div className="admin-accounts-card">

                  <h3>
                    Account Status
                  </h3>

                  <div className="admin-accounts-status">

                    <label>

                      <input
                        type="radio"
                        name="status"
                        value="Active"
                        checked={
                          formData.status === "Active"
                        }
                        onChange={handleChange}
                      />

                      Active

                    </label>

                    <label>

                      <input
                        type="radio"
                        name="status"
                        value="Inactive"
                        checked={
                          formData.status === "Inactive"
                        }
                        onChange={handleChange}
                      />

                      Inactive

                    </label>

                  </div>

                </div>


<div className="admin-accounts-card">

  <h3>
    Send Login Details
  </h3>

  <p className="admin-accounts-send-text">
    Send login credentials to this admin via email.
  </p>

  <div className="admin-accounts-send-box">

    <div className="admin-accounts-send-icon">
      <FaEnvelope />
    </div>

    <h4>
      Login details will be sent to
    </h4>

    <h5>
      {formData.email || "admin.email@example.com"}
    </h5>

   <button

type="button"

className="admin-accounts-send-btn"

onClick={sendLoginDetails}

>

<FaEnvelope />&nbsp;&nbsp;

Send Login Details

</button>

  </div>

</div>

              </div>

            </div>



            <div className="admin-accounts-footer">

              <button
                type="button"
                className="admin-accounts-cancel-btn"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="admin-accounts-save-btn"
                disabled={loading}
              >

                {

                  loading

                    ? "Creating..."

                    : "Create Admin"

                }

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>

  );

}

export default AdminAccounts;