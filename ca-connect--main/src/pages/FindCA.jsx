import API_URL from "../config";
import { useEffect, useState } from "react";
import axios from "axios";
import "./FindCA.css";
import { useNavigate } from "react-router-dom";

import {
  FaSearch,
  FaFilter,
  FaStar,
  FaMapMarkerAlt,
  FaBuilding,
  FaUserCheck,
  FaCalendarCheck,
  FaChevronDown,
  FaEye,
  FaBalanceScale,
  FaShieldAlt,
  FaUserShield,
  FaHeadset,
  FaLock,
  
 
} from "react-icons/fa";

function FindCA() {
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [service, setService] = useState("");
  const [businessType, setBusinessType] = useState("");
  const navigate = useNavigate();

  const [availability, setAvailability] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [feeFilter, setFeeFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {

    try {

      const res = await axios.get(
        `${API_URL}/api/vendor`
      );

      const vendorData = Array.isArray(res.data)
        ? res.data
        : res.data.vendors || [];

      setVendors(vendorData);

      setFilteredVendors(vendorData);

    }

    catch (err) {

      console.log(err);

    }

  };

  const handleSearch = () => {
    let data = [...vendors];

    if (search) {
      data = data.filter(
        (vendor) =>
          vendor.fullName
            ?.toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    if (city) {
      data = data.filter(
        (vendor) => vendor.city === city
      );
    }

    if (businessType) {
      data = data.filter(
        (vendor) =>
          vendor.businessType ===
          businessType
      );
    }

    if (service) {
      data = data.filter((vendor) =>
        vendor.services?.some(
          (s) =>
            s.serviceName === service
        )
      );
    }

    setFilteredVendors(data);
  };

const addCompare = async (vendorId) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      `${API_URL}/api/compare/add`,
      {
        vendorId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(res.data.message);

  } catch (err) {
    alert(
      err.response?.data?.message || "Something went wrong"
    );
  }
};






  return (
    <div className="findca-page">

      {/* BREADCRUMB */}

      <div className="breadcrumb">
        Home &gt; Services &gt;
        Income Tax Services &gt;
        CA Professionals in Mumbai
      </div>

      {/* TITLE */}

      <div className="page-header">
        <h1>
          CA Professionals for
          <span>
            Income Tax Services in Mumbai
          </span>
        </h1>

        <p>
          Compare profiles and choose
          the right CA for your needs.
        </p>
      </div>

      {/* SEARCH BOX */}

      <div className="search-card">

        <div className="field">
          <label>
            Find a CA / Firm
          </label>

          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />
        </div>

        <div className="field">
          <label>
            Select Service
          </label>

          <select
            value={service}
            onChange={(e) =>
              setService(
                e.target.value
              )
            }
          >
            <option value="">
              All Services
            </option>

           {
  [
    ...new Set(
      (Array.isArray(vendors) ? vendors : []).flatMap(
        (v) =>
          v.services?.map(
            (s) => s.serviceName
          ) || []
      )
    )
  ].map((service, index) => (

    <option
      key={`${service}-${index}`}
      value={service}
    >

      {service}

    </option>

  ))
}
          </select>
        </div>

        <div className="field">
          <label>
            Select City
          </label>

          <select
            value={city}
            onChange={(e) =>
              setCity(
                e.target.value
              )
            }
          >
            <option value="">
              All Cities
            </option>

           {
  [
    ...new Set(
      (Array.isArray(vendors) ? vendors : []).map(
        (v) => v.city
      )
    )
  ].map((city, index) => (

    <option
      key={`${city}-${index}`}
      value={city}
    >

      {city}

    </option>

  ))
}
          </select>
        </div>

        <div className="field">
          <label>
            Business Type
          </label>

          <select
            value={businessType}
            onChange={(e) =>
              setBusinessType(
                e.target.value
              )
            }
          >
            <option value="">
              All Types
            </option>

            <option value="Individual">
              Individual
            </option>

            <option value="Firm">
              Firm
            </option>
          </select>
        </div>

        <button
          className="search-btn"
          onClick={handleSearch}
        >
          Search
        </button>

      </div>

      {/* FILTERS */}

      <div className="filter-row">

        <button className="filter-chip">
          <FaFilter />
          <span>Filters</span>
        </button>

        <div className="filter-chip">

          <FaCalendarCheck />

          <select
            value={availability}
            onChange={(e) =>
              setAvailability(
                e.target.value
              )
            }
          >
            <option value="">
              Availability
            </option>

            <option value="today">
              Available Today
            </option>

            <option value="tomorrow">
              Available Tomorrow
            </option>

            <option value="week">
              This Week
            </option>
          </select>

        </div>

        <div className="filter-chip">

          <FaUserCheck />

          <select
            value={experienceFilter}
            onChange={(e) =>
              setExperienceFilter(
                e.target.value
              )
            }
          >
            <option value="">
              Experience
            </option>

            <option value="5">
              Above 5 Years
            </option>

            <option value="10">
              Above 10 Years
            </option>

            <option value="15">
              Above 15 Years
            </option>

            <option value="20">
              Above 20 Years
            </option>
          </select>

        </div>

        <div className="filter-chip">

          <FaStar />

          <select
            value={ratingFilter}
            onChange={(e) =>
              setRatingFilter(
                e.target.value
              )
            }
          >
            <option value="">
              Rating
            </option>

            <option value="5">
              5 Stars
            </option>

            <option value="4">
              4+ Stars
            </option>

            <option value="3">
              3+ Stars
            </option>
          </select>

        </div>

        <div className="filter-chip">

          <FaBalanceScale />

          <select
            value={feeFilter}
            onChange={(e) =>
              setFeeFilter(
                e.target.value
              )
            }
          >
            <option value="">
              Fees
            </option>

            <option value="1000">
              Below ₹1000
            </option>

            <option value="5000">
              Below ₹5000
            </option>

            <option value="10000">
              Below ₹10000
            </option>
          </select>

        </div>

      </div>

      {/* COUNT */}

      <div className="results-row">

        <p>
          {
            filteredVendors.length
          }{" "}
          CA Professionals
          Found
        </p>

        <span>
          Clear All
        </span>

      </div>


      {/* VENDORS */}

      <div className="advisor-list">

        {filteredVendors.map((vendor) => {

          const price =
            vendor.services?.[0]?.price || 0;

          const pricing =
            price <= 1000
              ? "Affordable Pricing"
              : price <= 5000
                ? "Moderate Pricing"
                : "Premium Pricing";

          const services =
            vendor.services?.length > 0
              ? vendor.services
                .slice(0, 3)
                .map(
                  (service) =>
                    service.serviceName
                )
                .join(", ")
              : "CA Services";

          return (

            <div
              className="advisor-card"
              key={vendor._id}
            >

              <div className="advisor-main">

                <div className="advisor-photo-wrap">

                  <img
                    src={
                      vendor.photo
                        ? `${API_URL}/uploads/${vendor.photo}`
                        : "/avatar.png"
                    }
                    alt={vendor.fullName}
                    className="advisor-photo"
                  />

                  {vendor.isVerified && (
                    <span className="advisor-status">
                      ✓
                    </span>
                  )}

                </div>

                <div className="advisor-info">

                  <div className="advisor-header">

                    <h3>
                      {vendor.fullName}
                    </h3>

                    {vendor.isVerified && (
                      <FaCheckCircle className="advisor-verified" />
                    )}

                  </div>

                  <p className="advisor-services">
                    {services}
                  </p>

                  <div className="advisor-metrics">

                    <span>
                      <FaStar />
                      4.8
                      <small>
                        (128 Reviews)
                      </small>
                    </span>

                    <span>
                      {vendor.experience || 0}
                      + Years Exp.
                    </span>

                    <span>
                      98% On-Time
                    </span>

                  </div>

                  <div className="advisor-badges">

                    {vendor.isVerified && (
                      <span className="badge-verified">
                        Verified CA
                      </span>
                    )}

                    <span className="badge-pricing">
                      {pricing}
                    </span>

                    <span className="badge-available">
                      {vendor.available
                        ? "Available Today"
                        : "Available Tomorrow"}
                    </span>

                  </div>

                  <div className="advisor-address">

                    <span>
                      <FaMapMarkerAlt />
                      {vendor.city || "Mumbai"}
                    </span>

                    <span>
                      <FaBuilding />
                      Works at{" "}
                      {vendor.firmName ||
                        "Independent Practice"}
                    </span>

                  </div>

                </div>

              </div>

            <div className="advisor-buttons">

  <button
    className="btn-enquiry"
    onClick={() =>
      navigate(`/vendor/${vendor._id}`)
    }
  >
    Enquire
  </button>

  <button
    className="btn-consultation"
    onClick={() =>
      navigate(`/vendor/${vendor._id}`)
    }
  >
    Book Consultation
  </button>

  <button
  className="btn-enquiry"
  onClick={() => addCompare(vendor._id)}
>
  <FaBalanceScale />
  Compare
</button>

</div>

            </div>

          );

        })}

      </div>
      {/* BOTTOM FEATURES */}


      <div className="ca-features-row">

        <div className="ca-feature-box">
          <FaShieldAlt className="ca-feature-icon" />

          <div className="ca-feature-content">
            <h4>Verified Professionals</h4>
            <p>Background verified CAs</p>
          </div>
        </div>

        <div className="ca-feature-box">
          <FaUserShield className="ca-feature-icon" />

          <div className="ca-feature-content">
            <h4>Transparent Pricing</h4>
            <p>No hidden charges</p>
          </div>
        </div>

        <div className="ca-feature-box">
          <FaHeadset className="ca-feature-icon" />

          <div className="ca-feature-content">
            <h4>24/7 Support</h4>
            <p>We're here to help</p>
          </div>
        </div>

        <div className="ca-feature-box">
          <FaLock className="ca-feature-icon" />

          <div className="ca-feature-content">
            <h4>100% Secure</h4>
            <p>Your data is safe</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default FindCA;