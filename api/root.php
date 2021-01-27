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
	$type = $_GET['type'];
	$data = array($title,$titleExactMatch,$author,$authorExactMatch,$tag,$sortBy,$order,$type);
	$result = $db->getLibraryInfo($data);
	echo $result;
	
	// for testing purposes
	// echo json_encode([["title" => "harry potter and the philosopher's stone", "coverURL" => "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg", "description" => "Harry potter yay", "author" => "J. K. Rowling", "count" => 5, "type" => "book"], ["title" => "harry potter and the philosopher's stone", "coverURL" => "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg", "description" => "Harry potter yay", "author" => "J. K. Rowling", "count" => 5, "type" => "book"], ["title" => "harry potter and the philosopher's stone", "coverURL" => "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg", "description" => "Harry potter yay", "author" => "J. K. Rowling", "count" => 5, "type" => "book"],["title" => "harry potter and the philosopher's stone", "coverURL" => "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg", "description" => "Harry potter yay", "author" => "J. K. Rowling", "count" => 5, "type" => "book"],["title" => "harry potter and the philosopher's stone", "coverURL" => "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg", "description" => "Harry potter yay", "author" => "J. K. Rowling", "count" => 5, "type" => "book"],["title" => "harry potter and the philosopher's stone", "coverURL" => "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg", "description" => "Harry Potter and the Philosopher's Stone is an enthralling start to Harry's journey toward coming to terms with his past and facing his future. It was the first book written by Rowling, and she was praised for creating well-rounded characters and a fully realized wizard universe that coexisted with the present world.", "author" => "J. K. Rowling", "count" => 0, "type" => "book"]]);
?>