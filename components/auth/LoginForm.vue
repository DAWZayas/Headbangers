<template>
        <el-form ref="authForm">
            <h4 class="text-center"> Login to your account </h4>
            <el-form-item label="Email" class="no-margin">
                <el-input placeholder="" v-model="email"></el-input>
            </el-form-item>
            <el-form-item label="Password" class="margin-bottom">
                <el-input type="password" placeholder="" v-model="password"></el-input>
            </el-form-item>
            <el-form-item class="full-width text-center margin-top">
                <el-button type="primary" @click="loginWithEmail">Login</el-button>
            </el-form-item>
            <a @click="showSignup">Create an account</a><br>
            <a>Forgot my password</a>  
        </el-form>
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
            if(this.email == '' || this.password == ''){
                this.emitError('Please enter an email and password');
            }else{
                firebaseApp.auth().signInWithEmailAndPassword(this.email, this.password)
                .then((user) => {
                    this.$emit('close');
                    this.$message({
                        message: 'Logged in succesfully',
                        type: 'success'
                    });
                })
                .catch((error) => {
                    if(error.code === 'auth/wrong-password') {
                        this.emitError("Invalid password");
                    }else{
                        this.emitError(error.message);
                    }    
                })
            }
        },
        emitError(message){
            this.$emit('error', { message })
        }
    }
}
</script>