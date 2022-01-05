<?php
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', 'root');
define('DB_DATABASE', 'r1ngaze');


// define('DB_SERVER', 'mysql.ngazelabs.com');
// define('DB_USERNAME', 'restaurant_ngaze');
// define('DB_PASSWORD', 'MN^*UNdJYxyW!F=WT+$-X+%&*E&W');
// define('DB_DATABASE', 'r1ngaze');



$con = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);


// Check connection
if (mysqli_connect_errno()){
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
?>
