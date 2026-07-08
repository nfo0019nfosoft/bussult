import API_URL from "../config";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import {
  FaRegNewspaper,
  FaCheckCircle,
  FaClock,
  FaCalendarAlt,
  FaEye,
  FaHeart,
  FaBell,
  FaChevronDown,
  FaSearch,
  FaEdit,
  FaTrash,
  FaPlus
} from "react-icons/fa";
import "./AdminBlogDetails.css";

function AdminBlogDetails() {
  

  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    fetchBlogs();

  }, []);

  const fetchBlogs = async () => {

    try {

      const res = await axios.get(
        `${API_URL}/api/admin/blogs`
      );

      setBlogs(res.data.blogs);

    }

    catch (err) {

      console.log(err);

    }

  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );


  const [dashboard, setDashboard] = useState({
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    scheduledBlogs: 0,
    totalViews: 0,
    totalLikes: 0,
    notificationCount: 0,
    adminName: "",
    adminPhoto: ""
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {

    try {

      const res = await axios.get(
        `${API_URL}/api/admin/blog-stats`
      );

      setDashboard(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const handleLogout = () => {

    localStorage.clear();
    window.location.href = "/admin";

  };

  const cards = [
    {
      title: "Total Blogs",
      value: dashboard.totalBlogs,
      icon: <FaRegNewspaper />,
      color: "#8b5cf6"
    },
    {
      title: "Published Blogs",
      value: dashboard.publishedBlogs,
      icon: <FaCheckCircle />,
      color: "#10b981"
    },
    {
      title: "Draft Blogs",
      value: dashboard.draftBlogs,
      icon: <FaClock />,
      color: "#f59e0b"
    },
    {
      title: "Scheduled Blogs",
      value: dashboard.scheduledBlogs,
      icon: <FaCalendarAlt />,
      color: "#3b82f6"
    },
    {
      title: "Total Views",
      value: dashboard.totalViews,
      icon: <FaEye />,
      color: "#ec4899"
    },
    {
      title: "Total Likes",
      value: dashboard.totalLikes,
      icon: <FaHeart />,
      color: "#ef4444"
    }
  ];




  useEffect(() => {

  const token = localStorage.getItem("token");

  const role = localStorage.getItem("role");

  if (
    !token ||
    !["superadmin", "admin"].includes(role)
  ) {
    navigate("/admin");
  }

}, [navigate]);
  return (

    <div className="adminblogdetails-layout">

      <AdminSidebar />

      <div className="adminblogdetails-main">

        <div className="adminblogdetails-header">

          <div className="adminblogdetails-heading">

            <h1>Blog Management</h1>

            <p>
              Create, manage and publish blog posts.
            </p>

          </div>

          <div className="adminblogdetails-topright">

            <div className="adminblogdetails-date">

              <FaCalendarAlt />

              <span>
                May 16, 2024 - May 22, 2024
              </span>

            </div>

            <div className="adminblogdetails-notification">

              <FaBell />

              {
                dashboard.notificationCount > 0 &&

                <span className="adminblogdetails-badge">
                  {dashboard.notificationCount}
                </span>
              }

            </div>

            <div
              className="adminblogdetails-profile"
              onClick={handleLogout}
            >

              <img
                src={dashboard.adminPhoto || "/avatar.png"}
                alt=""
              />

              <span>
                {dashboard.adminName || "Super Admin"}
              </span>

              <FaChevronDown />

            </div>

          </div>

        </div>

        <div className="adminblogdetails-cards">

          {
            cards.map((card, index) => (

              <div
                className="adminblogdetails-card"
                key={index}
              >

                <div
                  className="adminblogdetails-card-icon"
                  style={{
                    background: `${card.color}15`,
                    color: card.color
                  }}
                >

                  {card.icon}

                </div>

                <div>

                  <h5>{card.title}</h5>

                  <h2>{card.value}</h2>

                </div>

              </div>

            ))
          }

        </div>





















    <div className="adminblogs-container">

      <div className="adminblogs-filters">

  <div className="adminblogs-search">

    <input
      type="text"
      placeholder="Search blog by title, author or keyword..."
    />

    <FaSearch />

  </div>

  <select className="adminblogs-select">
    <option>All Status</option>
    <option>Published</option>
    <option>Draft</option>
    <option>Archived</option>
  </select>

  <select className="adminblogs-select">
    <option>All Categories</option>
    <option>Taxation</option>
    <option>GST</option>
    <option>Audit</option>
  </select>

  <select className="adminblogs-select">
    <option>All Authors</option>
    <option>CA Connect Team</option>
  </select>

  <button className="adminblogs-filter-btn">
    Filter
  </button>

  <button className="adminblogs-reset-btn">
    Reset
  </button>

  <button className="adminblogs-add-btn">
    + Add New Blog
  </button>

</div>

      <div className="adminblogs-table-card">

        <table className="adminblogs-table">

          <thead>

            <tr>

              <th>Blog</th>
              <th>Category</th>
              <th>Author</th>
              <th>Status</th>
              <th>Views</th>
              <th>Likes</th>
              <th>Published On</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {

              filteredBlogs.map((blog) => (

                <tr key={blog._id}>

                  <td>

                    <div className="adminblogs-blog-info">

                      <img
                        src={blog.coverImage}
                        alt=""
                      />

                      <div>

                        <h4>{blog.title}</h4>

                        <p>

                          {blog.shortDescription?.slice(0, 80)}

                        </p>

                      </div>

                    </div>

                  </td>

                  <td>

                    <span className="adminblogs-category">

                      {blog.category}

                    </span>

                  </td>

                  <td>

                    <div>

                      <h5>{blog.author}</h5>

                      <small>
                        {blog.authorDesignation}
                      </small>

                    </div>

                  </td>

                  <td>

                    <span className={`adminblogs-status ${blog.status}`}>

                      {blog.status}

                    </span>

                  </td>

                  <td>{blog.views}</td>

                  <td>{blog.likes}</td>

                  <td>{blog.publishDate}</td>

                  <td>

                    <div className="adminblogs-actions">

                      <button>

                        <FaEye />

                      </button>

                      <button>

                        <FaEdit />

                      </button>

                      <button>

                        <FaTrash />

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














        

      </div>

    </div>

  );

}

export default AdminBlogDetails;