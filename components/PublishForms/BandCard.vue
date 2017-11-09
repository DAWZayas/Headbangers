<template>
    <el-card>
        <b>{{name}}</b>
        <p>{{description}}</p>
        <a :href="link">{{link}}</a>
    </el-card>
</template>
<script>
    export default { 
        props: ["name", "description", "link"]
    }
</script>