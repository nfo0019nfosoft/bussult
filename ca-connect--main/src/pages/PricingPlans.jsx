import React,{
 useEffect,
 useState
} from "react";

import axios from "axios";

import API_URL from "../config";

import Sidebar from "../components/Sidebar";

import "./PricingPlans.css";

import {
  FaSearch,
  FaBell,
  FaRegCommentDots,
  FaRocket,
  FaCrown,
  FaGem,
  FaBolt,
  FaCheck,
  FaArrowRight,
  FaShieldAlt,
  FaTimes,
  FaBuilding,
  FaStar,
  FaImages,
  FaChartLine,
  FaCalendarCheck,
  FaHeadset,
   FaStore,
  FaTachometerAlt,
  FaUsers,
  FaCertificate,
  FaHome,
  FaLayerGroup,
  FaPlus,
  FaMinus,
  FaBriefcase,
  FaRegCheckCircle,

} from "react-icons/fa";

import {
 MdWorkspacePremium
} from "react-icons/md";




import {
 useNavigate
} from "react-router-dom";

const PricingPlans = () => {

 const navigate = useNavigate();

 const [vendor,setVendor] =
 useState(null);

 const [dashboard,setDashboard] =
 useState({});

 const [plans,setPlans] =
 useState([]);

const [currentLevel,setCurrentLevel] =
useState(0);

//  const [billingType,setBillingType] =
// useState("3months");



const [apiPlans, setApiPlans] = useState([]);

const [billingType, setBillingType] = useState("12months");


  
const [openFaq,setOpenFaq] =
useState(null);

 const [loading,setLoading] =
 useState(true);



 useEffect(()=>{

  fetchDashboard();

  fetchPlans();

  fetchSubscription();

 },[]);

 const fetchDashboard =
 async()=>{

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





 const fetchPlans = async()=>{

 try{

   const res =
   await axios.get(
    `${API_URL}/api/subscription/plans`
   );

   console.log(
     "Plans Response:",
     res.data
   );

   setPlans(
     res.data.plans || []
   );

 }catch(err){

   console.log(err);

 }finally{

   setLoading(false);

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





const pricingFaqs = [

{
question:
"Can I upgrade or downgrade my plan anytime?",

answer:
"Yes. You can upgrade your subscription anytime. Downgrade will be applied after your current billing cycle ends."
},

{
question:
"Will I lose my data if I downgrade my plan?",

answer:
"No. Your business data remains safe. Only premium features will become unavailable after downgrade."
},

{
question:
"Do you offer refunds?",

answer:
"Refunds are available only in special situations and according to our refund policy."
},

{
question:
"Are there any hidden charges?",

answer:
"No hidden charges. The displayed price includes all subscription costs."
},

{
question:
"How does search ranking work?",

answer:
"Higher plans receive better visibility and appear before lower plans in search results."
},

{
question:
"What payment methods are accepted?",

answer:
"We support UPI, Credit Cards, Debit Cards, Net Banking and Wallet payments."
},

{
question:
"Will I get a GST invoice?",

answer:
"Yes. GST invoices are automatically generated after successful payment."
},

{
question:
"Can I cancel my subscription?",

answer:
"Yes. You can cancel auto renewal anytime from your subscription settings."
}

];








  const pricingData = {
    "12months": [
      {
        id: 1,
        level: 1,
        name: "Starter",
        description: "Perfect for getting started",
        price: 0,
        oldPrice: null,
        duration: "year",
        priority: 4,
        features: [
          "Basic Visibility",
          "Build Your Profile",
          "Connect with Businesses",
        ],
      },

      {
        id: 2,
        level: 2,
        name: "Growth",
        description: "Great for growing businesses",
        price: 7999,
        oldPrice: 9999,
        duration: "year",
        priority: 3,
        features: [
          "Higher Visibility",
          "Appointment Booking",
          "Featured in Search",
          "Priority Support",
        ],
      },

      {
        id: 3,
        level: 3,
        name: "Professional",
        description: "Best for established professionals",
        price: 13999,
        oldPrice: 17999,
        duration: "year",
        priority: 2,
        features: [
          "Higher Search Ranking",
          "More Appointments",
          "Premium Badge",
          "Limited Homepage Recommendation",
          "Priority Support",
        ],
      },

      {
        id: 4,
        level: 4,
        name: "Elite",
        description: "Maximum visibility & growth",
        price: 23999,
        oldPrice: 28999,
        duration: "year",
        priority: 1,
        features: [
          "Top Search Placement",
          "Unlimited Appointments",
          "Premium Badge",
          "Priority Homepage Recommendation",
          "Dedicated Support",
        ],
      },
    ],

    "3months": [
      {
        id: 1,
        level: 1,
        name: "Starter",
        description: "Perfect for getting started",
        price: 0,
        oldPrice: null,
        duration: "3 months",
        priority: 4,
        features: [
          "Basic Visibility",
          "Build Your Profile",
          "Connect with Businesses",
        ],
      },

      {
        id: 2,
        level: 2,
        name: "Growth",
        description: "Great for growing businesses",
        price: 2499,
        oldPrice: 2999,
        duration: "3 months",
        priority: 3,
        features: [
          "Higher Visibility",
          "Appointment Booking",
          "Featured in Search",
          "Priority Support",
        ],
      },

      {
        id: 3,
        level: 3,
        name: "Professional",
        description: "Best for established professionals",
        price: 4499,
        oldPrice: 5999,
        duration: "3 months",
        priority: 2,
        features: [
          "Higher Search Ranking",
          "More Appointments",
          "Premium Badge",
          "Homepage Recommendation",
          "Priority Support",
        ],
      },

      {
        id: 4,
        level: 4,
        name: "Elite",
        description: "Maximum visibility & growth",
        price: 7499,
        oldPrice: 9999,
        duration: "3 months",
        priority: 1,
        features: [
          "Top Search Placement",
          "Unlimited Appointments",
          "Premium Badge",
          "Priority Homepage Recommendation",
          "Dedicated Support",
        ],
      },
    ],
  };

  const displayPlans = pricingData[billingType];





const getPlanIcon = (level)=>{

  switch(level){

    case 1:
      return <FaRocket/>;

    case 2:
      return <FaCrown/>;

    case 3:
      return <FaGem/>;

    case 4:
      return <MdWorkspacePremium/>;

    default:
      return <FaRocket/>;

  }

}



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

setCurrentLevel(
res.data.subscription
?.planId?.level || 0
);

}
catch(err){

console.log(err);

}

};


const handlePlanPurchase = async (plan) => {

  // Free Plan
  if (plan.price === 0) {

    navigate("/vendor-dashboard");
    return;

  }

  try {

    const vendorId =
      localStorage.getItem("vendorId");

    // CREATE ORDER
    const res =
      await axios.post(
        `${API_URL}/api/payments/create-order`,
        {
          vendorId,
          planName: plan.name,
          amount: plan.price,
          billingType
        }
      );

    console.log(
      "Order Response:",
      res.data
    );

    const options = {

      // SAME KEY USED IN CONSULTATION PAGE
      key:
        "rzp_test_T71LVMkGCB6Mxh",

      amount:
        res.data.order.amount,

      currency:
        res.data.order.currency,

      order_id:
        res.data.order.id,

      name:
        "Bussult",

      description:
        `${plan.name} Subscription Plan`,

      handler:
        async function(response){

          try {

            const storedUser =
  JSON.parse(
    localStorage.getItem("user")
  );
await axios.post(
`${API_URL}/api/payments/verify-payment`,
{

razorpay_order_id:
response.razorpay_order_id,

razorpay_payment_id:
response.razorpay_payment_id,

razorpay_signature:
response.razorpay_signature,

vendorId,

userId:vendorId,

amount:plan.price,

totalAmount:plan.price,

paymentFor:"subscription",

paymentMethod:"Razorpay",

paymentDetails:{
 planName:plan.name,
 billingType
}

});

            alert(
              "Payment Successful"
            );

          
navigate(
  "/vendor-subscription"
);

          }
          catch(error){

            console.log(
              "Verify Error:",
              error.response?.data ||
              error.message
            );

            alert(
              "Payment verification failed"
            );

          }

        },

      prefill: {

        name:
          vendor?.fullName || "",

        email:
          vendor?.email || "",

        contact:
          vendor?.mobile || ""

      },

      notes: {

        vendorId,

        plan:
          plan.name,

        billingType

      },

      theme: {
        color:
          "#2563eb"
      }

    };

    const razorpay =
      new window.Razorpay(
        options
      );

    razorpay.open();

  }
  catch(err){

    console.log(
      "Payment Error:",
      err.response?.data ||
      err.message
    );

    alert(
      err.response?.data?.message ||
      err.message ||
      "Payment failed"
    );

  }

};


 if(loading){

  return(
   <div>
    Loading...
   </div>
  );

 }


return(

<div className="pricing-layout">

<Sidebar/>

<div className="pricing-main">

{/* HEADER */}

<div className="pricing-header">

<div className="pricing-header-left">

<h1>
Pricing Plans
</h1>

<span>
Home / Pricing Plans
</span>

</div>

<div className="pricing-header-right">

<div className="pricing-search-box">

<FaSearch/>

<input
 type="text"
 placeholder="Search anything..."
/>

<span className="pricing-shortcut">
Ctrl + K
</span>

</div>

<button className="pricing-icon-btn">
<FaRegCommentDots/>
</button>

<button className="pricing-icon-btn pricing-bell">

<FaBell/>

{
dashboard?.unreadNotifications > 0 && (
<small>
{dashboard?.unreadNotifications}
</small>
)
}

</button>

<div className="pricing-profile">

<img
src={
vendor?.photo
? `${API_URL}/uploads/${vendor.photo}`
: "/avatar.png"
}
alt=""
onClick={handleLogout}
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

{/* TITLE */}
<div className="pricing-wrapper">

  <div className="pricing-title">

    <span className="pricing-badge">
      PRICING PLANS
    </span>

    <h2>
      Choose the Right Plan for
      <br/>

      <span className="pricing-highlight">
        Your Business Growth
      </span>

    </h2>

    <p>
      All plans include the same powerful features.
      <br/>
      Upgrade your plan to get higher visibility,
      better ranking and more opportunities to
      grow your business.
    </p>

  </div>
<div className="pricing-grid">

{
  pricingData["3months"].map((plan)=>(

    <div
      key={plan.id}
      className={`pricing-card ${
        plan.level === 3
        ? "pricing-popular"
        : ""
      }`}
    >


         {
  plan.level === 3 && (

    <div className="pricing-popular-tag">

      <FaStar className="pricing-popular-icon"/>

      <span>
        MOST POPULAR
      </span>

    </div>

  )
}

          <div className={`pricing-icon pricing-icon-${plan.level}`}>

            {getPlanIcon(plan.level)}

          </div>

          <h3>
            {plan.name}
          </h3>

          <p className="pricing-description">
            {plan.description}
          </p>

        <h2
  className={`pricing-amount pricing-amount-${plan.level}`}
>
  {
    plan.price === 0
    ? (
      <span className={`pricing-free-text pricing-amount-${plan.level}`}>
        Free
      </span>
    )
    : (
      <>
        <span className={`pricing-from-text pricing-amount-${plan.level}`}>
          From
        </span>

        {" "}
        <span className={`pricing-amount-${plan.level}`}>
          ₹{plan.price.toLocaleString()}
        </span>
      </>
    )
  }
</h2>

          <div className={`pricing-priority pricing-priority-${plan.level}`}>

            Search Priority : {plan.priority}

          </div>

        </div>

      ))
    }

  </div>

  <div className="pricing-note">

    <FaShieldAlt/>

    <span>
      Higher plans appear first in search results
    </span>

  </div>

</div>






<section className="plancompare-section">

  <div className="plancompare-header">

    <h2>
      Compare All Plans
    </h2>

    <p>
      Compare features and choose the right subscription for your business.
    </p>

  </div>

  <div className="plancompare-table-wrapper">

    <table className="plancompare-table">

      <thead>

        <tr>

          <th>
            Features
          </th>

          <th>
            Starter
          </th>

          <th>
            Growth
          </th>

          <th>
            Professional
          </th>

          <th>
            Elite
          </th>

        </tr>

      </thead>

   <tbody>

<tr>
  <td><FaBuilding/> Business Profile</td>
  <td><FaCheck className="plancompare-check"/></td>
  <td><FaCheck className="plancompare-check"/></td>
  <td><FaCheck className="plancompare-check"/></td>
  <td><FaCheck className="plancompare-check"/></td>
</tr>

<tr>
  <td><FaStore/> Business Verification</td>
  <td><FaCheck className="plancompare-check"/></td>
  <td><FaCheck className="plancompare-check"/></td>
  <td><FaCheck className="plancompare-check"/></td>
  <td><FaCheck className="plancompare-check"/></td>
</tr>

<tr>
  <td><FaStar/> Reviews & Ratings</td>
  <td><FaCheck className="plancompare-check"/></td>
  <td><FaCheck className="plancompare-check"/></td>
  <td><FaCheck className="plancompare-check"/></td>
  <td><FaCheck className="plancompare-check"/></td>
</tr>

<tr>
  <td><FaImages/> Gallery & Documents</td>
  <td><FaCheck className="plancompare-check"/></td>
  <td><FaCheck className="plancompare-check"/></td>
  <td><FaCheck className="plancompare-check"/></td>
  <td><FaCheck className="plancompare-check"/></td>
</tr>

<tr>
  <td><FaTachometerAlt/> Dashboard</td>
  <td><FaCheck className="plancompare-check"/></td>
  <td><FaCheck className="plancompare-check"/></td>
  <td><FaCheck className="plancompare-check"/></td>
  <td><FaCheck className="plancompare-check"/></td>
</tr>

<tr>
  <td><FaChartLine/> Business Analytics</td>
  <td><FaCheck className="plancompare-check"/></td>
  <td><FaCheck className="plancompare-check"/></td>
  <td><FaCheck className="plancompare-check"/></td>
  <td><FaCheck className="plancompare-check"/></td>
</tr>

<tr>
  <td><FaUsers/> Customer Enquiries</td>
  <td><FaCheck className="plancompare-check"/></td>
  <td><FaCheck className="plancompare-check"/></td>
  <td><FaCheck className="plancompare-check"/></td>
  <td><FaCheck className="plancompare-check"/></td>
</tr>

<tr>
  <td><FaCalendarCheck/> Appointment Booking</td>
  <td><FaTimes className="plancompare-cross"/></td>
  <td><FaCheck className="plancompare-check"/></td>
  <td><FaCheck className="plancompare-check"/></td>
  <td><FaCheck className="plancompare-check"/></td>
</tr>

<tr>
  <td><FaSearch/> Search Priority</td>
  <td>4</td>
  <td>3</td>
  <td>2</td>
  <td>1</td>
</tr>

<tr>
  <td><FaGem/> Featured In Search</td>
  <td><FaTimes className="plancompare-cross"/></td>
  <td><FaCheck className="plancompare-check"/></td>
  <td><FaCheck className="plancompare-check"/></td>
  <td><FaCheck className="plancompare-check"/></td>
</tr>

<tr>
  <td><FaCertificate/> Premium Badge</td>
  <td><FaTimes className="plancompare-cross"/></td>
  <td><FaCheck className="plancompare-check"/></td>
  <td><FaCheck className="plancompare-check"/></td>
  <td><FaCheck className="plancompare-check"/></td>
</tr>

<tr>
  <td><FaHome/> Homepage Recommendation</td>
  <td><FaTimes className="plancompare-cross"/></td>
  <td><FaTimes className="plancompare-cross"/></td>
  <td>Limited</td>
  <td>Priority</td>
</tr>

<tr>
  <td><FaLayerGroup/> Category Recommendation</td>
  <td><FaTimes className="plancompare-cross"/></td>
  <td>Basic</td>
  <td>High</td>
  <td>Highest</td>
</tr>

<tr>
  <td><FaHeadset/> Customer Support</td>
  <td>Standard</td>
  <td>Priority</td>
  <td>Priority</td>
  <td>Dedicated</td>
</tr>

</tbody>

    </table>

  </div>

</section>















    <section className="pricing-switch-section">
      <div className="pricing-switch-header">
        <h2>Choose Your Plan</h2>
      </div>

      {/* Duration Switch */}

      <div className="pricing-duration-switch">
        <button
          className={`pricing-duration-btn ${
            billingType === "3months"
              ? "pricing-duration-active"
              : ""
          }`}
          onClick={() =>
            setBillingType(
              "3months"
            )
          }
        >
          <h4>3 Months Plan</h4>

          <span>
            Short term flexibility
          </span>
        </button>

        <button
          className={`pricing-duration-btn ${
            billingType === "12months"
              ? "pricing-duration-active"
              : ""
          }`}
          onClick={() =>
            setBillingType(
              "12months"
            )
          }
        >
          <small className="pricing-best-value">
            Best Value
          </small>

          <h4>
            12 Months Plan
          </h4>

          <span>
            Save more with yearly plans
          </span>
        </button>
      </div>

      {/* Pricing Cards */}

      <div className="pricing-switch-grid">
        {displayPlans.map((plan) => (
          <div
            key={plan.id}
            className={`pricing-switch-card ${
              plan.level === 3
                ? "pricing-switch-popular"
                : ""
            }`}
          >
            {
  plan.level === 3 && (
    <div className="pricing-switch-tag">

      <FaStar className="pricing-switch-tag-icon"/>

      <span>
        MOST POPULAR
      </span>

    </div>
  )
}
            <div
              className={`pricing-switch-icon pricing-switch-icon-${plan.level}`}
            >
              {getPlanIcon(plan.level)}
            </div>

            <h3>{plan.name}</h3>

            <p>{plan.description}</p>

            <h2
              className={`pricing-switch-price pricing-switch-price-${plan.level}`}
            >
              {plan.price === 0
                ? "Free"
                : `₹${plan.price.toLocaleString()}`}

              {plan.price !== 0 && (
                <span>
                  {" "}
                  / {plan.duration}
                </span>
              )}
            </h2>

            {plan.oldPrice && (
              <div className="pricing-old-price">
                ₹{plan.oldPrice.toLocaleString()}
              </div>
            )}

            <div className="pricing-switch-features">
              {plan.features.map(
                (
                  feature,
                  index
                ) => (
                  <div
                    key={index}
                    className="pricing-switch-feature"
                  >
                    <FaCheck />

                    <span>
                      {feature}
                    </span>
                  </div>
                )
              )}
            </div>
<button
  className={`pricing-switch-btn pricing-switch-btn-${plan.level}`}

  disabled={
    plan.level <= currentLevel
  }

  onClick={() =>
    handlePlanPurchase(plan)
  }
>

{
  plan.level < currentLevel
  ? "Not Available"

  : plan.level === currentLevel
  ? (
      currentLevel === 4
      ? "Renew Elite"
      : "Current Plan"
    )

  : "Upgrade Now"
}

</button>

            <div
              className={`pricing-switch-priority pricing-switch-priority-${plan.level}`}
            >
              Search Priority :
              {plan.priority}
            </div>
          </div>
        ))}
      </div>

      <div className="pricing-tax-note">
        <FaShieldAlt />

        <span>
          All prices are inclusive of taxes.
        </span>
      </div>
    </section>
 






















<section className="upgradeplanbenefits-section">

  <div className="upgradeplanbenefits-header">

    <h2>
      Why Upgrade Your Plan?
    </h2>

  </div>

  <div className="upgradeplanbenefits-container">

    <div className="upgradeplanbenefits-card">

      <div className="upgradeplanbenefits-icon upgradeplanbenefits-blue">
        <FaChartLine/>
      </div>

      <div className="upgradeplanbenefits-content">

        <h4>
          Higher Visibility
        </h4>

        <p>
          Appear before others in
          search results
        </p>

      </div>

    </div>

    <div className="upgradeplanbenefits-card">

      <div className="upgradeplanbenefits-icon upgradeplanbenefits-green">
        <FaRegCheckCircle/>
      </div>

      <div className="upgradeplanbenefits-content">

        <h4>
          More Opportunities
        </h4>

        <p>
          Get more enquiries and
          appointment requests
        </p>

      </div>

    </div>

    <div className="upgradeplanbenefits-card">

      <div className="upgradeplanbenefits-icon upgradeplanbenefits-orange">
        <FaShieldAlt/>
      </div>

      <div className="upgradeplanbenefits-content">

        <h4>
          Build Trust
        </h4>

        <p>
          Premium badge builds
          customer confidence
        </p>

      </div>

    </div>

    <div className="upgradeplanbenefits-card">

      <div className="upgradeplanbenefits-icon upgradeplanbenefits-purple">
        <FaRocket/>
      </div>

      <div className="upgradeplanbenefits-content">

        <h4>
          Better Growth
        </h4>

        <p>
          Grow your business with
          better exposure
        </p>

      </div>

    </div>

    <div className="upgradeplanbenefits-card">

      <div className="upgradeplanbenefits-icon upgradeplanbenefits-violet">
        <FaHeadset/>
      </div>

      <div className="upgradeplanbenefits-content">

        <h4>
          Priority Support
        </h4>

        <p>
          Get faster help whenever
          you need
        </p>

      </div>

    </div>

  </div>

</section>


















<section className="pricingfaq-section">

  <div className="pricingfaq-header">

    <h2>
      Frequently Asked Questions
    </h2>

  </div>

  <div className="pricingfaq-grid">

    {
      pricingFaqs.map(
        (
          item,
          index
        ) => (

          <div
            key={index}
            className={`pricingfaq-card ${
              openFaq === index
              ? "pricingfaq-active"
              : ""
            }`}
          >

            <button
              className="pricingfaq-question"
              onClick={()=>
                setOpenFaq(
                  openFaq === index
                  ? null
                  : index
                )
              }
            >

              <span>
                {item.question}
              </span>

              {
                openFaq === index
                ? <FaMinus/>
                : <FaPlus/>
              }

            </button>

            {
              openFaq === index && (

                <div className="pricingfaq-answer">

                  <p>
                    {item.answer}
                  </p>

                </div>

              )
            }

          </div>

        )
      )
    }

  </div>

</section>






<section className="pricingcta-section">

  <div className="pricingcta-left">

    <div className="pricingcta-icon">
      <FaRocket />
    </div>

    <div className="pricingcta-content">

      <h3>
        Ready to Grow Your Business?
      </h3>

      <p>
        Upgrade today and increase your visibility,
        connect with more businesses and take your
        profession to the next level.
      </p>

    </div>

  </div>

  <div className="pricingcta-actions">

    <button
      className="pricingcta-upgrade-btn"
      onClick={() =>
        document
          .querySelector(".pricing-switch-section")
          ?.scrollIntoView({
            behavior:"smooth"
          })
      }
    >
      Upgrade Now
    </button>

   <a
  href="https://wa.me/9177267680?text=Hi%20Sales%20Team,%20I%20would%20like%20to%20know%20more%20about%20your%20subscription%20plans."
  target="_blank"
  rel="noopener noreferrer"
  className="pricingcta-sales-btn"
>
  Contact Sales
</a>

  </div>

</section>












</div>

</div>

)
}
export default PricingPlans;