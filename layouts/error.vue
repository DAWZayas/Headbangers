<template>
    <div class="error-page">
        <div class="text-center">
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
</style>