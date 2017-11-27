<template>
    <div class="step-form">
        <h3>Location Info</h3>
        <el-form ref="form-location" :model="location" :rules="rules">
            <el-form-item label="Venue Name" prop="venue">
                <el-input placeholder="The Cavern" v-model="location.venue"></el-input>
            </el-form-item>

            <el-form-item label="Description" prop="description">
                <el-input type="textarea" placeholder="The world greatest rock n roll club" v-model="location.description"></el-input>
            </el-form-item>

            <el-row>
                <el-col :span="11">
                    <el-form-item label="Country" prop="country">
                        <br>
                        <el-select placeholder="Select" v-model="location.country" filterable class="full-width">
                            <el-option v-for="country in countryList" :key="country" :value="country"></el-option>
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
                        <el-input placeholder="10"v-model="location.number"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <div class="form-buttons">
            <el-button @click="back">Back</el-button>
            <el-button type="primary" @click="done">Next</el-button>
        </div>

    </div>
</template>
    
<script>
    import { mapMutations, mapGetters } from 'vuex';
    export default {
        data() {
            return {
                location: {},
                rules: {
                    venue: [
                        { required: true, message: 'Please enter venue name.', trigger: 'blur' },
                        { required: true, pattern: /^[-a-zA-Z0-9_'\\&_/' ]*$/, message: 'Name must be alphanumeric.', trigger: 'blur' },
                        { max: 50, message: 'Length must be less than 50 characters.', trigger: 'blur' },
                    ],
                    description: [
                        { required: true, message: 'Please enter a description.', trigger: 'blur' },
                        { max: 300, message: 'Length should be less than 300 characters.', trigger: 'blur' },
                    ],
                    street: [
                        { required: true, message: 'Please enter the street name.', trigger: 'blur' },
                        { required: true, pattern: /^[-a-zA-Z0-9_'\\&_/' ]*$/, message: 'Street name must be alphanumeric.', trigger: 'blur' },
                        { max: 30, message: 'Lenght must be less than 50 characters', trigger: 'blur' },

                    ],
                    number: [
                        { required: true, message: 'Please enter the number', trigger: 'blur' },
                    ],
                    country: [
                        { required: true, message: 'Please enter the country', trigger: 'blur' },
                        { required: true, pattern: /^[-a-zA-Z0-9_'\\&_/' ]*$/, message: 'Country name must be alphanumeric.', trigger: 'blur' },
                        { max: 20, message: 'Lenght must be less than 20 characters', trigger: 'blur' },

                    ],
                    city: [
                        { required: true, message: 'Please enter the city', trigger: 'blur' },
                        { required: true, pattern: /^[-a-zA-Z0-9_'\\&_/' ]*$/, message: 'City name must be alphanumeric.', trigger: 'blur' },
                        { max: 30, message: 'Lenght must be less than 30 characters', trigger: 'blur' },

                    ],
                    code: [
                        { required: true, message: 'Please enter Zip Code', trigger: 'blur' },
                        { required: true, pattern: /^[0-9]+$/, message: 'Please input a number', trigger: 'blur' },
                        { max: 10, message: 'The zip code must be less or equal than 9999999999', trigger: 'blur' }
                    ]
                }
            };
        },
        props: ['data'],
        created(){
            Object.assign(this.location, this.data)
        },
        computed: {
            ...mapGetters({ countryList: 'getCountryList'}),
        },
        methods: {
            done() { 
                this.$refs["form-location"].validate(valid => valid ? this.$emit('done', this.location) : false) 
            },
            back() { 
                this.$emit("back") 
            }
        }
    };
</script>

