<?php
	include "verifyToken.php";
	//include "./jwt/tests/scrabbug.php";
	include "DB_info.php";

	$dbname = 'airbox';
	
	$conn = mysqli_connect($dbhost, $dbuser, $dbpass) ;//連接資料庫
	mysqli_query($conn,"SET NAMES utf8");
	mysqli_select_db($conn,$dbname);
	header('Content-Type: application/json;charset=utf-8');

	$token = $_GET['Token'];
	$return_arr = array();

	if(verifyToken($token)){
		
		$data = getToken($token);
	}else{
		
	}
	
	$acc= "tseng";



	$location_sql = "SELECT `Latitude`, `Longitude` ,`Location`FROM `box` WHERE `UserAccount` = '$acc'";
	$location_result = mysqli_query($conn, $location_sql);
		
	while ($row = mysqli_fetch_array($location_result)) {
		$row_array = $row;
   		array_push($return_arr,$row_array);
	}
	
	echo json_encode($return_arr);
	mysqli_free_result($location_result);
	mysqli_close($conn);
?>