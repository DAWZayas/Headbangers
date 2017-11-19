<template>
    <nuxt-link to="/" exact>
        <img id="logo" src="/img/brand/header-logo.svg">
    </nuxt-link>
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