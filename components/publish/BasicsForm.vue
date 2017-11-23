<template>
    <div class="step-form">
        <h3>Basic Info</h3>
        <el-form ref="form-basics" :model="data" :rules="rules">

            <el-form-item label="Event title" prop="title">
                <el-input placeholder="Rock 'n' Roll Party" v-model="data.title"></el-input>
            </el-form-item>

            <el-form-item label="Description" prop="description">
                <el-input type="textarea" v-model="data.description" placeholder="A night to enjoy good music" :autosize="{ minRows: 2, maxRows: 6 }"></el-input>
            </el-form-item>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="Date" prop="date">
                        <br><el-date-picker v-model="data.date" type="date" placeholder="Date"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="11" :offset="1">
                    <el-form-item label="Time" prop="time">
                        <br><el-time-select v-model="data.time" placeholder="Time"></el-time-select>
                    </el-form-item>
                </el-col>
            </el-row>
            
            <el-row>
                <el-col :span="8">
                    <el-form-item label="Price" prop="price">
                        <el-input placeholder="0.00" v-model="data.price"> 
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="Currency" prop="currency">
                        <el-select v-model="data.currency">
                            <el-option label="€" value="euro"></el-option>
                            <el-option label="$" value="dollar"></el-option>
                            <el-option label="£" value="pound"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="11" :offset="1">
                    <el-form-item label="Poster" prop="poster">
                        <br>
                        <el-upload action="" accept="image/*" :on-success="fileAdded" :limit="1">
                            <el-button class="full-width">Upload Poster <i class="el-icon-upload el-icon-right"></i></el-button>
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
        rules: {
            title: [
            { required: true, message: "Please, enter an event title.", trigger: "blur" },
            { pattern: /^[-a-zA-Z0-9_'\\&_/' ]*$/, message: "Title must be alphanumeric.", trigger: "blur" },
            ],
            date: [
            { required: true, type:"date", message: "Please enter a date", trigger: "blur"  }
            ],
            time: [
            { required: true, message: "Please enter a time", trigger: "blur" }
            ],
            description: [
            { required: true, message: "Please enter a description.", trigger: "blur"},
            { max: 300, message: "Length should be less than 300 characters.", trigger: "blur" }
            ],
            price: [
            { required: true, message: "Please enter a price.", trigger: "blur" },
            { required: true, pattern: /^[0-9]{1,3}([,.][0-9]{2})?$/, message: "Price not valid.", trigger: "blur"},
            { validator: this.formatPrice, trigger: "blur"}
            ],
            currency: [
                {required: true, trigger: "blur"}
            ],
            poster: [
                { validator: this.checkPoster, trigger: "blur" },
            ]
      }
    };
  },
  props: ["data"],
  methods: {
    done() {
      this.$refs["form-basics"].validate(valid => {
        if (valid) {
          this.$emit("done", this.data);
        } else {
          return false;
        }
      });
    },
    formatPrice(value, rules, callback){
        if(!this.data.price == '' && !this.data.price.includes(".") && !this.data.price.includes(",")){
            this.data.price += ".00";
        }
        callback()
    },
    checkPoster(value, rule, callback){
        (this.data.poster != '')? callback() : callback("Please upload a poster")
    },
    fileAdded(response, file, fileList){
        let self = this;
        blobUtil.blobToBase64String(file.raw).then(function (base64String) {
            self.data.poster = 'data:'+file.raw.type+';base64,'+base64String;
        }).catch(function (err) {
            fileList = [];
        });
    }
  }
};
</script>
