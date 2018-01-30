<template>
    <div class='prueba'>
        <div v-if='concert'>
            <div class="color">
                <div class="cent"><div class='event-img' :style='`background-image: url(${concert.info.poster})`' alt='imagen'></div></div>
                <div class="likes"><icon-text icon="lnr-heart" :text="concert.likes"></icon-text></div>
                <div class='event-title no-margin text-center color'>{{concert.info.title}}</div>
                <div class='container ma color'>
                    <icon-text class = 'pad' icon='lnr-calendar-full' :text='formattedDate'></icon-text>
                    <icon-text class = 'pad' icon='lnr-clock' :text='concert.info.time'></icon-text>
                    <div class='container4 pad color'>
                        <img class='picSize' :src="iconMoney">
                        <icon-text icon='' :text='concert.info.price'></icon-text>
                        <span class='pad4'> {{ concert.info.currency }}</span>
                    </div>
                </div>
                <icon-text class = 'pad ma adress color' icon='lnr-map-marker' :text='`${concert.location.venue} (${concert.location.number}, ${concert.location.street} - ${concert.location.city} - ${concert.location.country})`'></icon-text>
                <div class='full-width pad ma adress color padding10' >{{ concert.location.descripton }}</div>
            </div>
            <div class="container0">
                <div class="item3 container5 container6">
                        <div class="full-width text-center item21" @click="like">
                            <icon-text v-if="!liked" icon="lnr-heart" text="Like"></icon-text>
                            <icon-text v-else icon="lnr-heart" class="liked-button" text="Liked"></icon-text>
                        </div>
                        <div class="full-width text-center item22" @click="save">
                            <icon-text v-if="!saved" icon="lnr-bookmark" text="Save"></icon-text>
                            <icon-text v-else icon="lnr-bookmark" class="saved-button" text="Saved"></icon-text>
                        </div>
                        <div class="full-width text-center item23">
                            <icon-text icon="lnr-bubble" text="Share"></icon-text>
                        </div>
                        <div class="full-width text-center item24">
                            <icon-text icon="lnr-bubble" text="Assist"></icon-text>
                        </div>
                    </div>
                <div class="item0">                    
                    <div class='pad space padding10'><span class='black'>Description: </span> {{ concert.info.description }}</div>
                    <hr class='marg1'>
                    <div class='container3'>
                        <div class='pad'><span class='black'>Assisting: </span>{{concert.assisting}}</div>
                        <div class='pad'><span class='black'>Likes: </span>{{concert.likes}}</div>
                    </div>                    
                    <hr class='marg1'>
                    <div class='container2 space2 padding10'>
                        <span class='pad black gen'>Genres: </span>
                        <span class='pad7 pad4' v-for='genre in concert.genres' :key="genre.name"><el-tag type="info" hit="true" class="brown"> {{genre}} </el-tag></span>
                    </div>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix bands">
                            <span class='bands'>Bands:</span>
                        </div>
                        <div v-for="band in concert.bands" :key="band.name" class="text item">
                            <div class="board">{{band.name}} ({{band.link}})</div>
                            <div class="board">{{band.description}}</div>   
                        </div>                        
                    </el-card>        
                </div>
                <div class="item4">
                    <gmap-map ref="map" :center="{lat:lat, lng:10}" :zoom="7" map-type-id="terrain" style="width: 500px; height: 300px" ></gmap-map>
                </div>
                <!--<div class="item4">
                    <p class='align' >Location: </p>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3034.9308697911406!2d-3.859885548799181!3d40.47679435980638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd41846582414961%3A0xe082b3d047b02889!2sCalle+Romero%2C+2%2C+28221+Majadahonda%2C+Madrid!5e0!3m2!1ses!2ses!4v1516783608414" width="95%" height="95%" frameborder="0" style="border:0" allowfullscreen></iframe>
                </div>/-->
            </div>
        </div>
    </div>
