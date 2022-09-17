import React from 'react';
import {AiFillInstagram , AiFillFacebook} from 'react-icons/ai';

function Footer() {
  return (
    <div className="footer-container">
      <p>Copyright 2022 David Template Webshop</p>
      <p className="icons">
        <AiFillInstagram />
        <AiFillFacebook />
      </p>
    </div>
    
  )
}

export default Footer