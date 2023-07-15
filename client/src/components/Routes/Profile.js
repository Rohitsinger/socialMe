import React, { useEffect,useState,useContext } from 'react'
import { UserContext } from '../../App'
import '../Style/Signin.css'
const Profile = () => {


  const [pics,setPics] = useState([])
  useEffect(()=>{
     
  },[])
  return (
    <div style={{maxWidth:"550px", margin:"10px auto"}}>
       <div style={{display:'flex', justifyContent:'space-between', margin: "18px 5px" , borderBottom:"1px solid grey"}}>
        <div>
            <img src="https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8d29tZW58ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" style={{width:"160px", height:"160px" , borderRadius:"80px"}} />
        </div>
        <div>
            {/* <h4>{state?state.name:"loading"}</h4> */}
            <div style={{display:"flex",justifyContent:'space-between', margin:"10px", width:"98%"}}>
             <h6>40 posts</h6>
             <h6>40 Followers</h6>
             <h6>40 Following</h6>
             </div>
        </div>
       </div>
       <div className='gallery'>
       {/* {
        pics.map((item)=>{
          return(
            <img src={item.photo} className='item' alt={item.title} />
          )
        })
       } */}
        
        
       </div>
    </div>
  )
}

export default Profile

{/* <img src="https://images.unsplash.com/photo-1514960919797-5ff58c52e5ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bW9kZWxzJTIwZ2lybCUyMGhkJTIwNGt8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" className='item' />
        <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" className='item' />
        <img src="https://images.unsplash.com/photo-1534493872551-856c2bb2279f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzV8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60" alt=""  className='item'/>
        <img src="https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60" alt="" className='item' />
        <img src="https://images.unsplash.com/photo-1519084278803-b94f11e1c63b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTB8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60" alt="" className='item' />
        <img src="https://images.unsplash.com/photo-1515121240746-1fc801ba75a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fG1vZGVscyUyMGdpcmwlMjBoZCUyMDRrfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" className='item' /> */}