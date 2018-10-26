<?php
	include "verifyToken.php";

	include "DB_info.php";

	$dbname = 'airbox';
	$conn = mysqli_connect($dbhost, $dbuser, $dbpass) ;//連接資料庫
	//echo 'connect correct';
	mysqli_query($conn,"SET NAMES utf8");
	mysqli_select_db($conn,$dbname);
	header('Content-Type: application/json;charset=utf-8');

	$return_arr = array();
	
	if($_GET){
		$token=$_GET['Token'];
		if(verifyToken($token)){
		$data = getToken($token);
	}else{
		
	}
	$acc = $data->UserName;
			$location_sql = "SELECT box.UserAccount , box.MacNumber , box.Location ,g5t.Time,g5t.Temperature,g5t.Humidity,g5t.PM10,g5t.PM25,g5t.PM100,g5t.MacNumber,mq2.MQ2value,mq9.MQ9value FROM g5t INNER JOIN mq2 ON g5t.Time = mq2.Time INNER JOIN mq9 ON g5t.Time = mq9.Time INNER JOIN box ON g5t.MacNumber = box.MacNumber AND g5t.Location = box.Location WHERE box.UserAccount =  '$acc' ORDER BY `g5t`.`Time` DESC LIMIT 30";
		
		$fetch = mysqli_query($conn,$location_sql);

		while ($row = mysqli_fetch_array($fetch)) {
			$row_array = $row;
			array_push($return_arr,$row_array);
		}
		
		echo json_encode($return_arr);
	}
	if($_POST){//篩選時間專用
		$token = $_POST['Token'];
		$time=$_POST['time'];
		$location=$_POST['location'];
		$time1=$time.' '.'00:00:00';//yy/mm/dd 00:00:00
		$time2=$time.' '.'23:59:59';//yy/mm/dd 23:59:59
		if(verifyToken($token)){
		$data = getToken($token);
	}else{
		
	}
	$acc = $data->UserName;

		$time_sql = "SELECT box.UserAccount , box.MacNumber , box.Location ,g5t.Time,g5t.Temperature,g5t.Humidity,g5t.PM10,g5t.PM25,g5t.PM100,g5t.MacNumber,mq2.MQ2value,mq9.MQ9value FROM g5t INNER JOIN mq2 ON g5t.Time = mq2.Time INNER JOIN mq9 ON g5t.Time = mq9.Time INNER JOIN box ON g5t.MacNumber = box.MacNumber AND g5t.Location = box.Location WHERE box.UserAccount =  '$acc' AND box.Location = '$location' AND g5t.Time >= '$time1' AND g5t.Time <= '$time2'  ORDER BY `g5t`.`Time` DESC LIMIT 40";


		
		$fetch = mysqli_query($conn,$time_sql);

		while ($row = mysqli_fetch_array($fetch)) {
			$row_array = $row;
			array_push($return_arr,$row_array);
		}
		
		echo json_encode($return_arr);
	}
?>