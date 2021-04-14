const signButton = document.getElementById('JsProfilButton') //Кнопка показа модального окна профиля
const Modal = document.getElementById('jsProfilModel') //Модальное окно(главный экран)
const DistrictListButton = document.getElementById('JsDistrictListButton') //Кнопка показа модального окна района
const DistrictListModal = document.getElementById('JsDistrictList') //Модальное окно(главный экран)
const footer = document.getElementById('JsFooter') //подвал
const ModalShop = document.getElementById('JsModalShop') //Модальное окно корзины
const MainModel = document.getElementById('JsMainModel') //Главная страница
const ExitProfileButton = document.getElementById('JsExitProfil') //
let ShowMode = true //переменная показа модального окна профиля
let ShowModeDistrictList = true //переменная показа модальногорайона

signButton.addEventListener('click', ShowModelProfile) //вызов функции показа модального окна
DistrictListButton.addEventListener('click', DistrictList) //вызов функции показа модального окна
ExitProfileButton.addEventListener('click', ExitProfil) //вызов функции выхода из профиля


//разное
ModalShop.style.left = document.body.clientWidth * 0.72 + 10 + "px" //Коректировка положения корзины относительно документа


//общие 
document.addEventListener('click', NoShowModle) //вызов функции закрытие модального окна при клике вне модального окна
document.addEventListener('click', NoShowModle2) //вызов функции закрытие модального окна при клике вне модального окна
document.addEventListener('scroll', NoShowModle) //вызов функции закрытие модального окна при клике вне модального окна


//функции
function ShowModelProfile() //функции показа модального окна профеля
{
  if (ShowMode) {
    width = document.body.clientWidth;
    Modal.style.left = signButton.offsetLeft - 210 + 'px'
    Modal.style.top = window.pageYOffset + 60 + 'px'
    Modal.classList.remove('DesktopModalNew_backdropNone')
    ShowMode = false
  } else {
    Modal.classList.add('DesktopModalNew_backdropNone')
    ShowMode = true
  }
}

function DistrictList() //функции показа модального окна района
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
  }
  if ((e.path.includes(Modal) == false && ShowMode == false && e.path.includes(signButton) == false)) {
    Modal.classList.add('DesktopModalNew_backdropNone')
    ShowMode = true
  }
  //  console.log(window.pageYOffset)

  if ((window.pageYOffset + window.innerHeight) >= footer.offsetTop) {
    ModalShop.style.top = (footer.offsetTop - (window.pageYOffset + window.innerHeight)) + "px"

  } else {
    ModalShop.style.top = 0 + "px"
  }
}

function NoShowModle2(e) //функция закрытие модального окна при клике вне модального окна
{
  if ((e.path.includes(Modal) == false && ShowMode == false && e.path.includes(signButton) == false)) {
    Modal.classList.add('DesktopModalNew_backdropNone')
    ShowMode = true
  }
}

function ExitProfil() //функция выхода из профиля 
{
  ajax({
    url: "ExitProfile.php",
    statbox: "status",
    method: "POST",
    data: {},
    success: function (response) {
      var jsonData = JSON.parse(response) //выхода из профиля

      switch (jsonData.success) {
        case 0: {
          document.getElementById('status').style.color = ""
          alert('Ой ошибка. Обновите страницу.');
          break;
        }
        case 1: {
          document.location.href = "/";
          break;
        }
        case 2: {
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