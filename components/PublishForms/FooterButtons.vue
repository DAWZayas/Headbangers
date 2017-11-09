<template>
    <div class="footer-buttons">
        <slot></slot>
    </div>
</template>
<style lang="scss">
    @import "assets/styles/colors.scss";
    .footer-buttons{
        padding: 0.5em;
        position: fixed;
        height: 3.5em;
        width: 100%;
        border-top: 2px solid $grayLighter;
        margin-left: -1em;
        bottom: 0;
        display: flex;
        justify-content: flex-end;
        background-color: #fff;
    }
</style>