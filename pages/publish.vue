<template>
    <div class="padding" v-loading="loading">
        <!--    <div v-if="isAuthenticated"> -->
        <div class="steps-wrapper">
            <el-steps :active="currentStep" finish-status="success" align-center>
                <el-step title="Basics"></el-step>
                <el-step title="Location"></el-step>
                <el-step title="Music"></el-step>
            </el-steps>
        </div>
        <div class="form">
            <form-basics v-if="currentStep === 0" @done="basicsDone" :data="info"></form-basics>
            <form-location v-if="currentStep === 1" :data="location" :manual="manualLocation" @done="locationDone"  @back="locationBack" @toggleManual="manualLocation = !manualLocation"></form-location>
            <form-music v-if="currentStep === 2" @done="musicDone" @back="stepDown()" :data="{bands, genres}"></form-music>  
            <publish-success :concertKey="key" v-if="currentStep === 3"></publish-success>
        </div>
    </div>
</template>

<script>
import { FormBasics, FormLocation, FormMusic, PublishSuccess } from '~/components/publish'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { Concert, BasicInfo, Location, Band, ShortConcert } from '~/schemas'
import { strictEqual } from 'assert';
export default {
    middleware: 'auth',
    data () {
        return {
            info: {
                title: '',
                date: '',
                time: '',
                price: '',
                currency: '',
                description: '',
                poster: ''
            },
            location: {
                    venue: '',
                    street: '',
                    number: '',
                    city: '',
                    country: '',
                    coords: {
                        lat: Number,
                        lng: Number
                    }
            },
            bands: [],
            genres: [],
            currentStep: 0,
            key: '',
            manualLocation: false
        }
    },
    components: {
        FormBasics,
        FormLocation,
        FormMusic,
        PublishSuccess
    },
    computed: {
        ...mapGetters({userProfile: 'getUserProfile', loading: 'getLoading'})
    },
    methods: {
        ...mapActions(['publishConcert', 'setLoading']),
        ...mapMutations(['setNewConcert']),
        basicsDone (info) {
            info.date = new Date(info.date).getTime()
            Object.assign(this.info, info)
            this.stepUp()
        },
        locationDone (location) {
            Object.assign(this.location, location)
            this.stepUp()
        },
        locationBack (location) {
            console.log(location)
            Object.assign(this.location, location)
            this.stepDown()
        },
        musicDone ({bands, genres}) {
            this.bands = bands
            this.genres = genres
            this.publish()
        },
        musicBack ({bands, genres}) {
            this.bands = bands
            this.genres = genres
            this.stepDown()
        },
        publish () {
            debugger
            let concert = {
                info: this.info,
                location: this.location,
                bands: this.bands,
                genres: this.genres,
                author: this.userProfile.uid
            }
            let shortConcert = {
                title: this.info.title,
                date: this.info.date,
                time: this.info.time,
                price: this.info.price,
                currency: this.info.currency,
                venue: this.location.venue,
                city: this.location.city,
                country: this.location.country,
                genres: this.genres,
                poster: this.info.poster
            }
            this.publishConcert({concert, shortConcert}).then((key) => {
                this.key = key
                this.stepUp()
            }).catch((error) => {
                console.error(error)
                this.$notify({
                    type: 'error',
                    message: 'Error publishing, please try again later'
                })        
                this.setLoading(false)
            })
        },
        stepUp () {
            this.currentStep++
            window.scrollTo(0,0);  
        },
        stepDown () {
            this.currentStep--
            window.scrollTo(0,0)
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
    
</style>

