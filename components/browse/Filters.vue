<template>

    <div class="filters">
        <div class="header">
            <icon-button icon="lnr-arrow-right" id="back-button" @click.native="hide"></icon-button>
            <button id="apply-button" @click="apply">Apply</button>
        </div>
        <div class="filters-form">
            <div id="filter-sort">
                <h5>Sort by</h5>
                <el-select v-model="sortValue" default-first-option>
                    <el-option v-for="option in sorting" :key="option" :value="option" :label="option">
                    </el-option>
                </el-select>
            </div>
            <div id="filter-genres">
                <h5>Genres</h5>
                <el-select v-model="selectedGenres" multiple placeholder="All">
                    <el-option v-for="option in genreValues" :key="option" :label="option" :value="option">
                     </el-option>
                </el-select>
            </div>
            <div id="filter-date">
                <h5>Date</h5>
                <el-slider v-model="sliderDate" show-stops :max="5" :format-tooltip="formatDateTooltip" range></el-slider>
                <p>{{sliderDateString}}</p>
            </div>
            <div id="filter-distance">
                <h5>Distance</h5>
                <div class="slider-flex">
                    <el-slider v-model="sliderDistance" :step="10" :max="750"></el-slider>
                    <p>{{sliderDistanceString}}</p>
                </div>
            </div>
            <div id="filter-price">
                <h5>Price</h5>
                <div class="slider-flex">
                    <el-slider v-model="sliderPrice" :max="500" range></el-slider>
                    <p>{{sliderPriceString}}</p>
                </div>
            </div>
        </div>
    </div>
  
