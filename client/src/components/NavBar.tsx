import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { logout } from '../features/authSlice';
import logo from '../images/logo.png';

const NavBar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
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

  const handleAuthClick = () => {
    if (user) {
      dispatch(logout());
    }
    closeMobileMenu();
  };

  return (
    <>
      <header id='nav-wrapper'>
        <nav id='nav' className={isMobileMenuOpen ? 'nav-visible' : ''}>
          <div className='nav left'>
            <span className='gradient skew'>
              <h1 className='logo un-skew'>
                <div id='logo-container'>
                  <Link to='/'>Graph-Scribe</Link>
                  <img id='logo' src={logo} />
                </div>
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
              onClick={handleAuthClick}
            >
              <span className='nav-link-span'>
                <span className='u-nav'>Sign {user ? 'Out' : 'In'} </span>
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
            <Link
              to='/test'
              className={`nav-link ${isMobileMenuOpen ? 'slide-in' : ''}`}
              onClick={closeMobileMenu}
            >
              <span className='nav-link-span'>
                <span className='u-nav'>Get Started</span>
              </span>
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
};
export default NavBar;
