import React from 'react';
import image from './Medic.ai.png';
import Image from 'next/image';

function NavBar() {
    return (
      <div className="navbar">
        <div className="navbar-brand">
          <Image src={image} alt="logo" className="navbar-logo" width={50} height={50} />
          <b>Medic.ai</b>
        </div>

        <ul>
          <li>
            <a href="/" className="nav-link">Home</a>
          </li>
          <li>
            <a href="/form" className="nav-link">Form</a>
          </li>
          <li>
            <a href="/about" className="nav-link">About</a>
          </li>
        </ul>
      </div>
    );
  }

export default NavBar;