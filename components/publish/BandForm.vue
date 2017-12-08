<template>
        <el-form :model="bandInfo" :rules="rules" @submit.native.prevent>
            
            <el-form-item label="Name" prop="name">
                <el-input v-model="bandInfo.title"></el-input>
            </el-form-item>
            
            <el-form-item label="Short Description" prop="description">
                <el-input v-model="bandInfo.description"></el-input>
            </el-form-item>
            <el-form-item label="Website / Social" prop="link">
                <el-input v-model="bandInfo.link"></el-input>
            </el-form-item>
        </el-form>
</template>

<script>
    export default {
        data () {
            return {
                bandInfo: {},
                rules: {
                    name: [
                        { required: true, message: 'Please enter band name', trigger: 'blur' }
                    ],
                    description: [
                        { required: true, message: 'Please enter band description', trigger: 'blur' }
                    ],
                    link: [
                        { required: true, message: 'Please enter a website or social network', trigger: 'blur' }
                    ]
                }
            }
        },
        props: ['band'],
        created () {
            this.bandInfo = this.band
        }
    }
</script>