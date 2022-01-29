<?php

class Items  {

    function __construct($con,$app_path) {
        $this->conn = $con;
        $this->app_path = $app_path;
    }

    public function getAllItems($data){
       $selectId = mysqli_query($this->conn,"select * from `users` where (`slug` ='".$data['id']."' or `email` ='".$data['id']."'  or `username` = '".$data['id']."' )") ;
         $row_user= mysqli_fetch_assoc($selectId);
        if( $row_user!=''){

         $select = mysqli_query($this->conn,"SELECT * FROM `item` where userId='".$row_user['id']."'  ORDER BY `id` DESC");
         return mysqli_fetch_all($select,MYSQLI_ASSOC);
       }
    }

     public function getAllResItems($data){

         $select = mysqli_query($this->conn,"SELECT * FROM `item` ORDER BY `id` DESC");
         return mysqli_fetch_all($select,MYSQLI_ASSOC);

    }

    public function insertItems($data,$image){

      if($data['id']==''){
        $insertItem = mysqli_query($this->conn,"INSERT INTO `item` (`userId`,  `title`,`category`, `image`, `summary`, `price`,`max_qty`, `createdAt`, `updatedAt`) VALUES (".$data['userId'].", '".$data['title']."',".$data['category'].", '".$image."', '".$data['summary']."', ".$data['price'].",".$data['qty'].",'".$data['datetime']."', NULL)") or die(mysqli_error());
    }else{

        $insertItem=mysqli_query($this->conn,"UPDATE `item` SET `userId` = '".$data['userId']."' , `title` = '".$data['title']."', `category` = ".$data['category'].", `image` = '".$image."', `summary` = '".$data['summary']."', `max_qty` = '".$data['qty']."',  `price` = '".$data['price']."', `updatedAt` = '".$data['dateTime']."' WHERE `item`.`id` = '".$data['id']."'") or die(mysqli_error());
    }

        if($insertItem){
            return true;
      }else{
            return false;
      }

    }

    public function getItem($data){

      $rows='';
      $selectCamp=mysqli_query($this->conn,"select * from campaign where json_contains(items,'\"{$data['editId']}\"') order by id ASC LIMIT 1");
      $row = mysqli_fetch_assoc($selectCamp);

      $select_type = mysqli_query($this->conn,"SELECT * FROM `campaign_type` WHERE id='".$row['type']."'");
       $r_type = mysqli_fetch_assoc($select_type) ;
       $select = mysqli_query($this->conn,"SELECT * FROM `item` WHERE id='".$data['editId']."'");
       $r = mysqli_fetch_assoc($select) ;
       $r['amount']=$r['price'];
       if($row['percentage']!=NULL){
        $r['price']=$r['price']-($r['price']*$row['percentage'])/100;
       }else{
        $r['price']=$r['price'];
       }
        $r['camp_name']=$r_type['camp_name'];
        $r['percentage']= $row['percentage'];
        $rows = $r;
      return $rows;
    }

     public function deleteItem($data) {
         $select = mysqli_query($this->conn,"DELETE FROM `item` WHERE `id` = ".$data['id']."");

        $getItem = mysqli_query($this->conn,"SELECT * FROM `item` WHERE userId='".$data['editId']."' ORDER BY `id` DESC  ");
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

    $last_id = mysqli_insert_id($this->conn);
        if($inserAdd){
            return $last_id;
      }else{
            return false;
      }


    }

     public function insertfavItem($data){
      $json_enc=json_encode($data['favItems']);
 $select = mysqli_query($this->conn,"SELECT * from `favItems` WHERE `userId` = ".$data['userId']."");
 if(mysqli_num_rows($select)== 0){
        $inserAdd = mysqli_query($this->conn,"INSERT INTO `favItems` ( `userId`, `favJson`) VALUES (".$data['userId'].",".$json_enc.")") or die(mysqli_error());

   }else{
    $inserAdd = mysqli_query($this->conn," UPDATE `favItems` SET `favJson` = ".$json_enc." WHERE `favItems`.`userId` = ".$data['userId']."") or die(mysqli_error());

   }
        if($inserAdd){
            return true;
      }else{
            return false;
      }


    }

    public function getOrders($data){

         $select = mysqli_query($this->conn,"SELECT ord.id , ord.tranx_id,  ord.createdOn ,ord.totQua ,ord.totAmt ,ord.status ,addr.fullName ,addr.homeNo ,addr.city ,addr.country  FROM `orders` AS ord LEFT JOIN `address` as addr ON ord.addID=addr.id  WHERE ord.userId='".$data['userId']."' AND  ord.status!='0'");
         return mysqli_fetch_all($select,MYSQLI_ASSOC);



    }

