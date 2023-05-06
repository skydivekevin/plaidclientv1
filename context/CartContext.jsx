import React, { useState } from 'react';

const CartContext = React.createContext();

export const CartProvider = (props) => {
  const [cart, setCart] = useState([]);

  function updateCart(quote) {
    if (cart.length === 0) {
      setCart([quote])
    }
    if (cart.length > 0) {
      cart.map((item, index) => {
        // console.log("greater than zero")
        if (item._id === quote._id) {
          // console.log("match")
          const newCart = cart.filter(function (letter) {
            return letter !== item
          })
          setCart(newCart)
        }
        if (item._id !== quote._id) {
          setCart([...cart, quote])
        }
      })


    }
  }

  return (
    <CartContext.Provider value={{
      cart, setCart, updateCart
    }}>
      {props.children}
    </CartContext.Provider>
  )
}
export default CartContext;