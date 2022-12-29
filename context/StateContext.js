import React, {createContext, useContext, useState, useEffect} from 'react';
import {toast} from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({children}) => {
    
    const [showCart, setShowCart ] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [tatalQuantities, setTatalQuantities] = useState(0);
    const [quantity, setQuantity] = useState(1)

    let foundProduct;
    let index;

    const onAdd = (product, qty) => {
        const isProductInCart = cartItems.find(item => item._id === product._id)
        setTotalPrice(prevPrice => prevPrice + product.price * qty);
        setTatalQuantities(prevTotalQuantities => prevTotalQuantities + qty);

        if (isProductInCart) {

            const updatedCartItems = cartItems.map(cartItem => {
                if (cartItem._id === product._id) {
                    return {...cartItem, quantity: cartItem.quantity + qty};
                }
            })

            setCartItems(updatedCartItems);
        } else {
            product.quantity = qty;
            setCartItems([ ...cartItems, { ...product }]);
        }
        toast.success(`${quantity} ${product.name} added to the cart.`);
    } 

    const toggleCartItemQuantity = (id, value) => {

        foundProduct = cartItems.find(item => item._id === id);
        index = cartItems.findIndex(item => item._id === id);
        const newCartItem = cartItems.filter(item => item._id !== id);

        if (value === 'inc') {
            setCartItems([...newCartItem, {...foundProduct, quantity: foundProduct.quantity + 1}]);
            setTotalPrice(prevTotalPrice => prevTotalPrice + foundProduct.price);
            setTatalQuantities(prevTotalQuantities => prevTotalQuantities + 1);
        }else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                setCartItems([...newCartItem, {...foundProduct, quantity: foundProduct.quantity - 1}]);
                setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price);
                setTatalQuantities(prevTotalQuantities => prevTotalQuantities - 1);
            }
        }
    }

    const increaseQuantity = () => {
        setQuantity((previusQuantity) => previusQuantity + 1);
    }

    const decreaseQuantity = () => {
        setQuantity((previusQuantity) => {
            if (previusQuantity - 1 < 1) {
                return 1;
            }
           return previusQuantity - 1;
        })
    }

    const removeItem = (id) => {
        const foundProduct = cartItems.find(item => item._id === id);
        const newCartItem = cartItems.filter(item => item._id !== id);

        setCartItems(newCartItem);
        setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price * foundProduct.quantity );
        setTatalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    }

    return (
        <Context.Provider 
            value={{
                showCart,
                cartItems,
                totalPrice,
                tatalQuantities,
                quantity,
                setShowCart,
                increaseQuantity,
                decreaseQuantity,
                onAdd,
                toggleCartItemQuantity,
                removeItem,
                setTatalQuantities,
                setCartItems,
                setTotalPrice,
                setShowCart
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)