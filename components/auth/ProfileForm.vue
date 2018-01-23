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
                <el-button >Change Password</el-button>
                <el-button type="primary" @click="saveProfile">Save</el-button>
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
            files: [],
            profileModel: {}
        }
    },
    created () {
      this.profileModel = {...this.profile}
    },
    methods:{
      fileAdded (file) {
        this.files = [file]
        this.profileModel.photoURL = URL.createObjectURL(file.raw);
      },
      saveProfile () {
        if(this.profileModel.photoURL != this.profile.photoURL){
          let photoRef = firebaseApp.storage().ref().child('profilePhotos/' + this.profile.uid + '.' + this.files[0].name.split('.')[1])
          photoRef.put(this.files[0].raw).then((snapshot) => {
            firebaseApp.auth().currentUser.updateProfile({
              photoURL: snapshot.downloadURL
            }) 
          })
        }
        if(this.profileModel.displayName != this.profile.displayName){
            firebaseApp.auth().currentUser.updateProfile({
              displayName: this.profileModel.displayName
            }) 
        }
        if(this.profileModel.email != this.profile.email){
            this.$prompt('Please enter your password', 'Change email', {
              confirmButtonText: 'OK',
              cancelButtonText: 'Cancel',
              inputErrorMessage: 'Invalid Password',
              inputType: 'password'
            }).then(value => {
              firebaseApp.auth().signInWithEmailAndPassword(this.profile.email, value)
                .then((user) => {
                  firebaseApp.auth().currentUser.updateEmail(this.profileModel.email) 
                })
            }).catch(err => err)
            //firebaseApp.auth().currentUser.updateEmail(this.profileModel.email) 
        }
      },
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

