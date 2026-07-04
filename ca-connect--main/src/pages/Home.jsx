import API_URL from "../config";
import "./Home.css";
import heroImg from "../assets/hero.png";
import {
  FaShieldAlt,
  FaWallet,
  FaLock,
  FaFileInvoice,
  FaBuilding,
  FaClipboardList,
  FaTrademark,
  FaRegBookmark,
  FaBook,
  FaClock,
  FaLightbulb,
  FaMapMarkerAlt,
  FaSearch,
  FaBookmark,
  FaPaperPlane,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaUsers,
  FaArrowRight,
  FaRegCalendarAlt,
  FaRegClock,

} from "react-icons/fa";
import {
  HiOutlineUserGroup,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import home1 from "../assets/home1.png";
import home2 from "../assets/home2.png";
import home3 from "../assets/home3.png";
import home4 from "../assets/home4.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Home() {

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-in-out",
    });
  }, []);
    const [searchDone, setSearchDone] = useState(false);
const [searchResults, setSearchResults] = useState([]);
  const [city, setCity] = useState("");
// //  const [cities,setCities] = useState([]);
// const cities = await Vendor.distinct("city");

  const [businessType, setBusinessType] = useState("");
  const [service, setService] = useState("");

const [showAllFaqs, setShowAllFaqs] = useState(false);

  const [allServices, setAllServices] = useState([]);

  const [vendors, setVendors] = useState([]);
















  const topCities = [
  "Hyderabad",
  "Bangalore",
  "Chennai",
  "Mumbai",
  "Delhi",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Vijayawada",
  "Visakhapatnam"
];

  useEffect(() => {
      fetchTopVendors();
      // fetchCities();
      
      fetchServices();

  }, []);



//  const fetchCities = async () => {
//   const res = await axios.get(
//     `${API_URL}/api/vendor/cities`
//   );

//   setCities(res.data);
// };

const handleSearch = async (selectedService = service) => {

  try{

    const res = await axios.get(
      `${API_URL}/api/vendor/search`,
      {
        params:{
          service:selectedService,
          city,
          businessType
        }
      }
    );

    setSearchDone(true);

    setSearchResults(
      Array.isArray(res.data)
        ? res.data
        : res.data.vendors || []
    );

  }catch(err){

    setSearchDone(true);
    setSearchResults([]);

  }

}





const [savedVendors, setSavedVendors] = useState([]);

