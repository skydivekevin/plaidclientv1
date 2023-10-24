import React, { useState } from 'react';

const CartContext = React.createContext();

export const CartProvider = (props) => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  function updateCart(quote) {
    if (cart.length === 0) {
      setCart([quote])
    }
    if (cart.length > 0) {
      cart.map((item, index) => {
        if (item._id === quote._id) {
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
      cart, setCart, updateCart, cartTotal, setCartTotal
    }}>
      {props.children}
    </CartContext.Provider>
  )
}
export default CartContext;