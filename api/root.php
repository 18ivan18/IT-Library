<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	require_once('database.php');
	$db = new database();
	$title = '';
	$author = '';
	$titleExactMatch = '';
	$authorExactMatch = '';
	$tag = '';
	$sortBy = '';
	$order = '';
	$type = '';
	if(isset($_GET['title'])){
		$title = $_GET['title'];
	}
	if(isset($_GET['author'])){
		$author = $_GET['author'];
	}
	if(isset($_GET['titleExactMatch'])){
		$titleExactMatch = $_GET['titleExactMatch'];
	}
	if(isset($_GET['authorExactMatch'])){
		$authorExactMatch = $_GET['authorExactMatch'];
	}
	if(isset($_GET['tag'])){
		$tag = $_GET['tag'];
	}
	if(isset($_GET['sortBy'])){
		$sortBy = $_GET['sortBy'];
	}
	if(isset($_GET['order'])){
		$order = $_GET['order'];
	}
	if(isset($_GET['type'])){
		$type = $_GET['type'];
	}
	$data = array($title,$titleExactMatch,$author,$authorExactMatch,$tag,$sortBy,$order,$type);
	$result = $db->getLibraryInfo($data);
	echo $result;
	// for testing purposes
	// echo json_encode([["title" => "harry potter and the philosopher's stone", "coverURL" => "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg", "description" => "Harry potter yay", "author" => "J. K. Rowling", "count" => 5, "type" => "book"], ["title" => "harry potter and the philosopher's stone", "coverURL" => "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg", "description" => "Harry potter yay", "author" => "J. K. Rowling", "count" => 5, "type" => "book"], ["title" => "harry potter and the philosopher's stone", "coverURL" => "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg", "description" => "Harry potter yay", "author" => "J. K. Rowling", "count" => 5, "type" => "book"],["title" => "harry potter and the philosopher's stone", "coverURL" => "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg", "description" => "Harry potter yay", "author" => "J. K. Rowling", "count" => 5, "type" => "book"],["title" => "harry potter and the philosopher's stone", "coverURL" => "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg", "description" => "Harry potter yay", "author" => "J. K. Rowling", "count" => 5, "type" => "book"],["title" => "harry potter and the philosopher's stone", "coverURL" => "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg", "description" => "Harry Potter and the Philosopher's Stone is an enthralling start to Harry's journey toward coming to terms with his past and facing his future. It was the first book written by Rowling, and she was praised for creating well-rounded characters and a fully realized wizard universe that coexisted with the present world.", "author" => "J. K. Rowling", "count" => 0, "type" => "book"]]);
?>