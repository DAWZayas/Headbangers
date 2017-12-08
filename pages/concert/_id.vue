<template>
    <div>
        <div v-if='concert' >
            <h3 class='event-title no-margin text-center'>{{concert.info.title}}</h3>
            <div class='event-img full-width' :style='`background-image: url(${concert.info.poster})`' alt='imagen'></div>
            <div class=''>
                <el-row>
                    <el-col :span='24'>
                        <icon-text icon='lnr-calendar-full' :text='formattedDate'></icon-text>
                    </el-col>
                    <el-col :span='24'>
                        <icon-text icon='lnr-clock' :text='concert.info.time'></icon-text> 
                    </el-col>
                    <el-col :span='24'>               
                        <icon-text icon='lnr-map-marker' :text='`${concert.location.venue} (${concert.location.number}, ${concert.location.street} - ${concert.location.city} - ${concert.location.country})`'></icon-text>
                    </el-col>                            
                    <el-col :span='24'>
                            <p class='full-width'>{{ concert.info.price }} {{ concert.info.currency }}</p>
                    </el-col>
                    <el-col :span='24'>
                            <p class='full-width'>{{ concert.location.descripton }}</p>
                    </el-col>
                    <el-col :span='24'>
                            <p class='full-width'>{{ concert.info.description }}</p>
                    </el-col>
                </el-row>
            </div>
            <hr>
            <div v-for='band in concert.bands'>
                <el-row>
                    <el-col :span='24'>
                        <p>Band:</p>
                        <p>{{band.name}} ({{band.link}})</p>
                        <p>{{band.description}}</p>
                    </el-col>
                </el-row>
            </div>
            <hr>
            <div>
                <el-row>
                    <el-col :span='24'
                        <p>genres: <span v-for='genre in concert.genres'>{{genre}} </span></p>
                        <p>Assisting: {{concert.assisting}}</p>
                        <p>autor: {{concert.author}}</p>
                        <icon-text icon='lnr-heart' :class='liked-button' :text='concert.likes'></icon-text>
                    </el-col>
                </el-row>
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
    .event-card {
        line-height: 2em;
        transition: box-shadow 1s;
        border: 1px solid $grayLighter;
        .lnr {
            color: $gray;
        }
        .el-card__body {
            padding: 0;
        }
    }
    
    .event-card:hover {
        cursor: pointer;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
        .event-info {
            .lnr {
                color: $accentColor;
            }
        }
        .event-img{
            transform: scale(1.05)
        }
    }
    
    .event-img{
        padding-top: 66%;
        background-size: cover;
        background-position: center;
        transition: transform 1s;
    }

    .event-title{
        color: $gray;
    }

    .event-info {
        color: $grayLight;
        .lnr {
            transition: color 1s;
        }
    }
    
    .article-more:hover {
        background-color: $accentColorLight;
    }
    
    .price-info {
        padding-top: .75em;
        font-size: 2em;
        color: $gray;
    }
    
    .event-buttons {
        display: flex;
        padding: 0.5em;
        >div {
            cursor: pointer;
            color: $grayLight;
        }
        >div:hover {
            color: $mainColorLightest;
        }
    }
    
    .liked-button {
        color: $mainColorLightest;
        .lnr {
            color: $secondaryColor;
        }
    }
    
    .saved-button {
        color: $mainColorLightest;
        .lnr {
            color: $green;
        }
    }
    
    @media (min-width: $break-sm) and (max-width: $break-md) {
        .event-title {
            font-size: 1em;
        }
        .event-info {
            font-size: .9em;
        }
        .price-info {
            padding-top: 1em;
            font-size: 1.70em;
        }
        .event-buttons {
            font-size: 0.9em;
        }
    }
    
    @media (min-width: $break-md) and (max-width: $break-lg) {
        .event-title {
            font-size: 1.15em;
        }
        .event-info {
            font-size: 1em;
        }
        .price-info {
            padding-top: .75em;
            font-size: 1.5em;
        }
        .event-buttons {
            font-size: 1em;
        }
        .el-col:nth-child(4) .event-card {
            display: none;
        }
    }
    
    @media (min-width: $break-lg) and (max-width: $break-lg-xl) {
        .event-title {
            font-size: 1em;
        }
        .event-info {
            font-size: .9em;
        }
        .price-info {
            padding-top: 1.25em;
            font-size: 1.5em;
        }
        .event-buttons {
            font-size: .8em;
        }
    }
</style>
