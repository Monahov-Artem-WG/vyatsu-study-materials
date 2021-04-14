//Index.js

//модуль и кнопка входа
const signButton = document.getElementById('jsSignButton') 
const Modal = document.getElementById('JsModalSign')
const Modal2 = document.getElementById('JsModalSign2')
const CloseModal = document.getElementById('JsModalClose')
let ShowMode=true


signButton.addEventListener('click',ShowModelSign)
CloseModal.addEventListener('click',CloseModelSign)
const footer = document.getElementById('JsFooter')
const ModalShop = document.getElementById('JsModalShop')
const MainModel = document.getElementById('JsMainModel')
ModalShop.style.left=  document.body.clientWidth*0.75+10+"px"
// инпуты регистрации
const inputTel= document.getElementById('JsInputTel')
const inputPas= document.getElementById('JsInputPas')
const inputButton= document.getElementsByClassName('JsInputButton')


inputTel.addEventListener('keydown',SignInputTel );
inputPas.addEventListener('keydown',SignInputPass );
inputButton[0].addEventListener('click',AjaxPostAuth)
inputButton[1].addEventListener('click',AjaxPostRegistr)
//модуль и кнопка региона
const DistrictListButton = document.getElementById('JsDistrictListButton') 
const DistrictListModal = document.getElementById('JsDistrictList')
let ShowModeDistrictList=true

DistrictListButton.addEventListener('click',DistrictList)

//общие 
document.addEventListener('click',NoShowModle)
document.addEventListener('click',NoShowModle2)
document.addEventListener('scroll',NoShowModle)


//функции
function ShowModelSign() {
        Modal.classList.add('DesktopModalNew_backdrop')
        Modal.classList.remove('DesktopModalNew_backdropNone')
        ShowMode=false
}

function CloseModelSign() {
    Modal.classList.remove('DesktopModalNew_backdrop')
    Modal.classList.add('DesktopModalNew_backdropNone')
    ShowMode=true
    document.getElementById('status').style.color=''
    document.getElementById('status').innerHTML=""
}

function DistrictList() {
    if(ShowModeDistrictList)
    {
        width = document.body.clientWidth;
        DistrictListModal.style.left=DistrictListButton.offsetLeft-260+'px'
        DistrictListModal.style.top=window.pageYOffset+60+'px'
        DistrictListModal.classList.remove('DesktopModalNew_backdropNone')
        ShowModeDistrictList=false
    }
    else 
    {
        DistrictListModal.classList.add('DesktopModalNew_backdropNone')
        ShowModeDistrictList=true
    }
}

function NoShowModle(e) {
   if ((e.path.includes(DistrictListModal)==false && ShowModeDistrictList==false && e.path.includes(DistrictListButton)==false ))
   {
    DistrictListModal.classList.add('DesktopModalNew_backdropNone')
    ShowModeDistrictList=true
    document.getElementById('status').style.color=''
    document.getElementById('status').innerHTML=""
   }
   if ((window.pageYOffset+window.innerHeight)>=footer.offsetTop){
    ModalShop.style.top=(footer.offsetTop-(window.pageYOffset+window.innerHeight))+"px"
    
   }
   else{
    ModalShop.style.top=0+"px" 
   }
}

function NoShowModle2(e) {
     if ((e.path.includes(Modal2)==false && ShowMode==false && e.path.includes(signButton)==false )){
         Modal.classList.add('DesktopModalNew_backdropNone')
         ShowMode=true}
 }

function SignInputTel(event) {
	if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||(event.keyCode == 65 && event.ctrlKey === true) ||(event.keyCode >= 35 && event.keyCode <= 39)) {
        if ( inputTel.value.length <11){
            inputButton.disabled=true 
            inputButton[0].classList.remove('UIAnimatedButton_yellow') 
            inputButton[1].classList.remove('UIAnimatedButton_yellow')
        }
		return;
	} else {
		if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
			event.preventDefault();
		}
    }
    if ( inputTel.value.length >9){
        event.preventDefault();
    } else{
        if (inputTel.value.length==9 && inputPas.value.length >=6) { 
            inputButton[0].disabled=false
            inputButton[1].disabled=false  
            inputButton[0].classList.add('UIAnimatedButton_yellow')
            inputButton[1].classList.add('UIAnimatedButton_yellow') 
        }else {
            inputButton[0].disabled=true 
            inputButton[1].disabled=true 
            inputButton[0].classList.remove('UIAnimatedButton_yellow') 
            inputButton[1].classList.remove('UIAnimatedButton_yellow') 
        }
    }
}


