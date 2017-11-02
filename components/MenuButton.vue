<template>
    <button id="menu-button">
        <span class="lnr lnr-menu"></span>
    </button>
</template>

<script>
    export default {
        name: "menu-button"
    };
</script>

<style>
    #menu-button {
        font-size: 1.9em;
        margin-top: -0.3em;
        border: none;
        color: #fff;
        background-color: transparent;
    }
    
    #menu-button:hover {
        cursor: pointer;
    }
</style>