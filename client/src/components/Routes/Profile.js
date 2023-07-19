import React, { useEffect,useState,useContext } from 'react'
import { UserContext } from '../../App'
import '../Style/Signin.css'
import { useAuth } from '../../reducers/UserReducer'
import axios from 'axios'
const Profile = () => {
const [auth] = useAuth()

  const [singlePost,setSinglePost] = useState([])
  const fetchData = async()=>{
    const result = await axios.get("/mypost").then((res)=>
    setSinglePost(res.data.mypost))
     console.log(singlePost);
   }
  useEffect(()=>{
    fetchData();
  },[])
  return (
    <div style={{maxWidth:"550px", margin:"10px auto"}} className=''>
       <div style={{display:'flex', justifyContent:'space-between', margin: "18px 5px" , borderBottom:"1px solid grey"}}>
        <div>
            <img src={auth?.user?.photo} alt="" style={{width:"160px", height:"160px" , borderRadius:"80px"}} />
        </div>
        <div>
            <div style={{display:"flex",justifyContent:'space-between', margin:"10px"}}>
            <div className='h-2/6 flex  flex-col justify-center items-center'>
  
      <h3 className=' text-2xl'>{auth?.user?.name}</h3>
      <span className=''>{auth?.user?.email}</span>
      <span className=''>{auth?.user?.worksAt}</span>
      <span className=''>{auth?.user?.livesin}</span>
      <span className='ml-16'>{auth?.user?.about}</span>
     
    
     
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
             </div>
        </div>
       </div>
       <div className='grid md:grid md:grid-cols-2'>
       {
        singlePost.map((item)=>{
          return(
      
            <div className='max-w-sm transition-all bg-white border-4 border-gray-200 rounded-lg shadow hover:dark:bg-gray-800 dark:border-gray-700' key={item._id}>
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

