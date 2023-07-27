import React, { useEffect, useState, useContext } from 'react'
import { FaShareSquare } from 'react-icons/fa'
import { AiOutlineComment } from 'react-icons/ai'
import '../Style/Signin.css'

import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../reducers/UserReducer'

const UserProfile = () => {
   const [auth] = useAuth()
  
    const [followUserId,setFollowUserId] = useState([])
    const [unfollowUserId,setUnFollowUserId] = useState([])
    const [isFollow,setIsFollow] = useState(false)
    const [singleUser, setSingleUser] = useState([])
    const [singlePost, setSinglePost] = useState([])
    const [allUser, setAllUser] = useState([])
    
    console.log(singleUser,allUser);
    const { userId } = useParams()
    
  

    //fetch all users
    const allUsers = async () => {
        try {
            const response = await axios.get(`/alluser`).then(res => setAllUser(res.data))

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        allUsers()
    }, [])

    //single users
    const getSingleUser = ()=>{ axios.get(`/singleUser/${userId}`).then((res) => {
            
        setSingleUser(res.data.user)
        setSinglePost(res.data.post)
        followUser()
        unfollowUser()
       
    })

}
    useEffect(() => {
     getSingleUser()
  
    }, [])
    
    //follow user


    const followUser = async (_id) => {
  try {
    const response = await axios.put(`/follow/${_id}`,{_id:auth.user._id} )
    .then((res)=>{
        setFollowUserId(res.data)
        getSingleUser()
        isFollow(true)
    })
  
  } catch (error) {
    console.log(error);
  }
            
    }
    
    useEffect(() => {
     followUser()
   }, [])
    //unfollow user

    const unfollowUser = async (_id) => {
     try {
        const fetchFollow = await axios.put(`/unfollow/${_id}`, { _id:auth.user._id })
        .then((res)=>{
            setUnFollowUserId(res.data)
            getSingleUser()
            setIsFollow(false)
        })
        
     } catch (error) {
        console.log(error);
     }
    }
    useEffect(() => {
        unfollowUser()
      }, [])
    return (
        <div style={{ maxWidth: "550px", margin: "10px auto" }}>
          
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: "18px 5px", borderBottom: "1px solid grey" }}  >

             {
                singleUser.map((user,i)=>(
                    <>
                    <div className='mt-24 mx-auto w--32 rounded-md overflow-hidden'>
                    <img src={user?.photo} alt="" className='w-full h-full object-cover transition-all duration-300' />
                </div>
                <div className='mt-24'>
                    <div style={{ display: "flex", justifyContent: 'space-between', margin: "10px" }}>

                        <div className='h-2/6 flex  flex-col justify-center items-center'>

                            <div className='float-right ml-36 md:ml-96'>
                      {user.followers.includes(auth.user._id)?<button className='rounded-md m-2 p-2 font-bold bg-slate-200' onClick={() =>{unfollowUser(user._id)} }>
                                unfollow
                        </button>
                        :          <button className='rounded-md m-2 p-2 font-bold bg-slate-200' onClick={() =>{followUser(user._id)} }>
                                Follow
                        </button>
                        }
                            </div>
                            <h3 className=' text-2xl'>{user?.name}</h3>
                            <span className=''>{user?.email}</span>
                            <span className=''>{user?.worksAt}</span>
                            <span className=''>{user?.livesin}</span>
                            <span className='ml-16'>{user?.about}</span>


                            <div className='border h-[50px] flex justify-center items-center w-full space-x-6  mt-4'>
                                <div className='flex flex-col justify-around items-center' >
                                    <h4>{singlePost.length}</h4>
                                    <p>Posts</p>
                                </div>
                                <div>
                                    <h4>{user.following.length}</h4>
                                    <p>following</p>
                                </div>
                                <div>
                                    <h4>{user.followers.length}</h4>
                                    <p>Followers</p>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
                    </>
                ))
              }
            </div>
            <div className='grid md:grid md:grid-cols-2 '>
             {singlePost.map((posts,i)=>(
                <div className='max-w-sm  transition-all bg-white border-4 border-gray-200 rounded-lg shadow hover:dark:bg-gray-800 dark:border-gray-700' >
                    <div className=' p-6'>
                        <img src={posts.photo} className='w-full rounded-2xl' alt={posts.title} /> 
                    </div>
                    <div className=' flex justify-between mt-4'>
       
       {/* <span onClick={()=>likePost(item._id)}> */}
 
     {/* {item.likes ? <FcLikePlaceholder />  :<FcLike /> } */}
        
       {/* </span> */}
     
       <h5 className='flex '> <FaShareSquare className='mr-1 mt-[3px]'/> Shares</h5>
       <h5 className='flex'><AiOutlineComment className='mr-1 mt-[3px]'/> Comments</h5>
     
     
   </div><hr/>
                 <h6>{posts.title}</h6>
            <p>{posts.body}</p>


                </div>
             ))}

            </div>
        </div>
    )
}

export default UserProfile

