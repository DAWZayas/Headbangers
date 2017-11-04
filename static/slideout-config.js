(function () {
    var slideout = new Slideout({
        'panel': document.querySelector('main'),
        'menu': document.getElementById('side-menu'),
    });
    document.getElementById("menu-button").onclick = () => slideout.toggle();
})();