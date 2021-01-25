<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	$username = $_POST["username"];
	$firstName = $_POST["firstName"];
	$lastName = $_POST["lastName"];
	$password = $_POST["password"];
	echo json_encode([$username, $firstName, $lastName, $password]);
?>