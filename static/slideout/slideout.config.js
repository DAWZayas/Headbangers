(() => {
    var slideout = new Slideout({
        'panel': document.querySelector('main'),
        'menu': document.querySelector('#side-menu')
    });
    document.querySelector("#menu-button").onclick = () => slideout.toggle();
    window.innerWidth > 768 && slideout.open();
    document.querySelectorAll("#side-menu .el-menu-item").forEach((item) => item.onclick = (() => window.innerWidth < 768 && slideout.close()));
})();