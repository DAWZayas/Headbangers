<template>

    <div class="filters">
        <div class="header">
            <icon-button icon="lnr-arrow-left" id="back-button" @click.native="hide"></icon-button>
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
                <el-slider v-model="sliderDate" show-stops :max="8" :format-tooltip="formatDateTooltip" range></el-slider>
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
            genreValues: [
                        'rock',
                        'punk',
                        'metal'
                        ],
            selectedGenres: [],
            dates: [
                    'today',
                    'this Week',
                    'next Week',
                    'this Month',
                    'next Month',
                    'the next three months',
                    'the next six months',
                    'this Year',
                    'next Year',
                    ],
            sliderDate: [0, 8],
            sliderDistance: 25,
            sliderPrice: [0, 500]
        }
    },

    computed: {
        
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
                this.filterByGenres(),
                this.filterByDate(),
                this.filterByDistance(),
                this.filterByPrice()
            ]
        }
    },

    methods: {

        formatDateTooltip(val) {
            return this.dates[val]
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

        filterByGenres (genres) {
            return function (concertsArray) {
                return concertsArray;
            } 
        },
        
        filterByDate (dateInterval) {
            return function (concertsArray) {
                return concertsArray;
            } 
        },
        
        filterByDistance (distance) {
            return function (concertsArray) {
                return concertsArray;
            } 
        },

        filterByPrice (priceInterval) {
            return function (concertsArray) {
                return concertsArray;
            } 
        },

        apply() {
            this.$emit('setFilters', this.filters);
            this.$emit('hide');
        },

        hide () {
            this.$emit('hide');
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
        margin: 0em;
        height: 100%;
        width: 100%;
        background-color: white;
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
            width: 35%;
            height: calc(100% + 9em);
            right: 0;
            .header{
                border-radius: 0;
            }
        }
    }
</style>

