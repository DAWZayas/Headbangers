<template>
    <el-card class="event-card">
        <img class="card-img" :src="img">
        <h3 class="event-card-title">{{title}}</h3>
        <div class="event-info">
            <el-row>
                <el-col :span="12">
                    <icon-text class="card-data" icon="lnr-calendar-full" :text="date"></icon-text>
                    <icon-text class="card-data" icon="lnr-clock" :text="time"></icon-text>
                </el-col>
                <el-col :span="12">
                    <div class="price-info">
                        {{ price }} €
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <icon-text class="card-data" icon="lnr-map-marker" :text="location"></icon-text>
            </el-row>
        </div>
        <hr>
        <div class="event-buttons">
            <button @click="liked = !liked">
                <icon-text icon="lnr-heart" :class="likeClass" :text="likeText"></icon-text>
            </button>
            <button @click="saved = !saved">
                <icon-text icon="lnr-bookmark" :class="saveClass" :text="saveText"></icon-text>
            </button>
            <button>
                <icon-text icon="lnr-bubble" text="Share"></icon-text>
            </button>
        </div>
    </el-card>
</template>

<script>
    import IconText from "./IconText";
    export default {
        name: "event-card",
        components: {
            IconText
        },
        data: () => ({
            id: "01",
            img: "img/placeholder.png",
            title: "Concierto en nosedonde",
            date: "01/Feb/18",
            time: "22:00",
            location: "Sala Galileo, Madrid",
            price: "9,00",
            liked: false,
            saved: false
        }),
        computed: {
            likeClass: function() {
                return this.liked && 'liked-button'
            },
            likeText: function() {
                return (this.liked) ? 'Liked' : 'Like'
            },
            saveClass: function() {
                return this.saved && 'saved-button'
            },
            saveText: function() {
                return (this.saved) ? 'Saved' : 'Save'
            },
        }
    }
</script>

<style lang='scss'>

    @import "assets/styles/colors.scss";
    @import "assets/styles/breakpoints.scss";

    .event-card {
        line-height: 2em;
        transition: box-shadow 0.3s;
        border: 1px solid $grayLighter;
        
        h3 {
            margin: 0;
            text-align: center;
        }   
        
        .lnr {
            color: $gray;
        }
        .el-card__body {
        padding: 0;
        }
    }

    .event-card:hover {
        cursor: pointer;
            
        .event-info {
            
             .lnr {
                    color: $accentColor;
                }
            }
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    }


    .event-info {
        color: $grayLight;
        padding: 1em;
        
        .lnr {
            transition: color 0.2s;
        }
    }
    
    .card-img {
        width: 100%;
    }
    
    .article-more:hover {
        background-color: $accentColorLight;
    }

    .price-info {
        padding-top: .75em;
        font-size: 2em;
        text-align: center;
        color: $gray;
    }
    
    .event-buttons {
        display: flex;
        padding: 0.5em;
        
        > button {
            cursor: pointer;
            width: 100%;
            border: none;
            background-color: transparent;
            font-size: 0.8em;
            font-weight: bold;
            color: $grayLight;
        }
        > button:hover {
            color: $mainColorLightest;
        }
    }
    
    hr {
        margin: 0 0 0 5%;
        width: 90%;
        height: .075em;
        border: 0;
        background-color: $grayLight;
    }
    
    .liked-button {
        .lnr {
        color: $secondaryColor;
        }
    }
    
    .saved-button {
        .lnr {
        color: $green;
        }
    }

    @media (min-width: $break-sm) and (max-width: $break-md) {
        .event-card-title{
            font-size: 1em;
        }
        .card-data{
            font-size: .9em;
        }
        .price-info {
            padding-top: 1em;
            font-size: 1.70em;
        }
        .event-buttons{
            font-size: 0.9em;
        }
    }
    
    @media (min-width: $break-md) and (max-width: $break-lg) {
        .event-card-title{
            font-size: 1.25em;
        }
        .card-data{
            font-size: 1.15em;
        }
        .price-info {
            padding-top: .75em;
            font-size: 2em;
        }
        .event-buttons{
            font-size: 1.15em;
        }
    }

    @media (min-width: $break-lg) and (max-width: $break-lg-xl) {
        .event-card-title{
            font-size: 1em;
        }
        .card-data{
            font-size: .9em;
        }
         .price-info {
            padding-top: 1.25em;
            font-size: 1.5em;
        }
        .event-buttons{
            font-size: .8em;
        }
    }
   
    
</style>
