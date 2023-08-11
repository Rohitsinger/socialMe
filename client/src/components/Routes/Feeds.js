import React,{useEffect, useState, useContext} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {CiSearch} from 'react-icons/ci'
import {AiOutlineComment,AiFillDelete, AiFillEdit} from 'react-icons/ai'
import {HiTrendingUp} from 'react-icons/hi'
import {BsChevronCompactLeft,BsChevronCompactRight} from 'react-icons/bs'
import {FaShareSquare} from 'react-icons/fa'

import {FcLikePlaceholder} from 'react-icons/fc'

import axios from 'axios'
import {  useAuth } from '../../reducers/UserReducer'
import { toast } from 'react-toastify'
import Lottie from 'lottie-react'
import animation_lkqfwh0y from '../../components/animations/animation_lkqfwh0y.json'
import animation_lkqhb84m from '../../components/animations/animation_lkqhb84m.json'
import animation_lkqsqqa0 from '../../components/animations/animation_lkqsqqa0.json'
import animation_lktd8jxk from '../../components/animations/animation_lktd8jxk.json'

const Feeds = () => {
  const [auth,setAuth] = useAuth()
  const [allUser,setAllUser] = useState([])
  const [posts,setPosts] = useState([])
  const [open,setOpen] = useState(false)
  const [openModals,setOpenModals] = useState(false)
  const [openComments,setOpenComments] = useState(false)
  const [like,setLike] = useState(false)
    const [liked,setLiked] = useState([])
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [commented, setCommented] = useState([]);
    const [search,setSearch] = useState("")
    
    const [singleUser, setSingleUser] = useState([])
    const [singlePost,setSinglePost] = useState([])
    const [title,setTitle] = useState({})
    const [body,setBody] = useState({})
    const [photo,setPhoto] = useState({})

 
 

   //scroll left

   const scrollLeft = () =>{
     document.getElementById('content').scrollLeft -= 800
   }

   //scroll Right

   const scrollRight = () =>{
    document.getElementById('content').scrollRightt += 800
   }
// toggle 
   const handleToggle = () => {
    setOpen(!open)
   }
// toggle comments
   const openComment = () => {
    setOpenComments(!openComments)
   }

    

//allUsers
    const allUsers = async()=>{
        try {
         const response = await axios.get(`/alluser`).then(res=> setAllUser(res.data))
        
         } catch (error) {
           console.log(error);
        }
}
//single User
const fetchSinglePost = async()=>{
    try {
      const {data} = await axios.get("/mypost")
       if(data){
        setSinglePost(data.mypost)
         setTitle(data.mypost.title)
         setBody(data.mypost.body)
         setPhoto(data.mypost.photo)
       }
      
    } catch (error) {
      
    }
}
useEffect(()=>{
  fetchSinglePost();

},[])

//allposts

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
    const response = await axios.put(`/comment`,{postId,text}).then((res)=>setCommented(res.data.comments.text))

    fetchPost()
   
    setComment("")
    } catch (error) {
      console.log(error);
   }
  
}
    //comments

    const fetchComments=async()=>{
        const result = await axios.get("/get-comments")
        .then((res)=>setComments(res.data.postComments)).catch(err=>console.log(err))
        setComment("")
        
    }
 
    useEffect(() => {
      fetchComments()
    }, [])

     //like the post
    const likePost = async (postId)=>{
      const likeIt = await axios.patch(`/like/${postId}`).then(res=>{
     setLiked(res.data)
     fetchPost()
     setLike((like)=>(!like))
      }
      )
     }
//edit post
          const handleEdit = async(postId)=>{
          const appenddata = new  FormData()
          appenddata.append("title",title)
          appenddata.append("body",body)
        
          appenddata.append("photo",photo)
        
    const {data} = await axios.patch(`/edit-post/${postId}`,appenddata)
    console.log(data);
    if(data.success){
  
       fetchPost()
        toast.success("updated Successfully") 
      setOpenModals(false)
    }
  }
    
//delete posts
const handleDelete = async(postId)=>{
   
    const {data} = await axios.delete(`/delete-post/${postId}`)
    
    if(data.success){
       fetchPost()
        toast.success("Deleted") 
    }
  }

  //singleuser
  useEffect(() => {

    axios.get(`/singleUser/${auth.user._id}`).then((res) => {
        
        setSingleUser(res.data.user)
        setSinglePost(res.data.post)
       })
}, [])

const setDeleteComments = async(commentId,postId)=>{
  const {result} = await axios.delete(`/delete-comments/${postId}`,{commentId:commentId})
 

    toast.success("comment deleted")
    fetchPost()

}

  const openModal=()=>{
    setOpenModals(!openModals)
  }


