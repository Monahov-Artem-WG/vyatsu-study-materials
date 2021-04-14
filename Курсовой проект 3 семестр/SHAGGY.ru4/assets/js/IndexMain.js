const ListDistrict = document.getElementById('JsListDistrict') //Блок списока районов
const ListCatalog = document.getElementById('JsFillCategories') //Блок списока каталогов
const ListGroup = document.getElementById('JsFillGroup') //Блок списока групп
const ListGoods = document.getElementById('JsMenuCategory') //Блок списока продуктов
let listCategories = document.getElementsByClassName('RestaurantPageNavigationBar_category') //список каталогов
let listGroup = document.getElementsByClassName('DesktopCatalogPageFilters_link') //список групп
let MoveCatalog = document.getElementById('JsMoveCatalog') //Блок показа списока каталога
let lastElementGroupActiv = 0 //Последний активный элемента группы
let lastElementCategoriesActiv = 0 //Последний активный элемента каталога
let randomflag = true //активация первой категории
let AppCart = document.getElementById('JsAppCart') //Корзина
let ShopButton = document.getElementById('JsShopButton') //Кнопка отправки данных на сервер
let ClearShop = document.getElementById('JsClearShop') //Кнопка очистки корзины
let arrayff = new Map() //


if (ShopButton) ShopButton.addEventListener('click', AddOrder) //Вызов функции отправки корзины на сервер
ClearShop.addEventListener('click', function (e) {
  localStorage.removeItem('cart');
  ElemntCart()
  let Goodss = document.getElementsByClassName('RestaurantPageMenuItem_root')
  for (let items in Goodss) {
    Goodss[items].classList.remove('RestaurantPageMenuItem_inCart')

  }
}) //Вызов функции очистки корзины 

function ElemntGoods(Goods, i) //Функция создания елемента продукта в документе
{
  let div1 = document.createElement('div')
  if (get_cookie('address') && get_cookie('id')) {
    div1.setAttribute('onclick', 'PushShop(' + Goods.id_good + ',0' + ')');
  } else {
    div1.setAttribute('onclick', 'moveadsress()')
  }
  let div2 = document.createElement('div')
  let div3 = document.createElement('div')
  let div4 = document.createElement('div')
  let div5 = document.createElement('div')
  let div6 = document.createElement('div')
  let div7 = document.createElement('div')
  let div8 = document.createElement('div')
  let div9 = document.createElement('div')
  let div10 = document.createElement('div')
  let div11 = document.createElement('div')
  let h3 = document.createElement('h3')

  div1.classList.add('RestaurantPageMenuCategory_item')
  div2.classList.add('RestaurantPageMenuCategory_itemWrapper')
  div3.classList.add('RestaurantPageMenuItem_root')
  var cartData = getCartData() || {}
  if (cartData.hasOwnProperty(Goods.id_good)) {
    div3.classList.add("RestaurantPageMenuItem_inCart")

  }
  div4.classList.add('RestaurantPageMenuItem_topLine')
  div5.classList.add('RestaurantPageMenuItem_pictureContainer')

  div6.classList.add('RestaurantPageMenuItem_priceWrapper')
  div7.classList.add('UILoader_root')
  div8.classList.add('UILoader_content')
  div9.classList.add('RestaurantPageMenuItem_priceAndCountWrapper')
  let span = document.createElement('span')
  span.classList.add('RestaurantPageMenuItem_price')
  span.innerHTML = Goods.price + ' ₽'
  let span2 = document.createElement('span')
  span2.classList.add('AppCartItem_weight')
  let count = Goods.countGoods
  if (count > 100) {
    count = "99+"
  }
  span2.innerHTML = "На складе: " + count
  span2.style.marginRight = "20px"
  div9.appendChild(span2)
  div9.appendChild(span)
  div8.appendChild(div9)
  div7.appendChild(div8)
  div6.appendChild(div7)
  h3.classList.add('RestaurantPageMenuItem_title')
  h3.innerHTML = Goods.Name
  div4.appendChild(div6)
  div4.appendChild(h3)

  div10.classList.add('UIMagicalImage_root')
  div10.classList.add('RestaurantPageMenuItem_picture')
  div10.classList.add('UIMagicalImage_loaded')
  div11.classList.add('UIMagicalImage_image')
  div11.classList.add('RestaurantPageMenuItem_pictureImage')
  div11.style.backgroundImage = 'url(' + Goods.url_img + ')'
  div10.appendChild(div11)
  div5.appendChild(div10)

  div3.appendChild(div4)
  div3.appendChild(div5)
  div2.appendChild(div3)

  div1.appendChild(div2)
  return div1;
}

