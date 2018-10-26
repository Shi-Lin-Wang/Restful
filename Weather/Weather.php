<?php

/*initial*/
	$dbhost = 'kappa.sytes.net';
	$dbuser = 'test';
	$dbpass = '410375003';
	$dbname = 'crawler';
	$conn = mysqli_connect($dbhost, $dbuser, $dbpass) ;//連接資料庫
	mysqli_query($conn,"SET NAMES utf8");
	mysqli_select_db($conn,$dbname);
	
	/*get the assigned country information from DB*/
	/*
		example :
		http://kappatseng.sytes.net:8081/folder/Weather.php?&value=Taipei
	*/
	$location=$_GET['value'];
	
	if($location == "Keelung"){
		$location = '基隆市';
	}
	else if($location == "Taipei"){
		$location = '臺北市';
	}
	else if($location == "Xinbei"){
		$location = '新北市';
	}
	else if($location == "Taoyuan"){
		$location = '桃園市';
	}
	else if($location == "Hsinchu"){
		$location = '新竹縣';
	}
	else if($location == "Hsinchu_City"){
		$location = '新竹市';
	}
	else if($location == "Miaoli"){
		$location = '苗栗縣';
	}
	else if($location == "Taichung"){
		$location = '臺中市';
	}
	else if($location == "Changhua"){
		$location = '彰化縣';
	}
	else if($location == "Nantou"){
		$location = '南投縣';
	}
	else if($location == "Yunlin"){
		$location = '雲林縣';
	}
	else if($location == "Chiayi"){
		$location = '嘉義縣';
	}
	else if($location == "Chiay_City"){
		$location = '嘉義市';
	}
	else if($location == "Tainan"){
		$location = '臺南市';
	}
	else if($location == "Kaohsiung"){
		$location = '高雄市';
	}
	else if($location == "Pingtung"){
		$location = '屏東縣';
	}
	else if($location == "Yilan"){
		$location = '宜蘭縣';
	}
	else if($location == "Hualien"){
		$location = '花蓮縣';
	}
	else if($location == "Taitung"){
		$location = '臺東縣';
	}
	else if($location == "Lianjiang"){
		$location = '連江縣';
	}
	else if($location == "Kinmen"){
		$location = '金門縣';
	}
	else if($location == "Penghu"){
		$location = '澎湖縣';
	}
	
	$sql = "SELECT * FROM `weather` WHERE `Location` = '$location' ORDER BY `DataExtractingTime` DESC LIMIT 0,1";//查詢整個表單
	$result = mysqli_query($conn,$sql);
	$row = mysqli_fetch_row($result);
	
	echo json_encode($row);
	/*********************************/
	$period = analyzeTime();
	$SQL = "SELECT * FROM `weather` WHERE `Period` = '$period' ORDER BY `weather`.`DataExtractingTime` DESC LIMIT 22";


	function analyzeTime(){
        $time = date("Y-m-d H:00:00");
		$time1 = date("Y-m-d 00:00:00");
         $time2 = date("Y-m-d 06:00:00");
         $time3 = date("Y-m-d 18:00:00");
         $time4 = date("Y-m-d 00:00:00", mktime(date('H'), date('i'), date('s'), date('m'), date('d')+1, date('Y')));

         $time5_1 = date("Y-m-d 00:00:00");
         $time5_2 = date("Y-m-d 01:00:00");
         $time6_1 = date("Y-m-d 06:00:00");
         $time6_2 = date("Y-m-d 07:00:00");
         $time7_1 = date("Y-m-d 18:00:00");
         $time7_2 = date("Y-m-d 19:00:00");
         //0 0~6 , 1 : 6~18 , 2:18~0

        if(strtotime($time) > strtotime($time5_1) && strtotime($time) < strtotime($time5_2)){
        	return 2;
        }else if(strtotime($time) > strtotime($time6_1) && strtotime($time) < strtotime($time6_2)){
        	return 0;
        }else if(strtotime($time) > strtotime($time7_1) && strtotime($time) < strtotime($time7_2)){
        	return 1;
        }else{
	        if (strtotime($time) > strtotime($time1) && strtotime($time) < strtotime($time2)){
	               return 0;
	        }else if (strtotime($time) > strtotime($time2) && strtotime($time) < strtotime($time3)){
	               return 1;
	        }else if (strtotime($time) > strtotime($time3) && strtotime($time) < strtotime($time4)){
	               return 2;
	        }
	    }
	}
	/**********************************/
?>