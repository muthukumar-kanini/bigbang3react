import React, { useState, useEffect } from 'react';
import logo from './logo.svg'
import bluelogo  from './images/logo-blue.svg'
import { Link, Navigate } from 'react-router-dom';
import './Style.css';
import Hero from './Hero';
import axios from 'axios'; 

const AHeader = () => {
  const [isNavOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen((prevState) => !prevState);
  };

  useEffect(() => {
    // Fetch the userEmail from local storage
    const userEmail = localStorage.getItem('userEmail');

    if (userEmail) {
      // Call the API URL with the userEmail
      axios
        .get(`https://localhost:7234/api/Travelers/email/${encodeURIComponent(userEmail)}`)
        .then((response) => {
          // Save the traveller_Id in local storage from the API response data
          console.log(response.data);
          const travellerId = response.data.traveller_Id;
          localStorage.setItem('travellerId', travellerId);
        })
        .catch((error) => {
          console.error('Error fetching user record:', error);
        });
    }
  }, []);

  return (
    <div>
    <header className="header" data-header>
      {/* Navbar Overlay */}
      {isNavOpen && <div className="overlay" data-overlay></div>}

      <div className="header-top">
        <div className="container">
          {/* Helpline Box */}
        

          {/* Logo */}
          <a href="#/" className="logo">
            <img src={logo} alt="Tourly logo" />
          </a>

          {/* Navbar Buttons */}
          <div className="header-btn-group">
            {/* Search Button */}
            <button className="search-btn" aria-label="Search">
              <ion-icon name="search"></ion-icon>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="nav-open-btn"
              aria-label="Open Menu"
              data-nav-open-btn
              onClick={toggleNav}
            >
              <ion-icon name="menu-outline"></ion-icon>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <nav
        className={`navbar ${isNavOpen ? 'active' : ''}`}
        data-navbar
      >
        <div className="navbar-top">
          <a href="#" className="logo">
            <img src={bluelogo} alt="Tourly logo" />
          </a>

          {/* Mobile Menu Close Button */}
          <button
            className="nav-close-btn"
            aria-label="Close Menu"
            data-nav-close-btn
            onClick={toggleNav}
          >
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>

        {/* Navbar Links */}
        <ul className="navbar-list">
          <li>
            <a href="/" className="navbar-link" data-nav-link>
              home
            </a>
          </li>
          <li>
            <a href="#" className="navbar-link" data-nav-link>
              about us
            </a>
          </li>
          <li>
            <a href="#destination" className="navbar-link" data-nav-link>
              destination
            </a>
          </li>
          <li>
            <a href="#package" className="navbar-link" data-nav-link>
              packages
            </a>
          </li>
          <li>
            <a href="/gallery" className="navbar-link" data-nav-link>
              gallery
            </a>
          </li>
          <li>
            <a href="#contact" className="navbar-link" data-nav-link>
              contact us
            </a>
          </li>
          <li>
            <a href="/Login" className="navbar-link" data-nav-link>
              Logout
            </a>
          </li>
          <li>
            <a href="/Signup" className="navbar-link" data-nav-link>
              Signup
            </a>
          </li>
        </ul>
      </nav>

    
    </header>|
    <Hero/>
    </div>
  );
};

export default AHeader;
