<template>
    <button id="menu-button">
        <span class="lnr lnr-menu"></span>
    </button>
</template>

<script>
    import SideMenu from "./SideMenu";

    export default {
        name: "menu-button"
    };
</script>

<style lang='scss'>

    #menu-button {
        font-size: 1.9em;
        border: none;
        color: #fff;
        background-color: transparent;
        padding-bottom: 0.2em;
    }
    
    #menu-button:hover {
        cursor: pointer;
    }
</style>