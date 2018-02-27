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
                <el-select v-model="date">
                    <el-option v-for="(option, index) in dates" :key="index" :value="index" :label="option">
                    </el-option>
                </el-select>
            </div>
            <div id="filter-distance">
                <h5>Distance</h5>
                <div class="slider-flex">
                    <el-slider v-model="sliderDistance" :step="1" :max="13" :show-tooltip=false></el-slider>
                    <p>{{sliderDistanceString}}</p>
                </div>
            </div>
            <div id="filter-price">
                <h5>Price</h5>
                <div class="input-range">
                    <p>From</p><el-input-number :controls=false v-model="priceRange[0]"></el-input-number>
                    <p>to</p><el-input-number :controls=false v-model="priceRange[1]"></el-input-number><p>€</p>
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
                        'Cheaper',
                        'People Assisting',
                    ],
            sortValue: 'Sooner',
            selectedGenres: [],
            dates: [
                    'Today',
                    'This Week',
                    'This Month',
                    'Next Six Months',
                    'This Year',
                    'Next Year',
                    ],
            date: 5,
            distances: [1, 5, 10, 15, 20, 25, 50, 75, 100, 250, 500, 750, 1000, undefined],
            sliderDistance: 11,
            priceRange: [0, 999],
        }
    },

    watch: {
        userLocation()  {
            if (this.userLocation) {
                this.sorting.splice(1, 0, 'Nearer')
            }
        }
    },

    computed: {
        ...mapGetters({genreValues: 'getGenreList', userLocation: 'getUserLocation'}),
        
        dateMiliseconds: function () {
            return this.transformToMs(this.date)
        },

        sliderDistanceString: function () {
            var distance = this.distances[this.sliderDistance]
            distance = distance !== undefined ? distance + ' Km' : 'unlimited' 
            return distance
        },

        sliderPriceString: function () {
            var price = [this.prices[this.sliderPrice[0]], this.prices[this.sliderPrice[1]]] 
            price[0] = price[0] !== undefined ? price[0] : 1000
            price[1] = price[1] !== undefined ? price[1] : 'unlimited'
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
                this.filterByPrice(this.priceRange[0], this.priceRange[1])
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
                    return today + 604800000 - (dayOfTheWeek * 86400000);
                    break;
                case 2:
                    return today + 2629746000 - (dayOfTheMonth * 86400000);
                    break;
                case 3:
                    return today + 15778476000 - (dayOfTheMonth * 86400000);
                    break;
                case 4:
                    return today + 31556952000 - (dayOfTheYear * 86400000);
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
                        return currentValue['date'] <= date;
                } );
            }  
        },
        
        filterByDistance (distanceMax) {
            if (this.userLocation) {
                var usrLoc = this.userLocation
                distanceMax = distanceMax !== undefined ? distanceMax : Infinity
                return (concertsArray) => {
                    return concertsArray.filter ( (currentValue) => {
                        var distance = geolocator.calcDistance({
                            from: {
                                latitude: usrLoc.coords.latitude,
                                longitude: usrLoc.coords.longitude
                            },
                            to: {
                                latitude: currentValue.coords.lat,
                                longitude: currentValue.coords.lng
                            },
                            formula: geolocator.DistanceFormula.HAVERSINE,
                            unitSystem: geolocator.UnitSystem.METRIC
                        });
                        return distance <= distanceMax
                    });
                }
            } else {
                return (concertsArray) => {
                    return concertsArray
                }
            }
        },

        filterByPrice (priceMin, priceMax) {
            return function (concertsArray) {
                return concertsArray.filter ( (currentValue) => {
                   return currentValue['price'] >= priceMin && currentValue['price'] <= priceMax
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
        height: 100%;
        right: 0;
        top: 0;
        transition: ease-out .5s;
        z-index: 20;
        background-color: white;
            .header{
                display: flex;
                justify-content: space-between;
                padding: .5em 1em;
                background-color: $mainColorLight;
                box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
                    button {
                        cursor: pointer;
                    }
                    #apply-button {
                        margin-top: -2px;
                        border: none;
                        font-size: 1.25em;
                        font-weight: lighter;
                        color: white;
                        background: transparent;
                    }
            }
        .filters-form{
            padding: 0em 1.25em;
                .el-slider__bar {
                    background-color: $mainColorLightest;
                }
                
                .el-slider__button {
                    border-color: $mainColorLighter;
                }

                > div {
                        h5 {
                            margin-top: 1em;
                            margin-bottom: .25em;
                        }
                        > *:not(h5) {
                            width: calc(100% - 2em);
                            margin: 0em 1em;
                        }
                } 
                .slider-flex {
                    display: flex;
                    text-align: center;
                        .el-slider {
                            width: 65%;
                        }
                        p {  
                            padding-left: .75em;
                            margin-top: .5em;
                            width: 35%;
                            color: $gray;
                        }
                }  
                .input-range {
                    display: flex;
                    justify-content: space-around;
                        .el-input-number {
                            width: 25%;
                        }
                }      
        }
    }
@media (min-width: $break-xs) {
    .filters {
        width: 70%;
    }
}
@media (min-width: $break-xs-sm) {
    .filters {
        width: 55%;
    }
}
@media (min-width: $break-sm) {
    .filters {
        width: 45%;
    }
}
@media (min-width: $break-sm-md) {
    .filters {
        width: 35%;
    }
}
@media (min-width: $break-md-lg) {
    .filters {
        width: 30%;
    }
}
@media (min-width: $break-lg-xl) {
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

