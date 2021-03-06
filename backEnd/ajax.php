<?php
header('Access-Control-Allow-Origin: *');
error_reporting(0);
session_start();
require_once 'dbconfig.php';

include 'classes/Apps.php';
include 'classes/Users.php';
include 'classes/Items.php';
include 'classes/Restaurant.php';


$obj_Apps = new Apps($con);

$settings = $obj_Apps->getSettings();

$APP_PATH = $obj_Apps->getAppPath();
$obj_Users = new Users($con,$APP_PATH);
$obj_Items = new Items($con,$APP_PATH);
$obj_Resta = new Restaurant($con,$APP_PATH);



$userListCount = 10;


if(@$_REQUEST['request'] == "loginUser")
{

    $userData = $obj_Users->login($_REQUEST["signinUsername"],$_REQUEST["signinPassword"]);
    if($userData > 0){
        $status = "success";
    }else{
        $status = "failed";
    }
    $response = [
      "status" => $status,
       "data" =>  $userData
    ];

   echo json_encode($response);

}

if(@$_REQUEST['request'] == "insertUserFromApp")
{


    $userData = $obj_Users->insertUserFromApp($_REQUEST);

    if($userData){
        $status = "success";
    }else{
        $status = "failed";
    }
    $response = [
      "status" => $status,
    ];

   echo json_encode($response);

}
if(@$_REQUEST['request'] == "getAllItems")
{

    $itemData = $obj_Items->getAllItems($_REQUEST);
  $status = "failed";
  if($itemData){
    $status = "success";
  }
  $response = [
    "status" => $status,
    "data" => $itemData
  ];
   echo json_encode($response);
}
if(@$_REQUEST['request'] == "getAllResItems")
{

    $itemData = $obj_Items->getAllResItems($_REQUEST);
  $status = "failed";
  if($itemData){
    $status = "success";
  }
  $response = [
    "status" => $status,
    "data" => $itemData
  ];
   echo json_encode($response);
}
if(@$_REQUEST['request'] == "insertItems")
{
    
    if(@$_FILES['item_image']['name'] != ''){
        $image=$_FILES['item_image']['name'];
    }else{
        $image=$_REQUEST['image'];
    }
   
    $userData = $obj_Items->insertItems($_REQUEST,$image);
    if($userData){
     $status = "success";
      if(@$_FILES['item_image']['name'] != ''){
     move_uploaded_file($_FILES['item_image']['tmp_name'],"./uploads/".$image);
        }
    
    }else{
        $status = "failed";
    }
    $response = [
      "status" => $status,
    ];

 echo json_encode($response);

}
if(@$_REQUEST['request'] == "insertRestaurant")
{
    
   
    $ResData = $obj_Resta->insertRestaurant($_REQUEST);
    if($ResData){
     $status = "success";    
    }else{
        $status = "failed";
    }
    $response = [
      "status" => $status,
    ];

 echo json_encode($response);

}
if(@$_REQUEST['request'] == "getRes")
{

    $itemData = $obj_Resta->getRes($_REQUEST);
  $status = "failed";
  if($itemData){
    $status = "success";
  }
  $response = [
    "status" => $status,
    "data" =>   $itemData
  ];
   echo json_encode($response);

}

if(@$_REQUEST['request'] == "getItem")
{

    $itemData = $obj_Items->getItem($_REQUEST);
  $status = "failed";
  if($itemData){
    $status = "success";
  }
  $response = [
    "status" => $status,
    "data" =>   $itemData
  ];
   echo json_encode($response);

}

if(@$_REQUEST['request'] == "getAllRes")
{

    $itemData = $obj_Resta->getAllRes($_REQUEST);
  $status = "failed";
  if($itemData){
    $status = "success";
  }
  $response = [
    "status" => $status,
    "data" =>   $itemData
  ];
   echo json_encode($response);

}

if(@$_REQUEST['request'] == "deleteItem")
{

    $itemData = $obj_Items->deleteItem($_REQUEST);
  $status = "failed";
  if($itemData){
    $status = "success";
  }
  $response = [
    "status" => $status,
    "data" =>   $itemData
  ];
   echo json_encode($response);

}
if(@$_REQUEST['request'] == "deleteRest")
{

    $itemData = $obj_Resta->deleteItem($_REQUEST);
  $status = "failed";
  if($itemData){
    $status = "success";
  }
  $response = [
    "status" => $status,
    "data" =>   $itemData
  ];
   echo json_encode($response);

}

if(@$_REQUEST['request'] == "insertAddressFromApp")
{


    $userData = $obj_Items->insertAddress($_REQUEST);

    if($userData){
        $status = "success";
    }else{
        $status = "failed";
    }
    $response = [
      "status" => $status,
      "data"=>   $userData
    ];

   echo json_encode($response);

}

if(@$_REQUEST['request'] == "insertOrdersFromApp")
{
// print_r($_REQUEST['orderjson']);

    $userData = $obj_Items->insertOrders($_REQUEST);

    if($userData){
        $status = "success";
    }else{
        $status = "failed";
    }
    $response = [
      "status" => $status,
      "data"=>   $userData,
      "_REQUEST"=>$_REQUEST['orderjson']
    ];

   echo json_encode($response);

}

if(@$_REQUEST['request'] == "getOrders")
{
// print_r($_REQUEST['orderjson']);

    $userData = $obj_Items->getOrders($_REQUEST);

    if($userData){
        $status = "success";
    }else{
        $status = "failed";
    }
    $response = [
      "status" => $status,
      "data" =>   $userData
    ];

   echo json_encode($response);

}
if(@$_REQUEST['request'] == "getAddressFromApp")
{
// print_r($_REQUEST['orderjson']);

    $userData = $obj_Items->getAddressFromApp($_REQUEST);

    if($userData){
        $status = "success";
    }else{
        $status = "failed";
    }
    $response = [
      "status" => $status,
      "data" =>   $userData
    ];

   echo json_encode($response);

}

