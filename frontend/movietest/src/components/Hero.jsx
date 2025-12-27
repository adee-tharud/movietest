import React, { Fragment } from 'react';

const Hero = () => {
  return (
    <section className="max-width-container">
      <div className="hero-section max-width-container">
        <iframe
          src="https://www.youtube.com/embed/Mzw2ttJD2qQ?autoplay=1&mute=1&controls=0&loop=1&playlist=Mzw2ttJD2qQ&playsinline=1&rel=0&showinfo=0"
          title="Hero video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
      <div className="hero-intro max-width-container">
        <h1 className="header">Movie Library</h1>
        <p className="description">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.{' '}
        </p>
      </div>
    </section>
  );
};

export default Hero;
