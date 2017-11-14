<template>
    <div>
        <!--    <div v-if="isAuthenticated"> -->
        <div class="steps-wrapper">
            <el-steps :active="active" finish-status="success" align-center>
                <el-step title="Basics"></el-step>
                <el-step title="Location"></el-step>
                <el-step title="Music"></el-step>
            </el-steps>
    
        </div>
        <div class="publish-form">
            <basics-form v-show="active === 0" @done="stepUp()"></basics-form>
            <location-form v-show="active === 1" @done="stepUp()" @back="stepDown()"></location-form>
            <music-form v-show="active === 2" @done="stepUp()" @back="stepDown()"></music-form>
    
            <div v-if="active == 3">
                <h3>Done!</h3>
            </div>
            <!--    <div class="not-auth" v-if="!isAuthenticated">
                                <img src="#">
                                <h3>You need to be Logged in</h3>
                                <el-button type="primary" >Log In</el-button>
                            </div>
                    -->
        </div>
    </div>
</template>

<script>
    import {
        BasicsForm,
        LocationForm,
        MusicForm
    } from '~/components/PublishForms'
    export default {
        data: () => ({
            active: 0
        }),
        components: {
            BasicsForm,
            LocationForm,
            MusicForm
        },
        methods: {
            stepUp() {
                this.active++;
            },
            stepDown() {
                this.active--;
            }
        }
    }
</script>

<style lang="scss">
    @import "assets/styles/colors.scss";
    @import "assets/styles/breakpoints.scss";
    .form-buttons {
        padding: 1em;
        display: flex;
        justify-content: flex-end;
        background-color: #fff;
    }
    
    .not-auth {
        width: 100%;
        text-align: center;
        h3 {
            color: $grayLight;
        }
    }
    
    .steps-wrapper {
        background-color: $grayLighter;
        width: calc(100% + 2em);
        margin-left: -1em;
        margin-top: -1em;
        padding-top: 1em;
        border-bottom: 1px solid $grayLight;
        .el-step__title.is-wait {
            color: $grayLight;
        }
    }
    
    .step-form {
        padding-bottom: 3em;
        h3 {
            text-align: center;
        }
    }
    
    @media (min-width: $break-sm) {
        .publish-form {
            width: 75%;
            margin: 0 auto;
        }
    }
    
    @media (min-width: $break-lg) {
        .publish-form {
            width: 50%;
            margin: 0 auto;
        }
    }
</style>

