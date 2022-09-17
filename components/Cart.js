import React, { useRef } from 'react'
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { toast } from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';

function Cart() {


    const cartRef = useRef();
    const { totalPrice, totalQuantites, cartItems, setShowCart , toggleCartItemQuantity , removeFromCart } = useStateContext();


    const handleCheckout = async () => {

        const stripe = await getStripe();
        
        
        const response = await fetch('/api/stripe' , {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(cartItems)
        })

        if (response.statusCode  === 500) {
            return;
        }

        const data = await response.json();

        toast.loading('Átirányítás...');

        stripe.redirectToCheckout({sessionId : data.id});

    }

    return (
        <div className="cart-wrapper" ref={cartRef}>
            <div className="cart-container">
                <button type="button" className="cart-heading" onClick={() => setShowCart(false)}>
                    <AiOutlineLeft />
                    <span className="heading">Kosarad</span>
                    <span className="cart-num-items">({totalQuantites} termék)</span>
                </button>

                {cartItems.length < 1 && (
                    <div className="empty-cart">
                        <AiOutlineShopping size={160} />
                        <h3>A Kosarad üres</h3>
                        <Link href="/">
                            <button type="button" onClick={() => setShowCart(false)} className="btn">Vásárlok tovább</button>
                        </Link>
                    </div>

                )}
                <div className="product-container">
                    {cartItems.length >= 1 && cartItems.map((item, index) => (
                        <div className="product" key={index}>
                            <img src={urlFor(item?.image[0])} className="cart-product-image" />
                            <div className="item-desc">
                                <div className="flex top ">
                                    <h5>{item.name}</h5>
                                    <h4>{item.price} Ft</h4>
                                </div>

                                <div className="flex bottom">
                                    <div>
                                        <p className="quantity-desc">
                                            <span className="minus" onClick={() => toggleCartItemQuantity(item._id , 'dec')} ><AiOutlineMinus /></span>
                                            <span className="num">{item.quantity}</span>
                                            <span className="plus" onClick={() => toggleCartItemQuantity(item._id , 'inc')}><AiOutlinePlus /></span>
                                        </p>
                                    </div>
                                    <button type="button" onClick={() => removeFromCart(item._id)} className="remove-item">
                                        <TiDeleteOutline />
                                    </button>

                                </div>


                            </div>

                        </div>
                    ))}
                </div>
                {cartItems.length >= 1 && (

                    <div className="cart-bottom">
                        <div className="total">
                        <h3>Végösszeg :</h3>
                        <h3>{totalPrice} Ft</h3>
                        </div>
                        <div className="btn-container">
                        <button onClick={handleCheckout} type="button" className="btn">Fizetés Stripe-al</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart