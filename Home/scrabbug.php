<?php
	$dbhost = '140.127.74.168';
	$dbuser = 'airbox';
	$dbpass = '410375003';
	$dbname = 'crawler';
	$conn = mysqli_connect($dbhost, $dbuser, $dbpass) ;//連接資料庫
	mysqli_query($conn,"SET NAMES utf8");
	mysqli_select_db($conn,"crawler");
	header('Content-Type: application/json;charset=utf-8');

	$return_arr = array();
	
	//$table=$_GET['value'];

    $SQL = "SELECT * FROM `weather` WHERE `Location` = '高雄市' ORDER BY `DataExtractingTime` DESC LIMIT 1";

	$fetch = mysqli_query($conn,$SQL);

	while ($row = mysqli_fetch_array($fetch)) {
		$row_array = $row;
	    array_push($return_arr,$row_array);
	}
	
	echo json_encode($return_arr);
?>