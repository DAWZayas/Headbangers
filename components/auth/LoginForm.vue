<template>
    <div>
        <el-form ref="authForm" class="padding">
            <el-form-item label="Email" class="no-margin">
                <el-input placeholder="" v-model="email"></el-input>
            </el-form-item>
            <el-form-item label="Password" class="margin-bottom">
                <el-input type="password" placeholder="" v-model="password"></el-input>
            </el-form-item>
            <el-alert v-if="error != ''" :title="error" type="error"></el-alert>
            <el-form-item class="full-width text-center margin-top">
                <el-button type="primary">Login</el-button>
            </el-form-item>
        </el-form>
        <a @click="showSignup">Create an account</a><br>
        <a>Forgot my password</a>  
    </div>
</template>
<script>
import firebaseApp from '~/firebaseapp';
export default {
    data(){
        return{
            email: '',
            password: '',
            error: ''
        }
    },
    methods:{
        showSignup(){
            this.$emit('signup');
        },
        loginWithEmail(){

        },
        loginWithGoogle(){
            
        },
        loginWithFacebook(){

        }
    }
}
</script>