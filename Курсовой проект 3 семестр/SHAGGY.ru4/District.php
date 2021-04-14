<?

include('config.php');
    $mysql = new mysqli($servername, $NameBD, $PasswordBD, $database);
    $result1 = $mysql->query("SELECT * FROM `district`");//получение списка районов
    $row=array(0,1,2,3);
    for ($i = 0 ; $i < 4; ++$i)
    {
        $row[$i] =  $result1->fetch_assoc();
  
    }
     echo json_encode(array('success' => $row ));//вывод массива районов


?>