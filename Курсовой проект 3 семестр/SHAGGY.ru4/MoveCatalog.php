<?php

include('config.php');
    $mysql = new mysqli($servername, $NameBD, $PasswordBD, $database);
    $login=$_POST['id_cataloga'];//получение id группы
    $result1 = $mysql->query("SELECT * FROM `categories`WHERE `id_group` = '$login'");//получения списка категорий по группе
    $mass =[];
    $i=0;
    $flag=false;

    while($rws = mysqli_fetch_assoc($result1)){
        $mass[$i] = $rws;
        $i++;
     }
     echo json_encode(array('success' => $mass ));//вывод массива категорий
