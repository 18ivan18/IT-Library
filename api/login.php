<?php
	header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    $username = $_POST["username"];
    $password = $_POST['password'];
    echo json_encode(["success" => true, "user" => ["name" => "Ivan", "username"=>"18ivan18",
    "phone" => "0883530820",
    "email" => "ajabaja16@gmail.com",
    "website" => "ivan.com",
    "resources" => 5,
    "profilePicture" => "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
    ]]);
?>