const handleSaveVendor = async (vendorId) => {

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login to save vendors");
    navigate("/login");
    return;
  }

  try {

    const res = await axios.post(
      `${API_URL}/api/saved/save`,
      { vendorId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(res.data.message);

    if (!savedVendors.includes(vendorId)) {
      setSavedVendors(prev => [
        ...prev,
        vendorId
      ]);
    }

  } catch (err) {

    console.log(err);

    alert("Unable to save vendor");

  }
};



const fetchSavedVendors = async () => {
  try {

    const token = localStorage.getItem("token");

    if (!token) return;

    const res = await axios.get(
      `${API_URL}/api/saved/save`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSavedVendors(
      res.data.savedCAs.map(
        (vendor) => vendor._id
      )
    );

  } catch (err) {

    console.log(err);

  }
};








  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
    fetchSavedVendors();
  }, []);

  const fetchBlogs = async () => {

    try {

      const res = await axios.get(
        `${API_URL}/api/blogs`
      );

      setBlogs(res.data);

    }

    catch (err) {

      console.log(err);

    }

  };




  const fetchServices = async () => {

    try {

      const res = await axios.get(
        `${API_URL}/api/vendor/all-services`
      );

      setAllServices(res.data);

    } catch (err) {

      console.log(err);

    }

  };

 

  const fetchTopVendors = async () => {

  try {

    const res = await axios.get(
      `${API_URL}/api/vendor`
    );

    setVendors(
      Array.isArray(res.data)
        ? res.data
        : res.data.vendors || []
    );

  }

  catch (err) {

    console.log(err);

  }

};


  const navigate = useNavigate();






  return (
    <>
      {/* HERO SECTION */}

     <section className="home-hero-section">

  <div
    className="home-hero-left"
    data-aos="fade-right"
    data-aos-duration="1000"
  >

    <span
      className="home-hero-badge"
      data-aos="fade-down"
      data-aos-delay="100"
    >
      India's Most Trusted CA Marketplace
    </span>

    <h1
      className="home-hero-title"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      Find Trusted Experts for Every
      <span>  Business  Need</span>
    </h1>

    <p
      className="home-hero-description"
      data-aos="fade-up"
      data-aos-delay="350"
    >
     Connect with trusted Chartered Accountants, Legal Experts, Business Consultants,
      and Insurance & Loan Advisors to gain expert guidance, make confident decisions,
       and accelerate your business growth.
    </p>

    <div
      className="home-hero-features"
      data-aos="fade-up"
      data-aos-delay="500"
    >

      <div className="home-hero-feature">
        <FaShieldAlt className="home-hero-feature-icon" />
        <span>Verified Professionals</span>
      </div>

      <div className="home-hero-feature">
        <FaWallet className="home-hero-feature-icon" />
        <span>Transparent Pricing</span>
      </div>

      <div className="home-hero-feature">
        <FaLock className="home-hero-feature-icon" />
        <span>Secure & Reliable</span>
      </div>

    </div>

  </div>

  <div
    className="home-hero-right"
    data-aos="zoom-in"
    data-aos-delay="400"
    data-aos-duration="1200"
  >
    <img
      src={heroImg}
      alt="CA Dashboard"
      className="home-hero-image"
    />
  </div>

</section>



<section className="home-search-section">

  <div className="home-search-header">

    <div className="home-search-title-row">
      <HiOutlineUserGroup className="home-search-title-icon" />
      <h3>Find CA / Firm</h3>
    </div>

    <div className="home-search-title-line"></div>

  </div>


  <div className="home-search-labels">

    <span>What do you need help with?</span>

    <span>Where?</span>

    <span>Select Business Type (Optional)</span>

    <span></span>

  </div>


  <div className="home-search-fields">

    <select
      className="home-search-select"
      value={service}
      onChange={(e) => setService(e.target.value)}
    >
      <option value="">
        Select Service
      </option>

      {allServices.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>

<div className="home-city-box">

  <HiOutlineLocationMarker className="home-city-icon"/>
{/* <select
  className="home-search-select"
  value={city}
  onChange={(e)=>setCity(e.target.value)}
>
  <option value="">Select City</option>

  {cities.map((city,index)=>(
    <option
      key={index}
      value={city}
    >
      {city}
    </option>
  ))}
</select> */}




<select
    className="home-city-select"
    value={city}
    onChange={(e)=>setCity(e.target.value)}
  >
    <option value="">
      Choose City
    </option>

    {topCities.map((city,index)=>(
      <option
        key={index}
        value={city}
      >
        {city}
      </option>
    ))}
  </select>

</div>


    <select
      className="home-search-select"
      value={businessType}
      onChange={(e) => setBusinessType(e.target.value)}
    >
      <option value="">
        All Business Types
      </option>

      <option value="Individual">
        Individual
      </option>

      <option value="Partnership">
        Partnership
      </option>

      <option value="Company">
        Company
      </option>

      <option value="LLP">
        LLP
      </option>
    </select>


    <button
      type="button"
      className="home-search-button"
      onClick={() => handleSearch()}
    >
      <FaSearch />
      Search Now
    </button>

  </div>


  <div className="home-popular-searches">

    <span>Popular Searches :</span>

    {allServices.slice(0, 8).map((item, index) => (

      <button
        key={index}
        type="button"
        className="home-popular-search-button"
        onClick={() => {
          setService(item);
          handleSearch(item);
        }}
      >
        {item}
      </button>

    ))}

  </div>


  {searchDone && (

    <div className="home-search-results">

      {searchResults.length > 0 ? (

        <div className="home-result-list">

          {searchResults.map((vendor) => (

            <div
              key={vendor._id}
              className="home-result-card"
            >

              <img
                className="home-result-image"
                src={
                  vendor.photo
                    ? `${API_URL}/uploads/${vendor.photo}`
                    : "/avatar.png"
                }
                alt={vendor.fullName}
              />

              <div className="home-result-content">

                <h4>
                  {vendor.firmName || vendor.fullName}
                </h4>

                <p>
                  📍 {vendor.city}, {vendor.state}
                </p>

                <p>
                  {vendor.services?.length > 0
                    ? vendor.services
                        .map((s) => s.serviceName)
                        .join(", ")
                    : "No Services"}
                </p>

              </div>

              <button
                className="home-view-profile-btn"
                onClick={() =>
                  navigate(`/vendor/${vendor._id}`)
                }
              >
                View Profile
              </button>

            </div>

          ))}

        </div>

      ) : (

        <div className="home-no-results">

          <h3>No CA / Firm Found</h3>

          <p>
            No Chartered Accountant available for your search.
          </p>

        </div>

      )}

    </div>

  )}

</section>


      {/* Popular Services Section */}

      <section className="popula-services-section">

        <div
          className="popula-services-header"
          data-aos="fade-up"
        >
          <h2>Popular Services</h2>

          <a href="/service" className="popula-view-all">
            View All Services
            <FaArrowRight />
          </a>
        </div>

        <div className="popula-services-grid">

          <div className="popula-service-card">
            <div className="popula-service-icon popula-green">
              <FaFileInvoice />
            </div>
            <h4>GST Filing</h4>
          </div>

          <div className="popula-service-card">
            <div className="popula-service-icon popula-blue">
              <FaClipboardList />
            </div>
            <h4>Income Tax Filing</h4>
          </div>

          <div className="popula-service-card">
            <div className="popula-service-icon popula-purple">
              <FaBuilding />
            </div>
            <h4>Company Registration</h4>
          </div>

          <div className="popula-service-card">
            <div className="popula-service-icon popula-red">
              <FaClipboardList />
            </div>
            <h4>ROC Filing</h4>
          </div>

          <div className="popula-service-card">
            <div className="popula-service-icon popula-cyan">
              <FaTrademark />
            </div>
            <h4>Trademark Registration</h4>
          </div>

          <div className="popula-service-card">
            <div className="popula-service-icon popula-orange">
              <FaShieldAlt />
            </div>
            <h4>Audit & Assurance</h4>
          </div>

          <div className="popula-service-card">
            <div className="popula-service-icon popula-violet">
              <FaBook />
            </div>
            <h4>Bookkeeping</h4>
          </div>

          <div className="popula-service-card">
            <div className="popula-service-icon popula-navy">
              <FaUsers />
            </div>
            <h4>Payroll Services</h4>
          </div>

        </div>

      </section>



      {/* Top Rated CA & Firms */}

      <section
        className="top-ca-section"
        data-aos="fade-up"
      >

        <div className="top-ca-header">
          <h2>Top Rated CA & Firms</h2>

          <a href="/find-ca" className="view-all-ca">
            View All →
          </a>
        </div>

        <div className="ca-slider-wrapper">

          <button className="ca-prev">
            <FaChevronLeft />
          </button>

          <button className="ca-next">
            <FaChevronRight />
          </button>
          <Swiper
            modules={[Navigation]}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = ".ca-prev";
              swiper.params.navigation.nextEl = ".ca-next";
            }}
            navigation={{
              prevEl: ".ca-prev",
              nextEl: ".ca-next",
            }}
            spaceBetween={20}
            slidesPerView={3}
            speed={700}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            className="ca-swiper"
          >
            {vendors.map((ca, index) => (

              <SwiperSlide key={ca._id || index}>

                <div
                  className="ca-card"
                  data-aos="zoom-in-up"
                  data-aos-delay={index * 100}
                >

                  <div className="ca-card-top">

                    <img
                      src={
                        ca.photo
                          ? `${API_URL}/uploads/${ca.photo}`
                          : "/avatar.png"
                      }
                      alt={ca.fullName}
                    />

                    <div className="ca-content">

                      <div className="ca-head">

                        <h4>
                          {ca.firmName ||
                            ca.fullName}
                        </h4>


{
  savedVendors.includes(ca._id) ? (

    <FaBookmark
      className="bookmark-icon saved"
      onClick={() => handleSaveVendor(ca._id)}
    />

  ) : (

    <FaRegBookmark
      className="bookmark-icon"
      onClick={() => handleSaveVendor(ca._id)}
    />

  )
}

                      </div>

                      <p className="rating">
                        ⭐ {ca.rating || "4.8 (0)"}
                      </p>

                      <p className="location">
                        {ca.city || "Location"}
                        {ca.state
                          ? `, ${ca.state}`
                          : ""}
                      </p>

                      <p className="service">
                        {ca.services?.length > 0
                          ? ca.services
                            .map(
                              (service) =>
                                service.serviceName
                            )
                            .join(", ")
                          : "CA Services"}
                      </p>

                      <h5>
                        Starting from ₹
                        {ca.services?.length > 0
                          ? ca.services[0].price
                          : 999}
                      </h5>
                    </div>

                  </div>


                <button
  className="profile-btn"
  onClick={() => navigate(`/vendor/${ca._id}`)}
>
  View Profile
</button>

                </div>

              </SwiperSlide>

            ))}

          </Swiper>

        </div>

      </section>









      {/* HOW IT WORKS */}
