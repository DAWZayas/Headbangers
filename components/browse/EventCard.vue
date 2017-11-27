<template>
    <el-card class="event-card">
        <div class="event-img full-width" :style="`background-image: url(${concert.poster})`">
        </div>
        <h3 class="event-card-title">{{concert.title}}</h3>
        <div class="event-info">
            <el-row>
                <el-col :span="12">
                    <icon-text icon="lnr-calendar-full" :text="formattedDate"></icon-text>
                    <icon-text icon="lnr-clock" :text="concert.time"></icon-text>
                </el-col>
                <el-col :span="12">
                    <div class="price-info">
                        {{ concert.price }} {{ concert.currency }}
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <icon-text icon="lnr-map-marker" :text="`${concert.venue} (${concert.city})`"></icon-text>
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
    import {IconText} from "~/components/common";
    export default {
        name: "event-card",
        data(){
            return {
                liked: false,
                saved: false
            }
        },
        components: {
            IconText
        },
        props: ['concert'],
        computed: {
            formattedDate(){ return new Date(Number(this.concert.date)).toLocaleDateString()},
            likeClass() {
                return this.liked && 'liked-button'
            },
            likeText() {
                return (this.liked) ? 'Liked' : 'Like'
            },
            saveClass() {
                return this.saved && 'saved-button'
            },
            saveText() {
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
        .event-img{
            padding-top: 66%;
            background-size: cover;
            background-position: center;
        }
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
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
        .event-info {
            .lnr {
                color: $accentColor;
            }
        }
    }
    
    .event-info {
        color: $grayLight;
        padding: 1em;
        .lnr {
            transition: color 0.2s;
        }
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
        >button {
            cursor: pointer;
            width: 100%;
            border: none;
            background-color: transparent;
            font-size: 0.8em;
            font-weight: 600;
            color: $grayLight;
        }
        >button:hover {
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
        .event-card-title {
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
        .event-card-title {
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
            font-size: 1.15em;
        }
        .el-col:nth-child(4) .event-card {
            display: none;
        }
    }
    
    @media (min-width: $break-lg) and (max-width: $break-lg-xl) {
        .event-card-title {
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
