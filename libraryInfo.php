<?php
	$host = "localhost";
	$username = "root";
	$pass = "";
	$dbname = "project";
	$con = mysqli_connect('127.0.0.1', 'root', '');
	if (!$con){
		echo "not connected";
	}
	if (!mysqli_select_db($con, 'project')){
		echo "cannot get db";
	}
	$sql = "SELECT * FROM library";
	$result = $con->query($sql);
	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			echo "ID: " . $row["ID"]. " - : " . $row["Title"]. " - " . $row["Type"]. " - " . $row["Description"] . " - " . $row["Count"] . " - " . $row["URL"] . "\n";
		}
	}
	if (!mysqli_query($con, $sql)){
		echo "couldn't insert";
	}

?>