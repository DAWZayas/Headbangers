function getWidth(){
    return document.body.clientWidth;
}

function moveContentRight(){
    document.getElementsByTagName("main")[0].style.marginLeft = "16em";
    document.getElementsByTagName("main")[0].style.width = "calc(100% - 16em)";
    document.getElementsByTagName("footer")[0].style.marginLeft = "16em";
    document.getElementsByTagName("footer")[0].style.width = "calc(100% - 16em)";
}

function moveContentLeft(){
    document.getElementsByTagName("main")[0].style.marginLeft = "0px";
    document.getElementsByTagName("main")[0].style.width = "100%";
    document.getElementsByTagName("footer")[0].style.marginLeft = "0px";
    document.getElementsByTagName("footer")[0].style.width = "100%";
}

function openMenu(){
    document.getElementById("side-menu").style.marginLeft = "0px";
}

function closeMenu(){
    document.getElementById("side-menu").style.marginLeft = "-16em";
}

function openMenuPush(){
    openMenu();
    moveContentRight();
}

function closeMenuPush(){
    closeMenu();
    moveContentLeft();
}

function isMenuOpened(){
    return document.getElementById("side-menu").style.marginLeft === "0px";
}

function toggleMenu(){
    if (!isMenuOpened()) {
        if (getWidth() < 768) {
            openMenu();
        } else {
            openMenuPush();
        }
    } else {
        if (getWidth() < 768) {
            closeMenu();
        } else {
            closeMenuPush();
        }
    }
}

function resized(){
    if(getWidth() < 768 && isMenuOpened()) closeMenuPush();
    else if(getWidth() > 768 && getWidth() - 50 < 768) openMenuPush();
}

function init(){
    document.getElementById("menu-button").addEventListener("click", toggleMenu);
    window.addEventListener("resize", resized);
}

init();