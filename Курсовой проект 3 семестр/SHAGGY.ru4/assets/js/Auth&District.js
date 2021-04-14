//модуль 
const signButton = document.getElementById('jsSignButton') //Кнопка показа модального окна регистрации/авторизации
const Modal = document.getElementById('JsModalSign') //Модальное окно(весь экран)
const Modal2 = document.getElementById('JsModalSign2') //Модальное окно(Основное окно)
const CloseModal = document.getElementById('JsModalClose') //Кнопка закрытие модального окна регистрации/авторизации
const footer = document.getElementById('JsFooter') //подвал
const ModalShop = document.getElementById('JsModalShop') //Модальное окно корзины
const DistrictListButton = document.getElementById('JsDistrictListButton') //Кнопка показа модального окна района 
const DistrictListModal = document.getElementById('JsDistrictList') //Модальное окно(Основное окно)
const inputTel = document.getElementById('JsInputTel') //Текстовое поле ввода телефона
const inputPas = document.getElementById('JsInputPas') //Текстовое поле ввода пароля
const inputButton = document.getElementsByClassName('JsInputButton') //кнопка отправки данных на сервер

let ShowMode = true //переменная показа модального окна регистрации/авторизации
let ShowModeDistrictList = true //переменная показа модального окна района 


//вызов определенных функций
signButton.addEventListener('click', ShowModelSign) //вызов функции показа модального окна
CloseModal.addEventListener('click', CloseModelSign) //вызов функции закрытие модального окна
inputTel.addEventListener('keydown', SignInputTel) //вызов функции обработки текстового поля
inputPas.addEventListener('keydown', SignInputPass) //вызов функции обработки текстового поля
inputButton[0].addEventListener('click', AjaxPostAuth) //вызов функции отправки данных для авторизации
inputButton[1].addEventListener('click', AjaxPostRegistr) //вызов функции отправки данных для регистрации
DistrictListButton.addEventListener('click', DistrictList) //вызов функции показа модального окна района


//разное
ModalShop.style.left = document.body.clientWidth * 0.75 + 10 + "px" //Коректировка положения корзины относительно документа


//общие 
document.addEventListener('click', NoShowModle) //вызов функции закрытие модального окна при клике вне модального окна
document.addEventListener('click', NoShowModle2) //вызов функции закрытие модального окна при клике вне модального окна
document.addEventListener('scroll', NoShowModle) //вызов функции закрытие модального окна при клике вне модального окна


//функции
function ShowModelSign() //функция показа модального окна
{
    Modal.classList.add('DesktopModalNew_backdrop')
    Modal.classList.remove('DesktopModalNew_backdropNone')
    ShowMode = false
}

function CloseModelSign() //функция закрытие модального окна
{
    Modal.classList.remove('DesktopModalNew_backdrop')
    Modal.classList.add('DesktopModalNew_backdropNone')
    ShowMode = true
    document.getElementById('status').style.color = ''
    document.getElementById('status').innerHTML = ""
}

function DistrictList() //функция показа модального окна района
{
    if (ShowModeDistrictList) {
        width = document.body.clientWidth;
        DistrictListModal.style.left = DistrictListButton.offsetLeft - 260 + 'px'
        DistrictListModal.style.top = window.pageYOffset + 60 + 'px'
        DistrictListModal.classList.remove('DesktopModalNew_backdropNone')
        ShowModeDistrictList = false
    } else {
        DistrictListModal.classList.add('DesktopModalNew_backdropNone')
        ShowModeDistrictList = true
    }
}

function NoShowModle(e) //функция закрытие модального окна при клике вне модального окна
{
    if ((e.path.includes(DistrictListModal) == false && ShowModeDistrictList == false && e.path.includes(DistrictListButton) == false)) {
        DistrictListModal.classList.add('DesktopModalNew_backdropNone')
        ShowModeDistrictList = true
        document.getElementById('status').style.color = ''
        document.getElementById('status').innerHTML = ""
    }
    if ((window.pageYOffset + window.innerHeight) >= footer.offsetTop) {
        ModalShop.style.top = (footer.offsetTop - (window.pageYOffset + window.innerHeight)) + "px"

    } else {
        ModalShop.style.top = 0 + "px"
    }
}

function NoShowModle2(e) //функция закрытие модального окна при клике вне модального окна 
{
    if ((e.path.includes(Modal2) == false && ShowMode == false && e.path.includes(signButton) == false)) {
        Modal.classList.add('DesktopModalNew_backdropNone')
        ShowMode = true
    }
}

