import React,{useState} from 'react'
import '../Style/Signin.css'
import { Link,useLocation,useNavigate } from 'react-router-dom'
// import { UserContext } from '../../App'
import axios from 'axios'
import { useAuth } from '../../reducers/UserReducer'
const Signin = () => {
  const [auth,setAuth] = useAuth()
  // const {state,dispatch} = useContext(UserContext)
  const navigate = useNavigate()
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const location = useLocation()
  const PostData = async()=>{
 
   try {
     const {data} =  await axios.post("/signin",{email,password})
     console.log(data);
     
    if(data){
       setAuth({...auth,user:data.user,token:data.token})
           localStorage.setItem("auth",JSON.stringify(data))
     
         
           navigate(location.state || '/')
    }
         
   } catch (error) {
      console.log(error);
   }
   
 }
  return (
    <div className='bg-[#ebd7e2] h-screen w-full flex justify-center items-center'>
     <div className='h-[350px] w-[700px] bg-white flex justify-center items-center'>
       <div className='border md:h-full md:w-full bg-white shadow-2xl rounded-xl'>
       <h2 className='text-2xl text-center'>Welcome Signup Here</h2>
        <h2 className='text-xl text-center mt-2'>Instagram</h2> 
        <div className='flex flex-col gap-4  text-center'>
       
        <input type="email" className='outline-none hover:bg-gray-50 mt-2 p-2 m-2 rounded-sm' placeholder='Enter your Email' autoComplete='off' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" className='outline-none hover:bg-gray-50 mt-2 p-2 m-2 rounded-sm' placeholder='Enter your Password' autoComplete='off' value={password} onChange={(e)=>setPassword(e.target.value)} /> 
         <button className="m-2 p-2 bg-green-500 rounded-md w-48 items-center mx-auto " onClick={()=>PostData()}>Sign In</button>
        <h5><Link to ='/signup'>Have an Account?</Link></h5>
     </div>
       </div>
       <div className='bg-teal-700 border w-full h-full hidden md:block shadow-lg'> 
          <img className='object-contain' src="https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
       </div>
    </div>
    </div>
  )
}

export default Signin
