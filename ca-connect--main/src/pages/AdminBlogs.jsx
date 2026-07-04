import API_URL from "../config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminBlogs.css";

function AdminBlogs() {

  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    coverImage: "",
    author: "",
    authorImage: "",
    authorDesignation: "",
    publishDate: "",
    readTime: "",
    tags: "",
    shortDescription: "",
    content: "",
    coverImageFile: null,
    authorImageFile: null,
  });

  useEffect(() => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {

      navigate("/admin");

    }

  }, [navigate]);

  useEffect(() => {

    fetchBlogs();

  }, []);

  const fetchBlogs = async () => {

    try {

      const res = await axios.get(
        `${API_URL}/api/blogs`
      );

      setBlogs(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const handleChange = (e) => {

    const { name, value, files } = e.target;

    if (files) {

      setFormData({
        ...formData,
        [name]: files[0],
      });

    } else {

      setFormData({
        ...formData,
        [name]: value,
      });

    }

  };
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = new FormData();

      Object.keys(formData).forEach((key) => {

        if (key === "tags") {

          data.append(
            "tags",
            JSON.stringify(
              formData.tags.split(",").map((tag) => tag.trim())
            )
          );

        } else {

          data.append(key, formData[key]);

        }

      });

      if (editId) {

        await axios.put(
          `${API_URL}/api/blogs/${editId}`,
          data
        );

        alert("Blog Updated Successfully");

      } else {

        await axios.post(
          `${API_URL}/api/blogs`,
          data
        );

        alert("Blog Added Successfully");

      }

      fetchBlogs();

    } catch (err) {

      console.log(err);

      alert("Failed");

    }

  };

  const handleEdit = (blog) => {

    setEditId(blog._id);

    setFormData({
      title: blog.title,
      slug: blog.slug,
      category: blog.category,
      coverImage: blog.coverImage,
      author: blog.author,
      authorImage: blog.authorImage,
      authorDesignation: blog.authorDesignation,
      publishDate: blog.publishDate,
      readTime: blog.readTime,
      tags: blog.tags.join(", "),
      shortDescription: blog.shortDescription,
      content: blog.content,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this blog?")) return;

    try {

      await axios.delete(
        `${API_URL}/api/blogs/${id}`
      );

      alert("Blog Deleted Successfully");

      fetchBlogs();

    } catch (err) {

      console.log(err);

      alert("Delete Failed");

    }

  };
  return (

    <div className="admin-layout">

  <AdminSidebar />

  <div className="admin-blogs-page">

    <div className="admin-blog-header">

      <h2>
        {editId ? "Update Blog" : "Add Blog"}
      </h2>

    </div>

    <div className="admin-blog-top">

      {/* LEFT SIDE */}

      <form
        className="admin-blog-form"
        onSubmit={handleSubmit}
      >

        <div className="admin-blog-card">

          <h3>Blog Information</h3>

          <div className="admin-blog-grid">

            <div className="admin-blog-field">

              <label>Blog Title</label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />

            </div>

            <div className="admin-blog-field">

              <label>Slug</label>

              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
              />

            </div>

          </div>

          <div className="admin-blog-grid">

            <div className="admin-blog-field">

              <label>Category</label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />

            </div>

            <div className="admin-blog-field">

              <label>Author Name</label>

              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
              />

            </div>

          </div>

          <div className="admin-blog-grid">

            <div className="admin-blog-field">

              <label>Cover Image URL</label>

              <input
                type="text"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
              />

            </div>

            <div className="admin-blog-field">

              <label>Upload Cover Image</label>

              <input
                type="file"
                name="coverImageFile"
                accept="image/*"
                onChange={handleChange}
              />

            </div>

          </div>

          <div className="admin-blog-grid">

            <div className="admin-blog-field">

              <label>Author Image URL</label>

              <input
                type="text"
                name="authorImage"
                value={formData.authorImage}
                onChange={handleChange}
              />

            </div>

            <div className="admin-blog-field">

              <label>Upload Author Image</label>

              <input
                type="file"
                name="authorImageFile"
                accept="image/*"
                onChange={handleChange}
              />

            </div>

          </div>

          <div className="admin-blog-grid">

            <div className="admin-blog-field">

              <label>Author Designation</label>

              <input
                type="text"
                name="authorDesignation"
                value={formData.authorDesignation}
                onChange={handleChange}
              />

            </div>

            <div className="admin-blog-field">

              <label>Publish Date</label>

              <input
                type="text"
                name="publishDate"
                value={formData.publishDate}
                onChange={handleChange}
              />

            </div>

          </div>

          <div className="admin-blog-grid">

            <div className="admin-blog-field">

              <label>Read Time</label>

              <input
                type="text"
                name="readTime"
                value={formData.readTime}
                onChange={handleChange}
              />

            </div>

            <div className="admin-blog-field">

              <label>Tags</label>

              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
              />

            </div>

          </div>

          <div className="admin-blog-field">

            <label>Short Description</label>

            <textarea
              rows="4"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
            />

          </div>

          <div className="admin-blog-field">

            <label>Blog Content</label>

            <textarea
              rows="10"
              name="content"
              value={formData.content}
              onChange={handleChange}
            />

          </div>

          <button
            type="submit"
            className="save-blog-btn"
          >
            {editId ? "Update Blog" : "Save Blog"}
          </button>

        </div>

      </form>


      {/* RIGHT SIDE */}

      <div className="blog-sidebar">

        <div className="blog-side-card">

          <h3>Publish</h3>

          <div className="publish-actions">

            <button
              type="button"
              className="draft-btn"
            >
              Save Draft
            </button>

            <button
              type="button"
              className="preview-btn"
            >
              Preview
            </button>

          </div>

          <button
            type="button"
            className="publish-btn"
          >
            Publish Now
          </button>

          <button
            type="button"
            className="schedule-btn"
          >
            Schedule For Later
          </button>

        </div>

        <div className="blog-side-card">

          <h3>Blog Settings</h3>

          <label>Status</label>

          <select>

            <option>Draft</option>

            <option>Published</option>

            <option>Archived</option>

          </select>

          <label>Visibility</label>

          <select>

            <option>Public</option>

            <option>Private</option>

          </select>

          <div className="toggle-row">

            <span>Allow Comments</span>

            <input
              type="checkbox"
              defaultChecked
            />

          </div>

        </div>

        <div className="blog-side-card">

          <h3>Additional Options</h3>

          <label>Tags</label>

          <input
            type="text"
            placeholder="GST, Taxation, Business"
          />

          <label>Meta Description</label>

          <textarea
            rows="4"
            placeholder="Enter Meta Description"
          />

        </div>

        <div className="blog-side-card">

          <h3>SEO Preview</h3>

          <div className="seo-preview">

            <small>
              https://caconnect.com/blog/enter-blog-slug
            </small>

            <h4>
              Blog Title Will Appear Here
            </h4>

            <p>
              This is where your meta description will appear.
            </p>

          </div>

        </div>

      </div>

    </div>







        <div className="manage-blogs">

          <h2>Manage Blogs</h2>

          {blogs.map((blog) => (

            <div className="blog-card" key={blog._id}>

              <img src={blog.coverImage} alt="" />

              <div className="blog-info">
                <h3>{blog.title}</h3>
                <p>{blog.category}</p>
              </div>

              <div className="blog-actions">

                <button
                  className="edit-btn"
                  onClick={() => handleEdit(blog)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>
      </div>

    </div>







  );

}

export default AdminBlogs;