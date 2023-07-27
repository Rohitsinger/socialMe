import React,{useEffect, useState, useContext} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {CiSearch} from 'react-icons/ci'
import {AiOutlineHome,AiOutlineMessage,AiOutlineProfile,AiOutlineComment,AiFillDelete, AiFillEdit} from 'react-icons/ai'
import {HiTrendingUp} from 'react-icons/hi'
import {BsChevronCompactLeft,BsChevronCompactRight} from 'react-icons/bs'
import {FaShareSquare} from 'react-icons/fa'
import {BiAlignMiddle} from 'react-icons/bi'
import {FcLike,FcLikePlaceholder} from 'react-icons/fc'
import {BiSolidLike,BiSolidDislike} from 'react-icons/bi'
import axios from 'axios'
import {  useAuth, usePosts } from '../../reducers/UserReducer'
import { toast } from 'react-toastify'

const Feeds = () => {
  const [auth,setAuth] = useAuth()
  const [allUser,setAllUser] = useState([])
  const [posts,setPosts] = useState([])
  const [open,setOpen] = useState(false)
  const [openModals,setOpenModals] = useState(false)
  const [like,setLike] = useState(false)
    const [liked,setLiked] = useState(posts.likes)
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [search,setSearch] = useState("")
    const navigate = useNavigate()
    const [singlePost,setSinglePost] = useState([])
    const [title,setTitle] = useState({})
    const [body,setBody] = useState({})
    const [photo,setPhoto] = useState({})
  
   
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
// toggle 
   const handleToggle = () => {
    setOpen(!open)
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

  const openModal=()=>{
    setOpenModals(!openModals)
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
       <BiAlignMiddle className='ml-72' onClick={handleToggle}/>
      {auth.user._id===item.postedBy._id ? open  && (
        <>
        <AiFillDelete className='float-right ' onClick={()=>{handleDelete(item._id)}}/>
        <AiFillEdit className='float-right ' onClick={openModal}/>
        {
          openModals && (<>
            <div class="relative w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="p-6 text-center">
            <input type="text" placeholder='title' value={title} onChange={(e)=>setTitle(e.target.value)} />
      <input type="text" placeholder='body' value={body} onChange={(e)=>setBody(e.target.value)}/>
      <div className="file-field input-field">
      
     
      <label className=' mb-2 inline-block text-neutral-700 dark:text-neutral-200 mt-32'   >
            {photo ? photo.name : "Upload Photo"}
              <input type='file' name='photo' accept='image/*' required  onChange={(e)=>setPhoto(e.target.files[0])}  className='relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary' size={25}/>
            </label>
    </div>
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
      ):null}
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


