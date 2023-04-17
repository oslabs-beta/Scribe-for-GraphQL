import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { logout } from '../features/authSlice';
const TestNavBar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  console.log('user: ', user);
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

  const handleAuthClick = async () => {
    if (user) {
      await dispatch(logout());
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
              to={user ? '/' : '/signin'}
              className={`nav-link ${isMobileMenuOpen ? 'slide-in' : ''}`}
              onClick={handleAuthClick}
            >
              <span className='nav-link-span'>
                <span className='u-nav'>Sign {user ? 'Out' : 'In'}</span>
              </span>
            </Link>
            <Link
              to='/tests'
              className={`nav-link ${isMobileMenuOpen ? 'slide-in' : ''}`}
              onClick={closeMobileMenu}
            >
              <span className='nav-link-span'>
                <span className='u-nav'>Tests</span>
              </span>
            </Link>
            <Link
              to='/'
              className={`nav-link ${isMobileMenuOpen ? 'slide-in' : ''}`}
              onClick={closeMobileMenu}
            >
              <span className='nav-link-span'>
                <span className='u-nav'>Home</span>
              </span>
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
};
export default TestNavBar;
