<template>
    <div class="splash">
        <img src="/img/brand/splash-logo.svg">
    </div>
</template>
<script>
export default {

}
</script>
<style lang="scss">
    @import "assets/styles/colors.scss";
    .splash{
        width: 100%;
        position: fixed;
        background-color: $mainColorLight;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 12;
        line-height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .splash img{
        width: 40%;
        margin: auto;
    }
</style>

