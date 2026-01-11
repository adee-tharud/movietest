import React, { useState } from 'react';
import Logo from '../assets/img/logo.svg';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header-container max-width-container">
      <img src={Logo} alt="Logo" className="logo" />

      <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <a href="#home" className="active">
          HOME
        </a>
        <a href="#our-screens">OUR SCREENS</a>
        <a href="#schedule">SCHEDULE</a>
        <a href="#movie-library">MOVIE LIBRARY</a>
        <a href="#location">LOCATION & CONTACT</a>
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
