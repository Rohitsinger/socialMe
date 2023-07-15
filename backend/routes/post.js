const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require('../middleware/requirelogin')
const Post = mongoose.model("Post")
const cloudinary = require('cloudinary').v2
cloudinary.config({ 
  cloud_name: 'dot0pk1dh', 
  api_key: '893126782658171', 
  api_secret: 'UAZ0z-mpcK5SR4EQvBH5kjxkSqQ',
  secure: true
});
router.get('/allpost',(req,res)=>{
   Post.find({})
   .populate("postedBy","_id name email photo")
   .then(posts=>{
      res.json({posts})
   })
   .catch(err=>{
      console.log(err);
   })
})

router.post('/createpost',requireLogin,(req,res)=>{
   const {title,body} = req.body
   const file = req.files.photo;
   cloudinary.uploader.upload(file.tempFilePath,(error,result)=>{
     console.log(result);
   
   if(!title || !body ){
    return res.status(422).json({err:"Please add all the fields"})
   }


   const post = new Post({
    title,
    body,
    photo:result.url,
   
    postedBy:req.user
   })
   post.sort({createdAt:-1})
   post.save().then(result=>{
    res.status(201).send({post:result})
   })
   .catch(err=>{
    console.log(err);
   })
})
})

router.get('/mypost',requireLogin,(req,res)=>{
  Post.find({postedBy:req.user._id})
  .populate("postedBy","_id name email")
  
  .then(mypost=>{
   res.json({mypost})
  })
  .catch(err=>{
   console.log(err);
  })
})

router.post('/like/:id',requireLogin,async(req,res)=>{
   // const {likes} = req.body

   const post = await Post.findById(req.params.id)
   if(!post){
      return res.status(400).json({
         success:false,
         message:"Post not found"
      });
   }
   if(post.likes.includes(req.user._id)){
      const index = post.likes.indexOf(req.user._id)
         post.likes.splice(index,1)
      await post.save();
      return res.status(200).json({
         success:true,
         message:"Post unliked",
         post
      });
   } else{
      post.likes.push(req.user._id)
      await post.save()
      return res.status(200).json({
         success:true,
         message:"Post Liked"
      });
   }
}
)
// router.patch('/like/:id',requireLogin,(req,res)=>{
//    // const {likes} = req.body
//    const postId = req.params.id
//     console.log(postId);
//    Post.findByIdAndUpdate(postId,{
//        $push:{likes:req.user._id}
//    },{
//        new:true
//    }).exec((err,result)=>{
//        if(err){
//            return res.status(422).json({error:err})
//        }else{
//            res.json(result)
//        }
//    })
// })
router.patch('/unlike/:id',requireLogin,(req,res)=>{
   const {likes} = req.body
   const postId = req.params.id
    console.log(postId);
   Post.findByIdAndUpdate(postId,{
       $pull:{likes:req.user._id}
   },{
       new:true
   }).exec((err,result)=>{
       if(err){
           return res.status(422).json({error:err})
       }else{
            res.json(result)
       }
   })
})

router.get('/hit',requireLogin,(req,res)=>{
  res.send("hit");
  
})



router.put('/comment',requireLogin, (req,res)=>{
   const comment = {
      comment:req.body.text,
      postedBy:req.user._id
   }
   console.log(comment);
   Post.findByIdAndUpdate(req.body.postId,{
     
      $push:{comments:comment}

   },{
      new:true
   })
   .populate("comments.postedBy","_id name")
   .exec((err,result)=>{
      if(err){
         return res.status(422).json({error:err})
      }
      else{
         res.json(result)
      }
      
   })
})
router.get('/get-comments', async(req,res)=>{

const comments =  await Post.find({}).populate("comments.postedBy","_id name photo")
   if(comments){
      res.status(200).send({success:true,comments})
   }else{

      res.status(500).send({success:false})

   }
})

router.delete('/delete-post/:postId',requireLogin, async(req,res)=>{
   console.log(req.params.postId);

     await Post.findOne({id:req.params.postId}).populate("postedBy","_id")   
   .exec((err,post)=>{
      if(err){
         return res.status(422).json({error:err})
      }
      if(post.postedBy._id.toString()===req.user._id.toString()){
        post.remove()
        .then(result=>{
         return res.status(200).send({message:"Deleted Successfully",success:true})
        }).catch(err=>console.log(err));

      }
      else{
         res.json(post)
      }
      
   })
  
   })

module.exports = router