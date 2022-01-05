<?php

class Users  {

    function __construct($con,$app_path) {
        $this->conn = $con;
        $this->app_path = $app_path;
    }

 public function login($uname,$password){
        $select = mysqli_query($this->conn,"select * from `users` where (`email` = '$uname' or `username` = '$uname' ) and `password` = '$password' and `active` = 1 ") ;
        $rows=[];
        if(mysqli_num_rows($select) > 0){
            $row_user = mysqli_fetch_assoc($select);
            $fav_items_select = mysqli_query($this->conn,"select * from `favItems` where `userId` = '".$row_user['id']."' ");
            $fav_items= mysqli_fetch_assoc($fav_items_select);
            $data=json_decode($fav_items['favJson']);
            $rows['favItem']= $data;
            $rows['row_user']= $row_user;
            return $rows;
        }else{
            return false;
        }
    }

    public function forgotPassword($value){

        $email = $value['email'];
        $datetime = $value['datetime'];
        $select = mysqli_query($this->conn,"select * from `users` where `email` = '$email' and `active` = 1 ") ;
        if(mysqli_num_rows($select) > 0){
          $CODE = md5(rand());
          $insertCode  = mysqli_query($this->conn," INSERT INTO `reset_password` (`email`,`code`,`time`) VALUES ('$email','$CODE','$datetime') ") or die(mysqli_error());
          if($insertCode){
            $type_based_elements_to =
            'To reset password, <a href="'.$this->app_path.'/reset.php?code='.$CODE.'" target="_blank">Click here</a>
            <br/><br/><br/>
            <a href="'.$this->app_path.'" target="_blank">https://AllSKills.in</a>
            ';
            $subject_to = "Allskills | Reset Allskills app password";
            $row_user = mysqli_fetch_assoc($select);

            $response_to= [
              "email" => $email,
              "email_user_name" => $row_user['first_name'],
              "subject"=>$subject_to,
              "body"=>$type_based_elements_to
            ];

            $obj_Email = new Email($this->conn,$this->app_path);
            $obj_Email->send($response_to);
            return true;
          }else{
            return false;
          }
        }else{
            return false;
        }
    }

    public function resetPassword($value){
      $code = $value['code'];
      $password = md5($value['new_password']);
        $select = mysqli_query($this->conn,"select * from `reset_password` where `code` = '$code' ") ;
        if(mysqli_num_rows($select) > 0){
          $row = mysqli_fetch_assoc($select);
          $email = $row['email'];
          mysqli_query($this->conn,"UPDATE `users` SET `password` = '".$password."' WHERE `email`='$email' ");
          mysqli_query($this->conn,"delete from `reset_password` where `email` = '$email' ") ;
          return true;
        }else{
            return false;
        }
    }

    public function checkSocialUser($social_id){
        $select = mysqli_query($this->conn,"select * from `users` where `social_id` = '$social_id' and `active` = 1 ") ;
        if(mysqli_num_rows($select) > 0){
            $row_user = mysqli_fetch_assoc($select);
            return $row_user;
        }else{
            return false;
        }
    }

    public function getUsersByRole($role_name){
      $select = mysqli_query($this->conn,"select * from `users` where `role` IN (SELECT `id` FROM `roles` WHERE `role`='$role_name') ") ;
      return $select;
    }
    public function getUsersByRoleWithLimit($role_name,$startFrom, $showRecordPerPage){
      $select = mysqli_query($this->conn,"select * from `users` where `role` IN (SELECT `id` FROM `roles` WHERE `role`='$role_name') ORDER BY `id` DESC  LIMIT $startFrom, $showRecordPerPage") ;
      return $select;
    }

    public function adminUsers($admin_id){
      $select = mysqli_query($this->conn,"select * from `users` where `id` IN (SELECT `user_id` FROM `users_profile` WHERE `created_by`='$admin_id') ") ;
      return $select;
    }

    public function adminUsersWithLimit($admin_id,$startFrom, $showRecordPerPage){
      $select = mysqli_query($this->conn,"select * from `users` where `id` IN (SELECT `user_id` FROM `users_profile` WHERE `created_by`='$admin_id') LIMIT $startFrom, $showRecordPerPage") ;
      return $select;
    }

    public function getUserDetails($userId){
      $select = mysqli_query($this->conn,"select * from `users` where `id` = '$userId' ") ;
      return mysqli_fetch_assoc($select);
    }

    public function getUserDetailsByUsername($username){
      $select = mysqli_query($this->conn,"select * from `users` where `username` = '$username' ") ;
      return mysqli_fetch_assoc($select);
    }

