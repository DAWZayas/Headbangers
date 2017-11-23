<template>
    <div class="step-form">
        <h3>Basic Info</h3>
    
        <el-form ref="form-basics" :model="data" :rules="rules">
    
            <el-form-item label="Event name" prop="title">
                <el-input placeholder="Event title" v-model="data.title"></el-input>
            </el-form-item>
    
            <el-form-item label="Description" prop="description">
                <el-input type="textarea" v-model="data.description" placeholder="Description"></el-input>
            </el-form-item>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="Date" prop="date">
                        <el-input placeholder="Date" id="date-input" :value="formattedDate" prefix-icon="el-icon-date"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11" :offset="1">
                    <el-form-item label="Time" prop="time">
                        <el-input placeholder="Time" id="time-input" :value="formattedTime" prefix-icon="el-icon-time"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            
            <el-row>
                <el-col :span="12">
                    <el-form-item label="Price" prop="price">
                        <el-input placeholder="0.00" v-model="data.price"></el-input>
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
      rules: {
        title: [
          { required: true, message: "Please, enter an event title.", trigger: "blur" },
          { pattern: /^[-a-zA-Z0-9_'\\&_/' ]*$/, message: "Title must be alphanumeric.", trigger: "blur" },
          { max: 50, message: "Length should less than 50 characters.", trigger: "blur" }
        ],
        date: [
          { required: true, type:"date", message: "Please enter a date", trigger: "change"  }
        ],
        time: [
          { required: true, type:"date",  message: "Please enter a time", trigger: "change" }
        ],
        description: [
          { required: true, message: "Please input a description.", trigger: "blur"},
          { max: 300, message: "Length should be less than 300 characters.", trigger: "blur" }
        ],
        price: [
          { required: true, message: "Please input price.", trigger: "blur" },
          { required: true, pattern: /^[0-9]{1,3}([,.][0-9]{2})?$/, message: "Price not valid.", trigger: "blur"}
        ]
      }
    };
  },
  props: ["data"],
  computed:{
      formattedDate(){ return this.data.date ? this.data.date.toLocaleDateString() : ''},
      formattedTime(){ return this.data.time ? this.data.time.toLocaleTimeString().slice(0,5) : ''}
  },
  methods: {
    done() {
      this.$refs["form-basics"].validate(valid => {
        if (valid) {
          this.$emit("done", this.data);
        } else {
          return false;
        }
      });
    }
  },
  mounted(){
    var dateInput = $('#date-input').pickadate({
        firstDay: 'Mon',
        onSet: function(date){
            this.data.date = new Date(date.select);
        }.bind(this)
    });
    var timeInput = $('#time-input').pickatime({
        format: "HH:i",
        onSet: function(time){
            this.data.time = new Date(time.select * 60 * 1000);
        }.bind(this)
    });
  },
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