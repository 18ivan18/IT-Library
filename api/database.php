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
	public function test($data){
		$stmt = $this->connection->prepare("SELECT * FROM library WHERE Title=?");
		$stmt->bind_param("s", $data);
		$stmt->execute();
		$result = $stmt->get_result();
		$JSONArray = array();
		if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				$JSONArray[] = $row;
			}
		}
		header("Access-Control-Allow-Origin: *");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
		header("Access-Control-Max-Age: 3600");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		echo json_encode($JSONArray);
		#if (!mysqli_query($this->connection, $sql)){
			#echo "couldn't insert";
		#}
	}
}
?>