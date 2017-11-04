<template>
    <button class="menu-button" @click="toggleMenu">
        <span class="lnr lnr-menu"></span>
    </button>
</template>

<script>
    import SideMenu from "./SideMenu";

    export default {
        name: "menu-button",
        methods: {
            toggleMenu: () => {
               SideMenu.isOpened();
            }
        },
    };
</script>

<style lang='scss'>

    .menu-button {
        font-size: 1.9em;
        border: none;
        color: #fff;
        background-color: transparent;
        padding-bottom: 0.4em;
    }
    
    .menu-button:hover {
        cursor: pointer;
    }
</style>