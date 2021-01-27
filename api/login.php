<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	// $date = date(DateTime::ISO8601);
	$date = date('c');
	$dateTaken = date('c', mktime(0, 0, 0, 5, 7	, 1998));
	$dateTaken1 = date('c', mktime(0, 0, 0, 1, 21, 2021));
	echo json_encode(["success" => true, "user" => ["name" => "Ivan", "username"=>"18ivan18",
	"phone" => "0883530820",
	"email" => "ajabaja16@gmail.com",
	"website" => "ivan.com",
	"resources" => 5,
	"profilePicture" => "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
	"history" => [["id" => 1, "coverURL" => "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg", "author" => "J. K. Rowling","name" => "harry potter and the philosopher's stone", "dateTaken" => $date, "dateReturned" => "15.10.2020"], ["id" => 2, "coverURL" => "https://static.wikia.nocookie.net/harrypotter/images/6/6d/Chamber_of_Secrets_New_UK_Cover.jpg/revision/latest/top-crop/width/360/height/450?cb=20170109045927", "author" => "J. K. Rowling", "name" => "harry potter and the chamber of secrets", "dateTaken" => $date, "dateReturned" => "25.10.2020"], ["id" => 3, "author" => "J. K. Rowling", "name" => "harry potter and the prisoner of azkaban", "dateTaken" => $dateTaken, "daysToBeHeld" => 20, "coverURL" => "https://images-na.ssl-images-amazon.com/images/I/91uix57X+jL.jpg"], ["id" => 4, "coverURL" => "https://static.wikia.nocookie.net/harrypotter/images/3/31/Order_of_the_Phoenix_New_Cover.jpg/revision/latest?cb=20170109054726", "author" => "J. K. Rowling", "name" => "harry potter and the order of the phoenix", "dateTaken" => $dateTaken1, "daysToBeHeld" => 20], ["id" => 5, "coverURL" => "https://prodimage.images-bn.com/pimages/9780545791427_p0_v4_s1200x630.jpg", "author" => "J. K. Rowling", "name" => "harry potter and the goblet of fire", "dateTaken" => $dateTaken1, "daysToBeHeld" => 20]]
	]]);
?>