function SignInputPass (event) {
    if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||(event.keyCode == 65 && event.ctrlKey === true) ||(event.keyCode >= 35 && event.keyCode <= 39)||event.keyCode == 32) {
        if (event.keyCode == 32)
        {
            event.preventDefault();
        }
        
        
        if ( inputPas.value.length <6)
        {
            inputButton[0].disabled=true 
            inputButton[1].disabled=true  
            inputButton[0].classList.remove('UIAnimatedButton_yellow') 
            inputButton[1].classList.remove('UIAnimatedButton_yellow')
        }else{
            inputButton[0].disabled=false
            inputButton[1].disabled=false  
            inputButton[0].classList.add('UIAnimatedButton_yellow')
            inputButton[1].classList.add('UIAnimatedButton_yellow')  
        }
		return;
    } else if ( inputPas.value.length >4 && inputTel.value.length==10)
    {
        inputButton[0].disabled=false
        inputButton[1].disabled=false  
        inputButton[0].classList.add('UIAnimatedButton_yellow')
        inputButton[1].classList.add('UIAnimatedButton_yellow')  
    }else 
    {
        inputButton[0].disabled=true 
        inputButton[1].disabled=true 
        inputButton[0].classList.remove('UIAnimatedButton_yellow') 
        inputButton[1].classList.remove('UIAnimatedButton_yellow') 
    }
}

function AjaxPostAuth(e) {
    ajax({
    url:"Auth.php",
    statbox:"status",
    method:"POST",
    data:
    {
        Tel:inputTel.value,
        pass:inputPas.value
     },
    success:function(response)
    {
        var jsonData = JSON.parse(response);

        // user is logged in successfully in the back-end
        // let's redirect
        switch(jsonData.success) {
            case 0: {
                document.getElementById('status').style.color=""
                alert('Ой ошибка. Обновите страницу.');
              break;
            }
            case 1: {
                document.getElementById('status').style.color="green"
                document.getElementById('status').innerHTML='Добро пожаловать'
                document.location.href = "/";
              break;
            }
            case 2: {
                document.getElementById('status').style.color=""
                document.getElementById('status').innerHTML='Ой вы где-то ошиблись. Проверьте данные.'
              break;
            }
            default:{
                document.getElementById('status').style.color=""
                document.getElementById('status').innerHTML='Ошибка на серевере.'
                break
            }
          }
   }
})
}

function AjaxPostRegistr(e) {
    
    ajax({
    url:"Registr.php",
    statbox:"status",
    method:"POST",
    data:
    {
        Tel:inputTel.value,
        pass:inputPas.value
    },
    success:function(response)
    {
        var jsonData = JSON.parse(response);

        // user is logged in successfully in the back-end
        // let's redire
        switch(jsonData.success) {
            case 0: {
                document.getElementById('status').style.color=""
                alert('Ой ошибка. Обновите страницу.');
              break;
            }
            case 1: {
                document.getElementById('status').style.color="green"
                document.getElementById('status').innerHTML='Ура!! Новый пользователь.'
              break;
            }
            case 2: {
                document.getElementById('status').style.color=""
                document.getElementById('status').innerHTML='Данный логин уже используется!'
              break;
            }
          }
   }
})
}




//AJAX-запросы

function XmlHttp()
{
var xmlhttp;
try{xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");}
catch(e)
{
 try {xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");} 
 catch (E) {xmlhttp = false;}
}
if (!xmlhttp && typeof XMLHttpRequest!='undefined')
{
 xmlhttp = new XMLHttpRequest();
}
  return xmlhttp;
}
 
function ajax(param)
{
                if (window.XMLHttpRequest) req = new XmlHttp();
                method=(!param.method ? "POST" : param.method.toUpperCase());
 
                if(method=="GET")
                {
                               send=null;
                               param.url=param.url+"&ajax=true";
                }
                else
                {
                               send="";
                               for (var i in param.data) send+= i+"="+param.data[i]+"&";
                               send=send+"ajax=true";
                }
 
                req.open(method, param.url, true);
                req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                req.send(send);
                req.onreadystatechange = function()
                {
                               if (req.readyState == 4 && req.status == 200) //если ответ положительный
                               {
                                               if(param.success)param.success(req.responseText);
                               }
                }
}

