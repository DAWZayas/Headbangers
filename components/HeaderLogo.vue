<template>
    <a id="logo" href="/">
        Headbangers
    </a>
</template>

<script>
    export default {
        name: "header-logo"
    };
</script>

<style lang='scss'>
    #logo {
        font-family: "Ruda";
        font-size: 1.25em;
        font-weight: bold;
        margin-top: 0.4em;
        margin-left: -0.625em;
        text-decoration: none;
        color: #fff;
    }
    
    @media (min-width: 768px) {
        #logo {
            font-size: 2em;
            margin-top: 0;
        }
    }
</style>