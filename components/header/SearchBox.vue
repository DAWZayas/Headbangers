<template>
    <el-input class="search-box" placeholder="Search" v-model="input">
        
    </el-input>
</template>

<script>
    export default {
        name: "search-box",
        data() {
            return {
            input: ''
        }
     }
    };
</script>

<style lang='scss'>
    @import "assets/styles/breakpoints.scss";

    .search-box {
        display: none;
    }

    @media (min-width: $break-sm) {
        .search-box {
            display: block;

        }
    }

</style>