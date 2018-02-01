<template>
    <div class="step-form">
        <h3>Location Info</h3>
        <el-form ref="form-location" :model="location" :rules="rules" action="javascript:void(0)">
            <el-form-item label="Place" prop="venue">
                <gmap-autocomplete v-if="!placed" placeholder="Search a place or enter the name" class="el-input__inner" :types="['establishment']" @place_changed="setPlace"></gmap-autocomplete>
                <div class="place-name" v-if="placed" >
                    <br>
                    <el-input :readonly="true" v-model="location.venue">
                        <el-button slot="append" icon="el-icon-close" @click="reset"></el-button>
                    </el-input>
                </div>
            </el-form-item>
            <!--
            <el-form-item label="Venue Name" prop="venue">
                <el-input placeholder="The Cavern" v-model="location.venue"></el-input>
            </el-form-item>
            -->

            <el-row>
                <el-col :span="11">
                    <el-form-item label="Country" prop="country">
                        <br>
                        <el-select placeholder="Select" v-model="location.country" filterable class="full-width" :readonly="placed">
                            <el-option v-for="country in countryList.all" :key="country.alpha2" :value="country.alpha2" :label="country.name"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12" :offset="1">
                    <el-form-item label="City" prop="city">
                        <el-input placeholder="Liverpool" v-model="location.city" :readonly="placed"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="18">
                    <el-form-item label="Street" prop="street">
                        <el-input placeholder="Mathew Street" v-model="location.street" :readonly="placed"></el-input>
                    </el-form-item>
                </el-col>
                <el-col  :span="5" :offset="1">
                    <el-form-item label="Number" prop="number">
                        <el-input placeholder="10" v-model="location.number" :readonly="placed"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
                <div class="form-buttons">
                    <el-button @click="back">Back</el-button>
                    <el-button type="primary" native-type="submit" @click="done">Next</el-button>
                </div>
        </el-form>
    </div>
</template>
    
<script>
import { mapGetters, mapActions } from 'vuex'
import {IconButton} from '~/components/common'
export default {
    components: { IconButton },
    data () {
        return {
            placed: false,
            location: {},
            rules: {
                venue: [
                    { required: true, message: 'Please enter venue name.', trigger: 'blur' },
                    { pattern: /^[-a-zA-Z0-9_'\\&_/' ]*$/, message: 'Name must be alphanumeric.', trigger: 'blur' },
                    { max: 50, message: 'Length must be less than 50 characters.', trigger: 'blur' }
                ],
                street: [
                    { required: true, message: 'Please enter the street name.', trigger: 'blur' },
                    { required: true, pattern: /^[-a-zA-Z0-9_'\\&_/' ]*$/, message: 'Street name must be alphanumeric.', trigger: 'blur' },
                    { max: 30, message: 'Lenght must be less than 50 characters', trigger: 'blur' }
                ],
                number: [
                    { required: true, message: 'Please enter the number', trigger: 'blur' }
                ],
                country: [
                    { required: true, message: 'Please enter the country', trigger: 'blur' },
                    { required: true, pattern: /^[-a-zA-Z0-9_'\\&_/' ]*$/, message: 'Country name must be alphanumeric.', trigger: 'blur' },
                    { max: 20, message: 'Lenght must be less than 20 characters', trigger: 'blur' }

                ],
                city: [
                    { required: true, message: 'Please enter the city', trigger: 'blur' },
                    { required: true, pattern: /^[-a-zA-Z0-9_'\\&_/' ]*$/, message: 'City name must be alphanumeric.', trigger: 'blur' },
                    { max: 30, message: 'Lenght must be less than 30 characters', trigger: 'blur' }

                ],
                code: [
                    { required: true, message: 'Please enter Zip Code', trigger: 'blur' },
                    { required: true, pattern: /^[0-9]+$/, message: 'Please input a number', trigger: 'blur' },
                    { max: 10, message: 'The zip code must be less or equal than 9999999999', trigger: 'blur' }
                ]
            }
        }
    },
    props: ['data'],
    created () {
        Object.assign(this.location, this.data)
        this.setUserCountry().then((country) => {
            this.location.country = country
        }).catch(err => this.$notify)
        this.askUserLocation()
    },
    computed: {
        ...mapGetters({ countryList: 'getCountries' , userCountry: 'getUserCountry', userLocation: 'getUserLocation'})
    },
    methods: {
        ...mapActions(['setUserCountry', 'askUserLocation']),
        setPlace(place){
            if(place && place.address_components){
                this.placed = true
                this.location.venue = place.name
                this.location.country = place.address_components[5].short_name
                this.location.city = place.address_components[2].long_name
                this.location.street = place.address_components[1].long_name
                this.location.number = place.address_components[0].long_name
            }
        },
        reset(){
            this.placed = false
            this.location = {}
        },
        done () {
            this.$refs['form-location'].validate(valid => valid ? this.$emit('done', this.location) : false)
        },
        back () {
            this.$emit('back')
        }
    }
}
</script>
<style lang="scss">
    .place-name{
    
        .lnr{
            color: #000;
        }
    }
</style>
