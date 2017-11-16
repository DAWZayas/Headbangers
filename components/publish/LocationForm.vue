<template>
    <div class="step-form">
        <h3>Location Info</h3>
        <el-form ref="form" :model="location">
            <el-form-item label="Venue Name">
                <el-input placeholder="where it gonna take place" v-model="location.name"></el-input>
            </el-form-item>
            <el-form-item label="Description">
                <el-input type="textarea" placeholder="warnings, restrictions, all info you can tell us about the place" v-model="location.description"></el-input>
            </el-form-item>
            <el-row :gutter="20">
                <el-col :span="13">
                    <el-form-item label="Street">
                        <el-input placeholder="skynyrd avenue" v-model="location.street"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="5" :sm="3" :md="3" :lg="3" :xl="3">
                    <el-form-item label="Number">
                        <el-input placeholder="21"v-model="location.number"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="Country">
                        <el-input placeholder="south korea" v-model="location.country"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="13">
                    <el-form-item label="City">
                        <el-input placeholder="amsterdam" v-model="location.city"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="8" :sm="5" :md="5" :lg="5" :xl="5">
                    <el-form-item label="ZIP Code">
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
                    name: "",
                    description: "",
                    street: "",
                    number: "",
                    country: "",
                    city: "",
                    code: ""
                }
            };
        },
        methods: {
            done() {
                this.$emit("done", this.location);
            },
            back() {
                this.$emit("back");
            }
        }
    };
</script>

