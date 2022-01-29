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
import { format_time } from '../../../common/utils/commonAction';
toast.configure();
const OrderItem = () => {
    const [state, setstate] = useState([])
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
        formData.append('request', 'getOrders')
        formData.append('userId', id.id)
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
                console.log(`objresponse.data.dataect`, response.data.data)
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
        <div className="row">


            {state &&
              state.map((state) => (


                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-header d-block">
                                <h4 className="card-title">Order ID :  #{state.id}</h4>
                                <h5>Transaction ID : {state.tranx_id}</h5>
                                <p className="m-0 subtitle">Order On : {new Date(state.createdOn).toLocaleDateString()}</p>
                                <p className="m-0 subtitle">Total Item : {state.totQua}</p>
                                <p className="m-0 subtitle">Total Amount : {state.totAmt}</p>
                                <p className="m-0 subtitle">Status : {state.status==1?'Ordered':'Deliverd '}</p>
                                <p className="m-0 subtitle">ShipTo : {state.fullName} , {state.homeNo},{state.city},{state.country}</p>
                                <Link to={`/orders/${state.id}`} type="button" className="btn btn-primary btn-sm">
                                            View Details
                                        </Link>
                              </div>


                        </div>
                    </div>


              ))}


        </div>
      )}
    </div>
    </div>

    );
}

export default OrderItem;