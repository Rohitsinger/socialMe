const express = require("express");
const router = express.Router();


const User = require("../models/user");


router.get('/alluser',async(req,res)=>{
    const allUser = await User.find({})
    res.status(200).json(allUser)
    
})

module.exports = router