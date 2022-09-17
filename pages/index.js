import React from 'react'
import  { Products , HeroBanner , FooterBanner } from './../components';
import {client} from '../lib/client';

function Home({products , bannerData}) {
  return (
    <>
    
    <HeroBanner heroBanner={bannerData.length > 0 && bannerData[0]} />
    
    <div className="products-heading">
      <h2>Legnépszerűbb termékek</h2>
      <p>Minden fajta termék</p>
    </div>

    <div className="products-container">
     {products?.map((item) => <Products key={item._id} products={item} />)}
    </div>

    <FooterBanner footerBanner={bannerData.length > 0 && bannerData[0]}/>
    
    </>
  )
}

export const getServerSideProps = async () => {

  const productsQuery = '*[_type == "product"]';
  const bannerQuery = '*[_type == "banner"]';

  const products = await  client.fetch(productsQuery);
  const bannerData =  await client.fetch(bannerQuery);


  return {
    props : {products , bannerData}
  }

}

export default Home