    public function checkUserPassword($pass,$user_id) {
      $select = mysqli_query($this->conn,"select * from `users` where `id` = '".$user_id."' AND `password`='$pass' ");
      return mysqli_num_rows($select);
    }

    public function getPageAdminUsers() {
      $select = mysqli_query($this->conn,"select * from `users` ");
      return $select;
    }

    public function loadUsersListWithElementsExceptUserId($userId,$start,$count) {
      $getAllUsersList = mysqli_num_rows(mysqli_query($this->conn,"select * from `users` where `id` != '$userId' "));
      $getUsers = mysqli_query($this->conn,"select * from `users` where `id` != '$userId' LIMIT $start,$count ");
      $data = [];
      $obj_Apps = new Apps($this->conn);
      $user_type = $obj_Apps->getRolesTypes();
      while($rowUsers = mysqli_fetch_assoc($getUsers)){
        $checkUserFollow = $this->checkUserFollow($userId,$rowUsers['id']);
        $image_path = $obj_Apps->getUserImage($rowUsers);
        $userFullName = $rowUsers['first_name']." ".$rowUsers['last_name'];
        if($checkUserFollow>0){
          $followBtn = '<a onclick="userFollowUnfollowBtnAction(this,'.$rowUsers['id'].')" class="btn btn-success mr-2 cursor-pointer btn-md">Following</a>';
        }else{
          $followBtn = '<a onclick="userFollowUnfollowBtnAction(this,'.$rowUsers['id'].')" class="btn btn-outline-success mr-2 cursor-pointer btn-md doUserFollowBtn">Follow</a>';
        }
        //$array["info"] = ["follow"=>$checkUserFollow,"follower"=>$checkUserFollowers];
        $userName = '';
        if (filter_var($rowUsers['username'], FILTER_VALIDATE_EMAIL)) {
          $userName = "AllSkills Member";
        }else if($rowUsers['username'] != ''){
          $userName = "@".$rowUsers['username'];
        }
        $array["elements"] = '
        <tr>
          <td>
            <div class="media align-items-center">
                <div class="avatar avatar-sm mr-3">
                    <img src="'.$image_path.'" alt="'.$userFullName.'" class="avatar-img rounded-circle">
                </div>
                <div class="media-body">
                    <a href="'.$this->app_path.'/profile/'.$rowUsers['id'].'"><strong class="user-list-name">'.$userFullName.'</strong></a><br>
                    <a class="text-muted js-lists-values-employee-title" href="'.$this->app_path.'/profile/'.$rowUsers['id'].'">'.$userName.'</a>
                </div>
            </div>
          </td>
          <td>'.$followBtn.'</td>
          <td><a href="'.$this->app_path.'/message/'.$rowUsers['id'].'" target="_blank" class="btn btn-primary mr-2 cursor-pointer btn-md">Message</a></td>
        </tr>
        ';
        $data[] = $array;
      }
      $data['count'] = $getAllUsersList;
      $data['limit'] = [$start,$count];
      return $data;
    }

    public function loadFollowingUsersListWithElements($userId,$start,$count) {
      $getAllUsersList = mysqli_num_rows(mysqli_query($this->conn,"select * from `users` where `id` IN(select `to_user_id` from `user_follow` where `from_user_id` = '$userId' order by `id` DESC) "));
      $getUsers = mysqli_query($this->conn,"select * from `users` where `id` IN(select `to_user_id` from `user_follow` where `from_user_id` = '$userId')  ORDER BY `id` ASC LIMIT $start,$count");
      $data = [];
      $obj_Apps = new Apps($this->conn);
      while($rowUsers = mysqli_fetch_assoc($getUsers)){
        $image_path = $obj_Apps->getUserImage($rowUsers);
        $userFullName = $rowUsers['first_name']." ".$rowUsers['last_name'];

          $followBtn = '<a onclick="userFollowUnfollowBtnAction(this,'.$rowUsers['id'].')" class="btn btn-success mr-2 cursor-pointer btn-md">Following</a>';
          $userName = '';
          if (filter_var($rowUsers['username'], FILTER_VALIDATE_EMAIL)) {
            $userName = "AllSkills Member";
          }else if($rowUsers['username'] != ''){
            $userName = "@".$rowUsers['username'];
          }
        $array["elements"] = '
        <tr>
          <td>
            <div class="media align-items-center">
                <div class="avatar avatar-sm mr-3">
                    <img src="'.$image_path.'" alt="'.$userFullName.'" class="avatar-img rounded-circle">
                </div>
                <div class="media-body">
                    <a href="'.$this->app_path.'/profile/'.$rowUsers['id'].'"><strong class="user-list-name">'.$userFullName.'</strong></a><br>
                    <a href="'.$this->app_path.'/profile/'.$rowUsers['id'].'" class="text-muted js-lists-values-employee-title">'.$userName.'</a>
                </div>
            </div>
          </td>
          <td>'.$followBtn.'</td>
          <td><a href="'.$this->app_path.'/message/'.$rowUsers['id'].'" target="_blank" class="btn btn-primary mr-2 cursor-pointer btn-md">Message</a></td>
        </tr>
        ';
        $data[] = $array;
      }
      $data['count'] = $getAllUsersList;
      $data['limit'] = [$start,$count];
      return $data;
    }

