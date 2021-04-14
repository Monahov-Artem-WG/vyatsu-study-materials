<?php
include('config.php');
if (isset($_POST['Tel']) && $_POST['Tel'] && isset($_POST['pass']) && $_POST['pass']) {
    $conn = new mysqli($servername, $NameBD, $PasswordBD, $database); //соединеие с БД
    // Проверяем соединение
    if (!$conn) {
        echo json_encode(array('success' => 'База не подключена'));
        exit();
    }
    $login = $_POST['Tel']; //получение телефона с POST
    $pass = $_POST['pass']; //получение пароль с POST
    $pass = md5($pass . $hash); //Хеширофание пароля
    $result1 = $conn->query("SELECT * FROM `user` WHERE `Tel` = '$login'"); //поиск существующего пользователя в БД
    $user1 = $result1->fetch_assoc(); // Конвертируем в массив
    if (!empty($user1)) //Елси есть то вывод ошибки и выход
    {
        echo json_encode(array('success' => 2));
        exit();
    }
    $result1 = $conn->query("INSERT INTO user (`Name`,SurName,Tel,Email,pass) VALUES('', '','$login', '','$pass')"); //Создание записи в БД
    echo json_encode(array('success' => 1)); //Вывод успешной операции
    mysqli_close($conn); //закрытие соединеие с БД
} else {
    echo json_encode(array('success' => 0));
}
