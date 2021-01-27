<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	require_once('database.php');
	$username = $_POST["username"];
	$name = $_POST["name"];
	$email = $_POST["email"];
	$password = $_POST["password"];
	$db = new database();
	$data = array($username,$password,$name,$email);
	$result = $db->registerCheck($data);
	echo json_encode($result);
?>