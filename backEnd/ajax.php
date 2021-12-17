<?php
header('Access-Control-Allow-Origin: *');
error_reporting(0);
session_start();
require_once 'dbconfig.php';

include 'classes/Apps.php';
include 'classes/Users.php';



$obj_Apps = new Apps($con);

$settings = $obj_Apps->getSettings();

$APP_PATH = $obj_Apps->getAppPath();
$obj_Users = new Users($con,$APP_PATH);


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
    $folderName = false;
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
?>