function moveadsress() //показ модальных окон регистрации/адреса  
{
  if (!get_cookie('id')) {
    document.getElementById('JsModalSign').classList.add('DesktopModalNew_backdrop')
    document.getElementById('JsModalSign').classList.remove('DesktopModalNew_backdropNone')
  }
  if (!get_cookie('address')) {
    document.getElementById('JsModalAddress').classList.add('DesktopModalNew_backdrop')
    document.getElementById('JsModalAddress').classList.remove('DesktopModalNew_backdropNone')
  }
}

function ajaxGoods(id) // Функция получения продуктов с сервера и вывод их на страницу
{
  ajax({
    url: "MoveGoods.php",
    statbox: "status",
    method: "POST",
    async: false,
    data: {
      id_goods: id
    },
    success: function (response) {
      var jsonData = JSON.parse(response)
      let ArrayListCatalog = jsonData.success
      ListGoods.innerHTML = ""
      for (let i = 0; i < ArrayListCatalog.length; i++) {
        ListGoods.appendChild(ElemntGoods(ArrayListCatalog[i], i))
      }
    }
  })
}

function ElemntList(Name) //???
{
  var div = document.createElement('div');
  div.classList.add('UIPopupList_option')
  div.innerHTML = Name
  return div;
}



function ElemntGroup(Name, id_group) //Функция создания елемента группы в документе
{

  var li = document.createElement('li');
  li.classList.add('DesktopCatalogPageFilters_item')

  var a = document.createElement('div');
  a.classList.add('DesktopCatalogPageFilters_link')
  a.setAttribute('onclick', ' GroupProc(' + id_group + ')');
  if (id_group == null) {
    a.classList.add('DesktopCatalogPageFilters_active')
  }
  a.innerHTML = Name
  li.appendChild(a)
  return li;
}


function AjaxPostDistrict(e) //Функция получения районов с сервара и вывод их на страницу
{

  ajax({
    url: "FillGroup.php",
    statbox: "status2",
    method: "POST",
    async: false,
    data: {},
    FillGroup: function (response) {
      var jsonData = JSON.parse(response);


      let ArrayListGroup = jsonData.FillGroup
      document.getElementById('JsMoveCatalog').classList.add('DesktopModalNew_backdropNone')
      ListGroup.appendChild(ElemntGroup('Все', null))
      for (let i = 0; i < ArrayListGroup.length; i++) {
        ListGroup.appendChild(ElemntGroup(ArrayListGroup[i], i + 1))
      }
      ajax({
        url: "District.php",
        statbox: "status",
        method: "POST",
        async: false,
        data: {},
        success: function (response) {
          var jsonData = JSON.parse(response)
          let ArrayListDistrict = jsonData.success
          ListDistrict.appendChild(ElemntList(ArrayListDistrict[0].Name))
          ListDistrict.appendChild(ElemntList(ArrayListDistrict[1].Name))
          ListDistrict.appendChild(ElemntList(ArrayListDistrict[2].Name))
          ListDistrict.appendChild(ElemntList(ArrayListDistrict[3].Name))
          let y = get_cookie("district")
          if (!(y == null)) {
            document.getElementById('JsDistrictListButton').innerHTML = document.getElementsByClassName('UIPopupList_option')[y].innerHTML
          }
          ajaxGoods(-1)
        }
      })
    }
  })
}

function get_cookie(cookie_name) //Функция получения определеного куки
{
  var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');

  if (results)
    return (unescape(results[2]));
  else
    return null;
}



function ElemntCategories(Name, id_group, i) //Функция создания елемента категории в документе
{

  var li = document.createElement('li');
  li.classList.add('RestaurantPageNavigationBar_category')
  li.setAttribute('onclick', ' CatalogProc(' + i + ')');
  li.setAttribute('data-categories', id_group);
  if (randomflag) {
    li.classList.add('RestaurantPageNavigationBar_categorySelected')
    randomflag = false
  }
  li.innerHTML = Name
  return li;
}


