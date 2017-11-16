<template>
        <el-form :model="bandForm">
            <el-form-item label="Name">
                <el-input v-model="bandForm.name">
                </el-input>
            </el-form-item>
            <el-form-item label="Short Description">
                <el-input v-model="bandForm.description"></el-input>
            </el-form-item>
            <el-form-item label="Website / Social">
                <el-input v-model="bandForm.link"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="cancel">Cancel</el-button>
                <el-button @click="confirm" type="primary">Confirm</el-button>
            </el-form-item>
        </el-form>
</template>

<script>
    export default {
        data() {
            return {
                bandForm: {
                    name: "",
                    description: "",
                    link: ""
                }
            }
        },
        methods: {
            confirm(){
                this.$emit('confirm', this.bandForm);
            },
            cancel(){
                this.$emit('cancel')
            }
        }
    }
</script>