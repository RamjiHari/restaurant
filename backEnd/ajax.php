<?php
header('Access-Control-Allow-Origin: *');
error_reporting(0);
session_start();
require_once 'dbconfig.php';

include 'classes/Apps.php';
include 'classes/Users.php';
include 'classes/Items.php';



$obj_Apps = new Apps($con);

$settings = $obj_Apps->getSettings();

$APP_PATH = $obj_Apps->getAppPath();
$obj_Users = new Users($con,$APP_PATH);
$obj_Items = new Items($con,$APP_PATH);


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
?>