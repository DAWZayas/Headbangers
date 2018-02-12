<template>
    <div class="step-form">
        <h3>Location Info</h3>
        <el-form ref="form-location" :model="location" :rules="rules" action="javascript:void(0)">
            <div v-if="!manual" v-loading="!location">
                <el-form-item label="Place" prop="venue">
                    <gmap-autocomplete placeholder="Enter the name or address of the place" class="el-input__inner" :componentRestrictions="{country: 'es'}" @place_changed="setPlace"></gmap-autocomplete>
                </el-form-item>

                <gmap-map :center="{lat: location.coords.latitude, lng: location.coords.longitude}" :zoom="15"  style="width: 100%; height: 300px">
                    <gmap-marker v-if="marker" :position="{lat: location.coords.latitude, lng: location.coords.longitude}"></gmap-marker>
                </gmap-map>

                <a class="link" @click="manual = true">Can´t find the place? Enter it manually</a><br>
            </div>
            <div v-if="manual">                
                <el-form-item label="Venue Name" prop="venue">
                    <el-input placeholder="The Cavern" v-model="location.venue"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="Country" prop="country">
                            <br>
                            <el-select placeholder="Select" v-model="location.country" filterable class="full-width">
                                <el-option v-for="country in countryList.all" :key="country.alpha2" :value="country.alpha2" :label="country.name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="1">
                        <el-form-item label="City" prop="city">
                            <el-input placeholder="Liverpool" v-model="location.city"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="18">
                        <el-form-item label="Street" prop="street">
                            <el-input placeholder="Mathew Street" v-model="location.street"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col  :span="5" :offset="1">
                        <el-form-item label="Number" prop="number">
                            <el-input placeholder="10" v-model="location.number" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <a class="link" @click="manual = false">Search the place in google</a><br>
            </div>

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
            manual: false,
            location: {
                country: "",
                coords: {
                    latitude: 40.4168,
                    longitude: -3.7038
                },
                marker: false
            },
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
        }).catch(err => this.$notify({
                type: 'error',
                message: err
            })
        )
        
        this.askUserLocation()/*.then((userLocation) => {
            this.location.coords = userLocation.coords
        })
        */
    },
    computed: {
        ...mapGetters({ countryList: 'getCountries' , userCountry: 'getUserCountry', userLocation: 'getUserLocation'})
    },
    methods: {
        ...mapActions(['setUserCountry', 'askUserLocation']),
        setPlace(place){
            this.location.coords.latitude = place.geometry.location.lat()
            this.location.coords.longitude = place.geometry.location.lng()
            this.marker = true
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
