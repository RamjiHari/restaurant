import React,{useEffect, useState} from 'react';
import { Link , useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { config } from '../../../common/utils/config.js';
import axios from "axios";
import { toast } from 'react-toastify';
import Axios from 'axios';
const Checkout = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const id = localStorage.getItem("res_user")
    ? JSON.parse(localStorage.getItem("res_user"))
    : '';

    const history = useHistory();
    const [userAddress,setUserAddress]=useState([])
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
//   console.log(`object`, error)
  if(error==false){
    let formData = new FormData();
    formData.append('request', 'insertAddressFromApp')
    formData.append('userId', id.id!=undefined ? id.id:'0')
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
            history.push(`/buy/${response.data.data}`);
        }else{
            toast.warning("Some thing error",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
        }

    })
    .catch(function (response) {
        //toast.warning("Server Problem",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
        console.log(response)
    });
}
}

useEffect(() => {
    if(id.id!=undefined){
        let formData = new FormData();
        formData.append('request', 'getAddressFromApp')
        formData.append('id', id.id);
        Axios({
            method: 'post',
            url: config.HOST_NAME,
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            console.log(`object`, response)
            if(response.data.status=='success'){
                setUserAddress(response.data.data)
            }else{
                //toast.warning("Something Wrong",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
            }
        })
        .catch(function (response) {
           toast.warning("Servessr Problem",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
        });
        }
}, [])

    return (
        <div class="content-body">
        <div class="container-fluid">
            <div class="form-head d-flex mb-3 align-items-start">
                <div class="mr-auto d-none d-lg-block">
                    <h2 class="text-black font-w600 mb-0">Restaurants</h2>
                </div>
            </div>
            <div class="row">
                <div class="col-xl-12">

                    {id.id!=undefined && userAddress !=''&&
                        <div class="card">
            <div class="card-body">
            <div class="row mb-5">
               { userAddress.map((item) => (
                    <div class="mt-4 col-xl-3 col-lg-3 col-md-6 col-sm-12">
                        <h6>Address:</h6>
                        <div> <strong>{item.fullName},</strong> </div>
                        <div>{item.homeNo}, {item.street},</div>
                        <div>{item.city},</div>
                        <div>{item.state},</div>
                        <div>{item.country}</div>
                        <div>Email: {item.email},</div>
                        <div>Phone: +{item.mobNo}.</div>
                        <Link class="btn btn-primary btn-sm btn-block" to = {`/buy/${item.id}`}>Deliver to this address</Link>
                    </div>
                   ))
                    }
                    </div>
                    </div>
                    </div>
                }

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
{id.id==undefined && <Link to="/register"  class="btn btn-primary btn-lg btn-block" ><a>Register and Checkout</a></Link>}

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