    public function loadFollowerUsersListWithElements($userId,$start,$count) {
      $getAllUsersList = mysqli_num_rows(mysqli_query($this->conn,"select * from `users` where `id` IN(select `from_user_id` from `user_follow` where `to_user_id` = '$userId' order by `id` DESC) "));
      $getUsers = mysqli_query($this->conn,"select * from `users` where `id` IN(select `from_user_id` from `user_follow` where `to_user_id` = '$userId')  ORDER BY `id` ASC LIMIT $start,$count");
      $data = [];
      $obj_Apps = new Apps($this->conn);
      while($rowUsers = mysqli_fetch_assoc($getUsers)){
        $image_path = $obj_Apps->getUserImage($rowUsers);
        $userFullName = $rowUsers['first_name']." ".$rowUsers['last_name'];
        $checkUserFollow = $this->checkUserFollow($userId,$rowUsers['id']);
        if($checkUserFollow>0){
          $followBtn = '<a onclick=userFollowUnfollowBtnAction(this,'.$rowUsers['id'].') class="btn btn-success mr-2 cursor-pointer btn-md">Following</a>';
        }else{
          $followBtn = '<a onclick="userFollowUnfollowBtnAction(this,'.$rowUsers['id'].')" class="btn btn-outline-success mr-2 cursor-pointer btn-md doUserFollowBtn">Follow</a>';
        }
        $userName = '';
        if (filter_var($rowUsers['username'], FILTER_VALIDATE_EMAIL)) {
          $userName = "AllSkills Member";
        }else if($rowUsers['username'] != ''){
          $userName = "@".$rowUsers['username'];
        }
        $array["elements"] = '
        <tr>
          <td>
            <div class="media align-items-center">
                <div class="avatar avatar-sm mr-3">
                    <img src="'.$image_path.'" alt="'.$userFullName.'" class="avatar-img rounded-circle">
                </div>
                <div class="media-body">
                    <a href="'.$this->app_path.'/profile/'.$rowUsers['id'].'"><strong class="user-list-name">'.$userFullName.'</strong></a><br>
                    <a href="'.$this->app_path.'/profile/'.$rowUsers['id'].'" class="text-muted js-lists-values-employee-title">'.$userName.'</a>
                </div>
            </div>
          </td>
          <td>'.$followBtn.'</td>
          <td><a href="'.$this->app_path.'/message/'.$rowUsers['id'].'" target="_blank" class="btn btn-primary mr-2 cursor-pointer btn-md">Message</a></td>
        </tr>
        ';
        $data[] = $array;
      }
      $data['count'] = $getAllUsersList;
      $data['limit'] = [$start,$count];
      return $data;
    }

    public function getAllEmailUsers() {
      $select = mysqli_query($this->conn,"select * from `users` where `email` != '' ");
      return $select;
    }

    public function checkUserFollow($from_id,$to_id) {
      $select = mysqli_query($this->conn,"select * from `user_follow` where `from_user_id` = '$from_id' AND `to_user_id`='$to_id' ");
      return mysqli_num_rows($select);
    }

    public function updateUserPassword($password,$user_id) {
      $select = mysqli_query($this->conn,"UPDATE `users` SET `password` = '".$password."' WHERE `id`='$user_id' ");
      return $select;
    }

    public function updateUserAccount($value,$user_id) {
      $select = mysqli_query($this->conn,"UPDATE `users` SET `first_name` = '".$value[fname]."',`last_name` = '".$value[lname]."',`image` = '".$value[userProfileImage]."' WHERE `id`='$user_id' ");
      return $select;
    }

    public function updateUserInfo($value,$user_id) {
      $select = mysqli_query($this->conn,"UPDATE `users_profile` SET `location` = '".$value[address]."',`description` = '".$value[description]."',`phone` = '".$value[phone]."',`website` = '".$value[website]."',`bg_image` = '".$value[userBgImage]."' WHERE `user_id`='$user_id' ");
      return $select;
    }

