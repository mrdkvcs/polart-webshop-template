import React from 'react'
import Link from 'next/link';
import {urlFor} from '../lib/client'

function FooterBanner({footerBanner : {discount , largeText1 , saleTime , smallText , midText , product , buttonText , image , desc}}) {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
      <div className="left">
        <p>{discount}</p>
        <h3>{largeText1}</h3>
        <h5>{saleTime}</h5>
      </div>

      <div className="right">
      <p>{smallText}</p>
      <h3>{midText}</h3>
      <p>{desc}</p>
      <Link href={`product/${product}`}>
        <button>{buttonText}</button>
      </Link>
      </div>
      </div>

      <img src={urlFor(image)} className="footer-banner-image" alt="" />
    </div>
  )
}

export default FooterBanner