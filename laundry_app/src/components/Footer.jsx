
import React from 'react';
import './Footer.scss';
import { SocialIcon } from 'react-social-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__brand">
          <div className="footer__logo">🧺 Wash-O-Matic</div>
          <p className="footer__desc">
            <strong>We at Wash-O-Matic</strong> save time, effort, and precious resources for all our delighted customers. With exciting ideas that have been spinning in our heads, we are all set to bring to you compelling and innovative services...
          </p>
        </div>

        <div className="footer__links">
          <div className="footer__column">
            <h4>PAGES</h4>
            <a href="/about">Our Services</a>
            <a href="/services">Club Ultimate</a>
            <a href="/membership">Service Hours</a>
            <a href="/careers">Pickup Scheduler</a>
           
            
          </div>
          <div className="footer__column">
            <h4 className="footer__hidden-heading">Services</h4>
            <a href="/news">Wash And Fold</a>
            <a href="/sustainability">Wash And Iron</a>
            <a href="/terms">Steam Iron</a>
            <a href="/faq">Dry Clean</a>
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

        <div className="footer__social">
          <h4>FOLLOW US</h4>
          <div className="footer__social-icons">
            <SocialIcon url="https://www.facebook.com/WashOMatic" target="_blank" />
            <SocialIcon url="https://twitter.com/WashOMatic" target="_blank" />
            <SocialIcon url="https://www.instagram.com/WashOMatic" target="_blank" />
            <SocialIcon url="https://www.google.com/search?q=WashOMatic" target="_blank" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
