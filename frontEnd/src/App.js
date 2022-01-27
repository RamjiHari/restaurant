

//4592 0000 2228 1915
import React,{useState,useContext,useEffect} from 'react';
import Dashboard from './domain/pages/dashboard/dashboard';
import "./App.css";
function App() {
  const [loading, setLoading] = useState(false)
  const loadScript = (src) => {
    return new Promise(function (resolve, reject) {
      var script = document.createElement('script')
      script.src = src
      script.addEventListener('load', function () {
        resolve()
      })
      script.addEventListener('error', function (e) {
        reject(e)
      })
      document.body.appendChild(script)
      document.body.removeChild(script)
    })
  }

   useEffect(() => {
 loadScript(`${process.env.PUBLIC_URL}/js/custom.min.js`)

   })
  return (
    <Dashboard/>
  );
}

export default App;


// import React, { useState } from "react";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import "./App.css";
// function App() {
//   const stripe = loadStripe(
//     "pk_test_51KLJyYSEhlAFZEP4h5mDtWJilKta9yMUuUM7SrIjLtgMVNW57xkquxQgRaBiJgAfme7Rqte8ZyQwvosWruVU7Gq200soPvuTru"
//   );
//   return (
//     <Elements stripe={stripe}>
//       <CheckoutForm />
//     </Elements>
//   );
// };
// function CheckoutForm() {
//   const [isPaymentLoading, setPaymentLoading] = useState(false);
//   const stripe = useStripe();
//   const elements = useElements();
//   const payMoney = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) {
//       return;
//     }
//     setPaymentLoading(true);
//   //   const clientSecret = {
//   //     "secret_key"   : "sk_test_51KLJyYSEhlAFZEP4b28M4fum1U3Wy9gpIhPR9URgTIxtDjmjL3SVX6whJgGTMIezluzFwd9PkXTOnWnjWI2dU25A004uwm6979",
//   //     "publishable_key" : "pk_test_51KLJyYSEhlAFZEP4h5mDtWJilKta9yMUuUM7SrIjLtgMVNW57xkquxQgRaBiJgAfme7Rqte8ZyQwvosWruVU7Gq200soPvuTru"
//   // }
//   PaymentIntentCreateParams params =
//   PaymentIntentCreateParams
//     .builder()
//     .setAmount(500)
//     .setCurrency("usd")
//     .setDescription("Software development services")
//     .build();

// PaymentIntent paymentIntent = PaymentIntent.create(params);

//     const clientSecret ='sk_test_51KLJyYSEhlAFZEP4b28M4fum1U3Wy9gpIhPR9URgTIxtDjmjL3SVX6whJgGTMIezluzFwd9PkXTOnWnjWI2dU25A004uwm6979'
//     const paymentResult = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//         billing_details: {
//           name: "Faruq Yusuff",
//         },
//       },
//     });
//     setPaymentLoading(false);
//     if (paymentResult.error) {
//       alert(paymentResult.error.message);
//     } else {
//       if (paymentResult.paymentIntent.status === "succeeded") {
//         alert("Success!");
//       }
//     }
//   };

//   return (
//     <div
//       style={{
//         padding: "3rem",
//       }}
//     >
//       <div
//         style={{
//           maxWidth: "500px",
//           margin: "0 auto",
//         }}
//       >
//         <form
//           style={{
//             display: "block",
//             width: "100%",
//           }}
//           onSubmit = {payMoney}
//         >
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <CardElement
//               className="card"
//               options={{
//                 style: {
//                   base: {
//                     backgroundColor: "white"
//                   }
//                 },
//               }}
//             />
//             <button
//               className="pay-button"
//               disabled={isPaymentLoading}
//             >
//               {isPaymentLoading ? "Loading..." : "Pay"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
// export default App;

