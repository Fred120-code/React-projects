import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>BrandName</h3>
          <p>Creating innovative solutions for modern businesses.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#testimonials">Testimonials</a>
            </li>
            <li>
              <a href="#signup">Sign Up</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Connect With Us</h4>
          <div className="social-links">
            <a href="#" aria-label="Facebook">
              <span>FB</span>
            </a>
            <a href="#" aria-label="Twitter">
              <span>TW</span>
            </a>
            <a href="#" aria-label="Instagram">
              <span>IG</span>
            </a>
            <a href="#" aria-label="LinkedIn">
              <span>LI</span>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 BrandName. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
