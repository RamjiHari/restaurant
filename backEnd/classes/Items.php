<?php

class Items  {

    function __construct($con,$app_path) {
        $this->conn = $con;
        $this->app_path = $app_path;
    }

    public function getAllItems($data){

       $selectId = mysqli_query($this->conn,"select * from `users` where (`email` ='".$data['id']."'  or `username` = '".$data['id']."' )") ;
         $row_user= mysqli_fetch_assoc($selectId);
        if( $row_user!=''){
         
         $select = mysqli_query($this->conn,"SELECT * FROM `item` where userId='".$row_user['id']."'  ORDER BY `id` DESC");
         return mysqli_fetch_all($select,MYSQLI_ASSOC);
       }
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


        public function insertAddress($data){
  

        $inserAdd = mysqli_query($this->conn,"INSERT INTO `address` (`userId`, `country`, `fullName`, `email`, `pincode`, `homeNo`, `street`, `landmark`, `city`, `mobNo`, `state`) VALUES (".$data['userId'].", '".$data['country']."', '".$data['fullName']."', '".$data['email']."', '".$data['pincode']."', '".$data['homeNo']."', '".$data['street']."', '".$data['landmark']."', '".$data['city']."','".$data['mobNo']."', '".$data['state']."')") or die(mysqli_error());
     $last_id = mysqli_insert_id($this->conn);
        if($inserAdd){
            return $last_id;
      }else{
            return false;
      }
       
    }
    public function insertOrders($data){
  $json_enc=json_encode($data['orderjson']);

        $inserAdd = mysqli_query($this->conn,"INSERT INTO `orders` ( `userId`, `addId`, `orderjson`, `totAmt`, `totQua`, `payMode`, `status`) VALUES (".$data['userId'].", ".$data['addId'].", ".$json_enc.", ".$data['totAmt'].", ".$data['totQua'].", '".$data['payMode']."', 0)") or die(mysqli_error());

   
        if($inserAdd){
            return true;
      }else{
            return false;
      }
       

    }

    public function getOrdersFromApp($data){

         $select = mysqli_query($this->conn,"SELECT * FROM `orders` WHERE userId='".$data['userId']."' and status='0'");
         $rows=[];
         if(mysqli_num_rows($select) > 0){
          while ($row = mysqli_fetch_assoc($select)) {
              
           
                 $data=json_decode($row['orderjson']);
                 foreach ($data as $key => $value) {
                  $fetch="SELECT * FROM `item` where id =$value->id";
                  $result=mysqli_query($this->conn,$fetch);
                  while($r = mysqli_fetch_assoc($result)) {
                    $r['cartQuantity']= $value->cartQuantity;
                  $rows[] = $r;
                }
                 }
               
              
          }
           return $rows;
         }else{
          return $rows;
         }
        
    }
        public function getAddressFromApp($data){
         $select = mysqli_query($this->conn,"SELECT * FROM `address` WHERE userId='".$data['id']."'");
         return mysqli_fetch_all($select,MYSQLI_ASSOC);
    }
}

    ?>