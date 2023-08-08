import React from 'react';
import TourSearch from './TourSearch';
import vuuuu from './images/vedio.mp4'

const Hero = () => {
  return (
    <div>
      <section className="hero" id="home">
        <video className="hero-video" autoPlay loop muted>
          <source src={vuuuu} type="video/mp4" />
        
          Your browser does not support the video tag.
        </video>
        {/* Your hero section content goes here */}
        <div className="container">
          <h2 className="h1 hero-title">Journey to explore world</h2>
          <p className="hero-text">
          With over a decade of unwavering commitment and dedication, we proudly stand as a beacon of experience in our field. For the past 10 years, we have been diligently working to provide top-notch solutions and services that cater to your needs.
          </p>
          <div className="btn-group">
            <button className="btn btn-primary">Learn more</button>
            <button className="btn btn-secondary">Book now</button>
          </div>
        </div>
      </section>
      <TourSearch />
    </div>
  );
};

export default Hero;
