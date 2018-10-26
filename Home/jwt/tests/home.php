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
	$info = $_GET['info'];
	$return_arr = array();

	if(verifyToken($token)){
		$data = getToken($token);
	}else{
		
	}
	$acc= "tseng";



	$location_sql = "SELECT box.UserAccount , box.MacNumber , box.Location ,g5t.Time,g5t.Temperature,g5t.Humidity,g5t.PM10,g5t.PM25,g5t.PM100,g5t.MacNumber,mq2.MQ2value,mq9.MQ9value FROM g5t INNER JOIN mq2 ON g5t.Time = mq2.Time INNER JOIN mq9 ON g5t.Time = mq9.Time INNER JOIN box ON g5t.MacNumber = box.MacNumber AND g5t.Location = box.Location WHERE box.Location = '$info' AND box.UserAccount =  '$acc' ORDER BY `g5t`.`Time` DESC";
	$location_result = mysqli_query($conn, $location_sql);
		
	while ($row = mysqli_fetch_array($location_result)) {
		$row_array = $row;
   		array_push($return_arr,$row_array);
	}
	
	echo json_encode($return_arr);
	mysqli_free_result($location_result);
	mysqli_close($conn);
?>