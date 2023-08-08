import React from 'react';

import './Style.css';
import ima from './images/logo-blue.svg'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-brand">
            <a href="#" className="logo">
              
            </a>
            <p className="footer-text">
            "Exploring Beyond Boundaries: Your Adventure Begins with Us!"
            </p>
          </div>
          <div className="footer-contact">
            <h4 className="contact-title">Contact Us</h4>
            <p className="contact-text">Feel free to contact and reach us !!</p>
            <ul>
              <li className="contact-item">
                <ion-icon name="call-outline"></ion-icon>
                <a href="tel:+01123456790" className="contact-link">
                  +01 (123) 4567 90
                </a>
              </li>
              <li className="contact-item">
                <ion-icon name="mail-outline"></ion-icon>
                <a href="mailto:info.tourly.com" className="contact-link">
                  info.tourly.com
                </a>
              </li>
              <li className="contact-item">
                <ion-icon name="location-outline"></ion-icon>
                <address>3146 Koontz, California</address>
              </li>
            </ul>
          </div>
          <div className="footer-form">
            <p className="form-text">Subscribe our newsletter for more updates & news !!</p>
            <form action="" className="form-wrapper">
              <input type="email" name="email" className="input-field" placeholder="Enter Your Email" required />
              <button type="submit" className="btn btn-secondary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p className="footer-text">&copy; 2023 Tourly - All Rights Reserved</p>
        
        </div>
      </div>
    </footer>
  );
};

export default Footer;
