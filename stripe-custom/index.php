<?php
header('Access-Control-Allow-Origin: *');
error_reporting(0);
session_start();
require_once 'db_config.php';

$domain =$_SERVER['REQUEST_URI'];
$url_components = parse_url($domain);
parse_str($url_components['query'], $params);

  $orderId=$params['id'];
  $selectOrder = mysqli_query($con,"SELECT * FROM `orders` WHERE id='".$orderId."'");
  $rowOrder = mysqli_fetch_assoc($selectOrder);
  $amount=$rowOrder['totAmt'];
  $addId=$rowOrder['addId'];
  $selectAdd = mysqli_query($con,"SELECT * FROM `address` WHERE id='".$addId."'");
  $rowAdd = mysqli_fetch_assoc($selectAdd);

  $name= $rowAdd['fullName'];
  $email= $rowAdd['email'];
  $phone= $rowAdd['mobNo'];
  $line1 = $rowAdd['landmark'];
  $postal_code =  $rowAdd['pincode'];
  $city = $rowAdd['city'];
  $state = $rowAdd['state'];
  $country =  'US';




require 'stripe-php-master/init.php';

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
\Stripe\Stripe::setApiKey('sk_test_51AAfA5AWAZpLwbjwZ1Ht885egfqZszISvPAVnmx378obLMlI9bXeSSz53NbQA7lHL8hCqcgJTmR2qnkAubtBBOj900EnKZlXUn');

$intent = \Stripe\PaymentIntent::create([
  'amount' => $amount,
  'currency' => 'usd',
  // Verify your integration in this guide by including this parameter
  'description' => 'Testing',
  'metadata' => ['integration_check' => 'accept_a_payment'],
]);


?>

<!DOCTYPE html>
<html>
<head>
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css">
    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Poppins" />
     <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <!-- Favicon -->
       <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
           <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.form/4.2.2/jquery.form.js"></script>
  <title>Stripe Custom Payment flow integration using PHP/JavaScript</title>
  <script src="https://js.stripe.com/v3/"></script>

</head>
<style>
.demoInputBox {
    padding: 10px;
    border: #d0d0d0 1px solid;
    border-radius: 4px;
    background-color: #FFF;
    width: 100%;
    margin-top: 5px;
    box-sizing:border-box;
}
button {
  float: left;
  display: block;
  background: #27324E;
  color: white;
  border-radius: 2px;
  border: 0;
  margin-top: 20px;
  font-size: 19px;
  font-weight: 400;
  width: 100%;
  height: 47px;
  line-height: 45px;
  outline: none;
}

button:focus {
  background: #24B47E;
}

button:active {
  background: #159570;
}

.main-amount{
  font-size: 20px;
  font-weight: bold;
  color: #27324E;
  letter-spacing: 2px;
  border: 1px solid green;
  background-color: #f9f9f9;
  padding: 10px;
  text-decoration:none;
  display: inline-block;
  }
 </style>
<body>
  <div class="container">
    <h3 align="center">Stripe Payment</h3>
    <div class="row">
             <br>

      <div class="col-lg-4">

 <!-- card element goes here-->
<form id="payment-form" data-secret="<?= $intent->client_secret ?>">
  <div class="field-row">
        <label>Card Holder Name</label> <span id="card-holder-name-info" class="info"></span><br>
        <input type="text" id="fullname" name="fullname" class="demoInputBox" required>
    </div><br>
    <div class="field-row">
        <label>Email</label> <span id="email-info" class="info"></span><br>
        <input type="email" id="email" name="email" class="demoInputBox" required>
    </div>
<br>
  <div id="card-element">
    <!-- Elements will create input elements here -->
  </div>

  <!-- We'll put the error messages in this element -->
  <div id="card-errors" role="alert"></div>

  <button id="card-button">Pay</button>
</form>


      </div>
      <div class="col-lg-2 text-center">
                <br><br>
                <!--  <img src="code-icon-6.png" alt="Subscribe" width="120px" height="100px"><br><br>
<p style="text-align: center;"><strong>Stripe Source Code</strong> </p> -->
        <p class="main-amount"><strong><?php echo $amount.'$'; ?></strong></p>
              </div>
      <div class="col-lg-6">

      </div>

    </div>

  </div>

<script>
  // Set your publishable key: remember to change this to your live publishable key in production
// See your keys here: https://dashboard.stripe.com/apikeys
var stripe = Stripe('pk_test_51AAfA5AWAZpLwbjwLj4KbQELSoLkMM7FhkAmwsCVhWwGNwBR1q1CSErEWoEKS42pHn9wpmZs68vhSQRCvwnmmArc00Qutxqq8M');
var elements = stripe.elements();

// Set up Stripe.js and Elements to use in checkout form
var style = {
  base: {
    color: "green",
  }
};

var card = elements.create("card", { style: style });
card.mount("#card-element");

card.on('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

var form = document.getElementById('payment-form');
var fullname = document.getElementById('fullname');
var email = document.getElementById('email');
form.addEventListener('submit', function(ev) {
  ev.preventDefault();
  // If the client secret was rendered server-side as a data-secret attribute
  // on the <form> element, you can retrieve it here by calling `form.dataset.secret`
  stripe.confirmCardPayment(form.dataset.secret, {
    payment_method: {
      card: card,
      billing_details: {
        name: '<?php echo $name; ?>',
        email:'<?php echo $email; ?>',
        phone: '<?php echo $phone; ?>',
        address :{
        line1 :'<?php echo $line1; ?>',
        postal_code : '<?php echo $postal_code; ?>',
        city: '<?php echo $city; ?>',
        state : '<?php echo $state; ?>',
        country :'<?php echo $country; ?>',
    }
      }
    }
  }).then(function(result) {
    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      alert(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        console.log(result.paymentIntent,"result.paymentIntent")
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        $.ajax({
                url: 'https://r1.ngazelabs.com/includes/ajax.php',
                type: 'POST',
                data: {orderId: '<?php echo $orderId ?>',
                      id:result.paymentIntent.id,
                      request:'payment'},
                success: function (result) {
                 const results=JSON.parse(result)
                console.log(results)
                  if(results.status=='success'){
                    alert('The payment has been proccessed');
                    window.location.replace("https://r1.ngazelabs.com/success");
                  }else{
                    alert('The payment failed');
                   window.location.replace("https://r1.ngazelabs.com/buy/"+<?php echo $orderId ?>+"");

                }
                  }
            });


      }else{

      }
    }
  });
});
//4242 4242 4242 4242

</script>

</body>
</html>