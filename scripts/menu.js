const getWidth = () => document.body.clientWidth;

const setMarginLeft = (element, margin) => element.style.marginLeft = margin;

const setWidth = (element, width) => element.style.width = width;

const moveWrapper = (margin, width) => {
    const wrapper = document.querySelector("#wrapper");
    setMarginLeft(wrapper, margin);
    setWidth(wrapper, width);
}

const moveWrapperRight = () => moveWrapper("16em", "calc(100% - 16em)");

const moveWrapperLeft =() => moveWrapper("0px", "100%");

const moveMenu = (margin) => setMarginLeft(document.getElementById("side-menu"), margin);

const openMenu = () => moveMenu("0px");

const closeMenu = () => moveMenu("-16em");

const openMenuPush = () => {
    openMenu();
    moveWrapperRight();
}

const closeMenuPush = () => {
    closeMenu();
    moveWrapperLeft();
}

const isMenuOpened = () => document.getElementById("side-menu").style.marginLeft === "0px";

const toggleMenu = () => {
    if (!isMenuOpened()) {
        (getWidth() < 768) ? openMenu() : openMenuPush();
    } else {
        (getWidth() < 768) ? closeMenu(): closeMenuPush();
    }
}

function resized() {
    if (getWidth() < 768 && isMenuOpened()) closeMenuPush();
    else if (getWidth() > 768) openMenuPush();
}

function init() {
    document.getElementById("menu-button").addEventListener("click", toggleMenu);
    window.addEventListener("resize", resized);
}

init();