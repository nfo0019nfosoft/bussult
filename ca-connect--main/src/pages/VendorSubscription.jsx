import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import API_URL from "../config";

import Sidebar from "../components/Sidebar";

import "./VendorSubscription.css";

import {
  FaSearch,
  FaBell,
  FaRegCommentDots,
  FaStar,
  FaCheckCircle
} from "react-icons/fa";

import {
  useNavigate
} from "react-router-dom";

const VendorSubscription = () => {

  const navigate =
    useNavigate();

  const [vendor,setVendor] =
    useState(null);

  const [dashboard,setDashboard] =
    useState({});

  const [subscription,setSubscription] =
    useState(null);

  const [invoices,setInvoices] =
    useState([]);

  const [loading,setLoading] =
    useState(true);

 useEffect(()=>{

  fetchDashboard();

  fetchSubscription();

  fetchInvoices();

},[]);

  const fetchDashboard = async()=>{

    try{

      const vendorId =
        localStorage.getItem(
          "vendorId"
        );

      const res =
        await axios.get(
          `${API_URL}/api/vendor/dashboard/${vendorId}`
        );

      setDashboard(
        res.data || {}
      );

      setVendor(
        res.data.vendor || null
      );

    }catch(err){

      console.log(err);

    }

  };





  const fetchSubscription =
async()=>{

  try{

    const vendorId =
      localStorage.getItem(
        "vendorId"
      );

    const res =
      await axios.get(
        `${API_URL}/api/subscription/current/${vendorId}`
      );

    console.log(
      "Subscription Response:",
      res.data
    );

    if(
      res.data.subscription
    ){

      setSubscription(
        res.data.subscription
      );

    }else{

      setSubscription({

        status:"Free",

        amount:0,

        billingCycle:"Monthly",

        nextRenewalDate:null,

        paymentId:{
          paymentMethod:"-"
        },

        planId:{
          name:"Free Plan",

          description:
          "Start using Bussult with limited access and upgrade anytime to unlock more features.",

          level:0,

          features:[
            "10 Leads / Month",
            "Basic Profile Listing",
            "Email Support"
          ]
        }

      });

    }

  }catch(err){

    console.log(err);

  }finally{

    setLoading(false);

  }

};




const fetchInvoices =
async()=>{

  try{

    const vendorId =
      localStorage.getItem(
        "vendorId"
      );

    const res =
      await axios.get(
        `${API_URL}/api/subscription-invoice/vendor/${vendorId}`
      );

    console.log(
      "Invoices:",
      res.data
    );

    setInvoices(
      res.data || []
    );

  }
  catch(err){

    console.log(err);

    setInvoices([]);

  }

};

  const handleLogout = ()=>{

    const confirmLogout =
      window.confirm(
        "Are you sure you want to logout?"
      );

    if(!confirmLogout)
      return;

    localStorage.removeItem(
      "vendorToken"
    );

    localStorage.removeItem(
      "vendorId"
    );

    navigate("/login");

  };

  if(loading){

    return(
      <div className="vendorsub-loading">

        Loading...

      </div>
    );
  }

  return(

    <div className="vendorsub-layout">

      <Sidebar/>

      <div className="vendorsub-main">

        {/* HEADER */}

        <div className="vendorsub-header">

          <div className="vendorsub-header-left">

            <h1>
              Subscription
            </h1>

            <span>
              Home /
              Subscription
            </span>

          </div>

          <div className="vendorsub-header-right">

            <div className="vendorsub-search-box">

              <FaSearch/>

              <input
                type="text"
                placeholder="Search anything..."
              />

              <span className="vendorsub-shortcut">

                Ctrl + K

              </span>

            </div>

            <button className="vendorsub-icon-btn">

              <FaRegCommentDots/>

            </button>

            <button className="vendorsub-icon-btn vendorsub-bell">

              <FaBell/>

              {
                dashboard
                ?.unreadNotifications > 0 && (

                  <small>

                    {
                      dashboard
                      ?.unreadNotifications
                    }

                  </small>

                )
              }

            </button>

            <div className="vendorsub-profile">

              <img
                src={
                  vendor?.photo
                  ? `${API_URL}/uploads/${vendor.photo}`
                  : "/avatar.png"
                }
                alt=""
                onClick={
                  handleLogout
                }
              />

              <div>

                <h4>

                  {
                    vendor?.fullName ||
                    "Vendor"
                  }

                </h4>

                <p>

                  {
                    vendor?.firmName ||
                    vendor?.designation
                  }

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* PAGE TITLE */}

  <div className="vendorsub-card">

  {/* HEADER INSIDE CARD */}

  <div className="vendorsub-card-header">

    <div>

      <h3>
        Current Subscription
      </h3>

      <p>
        Manage your active subscription and billing details.
      </p>

    </div>

  </div>

  {/* LEFT */}

  <div className="vendorsub-left">

    <div className="vendorsub-plan-icon">
      <FaStar />
    </div>

    <div className="vendorsub-plan-details">

      <h2>
        {subscription?.planId?.name}
      </h2>

      <p>
        {subscription?.planId?.description}
      </p>

      <div className="vendorsub-badges">

        <span className="vendorsub-active">
          {subscription?.status}
        </span>

        <span className="vendorsub-renew">

          {
            subscription?.planId?.level === 0
            ? "No Expiry"
            : `Renews on ${
                new Date(
                  subscription?.nextRenewalDate
                ).toLocaleDateString(
                  "en-IN",
                  {
                    day:"2-digit",
                    month:"short",
                    year:"numeric"
                  }
                )
              }`
          }

        </span>

      </div>

    </div>

  </div>

  {/* MIDDLE */}

  <div className="vendorsub-middle">

    <div className="vendorsub-detail">

      <h4>
        Current Plan
      </h4>

      <p>
        {subscription?.planId?.name}
      </p>

    </div>

    <div className="vendorsub-detail">

      <h4>
        Price
      </h4>

      <p>
        ₹
        {
          subscription?.amount
          ?.toLocaleString()
        }
      </p>

    </div>

    {
      subscription?.planId?.level !== 0
      ? (
        <>
          <div className="vendorsub-detail">

            <h4>
              Billing Cycle
            </h4>

            <p>
              {subscription?.billingCycle}
            </p>

          </div>

          <div className="vendorsub-detail">

            <h4>
              Payment Method
            </h4>

            <p>
              {
                subscription?.paymentId
                ?.paymentMethod ||
                "Razorpay"
              }
            </p>

          </div>
        </>
      )
      :
      (
        <>
          <div className="vendorsub-detail">

            <h4>
              Lead Limit
            </h4>

            <p>
              10 Leads / Month
            </p>

          </div>

          <div className="vendorsub-detail">

            <h4>
              Support
            </h4>

            <p>
              Community Support
            </p>

          </div>
        </>
      )
    }

  </div>

  {/* FEATURES */}

  <div className="vendorsub-right">

    <h3>
      Plan Includes
    </h3>

    {
      subscription?.planId?.features?.map(
        (
          feature,
          index
        ) => (

          <div
            key={index}
            className="vendorsub-feature"
          >

            <FaCheckCircle />

            <span>
              {feature}
            </span>

          </div>

        )
      )
    }

  </div>

  {/* BUTTON */}

  <div className="vendorsub-action">

    {
      subscription?.planId?.level === 0 && (
        <button
          className="vendorsub-upgrade-btn"
          onClick={()=>
            navigate("/pricing-plans")
          }
        >
          Upgrade To Growth
        </button>
      )
    }

    {
      subscription?.planId?.level === 1 && (
        <button
          className="vendorsub-upgrade-btn"
          onClick={()=>
            navigate("/pricing-plans")
          }
        >
          Upgrade To Growth
        </button>
      )
    }

    {
      subscription?.planId?.level === 2 && (
        <button
          className="vendorsub-upgrade-btn"
          onClick={()=>
            navigate("/pricing-plans")
          }
        >
          Upgrade To Professional
        </button>
      )
    }

    {
      subscription?.planId?.level === 3 && (
        <button
          className="vendorsub-upgrade-btn"
          onClick={()=>
            navigate("/pricing-plans")
          }
        >
          Upgrade To Elite
        </button>
      )
    }

    {
      subscription?.planId?.level === 4 && (
        <button
          className="vendorsub-upgrade-btn"
          onClick={()=>
            navigate("/pricing-plans")
          }
        >
          Renew Elite Plan
        </button>
      )
    }

  </div>

</div>




<div className="vendorsub-invoice-card">

  <div className="vendorsub-invoice-header">

    <h3>
      Billing History & Invoices
    </h3>

    <button
      className="vendorsub-download-all"
      onClick={() => {

        const validInvoices =
          invoices.filter(
            item => item.invoicePdf
          );

        validInvoices.forEach(
          invoice => {

            window.open(
              invoice.invoicePdf,
              "_blank"
            );

          }
        );

      }}
    >
      Download All Invoices
    </button>

  </div>

  <div className="vendorsub-table-wrapper">

    <table className="vendorsub-table">

      <thead>

        <tr>

          <th>
            Invoice ID
          </th>

          <th>
            Date
          </th>

          <th>
            Plan
          </th>

          <th>
            Billing Cycle
          </th>

          <th>
            Amount
          </th>

          <th>
            Status
          </th>

          <th>
            Invoice
          </th>

        </tr>

      </thead>

      <tbody>

        {
          invoices &&
          invoices.length > 0
          ? (
            invoices.map(
              (
                invoice
              ) => (

                <tr
                  key={
                    invoice._id
                  }
                >

                  <td>
                    {
                      invoice.invoiceNumber
                    }
                  </td>

                  <td>

                    {
                      invoice.createdAt
                      ? new Date(
                          invoice.createdAt
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day:"2-digit",
                            month:"short",
                            year:"numeric"
                          }
                        )
                      : "-"
                    }

                  </td>

                  <td>
                    {
                      invoice.planName ||
                      "-"
                    }
                  </td>

                  <td>
                    {
                      invoice.billingCycle ||
                      "-"
                    }
                  </td>

                  <td>

                    ₹

                    {
                      invoice.totalAmount
                      ?.toLocaleString() ||

                      invoice.amount
                      ?.toLocaleString() ||

                      0
                    }

                  </td>

                  <td>

                    <span
                      className={
                        `vendorsub-status ${
                          invoice.status
                          ?.toLowerCase() ||
                          "paid"
                        }`
                      }
                    >

                      {
                        invoice.status ||
                        "Paid"
                      }

                    </span>

                  </td>

                  <td>

                    {
                      invoice.invoicePdf
                      ? (

                        <button
                          className="vendorsub-download-btn"
                          onClick={()=>
                            window.open(
                              invoice.invoicePdf,
                              "_blank"
                            )
                          }
                        >

                          Download

                        </button>

                      )
                      : (

                        <button
                          className="vendorsub-download-btn vendorsub-download-disabled"
                          disabled
                        >

                          Not Available

                        </button>

                      )
                    }

                  </td>

                </tr>

              )
            )
          )
          : (

            <tr>

              <td
                colSpan="7"
                className="vendorsub-no-data"
              >

                No invoices found

              </td>

            </tr>

          )
        }

      </tbody>

    </table>

  </div>

</div>




      </div>

    </div>

  );

};

export default VendorSubscription;