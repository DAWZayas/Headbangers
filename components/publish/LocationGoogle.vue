<template>
    <el-form ref="form-google" :rules="rules" :model="form" action="javascript:void(0)">

        <el-form-item v-if="!placeSelected" label="Place" prop="place">
            <gmap-autocomplete v-if="location.country" placeholder="Enter the name of the place" class="el-input__inner" :types="['establishment']" :componentRestrictions="{country: location.country }" @place_changed="setPlace"></gmap-autocomplete>
        </el-form-item>

        <el-form-item v-else label="Place" prop="place">
            <el-input v-model="form.place" :readonly="true">
                <el-button @click="reset" slot="append" size="medium" icon="el-icon-close"></el-button>
            </el-input>
        </el-form-item>
        
        <gmap-map ref="map" :center="location.coords" :zoom="mapZoom" :options="{draggable: false}" style="width: 100%; height: 300px">
            <gmap-marker v-if="location.coords.lat !== 0 && location.coords.lng !== 0" :position="location.coords" :animation="2"></gmap-marker>
        </gmap-map>

        <a class="link" @click="$emit('hide')">Can´t find the place? Enter it manually</a><br>
    
        <div class="form-buttons">
            <el-button @click="back">Back</el-button>
            <el-button type="primary" @click="done">Next</el-button>
        </div>
        
    </el-form>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    data () {
        return{
            form:{
                place: ''
            },
            location: {
                coords: {
                    lat: 0,
                    lng: 0
                },
                country: ''
            },
            placeSelected: false,   
            mapZoom: 1,
            rules: {
                place: [
                    { required: true, message: 'Please enter the place.', trigger: 'blur' },
                    { validator: (rule, value, cb) => this.location.venue && this.location.street && this.location.number && this.location.city && this.location.coords.lat !== 0 && this.location.coords.lng !== 0 ? cb() : cb(new Error("Wrong place, select other or enter manually"))}
                ],
            }
        }
    },
    mounted () {
        this.getUserCountry().then(country => {
            this.location.country = country
        })
    },
    methods: {
        ...mapActions(['getUserCountry']),
        setPlace(place){
            this.location= {
                coords: {
                    lat: 0,
                    lng: 0
                },
                country: this.location.country
            }
            try{
                this.form.place = place.formatted_address
                this.location.venue = place.name
                this.location.street = place.address_components.filter(comp => comp.types.includes('route'))[0].long_name
                this.location.number = place.address_components.filter(comp => comp.types.includes('street_number'))[0].long_name
                this.location.city = place.address_components.filter(comp => comp.types.includes('locality'))[0].long_name
                this.location.coords = {lat: place.geometry.location.lat(), lng : place.geometry.location.lng()}
                this.mapZoom = 16;
                this.$refs.map.panTo(this.location.coords)
                this.placeSelected = true
                this.$refs['form-google'].validateField('place')
            }catch(err){
                this.$refs['form-google'].validateField('place')
            }
        },
        back () {
            this.$emit('back')
        },
        done () {
            this.$refs['form-google'].validate(valid => valid && this.$emit('done', this.location))
        },
        reset () {
            this.form.place = ''
            this.placeSelected = false
            this.location = {
                coords: {
                    lat: 0,
                    lng: 0
                },
                country: this.location.country
            }
            this.mapZoom = 1
        }
    }
}
</script>
