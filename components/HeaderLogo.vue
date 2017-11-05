<template>
    <a href="/">
        <img id="logo" src="/img/logo-big.svg">
    </a>
</template>

<script>
    export default {
        name: "header-logo",
    };
</script>

<style>
    #logo{
        width: 10em;
    }    
@media(min-width: 768px) {
    #logo{
        margin-left: -15px;
        margin-top:-0.2em;
        width: 13em;

    }    
}

</style>