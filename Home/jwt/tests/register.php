<?php
	include "DB_info.php";
	$dbname = 'airbox';
	
	$conn = mysqli_connect($dbhost, $dbuser, $dbpass) ;
	mysqli_query($conn,"SET NAMES utf8");
	mysqli_select_db($conn,$dbname);
	header('Content-Type: application/json;charset=utf-8');

	$account = $_POST['signup-acc'];
	$password = $_POST['signup-pwd'];
	$email = $_POST['signup-email'];

	$sql_acc = "SELECT * FROM `user` WHERE `Account` = '$account'";
	$res = mysqli_query($conn,$sql_acc);
	if($res->num_rows > 0){
        setcookie("signError","true",time()+(300),"/","127.0.0.1",0,0);
		header("Location:http://127.0.0.1/Restful/Home/index.html");
    }else{
		$sql = "INSERT INTO `user`(`Account`, `Password`, `Email`) VALUES ('$account','$password','$email')";
        setcookie("signError","false",time()+(300),"/","127.0.0.1",0,0);
		mysqli_query($conn, $sql);
		header("Location:http://127.0.0.1/Restful/Home/index.html");
    }

		
	mysqli_free_result($res);
	mysqli_close($conn);
?>