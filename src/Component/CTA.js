import React from 'react';

import './Style.css';
import Footer from './Footer';

const CTA = () => {
  return (
    <div>
    <section className="cta" id="contact">
      <div className="container">
        <div className="cta-content">
          <p className="section-subtitle">Call To Action</p>
          <h2 className="h2 section-title">Ready For Unforgettable Travel. Remember Us!</h2>
          <p className="section-text">
          If you have any questions about travel destinations, tips for planning trips, packing advice, or anything else related to travel, feel free to ask!
          </p>
        </div>
        <button className="btn btn-secondary">Contact Us!</button>
      </div>
    </section>
    <Footer/>
    </div>
  );
};

export default CTA;
