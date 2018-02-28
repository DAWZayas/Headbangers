<template>
    <div class="concert-page" v-if="concert">
        <div class="concert-img" :style="`background-image: url(${concert.info.poster})`"></div>
        <div class="concert-data">
            <div class="actions">
                <div class="likes" @click="like">
                    <icon-text :class="liked && 'liked-button'" icon="lnr-heart" :text="concert.likes"></icon-text>
                </div>
                <div class="assisting" @click="save">
                    <icon-text icon="lnr-lighter" text=""></icon-text>
                </div>
                <div class="saved" @click="save">
                    <icon-text :class="saved && 'saved-button'" icon="lnr-bookmark" :text="concert.assisting"></icon-text>
                </div>
            <!--<div class="share">
                    <icon-text icon="lnr-bubble" text=""></icon-text>
                </div>-->
            </div>
            <div class= "concert-title">
                <h2>{{concert.info.title}}</h2>
            </div>
            <div class="genres">
                <div class="genre" v-for='(genre, index) in concert.genres' :key="index">
                    <p>{{genre}}<span v-if="index < concert.genres.length - 1">,&nbsp;</span></p>
                </div>
            </div>
            <div class="description">
                <p>"{{concert.info.description}}"</p>
            </div>
            <hr>
            <div class= "main-info">
                <div class="info-datebox">
                    <p id="month">{{formattedDate.month}}</p>
                    <p id="day">{{formattedDate.day}}</p>
                    <p id="year">{{formattedDate.year}}</p>
                </div>
                <div class="info-time"><p>{{formattedDate.weekDay + ', ' + concert.info.time}}</p></div>
                <div class="info-money"><p>{{concert.info.price + ' ' + concert.info.currency}}</p></div>
                <div class="info-location"><p>{{concert.location.venue + ' (' + concert.location.city + ')'}}</p></div>
                <!--<span v-if="concert.location.number !== 'S/N'">{{concert.location.number}}</span>-->
            </div>
            <h4 class="bands-title">Bands</h4>
            <div class="bands">
                <div class="band" v-for="band in concert.bands" :key="band.name" :style="`background-image: url(${concert.info.poster})`">
                    <button class="band-body" @click="goToLink(band.link)">
                        <p class="band-name">{{band.name}}</p>
                    </button>   
                </div>
            </div>
            <h4 class="location-title">Location</h4>
                <div class="location">
                    <gmap-map :center="concert.location.coords" :zoom="8" map-type-id="terrain" style="width: 100%; height: 256px;">
                        <gmap-marker :position="concert.location.coords" :clickable="true" @click="goToGMaps(concert.location.venue, concert.location.coords)"></gmap-marker>
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
            liked () {
                return this.likedConcerts && this.likedConcerts.includes(this.concert.key)
            },
            saved () {
                return this.savedConcerts && this.savedConcerts.includes(this.concert.key)
            },
            assisting () {
                return this.assistingConcerts && this.assistingConcerts.includes(this.concert.key)
            },

            formattedDate(){
                var date = new Date(this.concert.info.date), locale = 'en-EN',
                day= date.toLocaleString(locale, {day: "numeric"}),
                weekDay= date.toLocaleString(locale, {weekday: "long"}).toUpperCase(),
                month= date.toLocaleString(locale, {month: "short"}).substr(0, 3).toUpperCase(),
                year= date.toLocaleString(locale, {year: "numeric"});
                return {day, weekDay, month, year}
            }
        },        
                
        methods: {
            ...mapActions(['bindConcert', 'unbindConcert', 'likeConcert', 'saveConcert', 'unlikeConcert', 'unsaveConcert', 'assistConcert', 'leaveConcert']),
            ...mapMutations(['setConcertsFullRef']),
            like () {
                if (this.isAuthenticated) {
                    !this.liked ? this.likeConcert(this.concert.key) : this.unlikeConcert(this.concert.key)
                } else {
                    this.$notify({
                        type: 'info',
                        message: 'You need to login',
                        duration: 1000
                    })
                }   
            },
            save () {
                if (this.isAuthenticated) {
                    !this.saved ? this.saveConcert(this.concert.key) : this.unsaveConcert(this.concert.key)
                } else {
                    this.$notify({
                        type: 'info',
                        message: 'You need to login',
                        duration: 1000
                    })
                }
            },
            assist () {
                if (this.isAuthenticated) {
                    !this.assisting ? this.assistConcert(this.concert.key) : this.leaveConcert(this.concert.key)
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

            goToGMaps (venue, point) {
                window.location= "https://www.google.com/maps/search/?api=1&query=" + venue.replace(' ', '+') + '&query=' + point.lat + ',' + point.lng
            },

            goToLink (link) {
                window.location= '//'+link;
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
            width: 100%;
            padding-top: 66%;
            background-size: cover;
            background-position: center;
    }
    .concert-data {
        box-shadow: 0px -2px 10px rgba(0, 0, 0, .5);
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
                margin: 0px 0px -10px 0px;
                font-size: 2.5em;
                font-family: "Saira Extra Condensed";
            }
        }
        .genres {
            display: flex;
            justify-content: center;
            p {
                margin: 0;
            }
        }

        .description {
            font-style: italic;
            font-size: 1.25em;
            text-align: center;
        }

        .main-info {
            margin-top: 15px;
            justify-content: center;
            display: grid;
            grid-template-columns: 80px auto;
            grid-template-areas:
            "datebox time"
            "datebox money"
            "datebox location";
            align-items: center;
            p {
                margin: 0;
            }
            .info-datebox {
                grid-area: datebox;
                text-align: center;
                width: 64px;
                p {
                    font-size: 1.25em;
                    font-weight: bold;
                }
                #day{
                    font-size: 3em;
                    margin: -10px 0px;
                }
            }
            .info-time{
                grid-area: time;
            }
            .info-money{
                p {
                    font-size: 1.5em;
                }
                grid-area: money;
            }
            .info-location{
                grid-area: location;
            }
        }
        .bands {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            .band{
                margin: 5px;
                position: relative;
                background-size: cover;
                background-position: center;
                width: 160px;
                height: 96px;
                .band-body {
                    transition: background-color .25s ease-in;
                    position: absolute;
                    border: none;
                    width: 100%;
                    height: 100%;
                    font-size: 1em;
                    background-color: rgba(0, 0, 0, .6);
                    color: $baseColor;
                }
                .band-body:hover {
                    cursor: pointer;                    
                    background-color: rgba(0, 0, 0, .9);
                }
            }
        }
    }
</style>
