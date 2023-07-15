import React,{useEffect, useState} from 'react'
import '../Style/Signin.css'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../reducers/UserReducer'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const Signup = () => {
  const [auth,setAuth] = useAuth()
  const navigate = useNavigate()
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [photo,setPhoto] = useState("")
// const [url,setUrl] = useState("")
 
    const PostData = async(e)=>{
      e.preventDefault()
      const appendData = new FormData()
      appendData.append("name",name)
      appendData.append("email",email)
      appendData.append("password",password)
      appendData.append("photo",photo)

      const data = await axios.post('/signup',appendData)
      
  console.log(data);
  
setAuth({...auth,user:data.user,token:data.token})
        localStorage.setItem("auth",JSON.stringify(data))
  navigate('/signin')  
  toast.success('Created Successfully')  
 
   

          
   
  
}


  
  return (
    <>
    <div className='md:bg-[#ebd7e2] md:h-screen  md:w-full flex justify-center mt-20 items-center'>
     <div className='h-[350px] w-[700px] bg-white flex justify-center items-center'>
       <div className='border md:h-full md:w-full bg-white shadow-2xl rounded-xl'>
       <h2 className='text-2xl text-center'>Welcome Signup Here</h2>
       
        <div className='flex flex-col gap-4  text-center'>
        <input type="text" className='outline-none hover:bg-gray-50  p-2 m-2 rounded-sm' placeholder='Enter your Name' value={name} onChange={(e)=>setName(e.target.value)} name='name'/>
        <input type="email" className='outline-none hover:bg-gray-50  p-2 m-2 rounded-sm' placeholder='Enter your Email' autoComplete='off' value={email} onChange={(e)=>setEmail(e.target.value)} name='email'/>
        <input type="password" className='outline-none hover:bg-gray-50  p-2 m-2 rounded-sm' placeholder='Enter your Password' autoComplete='off' value={password} onChange={(e)=>setPassword(e.target.value)} name='password'/> 
        <div className="file-field input-field">
      <div className="btn">
      
        <input type="file" name="photo"  className='relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary'  onChange={(e)=>setPhoto(e.target.files[0])} />
      </div>
      
    </div>
         <button className="m-2 p-2 bg-green-500 rounded-md w-48 items-center mx-auto " onClick={PostData}>Sign Up</button>
        {/* <h5><Link to ='/signin'>Have an Account?</Link></h5> */}
     </div>
       </div>
       <div className='bg-teal-700 border w-full h-full hidden md:block shadow-lg'> 
          <img className='object-contain' src="https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
       </div>
    </div>
    </div>
    </>
  )
}

export default Signup

