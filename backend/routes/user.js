const express = require("express");
const router = express.Router();


const User = require("../models/user");
const requirelogin = require("../middleware/requirelogin");

router.get('/user-auth',requirelogin,async(req,res)=>{
   return res.status(200).send({ok:true});
})

//all user
router.get('/alluser',requirelogin,async(req,res)=>{
    if(!req.body._id){
    const allUser = await User.find({})
    res.status(200).json(allUser)
    }
   
    
})
router.get('/singleUser/:id',async(req,res)=>{
    const id = req.params.id
    const singleUser = await User.findById(id)
    res.status(200).json(singleUser)
    
})

module.exports = router