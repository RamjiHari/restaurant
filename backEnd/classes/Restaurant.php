<?php

class Restaurant  {

    function __construct($con,$app_path) {
        $this->conn = $con;
        $this->app_path = $app_path;
    }

    public function getAllRes(){

         $select = mysqli_query($this->conn,"SELECT * FROM `restaurant` as res LEFT JOIN `users` as us ON res.resId=us.id");
         return mysqli_fetch_all($select,MYSQLI_ASSOC);
    }
    public function insertRestaurant($data){

      if($data['id']==''){
        $insertAppUser  = mysqli_query($this->conn,"INSERT INTO `users` (`username`,`password`,`email`,`privilege`) values('".$data['name']."','".$data['password']."','".$data['email']."','4')") or die(mysqli_error());
        $last_id = mysqli_insert_id($this->conn);
        if($last_id!=''){
        $insertItem = mysqli_query($this->conn,"INSERT INTO `restaurant` (`userId`,  `resId`,`createdOn`, `updatedOn`) VALUES (".$data['userId'].", '".$last_id."','".$data['dateTime']."', NULL)") or die(mysqli_error());
      }
    }else{
  
       $insertItem=mysqli_query($this->conn,"UPDATE `users` SET `username` = '".$data['name']."' ,`email` ='".$data['email']."',  `password` = '".$data['password']."' WHERE `users`.`id` = '".$data['id']."'") or die(mysqli_error());
    }

        if($insertItem){
            return true;
      }else{
            return false;
      }
       
    }
    public function getRes($data){

         $select = mysqli_query($this->conn,"SELECT * FROM `restaurant` as res LEFT JOIN `users` as us ON res.resId=us.id where res.resId='".$data['editId']."'");
         return mysqli_fetch_assoc($select);
    }

     public function deleteItem($data) {
        $selectuser = mysqli_query($this->conn,"DELETE FROM `users` WHERE `id` = ".$data['id']."");
        $selectRes = mysqli_query($this->conn,"DELETE FROM `restaurant` WHERE `resId` = ".$data['id']."");
        if( $selectuser &&  $selectRes){
        $getItem = mysqli_query($this->conn,"SELECT * FROM `restaurant` as res LEFT JOIN `users` as us ON res.resId=us.id");
      }
        return mysqli_fetch_all($getItem,MYSQLI_ASSOC);
    }


       
}

    ?>