</template>
<script>
import IconButton from '~/components/common/IconButton'
import {mapGetters} from 'vuex'
export default {
    data () {
        return {
            sorting: [
                        'Sooner',
                        'Likes',
                        'Nearer',
                        'Cheaper',
                        'People Assisting',
                    ],
            sortValue: 'Sooner',
            selectedGenres: [],
            dates: [
                    'today',
                    'next Week',
                    'next Month',
                    'the next six months',
                    'this year',
                    'next Year',
                    ],
            sliderDate: [0, 5],
            sliderDistance: 25,
            sliderPrice: [0, 500]
        }
    },

    computed: {
        ...mapGetters({genreValues: 'getGenreList'}),
        
        dateMiliseconds: function () {
            return [this.transformToMs(this.sliderDate[0]), this.transformToMs(this.sliderDate[1])]
        },

        sliderDateString: function () {
            var string = this.sliderDate + ''
            string = string.split(',');
            string[0] = this.dates[string[0]];
            string[1] = this.dates[string[1]];
            return 'From ' + string.join(' till ') + '.';

        },
        sliderDistanceString: function () {
            var string = this.sliderDistance + ''
            return string + ' Km'
        },

        sliderPriceString: function () {
            var string = this.sliderPrice + ''
            return string.split(',').join(' - ') + ' €'
        },

        filters: function () {
            var sorting = this.sortingSubject(this.sortValue);
            return [
                this.order(sorting[0] , sorting[1]),
                this.filterByGenres(this.selectedGenres),
                this.filterByDate(this.dateMiliseconds),
                this.filterByDistance(),
                this.filterByPrice(this.sliderPrice)
            ]
        }
    },

    methods: {

        apply() {
            this.$emit('setFilters', this.filters);
            this.hide();
        },
        hide() {
            this.$emit('hide');
        },
        formatDateTooltip(val) {
            return this.dates[val]
        },

        transformToMs (date) {
            var today = new Date().getTime();
            var dayOfTheWeek = new Date().getDay();
            var dayOfTheMonth = new Date ().getDate();
            var dayOfTheYear = Math.round(((today - new Date(new Date().getFullYear(), 0, 1)) / 86400000) + .5, 0);
            switch (date) {
                case 0:
                    return today;
                    break;
                case 1:
                    return today + 1209600000 - (dayOfTheWeek * 86400000);
                    break;
                case 2:
                    return today + 5259500000 - (dayOfTheMonth * 86400000);
                    break;
                case 3:
                    return today + 15778500000 - (dayOfTheMonth * 86400000);
                    break;
                case 4:
                    return today + 31557000000 - (dayOfTheYear * 86400000);
                    break;
                case 5:
                    return today + 63113904000 - (dayOfTheYear * 86400000);
                    break;
            }
        },

        sortingSubject (subject) {
            var sorting = subject.toLowerCase();
            var returnvalue = [];
            switch (sorting) {
                case 'likes':
                    returnvalue = ['likes', 'desc'];
                    break;
                case 'nearer':
                    // navigator.geolocation.getCurrentPosition( this.setLocation );
                    break;
                case 'cheaper':
                    returnvalue = [ 'price', 'asc'];
                    break;
                case 'people assisting':
                    returnvalue = ['assisting', 'desc'];     
                    break;
                default:
                    returnvalue = ['sooner', 'asc'];
                    break;
            }
            return returnvalue;
        },

        order(subject, order){
            return function (concertsArray) {
                if (order == 'asc') {
                    concertsArray = concertsArray.sort(function (a, b) {return a[subject] - b[subject]});
                }else if (order == 'desc') {
                    concertsArray = concertsArray.sort(function (a, b) {return b[subject] - a[subject]});
                }
                return concertsArray;
            }
        },

        filterByGenres (selectedGenres) {
            return function (concertsArray) {
                return concertsArray.filter ( (currentValue) => {
                    var returnValue = selectedGenres.length == 0 ? true : false;
                    for (var i = 0; i < selectedGenres.length; i++) {
                        if (currentValue['genres'].includes(selectedGenres[i])) {
                            returnValue = true;
                        }else{
                            returnValue = false;
                        }
                    }
                    return returnValue;
                } );
            } 
        },
        
        filterByDate (date) {
           return function (concertsArray) {
                return concertsArray.filter ( (currentValue) => {
                        return currentValue['date'] > date[0] && currentValue['date'] < date[1];
                } );
            }  
        },
        
        filterByDistance (distance) {
            return function (concertsArray) {
                return concertsArray;
            } 
        },

        filterByPrice (priceInterval) {
            return function (concertsArray) {
                return concertsArray.filter ( (currentValue) => {
                   return currentValue['price'] > priceInterval[0] && currentValue['price'] < priceInterval[1];
                } ); 
            }
        }
    },
    components: {
        IconButton
    }
}
</script>
<style lang="scss">
    @import "assets/styles/colors.scss";
    @import "assets/styles/breakpoints.scss";
    .filters{
        position: fixed;
        width: 25%;
        z-index: 5;
        height: 100%;
        background-color: white;
        overflow: hidden;
        .header{
            background-color: $mainColorLight;
            border-radius: .1em;
            box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
            > * {
                cursor: pointer;
                padding: .5em 1em;
                border: none;
                color: white;
                background-color: transparent;
            }
            #apply-button{
                padding-top: .75em;
                font-size: 1.25em;
                font-weight: lighter;
                float: right;
            }
        }
        .filters-form{
            height: calc(100% - 5.75em);
            margin: 0em 1em;
            .el-slider__bar{
                background-color: $mainColorLightest;
            }
            .el-slider__button{
                border-color: $mainColorLighter;
            }
            > div{
                margin: 0em .5em;
                h5{
                    margin: 1em 0em .25em 0em;
                }
                > *:not(h5){
                    width: calc(100% - 2em);
                    margin: 0em 1em;
                }
            }
            #filter-date > p{
                font-size: .75em
            }   
            .slider-flex{
                display: flex;
                text-align: center;
                .el-slider{
                    width: 65%;
                }
                p{  
                    padding-left: .75em;
                    margin-top: .5em;
                    width: 40%;
                    color: $gray;
                }
            }        
        }
    }
    @media (min-width: $break-xs-sm){
        .filters{
            width: 25%;
            .header{
                border-radius: 0;
            }
            #filters-sort > .el-select {
                width: calc(100% - 1em);
                margin: 0em .5em;
            }
            #filters-filter{
                > div{
                    margin: 0em .5em;
                    h5{
                        margin: .5em 0em .25em 0em;
                    }
                    > *:not(h5){
                        width: calc(100% - 2em);
                        margin: 0em 1em;
                    }
                }
                #filter-date > p{
                    font-size: .75em
                }   
                .slider-flex{
                    display: flex;
                    text-align: center;
                    .el-slider{
                        width: 65%;
                    }
                    p{  
                        padding-left: .75em;
                        margin-top: .5em;
                        width: 40%;
                        color: $gray;
                    }
                }
            }
        
        }
    }
</style>

