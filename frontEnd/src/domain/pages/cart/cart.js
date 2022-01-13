import React,{useEffect,useContext} from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    addToCart,
    clearCart,
    decreaseCart,
    getTotals,
    removeFromCart,
  } from "../feature/cartSlice.js";
import { config } from '../../../common/utils/config.js';
import LoginContext from '../context/LoginContext.js';
import { toast } from 'react-toastify';
const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const max_cart=Number(localStorage.getItem('max_order'))
    const loginContext = useContext(LoginContext);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTotals());
      }, [cart, dispatch]);

      const handleAddToCart = (product) => {
        const itemIndex = cart.cartItems.findIndex(
          (item) => item.id === product.id
        );
          if(cart.cartItems[itemIndex].cartQuantity<Number(cart.cartItems[itemIndex].max_qty)){
            dispatch(addToCart(product));
          }else{
            toast.error(`You can't select upto maximum quantity ${cart.cartItems[itemIndex].cartQuantity}`, {
              position: "bottom-left",
            });
          }

      };
      const handleDecreaseCart = (product) => {
        dispatch(decreaseCart(product));
      };
      const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
      };
      const handleClearCart = () => {
        dispatch(clearCart());
      };
    return (
        <div class="content-body">
        <div class="container-fluid">
			<div class="row">
<div className="col-lg-12">
      <h2>Shopping Cart</h2>
      <div class="col-lg-12">

      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is currently empty</p>
          <div className="start-shopping">
            <Link to={`/restaurant/${localStorage.getItem("last_res")}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-lg-12 order-md-2 mb-4">
                                        <h4 class="d-flex justify-content-between align-items-center mb-3">
                                            <span class="text-muted">Your cart</span>
                                            <span class="badge badge-primary badge-pill">{cart.cartTotalQuantity}</span>
                                        </h4>
                                        <ul class="list-group mb-3">
                                        {cart.cartItems &&  cart.cartItems.map((cartItem) => ( <>
                                        <li class="list-group-item d-flex justify-content-between lh-condensed">
                                                <div className=" col-md-4">
                                                    <h6 className="my-0">{cartItem.title}</h6>
                                                    <small className="text-muted">{cartItem.summary}</small>
                                                </div>
                                                <div className="col-md-4">
                                                  <div className="input-group col-md-8">
                                                    <div className="input-group-prepend">
                                                        <span onClick={() => handleDecreaseCart(cartItem)} className="input-group-text">-</span>
                                                    </div>
                                                    <input type="text" className="form-control" value={cartItem.cartQuantity} />

                                                    <div className="input-group-append">
                                                        <span onClick={() => handleAddToCart(cartItem)} className="input-group-text">+</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <span class="text-muted">${cartItem.price * cartItem.cartQuantity}</span>
                                            </li></>))}


                                        </ul>
                                        <div className="cart-summary">
  <button className="clear-btn" onClick={() => handleClearCart()}>
    Clear Cart
  </button>
  <div className="cart-checkout">
    <div className="subtotal">
      <span>Subtotal</span>
      <span className="amount">${cart.cartTotalAmount}</span>
    </div>
    <p>Taxes and shipping calculated at checkout</p>
  <Link to='/checkout'><button>Check out</button></Link>

    <div className="continue-shopping">
      <Link to={`/restaurant/${localStorage.getItem("last_res")}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-arrow-left"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
          />
        </svg>
        <span>Continue Shopping</span>
      </Link>
    </div>
  </div>
</div>
                                        </div>
                                        </div>
                                        </div>
                                        </div>

      )}
    </div>
    </div>
    </div>
    </div>
    </div>
    )
}

export default Cart;