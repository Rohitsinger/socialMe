import React, { useEffect,useState,useContext } from 'react'

import '../Style/Signin.css'
import { useAuth, usePosts } from '../../reducers/UserReducer'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const Profile = () => {
const [auth] = useAuth()
const [singleUser, setSingleUser] = useState([])
const [singlePost,setSinglePost] = useState([])
  const [followUserId,setFollowUserId] = useState([])

  const [allUser,setAllUser] = useState([])
  
  const { userId } = useParams()
   console.log(singleUser);
  //fetch all users
  const allUsers = async()=>{
    try {
     const response = await axios.get(`/alluser`).then(res=> setAllUser(res.data))
    
     } catch (error) {
       console.log(error);
    }
}
useEffect(() => {
allUsers()
}, [])
  const fetchData = async()=>{
    const result = await axios.get("/mypost").then((res)=>
    setSinglePost(res.data.mypost))
     console.log(singlePost);
   }
  useEffect(()=>{
    fetchData();
  },[])


//singlwuser
  useEffect(() => {

    axios.get(`/singleUser/${userId}`).then((res) => {
        
        setSingleUser(res.data.user)
   
    
        setSinglePost(res.data.post)

    })


}, [])

     //follow user


  //    const followUser = async (singleId) => {
  //     const {fetchFollow} = await axios.put(`/follow/${singleId}`,{_id:auth.user._id} )
      
  //   .then(res=>setFollowUserId(res.data))
          
  // }
  
  // useEffect(() => {

  //     followUser()
      
  //         }, [])
  //unfollow user

  const unfollowUser = async(userId) => {
    const fetchFollow = await axios.put(`/unfollow`,{followId:userId})
  }
  return (
    <div style={{maxWidth:"550px", margin:"10px auto"}}>
       <div style={{display:'flex', justifyContent:'space-between', margin: "18px 5px" , borderBottom:"1px solid grey"}}  >
      
        <div className='mt-24 mx-auto w--32 rounded-md overflow-hidden'>
            <img src={auth?.user?.photo} alt="" className='w-full h-full object-cover transition-all duration-300' />
        </div>
        <div className='mt-24'>
            <div style={{display:"flex",justifyContent:'space-between', margin:"10px"}}>
           
            <div className='h-2/6 flex  flex-col justify-center items-center'>
       
            <div className='float-right ml-36 md:ml-96'>
    {/* <button className='rounded-md m-2 p-2 font-bold bg-slate-200' onClick={()=>{followUser(singleUser._id)}}>follow</button> */}
    </div>
      <h3 className=' text-2xl'>{auth?.user?.name}</h3>
      <span className=''>{auth?.user?.email}</span>
      <span className=''>{auth?.user?.worksAt}</span>
      <span className=''>{auth?.user?.livesin}</span>
      <span className='ml-16'>{auth?.user?.about}</span>
{singleUser.map((user)=>(
  <div className='border h-[50px] flex justify-center items-center w-full space-x-6  mt-4'>
    <div className='flex flex-col justify-around items-center' >
      <h4>{singlePost.length}</h4>
      <p>Posts</p>
    </div>
    <div>
    <h4>{user.following}</h4>
      <p>following</p>
    </div>
    <div>
    <h4>{user.followers}</h4>
      <p>Followers</p>
    </div>
    </div>
))}
     

      
   
  </div>
             </div>
        </div>
       </div>
       <div className='grid md:grid md:grid-cols-2 '>
       {
        singlePost.map((item)=>{
          return(
      
            <div className='max-w-sm  transition-all bg-white border-4 border-gray-200 rounded-lg shadow hover:dark:bg-gray-800 dark:border-gray-700' key={item._id}>
            <div className=' p-6'> 
            <img src={item.photo} className='w-full rounded-2xl' alt={item.title} />
            </div>
            <h6>{item.title}</h6>
            <p>{item.body}</p>
          
          
            </div>
          )
        })
       }
        
        
       </div>
    </div>
  )
}

export default Profile