return (
  <div className='h-full md:h-screen w-full flex justify-center mx-auto   md:flex  bg-[#f5d6c3] ' >


<div className='w-1/5 bg-white hidden md:block '>
<div className=' flex flex-col flex-wrap justify-evenly  font-sans  text-sm font-normal'>
       <Lottie animationData={animation_lkqfwh0y} className='mt-20'/>
       <div>
      <div className='mt-24 mx-auto w-32 rounded-md overflow-hidden'>
            <img src={auth?.user?.photo} alt="" className='w-full h-full object-cover transition-all duration-300' />
        </div>
      <h3 className='flex flex-wrap text-lg justify-center'>{auth?.user?.name}</h3>
      <span className='text-xs'>{auth?.user?.email}</span><br/>
      <span className='ml-24'>{auth?.user?.worksAt}</span><br/>
      <span className='ml-20'>{auth?.user?.livesin}</span><br/>
      <span>{auth?.user?.about}</span>
      {singleUser.map((user)=>(
  <div className='border h-[50px] flex justify-center items-center w-full space-x-6  mt-4'>
    <div className='flex flex-col justify-around items-center' >
      <h4>{singlePost.length}</h4>
      <p>Posts</p>
    </div>
    <div>
    <h4>{auth.user.following.length}</h4>
      <p>following</p>
    </div>
    <div>
    <h4>{auth.user.followers.length}</h4>
      <p>Followers</p>
    </div>
    </div>
))}
     
      </div>
    
      </div>

</div>

<div className=' w-full  md:w-3/5 overflow-scroll md:h-full  mt-20'>
<div id='content' className='flex ml-20  items-center  md:hidden '>
<div  className='md:flex  group transition-all duration-300 hidden'>
   <BsChevronCompactLeft onClick={scrollLeft} className='hidden mt-4 group-hover:block  rounded-full'/>
  {
  allUser.map((user,id)=>(
    
    <div className='z-10 h-16 mt-8 w-16 rounded-full overflow-hidden border-2 bg-gray-500 focus:outline-none focus:border-black'>
    <img className='w-full h-full object-cover transition-all duration-500'  key={user._id} src={user.photo} alt='photo'/>
       
           
    </div>
  ))
}
<BsChevronCompactRight onClick={scrollRight} className='mt-14 rounded-full hidden group-hover:block'/>
</div>
</div>

<div className='flex float-right w-96 md:mt-20 md:m-0 mb-2 md:mb-4'>

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
        
        }).map((item,index)=>{
          return(
            <div className='bg-white w-full md:w-[75%] h-full flex flex-col items-center m-auto' key={index}>
            
            <div className='card home_card' key={item._id}>
            <div className='flex '>
            <Link to={`${item.postedBy._id}`}><img className="  w-8 rounded-2xl h-8 ml-2 cursor-pointer" src={item.postedBy?.photo} /></Link>
        <h5 className='mt-2 ml-4 font-semibold'>{item.postedBy?.name}</h5>
      
      {auth.user._id===item.postedBy._id ?   <button>
       <Lottie style={{width:40}} animationData={animation_lktd8jxk} className='ml-72' onClick={handleToggle}/> {open && (
        <>
        <AiFillDelete className='float-right mr-4 ' onClick={()=>{handleDelete(item._id)}}/>
        <AiFillEdit className='float-right mr-4' onClick={openModal}/>
        {
          openModals && (<>
            <div class="relative w-full max-w-md mr-12 max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal" onClick={openModal}>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="p-6 text-center">
            <input className='outline-none mt-4 rounded-md m-1 p-1' type="text" placeholder='title' value={title} onChange={(e)=>setTitle(e.target.value)} />
      <input type="text" className='outline-none mt-4 rounded-md m-1 p-1' placeholder='body' value={body} onChange={(e)=>setBody(e.target.value)}/>
    
                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to Edit this post</h3>
                <button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                <AiFillEdit className='float-right ' onClick={()=>{handleEdit(item._id)}}/>
                </button>
                <button data-modal-hide="popup-modal" onClick={openModal} type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
            </div>
        </div>
    </div>
    
          </>)
          
        }
       
        </>
      
      )}  </button>:null}
       
        </div>
       
        <h5 className='mt-2 ml-2 font-medium border-b-8'>{item.postedBy?.createdAt}</h5>
         <div className=''>
            <img src={item.photo} alt="" />
        </div>
        <div className=' flex justify-between mt-4'>
       
            <span onClick={()=>likePost(item._id)}> 
      
          { item.likes.includes(auth.user._id)? <Lottie style={{width:20 ,marginLeft:"5px"}} animationData={animation_lkqsqqa0} />  :<FcLikePlaceholder /> } 
          <span className='ml-2'>{item.likes.length} likes</span>
             </span>
           
            <h5 className='flex '> <FaShareSquare className='mr-1 mt-[3px]'/> Shares</h5>
            <h5 className='flex cursor-pointer' onClick={openComment}><AiOutlineComment className='mr-1 mt-[3px] cursor-pointer' onClick={openComment} /> Comments</h5>
          
          
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
                className='outline-none'
                onChange={(e) => {
                  setComment(e.target.value);
                 
                }}
               
              />
              <button className='rounded-full mb-1 px-2  bg-teal-600'
               
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
        openComments && ( item.comments.map((p,index)=>(
                      <>
                      <div className='flex space-x-10' key={index}>

                      <img src={p.postedBy.photo} alt='photo' className='rounded-full h-8 w-8'/>
                 <span>{p.postedBy.name}</span>
                      <h2>{p.text}</h2>
                      
                      <AiFillDelete className='float-right mr-4 cursor-pointer' onClick={()=>setDeleteComments(p._id,item._id)}/>
                 </div>

                 </>
                    )))
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
       <div className='hidden md:w-1/5 bg-white shadow-lg mt-20  md:flex md:flex-col'>
         
         {allUser.map((i,userId)=>(
            <div className='flex py-2 float-right ' key={userId}>
            <div className='z-10  mt-4   h-8 w-8 rounded-full overflow-hidden border-2 bg-gray-500 focus:outline-none focus:border-black'>
           <img className='w-full h-full object-cover transition-all duration-500 cursor-pointer'   key={i._id} src={i.photo} alt='photo'/>
           
            </div>
            <span className='mt-5 font-semibold'>{i.name}</span>
          
            </div>
         ))}
         <Lottie animationData={animation_lkqhb84m}/>
       </div>
    </div>
  )
}

export default Feeds


