<template>
    <el-input placeholder="Buscar" v-model="input">
        
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
    .box-search:hover {
        
    }
    @media (min-width: 768px) {
        .box-search {
            display: inline;
        }
    }

</style>