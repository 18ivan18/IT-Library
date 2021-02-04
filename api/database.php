<?php
class database{
	private $connection;
    public function __construct() {
        $host = "localhost";
		$username = "root";
		$pass = "";
		$dbname = "project";
		$ip = '127.0.0.1';
		$this->connection = mysqli_connect($ip, $username, $pass);
		if (!$this->connection){
			echo "not connected";
		}
		if (!mysqli_select_db($this->connection, $dbname)){
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
				$JSONArray[] = ['title' => $row['Title'], 'author' => $row['Author'], 'id' => $row['ID'], 'type' => $row['Type'], 'description' => $row['Description'], 'count' => $row['Count'], 'coverURL' => $row['coverURL']];
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
			return ["success" => true, "user" => ['username' => $row['username'], 'name' => $row['name'], 'email' => $row['email'], 'profilePicture' => $row['picture'], 'points' =>
			$row['points']]];
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
	public function getHistory($data){
		$stmt = $this->connection->prepare("SELECT * FROM transactions WHERE user = ?");
		$stmt->bind_param("s", $data);
		$stmt->execute();
		$result = $stmt->get_result();
		$history = array();
		if ($result->num_rows > 0){
			while ($row = $result->fetch_assoc()){
				$bookID = $row['bookID'];
				$stmt2 = $this->connection->prepare("SELECT * FROM library where ID = ?");
				$stmt2->bind_param("i", $bookID);
				$stmt2->execute();
				$result2 = $stmt2->get_result();
				$row2 = $result2->fetch_assoc();
				if($row['returndate']){
					$history[] = ['id' => $bookID, 'coverURL' => $row2['coverURL'], 'author' => $row2['Author'], 'name' => $row2['Title'], 'dateTaken' => $row['buydate'], 'dateReturned' => $row['returndate']];
				}
				else{
					$history[] = ['id' => $bookID, 'coverURL' => $row2['coverURL'], 'author' => $row2['Author'], 'name' => $row2['Title'], 'dateTaken' => $row['buydate'], 'daysToBeHeld' => 30];
				}
			}
		}
		return $history;
	}
	public function addBook($data){
		$title = $data[0];
		$author = $data[1];
		$type = $data[2];
		$description = $data[3];
		$count = $data[4];
		$url = $data[5];
		$tags = $data[6];
		$coverURL = $data[7];
		$quote = $data[8];
		$stmt = $this->connection->prepare("INSERT INTO library (Title, Author, Type, Description, Count, URL, Tags, coverURL, quote) VALUES (?,?,?,?,?,?,?,?,?)");
		$stmt->bind_param("ssssissss", $title, $author, $type, $description, $count, $url, $tags, $coverURL, $quote);
		$stmt->execute();
		$url = $data[5];
		$file_name = basename($url);
		$stmt2 = $this->connection->prepare("SELECT * FROM library ORDER BY ID DESC LIMIT 1 ");
		$stmt2->execute();
		$id = $stmt2->get_result()->fetch_assoc()['ID'];
		file_put_contents("books/{$id}.pdf",file_get_contents($url));
	}
	public function bookInfo($data){
		$stmt = $this->connection->prepare("SELECT * FROM library WHERE ID = ?");
		$stmt->bind_param("i",$data);
		$stmt->execute();
		$result = $stmt->get_result();
		$row = $result->fetch_assoc();
		return ['book'=> ['id' => $row['ID'], 'author' => $row['Author'], 'title' => $row['Title'], 'coverURL' => $row['coverURL'], 'description' => $row['Description'],
							'count' => $row['Count'], 'type'=>$row['Type']]];
	}
	public function returnBook($data0, $data1){
		$id = $data0;
		$user = $data1;
		$stmt = $this->connection->prepare("UPDATE transactions SET returnDate = now() WHERE bookID = ? AND user = ?");
		$stmt->bind_param("is",$id,$user);
		if(!$stmt){
			return ['success' => false, 'message' => 'Couldnt return the book.'];
		}
		$stmt->execute();
		$result = $stmt->get_result();
		$stmt2 = $this->connection->prepare("UPDATE library SET Count = Count + 1 WHERE ID = ?");
		$stmt2->bind_param("i",$id);
		$stmt2->execute();
		$stmt3 = $this->connection->prepare("UPDATE users SET points = points + 1 WHERE username = ?");
		$stmt3->bind_param("s",$user);
		$stmt3->execute();
		return ['success' => true];
	}
	public function quoteBook($data){
		$id = $data;
		$stmt = $this->connection->prepare("SELECT * FROM library WHERE ID = ?");
		$stmt->bind_param("s",$id);
		$stmt->execute();
		$result = $stmt->get_result();
		if ($result->num_rows > 0){
			$row = $result->fetch_assoc();
			if ($row['Type'] == 'book'){
				$bookQuote = $row['Author'].'.'.$row['Title'].'.'.$row['quote'];
				return ['quote'=> $bookQuote];
			}
			else if ($row['Type'] == 'paper'){
				$paperQuote = '['.$row['Author'].'], '.$row['Title'].', Available from:'.$row['quote'];
				return ['quote' => $paperQuote];
			}
			else{
				$magazineQuote = $row['Author'].'('.$row['quote'].'), '.$row['Title'];
				return ['quote' => $magazineQuote];
			}
		}
	}
	public function buyBook($idInput,$usernameInput){
		$id = $idInput;
		$user = $usernameInput;
		$stmt = $this->connection->prepare("SELECT * FROM library WHERE ID = ?");
		$stmt->bind_param("s",$id);
		$stmt->execute();
		$result = $stmt->get_result();
		$row = $result->fetch_assoc();
		if ($row['Count'] < 1){
			return ['success' => false, 'message' => 'This article is sold out'];
		}
		$stmt4 = $this->connection->prepare("SELECT points FROM users WHERE username = ?");
		$stmt4->bind_param("s", $user);
		$stmt4->execute();
		$result2 = $stmt4->get_result();
		$row2 = $result2->fetch_assoc();
		if ($row2['points'] < 1){
			return ['success' => false, 'message' => 'Not enough points to buy the article'];
		}
		$newPoints = $row2['points'] - 1;
		$stmt5 = $this->connection->prepare("UPDATE users SET points = ? WHERE username = ?");
		$stmt5->bind_param("is", $newPoints, $user);
		$stmt5->execute();
		$stmt2 = $this->connection->prepare("INSERT INTO transactions (bookID, buydate, user) VALUES (?,now(),?)");
		$stmt2->bind_param("is", $id,$user);
		$stmt2->execute();
		$newCount = $row['Count'] - 1;
		$stmt3 = $this->connection->prepare("UPDATE library SET Count = ? WHERE ID = ?");
		$stmt3->bind_param("ii", $newCount, $id);
		$stmt3->execute();
		return ['success' => true, 'message' => 'You have successfully bought the book'];
	}
}
?>