function SignInputTel(event) //функция обработки текстового поля 
{
    if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
        if (inputTel.value.length < 11) {
            inputButton.disabled = true
            inputButton[0].classList.remove('UIAnimatedButton_yellow')
            inputButton[1].classList.remove('UIAnimatedButton_yellow')
        }
        return;
    } else {
        if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
            event.preventDefault();
        }
    }
    if (inputTel.value.length > 9) {
        event.preventDefault();
    } else {
        if (inputTel.value.length == 9 && inputPas.value.length >= 6) {
            inputButton[0].disabled = false
            inputButton[1].disabled = false
            inputButton[0].classList.add('UIAnimatedButton_yellow')
            inputButton[1].classList.add('UIAnimatedButton_yellow')
        } else {
            inputButton[0].disabled = true
            inputButton[1].disabled = true
            inputButton[0].classList.remove('UIAnimatedButton_yellow')
            inputButton[1].classList.remove('UIAnimatedButton_yellow')
        }
    }
}


function SignInputPass(event) //функции обработки текстового поля
{
    if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39) || event.keyCode == 32) {
        if (event.keyCode == 32) {
            event.preventDefault();
        }


        if (inputPas.value.length < 6) {
            inputButton[0].disabled = true
            inputButton[1].disabled = true
            inputButton[0].classList.remove('UIAnimatedButton_yellow')
            inputButton[1].classList.remove('UIAnimatedButton_yellow')
        } else {
            inputButton[0].disabled = false
            inputButton[1].disabled = false
            inputButton[0].classList.add('UIAnimatedButton_yellow')
            inputButton[1].classList.add('UIAnimatedButton_yellow')
        }
        return;
    } else if (inputPas.value.length > 4 && inputTel.value.length == 10) {
        inputButton[0].disabled = false
        inputButton[1].disabled = false
        inputButton[0].classList.add('UIAnimatedButton_yellow')
        inputButton[1].classList.add('UIAnimatedButton_yellow')
    } else {
        inputButton[0].disabled = true
        inputButton[1].disabled = true
        inputButton[0].classList.remove('UIAnimatedButton_yellow')
        inputButton[1].classList.remove('UIAnimatedButton_yellow')
    }
}

function AjaxPostAuth(e) //функция отправки данных для авторизации 
{
    ajax({
        url: "Auth.php",
        statbox: "status",
        method: "POST",
        data: {
            Tel: inputTel.value,
            pass: inputPas.value
        },
        success: function (response) {
            var jsonData = JSON.parse(response) //оброботка информации и вывод ошибки
            switch (jsonData.success) {
                case 0: {
                    document.getElementById('status').style.color = ""
                    alert('Ой ошибка. Обновите страницу.');
                    break;
                }
                case 1: {
                    document.getElementById('status').style.color = "green"
                    document.getElementById('status').innerHTML = 'Добро пожаловать'
                    document.location.href = "/";
                    break;
                }
                case 2: {
                    document.getElementById('status').style.color = ""
                    document.getElementById('status').innerHTML = 'Ой вы где-то ошиблись. Проверьте данные.'
                    break;
                }
                default: {
                    document.getElementById('status').style.color = ""
                    document.getElementById('status').innerHTML = 'Ошибка на серевере.'
                    break
                }
            }
        }
    })
}

function AjaxPostRegistr(e) //функция отправки данных для регистрации 
{

    ajax({
        url: "Registr.php",
        statbox: "status",
        method: "POST",
        data: {
            Tel: inputTel.value,
            pass: inputPas.value
        },
        success: function (response) {
            var jsonData = JSON.parse(response) //выхода из профиля

            // user is logged in successfully in the back-end
            // let's redire
            switch (jsonData.success) {
                case 0: {
                    document.getElementById('status').style.color = ""
                    alert('Ой ошибка. Обновите страницу.');
                    break;
                }
                case 1: {
                    document.getElementById('status').style.color = "green"
                    document.getElementById('status').innerHTML = 'Ура!! Новый пользователь.'
                    break;
                }
                case 2: {
                    document.getElementById('status').style.color = ""
                    document.getElementById('status').innerHTML = 'Данный логин уже используется!'
                    break;
                }
            }
        }
    })
}


//AJAX-запросы
function XmlHttp() {
    var xmlhttp;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

function ajax(param) {
    if (window.XMLHttpRequest) req = new XmlHttp();
    method = (!param.method ? "POST" : param.method.toUpperCase());

    if (method == "GET") {
        send = null;
        param.url = param.url + "&ajax=true";
    } else {
        send = "";
        for (var i in param.data) send += i + "=" + param.data[i] + "&";
        send = send + "ajax=true";
    }

    req.open(method, param.url, true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send(send);
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) //если ответ положительный
        {
            if (param.success) param.success(req.responseText);
        }
    }
}