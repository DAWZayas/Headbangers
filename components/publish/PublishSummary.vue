<template>
    <div class="step-form">
        <h3>Summary</h3>
            <span></span>
            <p>We got it everything?</p>
            <el-button @click="back">No, Go Back</el-button>
            <el-button type="primary" @click="done">Yeah, Publish</el-button>
     </div>
</template>

<script>
export default {
    methods: {
        done () {
            this.$emit('done')
        },
        back () {
            this.$emit('back')
        }
    }
}
</script>

<style lang="scss">
    
</style>

