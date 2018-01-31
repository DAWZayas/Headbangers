<template>
    <div class="form padding">
        <el-form :model="profileModel" >
            <div class="text-center">
              <el-form-item prop="poster">
                <el-upload action="" accept="image/*" :disabled="!editable"  :on-change="fileAdded" :file-list="files" :show-file-list="false">
                    <avatar size="120" :picture="profileModel.photoURL"></avatar>
                    <el-button v-if="editable" class="margin-top">{{ (!profileModel.photoURL) ? 'Select' : 'Change'}} Picture</el-button>
                </el-upload>
              </el-form-item>
            </div>  
            <el-form-item label="Name:" class="no-margin">
                <el-input :readonly="!editable" placeholder="" v-model="profileModel.displayName" ></el-input>
            </el-form-item>
            <el-form-item label="Email:" class="no-margin">
                <el-input :readonly="!editable" placeholder="" v-model="profileModel.email"></el-input>
            </el-form-item>
            <div v-if="editable" class="space-between margin-top padding-top">
                <el-button @click="changePassword">Change Password</el-button>
                <el-button type="primary" @click="saveProfile">Save</el-button>
            </div>
            <div class="margin-top padding-top text-center">
                <el-button @click="logOut">Log Out</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
import firebaseApp from '~/firebaseapp'
import {Avatar} from '@/components/common'
import {mapActions} from 'vuex'
export default {
    data () {
        return {
            files: [],
            profileModel: {}
        }
    },
    created () {
      this.profileModel = {...this.profile}
    },
    methods:{
        ...mapActions(['updatePicture', 'updateName', 'updateEmail', 'updatePassword', 'signOut']),
        fileAdded (file) {
            this.files = [file]
            this.profileModel.photoURL = URL.createObjectURL(file.raw);
        },
        saveProfile () {
            let changes = []
            if(this.profileModel.photoURL != this.profile.photoURL){
                changes.push(this.updatePicture({file: this.files[0].raw, path: `profilePictures/${this.profile.uid}.${this.files[0].name.split('.')[1]}`}))
            }
            if(this.profileModel.displayName != this.profile.displayName){
                changes.push(this.updateName(this.profileModel.displayName))
            }
            if(this.profileModel.email != this.profile.email){
                changes.push(this.askPassword('Change email').then(({value}) => {
                        return this.updateEmail({newEmail: this.profileModel.email, currentEmail: this.profile.email, currentPassword: value})
                    })
                )
            }
            if(changes.length !== 0){
                Promise.all(changes)
                .then(() => { this.$notify({message: 'Profile updated', type: 'success', duration: 2000})})
                .catch((error) => { this.$notify({message: error.message, type: 'error', duration: 5000})})
            }
        },
        changePassword(){
            let currentPassword
            this.askPassword('Change password').then((pass) => {
                currentPassword = pass.value
                return this.askPassword('New password', true)
            }).then(({value}) => this.updatePassword({currentEmail: this.profile.email, currentPassword, newPassword: value}))
            .then(() => this.$notify({message: 'Password changed', type: 'success', duration: 2000}))
            .catch((error) => error && this.$notify({message: error.message, type: 'error', duration: 5000}))
        },
        askPassword(title, isNew){
            return this.$prompt(`Please enter your${isNew ? ' new ' : ' '}password`, title, {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                inputErrorMessage: 'Invalid Password',
                inputType: 'password'
            })
        },
        logOut () {
            
            firebaseApp.auth().signOut().then(() => {
                this.$notify({
                    message: 'Logged out',
                    type: 'info',
                    duration: 2000
                })
                this.$router.push('/')
            })
        }
    },
    props: ['profile', 'editable'],
    components: {Avatar}
}
</script>