    public function getUserProfileDetails($userId){
      $select = mysqli_query($this->conn,"select * from `users_profile` where `user_id` = '$userId' ") ;
      return mysqli_fetch_assoc($select);
    }

    public function checkUsernameExist($uname) {
        return mysqli_num_rows(mysqli_query($this->conn,"select * from users where username='$uname'"));
    }

    public function checkEmailExist($email) {
        return mysqli_num_rows(mysqli_query($this->conn,"select * from users where email='$email'"));
    }

    public function insertUserFromApp($data)
    {
       $select = mysqli_query($this->conn,"select * from `users` where (`email` = '".$data['signupUsername']."' or `username` = '".$data['signupUsername']."')") ;
        if(mysqli_num_rows($select) ==0){

      $insertAppUser  = mysqli_query($this->conn,"INSERT INTO `users` (`username`,`password`,`email`) values('".$data['signupUsername']."','".$data['signupPassword']."','".$data['signupEmail']."')") or die(mysqli_error());
      if($insertAppUser){
            return true;
      }else{
            return false;
      }
    }else{
     return false;
    }
    }

    public function insertAppUser($data)
    {

      $role = isset($data['role'])?$data['role']:2;
      $by = (isset($data['by'])?$data['by']:0);
        $insertAppUser  = mysqli_query($this->conn,"INSERT INTO `users` (`username`,`password`,`email`,`first_name`,`last_name`,`date`,`image`,`role`,`social`,`social_id`) values('".$data['signupUsername']."','".md5($data['signupPassword'])."','".$data['signupEmail']."','".$data['signupFirstName']."','".$data['signupLastName']."','".$data['datetime']."','default_profile.png','$role','','') ") or die(mysqli_error());
        $userId = mysqli_insert_id($this->conn);
        $select = mysqli_query($this->conn,"select * from `users` where `id` = $userId ") ;
        if(mysqli_num_rows($select) > 0){
            $location = isset($data['address'])?$data['address']:'';
            $phone = isset($data['phone'])?$data['phone']:'';
            $website = isset($data['website'])?$data['website']:'';
            $about = isset($data['about'])?$data['about']:'';
            mysqli_query($this->conn,"INSERT INTO `users_profile` (`user_id`, `location`, `description`, `phone`, `website`, `bg_image`, `created_by`) values('$userId','$location','$about','$phone','$website','default_bg.jpg','$by') ") or die(mysqli_error());
            $row_user = mysqli_fetch_assoc($select);

            $response_from= [
              "email" => $data['signupEmail'],
              "email_user_name" => $data['signupFirstName']." ".$data['signupLastName'],
              "subject"=>"Welcome to Onboard on Allskills",
              "body"=>"Dear ".$data['signupFirstName']." ".$data['signupLastName'].", Welcome to Allskills"
            ];

            $row_user['sendEmailObj'] = $response_from;
            return $row_user;
        }else{
            return false;
        }
    }

    public function insertSocialUser($data)
    {
        $insertAppUser  = mysqli_query($this->conn,"INSERT INTO `users` (`username`,`password`,`email`,`first_name`,`last_name`,`date`,`image`,`role`,`social`,`social_id`) values('".$data['email']."','".md5($data['social_id'])."','".$data['email']."','".$data['fname']."','".$data['lname']."','".$data['datetime']."','".$data['image']."',2,'".$data['social']."','".$data['social_id']."') ") or die(mysqli_error());
        $userId = mysqli_insert_id($this->conn);
        $select = mysqli_query($this->conn,"select * from `users` where `id` = '$userId' ") ;
        if(mysqli_num_rows($select) > 0){
            $insertAppUser  = mysqli_query($this->conn,"INSERT INTO `users_profile` (`user_id`,`bg_image`) values('$userId','default_bg.jpg') ") or die(mysqli_error());
            $row_user = mysqli_fetch_assoc($select);
            $response_from= [
              "email" => $data['email'],
              "email_user_name" => $data['fname']." ".$data['lname'],
              "subject"=>"Welcome to Onboard on Allskills",
              "body"=>"Dear ".$data['fname']." ".$data['fname'].", Welcome to Allskills"
            ];

            $row_user['sendEmailObj'] = $response_from;
            return $row_user;
        }else{
            return false;
        }
    }

