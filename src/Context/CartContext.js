import React, { useState, createContext } from "react";

//External Components
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CartContext = createContext();

export const CartProvider = (props) => {
  const [cart, setCart] = useState([]);

  const addItem = (item, count) => {
    const newItem = { ...item, contador: count };

    if (!isInCart(item)) {
      setCart([...cart, newItem]);
    } else {
      let foundItem = cart.find((el) => el.id === item.id);
      foundItem.contador = foundItem.contador + count;
      setCart([...cart]);
    }
  };

  const isInCart = (item) => {
    return cart && cart.some((element) => element.id === item.id);
  };

  const deleteItem = (id) => {
    const remItem = cart.filter((el) => el.id !== id);
    setCart([...remItem]);
    notifyError("Item eliminado de tu carrito");
  };

  const notifySucces = (text) => toast.success(text);
  const notifyError = (text) => toast.error(text);
  const notifyCopy = (text) => toast.info ('Copiado correctamente!', {position: "bottom-right", autoClose: 1500, hideProgressBar: true,  loseOnClick: false, pauseOnHover: false, draggable: true, progress: undefined});

  const clear = () => {
    return setCart([]);
  };

  const precioTotalCarrito = () =>
    cart.reduce(
      (prevValue, currentValue) =>
        prevValue + currentValue.price * currentValue.contador,
      0
    );

  const cantidadTotalCarrito = () =>
    cart.reduce(
      (prevValue, currentValue) => prevValue + currentValue.contador,
      0
    );


  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addItem,
        precioTotalCarrito,
        cantidadTotalCarrito,
        deleteItem,
        clear,
        notifyError,
        notifySucces,
        notifyCopy,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