     public function getOrdersDetail($data){

         $select = mysqli_query($this->conn,"SELECT * FROM `orders` WHERE userId='".$data['userId']."' and status!='0' and id='".$data['orderId']."'");

         $rows=[];
         if(mysqli_num_rows($select) > 0){
          while ($row = mysqli_fetch_assoc($select)) {


                 $data=json_decode($row['orderjson']);
                 foreach ($data as $key => $value) {
                  $fetch="SELECT * FROM `item` where id =$value->id";
                  $result=mysqli_query($this->conn,$fetch);
                  while($r = mysqli_fetch_assoc($result)) {
                    $r['final_amount']= $row['totAmt'];
                    $r['final_qua']= $row['totQua'];
                    $r['orderId']= $row['id'];
                    $r['amount']= $value->price;
                    $r['status']= $row['status'];
                    $r['createdOn']= $row['createdOn'];
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


    public function getMaxOrderItem($data){
         $select = mysqli_query($this->conn,"SELECT * FROM `max_order` WHERE userId='".$data['userId']."'");
         return mysqli_fetch_assoc($select);
    }


     public function insertMaxOrder($data){

 $select = mysqli_query($this->conn,"SELECT * from `max_order` ");
 if(mysqli_num_rows($select)== 0){
        $inserAdd = mysqli_query($this->conn,"INSERT INTO `max_order` ( `userId`, `maxOrder`) VALUES (".$data['userId'].",".$data['maxOrder'].")") or die(mysqli_error());

   }else{
    $inserAdd = mysqli_query($this->conn,"UPDATE `max_order` SET `maxOrder` = ".$data['maxOrder']." , userId=".$data['userId']."
      WHERE `max_order`.`userId` = ".$data['userId']."") or die(mysqli_error());

   }
        if($inserAdd){
            return true;
      }else{
            return false;
      }


    }


      public function insertCategory($data){

      if($data['id']==''){
        $insertItem = mysqli_query($this->conn,"INSERT INTO `category` (`catg_name`) VALUES ('".$data['catg_name']."')") or die(mysqli_error());
    }else{

        $insertItem=mysqli_query($this->conn,"UPDATE `category` SET `catg_name` = '".$data['catg_name']."'  WHERE `category`.`id` = '".$data['id']."'") or die(mysqli_error());
    }

        if($insertItem){
            return true;
      }else{
            return false;
      }

    }

        public function getAllCategory($data){

         $select = mysqli_query($this->conn,"SELECT * FROM `category`");
         return mysqli_fetch_all($select,MYSQLI_ASSOC);
    }
      public function getCategory($data){

         $select = mysqli_query($this->conn,"SELECT * FROM `category`  where id='".$data['editId']."'");
         return mysqli_fetch_assoc($select);
    }
       public function deleteCategory($data) {
         $select = mysqli_query($this->conn,"DELETE FROM `category` WHERE `id` = ".$data['id']."");

        $getItem = mysqli_query($this->conn,"SELECT * FROM `category` ORDER BY `id` DESC  ");
        return mysqli_fetch_all($getItem,MYSQLI_ASSOC);
    }

     public function insertCampaignType($data){

      if($data['id']==''){
        $insertItem = mysqli_query($this->conn,"INSERT INTO `campaign_type` (`camp_name`) VALUES ('".$data['camp_name']."')") or die(mysqli_error());
    }else{

        $insertItem=mysqli_query($this->conn,"UPDATE `campaign_type` SET `camp_name` = '".$data['camp_name']."'  WHERE `campaign_type`.`id` = '".$data['id']."'") or die(mysqli_error());
    }

        if($insertItem){
            return true;
      }else{
            return false;
      }

    }

        public function getAllCampaignType($data){

         $select = mysqli_query($this->conn,"SELECT * FROM `campaign_type`");
         return mysqli_fetch_all($select,MYSQLI_ASSOC);
    }
      public function getCampaignType($data){

         $select = mysqli_query($this->conn,"SELECT * FROM `campaign_type`  where id='".$data['editId']."'");
         return mysqli_fetch_assoc($select);
    }
       public function deleteCampaignType($data) {
         $select = mysqli_query($this->conn,"DELETE FROM `campaign_type` WHERE `id` = ".$data['id']."");

        $getItem = mysqli_query($this->conn,"SELECT * FROM `campaign_type` ORDER BY `id` DESC  ");
        return mysqli_fetch_all($getItem,MYSQLI_ASSOC);
    }


 public function insertCampaign($data){
   $json_enc=json_encode($data['items']);
      if($data['id']==''){
        $insertItem = mysqli_query($this->conn,"INSERT INTO `campaign` (`type`,`items`,`percentage`,`start_date`,`end_date`,`admin`)
          VALUES ('".$data['type']."',".$json_enc.",'".$data['percentage']."','".$data['start_date']."','".$data['end_date']."','".$data['admin']."')") or die(mysqli_error());
    }else{

        $insertItem=mysqli_query($this->conn,"UPDATE `campaign` SET `type` = '".$data['type']."' ,`items` = ".$json_enc.",`percentage` = '".$data['percentage']."' , `start_date` = '".$data['start_date']."' ,`end_date` = '".$data['end_date']."' ,`admin` = '".$data['admin']."'  WHERE `campaign`.`id` = '".$data['id']."'") or die(mysqli_error());
    }

        if($insertItem){
            return true;
      }else{
            return false;
      }

    }

        public function getAllCampaign($data){

         $select = mysqli_query($this->conn,"SELECT ca.id,ca.type,ca.percentage,ca.start_date,ca.end_date,ct.camp_name FROM `campaign` as ca left join `campaign_type` as ct on  ca.type=ct.id where  ca.admin='".$data['id']."'");
         return mysqli_fetch_all($select,MYSQLI_ASSOC);
    }
      public function getCampaign($data){

         $select = mysqli_query($this->conn,"SELECT * FROM `campaign`  where id='".$data['editId']."'");
         return mysqli_fetch_assoc($select);
    }
       public function deleteCampaign($data) {
         $select = mysqli_query($this->conn,"DELETE FROM `campaign` WHERE `id` = ".$data['id']."");

        $getItem = mysqli_query($this->conn,"SELECT ca.id,ca.type,ca.percentage,ca.start_date,ca.end_date,ct.camp_name FROM `campaign` as ca left join `campaign_type` as ct on  ca.type=ct.id where  ca.admin='".$data['id']."'");
        return mysqli_fetch_all($getItem,MYSQLI_ASSOC);
    }
        public function payment($data){
        $inserAdd = mysqli_query($this->conn,"UPDATE `orders` SET `status` = '1', `tranx_id` = '".$data['id']."' WHERE `orders`.`id` = '".$data['orderId']."'") or die(mysqli_error());

        if($inserAdd){
            return true;
      }else{
            return false;
      }


    }


  }
    ?>