function GroupProc(id) //Функция загрузки категории по группе
{
  listGroup[lastElementGroupActiv].classList.remove('DesktopCatalogPageFilters_active')
  if (id == null) {
    listGroup[0].classList.add('DesktopCatalogPageFilters_active')
    lastElementGroupActiv = 0
    MoveCatalog.classList.add('DesktopModalNew_backdropNone')
    ajaxGoods(-1)
  } else {
    listGroup[id].classList.add('DesktopCatalogPageFilters_active')
    lastElementGroupActiv = id
    MoveCatalog.classList.remove('DesktopModalNew_backdropNone')
    ajax({
      url: "MoveCatalog.php",
      statbox: "status",
      method: "POST",
      async: false,
      data: {
        id_cataloga: id
      },
      success: function (response) {
        var jsonData = JSON.parse(response)
        let ArrayListCatalog = jsonData.success
        ListCatalog.innerHTML = ""
        randomflag = true
        lastElementCategoriesActiv = 0
        ajaxGoods(ArrayListCatalog[0].Id)
        for (let i = 0; i < ArrayListCatalog.length; i++) {
          ListCatalog.appendChild(ElemntCategories(ArrayListCatalog[i].Name, ArrayListCatalog[i].Id, i))
        }
      }
    })
  }
}


function CatalogProc(id) //Функция загрузки товаров по категории
{
  listCategories[lastElementCategoriesActiv].classList.remove('RestaurantPageNavigationBar_categorySelected')

  listCategories[id].classList.add('RestaurantPageNavigationBar_categorySelected')
  lastElementCategoriesActiv = id
  MoveCatalog.classList.remove('RestaurantPageNavigationBar_categorySelected')
  ajaxGoods(listCategories[lastElementCategoriesActiv].getAttribute('data-categories'))
}

function getCartData() // Получаем данные из LocalStorage 
{
  return JSON.parse(localStorage.getItem('cart'));
}

function setCartData(o) // Записываем данные в LocalStorage
{
  localStorage.setItem('cart', JSON.stringify(o));
  return false;
}

function remove() //Функция очистки корзины
{
  AppCart.innerHTML = 'Выберите продукты и добавьте их к заказу'
  AppCart.classList.add('AppCart_emptyCart')
  AppCart.classList.remove('AppCart_orderInfo')
  ClearShop.classList.add('DesktopModalNew_backdropNone')
  document.getElementsByClassName('AppCart_totalPriceValue')[0].innerHTML = '0 ₽'
  if (ShopButton) ShopButton.disabled = true

}

function ElemntCart() //Функция вывода корзины в документ
{
  var cartData = getCartData()
  if (cartData) {
    AppCart.innerHTML = ''
    AppCart.classList.remove('AppCart_emptyCart')
    AppCart.classList.add('AppCart_orderInfo')
    ClearShop.classList.remove('DesktopModalNew_backdropNone')
    if (ShopButton) ShopButton.disabled = false
    let elemnt = ''
    let price = 0
    let i = 0
    for (var items in cartData) {
      let stringClass = ''
      let stringHTML = 'x'
      if (parseInt(cartData[items][2]) > 1) {
        stringClass = 'AppCartItem_decrement'
        stringHTML = '-'
      } else {
        stringClass = 'AppCartItem_decrement AppCartItem_remove'
      }
      elemnt = '<div class="AppCart_item"><div class="AppCartItem_root"><div class="AppCartItem_intoWrapper"><div class="AppCartItem_info"><span class="AppCartItem_name">' + cartData[items][0] + '</span></div><div class="AppCartItem_quantityContainer AppCartItem_quantityContainerWithControl"><div class="AppCartItem_increment" id-Goods="' + items + '" onClick="PushShop2(' + i + ',' + items + ')">+</div> <input class="AppCartItem_quantity" type="number" style="padding: 0px;"value="' + cartData[items][2] + '" onkeyDown="targetInput(' + i + ',' + items + ')"><div class="' + stringClass + '" onClick="PushShop3(' + items + ',' + i + ')">' + stringHTML + '</div></div><div class="AppCartItem_price"><span>' + cartData[items][1] + ' ₽</span></div></div></div></div>'
      AppCart.innerHTML = AppCart.innerHTML + elemnt
      price += parseInt(cartData[items][1]) * parseInt(cartData[items][2])
      document.getElementsByClassName('AppCart_totalPriceValue')[0].innerHTML = price + ' ₽'
      arrayff.set(items, i)
      i++
    }
  } else {
    document.getElementsByClassName('AppCart_totalPriceValue')[0].innerHTML = '0 ₽'
    remove()
  }
}

