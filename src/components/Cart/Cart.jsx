import React from "react";
import { useSelector } from "react-redux";
import "./Cart.scss";
import { useDispatch } from "react-redux";
import { removeProducts } from "../../redux/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  console.log(cart);

const dispatch = useDispatch()

  const handleRemove = (id) => {
    dispatch(removeProducts(id));
  };
  return (
    <div className="cart">
      {/* <h1>{cart.products}</h1>
<h1>{cart.quantity}</h1>
<h1>{cart.image}</h1> */}

      {cart.products.map((c) => (
        <div className="container">
          <div className="image">
            <img src={c.image} alt="" className="img" />
          </div>
          <p>{c.title}</p>

          <div>
            <button onClick={()=>handleRemove(c.id)}>Remove from cart</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
