<template>
    <div>
        <div v-if='concert' class='ma'>
            <div class='event-title no-margin text-center'>{{concert.info.title}}</div>            
            <div class='event-img full-width marg2' :style='`background-image: url(${concert.info.poster})`' alt='imagen'></div>
            <div class='container'>
                <icon-text class = 'pad' icon='lnr-calendar-full':text='formattedDate'></icon-text>
                <icon-text class = 'pad' icon='lnr-clock':text='concert.info.time'></icon-text>
                <div class='container4 pad'>
                    <icon-text icon='lnr-database':text='concert.info.price'></icon-text>
                    <span class='pad4'> {{ concert.info.currency }}</span>
                </div>
            </div>
            <icon-text class = 'pad' icon='lnr-map-marker' :text='`${concert.location.venue} (${concert.location.number}, ${concert.location.street} - ${concert.location.city} - ${concert.location.country})`'></icon-text>
            <div class='full-width pad' >{{ concert.location.descripton }}</div>
            <hr class='marg1'>
            <div class='pad'><span class='black'>Bands: </span></div>
            <div v-for='band in concert.bands'>            
                <div class='pad pad2'>{{band.name}} ({{band.link}})</div>
                <div class='pad pad2 pad3'>{{band.description}}</div>
            </div>
            <hr class='marg1'>
            <div class='container2'>
                <span class='pad black'>Genres: </span>        
                <span class='pad pad4' v-for='genre in concert.genres'> {{genre}} </span>
            </div>
            <div class='full-width pad'><span class='black'>Description: </span> {{ concert.info.description }}</div>
            <hr class='marg1'>
            <div class='container3'>
                <div class='pad'><span class='black'>Assisting: </span>{{concert.assisting}}</div>
                <div class='pad'><span class='black'>Likes: </span>{{concert.likes}}</div>
            </div>
            <hr class='marg1'>
            <div class='pad pad3'><span class='black'>Author: </span> {{concert.author}}</div>
        </div>
    </div>
</template>
<script>

    import firebaseApp from '~/firebaseapp';
    import {mapActions, mapGetters} from 'vuex';
    import {IconText} from '~/components/common';

    export default {
        components: {
            IconText
        },
        computed:{
            ...mapGetters({concert: 'getConcertDetails'}),
            formattedDate(){ return new Date(Number(this.concert.info.date)).toLocaleDateString()},
        },
        created(){
            this.bindConcert(this.$route.params.id);
            //firebaseApp.database().ref('/concertsFull').child(this.id).on('value',function(concert){ this.concert = concert.val() }.bind(this))
        },
        beforeDestroy(){
            this.unbindConcert();
        },
        methods: {
            ...mapActions(['bindConcert', 'unbindConcert'])
        }
    }
</script>

<style lang='scss'>
    @import 'assets/styles/colors.scss';
    @import 'assets/styles/breakpoints.scss';
        
    .ma{
        color: $mainColorLight;
    }
    .event-img{
        margin-top: 3%;
        padding-top: 66%;
        background-size: cover;
        background-position: center;
    }
    .event-title{
        padding-top: 4%;
        color: $gray;
        font-size: 1.5em;
        font-weight: bolder;
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
        display: block;
        padding-top: 2%;
    }
    .container4{
        display: flex;
        justify-content: left;
        padding-top: 2%;
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
        padding-left: 1%;
    }
    .pad5{
        padding-left: 30%;
    }
    .pad6{
        padding-top: 5%;
    }
    .marg1{
        margin: 3% 5%;
    }
    .marg2{
        margin-top: 5%;
    }
    .black{
        font-weight: bold;
    }
    
    @media (min-width: $break-sm) and (max-width: $break-md) {
        .container{
            display: flex;
            justify-content: space-between;
        }
    }
    
    @media (min-width: $break-md) and (max-width: $break-lg) {
        .container{
            display: flex;
            justify-content: space-between;
        }
    }
    
    @media (min-width: $break-lg) and (max-width: $break-lg-xl) {
        .container{
            display: flex;
            justify-content: space-between;
        }
    }

</style>
