<template>

    <div>
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
                    <el-slider v-model="sliderDistance" :step="1" :max="11" :show-tooltip=false></el-slider>
                    <p>{{sliderDistanceString}}</p>
                </div>
            </div>
            <div id="filter-price">
                <h5>Price</h5>
                <div class="slider-flex">
                    <el-slider v-model="sliderPrice" :max="22" range></el-slider>
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
            sliderDistance: 11,
            distances: [1, 5, 10, 25, 50, 75, 100, 250, 500, 750, 1000, undefined],
            sliderPrice: [0, 22],
            prices: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 100, 200, 300, 400, 500, undefined]
        }
    },

    computed: {
        ...mapGetters({genreValues: 'getGenreList', usrLocation: 'getUserLocation'}),
        
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
            var distance = this.distances[this.sliderDistance]
            distance = distance !== undefined ? distance + ' Km' : 'ilimitado' 
            return distance
        },

        sliderPriceString: function () {
            var price = [this.prices[this.sliderPrice[0]], this.prices[this.sliderPrice[1]]] 
            price[0] = price[0] !== undefined ? price[0] : 1000
            price[1] = price[1] !== undefined ? price[1] : 'ilimitado'
            return price[0] + ' - ' + price[1] + ' €'
        },

        distanceSteps: function () {
            return this.distances[this.sliderDistance]
        },

        filters: function () {
            var sorting = this.sortingSubject(this.sortValue);
            return [
                this.order(sorting[0] , sorting[1]),
                this.filterByGenres(this.selectedGenres),
                this.filterByDate(this.dateMiliseconds),
                this.filterByDistance(this.distances[this.sliderDistance]),
                this.filterByPrice(this.prices[this.sliderPrice[0]], this.prices[this.sliderPrice[1]])
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
                    returnvalue = ['distance', 'asc'];
                    break;
                case 'cheaper':
                    returnvalue = ['price', 'asc'];
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
        
        filterByDistance (distanceMax) {
            var usrLoc = this.usrLocation
            distanceMax = distanceMax !== undefined ? distanceMax : Infinity
            return function (concertsArray) {
                return concertsArray.filter ( (currentValue) => {
                    var distance = geolocator.calcDistance({
                        from: {
                            latitude: usrLoc['coords']['latitude'],
                            longitude: usrLoc['coords']['longitude']
                        },
                        to: {
                            latitude: currentValue['coords']['lat'],
                            longitude: currentValue['coords']['lng']
                        },
                        formula: geolocator.DistanceFormula.HAVERSINE,
                        unitSystem: geolocator.UnitSystem.METRIC
                    });
                    return distance < distanceMax;
                });
            } 
        },

        filterByPrice (priceMin, priceMax) {
            priceMax = priceMax !== undefined ? priceMax : Infinity
            return function (concertsArray) {
                return concertsArray.filter ( (currentValue) => {
                   return currentValue['price'] > priceMin && currentValue['price'] < priceMax
                }); 
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
        position: absolute;
        width: 100%;
        height: 100%;
        right: -100%;
        top: 0;
        transition: ease-out .50s;
        z-index: 20;
        background-color: white;
        .header{
            background-color: $mainColorLight;
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
                    width: 45%;
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
@media (min-width: $break-sm) {
    .filters {
        width: 45%;
        right: -45%;
    }
}
@media (min-width: $break-md-lg) {
    .filters {
        width: 35%;
        right: -35%;
    }
}
@media (min-width: $break-lg-xl) {
    body {
        overflow-y: scroll;
    }
    .filters {
        width: 25%;
        right: 0;
    }
    .concerts-list {
        width: 75%;
    }
    #back-button {
        visibility: hidden;
    }
}
</style>

