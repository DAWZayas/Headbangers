<template>
    <div class="step-form">
        <h3>Location Info</h3>
        <el-form ref="form-location" :model="location" :rules="rules">
            <el-form-item label="Venue Name" prop="venue">
                <el-input placeholder="where it gonna take place" v-model="location.venue"></el-input>
            </el-form-item>
            <el-form-item label="Description" prop="description">
                <el-input type="textarea" placeholder="warnings, restrictions, all info you can tell us about the place" v-model="location.description"></el-input>
            </el-form-item>
            <el-row :gutter="20">
                <el-col :span="13">
                    <el-form-item label="Street" prop="street">
                        <el-input placeholder="skynyrd avenue" v-model="location.street"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="5" :sm="3" :md="3" :lg="3" :xl="3">
                    <el-form-item label="Number" prop="number">
                        <el-input placeholder="21"v-model="location.number"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="Country" prop="country">
                        <el-input placeholder="south korea" v-model="location.country"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="13">
                    <el-form-item label="City" prop="city">
                        <el-input placeholder="amsterdam" v-model="location.city"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="8" :sm="5" :md="5" :lg="5" :xl="5">
                    <el-form-item label="ZIP Code" prop="code">
                        <el-input placeholder="56984" v-model="location.code"></el-input>
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
    export default {
        data() {
            return {
                location: {
                    venue: "",
                    description: "",
                    street: "",
                    number: "",
                    country: "",
                    city: "",
                    code: ""
                },
            rules: {
                venue: [
                    { required: true , message: 'Please input venue name.', trigger: 'blur' },
                    { required: true , pattern: /^[-a-zA-Z0-9_'\\&_/' ]*$/, message: 'Name must be alphanumeric.', trigger: 'blur' },
                    { max: 50, message: 'Length must be less than 50 characters.', trigger: 'blur' },
                ],
                description: [
                    { required: true, message: 'Please input a description.', trigger: 'blur' },
                    { max: 300, message: 'Length should be less than 300 characters.', trigger: 'blur' },
                ],
                street: [
                    { required: true , message: 'Please input street name.', trigger: 'blur' },
                    { required: true , pattern: /^[-a-zA-Z0-9_'\\&_/' ]*$/, message: 'Street name must be alphanumeric.', trigger: 'blur' },
                    { max: 30, message: 'Lenght must be less than 50 characters', trigger: 'blur' },

                ],
                number: [
                    { required: true , message: 'Please input number' , trigger: 'blur' },
                    { required: true , pattern: /^[0-9]+$/ , message: 'Please input a number' , trigger: 'blur' },
                    { max: 6 , message: 'The number must be less or equal than 999999', trigger: 'blur' }
                ],
                country: [
                    { required: true , message: 'Please input country name.', trigger: 'blur' },
                    { required: true , pattern: /^[-a-zA-Z0-9_'\\&_/' ]*$/, message: 'Country name must be alphanumeric.', trigger: 'blur' },
                    { max: 20, message: 'Lenght must be less than 20 characters', trigger: 'blur' },

                ],
                city: [
                    { required: true , message: 'Please input city name.', trigger: 'blur' },
                    { required: true , pattern: /^[-a-zA-Z0-9_'\\&_/' ]*$/, message: 'City name must be alphanumeric.', trigger: 'blur' },
                    { max: 30, message: 'Lenght must be less than 30 characters', trigger: 'blur' },

                ],
                code: [
                    { required: true , message: 'Please input Zip Code' , trigger: 'blur' },
                    { required: true , pattern: /^[0-9]+$/ , message: 'Please input a number' , trigger: 'blur' },
                    { max: 10 , message: 'The zip code must be less or equal than 9999999999', trigger: 'blur' }

                ]

                }
            };
        },
        methods: {
            done() {
                this.$refs['form-location'].validate((valid) => {
                    if (valid) {
                        this.$emit("done", this.location);
                    } else {
                        return false;
                    }
                });
            },
            back() {
                this.$emit("back");
            }
        }
    };
</script>

