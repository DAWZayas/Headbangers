<template>
    <div class='prueba'>
        <div v-if='concert'>
            <div class="color">
                <div class="cent"><div class='event-img full-width marg2 color' :style='`background-image: url(${concert.info.poster})`' alt='imagen'></div></div>
                <div class='event-title no-margin text-center color'>{{concert.info.title}}</div>
                <div class='container ma color'>
                    <icon-text class = 'pad' icon='lnr-calendar-full':text='formattedDate'></icon-text>
                    <icon-text class = 'pad' icon='lnr-clock':text='concert.info.time'></icon-text>
                    <div class='container4 pad color'>
                        <icon-text icon='lnr-database':text='concert.info.price'></icon-text>
                        <span class='pad4'> {{ concert.info.currency }}</span>
                    </div>
                </div>
                <icon-text class = 'pad ma adress color' icon='lnr-map-marker' :text='`${concert.location.venue} (${concert.location.number}, ${concert.location.street} - ${concert.location.city} - ${concert.location.country})`'></icon-text>
                <div class='full-width pad ma adress color padding10' >{{ concert.location.descripton }}</div>
            </div>
            <div class="container0">
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
                </div>
                <div class="item1">
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
            </div>
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
        mounted(){
            this.bindConcert(this.$route.params.id)
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
        color: $gray;
    }
    .event-img{
        //margin-top: 3%;
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
    .pad7{
        padding: 0% 5% 1% 5%;
    }
    .marg1{
        margin: 3% 5%;
    }
    .marg2{
        //margin-top: 5%;
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
        .item1 {
            grid-column-start: 2;
            grid-column-end: 2;
            grid-row-start: 1;
            grid-row-end: 1;
        }
        .item0 {
            grid-column-start: 1;
            grid-column-end: 1;
            grid-row-start: 1;
            grid-row-end: 1;
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
    
</style>
