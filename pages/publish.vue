<template>
    <div>
<!--    <div v-if="isAuthenticated"> -->
        <div>
            <el-steps :active="active" finish-status="success" align-center>
                <el-step title="Basics"></el-step>
                <el-step title="Location"></el-step>
                <el-step title="Musical"></el-step>
            </el-steps>

            <basics-form v-if="active == 0" @done="active++"></basics-form>
            <location-form v-if="active == 1" @done="active++"></location-form>
            <musical-form v-if="active == 2" @done="active++"></musical-form>

            <div v-if="active == 3">
                <h3>Done!</h3>
            </div>
        </div>
<!--    <div class="not-auth" v-if="!isAuthenticated">
            <img src="#">
            <h3>You need to be Logged in</h3>
            <el-button type="primary" >Log In</el-button>
        </div>
-->        
    </div>
</template>

<script>
    import { BasicsForm, LocationForm, MusicalForm } from '~/components/PublishForms'
    export default {
        data: () => ({
            active: 0
        }),
        components: {
            BasicsForm,
            LocationForm,
            MusicalForm
        }
    }
</script>

<style lang="scss">
    @import "assets/styles/colors.scss";
    .not-auth{
        width: 100%;
        text-align: center;
        h3{
            color: $grayLight;
        }
    }
</style>

