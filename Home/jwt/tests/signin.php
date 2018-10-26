<?php


include '../src/JWToken.php';

/* With algo -	RSA (Public Key/Private Key pair) */


	include "DB_info.php";

	$dbname = 'airbox';
	
	$conn = mysqli_connect($dbhost, $dbuser, $dbpass) ;//連接資料庫
	//echo 'connect correct';
	mysqli_query($conn,"SET NAMES utf8");
	mysqli_select_db($conn,$dbname);
	header('Content-Type: application/json;charset=utf-8');

	$acc = $_POST['Account'];
	$pwd = $_POST['Password']; //must post
		
	if(checkAccount($acc,$pwd,$conn)){
		packageToken($acc);
		setcookie("failToLogin",null,time()-360000,"/","127.0.0.1",0,0);
		echo $_COOKIE['token'];
		header("Location:http://127.0.0.1/Restful/Home/map.html");
	}else{
		$failToLogin = $_COOKIE["failToLogin"];
		$failToLogin += 1;
		setcookie("failToLogin",$failToLogin,time()+(300),"/","127.0.0.1",0,0);
		header("Location:http://127.0.0.1/Restful/index/");
	}
	


	//if account exist , then 1. generate authentication and save in cookie 
	//						  2. header("Location: http://example.com/myOtherPage.php"); where to generate json(data from DB)
	//else direct error message



	// Generate token with Private key



	/*try{
		$data = JWToken::decode($token,$public_key,'RS256');

	        var_dump($data);
	}catch(Exception $e){
		echo $e->getMessage();
	}*/	
	//echo json_encode($return_arr,true);

	function checkAccount($acc,$ps,$conn){
		$return_arr = array();

		//$location_sql = "SELECT `Latitude`, `Longitude` FROM `box` WHERE `UserAccount` = '$acc'";
		$sql = "SELECT * FROM `user` Where Account = '$acc' AND Password = '$ps'";
		//$location_result = mysqli_query($conn, $location_sql);
		$result = mysqli_query($conn, $sql);
		$row = mysqli_fetch_array($result);
		if($row['Account']==$acc && $row['Password'] ==$ps ){
			//echo "hello";
			return true;
		}else{
			echo "useless";
			return false;
		}
	
	}

	function packageToken($acc){
		$Time = date('Y-m-d H:i:s',time()+21600);
		$payload = array(
			'UserName' => "$acc",
			'Time' => "$Time"
		);
		$private_key = file_get_contents('keys/private_key.pem');
		$token = JWToken::encode($payload, $private_key,'RS256');
		//setcookie("token",null,time()-360000,"/","140.127.74.168",0,0);
		setcookie("token",$token,time()+(3600),"/","140.127.74.168",0,0);
		echo $token;
	}
	
	?>