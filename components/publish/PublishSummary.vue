<template>
    <div>
        <h3>Summary</h3>
            <span>{{event.name}}</span>
            <p>We got it everything?</p>
            <el-button @click="back">No, Go Back</el-button>
            <el-button type="primary" @click="publish">Yeah, Publish</el-button>
     </div>
</template>

<script>
    import {
        publish
    } from '~/pages/publish'
    export default {
        name: "publish-summary",
        props: ["event"],
        methods: {
                publish() {
                    this.$emit("publish");
                },
                back() {
                    this.$emit("back");
                }
        }
    };
</script>

<style lang="scss">
    
</style>

