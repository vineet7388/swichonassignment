const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Dept = mongoose.model("Dept");
const User = mongoose.model("User");

router.post('/createdept',(req,res)=>{
        
        const name =req.body.name;
        const dept_head =req.body.dept_head;
        //console.log(name,dept_head)
        if(!name || !dept_head){
            return res.status(422).json({error:"Please enter all fields"})
        }
        Dept.findOne({name:name}).then((savedDept)=>{
            if(savedDept){
                return res.status(422).json({error:"Dept already exist"})
            }
                const dept = new Dept({
                    name,
                    dept_head
                })
        
                dept.save()
                .then(dept=>{
                    res.json({message:"dept Created"})
                })
                .catch(err=>{
                    console.log(err)
                })
            })
        .catch(err=>{
            console.log(err);
        })
})

router.post('/alldeptuser',requireLogin,async(req,res)=>{
    const deptId = await Dept.find({name:req.body.name})
    const users = await User.find({dept:deptId[0]._id}).select({ "name": 1, "_id": 1});
    //console.log(users)
    if(users){
    return res.json(users)
    }
    else{
        return res.status(404).json({error:"No user"})
    }
})

router.get('/alldept',requireLogin,async(req,res)=>{
    const depts = await Dept.find({});
   // console.log(depts)
   if(!depts){
    return res.status(404).json({depts})
   }
   else{
       return res.json({depts})
   }
})



module.exports = router