function PushShop(id, i) //Функция добавления товара в корзину при клике на товар
{
  ajax({
    url: "MoveGoods.php",
    statbox: "status",
    method: "POST",
    async: false,
    data: {
      id_goods: -1
    },
    success: function (response) {
      var jsonData = JSON.parse(response)
      let ArrayListCatalog = jsonData.success
      var cartData = getCartData() || {}
      let Goodss = document.getElementsByClassName('RestaurantPageMenuItem_root'),
        RemoveGoodss = document.getElementsByClassName('AppCartItem_decrement'),
        PlusGoodss = document.getElementsByClassName('AppCartItem_increment'),
        PriceGoodss = document.getElementsByClassName('AppCartItem_quantity'),
        itemId = ArrayListCatalog[id - 1].id_good, // ID товара
        itemTitle = ArrayListCatalog[id - 1].Name, // название товара
        price = 0,
        itemPrice = ArrayListCatalog[id - 1].price;
      Max = ArrayListCatalog[id - 1].countGoods
      if (Max == 0) {
        alert('Ой такой товар закончился')
      } else {
        if (cartData.hasOwnProperty(itemId)) { // если такой товар уже в корзине, то добавляем +1 к его количеству
          cartData[itemId][2] = parseInt(cartData[itemId][2]) + 1;
          //RemoveGoodss[id-1].classList.remove("AppCartItem_remove")
          RemoveGoodss[arrayff.get(String(id))].innerHTML = '-'
          if (cartData[itemId][2] > Max) {
            Goodss[id - 1].classList.add("RestaurantPageMenuItem_inCartRed")
            PlusGoodss[arrayff.get(String(id))].classList.add("disabled")
            setInterval(() => {
              Goodss[id - 1].classList.remove("RestaurantPageMenuItem_inCartRed")
            }, 2000);
            cartData[itemId][2] = parseInt(cartData[itemId][2]) - 1
          }
          PriceGoodss[arrayff.get(String(id))].value = cartData[itemId][2]
        } else { // если товара в корзине еще нет, то добавляем в объект
          cartData[itemId] = [itemTitle, itemPrice, 1];
          if (!setCartData(cartData)) { // Обновляем данные в LocalStorage
            ElemntCart()
          }
        }
        if (!setCartData(cartData)) { // Обновляем данные в LocalStorage
        }
        for (var items in cartData) {
          price += parseInt(cartData[items][1]) * parseInt(cartData[items][2])
        }
        document.getElementsByClassName('AppCart_totalPriceValue')[0].innerHTML = price + ' ₽'
        Goodss[id - 1].classList.add("RestaurantPageMenuItem_inCart")
      }
      return false;

    }
  })
}

function PushShop2(i, id) //Функция добавления товара в корзину при клике на + 
{
  ajax({
    url: "MoveGoods.php",
    statbox: "status",
    method: "POST",
    async: false,
    data: {
      id_goods: -1
    },
    success: function (response) {
      var jsonData = JSON.parse(response)
      let ArrayListCatalog = jsonData.success
      var cartData = getCartData() || {}
      let Goodss = document.getElementsByClassName('RestaurantPageMenuItem_root'),
        RemoveGoodss = document.getElementsByClassName('AppCartItem_decrement'),
        PriceGoodss = document.getElementsByClassName('AppCartItem_quantity'),
        itemId = ArrayListCatalog[id - 1].id_good, // ID товара
        itemTitle = ArrayListCatalog[id - 1].Name, // название товара
        price = 0,
        itemPrice = ArrayListCatalog[id - 1].price;
      Max = ArrayListCatalog[id - 1].countGoods
      if (Max == 0) {
        alert('Ой такой товар закончился')
      } else {
        if (cartData.hasOwnProperty(itemId)) { // если такой товар уже в корзине, то добавляем +1 к его количеству
          cartData[itemId][2] += 1;
          //RemoveGoodss[id-1].classList.remove("AppCartItem_remove")

          RemoveGoodss[i].innerHTML = '-'
          if (cartData[itemId][2] > Max) {
            PlusGoodss[i].classList.add("disabled")
            cartData[itemId][2] -= 1
          }
          PriceGoodss[i].value = cartData[itemId][2]
        }
        if (!setCartData(cartData)) { // Обновляем данные в LocalStorage
        }
        for (var items in cartData) {
          price += parseInt(cartData[items][1]) * parseInt(cartData[items][2])
        }
        document.getElementsByClassName('AppCart_totalPriceValue')[0].innerHTML = price + ' ₽'
      }
      return false;
    }
  })
}


