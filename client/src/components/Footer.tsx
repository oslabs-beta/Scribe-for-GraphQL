import React from 'react';
import pierce from '../images/pierce.jpg';
import jake from '../images/jake.jpg';
import mason from '../images/mason.jpg';
import jason from '../images/jason.jpg';
import linkedin from '../images/linkedin.png';
import github from '../images/github.png';

function Footer() {
  return (
    <div id='footer'>
      <h1>Meet the Team</h1>
      <div id='team-container'>
        <div className='member'>
          <img className='profile' src={jake}></img>
          <h2>Jake Gray</h2>
          <div className='links'>
            <a href='https://github.com/soxg'>
              <img src={github}></img>
            </a>
            <a href='https://www.linkedin.com/in/jake-d-gray/'>
              <img src={linkedin}></img>
            </a>
          </div>
        </div>
        <div className='member'>
          <img className='profile' src={jason}></img>
          <h2>Jason Johnson</h2>
          <div className='links'>
            <a href='https://github.com/jaysenjonsin'>
              <img src={github}></img>
            </a>
            <a href='https://www.linkedin.com/in/jasoncjohnson5/'>
              <img src={linkedin}></img>
            </a>
          </div>
        </div>
        <div className='member'>
          <img className='profile' src={mason}></img>
          <h2>Mason Shelton</h2>
          <div className='links'>
            <a href='https://github.com/MasonS1012'>
              <img src={github}></img>
            </a>
            <a href='https://www.linkedin.com/in/mason-shelton-9ab25521a/'>
              <img src={linkedin}></img>
            </a>
          </div>
        </div>
        <div className='member'>
          <img className='profile' src={pierce}></img>
          <h2>Pierce Yu</h2>
          <div className='links'>
            <a href='https://github.com/PierceYu'>
              <img src={github}></img>
            </a>
            <a href='https://www.linkedin.com/in/pierce-yu/'>
              <img src={linkedin}></img>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
