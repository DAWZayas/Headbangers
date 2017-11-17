<template>
    <div class="full-width section">
        <div class="section-background" :style="`background-image: url('${background}')`"></div>
        <div :class="`gradient-${alignment}`" class="full-width">
            <div :class="`float-${alignment}`" class="section-content text-center padding">
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
        width: 100%;
        height: 50vh;
        z-index: -1;
        transition: filter 1s;
    }
    
    .section-content {
        color: #fff;
        height: 50vh;
        font-size: 1.4em;
        z-index: 10;
    }
    
    .section-content .el-button {
        font-size: 0.8em;
    }
    
    .gradient-left {
        background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4));
    }
    
    .gradient-right {
        background: linear-gradient(to right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7));
    }
    
    @media (min-width: $break-sm) {
        .section-background {
            filter: blur(2px);
        }
        .section:hover .section-background {
            filter: none;
        }
        .section-content {
            width: 50%;
            font-size: 1.6em;
        }
        .gradient-left {
            background: linear-gradient(to right, black, transparent);
        }
        .gradient-right {
            background: linear-gradient(to right, transparent, black);
        }
    }
    
    @media (min-width: $break-lg) {
        .section-content {
            width: 33%;
        }
    }
</style>
