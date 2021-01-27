<?php
class database{
	private $connection;
    public function __construct() {
        $host = "localhost";
		$username = "root";
		$pass = "";
		$dbname = "project";
		$this->connection = mysqli_connect('127.0.0.1', 'root', '');
		if (!$this->connection){
			echo "not connected";
		}
		if (!mysqli_select_db($this->connection, 'project')){
			echo "cannot get db";
		}
	}
	public function getLibraryInfo($data){
		$title = $data[0];
		$titleExactMatch = $data[1];
		$author = $data[2];
		$authorExactMatch = $data[3];
		$tag = $data[4];
		$sortBy = $data[5];
		$order = $data[6];
		$type = $data[7];
		if ($titleExactMatch == 'true'){
			if ($authorExactMatch == 'true'){
				if($order == 'Descending'){
					$stmt = $this->connection->prepare("SELECT * FROM library WHERE Title=? and Author = ? and Tags LIKE CONCAT ( '%' , ?, '%') and Type LIKE CONCAT ( '%' , ?, '%') ORDER BY ? DESC");
				}
				else{
				$stmt = $this->connection->prepare("SELECT * FROM library WHERE Title=? and Author = ? and Tags LIKE CONCAT ( '%' , ?, '%') and Type LIKE CONCAT ( '%' , ?, '%') ORDER BY ?");
				}
			}
			else{
				if ($order == 'Descending'){
					$stmt = $this->connection->prepare("SELECT * FROM library WHERE Title=? and Author LIKE CONCAT ('%',?,'%') and Tags LIKE CONCAT ( '%' , ?, '%') and Type LIKE CONCAT ( '%' , ?, '%') ORDER BY ? DESC");
				}
				else{
					$stmt = $this->connection->prepare("SELECT * FROM library WHERE Title=? and Author LIKE CONCAT ('%',?,'%') and Tags LIKE CONCAT ( '%' , ?, '%') and Type LIKE CONCAT ( '%' , ?, '%') ORDER BY ?");
				}
			}
		}
		else{
			if ($order == 'Descending'){
				$stmt = $this->connection->prepare("SELECT * FROM library WHERE Title LIKE CONCAT('%',?,'%') and Author LIKE CONCAT ('%',?,'%') and Tags LIKE CONCAT ( '%' , ?, '%') and Type LIKE CONCAT ( '%' , ?, '%') ORDER BY ? DESC");
			}
			else{
				$stmt = $this->connection->prepare("SELECT * FROM library WHERE Title LIKE CONCAT('%',?,'%') and Author LIKE CONCAT ('%',?,'%') and Tags LIKE CONCAT ( '%' , ?, '%') and Type LIKE CONCAT ( '%' , ?, '%') ORDER BY ?");
			}
		}
		$stmt->bind_param("sssss", $title, $author, $tag, $type, $sortBy);
		$stmt->execute();
		$result = $stmt->get_result();
		$JSONArray = array();
		if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				$JSONArray[] = $row;
			}
		}
		return json_encode($JSONArray);
	}
	public function loginCheck($data){
		$username = $data[0];
		$password = $data[1];
		$stmt = $this->connection->prepare("SELECT * FROM users WHERE username = ? and password = ?");
		$stmt->bind_param("ss", $username, $password);
		$stmt->execute();
		$result = $stmt->get_result();
		if($result->num_rows > 0){
			$row = $result->fetch_assoc();
			$JSONArray = $row;
			return ["success" => true, "user" => $JSONArray];
		}
		else{
			return ["success" => false, "message" => 'Invalid username or password'];
		}
	}
	public function registerCheck($data){
		$username = $data[0];
		$password = $data[1];
		$name = $data[2];
		$email = $data[3];
		$stmt = $this->connection->prepare("SELECT * FROM users WHERE username = ?");
		$stmt->bind_param("s", $username);
		$stmt->execute();
		$result = $stmt->get_result();
		if($result->num_rows > 0){
			return ["success" => false,"message" => 'Username is already taken.'];
		}
		else{
			$stmt2 = $this->connection->prepare("INSERT INTO users (username, password, name, email) VALUES(?, ?, ?, ?)");
			$stmt2->bind_param("ssss", $username, $password, $name, $email);
			$stmt2->execute();
			return ["success" => true];
		}
	}
}
?>