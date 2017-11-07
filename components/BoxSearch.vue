<template>
    <el-input class="box-search" placeholder="Buscar" v-model="input">
        
    </el-input>
</template>

<script>
    export default {
        name: "box-search",
        data() {
            return {
            input: ''
        }
     }
    };
</script>

<style lang='scss'>
    .box-search {
        display: none;
        
    }

    @media (min-width: 768px) {
        .box-search {
            display: inline;
        }
    }

</style>