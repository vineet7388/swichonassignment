const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const formRequest = mongoose.model("formRequest");
const Dept = mongoose.model("Dept");
const User = mongoose.model("User");



router.post('/createform',requireLogin,async (req,res)=>{
    const {title,body} = req.body
    
    const assignedDept= await Dept.findOne({name:req.body.assignedDept}).select({ "name": 1, "_id": 1})
    const assignedTo =  await User.findOne({name:req.body.assignedTo}).select({ "name": 1, "_id": 1});
   // console.log(assignedTo,assignedDept);
   //console.log(assignedDept._id.toString() === req.user.dept.toString())
   if(assignedDept._id.toString() === req.user.dept.toString()){
    return res.status(422).json({error:'Requesting Within Same department'})
}
else{
    const createdBy = req.user._id
    if(!title || !body || !createdBy || !assignedTo || !assignedDept){
        return res.status(422).json({error:'Please fill all fields'})
    }
    
    const request = new formRequest({
        createdBy:req.user._id,
        title,
        body,
        assignedTo:assignedTo._id,
        assignedDept:assignedDept._id
    })
    //console.log(request);
    request.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err);
    })
}
})


router.get('/pendingrequest',requireLogin,async (req,res)=>{
    const requests =  await formRequest.find({assignedTo:req.user._id,status:'pending'}).limit(5)
    .sort({createdAt:-1})
    if(requests){
        res.json(requests)
    }
})

router.get('/approvedrequest',requireLogin,async (req,res)=>{
    const requests =  await formRequest.find({assignedTo:req.user._id,status:'accepted'}).limit(5)
    .sort({createdAt:-1})
    if(requests){
        res.json(requests)
    }
})

router.get('/rejectrequest',requireLogin,async (req,res)=>{
    const requests =  await formRequest.find({assignedTo:req.user._id,status:'rejected'}).limit(5)
    .sort({createdAt:-1})
    if(requests){
        res.json(requests)
    }
})

router.get('/allpendingrequest',requireLogin,async (req,res)=>{
    //console.log(req.user)
    const requests =  await formRequest.find({assignedDept:req.user.dept,status:'pending'})
    .populate("createdBy","_id name")
    .populate("assignedTo","_id name")
    .sort({createdAt:-1})
    if(requests){
        res.json(requests)
       // console.log(requests)
    }
})

router.get('/requestforapproval',requireLogin,async (req,res)=>{
    //console.log(req.user)
    const requests =  await formRequest.find({assignedTo:req.user._id,status:'pending'})
    .populate("createdBy","_id name")
    .populate("assignedTo","_id name")
    .sort({createdAt:-1})
    if(requests){
        res.json(requests)
       // console.log(requests)
    }
})


router.post('/setstatus',requireLogin,async (req,res)=>{
    const {status,resbody,id} = req.body
    //console.log(status,resbody,id)
    formRequest.findByIdAndUpdate(id,{
        response:resbody,
        status:status
    },{
        new:true
    })
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
    
})


module.exports = router