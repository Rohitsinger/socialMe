import React,{useEffect, useState, useContext} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {CiSearch} from 'react-icons/ci'
import {AiOutlineHome,AiOutlineMessage,AiOutlineProfile,AiOutlineComment,AiFillDelete} from 'react-icons/ai'
import {HiTrendingUp} from 'react-icons/hi'
import {BsChevronCompactLeft,BsChevronCompactRight} from 'react-icons/bs'
import {FaShareSquare} from 'react-icons/fa'
import {FcLike,FcLikePlaceholder} from 'react-icons/fc'
import {BiSolidLike,BiSolidDislike} from 'react-icons/bi'
import axios from 'axios'
import {  useAuth, usePosts } from '../../reducers/UserReducer'
import { toast } from 'react-toastify'

const Feeds = () => {
  const [auth,setAuth] = useAuth()
  const [allUser,setAllUser] = useState([])

  const [posts,setPosts] = useState([])
    
    const [open,setOpen] = useState("")
    console.log(allUser);
    console.log(posts);
  

    const [like,setLike] = useState(false)
    const [liked,setLiked] = useState(posts.likes)
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [search,setSearch] = useState("")
    const navigate = useNavigate()
   
    const handleLogout =()=>{
     setAuth({...auth,user:null,token:""})
     localStorage.clear()
     navigate('/signin')
    }

   //scroll left

   const scrollLeft = () =>{
     document.getElementById('content').scrollLeft -= 800
   }

   //scroll Right

   const scrollRight = () =>{
    document.getElementById('content').scrollRightt += 800
   }
    
  //like the post
//     const likePost = async (postId,postedBy)=>{
//     const likeIt = await axios.post(`/like/${postId}`,postedBy).then(res=>
//    console.log(res.data)
//     )
//     setLike(!like)
//      }
//      useEffect(() => {
//      likePost()
//     }, [])
    const allUsers = async()=>{
        try {
         const response = await axios.get(`/alluser`).then(res=> setAllUser(res.data))
        
         } catch (error) {
           console.log(error);
        }
}

const fetchPost=async()=>{
const result = await axios.get("/allPost")

  .then((res)=>

  setPosts(res.data.posts))
 }

 useEffect(() => {
  allUsers()

 }, [])
 useEffect(() => {
  fetchPost()

 }, [])
     //make comment
 
  const makeComment = async(text,postId)=>{
   try {
    const response = await axios.put(`/comment`,{postId,text}).then((res)=>console.log(res))
    
    } catch (error) {
      console.log(error);
   }
  
}
    //comments

    const fetchComments=async()=>{
        const result = await axios.get("/get-comments")
        .then((res)=>setComments(res.data.comments)).catch(err=>console.log(err))
     
    }

    useEffect(() => {
  
        fetchComments()
         
        }, [])
    

const handleDelete = async(postId)=>{
   
    const {data} = await axios.delete(`/delete-post/${postId}`)
    if(data.success){
       fetchPost()
        toast.success("Deleted") 
    }
  }


return (
  <div className='h-full md:h-screen w-full flex justify-center mx-auto   md:flex  bg-[#f5d6c3] ' >


<div className='w-1/5 bg-white hidden md:block '>

<div className='h-3/6'>
<div className=' flex flex-col  ml-8 justify-evenly mr-4 space-y-12 font-sans  text-sm font-light'>
        <div className='mt-4 flex text-gray-600 ml-4'><AiOutlineHome className='mr-1 mt-[3px]'/> Home</div>
        <div className=' mt-4 flex ml-3 text-gray-600'><HiTrendingUp className='mr-1 mt-[3px]'/>Trending</div>
        <div className=' mt-4 flex ml-3 text-gray-600'> <AiOutlineMessage className='mr-1 mt-[3px]'/>Messages</div>
        <div className='  mt-4 flex ml-3 text-gray-600'><Link to='/profile'><AiOutlineProfile className='mr-1 mt-[3px]' />Profile</Link></div>
       
      </div>
  </div>
<div className='h-1/6'>
<div onClick={handleLogout} className='cursor-pointer bg-red-400 w-32 h-8 text-center ml-20 rounded-md hover:bg-white transition-all duration-200'>Logout </div>
  </div>
</div>

<div className=' w-full  md:w-3/5 overflow-scroll md:h-full bg scrollbar-hide mt-16'>
<div id='content' className='flex ml-20  items-center  md:hidden '>
<div  className='flex  group transition-all duration-300'>
   <BsChevronCompactLeft onClick={scrollLeft} className='hidden group-hover:block mt-14 rounded-full'/>
  {
  allUser.map((user,id)=>(
    
    <div className='z-10 h-16 mt-8 w-16 rounded-full overflow-hidden border-2 bg-gray-500 focus:outline-none focus:border-black'>
    <Link to={`/${allUser._id}`} > <img className='w-full h-full object-cover transition-all duration-500'  key={user._id} src={user.photo} alt='photo'/>
       
            </Link>
    </div>
  ))
}
<BsChevronCompactRight onClick={scrollRight} className='mt-14 rounded-full hidden group-hover:block'/>
</div>
</div>

<div className='flex float-right w-96 mt-24 md:m-0 mb-2 md:mb-4'>

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
            <div className='bg-white w-full md:w-[75%] h-full flex flex-col items-center m-auto'>
            <div className='card home_card' key={item._id}>
            <div className='flex '>
            <Link to={`${item.postedBy._id}`}><img className="w-10  rounded-full cursor-pointer" src={item.postedBy?.photo} /></Link>
        <h5 className='mt-2 ml-2 font-semibold'>{item.postedBy?.name}</h5>
        <button>
        {/* {auth.user._id===item.postedBy._id? */}
        <AiFillDelete className='float-right ml-40' onClick={()=>handleDelete(item._id)}/>
        {/* :null} */}
        </button>
        </div>
       
        <h5 className='mt-2 ml-2 font-medium border-b-8'>{item.postedBy?.createdAt}</h5>
         <div className=''>
            <img src={item.photo} alt="" />
        </div>
        <div className=' flex justify-between mt-4'>
       
            {/* <span onClick={()=>likePost(item._id)}> */}
      
          {/* {item.likes ? <FcLikePlaceholder />  :<FcLike /> } */}
             
            {/* </span> */}
          
            <h5 className='flex '> <FaShareSquare className='mr-1 mt-[3px]'/> Shares</h5>
            <h5 className='flex'><AiOutlineComment className='mr-1 mt-[3px]' onClick={()=>makeComment(item._id)}/> Comments</h5>
          
          
        </div><hr/>
        <div className='border-b-4'>
        <h6>{item.title}</h6>
            <p>{item.body}</p>
              
            <div className='flex space-x-24'>
         
             <form onSubmit={(e)=>{
           e.preventDefault() 
           
             }}>
            
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
                 console.log(comment);
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
                <p>{p.comment}</p>
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
       <div className='hidden md:w-1/5 bg-white shadow-lg  md:flex md:flex-col'>

         {allUser.map((i,userId)=>(
            <div className='flex py-2 float-right ' key={i._id}>
            <div className='z-10  mt-4   h-8 w-8 rounded-full overflow-hidden border-2 bg-gray-500 focus:outline-none focus:border-black'>
            <Link to={`/${i._id}`} > <img className='w-full h-full object-cover transition-all duration-500' key={i._id} src={i.photo} alt='photo'/>
            </Link>
            </div>
            <span className='mt-5 font-semibold'>{i.name}</span>
            {/* {
              singleUser.map((singleUser,id)=>(
                <div>
                <button onClick={()=>SingleUsers(singleUser.id)}>click</button>
                </div>
              ))
            } */}
            </div>
         ))}
       </div>
    </div>
  )
}

export default Feeds


