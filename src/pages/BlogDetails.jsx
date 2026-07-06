import API_URL from "../config";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./Blogs.css";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaWhatsapp,
  FaLink
} from "react-icons/fa";

function BlogDetails() {

  const { slug } = useParams();

  const [blog, setBlog] = useState(null);

  const [relatedBlogs, setRelatedBlogs] = useState([]);

  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {

    fetchBlog();

    fetchAllBlogs();

  }, [slug]);




  const currentUrl = window.location.href;

const copyLink = () => {
  navigator.clipboard.writeText(currentUrl);
  alert("Link copied!");
};




const fetchBlog = async () => {

  try {

    const res = await axios.get(
      `${API_URL}/api/blogs/${slug}`
    );

    setBlog(res.data.blog);

    setRelatedBlogs(res.data.relatedBlogs);

  }

  catch (err) {

    console.log(err);

  }

};


  const fetchAllBlogs = async () => {

    try {

      const res = await axios.get(

        `${API_URL}/api/blogs`

      );

      setAllBlogs(res.data);

    }

    catch (err) {

      console.log(err);

    }

  };



  const categoryCount = {};

  allBlogs.forEach((item) => {

    categoryCount[item.category] =

      (categoryCount[item.category] || 0) + 1;

  });



  

  if (!blog) {

    return <h2>Loading...</h2>;

  }
  return (

<section className="blogdetails-page">

  <div className="blogdetails-container">

    {/* LEFT SIDE */}
    <div className="blogdetails-left">

      <div className="blogdetails-breadcrumb">

        <Link to="/">Home</Link>

        <span> / </span>

        <Link to="/blogs">Blogs</Link>

        <span> / </span>

        <span>{blog.title}</span>

      </div>

      <Link
        to="/blogs"
        className="blogdetails-back"
      >
        ← Back to Blogs
      </Link>

      <span className="blogdetails-category">
        {blog.category}
      </span>

      <h1 className="blogdetails-title">
        {blog.title}
      </h1>

      <div className="blogdetails-author">

        <img
          src={blog.authorImage}
          alt={blog.author}
        />

        <div>

          <h4>{blog.author}</h4>

          <p>

            {blog.publishDate}

            {" • "}

            {blog.readTime}

          </p>

        </div>
        <div className="blog-share">

  <span>Share:</span>

  <a
    href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
    target="_blank"
    rel="noreferrer"
  >
    <FaFacebookF />
  </a>

  <a
    href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
    target="_blank"
    rel="noreferrer"
  >
    <FaLinkedinIn />
  </a>

  <a
    href={`https://twitter.com/intent/tweet?url=${currentUrl}`}
    target="_blank"
    rel="noreferrer"
  >
    <FaTwitter />
  </a>

  <a
    href={`https://wa.me/?text=${currentUrl}`}
    target="_blank"
    rel="noreferrer"
  >
    <FaWhatsapp />
  </a>

  <button onClick={copyLink}>
    <FaLink />
  </button>

</div>

      </div>

      <p className="blogdetails-shortdesc">

        {blog.shortDescription}

      </p>

      <div className="blogdetails-content">

        {blog.content}

      </div>

  

 <div className="blogdetails-helpful">

  <div className="helpful-left">

    <h4>Was this article helpful?</h4>

    <button>Yes</button>

    <button>No</button>

  </div>
{/* 
  <div className="helpful-share">

    <span>Share:</span>

    <a
      href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
      target="_blank"
      rel="noreferrer"
    >
      <FaFacebookF />
    </a>

    <a
      href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
      target="_blank"
      rel="noreferrer"
    >
      <FaLinkedinIn />
    </a>

    <a
      href={`https://twitter.com/intent/tweet?url=${currentUrl}`}
      target="_blank"
      rel="noreferrer"
    >
      <FaTwitter />
    </a>

    <a
      href={`https://wa.me/?text=${currentUrl}`}
      target="_blank"
      rel="noreferrer"
    >
      <FaWhatsapp />
    </a>

    <button onClick={copyLink}>
      <FaLink />
    </button>

  </div> */}

</div>
    </div>


    {/* RIGHT SIDE */}

    <div className="blogdetails-right">

      <img
        src={blog.coverImage}
        alt={blog.title}
        className="blogdetails-cover"
      />

      {/* Related Articles */}

      <div className="blogdetails-related">

        <h3>
          Related Articles
        </h3>

        {

          relatedBlogs?.map((item) => (

            <Link

              key={item._id}

              to={`/blog/${item.slug}`}

              className="blogdetails-related-card"

            >

              <img
                src={item.coverImage}
                alt={item.title}
              />

              <div>

                <h4>
                  {item.title}
                </h4>

                <p>

                  {item.publishDate}

                  {" • "}

                  {item.readTime}

                </p>

              </div>

            </Link>

          ))

        }

      </div>


      {/* Categories */}

      <div className="blogdetails-categories">

        <h3>
          Categories
        </h3>

        {

          Object.entries(categoryCount).map(

            ([name, count]) => (

              <div

                className="blogdetails-category-row"

                key={name}

              >

                <span>

                  {name}

                </span>

                <span>

                  {count}

                </span>

              </div>

            )

          )

        }

      </div>


      {/* Subscribe */}

      <div className="blogdetails-subscribe">

        <h3>
          Stay Updated
        </h3>

        <p>

          Subscribe to get the latest tax updates and CA insights.

        </p>

        <input
          type="email"
          placeholder="Enter your email"
        />

        <button>

          Subscribe

        </button>

      </div>

    </div>

  </div>

</section>


  );

}

export default BlogDetails;