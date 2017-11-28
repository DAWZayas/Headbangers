<template>
    <el-form ref="authForm" class="padding">
        <el-form-item label="Name" class="no-margin">
            <el-input placeholder="" v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="Email" class="no-margin">
            <el-input placeholder="" v-model="email"></el-input>
        </el-form-item>
        <el-form-item label="Password" class="no-margin">
            <el-input type="password" placeholder="" v-model="password"></el-input>
        </el-form-item>
        <el-form-item label="Confirm Password" class="margin-bottom">
            <el-input type="password" placeholder="" v-model="passwordConfirm"></el-input>
        </el-form-item>
        <el-alert v-if="error != ''" :title="error" type="error"></el-alert>
        <el-form-item class="full-width text-center margin-top">
            <el-button type="primary">Sign up</el-button>
        </el-form-item>
        <br>
        <a @click="showLogin">Login to an existing account</a><br>
    </el-form>  
</template>
<script>
export default {
    data(){
        return {
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
            error: ''
        }
    },
    methods: {
        showLogin(){
            this.$emit('login');
        },
    }
}
</script>
