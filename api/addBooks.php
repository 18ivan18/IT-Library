<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	require_once('database.php');
	$db = new database();
	$csv = $_FILES["csv"]['tmp_name'];
	$myfile = fopen($csv, "r");
	if (!$myfile){
		echo json_encode(['success' => false,'message' => 'Could not upload the file']);
	}
	$JSONArray = array();
	while (($line = fgetcsv($myfile, 1000, ",")) !== FALSE) {
	$data = array($line[0],$line[1],$line[2],$line[3],$line[4],$line[5],$line[6],$line[7],$line[8]);
	$db->addBook($data);
	}
	echo json_encode(['success'=>true]);
	fclose($myfile);

?>