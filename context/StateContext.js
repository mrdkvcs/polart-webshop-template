import React , {useState , useEffect , useContext} from 'react';
import {toast} from 'react-hot-toast';

const AppContext = React.createContext();

export const useStateContext = () => {

    return useContext(AppContext);
}

export const StateContext = ({children}) => {

    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantites, setTotalQuantites] = useState(0);
    const [qty, setQty] = useState(1);
    let foundProduct;
    let index;

    const increaseQty = () => {

        setQty((qty) => qty + 1);
    }

    const addToCart = (product , quantity) => {

        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        if (checkProductInCart) {

            setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
            setTotalQuantites((prevTotalQuantites) => prevTotalQuantites + quantity);

            const updatedCart = cartItems.map((cartproduct) => {

                if (cartproduct._id === product._id) {

                    return {
                        ...cartproduct,
                        quantity : cartproduct.quantity + quantity
                    }
                }
            })

            setCartItems(updatedCart);
            toast.success(`${qty} ${product.name}  hozzáadva a kosárhoz!`);
        } else {

            setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);

            setTotalQuantites((prevTotalQuantites) => prevTotalQuantites + quantity);
    
            product.quantity = quantity;
    
            setCartItems([...cartItems , {...product}]);
    
            toast.success(`${qty} ${product.name}  hozzáadva a kosárhoz!`);
        }

       
    }

    const removeFromCart = (id) => {

        const newCartItems = cartItems.filter((item) => item._id !== id);
        const product = cartItems.find(item => item._id === id);
        
        setTotalPrice((prevTotalPrice) => prevTotalPrice - product.price * product.quantity);
        setTotalQuantites((prevTotalQuantites) => prevTotalQuantites - product.quantity);
        setCartItems(newCartItems);
    }

    const toggleCartItemQuantity = (id , value) => {

        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((item) => item._id === id);
       
        const newCartItems = cartItems.filter((item) => item._id !== id);

        if (value === 'inc') {
            
            setCartItems([...newCartItems ,  {...foundProduct , quantity : foundProduct.quantity + 1}])
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantites((prevTotalQuantites) => prevTotalQuantites + 1 );
            
        } else if (value === 'dec') {

            if (foundProduct.quantity > 1) {

                
            setCartItems([...newCartItems ,  {...foundProduct , quantity : foundProduct.quantity - 1}])
            setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
            setTotalQuantites((prevTotalQuantites) => prevTotalQuantites - 1 )

            }
        }
    }

    const decreaseQty = () => {

        setQty((qty) => {
            if (qty === 1) return 1;
          return   qty - 1
        })
    }


    return (
        <AppContext.Provider value={{
            showCart,
            setShowCart,
            cartItems,
            totalPrice,
            totalQuantites,
            qty,
            increaseQty,
            decreaseQty,
            addToCart,
            toggleCartItemQuantity,
            removeFromCart
        }}>
            {children}
        </AppContext.Provider>
    )

}