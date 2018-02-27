<template>
    <div class="concert-page" v-if="concert">
        <div class="concert-img">
            <img :src="concert.info.poster">
        </div>
        <div class="concert-data">
            <div class="actions">
                <div class="likes">
                    <icon-text class="heart" v-if="!liked" @click.native="like" icon="lnr-heart" :text="concert.likes"></icon-text>
                    <icon-text class="heart-filled" v-else @click.native="like" icon="lnr-heart" :text="concert.likes"></icon-text>
                </div>
                <div class='assisting'>
                    <icon-text class="lighter" v-if="!assisting" @click.native="assist" icon="lnr-lighter" :text="concert.assisting"></icon-text>
                    <icon-text class="lighter-filled" v-else @click.native="assist" icon="lnr-lighter" :text="concert.assisting"></icon-text>
                </div>
                <div class="save" @click="save">
                    <icon-text v-if="!saved" @click.native="save" icon="lnr-bookmark" text=""></icon-text>
                    <icon-text v-else @click.native="save" icon="lnr-bookmark" class="saved-button" text=""></icon-text>
                </div>
                <div class="share">
                    <icon-text icon="lnr-bubble" text=""></icon-text>
                </div>
            </div>
            <div class= "concert-title">
                <h2>{{concert.info.title}}</h2>
            </div>
            <div class= "main-info">
                <p>{{formattedDate + ', ' + concert.info.time}}</p>
                <p>{{concert.info.price + ' ' + concert.info.currency}}</p>
                <p>{{concert.location.venue + ' (' + concert.location.city + ')'}}</p>
                <!--<span v-if="concert.location.number !== 'S/N'">{{concert.location.number}}</span>-->
            </div>
            <div class="description">
                <p>{{ concert.location.descripton }}</p>
            </div>
            <h4 class="bands-title">Bands</h4>
                <div class="bands" v-for="band in concert.bands" :key="band.name">
                    <p class="band-name">{{band.name}}</p>
                    <div class="band-body">
                        <p class="band-description">{{band.description}}</p>
                        <p class="band-website">Official site: <a :href="band.link">{{band.link}}</a></p> 
                    </div>         
                </div>
            <h4 class="genres-title">Genres</h4>
                <div class="genre" v-for='genre in concert.genres' :key="genre.name">
                    <p>{{genre}}</p>
                </div>
            <h4 class="location-title">Location</h4>
                <div class="location">
                    <gmap-map :center="concert.location.coords" :zoom="8" map-type-id="terrain" style="width: 100%; height: 256px;">
                        <gmap-marker :position="concert.location.coords" :clickable="true"></gmap-marker>
                    </gmap-map>
                </div>
        </div>
    </div>
</template>

<script>

    import firebaseApp from '~/firebaseapp';
    import {mapActions, mapGetters, mapMutations} from 'vuex';
    import {IconText} from '~/components/common';

    export default {
        components: {
            IconText
        },
        computed:{
            ...mapGetters({concert: 'getConcertDetails', likedConcerts: 'getUserLiked', assistingConcerts: 'getUserAssisting', savedConcerts: 'getUserSaved', isAuthenticated: 'isAuthenticated'}),
            
            formattedDate(){ return new Date(Number(this.concert.info.date)).toLocaleDateString()},
            
            liked () {
                return this.likedConcerts && Object.keys(this.likedConcerts).includes(this.id)
            },

            assisting () {
                return this.assistingConcerts && Object.keys(this.likedConcerts).includes(this.id)
            },

            saved () {
                return this.savedConcerts && Object.keys(this.savedConcerts).includes(this.id)
            },
        },        
                
        methods: {
            ...mapActions(['bindConcert', 'unbindConcert']),
            ...mapMutations(['setConcertsFullRef']),
            
            like () {
                if (this.isAuthenticated) {
                    !this.liked ? this.likeConcert(this.id) : this.unlikeConcert(this.id)
                } else {
                    this.$notify({
                        type: 'info',
                        message: 'You need to login',
                        duration: 1000
                    })
                }   
            },

            assist () {
                /*if (this.isAuthenticated) {
                    !this.assisting ? this.???(this.id) : this.???(this.id)
                } else {
                    this.$notify({
                        type: 'info',
                        message: 'You need to login',
                        duration: 1000
                    })
                }*/
            },

            save () {
                if (this.isAuthenticated) {
                    !this.saved ? this.saveConcert(this.id) : this.unsaveConcert(this.id)
                } else {
                    this.$notify({
                        type: 'info',
                        message: 'You need to login',
                        duration: 1000
                    })
                }
            }
        },

        mounted(){
            this.setConcertsFullRef()
            this.bindConcert(this.$route.params.id).then(exists => !exists && this.$router.push('/error'))
            //firebaseApp.database().ref('/concertsFull').child(this.id).on('value',function(concert){ this.concert = concert.val() }.bind(this))
        },
        
        beforeDestroy(){
            this.unbindConcert();
        }
    }
</script>

<style lang='scss'>
    @import 'assets/styles/main.scss';
    .concert-img {        
        img {
            width: 100%;
        }
    }
    .concert-data {
        box-shadow: 0px -2px 2px rgba(0, 0, 0, .5);
        padding: 25px;
        .actions{
            margin-top: -15px;
            margin-left: -10px;
            display: flex;
            width: 50%;
            justify-content: space-around;
                .lnr {
                    cursor: pointer;
                }
                .lnr-heart{
                    margin-right: 5px;
                }
        }
        .concert-title {
            text-align: center;
            > h2 {
                margin: 5px 0px;
                font-size: 2.5em;
                font-family: "Saira Extra Condensed";
            }
        }
        .main-info {
            text-align: center;
        }
    }
</style>
