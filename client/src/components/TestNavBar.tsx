import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { logout } from '../features/authSlice';
import logo from '../images/logo.png';
import Swal from 'sweetalert2';

const TestNavBar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const route = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleTestsClick = async (e: any) => {
    setIsMobileMenuOpen(false);
    if (!user) {
      e.preventDefault();
      Swal.fire({
        title: 'Hold Up',
        text: 'please sign in to save and manage your tests!',
        icon: 'warning',
        confirmButtonColor: '#6c6185',
        confirmButtonText: 'sign in',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/signin');
        }
      });
    }
  };

  return (
    <>
      <header id='nav-wrapper'>
        <nav id='nav' className={isMobileMenuOpen ? 'nav-visible' : ''}>
          <div className='nav left'>
            <span className='gradient skew'>
              <h1 className='logo un-skew'>
                <div id='logo-container'>
                  <Link to='/'>Scribe</Link>
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
              to={user ? '/' : '/signin'}
              className={`nav-link ${isMobileMenuOpen ? 'slide-in' : ''}`}
              onClick={handleAuthClick}
            >
              <span className='nav-link-span'>
                <span className='u-nav'>Sign {user ? 'Out' : 'In'}</span>
              </span>
            </Link>
            <Link
              to={route.pathname === '/test' ? '/tests' : '/test'}
              className={`nav-link ${isMobileMenuOpen ? 'slide-in' : ''}`}
              onClick={handleTestsClick}
            >
              <span className='nav-link-span'>
                {route.pathname === '/test' ? 'Tests' : 'Testing Page'}
              </span>
            </Link>
            {/* <Link
              to='/'
              className={`nav-link ${isMobileMenuOpen ? 'slide-in' : ''}`}
              onClick={closeMobileMenu}
            >
              <span className='nav-link-span'>
                <span className='u-nav'>Home</span>
              </span>
            </Link> */}
          </div>
        </nav>
      </header>
    </>
  );
};
export default TestNavBar;
