import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">

        <div className="footer__brand">
          <div className="footer__logo">🧺 Wash-O-Matic<br /></div>
          <p className="footer__desc">
            <strong>We at Wash-O-Matic</strong> will save time, effort, precious resources for all our delighted customers.
            With exciting ideas that have been spinning in our heads, we are all set to bring to you compelling and innovative services...
          </p>
        </div>

        
        <div className="footer__links">
          <div className="footer__column">
            <h4>PAGES</h4>
            <a href="/about">About Us</a>
            <a href="/services">Our Services</a>
            <a href="/membership">Membership Plans</a>
            <a href="/careers">Careers</a>
            <a href="/blog">Blog</a>
          </div>
          <div className="footer__column">
            <h4 className="footer__hidden-heading">More</h4>
            <a href="/news">News</a>
            <a href="/sustainability">Sustainability</a>
            <a href="/terms">T&C and Privacy Policy</a>
            <a href="/faq">FAQ's</a>
            <a href="/contact">Contact Us</a>
          </div>
        </div>

        
        <div className="footer__address">
          <h4>ADDRESS</h4>
          <p>
            Wash-O-Matic Consumer Services Pvt Ltd,<br />
            4th Floor, 409, Capital Park Building,<br />
            Outer Ring Rd, Madhapur,<br />
            Hyderabad 503175
          </p>

          <h4>GET IN TOUCH</h4>
          <p>Email: <a href="mailto:care@wash-o-matic">care@wash-o-matic</a></p>
          <p>Phone: <a href="tel:080475678">080-475-678</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
