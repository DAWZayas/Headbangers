<template>
    <div class="step-form">
        <h3>Basic Info</h3>
    
        <el-form ref="form" :model="basics">
    
            <el-form-item label="Event name">
                <el-input placeholder="name" v-model="basics.name"></el-input>
            </el-form-item>
    
            <el-form-item label="Description">
                <el-input type="textarea" v-model="basics.description"></el-input>
            </el-form-item>
    
            <el-row>
                <el-col :span="12">
                    <el-form-item label="Date">
                        <el-date-picker v-model="basics.date" type="date"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Time">
                        <el-time-picker v-model="basics.time"></el-time-picker>
                    </el-form-item>
                </el-form-item>
                </el-col>
            </el-row>
    
            <el-row>
                <el-col :span="12">
                    <el-form-item label="Price" prop="price" :rules="[ { type: 'number', message: 'price must be a number'} ]">
                        <el-input type="price" placeholder="price" v-model.number="basics.price"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Picture"><br>
                        <el-upload class="upload-demo" action="">
                            <el-button size="medium" type="primary">Click to upload</el-button>
                            <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
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
    export default {
        name: "basic-form",
    
        data() {
            return {
                basics: {
                    name: '',
                    description: '',
                    date: '',
                    time: '',
                    price: 0.00,
                    fileList: [{}]
                }
            }
        },
        methods: {
            done() {
                this.$emit("done", this.basics)
            }
        }
    };
</script>

<style>
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 100%;
    }
    
    .upload-demo {
        text-align: right;
    }
    
</style>