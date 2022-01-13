<?php

class Restaurant  {

    function __construct($con,$app_path) {
        $this->conn = $con;
        $this->app_path = $app_path;
    }

    public function getAllRes($data){
      $userId=$data['userId'];
      $privilege=$data['privilege'];


$rows=[];
if($userId=='' && $privilege==''){
         $select = mysqli_query($this->conn,"SELECT * FROM `restaurant` as res LEFT JOIN `users` as us ON res.resId=us.id");
       }elseif($userId!='' && $privilege!='4'){
        $select = mysqli_query($this->conn,"SELECT * FROM `restaurant` as res LEFT JOIN `users` as us ON res.resId=us.id");
       }else{
        
         $select = mysqli_query($this->conn,"SELECT * FROM `restaurant` as res LEFT JOIN `users` as us ON res.resId=us.id where res.resId='".$userId."'");
       }
            $max_order_select = mysqli_query($this->conn,"SELECT * FROM `max_order`");
             if(mysqli_num_rows($max_order_select) > 0){
            $max_order = mysqli_fetch_assoc($max_order_select);
             $rows['max_order']= $max_order['maxOrder'];
                  }else{
         $rows['max_order']= 1;
                  }

        $rows['all_res'] =mysqli_fetch_all($select,MYSQLI_ASSOC);
        return $rows;
    }
    public function insertRestaurant($data){
      $slug= str_replace(' ', '', $data['name']);
      if($data['id']==''){
        $insertAppUser  = mysqli_query($this->conn,"INSERT INTO `users` (`username`,`slug`,`password`,`email`,`privilege`) values('".$data['name']."','".$slug."','".$data['password']."','".$data['email']."','4')") or die(mysqli_error());
        $last_id = mysqli_insert_id($this->conn);
        if($last_id!=''){
        $insertItem = mysqli_query($this->conn,"INSERT INTO `restaurant` (`userId`,  `resId`,`createdOn`, `updatedOn`) VALUES (".$data['userId'].", '".$last_id."','".$data['dateTime']."', NULL)") or die(mysqli_error());
      }
    }else{
  
       $insertItem=mysqli_query($this->conn,"UPDATE `users` SET `username` = '".$data['name']."' ,`slug` = '".$slug."' ,`email` ='".$data['email']."',  `password` = '".$data['password']."' WHERE `users`.`id` = '".$data['id']."'") or die(mysqli_error());
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