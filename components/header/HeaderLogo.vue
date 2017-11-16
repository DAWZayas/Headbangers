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
        width: 13em;

    }    
}

</style>