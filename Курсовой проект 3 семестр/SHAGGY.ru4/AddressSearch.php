<?php
include('config.php');
if (isset($_POST['addres']) && $_POST['addres'] && isset($_POST['NumAddress']) && $_POST['NumAddress']) {
    $conn = new mysqli($servername, $NameBD, $PasswordBD, $database); //соединеие с БД
    // Проверяем соединение
    if (!$conn) {
        echo json_encode(array('success' => 'База не подключена'));
        exit();
    }
    $addres = $_POST['addres']; //получение адресса с POST
    $NumAddress = $_POST['NumAddress']; //получение номера дома с POST
    $EntranceAddress = $_POST['EntranceAddress']; //получение подъезда с POST
    $result1 = $conn->query("SELECT * FROM `address` WHERE `title` = '$addres'"); //получение списка домов по адрессу
    if (!$result1) {
        echo json_encode(array('success' => 'Ой такой улицы нет на карте')); //Вывод ошибки
        exit();
    }
    $mass = 0;
    $flag = false;
    while ($rws = mysqli_fetch_assoc($result1)) //Поиск дома в списке домов из БД
    {
        $mass = $rws['id_district'];
        $array = unserialize($rws['strNum']);
        if (in_array($NumAddress, $array)) {
            $flag = true;
            break;
        }
    }
    if (!$flag) {
        echo json_encode(array('success' => 'Ой такой улицы нет на карте')); //Вывод ошибки
    } else {
        setcookie("district", $mass, time() + 60 * 60, "/"); // Ставим куки
        setcookie("address", $addres . ' ' . $NumAddress . ' ' . $EntranceAddress, time() + 60 * 60, "/"); // Ставим куки
        echo json_encode(array('success' => 1)); //Вывод успешной операции
    }
    mysqli_close($conn); //закрытие соединеие с БД
} else {
    echo json_encode(array('success' => 0)); //Вывод ошибки
}
