(function () {
    var slideout = new Slideout({
        'panel': document.querySelector('main'),
        'menu': document.getElementById('side-menu'),
    });
    document.getElementById("menu-button").onclick = () => slideout.toggle();

    //If the screen is smaller than 768px the side menu will close when some item is clicked
    const closeIfSmall = () => window.innerWidth < 768 && slideout.close();
    document.querySelectorAll("#side-menu .el-menu-item").forEach((item) => item.onclick = closeIfSmall);
})();