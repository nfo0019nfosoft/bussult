import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Quick Links */}
        <div className="footer-column">
          <h4>Quick Links</h4>

          <Link to="/">Home</Link>
          <Link to="/find-ca">Find CA</Link>
          <Link to="/service">Services</Link>
          <Link to="/ai-assistant">AI Assistant</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        {/* Services */}
        <div className="footer-column">
          <h4>Services</h4>

          <Link to="/services/gst-filing">GST Filing</Link>
          <Link to="/services/income-tax-filing">Income Tax Filing</Link>
          <Link to="/services/company-registration">Company Registration</Link>
          <Link to="/services/roc-filing">ROC Filing</Link>
          <Link to="/services/audit-assurance">Audit & Assurance</Link>
          <Link to="/services/bookkeeping">Bookkeeping</Link>
          <Link to="/services/payroll-services">Payroll Services</Link>
        </div>

        {/* Support */}
        <div className="footer-column">
          <h4>Support</h4>

          <Link to="/help-center">Help Center</Link>
          <Link to="/faqs">FAQs</Link>
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/support">Contact Support</Link>
          <Link to="/login">Signup</Link>
        </div>

        {/* Legal */}
        <div className="footer-column">
          <h4>Legal</h4>

          <Link to="/PrivacyPolicy">Privacy Policy</Link>
          <Link to="/TermsAndConditions">Terms & Conditions</Link>
          <Link to="/RefundPolicy">Refund Policy</Link>
        </div>

        {/* Follow Us + Newsletter */}



<div className="footer-column newsletter">

  <h4>Newsletter</h4>

  <p>
    Subscribe to get updates and useful tips.
  </p>

  <input
    type="email"
    placeholder="Enter your email"
  />

  <button>
    Subscribe
  </button>

<div className="footer-social-icons">

  <a href="https://www.linkedin.com/company/bussult/" target="_blank" rel="noreferrer">
    <i className="fab fa-linkedin-in"></i>
  </a>

  <a href="https://www.youtube.com/@bussult" target="_blank" rel="noreferrer">
    <i className="fab fa-youtube"></i>
  </a>

  <a href="https://www.instagram.com/bussult/" target="_blank" rel="noreferrer">
    <i className="fab fa-instagram"></i>
  </a>

  <a href="https://www.facebook.com/people/Bussult/61591277069766/" target="_blank" rel="noreferrer">
    <i className="fab fa-facebook-f"></i>
  </a>

</div>

</div>

      </div>

      <div className="footer-bottom">

        <p>
          © 2026 Bussult. All Rights Reserved.
        </p>

        <div className="footer-bottom-right">

          <p>
            Made with ❤️ in India
          </p>

          <div className="footer-chat">
            <i className="fas fa-comments"></i>
          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;