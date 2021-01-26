<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	require_once('database.php');
	$db = new database();
	$title = $_GET['title'];
	$titleExactMatch = $_GET['titleExactMatch'];
	$author = $_GET['author'];
	$authorExactMatch = $_GET['authorExactMatch'];
	$tag = $_GET['tag'];
	$sortBy = $_GET['sortBy'];
	$order = $_GET['order'];
	$data = array($title,$titleExactMatch,$author,$authorExactMatch,$tag,$sortBy,$order);
	$result = $db->getLibraryInfo($data);
	echo $result;
	
?>