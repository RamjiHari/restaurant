<?php
class Apps  {

    function __construct($con) {
        $this->conn = $con;
    }
    public function insertNotification($data) {
      $prim = $data['prim'];
      $secon = $data['secon'];
      $terit = $data['terit'];
      $type = $data['type'];
      $time = $data['time'];
        $insert  = mysqli_query($this->conn,"INSERT INTO `notifications`(`primary_id`, `seconday_id`, `tertiary_id`, `type`, `time`) VALUES ($prim,$secon,$terit,$type,$time)") or die(mysqli_error());
        return $insert;
    }
    public function getRolesTypes(){
      $select_roles = $this->getRoles();
      $user_type = [];
      while($row_roles = mysqli_fetch_assoc($select_roles)){
        $user_type[$row_roles['id']] = array("ROLE"=>$row_roles['role'],"PAGES"=>$row_roles['pages'],"FOLDER"=>$row_roles['folder']);
      }
      return $user_type;
    }
    function isMobileDevice() {
      return preg_match("/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i", $_SERVER["HTTP_USER_AGENT"]);
    }
    public function deleteNotification($data) {
      $prim = $data['prim'];
      $secon = $data['secon'];
      $terit = $data['terit'];
      $type = $data['type'];
      $delete  = mysqli_query($this->conn,"DELETE FROM `notifications` WHERE `primary_id` = $prim AND `seconday_id` = $secon AND `tertiary_id` = $terit AND `type` = $type ") or die(mysqli_error());
      return $delete;
    }

    public function readUserNotification($user_id) {
      $update  = mysqli_query($this->conn,"UPDATE `notifications` SET `read_status` = 1 WHERE `primary_id` = $user_id ") or die(mysqli_error());
      return $update;
    }

    public function getUserProperImageURL($image) {
      $app_path = $this->getAppPath();
      if(filter_var($image, FILTER_VALIDATE_URL) == true){
        $userProfileImage = $image;
      }else if($image != ''){
        $userProfileImage = $app_path.'/uploads/user/'.$image;
      }else{
        $userProfileImage = $app_path.'/uploads/user/default_profile.png';
      }
      return $userProfileImage;
    }

    public function searchTables($searchText){

        $select_pages  = mysqli_query($this->conn,"SELECT * FROM `pages` WHERE `name` LIKE '%".$searchText."%' AND `verified` = '1'   ORDER BY `id` DESC ") or die(mysqli_error());

        $select_users  = mysqli_query($this->conn,"SELECT * FROM `users` WHERE (`username` LIKE '%".$searchText."%' OR `first_name` LIKE '%".$searchText."%' OR `last_name` LIKE '%".$searchText."%') ORDER BY `id` DESC ") or die(mysqli_error());

        $select_courses  = mysqli_query($this->conn,"SELECT * FROM `courses` WHERE `name` LIKE '%".$searchText."%' AND `verified` = '1'  ORDER BY `id` DESC ") or die(mysqli_error());
        $data = [];

        $pages = [];
        $users = [];
        $courses = [];

        while($row_pages = mysqli_fetch_assoc($select_pages)){
          $pages[] = $row_pages;
        }
        $data["pages"]=$pages;

        while($row_users = mysqli_fetch_assoc($select_users)){
          $users[] = $row_users;
        }
        $data["users"]=$users;

        while($row_courses = mysqli_fetch_assoc($select_courses)){
          $courses[] = $row_courses;
        }
        $data["courses"]=$courses;

        return $data;
    }