</template>
<script>

    import firebaseApp from '~/firebaseapp';
    import {mapActions, mapGetters} from 'vuex';
    import {IconText} from '~/components/common';
    //import * as VueGoogleMaps from '~/node_modules/vue2-google-maps/src/main';
       
    export default {
        data () {
            return {
                iconMoney: '/img/icons/money.svg',
                lat: 10
            }
        },
        components: {
            IconText
        },
        computed:{
            ...mapGetters({concert: 'getConcertDetails', likedConcerts: 'getUserLiked', savedConcerts: 'getUserSaved', isAuthenticated: 'isAuthenticated'}),
            formattedDate(){ return new Date(Number(this.concert.info.date)).toLocaleDateString()},
            liked () {
                return this.likedConcerts && Object.keys(this.likedConcerts).includes(this.id)
            },
            saved () {
                return this.savedConcerts && Object.keys(this.savedConcerts).includes(this.id)
            },
        },        
        mounted(){
            this.bindConcert(this.$route.params.id)
            //firebaseApp.database().ref('/concertsFull').child(this.id).on('value',function(concert){ this.concert = concert.val() }.bind(this))
        },
        beforeDestroy(){
            this.unbindConcert();
        },
        methods: {
            ...mapActions(['bindConcert', 'unbindConcert']),
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
        }
    }
</script>

