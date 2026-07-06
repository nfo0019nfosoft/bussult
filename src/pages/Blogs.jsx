import API_URL from "../config";
import { Link } from "react-router-dom";
import {
  FaChevronRight,
  FaSearch,
  FaRegCalendarAlt, 
  FaRegClock
} from "react-icons/fa";

import BlogImg from "../assets/blog.png";

import { useEffect, useState } from "react";
import axios from "axios";

import "./Blogs.css";

function Blogs() {

  const [blogs, setBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All Blogs");

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
const categories = [
  "All Blogs",
  "Taxation",
  "GST",
  "Business",
  "Startups",
  "Compliance",
  "More",
];
const filteredBlogs =
  activeCategory === "All Blogs"
    ? blogs
    : activeCategory === "More"
    ? blogs.filter(
        (blog) =>
          ![
            "Taxation",
            "GST",
            "Business",
            "Startups",
            "Compliance",
          ].includes(blog.category)
      )
    : blogs.filter(
        (blog) => blog.category === activeCategory
      );
  return (

    <>
    
      <section className="privacy-page">

        {/* Breadcrumb */}
        <div className="privacy-breadcrumb">

          <Link to="/">
            Home
          </Link>

          <FaChevronRight />

          <span>
            Blogs
          </span>

        </div>

        {/* Hero Section */}
        <div className="privacy-hero">

          <div className="privacy-hero-content">

            <h1>
              Blogs & Insights
            </h1>

            <p>
              Stay updated with the latest CA insights, tax updates,
              compliance changes and business tips.
            </p>

          </div>

          <div className="privacy-image">

            <img
              src={BlogImg}
              alt="Blogs"
            />

          </div>

        </div>

        {/* Search */}
        <div className="blog-search-bar">

          <div className="blog-search-input">

            <input
              type="text"
              placeholder="Search blogs, topics or keywords..."
            />

            <FaSearch className="blog-search-icon" />

          </div>

          <div className="blog-category-select">

            <select>

              <option>
                All Categories
              </option>

              <option>
                Tax Updates
              </option>

              <option>
                GST
              </option>

              <option>
                Income Tax
              </option>

              <option>
                Business Tips
              </option>

              <option>
                Compliance
              </option>


               <option>
                More
              </option>

            </select>

          </div>

        </div>

      </section>
      <div className="blog-tabs">

  {categories.map((item) => (

    <button
      key={item}
      className={
        activeCategory === item
          ? "blog-tab active-tab"
          : "blog-tab"
      }
      onClick={() => setActiveCategory(item)}
    >
      {item}
    </button>

  ))}

</div>

      {/* BLOGS GRID */}

    <section className="latest-section">

  <div className="latest-grid">

   {filteredBlogs.map((blog) => (
      <div className="latest-box" key={blog._id}>

        <img
          src={blog.coverImage}
          alt={blog.title}
          className="latest-image"
        />

        <div className="latest-content">

          <span className="latest-category">
            {blog.category}
          </span>

          <h3>{blog.title}</h3>

          <p>{blog.shortDescription}</p>
<div className="latest-meta">

  <span>
    <FaRegCalendarAlt />
    {blog.publishDate}
  </span>

  <span>
    <FaRegClock />
    {blog.readTime}
  </span>

</div>

          <Link
            to={`/blog/${blog.slug}`}
            className="latest-btn"
          >
            Read More
          </Link>

        </div>

      </div>

    ))}

  </div>

</section>

    </>

  );

}

export default Blogs;