import Axios from 'axios';
import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { config } from '../../../common/utils/config';
import { useDispatch, useSelector } from "react-redux";
import {
    confirmCart,
  } from "../feature/cartSlice.js";
toast.configure();
const ViewOrder = ({match}) => {
    const [state, setstate] = useState([])
    var edit_id = match.params.id ? match.params.id : ''
    const id = localStorage.getItem("res_user")
    ? JSON.parse(localStorage.getItem("res_user"))
    : '';
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const addConfirmCart = () => {
        dispatch(confirmCart())
      };
    useEffect(() => {
        let formData = new FormData();
        formData.append('request', 'getOrdersDetail')
        formData.append('userId', id.id)
        formData.append('orderId',edit_id)
        Axios({
            method: 'post',
            url: config.HOST_NAME,
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            if(response.data.status=='success'){
console.log(`object`, response.data.data)
                setstate(response.data.data)
                //addConfirmCart()
            }else{
                //toast.warning("No",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
            }

        })
        .catch(function (response) {
            toast.warning("Server Problem",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
        });
    }, [])
    return (
        <div class="content-body">
        <div class="container-fluid">
            <div class="form-head d-flex mb-3 align-items-start">
                <div class="mr-auto d-none d-lg-block">
                    <h2 class="text-black font-w600 mb-0">Dashboard</h2>
                    <p class="mb-0">Welcome</p>
                </div>

                <div class="dropdown custom-dropdown">
                    <div class="btn btn-sm btn-primary light d-flex align-items-center svg-btn" data-toggle="dropdown">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22.4281 2.856H21.8681V1.428C21.8681 0.56 21.2801 0 20.4401 0C19.6001 0 19.0121 0.56 19.0121 1.428V2.856H9.71606V1.428C9.71606 0.56 9.15606 0 8.28806 0C7.42006 0 6.86006 0.56 6.86006 1.428V2.856H5.57206C2.85606 2.856 0.560059 5.152 0.560059 7.868V23.016C0.560059 25.732 2.85606 28.028 5.57206 28.028H22.4281C25.1441 28.028 27.4401 25.732 27.4401 23.016V7.868C27.4401 5.152 25.1441 2.856 22.4281 2.856ZM5.57206 5.712H22.4281C23.5761 5.712 24.5841 6.72 24.5841 7.868V9.856H3.41606V7.868C3.41606 6.72 4.42406 5.712 5.57206 5.712ZM22.4281 25.144H5.57206C4.42406 25.144 3.41606 24.136 3.41606 22.988V12.712H24.5561V22.988C24.5841 24.136 23.5761 25.144 22.4281 25.144Z" fill="#2F4CDD"></path></g></svg>
                        <div class="text-left ml-3">
                            <span class="d-block fs-16">Filter Periode</span>
                            <small class="d-block fs-13">4 June 2020 - 4 July 2020</small>
                        </div>
                        <i class="fa fa-angle-down scale5 ml-3"></i>
                    </div>
                    <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" href="#">4 June 2020 - 4 July 2020</a>
                        <a class="dropdown-item" href="#">5 july 2020 - 4 Aug 2020</a>
                    </div>
                </div>
            </div>
			<div class="row">
<div className="cart-container">
      <h2>Your Orders</h2>
      {state.length === 0 ? (
        <div className="cart-empty">
          <p>Your Orders</p>
          <div className="start-shopping">
            <Link to="/">
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
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {state &&
              state.map((state) => (
                <div className="cart-item" key={state.id}>
                  <div className="cart-product">
                  <img src={config.FILE_PATH+'/'+state.image} alt={state.name} />
                    <div>
                      <h3>{state.title}</h3>
                      <p>{state.summary}</p>

                    </div>
                  </div>
                  <div className="cart-product-price">${state.amount}</div>
                  <div className="cart-product-quantity">

                    <div className="count">{state.cartQuantity}</div>

                  </div>
                  <div className="cart-product-total-price">
                    ${state.amount * state.cartQuantity}
                  </div>

                </div>
              ))}
              <div className="cart-summary">
  <div >

  </div>
  <div className="cart-checkout">
    <div className="subtotal">
      <span>Subtotal</span>
      <span className="amount">${state[0].final_amount}</span>
    </div>
    <p>Taxes and shipping calculated at checkout</p>


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
      )}
    </div>
    </div>
    </div>
    </div>
    );
}

export default ViewOrder;