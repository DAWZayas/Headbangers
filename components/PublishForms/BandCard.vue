<template>
    <el-card class="band-card">
        <el-button type="text" icon="el-icon-close" class="close-button" @click="remove"></el-button>
        <b>{{band.name}}</b>
        <p>{{band.description}}</p>
        <a :href="band.link">{{band.link}}</a>
    </el-card>
</template>

<script>
    export default {
        props: ["band"],
        methods: {
            remove() {
                this.$emit("remove", this.band.key);
            }
        }
    }
</script>

<style lang="scss">
    .band-card {
        margin-bottom: 0.5em;
        position: relative;
        p {
            font-size: 0.8em;
        }
        .close-button {
            position: absolute;
            right: 0.75em;
            top: 0;
        }
        .el-card__body {
            padding: 0.75em;
        }
    }
</style>
