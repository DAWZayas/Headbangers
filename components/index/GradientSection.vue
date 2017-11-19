<template>
    <div class="full-width section">
        <div class="section-background full-width" :style="`background-image: url('${background}')`"></div>
        <div :class="`gradient-${alignment}`" class="full-width">
            <div :class="`float-${alignment}`" class="section-content text-center padding">
                <div>
                    <h4> {{title}} </h4>
                    <p> {{text}} </p>
                    <div class="text-center full-width">
                        <nuxt-link :to="target">
                            <el-button class="accent-button"> {{ buttonText}} </el-button>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["background", "title", "text", "buttonText", "target", "alignment"]
    }
</script>

<style lang="scss">
    @import "assets/styles/breakpoints.scss";
    .section-background {
        background-size: cover;
        background-position: center;
        position: absolute;
        height: 50vh;
        z-index: -1;
    }
    
    .section-content {
        color: #fff;
        height: 50vh;
        font-size: 1.3em;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    .section-content .el-button {
        font-size: 0.8em;
    }
    
    .gradient-left {
        background: linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5));
    }
    
    .gradient-right {
        background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8));
    }
    
    .gradient-center {
        background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5));
    }
    
    @media (min-width: $break-sm) {
        .section-background {
            transition: filter 1s, opacity 1s;
            filter: blur(1px);
            opacity: 1;
        }
        .section:hover .section-background {
            filter: none;
            opacity: 0.9;
        }
        .section-content {
            width: 50%;
            font-size: 1.2em;
        }
    }
    
    @media (min-width: $break-lg-xl) {
        .section-content {
            width: 33%;
            font-size: 1.6em;
        }
    }
</style>
