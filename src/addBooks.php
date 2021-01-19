<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	$username = $_POST["username"];
	$csv = $_FILES["csv"]['tmp_name'];
	$myfile = fopen($csv, "r") or die("Unable to open file!");
	$data = fread($myfile, filesize($csv));
	fclose($myfile);
	echo json_encode([$username, "data" => $data]);
?>