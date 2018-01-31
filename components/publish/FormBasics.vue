<template>
    <div class="step-form">
        <h3>Basic Info</h3>
        <el-form v-if="concert" ref="form-basics" :model="concert" :rules="rules">

            <el-form-item label="Event title" prop="title">
                <el-input placeholder="Rock 'n' Roll Party" v-model="concert.title"></el-input>
            </el-form-item>

            <el-form-item label="Description" prop="description">
                <el-input type="textarea" v-model="concert.description" placeholder="A night to enjoy good music" :autosize="{ minRows: 2, maxRows: 6 }"></el-input>
            </el-form-item>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="Date" prop="date">
                        <br><el-date-picker v-model="concert.date" type="date" placeholder="Date" format="dd/MM/yyyy"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="11" :offset="1">
                    <el-form-item label="Time" prop="time">
                        <br><el-time-select v-model="concert.time" placeholder="Time" :picker-options="{ start: '00:00',  step: '00:30', end: '23:30'}"></el-time-select>
                    </el-form-item>
                </el-col>
            </el-row>
            
            <el-row>
                <el-col :span="8">
                    <el-form-item label="Price" prop="price">
                        <el-input placeholder="0.00" v-model="concert.price"> 
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item prop="currency">
                        <br>
                        <el-select v-model="concert.currency" placeholder="€">
                            <el-option value="€"></el-option>
                            <el-option value="$"></el-option>
                            <el-option value="£"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="11" :offset="1">
                    <el-form-item label="Poster" prop="poster">
                        <br>
                        <el-upload action="" accept="image/*" class="full-width" :on-success="fileAdded" :limit="1" >
                            <el-button class="full-width" >Upload Picture <i class="el-icon-upload el-icon-right"></i></el-button>
                            <div slot="tip" class="el-upload__tip">The best is a 3:2 aspect ratio</div>
                        </el-upload>
                    </el-form-item>
                </el-col>
            </el-row>
    
            <div class="form-buttons">
                <el-button type="primary" @click="done">Next</el-button>
            </div>
    
        </el-form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            concert: {},
            rules: {
                title: [
                    { required: true, message: 'Please, enter an event title.', trigger: 'blur' },
                    { pattern: /^[-a-zA-Z0-9_'\\&_/' ]*$/, message: 'Title must be alphanumeric.', trigger: 'blur' }
                ],
                date: [
                    { required: true, type: 'date', message: 'Please enter a date', trigger: 'blur' }
                ],
                time: [
                    { required: true, message: 'Please enter a time', trigger: 'blur' }
                ],
                description: [
                    { required: true, message: 'Please enter a description.', trigger: 'blur' },
                    { max: 300, message: 'Length should be less than 300 characters.', trigger: 'blur' }
                ],
                price: [
                    { required: true, message: 'Please enter a price.', trigger: 'blur' },
                    { required: true, pattern: /^[0-9]{1,3}([,.][0-9]{2})?$/, message: 'Price not valid.', trigger: 'blur' },
                    { validator: this.formatPrice, trigger: 'blur' }
                ],
                currency: [
                    { required: true, trigger: 'blur' }
                ],
                poster: [
                    { required: true, message: 'Please upload a poster' }
                ]}
        }
    },
    computed: {
        ...mapGetters({countryList: 'getCountries', currencyList: 'getCurrencyList', userCountry: 'getUserCountry'})
    },
    props: ['data'],
    created () {
        Object.assign(this.concert, this.data)
        this.concert.currency = this.countryList[this.userCountry].currency.code
    },
    methods: {
        done () {
            this.$refs['form-basics'].validate(valid => valid ? this.$emit('done', this.concert) : false)
        },
        formatPrice (rules, value, callback) {
            if (!value === '' && !value.includes('.') && !value.includes(',')) {
                this.concert.price += '.00'
            }
            callback()
        },
        fileAdded (response, file, fileList) {
            let self = this
            /* global blobUtil */
            blobUtil.blobToBase64String(file.raw).then(function (base64String) {
                self.concert.poster = 'data:' + file.raw.type + ';base64,' + base64String
            }).catch(function (err) {
                console.error(err)
                fileList = []
            })
        }
    }
}
</script>
