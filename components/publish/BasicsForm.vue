<template>
    <div class="step-form">
        <h3>Basic Info</h3>
    
        <el-form ref="form-basics" :model="basics" :rules="rules">
    
            <el-form-item label="Event name" prop="name">
                <el-input placeholder="Name" v-model="basics.name"></el-input>
            </el-form-item>
    
            <el-form-item label="Description" prop="descr">
                <el-input type="textarea" v-model="basics.descr" placeholder="Description"></el-input>
            </el-form-item>
    
            <el-row>
                <el-col :span="12">
                    <el-form-item label="Date" prop="date">
                        <el-date-picker type="date" v-model="basics.date" ></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="11" :offset="1">
                    <el-form-item label="Time" prop="time">
                        <el-time-picker v-model="basics.time"></el-time-picker>
                    </el-form-item>
                </el-form-item>
                </el-col>
            </el-row>
    
            <el-row>
                <el-col :span="12">
                    <el-form-item label="Price" prop="price">
                        <el-input placeholder="0.00" v-model="basics.price"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Picture" prop="pic"><br>
                        <el-upload class="upload-demo" action="">
                            <el-button type="primary" size="medium">Click to upload</el-button>
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
                    price: '',
                    fileList: [{}]
                },
                rules: {
                    name: [
                        { required: true , message: 'Please, input event name.', trigger: 'blur' },
                        { required: true , pattern: /^[-a-zA-Z0-9_'\\&_/' ]*$/, message: 'Name must be alphanumeric.', trigger: 'blur' },
                        { max: 50, message: 'Length should less than 50 characters.', trigger: 'blur' },
                    ],
                    date: [
                        { required: true , type: 'date', message: 'Please, choose a date.', trigger: 'blur' },
                    ],
                    time: [
                        { required: true , type: 'date', message: 'Please, choose a time.', trigger: 'blur' },
                    ],
                    descr: [
                        { required: true, message: 'Please input a description.', trigger: 'blur' },
                        { max: 300, message: 'Length should be less than 300 characters.', trigger: 'blur' },
                    ],
                    price: [
                        { required: true, message: 'Please input price.', trigger: 'blur' },
                        //{ required: true, pattern: /^[0-9]{1,6}([,.][0-9]{2})?$/, message: 'Price not valid.', trigger: 'blur' },
                        { validator: this.checkPrice, trigger: 'blur' },
                        // { digits: true, message: 'Please input price.', trigger: 'blur' },
                    ],
                }
            };         
        },
        methods: {
            done() {
                this.$refs['form-basics'].validate((valid) => {
                    if (valid) {
                        this.$emit("done", this.basics);
                    } else {
                        return false;
                    }
                });
            },
            checkPrice(rule, value, callback){
                //var re = new RegExp("^[0-9]{1,6}([,.][0-9]{2})?$");
                //if (re.test(value)) {
                if (value.match(/^[0-9]{1,6}([,.][0-9]{2})?$/)){
                    callback();
                } else {
                    callback(new Error ('Please enter a valid price.'));
                }
            },
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