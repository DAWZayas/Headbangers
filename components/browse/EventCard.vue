<template>
    <el-card class="event-card">
        <nuxt-link :to="'/concert/'+concert.key">
            <div style="overflow: hidden;">
                <div class="likes-badge"><icon-text icon="lnr-heart" :text="concert.likes"></icon-text></div>
                <div class="event-img full-width" :style="`background-image: url(${concert.poster})`"></div>
            </div>
            <h3 class="event-title no-margin text-center">{{concert.title}}</h3>
            <div class="event-info padding">
                <el-row>
                    <el-col :span="12">
                        <icon-text icon="lnr-calendar-full" :text="formattedDate"></icon-text>
                        <icon-text icon="lnr-clock" :text="concert.time"></icon-text>
                    </el-col>
                    <el-col :span="12">
                        <div class="price-info text-center">
                            {{ concert.price }} {{ concert.currency }}
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <icon-text icon="lnr-map-marker" :text="`${concert.venue} (${concert.city})`"></icon-text>
                </el-row>
            </div>
        </nuxt-link>
        <hr>
        <div class="event-buttons">
            <div class="full-width text-center" @click="like">
                <icon-text v-if="!liked" icon="lnr-heart" text="Like"></icon-text>
                <icon-text v-else icon="lnr-heart" class="liked-button" text="Liked"></icon-text>
            </div>
            <div class="full-width text-center" @click="save">
                <icon-text v-if="!saved" icon="lnr-bookmark" text="Save"></icon-text>
                <icon-text v-else icon="lnr-bookmark" class="saved-button" text="Saved"></icon-text>
            </div>
            <div class="full-width text-center">
                <icon-text icon="lnr-bubble" text="Share"></icon-text>
            </div>
        </div>
    </el-card>
</template>

<script>
    import {IconText} from '~/components/common'
    import {mapActions, mapGetters} from 'vuex'
    export default {
        components: {
            IconText
        },
        props: ['concert'],
        computed: {
            ...mapGetters({likedConcerts: 'getUserLiked', savedConcerts: 'getUserSaved', isAuthenticated: 'isAuthenticated'}),
            liked () {
                return this.likedConcerts && this.likedConcerts.includes(this.concert.key)
            },
            saved () {
                return this.savedConcerts && this.savedConcerts.includes(this.concert.key)
            },
            formattedDate () {
                return new Date(Number(this.concert.date)).toLocaleDateString()
            }
        },
        methods: {
            ...mapActions(['likeConcert', 'saveConcert', 'unlikeConcert', 'unsaveConcert']),
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
            }
        }
    }
</script>

<style lang='scss'>
    @import "assets/styles/colors.scss";
    @import "assets/styles/breakpoints.scss";
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
    
    .likes-badge{
        color: #fff;
        position: absolute;
        background-color: rgba(0, 0, 0, 0.5);
        margin: 0.5em;
        padding: 0 0.5em;
        font-size: 0.8em;
        border-radius: 0.5em;
        z-index: 5;
        .lnr{
            color: #fff;
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
