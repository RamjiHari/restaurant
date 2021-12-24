<?php

class Items  {

    function __construct($con,$app_path) {
        $this->conn = $con;
        $this->app_path = $app_path;
    }

    public function getAllItems(){
         $select = mysqli_query($this->conn,"SELECT * FROM `item` ORDER BY `id` DESC");
         return mysqli_fetch_all($select,MYSQLI_ASSOC);
    }
    public function insertItems($data,$image){
  
      if($data['id']==''){
        $insertItem = mysqli_query($this->conn,"INSERT INTO `item` (`userId`,  `title`, `image`, `summary`, `price`, `createdAt`, `updatedAt`) VALUES (".$data['userId'].", '".$data['title']."', '".$image."', '".$data['summary']."', ".$data['price'].",'".$data['datetime']."', NULL)") or die(mysqli_error());
    }else{
       
        $insertItem=mysqli_query($this->conn,"UPDATE `item` SET `userId` = '".$data['userId']."' , `title` = '".$data['title']."', `image` = '".$image."', `summary` = '".$data['summary']."',  `price` = '".$data['price']."', `updatedAt` = '".$data['dateTime']."' WHERE `item`.`id` = '".$data['id']."'") or die(mysqli_error());
    }

        if($insertItem){
            return true;
      }else{
            return false;
      }
       
    }
    public function getItem($data){
         $select = mysqli_query($this->conn,"SELECT * FROM `item` WHERE id='".$data['editId']."'");
         return mysqli_fetch_assoc($select);
    }

     public function deleteItem($data) {
        $select = mysqli_query($this->conn,"DELETE FROM `item` WHERE `id` = ".$data['id']."");
        $getItem = mysqli_query($this->conn,"SELECT * FROM `item` ORDER BY `id` DESC  ");
        return mysqli_fetch_all($getItem,MYSQLI_ASSOC);
    }
}
    ?>