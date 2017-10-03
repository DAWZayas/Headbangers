var menuOpened = false;
 
function toggleMenu() {
    if (!menuOpened) {
        document.getElementById("side-menu").style.marginLeft = 0;
        document.getElementById("side-menu").style.display = "block";
    }else {
        document.getElementById("side-menu").style.marginLeft = "-75%";
        document.getElementById("side-menu").style.display = "none";
    }
    menuOpened = !menuOpened;
}