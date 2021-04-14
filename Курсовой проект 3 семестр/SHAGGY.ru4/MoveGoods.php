<?php

include('config.php');
$mysql = new mysqli($servername, $NameBD, $PasswordBD, $database);
$login = $_POST['id_goods']; //получение id категории

if ($_COOKIE['district']) //Если района нет то показывает товары первого района
{
    $dist = $_COOKIE['district'];
    $dist = "district_$dist";
    $result2 = $mysql->query("SELECT * FROM `$dist`");
} else {
    $result2 = $mysql->query("SELECT * FROM `district_0`");
}
if ($login == -1) //Если выбраны все товары вывод всех товаров, иначе ток определой категории 
{
    $result1 = $mysql->query("SELECT * FROM `goods`");
} else {
    $result1 = $mysql->query("SELECT * FROM `goods`WHERE `id_categories` = '$login'");
}
$mass = [];
$i = 0;
$j = 0;
while ($rws = mysqli_fetch_assoc($result1)) {
    $mass[$i] = $rws;
    $i++;
}
$i = 0;

while ($rws = mysqli_fetch_assoc($result2)) //Соотношение количества товаров в районе с товароми
{
    if ($rws['id_goods'] == $mass[$i]['id_good']) {
        $mass[$i]['countGoods'] = $rws['Count'];
        $i++;
    }
}
echo json_encode(array('success' => $mass));//вывод массива товаров 
