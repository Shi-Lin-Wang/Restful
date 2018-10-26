<?PHP

	include "DB_info.php";

	$dbname = 'airbox';

	$conn = mysqli_connect($dbhost, $dbuser, $dbpass) ;//連接資料庫
	//echo 'connect correct';
	mysqli_query($conn,"SET NAMES utf8");
	mysqli_select_db($conn,$dbname);
	header('Content-Type: application/json;charset=utf-8');


	$acc = $_POST['Account'];
	$pwd = $_POST['Password']; //must post
	$email = $_POST['Email'];

	$return_arr = array();
	$sql = "SELECT * FROM `user` Where Account = '$acc'";
	$result = mysqli_query($conn, $sql);
	$row = mysqli_fetch_array($result);
	if($result != null){
		return true;
	}else{
		echo "useless";
		return false;
	}


?>