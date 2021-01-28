<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	echo json_encode(["book" => ["id"=>2, "title" => "harry potter and the philosopher's stone", "coverURL" => "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg", "author" => "J. K. Rowling", "description" => "Duis velit nostrud sint adipisicing esse esse incididunt aliqua sint nisi laborum laborum quis. Exercitation sunt nisi est magna qui amet labore reprehenderit aliqua labore magna. Sit adipisicing adipisicing incididunt consectetur ad magna labore Lorem et. Aliqua proident veniam irure id ad esse sunt ea Lorem tempor.

Anim in adipisicing ullamco proident deserunt ullamco. Tempor velit qui minim ipsum quis non excepteur minim laboris commodo nisi nulla aliqua ex. Dolore laborum nulla sunt cupidatat aliquip dolore. Laboris proident ea elit laborum consectetur elit adipisicing non enim cupidatat dolor proident fugiat. Laboris fugiat in reprehenderit pariatur ut tempor eu non. Do nostrud veniam quis minim ad laborum minim. Nostrud fugiat ipsum enim mollit commodo officia irure.

Cillum id consequat fugiat nulla voluptate voluptate adipisicing dolor aliqua elit velit. Eu dolore Lorem ullamco cillum qui reprehenderit pariatur qui ullamco do ea ea cupidatat tempor. Fugiat aliquip fugiat deserunt ad eiusmod aute velit pariatur veniam. Ut fugiat dolor aliquip adipisicing Lorem. Qui elit occaecat elit nostrud.

Est sint do ad ex Lorem occaecat ut in eu amet ullamco magna ut. Lorem eiusmod id dolor officia proident ipsum et est commodo et consequat tempor. Dolor in eiusmod reprehenderit dolor consectetur laboris ex. Sint ullamco consequat sunt deserunt labore ea.","count" => 0, "type" => "book"]]);
?>