const getWidth = () => document.body.clientWidth;

const setMarginLeft = (element, margin) => element.style.marginLeft = margin;

const setWidth = (element, width) => element.style.width = width;

const moveContent = (margin, width) => {
    const wrapper = document.querySelector("#wrapper");
    setMarginLeft(wrapper, margin);
    setWidth(wrapper, width);
}

const moveContentRight = () => moveContent("16em", "calc(100% - 16em)");

const moveContentLeft =() => moveContent("0px", "100%");

const moveMenu = (margin) => setMarginLeft(document.getElementById("side-menu"), margin);

const openMenu = () => moveMenu("0px");

const closeMenu = () => moveMenu("-16em");

function openMenuPush() {
    openMenu();
    moveContentRight();
}

function closeMenuPush() {
    closeMenu();
    moveContentLeft();
}

function isMenuOpened() {
    return document.getElementById("side-menu").style.marginLeft === "0px";
}

function toggleMenu() {
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

function resized() {
    if (getWidth() < 768 && isMenuOpened()) closeMenuPush();
    else if (getWidth() > 768) openMenuPush();
}

function init() {
    document.getElementById("menu-button").addEventListener("click", toggleMenu);
    window.addEventListener("resize", resized);
}

init();