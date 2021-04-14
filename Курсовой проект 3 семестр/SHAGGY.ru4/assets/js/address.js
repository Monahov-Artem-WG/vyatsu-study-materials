//модуль и кнопка входа
const AddressButton = document.getElementById('JsButtonAddress') //Кнопка показа модального окна ввода адреса
const ModalAddress = document.getElementById('JsModalAddress') //Модальное окно(весь экран)
const ModalAddress2 = document.getElementById('JsModalAddress2') //Модальное окно(Основное окно)
const CloseModalAddress = document.getElementById('JsModalAddressClose') //Кнопка закрытие модального окна ввода адреса
const InputAddressButton = document.getElementById('JsInputAddressButton') //Кнопка отправки данных на сервер
const InputAddress = document.getElementById('JsInputAddress') //Текстовое поле ввода адресса
const InputNumAddress = document.getElementById('JsInputNumAddress') //Текстовое поле ввода номера дома
const InputEntranceAddress = document.getElementById('JsInputEntranceAddress') //Текстовое поле ввода подъезда

let ShowModeAddress = true //переменная показа модального окна

//вызов определенных функций
AddressButton.addEventListener('click', ShowModelAddress) //вызов функции показа модального окна
CloseModalAddress.addEventListener('click', CloseModelAddress) //вызов функции закрытие модального окна

InputAddress.addEventListener('keydown', InputAddressFunct) //вызов функции обработки текстового поля 
InputNumAddress.addEventListener('keydown', InputAddressFunct) //вызов функции обработки текстового поля 
InputEntranceAddress.addEventListener('keydown', InputAddressFunct) //вызов функции обработки текстового поля 
InputAddressButton.addEventListener('click', AddresSearch) //вызов функции отправки данных

document.addEventListener('click', NoShowModleAddress) //вызов функции закрытие модального окна при клике вне модального окна


//функции

function ShowModelAddress() //функция показа модального окна
{
    ModalAddress.classList.add('DesktopModalNew_backdrop')
    ModalAddress.classList.remove('DesktopModalNew_backdropNone')
    ShowModeAddress = false
}

function CloseModelAddress() //функция закрытия модального окна
{
    ModalAddress.classList.remove('DesktopModalNew_backdrop')
    ModalAddress.classList.add('DesktopModalNew_backdropNone')
    ShowModeAddress = true
}

function InputAddressFunct(event) //функция обработки текстового поля 
{
    if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
        if (event.keyCode == 32) {
            event.preventDefault();
        }
        if (InputAddress.value.length < 6 || InputNumAddress.value.length == 0) {
            InputAddressButton.disabled = true
            InputAddressButton.classList.remove('UIAnimatedButton_yellow')
        }
        return;
    } else if (InputAddress.value.length > 3 && InputNumAddress.value.length >= 0) {
        InputAddressButton.disabled = false
        InputAddressButton.classList.add('UIAnimatedButton_yellow')
    } else {
        InputAddressButton.disabled = true
        InputAddressButton.classList.remove('UIAnimatedButton_yellow')
    }
}

function NoShowModleAddress(e) //функция закрытие модального окна при клике вне модального окна
{

    if ((e.path.includes(ModalAddress2) == false && ShowModeAddress == false && e.path.includes(AddressButton) == false)) {
        ModalAddress.classList.add('DesktopModalNew_backdropNone')
        ShowModeAddress = true
    }
}

function AddresSearch() //функция отправки данных на сервер и получения данных с него
{
    {
        ajax
            ({
                url: "AddressSearch.php",
                statbox: "status",
                method: "POST",
                data: {
                    addres: InputAddress.value,
                    NumAddress: InputNumAddress.value,
                    EntranceAddress: InputEntranceAddress.value,

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
                            ModalAddress.classList.remove('DesktopModalNew_backdrop')
                            ModalAddress.classList.add('DesktopModalNew_backdropNone')
                            ShowModeAddress = true
                            document.location.href = "/";
                            break;
                        }
                        case 2: {
                            document.getElementById('statusAddress').style.color = ""
                            document.getElementById('statusAddress').innerHTML = "Ой такой улицы"
                            break;
                        }
                        default: {
                            document.getElementById('statusAddress').style.color = ""
                            document.getElementById('statusAddress').innerHTML = jsonData.success
                            break
                        }
                    }
                }
            })
    }
}


//Функции вызываемые сразу после загрузки файла
ShowModelAddress()