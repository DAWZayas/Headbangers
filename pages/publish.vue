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
            <form-basics v-if="currentStep === 0" @done="basicsDone" :data="info"></form-basics>
            <form-location v-if="currentStep === 1" @done="locationDone" :data="location" @back="stepDown()"></form-location>
            <form-music v-if="currentStep === 2" @done="musicDone" @back="stepDown()" :data="{bands, genres}"></form-music>       
            <publish-summary v-if="currentStep === 3" @done="publish()" @back="stepDown()"></publish-summary>
            <div v-if="currentStep === 4">
                <h3>Done!</h3>
                <p>
                    Your concert is published :)
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import { FormBasics, FormLocation, FormMusic, PublishSummary} from '~/components/publish'
    import { mapActions, mapGetters, mapMutations } from 'vuex';
    import { Concert, BasicInfo, Location, Band, ShortConcert} from '~/schemas';
    export default {
        data: () => ({
            info: new BasicInfo(),
            location: new Location(),
            bands: [new Band()],
            genres: [],
            currentStep: 0,
        }),
        components: {
            FormBasics,
            FormLocation,
            FormMusic,
            PublishSummary
        },
        computed: {
            ...mapGetters({currentUser: 'getCurrentUser'}),
        },
        methods: {
            ...mapActions(['publishConcert']),
            ...mapMutations(['setNewConcert']),
            basicsDone(info) {
                info.date = new Date(info.date).getTime();
                this.info.populate(info);
                this.stepUp();
            },
            locationDone(location) {
                this.location.populate(location);
                this.stepUp();
            },
            musicDone({bands, genres}) {
                this.bands = bands;
                this.genres = genres;
                this.stepUp();
            },
            publish() {
                let concert = new Concert({
                    info: this.info, 
                    location: this.location, 
                    bands: this.bands, 
                    genres: this.genres, 
                    author: this.currentUser.id
                }).toObject();
                let shortConcert = new ShortConcert({
                    title: this.info.title,
                    date: this.info.date,
                    time: this.info.time,
                    price: this.info.price,
                    currency: this.info.currency,
                    venue: this.location.venue,
                    city: this.location.city,
                    genres: this.genres,
                    poster: this.info.poster
                }).toObject();
                this.publishConcert({concert, shortConcert});
                this.stepUp();
            },
            stepUp() {
                this.currentStep++;
            },
            stepDown() {
                this.currentStep--;
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

