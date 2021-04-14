<div id="JsModalShop" style="padding-bottom: 0px; position: fixed; top: 0px; left: 1351.5px; width: 310px; transform: translateZ(0px); margin-top: 90px;">
    <div class="DesktopPlacePageRestaurant_sidebar">
        <div class="AppCartWithButton_root">
            <div class="AppCart_root">
                <div class="AppCart_content">
                    <div class="AppCart_topLine">
                        <div class="AppCart_title">Мой заказ</div>
                        <div class="AppCart_trashIcon DesktopModalNew_backdropNone" id='JsClearShop'></div>
                    </div>
                    <div class="AppCart_emptyCart" id="JsAppCart">Выберите продукты и добавьте их к заказу</div>
                    <!-- <div class="AppCart_orderInfo">
                        <div class="AppCart_item">
                            <div class="AppCartItem_root">
                                <div class="AppCartItem_intoWrapper">
                                    <div class="AppCartItem_info"><span class="AppCartItem_name">Люля-кебаб из баранины</span> <span class="AppCartItem_weight">200 г</span></div>
                                    <div class="AppCartItem_quantityContainer AppCartItem_quantityContainerWithControl">
                                        <div class="AppCartItem_increment">+</div> 
                                        <div class="AppCartItem_quantity">1</div>
                                         <div class="AppCartItem_decrement AppCartItem_remove">×</div>
                                    </div>
                                    <div class="AppCartItem_price"><span>395 ₽</span></div>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>
                <div class="AppCart_meta">
                    <div class="AppCart_deliveryTime DesktopModalNew_backdropNone">
                        <div class="AppCart_deliveryTimeTitle">Время доставки</div>
                        <div class="AppCart_deliveryTimeValue AppCart_deliveryTimeValueEditable">
                            <span>до 60 минут</span>
                            <!-- <span class="AppCart_pencilIcon"></span> -->
                        </div>
                    </div>
                    <div class="AppCart_totalPrice">
                        <div class="AppCart_totalPriceTitle">Итого</div>
                        <div class="AppCart_totalPriceValue">0 ₽</div>
                    </div>
                </div>
            </div>
            <?php if (isset($_COOKIE['address'])) : ?>
                <div class="AppCartWithButton_button"><button disabled="" class="UIAnimatedButton_root UIAnimatedButton_sizeMd UIAnimatedButton_yellow" id="JsShopButton"><span class="UIAnimatedButton_content"><span class="UIAnimatedButton_children">Оформить заказ</span></span></button></div>
            <?php else : ?>
                <div class="RestaurantPageLocationMapWithButton_button" id="JsButtonAddress"><button class="UIAnimatedButton_root UIAnimatedButton_sizeMd UIAnimatedButton_yellow"><span class="UIAnimatedButton_content"><span class="UIAnimatedButton_children"><span class="RestaurantPageLocationMapWithButton_arrowIcon"></span><span>Указать свой адрес</span></span></span></button></div>
            <?php endif ?>
        </div>
    </div>
</div>