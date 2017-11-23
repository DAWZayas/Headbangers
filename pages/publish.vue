<template>
    <div class="padding">
        <!--    <div v-if="isAuthenticated"> -->
        <div class="steps-wrapper">
            
            <el-steps :active="currentStep" finish-status="success" align-center>
                <el-step title="Basics"></el-step>
                <el-step title="Location"></el-step>
                <el-step title="Music"></el-step>
            </el-steps>
        </div>
        <div class="publish-form">
            <basics-form v-if="currentStep === 0" @done="basicsDone"></basics-form>
            <location-form v-if="currentStep === 1" @done="locationDone" @back="stepDown()"></location-form>
            <music-form v-if="currentStep === 2" @done="musicDone" @back="stepDown()"></music-form>       
            <publish-summary v-if="currentStep === 3" @done="publish()" @back="stepDown()"></publish-summary>
        </div>
    </div>
</template>

<script>
    import { BasicsForm, LocationForm, MusicForm, PublishSummary} from '~/components/publish'
    import { mapActions } from 'vuex';
    export default {
        data: () => ({
            currentStep: 0,
            eventInfo: {}
        }),
        components: {
            BasicsForm,
            LocationForm,
            MusicForm,
            PublishSummary
        },
        methods: {
            ...mapActions(['addConcert']),
            basicsDone(basicsInfo) {
                this.eventInfo = { ...basicsInfo };
                this.stepUp();
            },
            locationDone(locationInfo) {
                this.eventInfo.location = locationInfo;
                this.stepUp();
            },
            musicDone(musicInfo) {
                this.eventInfo.bands = musicInfo.bands;
                this.eventInfo.genres = musicInfo.genres;
                this.stepUp();
            },
            stepUp() {
                this.currentStep++;
            },
            stepDown() {
                this.currentStep--;
            },
            publish() {
                this.addConcert(this.eventInfo);
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
        margin: -1em 0 0 -1em;
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

