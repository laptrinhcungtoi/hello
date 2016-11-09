<?php 

// Thiết lập font chữ UTF8 để khỏi bị lỗi font
header('Content-Type: text/html; charset=utf-8');
 
// Kết nối database
$conn = mysqli_connect('localhost', 'root', '12345', 'vnptmap') or die ('Can not connect to mysql');
 
// Lấy danh sách thành viên
$query = mysqli_query($conn, 'SELECT * FROM users');
 
// Biến result
$result = array();
 
if (mysqli_num_rows($query) > 0)
{
    while ($row = mysqli_fetch_assoc($query)){
        $result[] = $row;
    }
    /*
    while ($row = mysqli_fetch_array($query, MYSQL_ASSOC)){
        $result[] = array(
            'id' => $row['id'],
            'username' => $row['username']
        );
    }
    */
}
 
die (json_encode($result));


/*// Kiểm tra có dữ liệu không
if (mysqli_num_rows($query) > 0)
{
    echo '<table border="1" cellspacing="0" cellpadding="10">';
    echo '<tr>';
       echo '<td>';
           echo 'Username';
       echo '</td>';
       echo '<td>';
            echo 'Email';
       echo '</td>';
    echo '<tr>';
     
    // Lặp danh sách và hiển thị dạng table
    while ($row = mysqli_fetch_array($query, MYSQLI_ASSOC)){
          ?>
        <tr>
            <td>
                <?php echo $row['username']; ?>
            </td>
            <td>
                <?php echo $row['email']; ?>
            </td>
        <tr>
        <?php 

    }
    echo '</table>';
}*/

 ?>