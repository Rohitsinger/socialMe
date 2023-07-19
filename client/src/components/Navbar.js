import React,{useContext,useState} from 'react'
import { Link} from 'react-router-dom'
import './Style/Navbar.css'

import { useAuth } from '../reducers/UserReducer'
// import { UserContext } from '../App'
const Navbar = () => {
const [auth,setAuth] = useAuth()
const [open,setOpen] = useState("")
const hanldleToggle =()=>{
   setOpen(!open)
}
  const renderList = ()=>{
    if(!auth.user){
       return [
        <ul className='md:ml-72  md:flex md:items-end'>
        <li className='mx-4 md:ml-48 mt-2 uppercase font-bold text-teal-600 translate duration-150 hover:text-green-400'><Link to="/signin">Signin</Link></li>
        <li className='mx-4 uppercase font-bold text-teal-600 translate duration-150 hover:text-green-400'><Link to="/signup">Signup</Link></li>
       
        </ul>
        ]
       
    } else{
        return [
          <div>
         <ul className='md:ml-48  md:flex md:items-end  '>
        
          <li className='ml-12 mt-4 mb-2 font-bold uppercase  hover:shadow-xl transition-all duration-300  p-1 m-1 bg-orange-200 rounded-md text-lg'><Link to="/profile" >Profile</Link></li>
        <li className='ml-12 mt-4  p-1 m-1 rounded-md font-bold text-lg  mb-2 transition-all duration-300 hover:shadow-xl uppercase'><Link to="/create">Create</Link></li>
        </ul>
     
       
     
        </div>
        
        ]
    }
  }
  return (
    <>
        <nav className='w-full '>
        <ul id="nav-mobile" className='flex shadow-2xl bg-white  ' >
      <Link to={auth.user?"/":'/signin'} className="mx-4 mt-2  font-extrabold text-3xl text-teal-600 mb-6 translate duration-150 hover:transition-shadow ml-24">Instagram</Link>
      
        <li class="ml-96">

  {renderList()}</li>
  <button className= 'z-10 flex flex-col  float-right mt-4 ml-32 h-8 w-8 rounded-full overflow-hidden border-2 bg-gray-500 focus:outline-none focus:border-white'>
        <img  className="w-full h-full object-cover transition-all duration-500 " src={auth?.user?.photo} onClick={hanldleToggle}/>
        </button>
        { open && (
          <div className='bg-white   '>
         
          <li className='no-underline  block px-4 py-2  hover:bg-gray-400 transition-all duration-500'>{auth?.user?.name}</li>
          <li className='no-underline  block px-4 py-2  hover:bg-gray-400 transition-all duration-500'>{auth?.user?.email}</li>
        
        </div>
        )}
      </ul>
  
  </nav>
    </>
  )
}

export default Navbar
