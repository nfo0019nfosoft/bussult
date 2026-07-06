import API_URL from "../config";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserSidebar from "../components/UserSidebar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

import {
    FaHeart,
    FaSearch,
    FaStar,
    FaMapMarkerAlt,
    FaBuilding,
    FaPhoneAlt,
    FaEllipsisV,
    FaEye,
    FaClock,
    FaExchangeAlt,
    FaRegCommentDots,
    FaBell,
    FaCheckCircle 

} from "react-icons/fa";

import "./UserSavedCA.css";

function UserSavedCA() {

    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [recentViewed, setRecentViewed] = useState([]);
    const [savedCAs, setSavedCAs] = useState([]);
    const [compareCAs, setCompareCAs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("recent");
    const [activeTab, setActiveTab] = useState("favorites");
   
    const [showComparePopup, setShowComparePopup] = useState(false);
const [showCompareTable, setShowCompareTable] = useState(false);

useEffect(() => {
  fetchSavedCAs();
  fetchUserProfile();
    fetchCompare();
      fetchRecentViewed();  
}, []);

useEffect(() => {
  console.log("Saved CAs", savedCAs);
}, [savedCAs]);


const fetchSavedCAs = async () => {
  try {

    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    const response = await axios.get(
      `${API_URL}/api/saved/save`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(
      "Saved CAs:",
      response.data.savedCAs
    );

    setSavedCAs(
      response.data.savedCAs || []
    );

  } catch (error) {

    console.error(
      "Error fetching saved CAs:",
      error.response?.data ||
      error.message
    );

  } finally {

    setLoading(false);

  }
};



const fetchRecentViewed = async () => {

  try {

    const token =
      localStorage.getItem("token");

    const res =
      await axios.get(
        `${API_URL}/api/recent`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    console.log(
      "RECENT API =>",
      res.data
    );

    const recentData =
      Array.isArray(res.data)
        ? res.data
        : res.data.recentViewed ||
          res.data.data ||
          [];

    setRecentViewed(
      recentData
    );

  }
  catch(err){

    console.log(err);

    setRecentViewed([]);

  }

};



const fetchCompare = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(
    `${API_URL}/api/compare`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  setCompareCAs(res.data);
};



    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(
                `${API_URL}/api/users/profile`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

         setUser(res.data.user);

        } catch (err) {
            console.log(err);
        }
    };



    const removeSavedCA = async (id) => {

        try {

            const token = localStorage.getItem("token");

            await axios.delete(
                `${API_URL}/api/saved/save/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSavedCAs(savedCAs.filter((item) => item._id !== id));

        } catch (err) {

            console.log(err);

        }
    };





 



    const removeCompare = async (vendorId) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `${API_URL}/api/compare/${vendorId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setCompareCAs((prev) =>
      prev.filter(
        (item) => item.vendor._id !== vendorId
      )
    );

  } catch (err) {
    console.log(err);
  }
};

    const filteredCAs = savedCAs.filter((ca) =>
        ca.fullName.toLowerCase().includes(search.toLowerCase())
    );

















const handleLogout = () => {

  const confirmLogout = window.confirm(
    "Are you sure you want to logout?"
  );

  if (!confirmLogout) return;

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/login");

};
















    return (
        <>
        

{showComparePopup && (
  <div className="compare-popup-overlay">

    <div className="compare-popup">

      <div className="compare-popup-header">

        <h2>Compare CAs ({compareCAs.length}/4)</h2>

        <button
          className="compare-close"
          onClick={() => {
            setShowComparePopup(false);
            setShowCompareTable(false);
          }}
        >
          ✕
        </button>

      </div>

      {/* IKKADE NUVVU PAMPIINA compare-popup-body PASTE CHEYYALI */}

      <div className="compare-popup-body">

        {!showCompareTable ? (

          <>
            {compareCAs.map((item) => (

              <div
                className="compare-popup-card"
                key={item.vendor._id}
              >

                <img
                  src={
                    item.vendor.photo
                      ? `${API_URL}/uploads/${item.vendor.photo}`
                      : "/avatar.png"
                  }
                  alt=""
                />

                <div className="compare-popup-info">

                  <h4>{item.vendor.fullName}</h4>

                  <p>{item.vendor.designation}</p>

                  <span>⭐ {item.vendor.rating || 4.8}</span>

                </div>

              </div>

            ))}

          </>

        ) : (

          <div className="compare-table">

            <div className="compare-row compare-header">

              <div>Feature</div>

              {compareCAs.map((item) => (

                <div key={item.vendor._id}>

                  <img
                    src={
                      item.vendor.photo
                        ? `${API_URL}/uploads/${item.vendor.photo}`
                        : "/avatar.png"
                    }
                    alt=""
                  />

                  <h4>{item.vendor.fullName}</h4>

                </div>

              ))}

            </div>

            <div className="compare-row">

              <div>Designation</div>

              {compareCAs.map((item) => (
                <div key={item.vendor._id + "designation"}>
                  {item.vendor.designation}
                </div>
              ))}

            </div>

            <div className="compare-row">

              <div>Experience</div>

              {compareCAs.map((item) => (
                <div key={item.vendor._id + "experience"}>
                  {item.vendor.experience} Years
                </div>
              ))}

            </div>

            <div className="compare-row">

              <div>Rating</div>

              {compareCAs.map((item) => (
                <div key={item.vendor._id + "rating"}>
                  ⭐ {item.vendor.rating || 4.8}
                </div>
              ))}

            </div>

            <div className="compare-row">

              <div>Firm</div>

              {compareCAs.map((item) => (
                <div key={item.vendor._id + "firm"}>
                  {item.vendor.firmName}
                </div>
              ))}

            </div>

            <div className="compare-row">

              <div>Location</div>

              {compareCAs.map((item) => (
                <div key={item.vendor._id + "location"}>
                  {item.vendor.city}
                </div>
              ))}

            </div>

            <div className="compare-row">

              <div>Status</div>

              {compareCAs.map((item) => (
                <div key={item.vendor._id + "status"}>
                  {item.vendor.available ? "Available" : "Unavailable"}
                </div>
              ))}

            </div>

          </div>

        )}

      </div>

      <div className="compare-popup-footer">

        {!showCompareTable && (
          <button
            className="compare-now-btn"
            onClick={() => setShowCompareTable(true)}
          >
            Compare Now
          </button>
        )}

      </div>

    </div>

  </div>
)}
<div className="usersavedca-page">

    <UserSidebar />

    <div className="usersavedca-content">

         
            
            <div className="dashboard-header">

                <div>
                    <h1>Saved CAs</h1>
                    <p>
                        Manage your favorite, recently viewed and compared CAs in one place
                    </p>
                </div>

                <div className="dashboard-right">

                    <div className="dashboard-search">
                        <FaSearch />

                        <input
                            type="text"
                            placeholder="Search anything..."
                        />

                        <span>Ctrl + K</span>
                    </div>

                    <button className="dashboard-icon">
                        <FaRegCommentDots />
                    </button>

                    <button className="dashboard-icon notification">

                        <FaBell />



                    </button>

                  <div className="dashboard-user"  onClick={handleLogout}>
  <img
  src={
    user?.profileImage
      ? `${API_URL}${user.profileImage}`
      : "/avatar.png"
  }
  alt={user?.name || "User"}
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



            <div className="usersavedca-container">

                {/* LEFT SIDE */}



<div className="usersavedca-left">






              <div className="usersaved-tabs">

  <button
    className={`usersaved-tab ${
      activeTab === "favorites"
        ? "active"
        : ""
    }`}
    onClick={() =>
      setActiveTab("favorites")
    }
  >
    <FaHeart />
    Favorite Professionals
    <span>{savedCAs.length}</span>
  </button>

  <button
    className={`usersaved-tab ${
      activeTab === "recent"
        ? "active"
        : ""
    }`}
    onClick={() =>
      setActiveTab("recent")
    }
  >
    <FaEye />
    Recently Viewed CAs
    <span>{recentViewed.length}</span>
  </button>

  <button
    className={`usersaved-tab ${
      activeTab === "compare"
        ? "active"
        : ""
    }`}
    onClick={() =>
      setActiveTab("compare")
    }
  >
    <FaExchangeAlt />
    Compare CAs
    <span>{compareCAs.length}</span>
  </button>

</div>

  {/* ===========================
      Favorite Professionals
  ============================ */}

  <div className="usersavedca-favorites-section">

    <div className="usersavedca-favorites-header">

      <div>
        <h2>Favorite Professionals</h2>

        <p>
          Your most trusted CAs that you have saved for quick access.
        </p>
      </div>

      <div className="usersavedca-sort">

        <label>Sort by :</label>

        <select>
          <option>Recently Added</option>
          <option>Highest Rating</option>
          <option>Experience</option>
        </select>

      </div>

    </div>

    {/* Cards */}

    {loading ? (

      <h3>Loading...</h3>

    ) : (

      savedCAs.map((ca) => (

        <div
          className="usersavedca-favorite-card"
          key={ca._id}
        >

          {/* LEFT */}

          <div className="usersavedca-card-left">

            <div className="usersavedca-image-box">

              <img
                src={
                  ca.photo
                    ? `${API_URL}/uploads/${ca.photo}`
                    : "/avatar.png"
                }
                alt={ca.fullName}
              />

              <div className="usersavedca-fav-icon">
                <FaHeart />
              </div>

            </div>

            <div className="usersavedca-card-info">

              <h3>{ca.fullName}</h3>

              <p>{ca.designation}</p>

              <div className="usersavedca-rating">

                <FaStar />

                <strong>{ca.rating || 4.8}</strong>

                <span>({ca.totalReviews || 128} Reviews)</span>


                <span>{ca.experience}+ Years Exp.</span>

              </div>

            </div>

          </div>

          {/* CENTER */}

          <div className="usersavedca-card-center">

            <p>
              <FaMapMarkerAlt />
              {ca.city}, {ca.state}
            </p>

            <p>
              <FaBuilding />
              {ca.firmName}
            </p>

            <span>
              <FaCheckCircle />
              {ca.available ? "Available" : "Unavailable"}
            </span>

          </div>

          {/* RIGHT */}

          <div className="usersavedca-card-right">

            <button className="usersavedca-profile-btn">
              View Profile
            </button>

            <button className="usersavedca-contact-btn">
              Contact
            </button>

          </div>

        </div>

      ))

    )}

  </div>

  {/* ===========================
      Recently Viewed
  ============================ */}

  <div className="usersavedca-recent">

    <div className="usersavedca-recent-header">

      <div>

        <h3>Recently Viewed CAs</h3>

        <p>
          CAs you have recently viewed on the platform.
        </p>

      </div>

      <button>View All</button>

    </div>

    <div className="usersavedca-recent-list">

      {recentViewed.map((ca) => (

        <div
          className="usersavedca-recent-card"
          key={`${ca.vendor._id}-${ca.viewedAt}`}
        >

          <img
            src={
              ca.vendor.photo
                ? `${API_URL}/uploads/${ca.vendor.photo}`
                : "/avatar.png"
            }
            alt={ca.vendor.fullName}
          />

          <h4>{ca.vendor.fullName}</h4>

          <p>{ca.vendor.designation}</p>

          <div className="usersavedca-rating">

            <FaStar />

            <strong>4.8</strong>

            <span>(128 Reviews)</span>

          </div>
          <p className="usersavedca-recent-time">
  {dayjs(ca.viewedAt).fromNow()}
</p>

        </div>

      ))}

    </div>

  </div>

</div>












{/* RIGHT SIDE */}

<div className="usersavedca-right">

  {/* Saved Overview */}

  <div className="usersavedca-overview">

    <h3>Saved Overview</h3>

    <div className="usersavedca-overview-item">

      <FaHeart />

      <div>
        <h2>{savedCAs.length}</h2>
        <p>Favorite Professionals</p>
      </div>

    </div>

    <div className="usersavedca-overview-item">

      <FaClock />

      <div>
        <h2>{recentViewed.length}</h2>
        <p>Recently Viewed CAs</p>
      </div>

    </div>

    <div className="usersavedca-overview-item">

      <FaExchangeAlt />

      <div>
        <h2>{compareCAs.length}</h2>
        <p>CAs in Compare</p>
      </div>

    </div>

    <div className="usersavedca-overview-item">

      <FaEye />

      <div>
        <h2>
          {savedCAs.length + recentViewed.length + compareCAs.length}
        </h2>

        <p>Total Interactions</p>

      </div>

    </div>

  </div>

  {/* Compare */}

  <div className="usersavedca-compare">

    <div className="usersavedca-compare-header">

      <h3>
        Compare CAs ({compareCAs.length}/4)
      </h3>

      <button>View All</button>

    </div>

    {compareCAs.map((item) => (

      <div
        className="usersavedca-compare-item"
        key={item._id}
      >

        <img
          src={
            item.vendor.photo
              ? `${API_URL}/uploads/${item.vendor.photo}`
              : "/avatar.png"
          }
          alt={item.vendor.fullName}
        />

        <div className="usersavedca-compare-info">

          <h4>{item.vendor.fullName}</h4>

          <small>
            ⭐ {item.vendor.rating || 4.8} • {item.vendor.experience}+ Years
          </small>

        </div>

        <button
          className="usersavedca-remove-btn"
          onClick={() => removeCompare(item.vendor._id)}
        >
          ✕
        </button>

      </div>

    ))}

    <button
      className="usersavedca-add-btn"
      onClick={() => navigate("/find-ca")}
    >
      + Add another CA to compare
    </button>
<button
  className="compare-btn"
  onClick={() => {
    setShowComparePopup(true);
    setShowCompareTable(false);
  }}
>
  Compare Now
</button>
  </div>

  {/* Help */}

  <div className="usersavedca-help">

    <h3>Need Help?</h3>

    <p>
      Our support team is here to help you
      find the right CA.
    </p>

   <Link
  to="/support"
  className="usersavedca-help-btn"
>
  Contact Support
</Link>
  </div>

</div>
  






                </div>



</div></div>
            

            


        </>
    );
}

export default UserSavedCA;