<section className="how-section">

  <div className="how-heading">
    <span className="how-tag">
      SIMPLE PROCESS
    </span>

    <h2>
      HOW IT WORKS
    </h2>

    <p>
      Connect with verified Chartered Accountants in just four simple steps.
    </p>
  </div>

  <div className="how-wrapper">

    <div className="how-card">

      <div className="how-icon">
        <FaSearch />
      </div>

      <div className="how-title">
        <span className="how-number">01</span>
        <h4>SEARCH</h4>
      </div>

      <p>
        Search for the service you need and choose your preferred location.
      </p>

    </div>

    <div className="how-arrow">
      <i className="fas fa-arrow-right"></i>
    </div>

    <div className="how-card">

      <div className="how-icon">
        <FaClipboardList />
      </div>

      <div className="how-title">
        <span className="how-number">02</span>
        <h4>COMPARE</h4>
      </div>

      <p>
        Compare CA profiles, pricing, experience and customer reviews.
      </p>

    </div>

    <div className="how-arrow">
      <i className="fas fa-arrow-right"></i>
    </div>

    <div className="how-card">

      <div className="how-icon">
        <FaPaperPlane />
      </div>

      <div className="how-title">
        <span className="how-number">03</span>
        <h4>CONNECT</h4>
      </div>

      <p>
        Send enquiry or instantly book an online consultation.
      </p>

    </div>

    <div className="how-arrow">
      <i className="fas fa-arrow-right"></i>
    </div>

    <div className="how-card">

      <div className="how-icon">
        <FaCheckCircle />
      </div>

      <div className="how-title">
        <span className="how-number">04</span>
        <h4>GET IT DONE</h4>
      </div>

      <p>
        Complete your compliance work quickly and securely.
      </p>

    </div>

  </div>

