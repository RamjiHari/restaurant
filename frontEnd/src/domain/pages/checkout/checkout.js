import React,{useEffect, useState} from 'react';
import { Link , useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { config } from '../../../common/utils/config.js';
import axios from "axios";
const Checkout = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const id = localStorage.getItem("res_user")
    ? JSON.parse(localStorage.getItem("res_user"))
    : '';
    const history = useHistory();
    const [address,setAddress] = useState({
        'country':'',
        'fullName':'',
        'email':'',
        'pincode':'',
        'homeNo':'',
        'street':'',
        'landmark':'',
        'city':'',
        'mobNo':'',
        'state':''

    })

    const onChange=(key,val)=>{
        let updated = {
            ...address,
            [key]: val,
          };
          setAddress(updated);
    }

const addAddress = (event) =>{
    event.preventDefault();
    let error=false;let loopContinue_one = true;
    Object.keys(address).forEach((key,value) => {
      if(address[key]=='' && loopContinue_one){
          console.log(`address[key]`, key)
        alert("Please Enter "+key+" value")
        error=true;
        loopContinue_one = false;
      }
  })
  console.log(`object`, error)
  if(error==false){
    let formData = new FormData();
    formData.append('request', 'insertAddressFromApp')
    formData.append('userId', id.id)
    formData.append('country', address.country)
    formData.append('fullName', address.fullName)
    formData.append('email', address.email)
    formData.append('pincode', address.pincode)
    formData.append('homeNo', address.homeNo)
    formData.append('street', address.street)
    formData.append('landmark', address.landmark)
    formData.append('city', address.city)
    formData.append('mobNo', address.mobNo)
    formData.append('state', address.state)
    axios({
        method: 'post',
        url:config.HOST_NAME,
        data: formData,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        console.log(`object`, response.data)
        if(response.data.status=='success'){
            history.push("/buy");
        }else{
            //toast.warning("Some thing error",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
        }

    })
    .catch(function (response) {
        //toast.warning("Server Problem",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
        console.log(response)
    });
}
}

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
            <div class="col-xl-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-4 order-md-2 mb-4">
                                        <h4 class="d-flex justify-content-between align-items-center mb-3">
                                            <span class="text-muted">Your cart</span>
                                            <span class="badge badge-primary badge-pill">{cart.cartTotalQuantity}</span>
                                        </h4>
                                        <ul class="list-group mb-3">
                                        {cart.cartItems &&  cart.cartItems.map((cartItem) => ( <>
                                        <li class="list-group-item d-flex justify-content-between lh-condensed">
                                                <div>
                                                    <h6 class="my-0">{cartItem.title}</h6>
                                                    <small class="text-muted">{cartItem.summary}</small>
                                                </div>
                                                <span class="text-muted">${cartItem.price}</span>
                                            </li></>))}

                                            <li class="list-group-item d-flex justify-content-between">
                                                <span>Total (USD)</span>
                                                <strong>${cart.cartTotalAmount}</strong>
                                            </li>
                                        </ul>

                                        <form>
                                            <div class="input-group">
                                                <input type="text" class="form-control" placeholder="Promo code"/>
                                                <div class="input-group-append">
                                                    <button type="submit" class="btn btn-primary">Redeem</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="col-md-8 order-md-1">
                                        <h4 class="mb-3">Billing address</h4>
                                        <form class="needs-validation" novalidate="">
                                                <div class="row">
                                                    <div class="col-md-12 mb-6">
                                                    <label for="country">Country</label>
                                                        <select class="form-control" id="country" required=""  onChange={(e)=>onChange('country',e.target.value)}>
                                                            <option value="">Choose...</option>
                                                            <option value="United States">United States</option>
                                                        </select>
                                                        </div>
                                                    <div class="col-md-12 mb-6">
                                                        <label for="fullname">Full Name</label>
                                                        <input type="text" class="form-control" id="fullname"   required="" onChange={(e)=>onChange('fullName',e.target.value)}/>
                                                    </div>
                                                    <div class="col-md-12 mb-6">
                                                    <label for="email">Email</label>
                                                    <input type="email" class="form-control" id="email" onChange={(e)=>onChange('email',e.target.value)}/>
                                                </div>
                                                <div class="col-md-12 mb-6">
                                                    <label for="mobile">Mobile Number</label>
                                                    <input type="text" class="form-control" id="mobile" onChange={(e)=>onChange('mobNo',e.target.value)} />
                                                </div>
                                                <div class="col-md-12 mb-6">
                                                    <label for="pincode">Pin Code</label>
                                                    <input type="text" class="form-control" id="pincode" placeholder='6 digits [0-9] PIN code' onChange={(e)=>onChange('pincode',e.target.value)} />
                                                </div>
                                                <div class="col-md-12 mb-6">
                                                    <label for="flat">Flat, House no., Building, Company, Apartment</label>
                                                    <input type="text" class="form-control" id="flat" onChange={(e)=>onChange('homeNo',e.target.value)} />
                                                </div>
                                                <div class="col-md-12 mb-6">
                                                    <label for="area">Area, Colony, Street, Sector, Village</label>
                                                    <input type="text" class="form-control" id="area" onChange={(e)=>onChange('street',e.target.value)}/>
                                                </div>
                                                <div class="col-md-12 mb-6">
                                                    <label for="landmark">Landmark</label>
                                                    <input type="text" class="form-control" id="landmark" placeholder="E.g. Near AIIMS Flyover, Behind Regal Cinema, etc." onChange={(e)=>onChange('landmark',e.target.value)}/>
                                                </div>
                                                <div class="col-md-12 mb-6">
                                                    <label for="city">Town/City</label>
                                                    <input type="text" class="form-control" id="city" onChange={(e)=>onChange('city',e.target.value)}/>
                                                </div>
                                                <div class="col-md-12 mb-6">
                                                                <label for="state">State</label>
                                                                <select class="form-control" id="state" required="" onChange={(e)=>onChange('state',e.target.value)}>
                                                                    <option value="">Choose...</option>
                                                                    <option value="California">California</option>
                                                                </select>

                                                            </div>
                                    </div>
                                    <hr class="mb-4"/>
<button class="btn btn-primary btn-lg btn-block" type="button" onClick={(e)=>addAddress(e)}>Deliver to this address</button>
<Link to="/buy"  class="btn btn-primary btn-lg btn-block" ><a>Checkout</a></Link>

                                    </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
    </div>
    </div>
    )
}

export default Checkout;