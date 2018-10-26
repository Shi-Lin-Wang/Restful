<?php

include '../src/JWToken.php';



function verifyToken($token){
	$public_key =  file_get_contents('keys/public_key.pem');
	try {
		$data = JWToken::decode($token,$public_key,'RS256');
	}catch(Exception $e){
		setcookie("AuthOver","true",time()+(60));
		unset($_COOKIE["token"]);
		return false;
	}
	return true;
}

function getToken($token){
	$public_key =  file_get_contents('keys/public_key.pem');
	try {
		$data = JWToken::decode($token,$public_key,'RS256');
		//var_dump($data);
	}catch(Exception $e){
		setcookie("AuthOver","true",time()+(60));
		unset($_COOKIE["token"]);
		return "";
	}
	return $data;
}
?>