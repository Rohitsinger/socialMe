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
         <ul className='md:ml-48  md:flex md:items-end space-x-64 '>
        
          <li className='mx-6 mb-2 font-bold uppercase  hover:shadow-xl transition-all duration-300 text-white p-1 m-1 bg-orange-200 rounded-md text-lg'><Link to="/profile" >Profile</Link></li>
        <button className='mx-6 text-white p-1 m-1 rounded-md bg-red-400 font-bold text-lg  mb-2 transition-all duration-300 hover:shadow-xl uppercase'><Link to="/create">Create Post</Link></button>
        <img  className="w-10 rounded-full " src={auth?.user?.photo} onClick={hanldleToggle}/>
        { open && (
           <ul className='bg-blue-600 py-2 text-sm '>
        
          <li className='block px-4 py-2'>{auth?.user?.name}</li>
          <li className='block px-4 py-2'>{auth?.user?.email}</li>
        </ul>
        )}
       
        </ul>
        ]
    }
  }
  return (
    <>
        <nav className='w-full '>
        <ul id="nav-mobile" className='flex shadow-2xl bg-white mt-4  ' >
      <Link to={auth.user?"/":'/signin'} className="mx-4  mt-8 font-extrabold text-3xl text-teal-600 mb-6 translate duration-150 hover:rotate-45 ml-24">Instagram</Link>
      
        <li class="ml-32">

  {renderList()}</li>
      </ul>
  
  </nav>
    </>
  )
}

export default Navbar