</section>











      <section className="expert-banner">

        {/* LEFT IMAGE */}

        <div
          className="expert-left"
          data-aos="fade-right"
        >
          <img src={home1} alt="Calendar" />
        </div>

        {/* CONTENT */}

        <div
          className="expert-content"
          data-aos="fade-up"
        >
          <h2>
            Talk to Experts Instantly
            <span> ✨</span>
          </h2>

          <p>
            30-Min Consultation with Verified CA Professionals
          </p>

          <div className="expert-features">

            <div className="expert-feature">
              <FaClock />
              <span>30 Min Session</span>
            </div>

            <div className="expert-feature">
              <FaLightbulb />
              <span>Expert Guidance</span>
            </div>

            <div className="expert-feature">
              <FaMapMarkerAlt />
              <span>Secure & Private</span>
            </div>

          </div>
        </div>

        {/* PRICE */}

        <div
          className="expert-price-box"
          data-aos="zoom-in"
        >
          <small>Starting from</small>

          <h3>₹999/-</h3>

          <div className="expert-btns">

            <button className="book-btn">
              Book Now
            </button>

            <button className="plan-btn">
              Explore Plans
            </button>

          </div>
        </div>

        {/* RIGHT IMAGE */}

        <div
          className="expert-right"
          data-aos="fade-left"
        >
          <img src={home2} alt="Experts" />
        </div>

      </section>










      <section className="ai-assistant-section">
        <div className="ai-assistant-container">

          {/* LEFT CHAT CARD */}
          <div
            className="chat-card"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <div className="chat-header">
              <i className="fas fa-robot"></i>
              <span>CA AI Assistant</span>
            </div>

            <div className="chat-message user">
              Hello! How can I help you today?
            </div>

            <div className="chat-message question">
              What is the last date for GST Filing?
            </div>

            <div className="chat-message answer">
              The last date for filing GSTR-1 is
              <br />
              the 11th of next month.
            </div>

            <div className="chat-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          {/* CENTER CONTENT */}
          <div
            className="assistant-content"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <h2>
              Your AI Assistant for
              
              All Tax & Compliance Questions
            </h2>

            <ul>
              <li>
                <i className="fas fa-check-circle"></i>
                <span>Get instant answers to your queries</span>
              </li>

              <li>
                <i className="fas fa-check-circle"></i>
                <span>Find the right CA for your needs</span>
              </li>

              <li>
                <i className="fas fa-check-circle"></i>
                <span>Understand tax & compliance easily</span>
              </li>

              <li>
                <i className="fas fa-check-circle"></i>
                <span>Upload documents and get guidance</span>
              </li>
            </ul>
