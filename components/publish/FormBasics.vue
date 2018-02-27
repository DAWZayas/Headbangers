<template>
    <div class="step-form">
        <h3>Basic Info</h3>
        <el-form v-if="concert" ref="form-basics" :model="concert" :rules="rules" action="javascript:void(0)">

            <el-form-item label="Event title" prop="title">
                <el-input placeholder="Rock 'n' Roll Party" v-model="concert.title" :autofocus="true"></el-input>
            </el-form-item>

            <el-form-item label="Description" prop="description">
                <el-input type="textarea" v-model="concert.description" placeholder="A night to enjoy good music" :autosize="{ minRows: 2, maxRows: 6 }"></el-input>
            </el-form-item>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="Date" prop="date">
                        <br><el-date-picker v-model="concert.date" type="date" placeholder="Date" format="dd/MM/yyyy" :picker-options="{firstDayOfWeek: 1}"></el-date-picker>
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
                    <el-form-item>
                        <br>
                        <el-select placeholder="Currency" v-model="concert.currency" filterable class="full-width">
                            <el-option v-for="currency in currencyList.all" :key="currency.code" :value="currency.symbol" :label="currency.code"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="11" :offset="1" class="text-center">
                    <el-form-item label="Poster (3:2 ratio)" prop="poster">
                        <br>
                        <el-upload action="" accept="image/*" :on-change="fileAdded" :show-file-list="false" :auto-upload="false">
                            <el-button>{{ concert.poster ? 'Change' : 'Upload'}} <i class="el-icon-upload el-icon-right"></i></el-button>
                            <img class="poster-preview" v-if="concert.poster" :src="typeof concert.poster == 'string' ? concert.poster : concert.poster.url"> 
                        </el-upload>
                    </el-form-item>
                </el-col>
            </el-row>
    
            <div class="form-buttons">
                <el-button type="primary" native-type="submit"  @click="done">Next</el-button>
            </div>
    
        </el-form>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    data () {
        return {
            concert: {
                currency: ''
            },
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
                poster: [
                    { required: true, message: 'Please upload a poster' }
                ]}
        }
    },
    computed: {
        ...mapGetters({countryList: 'getCountries', currencyList: 'getCurrencies', userCountry: 'getUserCountry'})
    },
    watch: {
        userCountry (country) {
            this.concert.currency = this.currencyList[this.countryList[country].currencies[0]].symbol
        }
    },
    props: ['data'],
    created () {
        this.concert = {...this.data}
        if(this.data.date) this.concert.date = new Date(this.data.date)
        this.concert.currency = this.userCountry && this.currencyList[this.countryList[this.userCountry].currencies[0]].symbol
    },
    methods: {
        done () {
            this.$refs['form-basics'].validate(valid => valid ? this.$emit('done', this.concert) : false)
        },
        formatPrice (rules, value, callback) {
            if (value !== '' && !value.includes('.') && !value.includes(',')) {
                this.concert.price += '.00'
            }
            callback()
        },
        fileAdded (file) {
            this.concert.poster = file
        }
    }
}
</script>
<style>
.poster-preview{
    width: 100%;
    margin-top: 0.5em;
}
</style>
