<?php 

if(isset($_GET['id']) && $_GET['id']!="" && isset($_GET['ngay']) && $_GET['ngay']!=""){
	
	header('Content-Type: text/html; charset=utf-8');
	//Header('Content-Type: application/json; charset=UTF-8');
	 
	$conn = mysqli_connect('localhost', 'root', '12345', 'vnptmap') or die ('Can not connect to mysql');
	mysqli_query($conn,'SET NAMES utf8');


	$id=(int) $_GET['id'];
	$ngay=mysqli_real_escape_string($conn,$_GET['ngay']);
	$sql_query="SELECT ls.id as id,latitude,longitude,DATE_FORMAT(datetime,'%H:%i %m/%d/%Y') AS datetime,tinhtrang,name,phone FROM locations ls, users us WHERE ls.user_id=us.id AND ls.user_id=$id AND ls.datetime LIKE '$ngay%' ORDER BY ls.id DESC";

	$query = mysqli_query($conn, $sql_query);
	$result = array();
	 
	if (mysqli_num_rows($query) > 0)
	{
	    while ($row = mysqli_fetch_assoc($query)){
	        $result[] = $row;
	    }
	}

	 
	die (json_encode($result, JSON_UNESCAPED_UNICODE));
}
else if(isset($_POST['id']) && isset($_POST['ngay']))
{
	// Thiết lập font chữ UTF8 để khỏi bị lỗi font
	header('Content-Type: text/html; charset=utf-8');
	 
	// Kết nối database
	$conn = mysqli_connect('localhost', 'root', '12345', 'vnptmap') or die ('Can not connect to mysql');
	mysqli_query($conn,'SET NAMES utf8');

	$id=mysqli_real_escape_string($conn,$_POST['id']);
	$ngay=mysqli_real_escape_string($conn,$_POST['ngay']);

	$sql="UPDATE locations SET status=1 WHERE user_id=$id AND datetime LIKE'$ngay%'";
	mysqli_query($conn,$sql);
	 
}
else if(isset($_GET['ngay']) && $_GET['ngay']!="" && isset($_GET['daduyet']) && $_GET['daduyet']!="")
{
	header('Content-Type: text/html; charset=utf-8');
	$conn = mysqli_connect('localhost', 'root', '12345', 'vnptmap') or die ('Can not connect to mysql');
	mysqli_query($conn,'SET NAMES utf8');

	$ngay=mysqli_real_escape_string($conn,$_GET['ngay']);
	$daduyet=(int) $_GET['daduyet'];

	$query = mysqli_query($conn, "SELECT MAX(ls.id),ls.user_id AS id,us.name,us.phone FROM locations ls,users us
									WHERE 
									ls.user_id=us.id 
									AND ls.datetime LIKE '$ngay%'
									AND ls.status='$daduyet'
									GROUP BY ls.user_id
									ORDER BY MAX(id) DESC, user_id");
	 
	$result = array();	 
	if (mysqli_num_rows($query) > 0)
	{
	    while ($row = mysqli_fetch_assoc($query)){
	        $result[] = $row;
	    }
	}
	 
	die (json_encode($result, JSON_UNESCAPED_UNICODE));
}
else if(isset($_GET['kiemtra']) && $_GET['kiemtra']!=""){
	header('Content-Type: text/html; charset=utf-8');
	 
	$conn = mysqli_connect('localhost', 'root', '12345', 'vnptmap') or die ('Can not connect to mysql');
	mysqli_query($conn,'SET NAMES utf8');

	$sql_query="SELECT COUNT(*) AS soluong FROM locations";

	$query = mysqli_query($conn, $sql_query);
	 
	$result = array();	 
	if (mysqli_num_rows($query) > 0)
	{
	    while ($row = mysqli_fetch_assoc($query)){
	        $result[] = $row;
	    }
	}
	 
	die (json_encode($result, JSON_UNESCAPED_UNICODE));

}



 ?>