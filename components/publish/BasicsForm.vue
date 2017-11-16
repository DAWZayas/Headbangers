<template>
    <div class="step-form">
        <h3>Basic Info</h3>
    
        <el-form ref="form-basics" :model="basics" :rules="rules">
    
            <el-form-item label="Event name" prop="name">
                <el-input placeholder="name" v-model="basics.name"></el-input>
            </el-form-item>
    
            <el-form-item label="Description" prop="descr">
                <el-input type="textarea" v-model="basics.descr"></el-input>
            </el-form-item>
    
            <el-row>
                <el-col :span="12">
                    <el-form-item label="Date">
                        <el-date-picker v-model="basics.date" type="date"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="11" :offset="1">
                    <el-form-item label="Time">
                        <el-time-picker v-model="basics.time"></el-time-picker>
                    </el-form-item>
                </el-form-item>
                </el-col>
            </el-row>
    
            <el-row>
                <el-col :span="12">
                    <el-form-item label="Price" prop="price">
                        <el-input placeholder="price" v-model="basics.price"></el-input>
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
                    descr: '',
                    date: '',
                    time: '',
                    price: 0.00,
                    fileList: [{}]
                },
                rules: {
                    name: [
                        { required: true, message: 'Please, input event name.', trigger: 'blur' },
                        { max: 30, message: 'Length should less than 30 characters.', trigger: 'blur' },
                    ],
                    descr: [
                        { required: true, message: 'Please input description.', trigger: 'blur' }
                    ],
                    price: [
                        { required: true, message: 'Please input price.', trigger: 'blur' },
                        //{ validator: this.checkPrice, trigger: 'blur' },
                    ]
                }
            };         
        },
        methods: {
            done() {
                // this.$emit("done", this.basics);
                this.$refs['form-basics'].validate((valid) => {
                    if (valid) {
                        this.$emit("done", this.basics);
                    } else {
                        return false;
                    }
                });
            // { validator: this.checkPrice, trigger: 'blur' },
            },
            checkPrice(rule, value, callback){
                if (value === ''){
                    callback(new Error ('Please, input price.'));
                } else {
                    callback();
                }
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