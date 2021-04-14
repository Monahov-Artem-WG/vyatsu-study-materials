<?php
include('config.php');
if (isset($_POST['Tel']) && $_POST['Tel'] && isset($_POST['pass']) && $_POST['pass']) {
    $login = filter_var(trim($_POST['Tel']), FILTER_SANITIZE_STRING); //получение телефона с POST
    $pass = filter_var(trim($_POST['pass']), FILTER_SANITIZE_STRING); //получение пароль с POST
    $mysql = new mysqli($servername, $NameBD, $PasswordBD, $database); //соединеие с БД
    $result1 = $mysql->query("SELECT * FROM `user` WHERE `Tel` = '$login'"); //поиск существующего пользователя в БД
    $data = $result1->fetch_assoc();
    if ($data['pass'] === md5($pass . $hash)) //Если пароль совподает с паролем в БД то авторизируем пользователя
    {
        setcookie("id", $data['Tel'], time() + 60 * 60, "/"); // Ставим куки
        mysqli_close($mysql); //закрытие соединеие с БД
        echo json_encode(array('success' => 1)); //Вывод успешной операции
        exit();
    } else {
        echo json_encode(array('success' => 2)); //Вывод ошибки 
    }
} else {
    echo json_encode(array('success' => 0)); //Вывод ошибки 
}
