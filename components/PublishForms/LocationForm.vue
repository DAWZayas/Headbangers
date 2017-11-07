<template>
    <div>
        <h3>Location Info</h3>
        <el-button type="primary" @click="done">
            Next
        </el-button>
    </div>
</template>

<script>
    export default {
        methods: {
            done: function() {
                this.$emit("done")
            }
        }
    }
</script>