import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm";
import { useDispatch, useSelector } from "react-redux";

const PUBLIC_KEY = "pk_test_51KLJyYSEhlAFZEP4h5mDtWJilKta9yMUuUM7SrIjLtgMVNW57xkquxQgRaBiJgAfme7Rqte8ZyQwvosWruVU7Gq200soPvuTru"
const stripeTestPromise = loadStripe(PUBLIC_KEY)
export default function StripeContainer({match}) {
    var addId = match.params.id ? match.params.id : ''
    const cart = useSelector((state) => state.cart);
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
            <div class="col-xl-12">
            <Elements stripe={stripeTestPromise}>
			<PaymentForm addId={addId} />
		</Elements>
                        </div>
                    </div>
            </div>
    </div>

    )
}
