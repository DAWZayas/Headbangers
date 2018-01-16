<template>
    <div class="form padding">
        <el-form>
            <div class="text-center">
                <el-upload action="" :disabled="!editable">
                    <avatar size="120" :picture="userProfile.photoURL"></avatar>
                    <el-button v-if="editable" class="margin-top">{{ (!userProfile.photoURL) ? 'Select' : 'Change'}} Picture</el-button>
                </el-upload>
            </div>
            <el-form-item label="Name:" class="no-margin">
                <el-input :readonly="!editable" placeholder="" v-model="userProfile.displayName"></el-input>
            </el-form-item>
            <el-form-item label="Email:" class="no-margin">
                <el-input :readonly="!editable" placeholder="" v-model="userProfile.email"></el-input>
            </el-form-item>
            <div v-if="editable" class="space-between margin-top padding-top">
                <el-button >Change Password</el-button>
                <el-button type="primary" @click="done">Save</el-button>
            </div>
        </el-form>
        <div class="margin-top padding-top text-center">
            <el-button @click="logOut()">Log Out</el-button>
        </div>
    </div>
</template>
<script>
import firebaseApp from '~/firebaseapp'
import {Avatar} from '@/components/common'
export default {
    data () {
        return {
            userProfile: this.profile || {
                displayName: '',
                email: '',
                password: '',
                photoURL: ''
            }
        }
    },
    methods:{
        logOut () {
            firebaseApp.auth().signOut()
            this.$router.push('/')
            this.$notify({
                message: 'Logged out',
                type: 'info',
                duration: 1000
            })
        }
    },
    props: ['profile', 'editable'],
    components: {Avatar}
}
</script>

