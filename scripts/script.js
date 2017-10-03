var menuOpened = false;
 
function toggleMenu() {
    if (!menuOpened) {
        document.getElementById("side-menu").style.marginLeft = 0;
        document.getElementsByTagName("main")[0].style.marginLeft = "14em";
    }else {
        document.getElementById("side-menu").style.marginLeft = "-14em";
        document.getElementsByTagName("main")[0].style.marginLeft = 0;
    }
    menuOpened = !menuOpened;
}