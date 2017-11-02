<template>
    <button class="icon-button">
            <span class="lnr" :class="icon"></span>
        </button>
</template>

<script>
    export default {
        name: "icon-button",
        props: ["icon"]
    };
</script>

<style lang='scss'>
    .icon-button {
        margin-bottom: .2em;
        font-size: 1.5em;
        color: #fff;
        border: none;
        background-color: transparent;
    }
    .icon-button:hover {
        cursor: pointer;
    }
</style>