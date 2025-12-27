import React, { useState } from 'react';
import Logo from '../assets/img/logo.svg';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header-container max-width-container">
      <img src={Logo} alt="Logo" className="logo" />

      <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <a href="#home" className="active">
          Home
        </a>
        <a href="#our-screens">Our Screens</a>
        <a href="#schedule">Schedule</a>
        <a href="#movie-library">Movie Library</a>
        <a href="#location">Location & Contact</a>
      </nav>

      {/* Hamburger */}
      <button
        className="hamburger"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
};

export default Header;
