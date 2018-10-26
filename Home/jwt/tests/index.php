<?php

include '../src/JWToken.php';


/* With algo -	RSA (Public Key/Private Key pair) */


$payload = array(
		'username' => 'bllohar',
		'MacNumber'   => '123',
);

$private_key = file_get_contents('keys/private_key.pem');

$public_key = file_get_contents('keys/public_key.pem');

// Generate token with Private key

$token = JWToken::encode($payload, $private_key,'RS256');

echo $token;

/*try{
	$data = JWToken::decode($token,$public_key,'RS256');

        var_dump($data);
}catch(Exception $e){
	echo $e->getMessage();
}*/
?>