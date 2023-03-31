import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleResize = () => {
    if (window.innerWidth > 800) {
      closeMobileMenu();
    }
  };

  return (
    <>
      <header id='nav-wrapper'>
        <nav id='nav' className={isMobileMenuOpen ? 'nav-visible' : ''}>
          <div className='nav left'>
            <span className='gradient skew'>
              <h1 className='logo un-skew'>
                <a href='#home'>Graph-Scribe</a>
                <AutoGraphIcon style={{ marginLeft: '1.5rem' }} />
                <span style={{ fontSize: '8px' }}>future logo here</span>
              </h1>
            </span>
            <button id='menu' className='btn-nav' onClick={toggleMobileMenu}>
              <MenuIcon />
            </button>
          </div>
          <div className='nav right'>
            <Link
              to='/signin'
              className={`nav-link ${isMobileMenuOpen ? 'slide-in' : ''}`}
              onClick={closeMobileMenu}
            >
              <span className='nav-link-span'>
                <span className='u-nav'>Sign In </span>
              </span>
            </Link>
            <Link
              to='/about'
              className={`nav-link ${isMobileMenuOpen ? 'slide-in' : ''}`}
              onClick={closeMobileMenu}
            >
              <span className='nav-link-span'>
                <span className='u-nav'>About</span>
              </span>
            </Link>
            <Link
              to='/contact'
              className={`nav-link ${isMobileMenuOpen ? 'slide-in' : ''}`}
              onClick={closeMobileMenu}
            >
              <span className='nav-link-span'>
                <span className='u-nav'>Contact</span>
              </span>
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
};
export default NavBar;
