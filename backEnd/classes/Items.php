<?php

class Items  {

    function __construct($con,$app_path) {
        $this->conn = $con;
        $this->app_path = $app_path;
    }

    public function getAllItems(){
         $select = mysqli_query($this->conn,"SELECT * FROM `item` ORDER BY `id` DESC  ");
         return mysqli_fetch_all($select,MYSQLI_ASSOC);
    }
    public function insertItems($data,$image){
      
      if($data['id']==''){
        $insertItem = mysqli_query($this->conn,"INSERT INTO `item` (`userId`, `vendorId`, `title`, `image`, `slug`, `summary`, `type`, `cooking`, `sku`, `price`, `quantity`, `unit`, `recipe`, `instructions`, `createdAt`, `updatedAt`, `content`) VALUES (".$data['userId'].", ".$data['vendorId'].", '".$data['title']."', '".$image."', '".$data['slug']."', '".$data['summary']."', '".$data['type']."', ".$data['cooking'].", '".$data['sku']."', ".$data['price'].", ".$data['quantity'].", ".$data['unit'].", '".$data['recipe']."', '".$data['instructions']."','".$data['datetime']."', NULL, '".$data['content']."')") or die(mysqli_error());
    }else{
       
        $insertItem=mysqli_query($this->conn,"UPDATE `item` SET `userId` = '".$data['userId']."', `vendorId` = '".$data['vendorId']."', `title` = '".$data['title']."', `image` = '".$image."', `slug` = '".$data['slug']."', `summary` = '".$data['summary']."', `type` = '".$data['type']."', `cooking` = '".$data['cooking']."', `sku` = '".$data['sku']."', `price` = '".$data['price']."', `quantity` ='".$data['quantity']."', `unit` = '".$data['unit']."', `recipe` = '".$data['recipe']."', `instructions` = '".$data['instructions']."', `updatedAt` = '".$data['dateTime']."', `content` = '".$data['content']."' WHERE `item`.`id` = '".$data['id']."'") or die(mysqli_error());
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