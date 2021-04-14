<?php

include('config.php');
$mysql = new mysqli($servername, $NameBD, $PasswordBD, $database);
$result1 = $mysql->query("SELECT * FROM `group`"); //получение списка группы
$row = array(0, 1, 2, 3);
$mass = [];
$i = 0;
$flag = false;

while ($rws = mysqli_fetch_assoc($result1)) {
  $mass[$i] = $rws['Name'];
  $i++;
}
echo json_encode(array('FillGroup' => $mass));//вывод массива группы
