import API_URL from "../config";
import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";
import UserSidebar from "../components/UserSidebar";
import { useNavigate } from "react-router-dom";

import {
  FaSearch,
  FaBell,
  FaRegCommentDots,
  FaBookOpen,
  FaTicketAlt,
  FaComments,
  FaQuestionCircle,
  FaArrowRight,
  FaChevronDown,
  FaHeadset,
  FaRegClock,
  FaCopy,
  FaUsers,
  FaGift,
  FaWallet,


} from "react-icons/fa";

import "./UserHelp.css";

function UserHelpSupport() {
  const navigate = useNavigate();

  const [openFaq,setOpenFaq] =
useState(null);

  const [user,setUser] =
    useState({});

  const fetchUserProfile =
    async ()=>{

    try{

      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await axios.get(
          `${API_URL}/api/users/profile`,
          {
            headers:{
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setUser(
        res.data.user
      );

    }
    catch(error){

      console.log(error);

    }

  };

  useEffect(()=>{

    fetchUserProfile();

  },[]);


const referralLink =
`${window.location.origin}/ref/${
(user?.name || "user")
.toLowerCase()
.replace(/\s+/g,"-")
}-${user?._id}`;



const tutorials = [
{
    _id:1,
    title:"Getting Started with Bussult",
    description:"A quick overview to help you get started with your account.",
    duration:"5 min",
    videoUrl:"https://www.youtube.com/watch?v=WVD0MFp3yyI",
    thumbnail:"https://img.youtube.com/vi/WVD0MFp3yyI/maxresdefault.jpg"
},
{
    _id:2,
    title:"How to Find & Connect with a CA",
    description:"Learn how to search, compare and connect with the right CA.",
    duration:"7 min",
    videoUrl:"https://www.youtube.com/watch?v=nLnzII0fs3o",
    thumbnail:"https://img.youtube.com/vi/nLnzII0fs3o/maxresdefault.jpg"
},
{
    _id:3,
    title:"How to Book an Appointment",
    description:"Learn how to book and manage appointments with ease.",
    duration:"6 min",
    videoUrl:"https://www.youtube.com/watch?v=nxL5tPgqft4",
    thumbnail:"https://img.youtube.com/vi/nxL5tPgqft4/maxresdefault.jpg"
},
{
    _id:4,
    title:"Managing Your Enquiries",
    description:"Track your enquiries, responses and appointments easily.",
    duration:"8 min",
    videoUrl:"https://www.youtube.com/watch?v=JsLHRK4n3cs",
    thumbnail:"https://img.youtube.com/vi/JsLHRK4n3cs/maxresdefault.jpg"
}
];





const supportFaqs = [
{
id:1,
question:"How do I update my profile information?",
answer:"Go to Profile Settings and click Save Changes after updating your information."
},
{
id:2,
question:"How can I book an appointment with a CA?",
answer:"Open the CA profile, select date and time, and confirm your appointment."
},
{
id:3,
question:"How do I track the status of my enquiry?",
answer:"Go to My Enquiries page to view all enquiry updates and responses."
},
{
id:4,
question:"How do I save or compare CAs?",
answer:"Use the Save button on a CA profile or add multiple CAs to Compare."
},
{
id:5,
question:"How do subscriptions and plans work?",
answer:"Choose a suitable plan from the subscription page to access premium services."
},
{
id:6,
question:"How do I update my billing information?",
answer:"Go to Billing Settings and update your payment details."
},
{
id:7,
question:"How can I contact support?",
answer:"Use Contact Support, Live Chat or Raise Ticket options available on this page."
},
{
id:8,
question:"Is my personal information secure?",
answer:"Yes, all your information is encrypted and securely stored."
}
];





const [copied,setCopied] =
useState(false);

const copyReferralLink =
async()=>{

    try{

        await navigator.clipboard.writeText(
            referralLink
        );

        setCopied(true);

        setTimeout(()=>{
            setCopied(false);
        },2000);

    }
    catch(error){

        console.log(error);

        // fallback
        const textArea =
          document.createElement(
            "textarea"
          );

        textArea.value =
          referralLink;

        document.body.appendChild(
          textArea
        );

        textArea.select();

        document.execCommand(
          "copy"
        );

        document.body.removeChild(
          textArea
        );

        setCopied(true);

        setTimeout(()=>{
          setCopied(false);
        },2000);

    }

};







const [showTicketPopup, setShowTicketPopup] = useState(false);

const [ticketData, setTicketData] = useState({
    category: "",
    subject: "",
    priority: "Medium",
    description: "",
    attachment: null
});




const handleSubmitTicket = async () => {

    try {

        const formData = new FormData();

        formData.append("category", ticketData.category);
        formData.append("subject", ticketData.subject);
        formData.append("priority", ticketData.priority);
        formData.append("description", ticketData.description);

        if (ticketData.attachment) {
            formData.append("attachment", ticketData.attachment);
        }

        await axios.post(
            `${API_URL}/api/tickets`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        alert("Ticket submitted successfully");

        setShowTicketPopup(false);

        setTicketData({
            category: "",
            subject: "",
            priority: "Medium",
            description: "",
            attachment: null
        });

    } catch (err) {

        alert(
            err.response?.data?.message ||
            "Failed to submit ticket"
        );

    }

};









const handleLogout = () => {

  const confirmLogout = window.confirm(
    "Are you sure you want to logout?"
  );

  if (!confirmLogout) return;

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/login");

};





  return(

    <div className="usersupport-layout">

      <UserSidebar/>

      <div className="usersupport-content">

        {/* HEADER */}

        <div className="usersupport-header">

          <div className="usersupport-header-left">

            <h1>
              Help & Support
            </h1>

            <p>
              Home /
              Help & Support
            </p>

          </div>

          <div className="usersupport-header-right">

            <div className="usersupport-search-box">

              <FaSearch/>

              <input
                type="text"
                placeholder="Search anything..."
              />

              <span>
                Ctrl + K
              </span>

            </div>

            <button className="usersupport-icon-btn">
              <FaRegCommentDots/>
            </button>

            <button className="usersupport-icon-btn">

              <FaBell/>

             
            </button>

            <div className="usersupport-user-box"  onClick={handleLogout}>

              <img
                src={
                  user?.profileImage
                  ? `${API_URL}${user.profileImage}`
                  : "/avatar.png"
                }
                alt=""
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

        {/* SUPPORT CARDS */}

        <div className="usersupport-grid">

          {/* HELP CENTER */}

          <div className="usersupport-card">

            <div className="usersupport-card-icon blue">

              <FaBookOpen/>

            </div>

            <h3>
              Help Center
            </h3>

            <p>
              Find guides and resources
              to help you get started.
            </p>

            <button
              onClick={()=>
                navigate("/help-center")
              }
            >
              View Articles

              <FaArrowRight/>

            </button>

          </div>

          {/* TICKET */}

          <div className="usersupport-card">

            <div className="usersupport-card-icon green">

              <FaTicketAlt/>

            </div>

            <h3>
              Raise Ticket
            </h3>

            <p>
              Submit a support ticket
              and we'll help resolve it.
            </p>

          <button
    type="button"
    onClick={() => {
        console.log("Popup:", showTicketPopup);
        setShowTicketPopup(true);
    }}
>
    Submit Ticket
</button>

          </div>

          {/* CHAT */}

          <div className="usersupport-card">

            <span className="usersupport-online">
              Online
            </span>

            <div className="usersupport-card-icon purple">

              <FaComments/>

            </div>

            <h3>
              Chat Support
            </h3>

            <p>
              Chat with our support
              team in real time.
            </p>

            <button
              onClick={()=>
                navigate("/user-chat")
              }
            >
              Start Chat

              <FaArrowRight/>

            </button>

          </div>

          {/* FAQ */}

          <div className="usersupport-card">

            <div className="usersupport-card-icon orange">

              <FaQuestionCircle/>

            </div>

            <h3>
              FAQs
            </h3>

            <p>
              Find quick answers to
              common questions.
            </p>

            <button
              onClick={()=>
                navigate("/faq")
              }
            >
              View FAQs

              <FaArrowRight/>

            </button>

          </div>

        </div>
















<div className="usersupporttutorial-main-wrapper">

    {/* LEFT */}

    <div className="usersupporttutorial-card">

        <div className="usersupporttutorial-header">

            <h3>
                Tutorials / Onboarding
            </h3>

            <button>
                View All Tutorials
                <FaArrowRight/>
            </button>

        </div>

        <p className="usersupporttutorial-subtitle">
            Learn how to make the most out of Bussult.
        </p>

        {
            tutorials.map((item)=>(
                <div
                    className="usersupporttutorial-item"
                    key={item._id}
                >

                    <img
                        src={item.thumbnail}
                        alt=""
                    />

                    <div className="usersupporttutorial-content">

                        <h4>
                            {item.title}
                        </h4>

                        <p>
                            {item.description}
                        </p>

                        <span>
                            <FaRegClock/>
                            {item.duration}
                        </span>

                    </div>

                    <button
                        className="usersupporttutorial-watch-btn"
                        onClick={()=>
                            window.open(
                                item.videoUrl,
                                "_blank"
                            )
                        }
                    >
                        Watch Now
                    </button>

                </div>
            ))
        }

    </div>

    {/* RIGHT */}

    <div className="usersupportrefer-card">

        <h3>
            Refer & Earn
        </h3>

        <p>
            Refer your friends and earn exciting rewards.
        </p>

        <div className="usersupportrefer-box">

            <label>
                Share your referral link
            </label>

            <p>
                Invite your friends and colleagues to join Bussult.
            </p>

            <div className="usersupportrefer-input-box">

                <input
                    value={referralLink}
                    readOnly
                />
<button
    type="button"
    className="usersupportrefer-copy-btn"
    onClick={copyReferralLink}
>
    {
        copied
        ? "Copied!"
        : <FaCopy/>
    }
</button>

            </div>

        </div>
<div className="usersupportrefer-stats">

    <div>
        <FaUsers/>
        <h4>
            {user?.totalReferrals || 0}
        </h4>
        <p>People Joined</p>
    </div>

    <div>
        <FaGift/>
        <h4>
            ₹{(user?.rewardsEarned || 0).toLocaleString()}
        </h4>
        <p>Rewards Earned</p>
    </div>

    <div>
        <FaWallet/>
        <h4>
            ₹{(user?.pendingRewards || 0).toLocaleString()}
        </h4>
        <p>Pending Rewards</p>
    </div>

</div>

        <button
            className="usersupportrefer-details-btn"
        >
            View Referral Details
            <FaArrowRight/>
        </button>

    </div>

</div>






















<div className="usersupportfaq-main-section">

  {/* FAQ CARD */}

  <div className="usersupportfaq-card">

    <div className="usersupportfaq-header">

      <h3>
        Popular FAQs
      </h3>

      <button
        className="usersupportfaq-view-btn"
        onClick={() => navigate("/faq")}
      >
        View All FAQs
        <FaArrowRight />
      </button>

    </div>

  <div className="usersupportfaq-grid">

{
supportFaqs.map((faq)=>(
<div
className="usersupportfaq-item"
key={faq.id}
>

<div
className="usersupportfaq-question"
onClick={()=>
setOpenFaq(
openFaq === faq.id
? null
: faq.id
)
}
>

<span>
{faq.question}
</span>

<FaChevronDown
className={`usersupportfaq-arrow ${
openFaq === faq.id
? "rotate"
: ""
}`}
/>

</div>

{
openFaq === faq.id && (
<div className="usersupportfaq-answer">

{faq.answer}

</div>
)
}

</div>
))
}

</div>

  </div>

  {/* NEED HELP CARD */}

  <div className="usersupportfaq-help-card">

    <div className="usersupportfaq-help-icon">

      <FaHeadset />

    </div>

    <h3>
      Still Need Help?
    </h3>

    <p>
      Our support team is here to help
      you with any questions or issues.
    </p>

    <button
      className="usersupportfaq-support-btn"
      onClick={() =>
        navigate("/support")
      }
    >
      Contact Support
    </button>

    <span>
      Response time:
      Within a few minutes
    </span>

  </div>

</div>


















      </div>



















    </div>


















  );

}

export default UserHelpSupport;