<button
  className="assistant-btn"
  onClick={() => navigate("/ai-assistant")}
>
  Try AI Assistant
</button>
          </div>

          {/* RIGHT ROBOT */}
          <div
            className="robot-box"
            data-aos="fade-left"
            data-aos-duration="1000"
          >


            <img
              src={home3}
              alt="AI Assistant Robot"
            />
          </div>

        </div>
      </section>












      <section className="home-blog-section">

        <div className="home-blog-header">

          <h2>Latest from Our Blog</h2>

          <Link
            to="/blogs"
            className="home-blog-viewall"
          >
            View All Blogs →
          </Link>

        </div>

        <div className="home-blog-grid">

          {

            blogs.slice(0, 4).map((blog) => (

              <Link
                key={blog._id}
                to={`/blog/${blog.slug}`}
                className="home-blog-card"
              >

                <div className="home-blog-image">

                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                  />

                  <span className="home-blog-category">

                    {blog.category}

                  </span>

                </div>

                <div className="home-blog-content">

                  <h3>

                    {blog.title}

                  </h3>

                  <div className="home-blog-meta">

                    <div className="home-blog-date">

                      <FaRegCalendarAlt />

                      <span>
                        {blog.publishDate}
                      </span>

                    </div>

                    <div className="home-blog-time">

                      <FaRegClock />

                      <span>
                        {blog.readTime}
                      </span>

                    </div>

                  </div>

                </div>

              </Link>

            ))

          }

        </div>

      </section>
















      <section className="faq-section">

        <div className="faq-container">

          {/* LEFT FAQ */}

          <div
            className="faq-left"
            data-aos="fade-right"
            data-aos-duration="1000"
          >

            <h2>Frequently Asked Questions</h2>

            <details className="faq-item" >
              <summary className="faq-question">
                <span>How can I find a trusted CA near me?</span>
              </summary>

              <div className="faq-answer">
                Browse verified Chartered Accountants, compare profiles,
                ratings and reviews to choose the right CA for your
                business or personal requirements.
              </div>
            </details>

            <details className="faq-item">
              <summary className="faq-question">
                <span>How does online consultation work?</span>
              </summary>

              <div className="faq-answer">
                Book a consultation slot, connect with a CA through
                video or phone call and receive expert guidance
                from anywhere.
              </div>
            </details>

            <details className="faq-item">
              <summary className="faq-question">
                <span>Is my data and payment information secure?</span>
              </summary>

              <div className="faq-answer">
                Yes. We use secure payment gateways and encrypted
                communication systems to keep your personal and
                financial information safe.
              </div>
            </details>

            <details className="faq-item">
              <summary className="faq-question">
                <span>How are the fees and pricing decided?</span>
              </summary>

              <div className="faq-answer">
                Pricing depends on the service type, complexity
                and the experience level of the CA selected.
              </div>
            </details>

            <details className="faq-item">
              <summary className="faq-question">
                <span>Can I upload documents online?</span>
              </summary>

              <div className="faq-answer">
                Yes. You can securely upload documents, share files
                with professionals and receive guidance online.
              </div>
            </details>




