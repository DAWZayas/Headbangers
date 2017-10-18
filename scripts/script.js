const toggleMenu = (function(){
    var menuOpened = false;
    return function (){
        if (!menuOpened) {
            document.getElementById("side-menu").style.marginLeft = 0;
        }else {
            document.getElementById("side-menu").style.marginLeft = "-14em";
        }
        menuOpened = !menuOpened;
    }
})();
document.getElementById("menu-button").addEventListener("click",toggleMenu);