if(@$_REQUEST['request'] == "getOrdersDetail")
{
// print_r($_REQUEST['orderjson']);

    $userData = $obj_Items->getOrdersDetail($_REQUEST);

    if($userData){
        $status = "success";
    }else{
        $status = "failed";
    }
    $response = [
      "status" => $status,
      "data" =>   $userData
    ];

   echo json_encode($response);

}

if(@$_REQUEST['request'] == "addtoFav")
{
// print_r($_REQUEST['orderjson']);

    $userData = $obj_Items->insertfavItem($_REQUEST);

    if($userData){
        $status = "success";
    }else{
        $status = "failed";
    }
    $response = [
      "status" => $status,
      "_REQUEST"=>$_REQUEST['orderjson']
    ];

   echo json_encode($response);

}

if(@$_REQUEST['request'] == "getMaxOrderItem")
{


    $userData = $obj_Items->getMaxOrderItem($_REQUEST);

    if($userData){
        $status = "success";
    }else{
        $status = "failed";
    }
    $response = [
      "status" => $status,
      "data" =>   $userData
    ];

   echo json_encode($response);

}

if(@$_REQUEST['request'] == "insertMaxOrder")
{


    $userData = $obj_Items->insertMaxOrder($_REQUEST);

    if($userData){
        $status = "success";
    }else{
        $status = "failed";
    }
    $response = [
      "status" => $status,
    ];

   echo json_encode($response);

}
if(@$_REQUEST['request'] == "insertCategory")
{


    $userData = $obj_Items->insertCategory($_REQUEST);

    if($userData){
        $status = "success";
    }else{
        $status = "failed";
    }
    $response = [
      "status" => $status,
    ];

   echo json_encode($response);

}
if(@$_REQUEST['request'] == "getAllCategory")
{

    $itemData = $obj_Items->getAllCategory($_REQUEST);
  $status = "failed";
  if($itemData){
    $status = "success";
  }
  $response = [
    "status" => $status,
    "data" =>   $itemData
  ];
   echo json_encode($response);

}
if(@$_REQUEST['request'] == "getCategory")
{

    $itemData = $obj_Items->getCategory($_REQUEST);
  $status = "failed";
  if($itemData){
    $status = "success";
  }
  $response = [
    "status" => $status,
    "data" =>   $itemData
  ];
   echo json_encode($response);

}

if(@$_REQUEST['request'] == "deleteCategory")
{

    $itemData = $obj_Items->deleteCategory($_REQUEST);
  $status = "failed";
  if($itemData){
    $status = "success";
  }
  $response = [
    "status" => $status,
    "data" =>   $itemData
  ];
   echo json_encode($response);

}


if(@$_REQUEST['request'] == "insertCampaignType")
{


    $userData = $obj_Items->insertCampaignType($_REQUEST);

    if($userData){
        $status = "success";
    }else{
        $status = "failed";
    }
    $response = [
      "status" => $status,
    ];

   echo json_encode($response);

}
if(@$_REQUEST['request'] == "getAllCampaignType")
{

    $itemData = $obj_Items->getAllCampaignType($_REQUEST);
  $status = "failed";
  if($itemData){
    $status = "success";
  }
  $response = [
    "status" => $status,
    "data" =>   $itemData
  ];
   echo json_encode($response);

}
if(@$_REQUEST['request'] == "getCampaignType")
{

    $itemData = $obj_Items->getCampaignType($_REQUEST);
  $status = "failed";
  if($itemData){
    $status = "success";
  }
  $response = [
    "status" => $status,
    "data" =>   $itemData
  ];
   echo json_encode($response);

}

if(@$_REQUEST['request'] == "deleteCampaignType")
{

    $itemData = $obj_Items->deleteCampaignType($_REQUEST);
  $status = "failed";
  if($itemData){
    $status = "success";
  }
  $response = [
    "status" => $status,
    "data" =>   $itemData
  ];
   echo json_encode($response);

}




if(@$_REQUEST['request'] == "insertCampaign")
{


    $userData = $obj_Items->insertCampaign($_REQUEST);

    if($userData){
        $status = "success";
    }else{
        $status = "failed";
    }
    $response = [
      "status" => $status,
    ];

   echo json_encode($response);

}
if(@$_REQUEST['request'] == "getAllCampaign")
{

    $itemData = $obj_Items->getAllCampaign($_REQUEST);
  $status = "failed";
  if($itemData){
    $status = "success";
  }
  $response = [
    "status" => $status,
    "data" =>   $itemData
  ];
   echo json_encode($response);

}
if(@$_REQUEST['request'] == "getCampaign")
{

    $itemData = $obj_Items->getCampaign($_REQUEST);
  $status = "failed";
  if($itemData){
    $status = "success";
  }
  $response = [
    "status" => $status,
    "data" =>   $itemData
  ];
   echo json_encode($response);

}

if(@$_REQUEST['request'] == "deleteCampaign")
{

    $itemData = $obj_Items->deleteCampaign($_REQUEST);
  $status = "failed";
  if($itemData){
    $status = "success";
  }
  $response = [
    "status" => $status,
    "data" =>   $itemData
  ];
   echo json_encode($response);

}

if(@$_REQUEST['request'] == "payment")
{

  $itemData = $obj_Items->payment($_REQUEST);
   $status = "failed";
  if($itemData){
    $status = "success";
  }
  $response = [
    "status" => $status,
    "data" =>   $_REQUEST
  ];
   echo json_encode($response);

}


?>