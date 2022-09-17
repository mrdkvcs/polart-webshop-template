import React from 'react'
import { client, urlFor } from '../../lib/client';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Products } from '../../components';
import {useState} from 'react';
import {useStateContext} from '../../context/StateContext';

function ProductDetails({ products, product}) {

  const [index , setIndex] = useState(0);
  const {qty , increaseQty, decreaseQty , addToCart} = useStateContext();
  const { image, details, name, price } = product;

  return (
    <div>
        <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[index])} className="product-detail-image" />
          </div>

          <div className="small-image-container">
          {image?.map((item , i) => (
            <img src={urlFor(item)} key={i} className={i === index ? 'small-image selected-image' : 'small-image'} onMouseEnter={() => setIndex(i)} />
          ))}
          </div>
          
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div>
          <h4>Leírás: </h4>
          <p>{details}</p>
          <p className="price">{price} Ft</p>
          <div className="quantity">
            <h3>Mennyiség:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decreaseQty} ><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={increaseQty}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="buttons">
          <button className="add-to-cart" type="button" onClick={() => addToCart(product , qty)}>Hozzáadás a kosárhoz</button>
          <button className="buy-now">Vásárlás most</button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
      <h2>Ezek is érdekelhetnek</h2>

      <div className="marquee">
        <div className="maylike-products-container track">
          {products.map((item) => (
            <Products key={item._id} products={item} />
          ))}
        </div>
      </div>
      </div>


    </div>
  )
}

export const getStaticPaths = async () => {

  const query = `*[_type == "product"]`



  const products = await client.fetch(query);



  const paths = products.map((product) => ({

    params: {
      slug: product.slug.current
    }
  }));



  return {
    paths,
    fallback: 'blocking'
  }

}

export const getStaticProps = async ({ params: { slug } }) => {

  const slugQuery = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(slugQuery);
  const products = await client.fetch(productsQuery);


  return {
    props: { products, product }
  }

}

export default ProductDetails