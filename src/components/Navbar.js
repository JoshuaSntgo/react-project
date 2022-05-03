import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import {Button as MUIButton} from '@mui/material'
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useHistory } from 'react-router-dom';

function Navbar() {
  const user = JSON.parse(sessionStorage.getItem('user'))
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const {push} = useHistory()
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container' style={{justifyContent: 'space-between', width: '90%'}}>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            CITI
            <i class='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          {!user && (
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item'>
                <Link
                  to='/sign-up'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  to='/sign-in'
                  className='nav-links-mobile'
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </li>
            </ul>
          )}

          {(!user && button) && <Button buttonStyle='btn--outline'>Login</Button>}
          
          {user && (
              <MUIButton onClick={() => {
                sessionStorage.clear()
                push("/sign-in")
                return window.location.reload()
              }}>Logout</MUIButton>
          )}

        </div>
      </nav>
    </>
  );
}

export default Navbar;