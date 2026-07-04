import API_URL from "../config";
import { Link } from "react-router-dom";
import "./ai-assistant.css";
import chatbot from "../assets/chatbot.png";
import {
  FaChevronRight,
  FaCheckCircle,
  FaFileInvoiceDollar,
  FaBuilding,
  FaRupeeSign,
  FaClipboardList,
  FaGavel,
  FaComments,
  FaMagic,
  FaArrowRight,
  FaPaperclip,
  FaPaperPlane,
  FaLock,
} from "react-icons/fa";


function AIAssistant() {
  return (
    <>
    <section className="ai-page">

     <div className="privacy-breadcrumb">
        <Link to="/">Home</Link>
        <FaChevronRight />
        <span>AI Assistant</span>
      </div>

      <div className="ai-hero">

        <div className="ai-image">
         
                 <img
                   src={chatbot}
                   alt="Support Team"
                 />
        </div>

        <div className="ai-content">

          <h1>
            AI Assistant
            <span> ✨</span>
          </h1>

          <p>
            Your intelligent CA assistant for quick answers,
            clarity and guidance.
          </p>

          <ul>
            <li>
              <FaCheckCircle />
              Instant answers to your queries
            </li>

            <li>
              <FaCheckCircle />
              Trusted information from CA experts
            </li>

            <li>
              <FaCheckCircle />
              Available 24/7 at your convenience
            </li>
          </ul>

        </div>

      </div>

    </section>




<section className="assistant-topics">

  <h2>What can I help you with?</h2>

  <div className="topics-grid">

    <div className="topic-card">
      <div className="topic-icon">
        <FaFileInvoiceDollar />
      </div>

      <h3>Tax & Compliance</h3>

      <p>
        Get help with Income Tax,
        GST, TDS and more
      </p>
    </div>

    <div className="topic-card">
      <div className="topic-icon">
        <FaBuilding />
      </div>

      <h3>Business Guidance</h3>

      <p>
        Learn about company setup,
        registrations and filings
      </p>
    </div>

    <div className="topic-card">
      <div className="topic-icon">
        <FaRupeeSign />
      </div>

      <h3>Financial Insights</h3>

      <p>
        Understand financial terms,
        planning and strategies
      </p>
    </div>

    <div className="topic-card">
      <div className="topic-icon">
        <FaClipboardList />
      </div>

      <h3>Document Help</h3>

      <p>
        Know which documents
        you need and why
      </p>
    </div>

    <div className="topic-card">
      <div className="topic-icon">
        <FaGavel />
      </div>

      <h3>Laws & Updates</h3>

      <p>
        Stay updated with latest
        laws and notifications
      </p>
    </div>

    <div className="topic-card">
      <div className="topic-icon">
        <FaComments />
      </div>

      <h3>General Queries</h3>

      <p>
        Ask anything related to
        CA services
      </p>
    </div>

  </div>

</section>










<section className="ai-chat-section">

  <h3>Try asking something like</h3>

  <div className="suggestion-grid">

    <button className="suggestion-card">
      <FaMagic />
      <span>
        What is the due date for Income Tax Return Filing?
      </span>
      <FaArrowRight />
    </button>

    <button className="suggestion-card">
      <FaMagic />
      <span>
        How do I register my business in India?
      </span>
      <FaArrowRight />
    </button>

    <button className="suggestion-card">
      <FaMagic />
      <span>
        What are the benefits of GST registration?
      </span>
      <FaArrowRight />
    </button>

    <button className="suggestion-card">
      <FaMagic />
      <span>
        How to calculate TDS on salary?
      </span>
      <FaArrowRight />
    </button>

  </div>

  <div className="ask-box">

    <div className="ask-input-wrapper">

      <input
        type="text"
        placeholder="Type your question here..."
      />

      <button className="attach-btn">
        <FaPaperclip />
      </button>

    </div>

    <button className="ask-btn">
      Ask AI Assistant
      <FaPaperPlane />
    </button>

  </div>

  <div className="ai-note">
    <FaLock />
    <span>
      AI responses are for general information only and
      not a substitute for professional advice.
    </span>
  </div>

</section>



    </>
  );
}

export default AIAssistant;