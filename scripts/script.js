const getWidth = () => document.body.clientWidth;

const moveContentRight = () => {
    document.getElementsByTagName("main")[0].style.marginLeft = "16em";
    document.getElementsByTagName("main")[0].style.width = "calc(100% - 16em)";
    document.getElementsByTagName("footer")[0].style.marginLeft = "16em";
    document.getElementsByTagName("footer")[0].style.width = "calc(100% - 16em)";
}

const moveContentLeft = () => {
    document.getElementsByTagName("main")[0].style.marginLeft = "0px";
    document.getElementsByTagName("main")[0].style.width = "100%";
    document.getElementsByTagName("footer")[0].style.marginLeft = "0px";
    document.getElementsByTagName("footer")[0].style.width = "100%";
}

const openMenu = () => {
    document.getElementById("side-menu").style.marginLeft = "0px";
}

const closeMenu = () => {
    document.getElementById("side-menu").style.marginLeft = "-16em";
}

const openMenuPush = () => {
    openMenu();
    moveContentRight();
}

const closeMenuPush = () => {
    closeMenu();
    moveContentLeft();
}

const isMenuOpened = () => {
    return document.getElementById("side-menu").style.marginLeft === "0px";
}

const toggleMenu = () => {
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

const resized = () => {
    if(getWidth() < 768 && isMenuOpened()) closeMenuPush();
    else if(getWidth() > 768 && !isMenuOpened()) openMenuPush();
}

const init = () => {
    document.getElementById("menu-button").addEventListener("click", toggleMenu);
    window.addEventListener("resize", resized);
}

init();