    public function loadNotificationElements($user_id) {
      $select  = mysqli_query($this->conn,"SELECT * FROM`notifications` WHERE `primary_id` = $user_id  ORDER BY `id` DESC ") or die(mysqli_error());

      $unread_noti_select  = mysqli_query($this->conn,"SELECT * FROM`notifications` WHERE `primary_id` = $user_id  AND `read_status` = 0 ") or die(mysqli_error());
      $unread_noti_count = mysqli_num_rows($unread_noti_select);
      $feedsData = "";
      $app_path = $this->getAppPath();
      while($row = mysqli_fetch_assoc($select)){
        $getUserDetails = mysqli_fetch_assoc(mysqli_query($this->conn,"SELECT * FROM `users` WHERE `id` = '".$row['primary_id']."' "));

        if($getUserDetails['social_id'] != '' && filter_var($getUserDetails['image'], FILTER_VALIDATE_URL) == true){
          $image_path = $getUserDetails['image'];
        }else if($getUserDetails['image'] != ''){
          $image_path = $app_path.'/uploads/user/'.$getUserDetails['image'];
        }else{
          $image_path = $app_path.'/uploads/user/default_profile.png';
        }
        $type_based_elements = "";
        if($row['type'] == 1){
          $obj_Page = new Page($this->conn);
          $getPageDetails = $obj_Page->getPageDetails($row['seconday_id']);
          $type_based_elements =
          '<strong>'.$getUserDetails['first_name'].' '.$getUserDetails['last_name'].'(You)</strong>
          <span class="text-black-70">Has followed <b>'.$getPageDetails['name'].'</b> Page</span>';
        }else if($row['type'] == 2){
          $getSecondaryUserDetails = mysqli_fetch_assoc(mysqli_query($this->conn,"SELECT * FROM `users` WHERE `id` = '".$row['seconday_id']."' "));
          $type_based_elements =
          '<strong>'.$getUserDetails['first_name'].' '.$getUserDetails['last_name'].'(You)</strong>
          <span class="text-black-70">Has followed <b>'.$getSecondaryUserDetails['first_name'].' '.$getSecondaryUserDetails['last_name'].'</b> User</span>';
        }else if($row['type'] == 3){
          $getSecondaryUserDetails = mysqli_fetch_assoc(mysqli_query($this->conn,"SELECT * FROM `users` WHERE `id` = '".$row['seconday_id']."' "));
          $type_based_elements =
          '<strong>'.$getSecondaryUserDetails['first_name'].' '.$getSecondaryUserDetails['last_name'].'</strong>
          <span class="text-black-70">is following You</span>';
        }

        $feedsData .= '
        <a href="#" class="notification-msg list-group-item list-group-item-action unread">
            <span class="d-flex align-items-center mb-1">
                <small class="text-muted">5 minutes ago</small>
                <span class="ml-auto unread-indicator bg-primary"></span>
            </span>
            <span class="d-flex">
                <span class="avatar avatar-xs mr-2">
                    <img src="'.$image_path.'" alt="people" class="avatar-img rounded-circle">
                </span>
                <span class="flex d-flex flex-column">
                    '.$type_based_elements.'
                </span>
            </span>
        </a>';

      }

      return [
        "elements"=>$feedsData,
        "unread_count"=>$unread_noti_count
      ];
    }

