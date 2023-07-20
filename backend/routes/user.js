const express = require("express");
const router = express.Router();


const User = require("../models/user");
const requirelogin = require("../middleware/requirelogin");

router.get('/user-auth',requirelogin,async(req,res)=>{
   return res.status(200).send({ok:true});
})

//all user
router.get('/alluser',async(req,res)=>{
    const allUser = await User.find({})
    res.status(200).json(allUser)
    
})

module.exports = router