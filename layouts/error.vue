<template>
    <div class="error-page">
        <div class="text-center">
            <span class="lnr lnr-construction"></span>
            <h1>{{error.statusCode}}</h1>
            <h2>{{error.message}}</h2>
            <a class="link" href="/">Home page</a>
        </div>
    </div>
</template>

<script>
export default {
    props: ['error'],
}
</script>
<style lang="scss">
    @import "assets/styles/colors.scss";
    .error-page{
        color: #fff;
        background-color: $mainColorLight;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100vh;
    }  
    .error-page .lnr{
        font-size: 8em;
    }  

    .error-page h1{
        margin-top: 0;
    }
</style>