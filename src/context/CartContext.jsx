import React, { createContext, useReducer } from "react";
import { cartReducer } from "./cartUtils.js";

/**
 Cart state:
 {
   items: [{ productId, product (object), quantity, unitPrice }],
 }
**/

const CartContext = createContext();

export { CartContext };

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (product, qty = 1) => dispatch({ type: "ADD_ITEM", payload: { product, quantity: qty }});
  const updateQty = (productId, qty) => dispatch({ type: "UPDATE_QTY", payload: { productId, quantity: qty }});
  const removeItem = (productId) => dispatch({ type: "REMOVE_ITEM", payload: { productId }});
  const clear = () => dispatch({ type: "CLEAR" });

  const subtotal = state.items.reduce((s,i) => s + i.quantity * Number(i.unitPrice || 0), 0);

  return <CartContext.Provider value={{ cart: state, addItem, updateQty, removeItem, clear, subtotal }}>
    {children}
  </CartContext.Provider>;
}


