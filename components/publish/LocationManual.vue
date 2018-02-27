<template>
    <el-form ref="form-location" :model="location" :rules="rules" action="javascript:void(0)">
        <el-form-item label="Place Name" prop="venue">
            <el-input placeholder="The Cavern" v-model="location.venue"></el-input>
        </el-form-item>

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
        
        <el-row>
            <el-col :span="12">
                <el-form-item label="City" prop="city">
                    <el-input placeholder="Liverpool" v-model="location.city"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">
                <el-form-item label="Country" prop="country">
                    <br>
                    <el-select placeholder="Select" v-model="location.country" filterable class="full-width">
                        <el-option v-for="country in countryList.all" :key="country.alpha2" :value="country.alpha2" :label="country.name"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>

        <a class="link" @click="$emit('hide')">Search the place with google</a><br>

        <div class="form-buttons">
            <el-button @click="back">Back</el-button>
            <el-button type="primary" native-type="submit" @click="done">Next</el-button>
        </div>
    </el-form>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    data () {
        return {
            location: {
                venue: '',
                street: '',
                country: '',
                number: '',
                city: ''
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

                ]
            }
        }
    },
    props: ['data'],
    computed: {
        ...mapGetters({ countryList: 'getCountries', userCountry: 'getUserCountry'})
    },
    watch: {
        userCountry (country) {
            this.location.country = country
        }
    }, 
    created () {
        Object.assign(this.location, this.data)
        this.location.country = this.userCountry
    },
    methods: {
        done () {
            geolocator.geocode({'address': `${this.location.street} ${this.location.number} ${this.location.city} ${this.location.country}`}, (err, location) => {
                this.$refs['form-location'].validate(valid => {
                    if(valid){
                        if(!err){
                            this.location.coords = {lat: location.coords.latitude, lng: location.coords.longitude }
                        }
                        this.$emit('done', this.location)
                    }
                })
            })
        },
        back () {
            this.$emit('back', this.location)
        }
    }
}
</script>

