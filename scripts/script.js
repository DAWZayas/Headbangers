var menuOpened = false;
 
function toggleMenu() {
    if (!menuOpened) {
        document.getElementById("side-menu").style.marginLeft = 0;
        if(window.innerWidth > 768)document.getElementsByTagName("main")[0].style.marginLeft = "14em";
    }else {
        document.getElementById("side-menu").style.marginLeft = "-14em";
        if(window.innerWidth > 768)document.getElementsByTagName("main")[0].style.marginLeft = 0;
    }
    menuOpened = !menuOpened;
}