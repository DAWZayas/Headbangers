<template>
    <el-input placeholder="Search" v-model="input">  
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