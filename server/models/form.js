const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const formRequestSchema = new mongoose.Schema({
    createdBy:{
        type:ObjectId,
        ref:"User"
     },
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    response:{
        type:String,
        default:""
    },
    assignedTo:{
        type:ObjectId,
        ref:"User"
    },
    assignedDept:{
        type:ObjectId,
        ref:"Dept"
    },
    status:{
        type:String,
        default:'pending'
    }
},{timestamps:true})

mongoose.model("formRequest",formRequestSchema)