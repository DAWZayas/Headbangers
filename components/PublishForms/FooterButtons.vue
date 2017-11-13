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
        display: flex;
        justify-content: flex-end;
        background-color: #fff;
    }
</style>