import API_URL from "../config";
import "./AdminSidebar.css";
import logo from "../assets/logo.png";

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  FaTachometerAlt,
  FaChartLine,
  FaFileAlt,
  FaUserTie,
  FaUsers,
  FaClipboardList,
  FaHandshake,
  FaCalendarAlt,
  FaBell,
  FaBullhorn,
  FaNetworkWired,
  FaBlog,
  FaUserShield,
  FaLifeRing,
  FaCog,
  FaShieldAlt,
  FaSignOutAlt,
  FaChevronDown,
  FaPlusCircle,
  FaListAlt,
} from "react-icons/fa";

function AdminSidebar() {

  const navigate = useNavigate();

  const [blogOpen, setBlogOpen] = useState(false);

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/admin");

  };
  const role =
  localStorage.getItem("role");
const menuItemsTop = [

  {
    name: "Dashboard",
    icon: <FaTachometerAlt />,
    path: "/admin-dashboard",
    roles: ["superadmin","admin","manager","sales","support"]
  },

  {
    name: "Revenue Analytics",
    icon: <FaChartLine />,
    path: "/admin-revenue",
    roles: ["superadmin"]
  },

  {
    name: "Reports & Analytics",
    icon: <FaFileAlt />,
    path: "/admin-reports",
    roles: ["superadmin","admin","manager"]
  },

  {
    name: "Vendor Management",
    icon: <FaUserTie />,
    path: "/admin-vendors",
    roles: ["superadmin","admin"]
  },

  {
    name: "User Management",
    icon: <FaUsers />,
    path: "/admin-users",
    roles: ["superadmin","admin"]
  },

  {
    name: "Lead Management",
    icon: <FaClipboardList />,
    path: "/admin-leads",
    roles: ["superadmin","admin","sales"]
  },

  {
    name: "CRM",
    icon: <FaHandshake />,
    path: "/admin-crm",
    roles: ["superadmin","admin","sales"]
  },

  {
    name: "Appointments Management",
    icon: <FaCalendarAlt />,
    path: "/admin-appointments",
    roles: ["superadmin","admin","manager"]
  },

  {
    name: "Notifications",
    icon: <FaBell />,
    path: "/admin-notifications",
    roles: ["superadmin","admin","manager","sales","support"]
  },

  {
    name: "Advertisement Management",
    icon: <FaBullhorn />,
    path: "/admin-ads",
    roles: ["superadmin"]
  },

  {
    name: "Affiliate Management",
    icon: <FaNetworkWired />,
    path: "/admin-affiliates",
    roles: ["superadmin","admin"]
  }

];
const menuItemsBottom = [

  {
    name: "Admin Accounts",
    icon: <FaUserShield />,
    path: "/admin-accounts-list",
    roles: ["superadmin"]
  },

  {
    name: "Support",
    icon: <FaLifeRing />,
    path: "/admin-support",
    roles: ["superadmin","admin","support"]
  },

  {
    name: "Settings",
    icon: <FaCog />,
    path: "/admin-settings",
    roles: ["superadmin","admin"]
  },

  {
    name: "Security",
    icon: <FaShieldAlt />,
    path: "/admin-security",
    roles: ["superadmin"]
  }

];

  return (

    <aside className="admin-sidebar">

      <div className="admin-sidebar-top">

        <div className="admin-sidebar-logo">

          <img
            src={logo}
            alt="Logo"
            className="admin-logo-img"
          />

          <span className="admin-super-admin">
            Super Admin
          </span>

        </div>

        <div className="admin-sidebar-menu">

          {/* TOP MENU */}
{
menuItemsTop

.filter(item =>
  item.roles.includes(role)
)

.map((item,index)=>(

<NavLink
key={index}
to={item.path}
className={({isActive})=>
isActive
?
"admin-menu-link active"
:
"admin-menu-link"
}
>

{item.icon}

<span>
{item.name}
</span>

</NavLink>

))
}

          {/* BLOG MANAGEMENT */}

          <div
            className="admin-menu-link blog-parent"
            onClick={() => setBlogOpen(!blogOpen)}
          >

            <div className="blog-parent-left">

              <FaBlog />

              <span>
                Blog Management
              </span>

            </div>

            <FaChevronDown
              className={blogOpen ? "rotate-arrow" : ""}
            />

          </div>

          {

            blogOpen && (

              <div className="blog-dropdown">

                <NavLink
                  to="/admin-blogs"
                  className={({ isActive }) =>
                    isActive
                      ? "blog-submenu active-blog-submenu"
                      : "blog-submenu"
                  }
                >

                  <FaPlusCircle />

                  <span>
                    Add Blog
                  </span>

                </NavLink>

                <NavLink
                  to="/admin-blog-details"
                  className={({ isActive }) =>
                    isActive
                      ? "blog-submenu active-blog-submenu"
                      : "blog-submenu"
                  }
                >

                  <FaListAlt />

                  <span>
                    Blog Details
                  </span>

                </NavLink>

              </div>

            )

          }

          {/* BOTTOM MENU */}
{
menuItemsBottom

.filter(item =>
  item.roles.includes(role)
)

.map((item,index)=>(

<NavLink
key={index}
to={item.path}
className={({isActive})=>
isActive
?
"admin-menu-link active"
:
"admin-menu-link"
}
>

{item.icon}

<span>
{item.name}
</span>

</NavLink>

))
}
{
["superadmin","admin"].includes(role) && (

<>
  {/* Blog Management code */}
</>

)
}

        </div>

      </div>

      <div className="admin-sidebar-bottom">

        <button
          className="admin-logout-btn"
          onClick={handleLogout}
        >

          <FaSignOutAlt />

          <span>
            Logout
          </span>

        </button>

      </div>

    </aside>

  );

}

export default AdminSidebar;