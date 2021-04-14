<?php
include('config.php');

$order = json_decode($_POST['orders']); //Получение списка id товаров
$order2 = json_decode($_POST['orders2']); //Получение списка количества товаров
$mysql = new mysqli($servername, $NameBD, $PasswordBD, $database); //соединеие с БД
$price = 0;
$list = [];
$result1 = $mysql->query("SELECT * FROM `goods`"); //получение полного списка товаров с бд
$dist = $_COOKIE['district'];
$dist = "district_$dist";
$result2 = $mysql->query("SELECT * FROM `$dist`"); //получение количества товаров в районе с бд
$mass = [];
$i = 0;
while ($rws = mysqli_fetch_assoc($result1)) {
    $mass[$i] = $rws;
    $i++;
}
$mass2 = [];
$i = 0;
while ($rws = mysqli_fetch_assoc($result2)) {
    $mass2[$i] = $rws['Count'];
    $i++;
}
for ($i = 0; $i < count($order); $i++) //создание заказа и обновление данных в бд
{
    $price = $price + $mass[$order[$i]]['price'] * $order2[$i];
    $list[$i]['Id'] = $order[$i];
    $list[$i]['Count'] = $order2[$i];
    $Rznos = $mass2[$i] - $order2[$i];
    $ff2 = $order[$i];
    $result4 = $mysql->query("UPDATE `$dist` SET `id_goods`=$ff2,`Count`=$Rznos WHERE `id_goods`=$ff2");
}
$list2 = serialize($list);
$order2 = serialize($order2);
//$price=\$price;
$address = $_COOKIE['address'];
$id = $_COOKIE['id'];
$result3 = $mysql->query("INSERT INTO `orders`(`address`, `tel`, `list`, `price`) VALUES('$address','$id','$list2','$price')"); //создание записи заказа в БД
setcookie("district", '', time() - 60 * 60, "/"); //удаление куки
setcookie("address", '', time() - 60 * 60, "/"); //удаление куки
header('Location:/');

mysqli_close($mysql);//закрытие соединеие с БД
