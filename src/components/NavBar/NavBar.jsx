import React from "react";
import "./NavBar.scss";
import { Link, useNavigate } from "react-router-dom";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
const Navbar = () => {
  const navigate = useNavigate();
  const cart = useSelector(state=>state.cart)


  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="img">{/* <img src={Cam} alt="" /> */}</div>

        <div className="title">
          <h1>Fancy</h1>
        </div>
        <Link to="/cart">
          <div className="user">
            <ShoppingCartIcon className="icon" />
            <span className="count">{cart.quantity}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
