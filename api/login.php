<?php
	
	require_once('database.php');
	session_start();
    $username = $_POST["username"];
    $password = $_POST['password'];
	$db = new database();
	$data = array($username,$password);
	$result = $db->loginCheck($data);
	if ($result['success']){
		$_SESSION['loggedIn'] = true;
		$_SESSION['username'] = $username;
		$_SESSION['password'] = $password;
	}
	header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	echo json_encode($result);
?>