<style lang='scss'>
    @import 'assets/styles/colors.scss';
    @import 'assets/styles/breakpoints.scss';
        
    .ma{
        color: $gray;
    }
    .event-img{
        padding-top: 66%;
        background-size: cover;
        background-position: center;
    }
    .event-title{
        padding: 4% 0;
        color: $gray;
        font-size: 1.5em;
        font-weight: bolder;
        border-bottom: thin $grayLighter solid;
    }
    .container{
        display: block;
        padding-top: 2%;
    }
    .container2{
        display: flex;
        justify-content: left;
        padding-top: 2%;
    }
    .container3{
        display: flex;
        justify-content: space-between;
        padding-top: 2%;
    }
    .container4{
        display: flex;
        justify-content: left;
        padding-top: 2%;
    }
    .container5{
        display: flex;
        justify-content: left;
        padding-top: 2%;
        padding-bottom: 2%;
    }
    .item4{
            margin: 3%;
            text-align: center;
    }
    .align{
        margin-left: 3%;
        margin-bottom: 0%;
        text-align: left;
        font-weight: bold;
    }
    .pad{
        padding: 1% 5% 1% 5%;
    }
    .pad2{
        padding-left: 10%;
    }
    .pad3{
        padding-bottom: 5%;
    }
    .pad4{
        padding-top: 0.7%;
        padding-left: 2%;
    }
    .pad5{
        padding-left: 30%;
    }
    .pad6{
        padding-top: 5%;
    }
    .pad7{
        padding: 0% 5% 1% 5%;
    }
    .likes{
        margin: -3% 0 1% 1%;
        background-color: transparent;
    }
    .marg1{
        margin: 3% 5%;
    }
    .space{
        padding-top: 5%;
    }
    .black{
        font-weight: bold;
    }
    .brown{
        background-color: $grayLight;
        color: $grayLighter; 
    }
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
    .box-card {
        width: 100%;
        border-color: $grayLight;
        border-style: solid;
        background-color: $grayLight;
        color: $grayLighter;
    }
    .board{
        padding-left: 5%;
    }
    .bands{
        font-weight: bold;
    }
    .color{
        background-color: $mainColorLighter;
        color: $baseColor;
        //border-bottom: thin $gray solid;
    }
    .italic{
        font-style: italic;
        font-size: 0.7em;
    }
    .space2{
        margin-bottom: 5%;
    }
    .gen{
        display: none;
    }
    .picSize{
        width: 1.5em;
        height: 1.5em;
        //background-color: pink;
    }
    
    @media (min-width: $break-sm) {
        // .prueba{
        //     background-color:red;
        // }
        .event-img{
            width: 60%;
            margin-top:03%;
            padding-top: 30%;
            margin-left: 15%;
        }        
        .event-title{
            padding: 2% 0;
        }
        .cent{
            background-color: $mainColor;
        }
        .container0{
            display: grid;
            grid-template-columns: 65% 35%;
            grid-template-rows: 100%;
        }
        .item0 {
            grid-column-start: 1;
            grid-column-end: 1;
            grid-row-start: 1;
            grid-row-end: 3;
        }
        .item1 {
            grid-column-start: 1;
            grid-column-end: 1;
            grid-row-start: 3;
            grid-row-end: 3;
            padding-top: 2%;
            padding-bottom: 2%;
        }
        .item3 {
            grid-column-start: 2;
            grid-column-end: 2;
            grid-row-start: 1;
            grid-row-end: 1;
            padding-top: 2%;
            padding-bottom: 2%;
        }
        .item4 {
            grid-column-start: 2;
            grid-column-end: 2;
            grid-row-start: 2;
            grid-row-end: 2;
            margin: 3%;
            //background-color:yellow;
            text-align: center;
        }
        .container6 {
            display: grid;
            grid-template-columns: 49% 1% 49%;
            grid-template-rows: 2fr; 
            margin: 5% 5% 5% 5%;
        }
        .item21 {
            grid-column-start: 1;
            grid-column-end: 1;
            grid-row-start: 1;
            grid-row-end: 1;
            background-color: $yellowLighter;
            //background-color: $accentColorDark;
            //border-style: solid;
            border-width: thin;
            padding: 8% 0 8% 0;
            border-radius: 5px;
            margin: 1.5px;
        }
        .item22 {
            grid-column-start: 3;
            grid-column-end: 3;
            grid-row-start: 1;
            grid-row-end: 1;
            background-color: $yellowLighter;
            //background-color: $mainColorLightest;
            //border-style: solid;
            border-width: thin;
            padding: 8% 0 8% 0;
            border-radius: 5px;
            margin: 1.5px;
        }
        .item23 {
            grid-column-start: 1;
            grid-column-end: 1;
            grid-row-start: 2;
            grid-row-end: 2;
            background-color: $yellowLighter;
            //background-color: $mainColorLightestLight;
            //border-style: solid;
            border-width: thin;
            padding: 8% 0 8% 0;
            border-radius: 5px;
            margin: 1.5px;
        }
        .item24 {
            grid-column-start: 3;
            grid-column-end: 3;
            grid-row-start: 2;
            grid-row-end: 2;
            background-color: $yellowLighter;
            //background-color: $brownLight;
            //border-style: solid;
            border-width: thin;
            padding: 8% 0 8% 0;
            border-radius: 5px;
            margin: 1.5px;
        }
        .marg1{
            margin: 0 5%;
        }
        .padding10{
            margin-bottom: 1%;
        }
        .pad{
            padding: 1% 5% 1% 5%;
        }
        .pad4{
            padding-top: 2%;
            padding-left: 8%;
        }
        .likes{
        margin: -3% 0 1% 1%;
        }
        .box-card {
            width: auto;
            margin: 0% 5% 0% 5%;
        }
        .container{
            display: flex;
            justify-content: space-between;
            padding-top: 0%;
        }
        .space2{
            margin-bottom: 1%;
        }
        .adress{
            text-align: center;
        }
        .gen{
        display: inline;
        }
    }

    @media (min-width: $break-md) {
        .container6 {
            display: grid;
            grid-template-columns: 24.5% 1% 24.5% 1% 24.5% 1% 24.5%;
            grid-template-rows: 1fr; 
            margin: 5% 5% 5% 5%;
        }
        .item21 {
            grid-column-start: 1;
            grid-column-end: 1;
            grid-row-start: 1;
            grid-row-end: 1;
            background-color: $yellowLighter;
            //border-style: solid;
            border-width: thin;
            padding: 8% 0 8% 0;
        }
        .item22 {
            grid-column-start: 3;
            grid-column-end: 3;
            grid-row-start: 1;
            grid-row-end: 1;
            background-color: $yellowLighter;
            //border-style: solid;
            border-width: thin;
            padding: 8% 0 8% 0;
        }
        .item23 {
            grid-column-start: 5;
            grid-column-end: 5;
            grid-row-start: 1;
            grid-row-end: 1;
            background-color: $yellowLighter;
            //border-style: solid;
            border-width: thin;
            padding: 8% 0 8% 0;
        }
        .item24 {
            grid-column-start: 7;
            grid-column-end: 7;
            grid-row-start: 1;
            grid-row-end: 1;
            background-color: $yellowLighter;
            //border-style: solid;
            border-width: thin;
            padding: 8% 0 8% 0;
        }
    }

</style>
