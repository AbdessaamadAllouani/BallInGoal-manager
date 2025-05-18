import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../slices/CartSlices";

const ShoppingCart = () => {

    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();


  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <div style={styles.cart}>
      <h2 style={styles.title}>Votre Panier</h2>

      {cart.map((item) => (
        <div key={item.id} style={styles.article}>
          <img
            src={`http://localhost:8000/storage/${item.image}`}
            alt={item.name}
            style={styles.image}
          />
          <div style={styles.info}>
            <h4 style={{ margin: 0 }}>{item.name}</h4>
            <span>
              {item.quantity} x {item.price} MAD
            </span>
            <button onClick={() => dispatch(removeFromCart(item.id))}>supp</button>
          </div>
        </div>
      ))}

      <div style={styles.total}>Total : {getTotal()} MAD</div>
      <button style={styles.button}>Passer à la caisse</button>
    </div>
  );
};

const styles = {
  cart: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1000,
    width: "400px",
    margin: "90px auto",
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  article: {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #eee",
    paddingBottom: "10px",
    marginBottom: "15px",
  },
  image: {
    width: "60px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "6px",
    marginRight: "15px",
  },
  info: {
    flex: 1,
  },
  total: {
    textAlign: "right",
    marginTop: "20px",
    fontWeight: "bold",
    fontSize: "18px",
  },
  button: {
    marginTop: "20px",
    width: "100%",
    padding: "12px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default ShoppingCart;