function PushShop3(id, i) //Функция уменьшение товара в корзину при клике на -
{
  ajax({
    url: "MoveGoods.php",
    statbox: "status",
    method: "POST",
    async: false,
    data: {
      id_goods: -1
    },
    success: function (response) {
      var jsonData = JSON.parse(response)
      let ArrayListCatalog = jsonData.success
      var cartData = getCartData() || {}
      let Goodss = document.getElementsByClassName('RestaurantPageMenuItem_root'),
        RemoveGoodss = document.getElementsByClassName('AppCartItem_decrement'),
        PlusGoodss = document.getElementsByClassName('AppCartItem_increment'),
        price = 0,
        PriceGoodss = document.getElementsByClassName('AppCartItem_quantity'),
        itemId = ArrayListCatalog[id - 1].id_good; // ID товара
      if (cartData[itemId][2] == 1) {
        delete cartData[itemId]
        if (!setCartData(cartData)) { // Обновляем данные в LocalStorage

        }
        Goodss[id - 1].classList.remove('RestaurantPageMenuItem_inCart')
        ElemntCart()
      } else {
        cartData[itemId][2] -= 1
        PlusGoodss[i].classList.remove("disabled")
        if (cartData[itemId][2] == 1) {
          RemoveGoodss[i].innerHTML = 'x'
          RemoveGoodss[i].classList.add("AppCartItem_remove")
        }
        for (var items in cartData) {
          price += parseInt(cartData[items][1]) * parseInt(cartData[items][2])
        }
        document.getElementsByClassName('AppCart_totalPriceValue')[0].innerHTML = price + ' ₽'
        PriceGoodss[i].value = cartData[itemId][2]
      }
      if (!setCartData(cartData)) { // Обновляем данные в LocalStorage

      }
    }
  })
}


function AddOrder() //Функция отправки корзины на сервер 
{
  var cartData = getCartData()
  let i = 0
  let mass = []
  let mass2 = []
  for (var items in cartData) {
    mass[i] = items
    mass2[i] = cartData[items][2]
    i++
  }
  ajax({
    url: "AddOrder.php",
    statbox: "status",
    method: "POST",
    data: {
      orders: JSON.stringify(mass),
      orders2: JSON.stringify(mass2)
    },
    success: function (response) {
      // var jsonData = JSON.parse(response)
      // let ArrayListCatalog=jsonData.success
      // console.log(ArrayListCatalog)
      ElemntCart()
      alert('Заказ отправлен')
      localStorage.removeItem('cart');
      remove();
      location.href = ("/");


    }
  })

}


function targetInput(id, id2) //Функция добавления товара в корзину при текстовом редактирование
{
  ajax({
    url: "MoveGoods.php",
    statbox: "status",
    method: "POST",
    async: false,
    data: {
      id_goods: -1
    },
    success: function (response) {
      var jsonData = JSON.parse(response)
      ArrayListCatalog = jsonData.success
      var cartData = getCartData() || {}
      let Goodss = document.getElementsByClassName('RestaurantPageMenuItem_root'),
        RemoveGoodss = document.getElementsByClassName('AppCartItem_decrement'),
        Max = ArrayListCatalog[id2 - 1].countGoods,
        price = 0,
        PlusGoodss = document.getElementsByClassName('AppCartItem_increment'),
        PriceGoodss = document.getElementsByClassName('AppCartItem_quantity'),
        itemId = ArrayListCatalog[id2 - 1].id_good; // ID товара
      cartData[itemId][2] = parseInt(PriceGoodss[id].value) || 1
      if (cartData[itemId][2] > Max) {
        cartData[itemId][2] = Max
        PlusGoodss[id].classList.add("disabled")
      }
      if (cartData[itemId][2] == 1 || cartData[itemId][2] == 0) {
        cartData[itemId][2] = 1
        RemoveGoodss[id].innerHTML = 'x'
        RemoveGoodss[id].classList.add("AppCartItem_remove")
      }
      if (cartData[itemId][2] > 1) {
        RemoveGoodss[id].innerHTML = '-'
        RemoveGoodss[id].classList.remove("AppCartItem_remove")
      }
      PriceGoodss[id].value = cartData[itemId][2]
      if (!setCartData(cartData)) { // Обновляем данные в LocalStorage

      }
      for (var items in cartData) {
        price += parseInt(cartData[items][1]) * parseInt(cartData[items][2])
      }
      document.getElementsByClassName('AppCart_totalPriceValue')[0].innerHTML = price + ' ₽'
    }
  })
}


//Функции вызываемые сразу после загрузки файла
ElemntCart()
AjaxPostDistrict()


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
    param.url = param.url + "&Main=true";
  } else {
    send = "";
    for (var i in param.data) send += i + "=" + param.data[i] + "&";
    send = send + "Main=true";
  }

  req.open(method, param.url, true);
  req.setRequestHeader("Content-Type", "application/" + param.url);
  req.send(send);
  req.onreadystatechange = function () {
    if (req.readyState == 4 && req.status == 200) //если ответ положительный
    {
      if (param.success) {
        param.success(req.responseText);
      }
      if (param.FillGroup) {
        param.FillGroup(req.responseText);
      }

    }
  }

}