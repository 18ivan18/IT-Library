<?php
	require_once('database.php');
	header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	$date = date('c');
	$db = new database();
	$result = $db->getHistory($_GET['username']);
	echo json_encode(['history' => $result]);
	#echo json_encode(["history" => [["id" => 1, "coverURL" => "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg", "author" => "J. K. Rowling","name" => "harry potter and the philosopher's stone", "dateTaken" => $date, "dateReturned" => "15.10.2020"], ["id" => 2, "coverURL" => "https://static.wikia.nocookie.net/harrypotter/images/6/6d/Chamber_of_Secrets_New_UK_Cover.jpg/revision/latest/top-crop/width/360/height/450?cb=20170109045927", "author" => "J. K. Rowling", "name" => "harry potter and the chamber of secrets", "dateTaken" => $date, "dateReturned" => "25.10.2020"], ["id" => 3, "author" => "J. K. Rowling", "name" => "harry potter and the prisoner of azkaban", "dateTaken" => $dateTaken, "daysToBeHeld" => 20, "coverURL" => "https://images-na.ssl-images-amazon.com/images/I/91uix57X+jL.jpg"], ["id" => 4, "coverURL" => "https://static.wikia.nocookie.net/harrypotter/images/3/31/Order_of_the_Phoenix_New_Cover.jpg/revision/latest?cb=20170109054726", "author" => "J. K. Rowling", "name" => "harry potter and the order of the phoenix", "dateTaken" => $dateTaken1, "daysToBeHeld" => 20], ["id" => 5, "coverURL" => "https://prodimage.images-bn.com/pimages/9780545791427_p0_v4_s1200x630.jpg", "author" => "J. K. Rowling", "name" => "harry potter and the goblet of fire", "dateTaken" => $dateTaken1, "daysToBeHeld" => 20]]]);

?>