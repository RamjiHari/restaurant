import React,{useEffect, useState} from 'react';
import { Link , useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { config } from '../../../common/utils/config.js';
import axios from "axios";
import { toast } from "react-toastify";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"


const CARD_OPTIONS = {
  iconStyle: "solid",
  hidePostalCode: true,
  style: {
    base: {
      iconColor: "rgb(240, 57, 122)",
      color: "rgb(240, 57, 122)",
      fontSize: "16px",
      fontFamily: '"Open Sans", sans-serif',
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#CFD7DF"
      }

    },
    invalid: {
      color: "#e5424d",
      ":focus": {
        color: "#303238"
      }
    }
  }
};

const PaymentForm = ({addId}) => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const user = localStorage.getItem("res_user")
    ? JSON.parse(localStorage.getItem("res_user"))
    : '';
    const history = useHistory();

    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = localStorage.getItem("res_user")
    ? JSON.parse(localStorage.getItem("res_user"))
    : '';
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

let orderjson = cart.cartItems.map(function({id,userId,cartQuantity}){
  return {id,userId,cartQuantity};
});

console.log(`paymentMeasdasfsdfthod`, paymentMethod)

    if(!error) {
          let formData = new FormData();
          formData.append('request', 'payment')
          formData.append('userid', user.id!=undefined?user.id:0)
          formData.append('username', user.username!=undefined?user.username:'')
          formData.append('email', user.email!=undefined?user.email:'')
          formData.append('addId', addId)
          formData.append('orderjson', JSON.stringify(orderjson))
          formData.append('totAmt', cart.cartTotalAmount)
          formData.append('totQua', cart.cartTotalQuantity)
          formData.append('stripeToken',paymentMethod.id)
            axios({
              method: 'post',
              url:config.HOST_NAME,
              data: formData,
              config: { headers: {'Content-Type': 'multipart/form-data' }}
          })
          .then(function (response) {

            console.log(`response`, response)

          })
          .catch(function (response) {
              console.log(`response`, response)

          });

    }else {
        console.log(error.message)
    }


}


    return (
        <div>
          {!success ?
        <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button>Pay</button>
        </form>
        :
       <div>
           <h2>You just bought a sweet spatula congrats this is the best decision of you're life</h2>
       </div>
        }
        </div>
    )
}

export default PaymentForm;