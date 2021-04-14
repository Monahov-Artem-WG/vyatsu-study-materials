//IndexAuth.js

//модуль и кнопка входа
const signButton = document.getElementById('JsProfilButton') 
const Modal = document.getElementById('jsProfilModel')
let ShowMode=true


signButton.addEventListener('click',ShowModelSign)

//модуль и кнопка региона
const DistrictListButton = document.getElementById('JsDistrictListButton') 
const DistrictListModal = document.getElementById('JsDistrictList')
let ShowModeDistrictList=true

DistrictListButton.addEventListener('click',DistrictList)

const footer = document.getElementById('JsFooter')
const ModalShop = document.getElementById('JsModalShop')
const MainModel = document.getElementById('JsMainModel')
ModalShop.style.left=  document.body.clientWidth*0.72+10+"px"

//Профиль 
const ExitProfileButton = document.getElementById('JsExitProfil')
ExitProfileButton.addEventListener('click',ExitProfil)
//общие 
document.addEventListener('click',NoShowModle)
document.addEventListener('click',NoShowModle2)
document.addEventListener('scroll',NoShowModle)


//функции
function ShowModelSign() {
  if(ShowMode)
  {
      width = document.body.clientWidth;
      Modal.style.left=signButton.offsetLeft-210+'px'
      Modal.style.top=window.pageYOffset+60+'px'
      Modal.classList.remove('DesktopModalNew_backdropNone')
      ShowMode=false
  }
  else 
  {
    Modal.classList.add('DesktopModalNew_backdropNone')
    ShowMode=true
  }
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
   }
   if ((e.path.includes(Modal)==false && ShowMode==false && e.path.includes(signButton)==false ))
   {
    Modal.classList.add('DesktopModalNew_backdropNone')
    ShowMode=true
   }
  //  console.log(window.pageYOffset)

   if ((window.pageYOffset+window.innerHeight)>=footer.offsetTop){
    ModalShop.style.top=(footer.offsetTop-(window.pageYOffset+window.innerHeight))+"px"
    
   } else{
    ModalShop.style.top=0+"px" 
   }
}

function NoShowModle2(e) {
     if ((e.path.includes(Modal)==false && ShowMode==false && e.path.includes(signButton)==false )){
         Modal.classList.add('DesktopModalNew_backdropNone')
         ShowMode=true}
 }

 function ExitProfil() {
  ajax({
    url:"ExitProfile.php",
    statbox:"status",
    method:"POST",
    data:
    {
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
                document.location.href = "/";
              break;
            }
            case 2: {
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

