<?php 


	if($_POST['action']=="dangnhap"){

		header('Content-Type: text/html; charset=utf-8');
		 
		$conn = mysqli_connect('localhost', 'root', '12345', 'vnptmap') or die ('Can not connect to mysql');
		mysqli_query($conn,'SET NAMES utf8');


		$username = mysqli_real_escape_string($conn,$_POST['username']);
		$password = mysqli_real_escape_string($conn,$_POST['password']);


		$sql_query="SELECT * FROM users where username='$username' and password='$password'";

		$query = mysqli_query($conn, $sql_query);
		$result = array();
		 
		if (mysqli_num_rows($query) > 0)
		{
		    while ($row = mysqli_fetch_assoc($query)){
		        $result[] = $row;
		    }
		}

		 
		echo json_encode($result);


	}

	if($_POST['action']=="them"){

		header('Content-Type: text/html; charset=utf-8');
		 
		$conn = mysqli_connect('localhost', 'root', '12345', 'vnptmap') or die ('Can not connect to mysql');
		mysqli_query($conn,'SET NAMES utf8');


		$user_id = mysqli_real_escape_string($conn,$_POST['user_id']);
		$vido = mysqli_real_escape_string($conn,$_POST['vido']);
		$kinhdo = mysqli_real_escape_string($conn,$_POST['kinhdo']);
		$tinhtrang = mysqli_real_escape_string($conn,$_POST['tinhtrang']);


		$sql_query="INSERT INTO locations(user_id,latitude,longitude,datetime,tinhtrang,status) VALUES ($user_id,$vido,$kinhdo,CURRENT_TIMESTAMP,'$tinhtrang',0)";

		$query = mysqli_query($conn, $sql_query);
		 
		echo "Gửi tọa độ thành công";


	}
	



 ?>