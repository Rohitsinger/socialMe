import React,{useEffect, useState, useContext} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {CiSearch} from 'react-icons/ci'


import {AiOutlineHome,AiOutlineMessage,AiOutlineProfile,AiOutlineComment,AiFillDelete} from 'react-icons/ai'
import {HiTrendingUp} from 'react-icons/hi'
import {FaShareSquare} from 'react-icons/fa'
import {FcLike,FcLikePlaceholder} from 'react-icons/fc'
import {BiSolidLike,BiSolidDislike} from 'react-icons/bi'
import axios from 'axios'
import { useAuth, usePosts } from '../../reducers/UserReducer'
import { toast } from 'react-toastify'
// import { UserContext } from '../../App'
const Home = () => {
  const getFromLocal = JSON.parse(localStorage.getItem('posts')) || "[]"
    const [data,setData] = useState([getFromLocal])
    const [posts,setPosts] = usePosts()
    console.log(posts);
    const [like,setLike] = useState(false)
    const [liked,setLiked] = useState([])

    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);


    const [search,setSearch] = useState("")
    const [auth,setAuth] = useAuth()
 

    const navigate = useNavigate()
   

    const handleLogout =()=>{
     setAuth({...auth,user:null,token:""})
     localStorage.clear()
     navigate('/signin')
    } 




  

  const likePost = async (postId,postedBy)=>{
    const likeIt = await axios.post(`/like/${postId}`,postedBy).then(res=>
   console.log(res.data)
    )
    setLike(!like)
     }
 


const makeComment = async(text,postId)=>{
   try {
    const response = await axios.put(`/comment`,{postId,text}).then(res=> setComment(res.data))
    console.log(comment);
    
   } catch (error) {
      console.log(error);
   }
  
}

const handleDelete = async(postId)=>{
   try {
    const {data} = await axios.delete(`/delete-post/${postId}`)
     if(data.success===true){
        toast.success("Deleted") 
      }
    } catch (error) {
      console.log(error);
   }}
 const fetchComments=async()=>{
            const result = await axios.get("/get-comments")
            .then((res)=>setComments(res.data.comments)).catch(err=>console.log(err))
           setComment("");
            
        }
      
        useEffect(()=>{
          fetchComments()
          
       },[])
        return (
  
    
    <div className='h-screen bg-[#f5d6c3] flex' >

<div className='w-1/5 bg-white'>
<div className='h-2/6 flex  flex-col justify-center items-center'>
    <div>
       <img className='md:ml-16 w-20 h-20 rounded-full' src={auth?.user?.photo}/>
      <h3 className='md:ml-12 text-2xl'>{auth?.user?.name}</h3>
      <p className=''>{auth?.user?.email}</p>
    
      </div>
    <div className='border h-[50px] flex justify-center items-center w-full space-x-6  mt-4'>
    <div className='flex flex-col justify-around items-center' >
      <h4>1000</h4>
      <p>Posts</p>
    </div>
    <div>
    <h4>1000</h4>
      <p>following</p>
    </div>
    <div>
    <h4>1000</h4>
      <p>Followers</p>
    </div>
    </div>
      
   
  </div>
<div className='h-3/6'>
<div className=' flex flex-col  ml-8 justify-evenly mr-4 space-y-12 font-sans  text-sm font-light'>
        <div className='mt-4 flex text-gray-600 ml-4'><AiOutlineHome className='mr-1 mt-[3px]'/> Home</div>
        <div className=' mt-4 flex ml-3 text-gray-600'><HiTrendingUp className='mr-1 mt-[3px]'/>Trending</div>
        <div className=' mt-4 flex ml-3 text-gray-600'> <AiOutlineMessage className='mr-1 mt-[3px]'/>Messages</div>
        <div className='  mt-4 flex ml-3 text-gray-600'><AiOutlineProfile className='mr-1 mt-[3px]'/>Profile</div>
       
      </div>
  </div>
<div className='h-1/6'>
<div onClick={handleLogout} className='cursor-pointer bg-red-400 w-32 h-8 text-center ml-20 rounded-md hover:bg-white transition-all duration-200'>Logout </div>
  </div>
</div>

<div className='w-3/5 overflow-scroll h-full bg scrollbar-hide mt-8'>
<div className='flex float-right w-96 mb-4'>
        <input onChange={(e)=>setSearch(e.target.value)} type='text' className='shadow appearance-none border rounded  w-full py-2 px-3 mt-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
        <CiSearch size={50}/>
        </div>
<div >
   
    {
        posts.filter((item)=>{
          if(search==="")
        {
          return item
        } else if(item.title.toLowerCase().includes(search)){
          return item
        }
        
        }).map((item)=>{
          return(
            <div className='bg-white  w-[75%] h-full flex flex-col items-center m-auto'>
            <div className='card home_card' key={item._id}>
            <div className='flex  '>
            <img className="w-10  rounded-full" src={item.postedBy?.photo}/>
        <h5 className='mt-2 ml-2 font-semibold'>{item.postedBy?.name}</h5>
        <AiFillDelete className='float-right ml-40' onClick={()=>handleDelete(item._id)}/>
        </div>
       
        <h5 className='mt-2 ml-2 font-medium border-b-8'>{item.postedBy?.email}</h5>
         <div className='card-image'>
            <img src={item.photo} alt="" />
        </div>
        <div className=' flex justify-between mt-4'>
      
            <h5 onClick={()=>likePost(item._id)}>
              {like ? <FcLikePlaceholder /> :  <FcLike />}  
              {console.log(like)}
            </h5>
          
            <h5 className='flex '> <FaShareSquare className='mr-1 mt-[3px]'/> Shares</h5>
            <h5 className='flex'><AiOutlineComment className='mr-1 mt-[3px]' onClick={()=>makeComment(item._id)}/> Comments</h5>
          
          
        </div><hr/>
        <div className='border-b-4'>
        <h6>{item.title}</h6>
            <p>{item.body}</p>
              
            <div className='flex space-x-24'>
         
             <form onSubmit={(e)=>{
           e.preventDefault() 
           
              setComment(e.target[0].value)}}>
            
             <input
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                  console.log(comment)
                }}
               
              />
              <button className='rounded-full mb-1 px-2  bg-green-600'
               
               onClick={(e) => {
                if(comment.length<1){
                  e.preventDefault()
                }else{
                 makeComment(comment, item._id)
                }
               }}
             >
               +
             </button>
            
              </form>
             
              </div>
         
               <div>

            { 
               item.comments.map((p,index)=>(
                      <>
                      <div className='flex space-x-10' key={index}>
                       <div className=''>
                <p>{JSON.stringify(p.comment)}</p>
                </div>
                 </div>
                 </>
                    ))
               }
            </div>
     </div>
     </div>
     </div>
      )
        }) 
     }
     </div>
     </div>
       <div className='w-1/5 bg-slate-700'>

       </div>
    </div>
  )
}

export default Home
