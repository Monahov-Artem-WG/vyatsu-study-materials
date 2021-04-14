<header class="DesktopHeader_content">
                <div class="DesktopHeader_desktopHeader">
                    <div class="DesktopHeader_desktopLogo">
                        <a href="#">
                            <img class="DesktopHeader_desktopLogoImage" src="./assets/img/Logo.png">
                        </a>
                    </div>
                    <div class="DesktopHeader_menu">
                        <a rel="nofollow" href="/" class="DesktopHeader_restaurantsLink">Продукты</a>
                        <a target="_blank" href="" class="DesktopHeader_couriersLink DesktopHeader_restaurantsLink disabled">Рестораны</a>
                        <a target="_blank" href="" class="DesktopHeader_companiesLink DesktopHeader_restaurantsLink disabled">Посылки</a>
                    </div>
                    <div class="DesktopHeader_button" id="JsDistrictListButton">Киров</div>
                     <?php if (!isset($_COOKIE['id'])): ?>
                    <button class="Profile_button" id="jsSignButton">Войти</button>
                    <?php else:?>
                    <div class="Profile_avatar" id="JsProfilButton">
                        <button class="Avatar_avatarButton">
                            <div class="Avatar_avatar Avatar_sizeMd">
                            </div>
                        </button>
                    </div>
                    <?php endif?>
                </div>
</header>