{
showAllFaqs && (
<>
  <details className="faq-item">
    <summary className="faq-question">
      <span>Can I choose a CA based on specialization?</span>
    </summary>

    <div className="faq-answer">
      Yes. You can filter professionals based on GST, Taxation,
      Audit, Company Registration, ROC Compliance and other
      specialized services.
    </div>
  </details>

  <details className="faq-item">
    <summary className="faq-question">
      <span>How quickly will I receive a response?</span>
    </summary>

    <div className="faq-answer">
      Most professionals respond within a few hours depending
      on their availability and service requirements.
    </div>
  </details>

  <details className="faq-item">
    <summary className="faq-question">
      <span>Can I book appointments with multiple CAs?</span>
    </summary>

    <div className="faq-answer">
      Yes. You can compare professionals and schedule
      consultations with multiple experts before making
      a final decision.
    </div>
  </details>

  <details className="faq-item">
    <summary className="faq-question">
      <span>Do you provide services for startups and businesses?</span>
    </summary>

    <div className="faq-answer">
      Absolutely. We support startups, MSMEs and enterprises
      with registration, taxation, compliance and advisory
      services.
    </div>
  </details>

  <details className="faq-item">
    <summary className="faq-question">
      <span>Can I track the status of my enquiry?</span>
    </summary>

    <div className="faq-answer">
      Yes. Your dashboard allows you to monitor enquiry
      progress, appointments and responses from professionals.
    </div>
  </details>
</>
)
}

<button
  className="faq-link"
  onClick={() =>
    setShowAllFaqs(
      !showAllFaqs
    )
  }
>

{
showAllFaqs
? "Show Less FAQs"
: "View All FAQs"
}

<i className="fas fa-arrow-right"></i>

</button>

          </div>

          {/* RIGHT SUPPORT CARD */}

          <div
            className="support-card"
            data-aos="fade-left"
            data-aos-duration="1000"
          >

            <div className="support-content">

              <div className="support-badge">
                <i className="fas fa-headset"></i>
                Support Available 24/7
              </div>

              <h3>

                Need Help ?
              </h3>

              <p>
                Get expert assistance for GST filing,
                Income Tax, Business Registration,
                Compliance and Professional Services.
              </p>

        <div className="support-buttons">

  <Link to="/support" className="contact-btn">
    Contact Support
  </Link>

  <a
    href="https://wa.me/919177267680?text=Hello%20Bussult%20Team,%20I%20need%20assistance%20with%20your%20services."
    target="_blank"
    rel="noopener noreferrer"
    className="chat-btn"
  >
    Live Chat
  </a>

</div>

            </div>

            <div className="support-image">

              <img
                src={home4}
                alt="Support Team"
              />

            </div>

          </div>

        </div>

   











</section>






    </>
  );
}

export default Home;