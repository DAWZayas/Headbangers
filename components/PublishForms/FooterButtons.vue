<template>
    <div class="footer-buttons">
        <slot></slot>
    </div>
</template>
<style lang="scss">
    @import "assets/styles/colors.scss";
    @import "assets/styles/breakpoints.scss";
    .footer-buttons{
        padding: 1em;
        //border-top: 2px solid $grayLighter;
        display: flex;
        justify-content: flex-end;
        background-color: #fff;
    }
</style>