    public function getUserImage($getUserDetails){
      $app_path = $this->getAppPath();
      if($getUserDetails['social_id'] != '' && filter_var($getUserDetails['image'], FILTER_VALIDATE_URL) == true){
        $image_path = $getUserDetails['image'];
      }else if($getUserDetails['image'] != ''){
        $image_path = $app_path.'/uploads/user/'.$getUserDetails['image'];
      }else{
        $image_path = $app_path.'/uploads/user/default_profile.png';
      }
      return $image_path;
    }
    public function loadNotifications($user_id) {
      $select  = mysqli_query($this->conn,"SELECT * FROM`notifications` WHERE `primary_id` = $user_id  ORDER BY `id` DESC ") or die(mysqli_error());

      $unread_noti_select  = mysqli_query($this->conn,"SELECT * FROM`notifications` WHERE `primary_id` = $user_id  AND `read_status` = 0 ") or die(mysqli_error());
      $unread_noti_count = mysqli_num_rows($unread_noti_select);
      $feedsData = [];
      $app_path = $this->getAppPath();
      while($row = mysqli_fetch_assoc($select)){
        $getUserDetails = mysqli_fetch_assoc(mysqli_query($this->conn,"SELECT * FROM `users` WHERE `id` = $user_id "));

        if($getUserDetails['social_id'] != '' && filter_var($getUserDetails['image'], FILTER_VALIDATE_URL) == true){
          $image_path = $getUserDetails['image'];
        }else if($getUserDetails['image'] != ''){
          $image_path = $app_path.'/uploads/user/'.$getUserDetails['image'];
        }else{
          $image_path = $app_path.'/uploads/user/default_profile.png';
        }
        $obj_Page = new Page($this->conn);
        $getPageDetails = $obj_Page->getPageDetails($row['seconday_id']);
        $row['username'] = $getUserDetails['first_name'].' '.$getUserDetails['last_name'];
        $row['userImg'] = $image_path;
        $row['pageName'] = $getPageDetails['name'];
        $feedsData[] = $row;
      }

      return $feedsData;
    }


    public function getSettings() {
        $select = mysqli_query($this->conn,"SELECT * FROM `settings` ");
        return mysqli_fetch_assoc($select);
    }

    public function getAppPath() {
        $settings = $this->getSettings();
        $APP_PATH = $settings['site_url'];
        if(substr($APP_PATH,-1) == '/'){
          $APP_PATH = substr_replace($APP_PATH,"",-1);
        }
        return $APP_PATH;
    }

    public function getRoles() {
        $select = mysqli_query($this->conn,"SELECT * FROM `roles` ");
        return $select;
    }

    public function getCountries() {
        $select = mysqli_query($this->conn,"SELECT * FROM `countries` ");
        return $select;
    }

    public function getPageTypes() {
        $select = mysqli_query($this->conn,"SELECT * FROM `page_types` ");
        return $select;
    }

    public function getCountryName($id){
      $select = mysqli_query($this->conn,"select * from `countries` where `id` = '$id' ") ;
      $row = mysqli_fetch_assoc($select);
      return $row['country_name'];
    }

    public function getPageTypeDetails($id){
      $select = mysqli_query($this->conn,"select * from `page_types` where `id` = '$id' ") ;
      return mysqli_fetch_assoc($select);
    }

    public function getRoleById($id) {
        $select = mysqli_query($this->conn,"SELECT * FROM `roles` WHERE `id` =  '$id' ");
        return mysqli_fetch_assoc($select);
    }

    public function getRatings($type_id,$type){
      $select = mysqli_query($this->conn,"SELECT * FROM `reviews` WHERE `type` = '$type' AND `type_id` = '$type_id' ORDER BY `id` DESC ");
      return $select;
    }

    public function insertReview($data,$user_id)
    {
      $rating = $data['rating'];
      $type = $data['type'];
      $type_id = $data['type_id'];
      $reviewImg = $data['reviewImg'];
      $reviewMsg = $data['reviewMsg'];
      $datetime = $data['datetime'];
        $insert  = mysqli_query($this->conn,"INSERT INTO `reviews`(`user_id`, `type`, `type_id`, `rating`, `message`, `image`, `time`) VALUES ('$user_id','$type','$type_id','$rating','$reviewMsg','$reviewImg','$datetime')") or die(mysqli_error());
        return $insert;
    }

    public function addExpoToken($token,$user_id)
    {
        $insert  = mysqli_query($this->conn,"INSERT INTO `users_push_token`(`user_id`, `token`) VALUES ('$user_id','$token')") or die(mysqli_error());
        return $insert;
    }

    public function getExpoPushNotificationToken($user_id)
    {
        $select  = mysqli_query($this->conn," SELECT * FROM `users_push_token` WHERE `user_id` =  '$user_id' ") or die(mysqli_error());
        $row = mysqli_fetch_assoc($select);
        return $row['token'];
    }

}

?>