    public function doFollowUnfollow($value){
      $obj_Apps = new Apps($this->conn);
      $checkUserFollow = $this->checkUserFollow($value['fromId'],$value['toId']);
      $data_1 = array("prim"=>$value['fromId'],"secon"=>$value['toId'],"terit"=>0,"type"=>2,"time"=>$value['time']);
      $data_2 = array("prim"=>$value['toId'],"secon"=>$value['fromId'],"terit"=>0,"type"=>3,"time"=>$value['time']);
      if($checkUserFollow>0){
        mysqli_query($this->conn,"DELETE FROM `user_follow` WHERE `from_user_id`= '".$value['fromId']."' AND `to_user_id` = '".$value['toId']."'");
        $obj_Apps->deleteNotification($data_1);
        $obj_Apps->deleteNotification($data_2);
        return ["action"=>"unfollowed"];
      }else{
        $insertUserFollow  = mysqli_query($this->conn," INSERT INTO `user_follow` (`from_user_id`,`to_user_id`,`time`) VALUES ('".$value['fromId']."','".$value['toId']."','".$value['time']."') ") or die(mysqli_error());
        $obj_Apps->insertNotification($data_1);
        $obj_Apps->insertNotification($data_2);


        $getUserDetails = $this->getUserDetails($value['fromId']);
        $getSecondaryUserDetails = $this->getUserDetails($value['toId']);

        $obj_Email = new Email($this->conn,$this->app_path);


          $type_based_elements_from =
          $getUserDetails['first_name'].' '.$getUserDetails['last_name'].'(You) are following '.$getSecondaryUserDetails['first_name'].' '.$getSecondaryUserDetails['last_name'];
          $subject_from = "Allskills | You started following";
          $email_from = $getUserDetails['email'];
          $email_user_name_from = $getUserDetails['first_name'];



          $type_based_elements_to =
          'Hello <br/><br/>'
          .$getSecondaryUserDetails['first_name'].' '.$getSecondaryUserDetails['last_name'] .' is following you on <a href="'.$this->app_path.'" target="_blank">AllSKills</a>
          <br/><br/>Connect '.$getSecondaryUserDetails['first_name'].' '.$getSecondaryUserDetails['last_name'] .' on AllSKills <a href="'.$this->app_path.'/profile/'.$getSecondaryUserDetails['id'].'" target="_blank">here</a>.
          <br/><br/><br/>
          <a href="'.$this->app_path.'" target="_blank">https://AllSKills.in</a>
          ';
          $subject_to = "Allskills | You have new follower";
          $email_to = $getSecondaryUserDetails['email'];
          $email_user_name_to = $getSecondaryUserDetails['first_name'];



        $response_to= [
          "email" => $email_to,
          "email_user_name" => $email_user_name_to,
          "subject"=>$subject_to,
          "body"=>$type_based_elements_to
        ];


        $response_from= [
          "email" => $email_from,
          "email_user_name" => $email_user_name_from,
          "subject"=>$subject_from,
          "body"=>$type_based_elements_from
        ];

        //$obj_Email->send($response_from);

        //$obj_Email->send($response_to);

        return ["action"=>"followed","sendEmail"=>[$response_to,$response_from]];
      }
    }


    public function getJobCandidates($job_id){
      $select = mysqli_query($this->conn,"SELECT * from `users` WHERE `id` IN(SELECT `user_id` FROM `job_apply` WHERE `job_id` = '$job_id' ORDER BY `id` DESC )");
      return $select;
    }

    public function getAppUsersForPushNotification(){
      $select = mysqli_query($this->conn,"SELECT * from `users` WHERE `id` IN(SELECT `user_id` FROM `users_push_token` ORDER BY `id` DESC )");
      return $select;
    }

    public function getAppUsersForPushNotificationWithLimit($startFrom, $showRecordPerPage){
      $select = mysqli_query($this->conn,"SELECT * from `users` WHERE `id` IN(SELECT `user_id` FROM `users_push_token` ORDER BY `id` DESC) LIMIT $startFrom, $showRecordPerPage");
      return $select;
    }

    public function getPushTokenDetails($user_id){
      $select = mysqli_query($this->conn,"SELECT * from `users_push_token` WHERE `user_id` = '$user_id' ");
      return mysqli_fetch_assoc($select);
    }

    public function getRangeEmail($from,$to){
        $select = mysqli_query($this->conn,"SELECT email FROM `users` WHERE `id` BETWEEN '$from' AND '$to'") ;

        if(mysqli_num_rows($select) > 0){
            return mysqli_fetch_all($select,MYSQLI_ASSOC);
        }else{
            return false;
        }
    }

}

?>
