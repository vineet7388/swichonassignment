const mongoose = require('mongoose');

const DeptSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    dept_head:{
        type:String,
        required:true
    },
})

mongoose.model("Dept",DeptSchema)