import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';

function Footer() {
  return ( 
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          College of Information in Communication Technology
        </p>
      </section>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
              CITI
              <i class='fab fa-typo3' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;