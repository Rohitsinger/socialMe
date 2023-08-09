import React,{useContext,useState} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import './Style/Navbar.css'

import { useAuth } from '../reducers/UserReducer'

// import { UserContext } from '../App'
const Navbar = () => {
const [auth,setAuth] = useAuth()
const [open,setOpen] = useState("")
const [openLinks,setOpenLinks] = useState("")
const navigate = useNavigate()
const handleLogout =()=>{
  setAuth({...auth,user:null,token:""})
  localStorage.clear()
  navigate('/signin')
 }

const hanldleToggle =()=>{
   setOpen(!open)
}
const openToggle =()=>{
   setOpenLinks(!openLinks)
}
  const renderList = ()=>{
    if(!auth.user){
       return [
        <div>
        <a  className='md:hidden cursor-pointer  text-4xl transition-all   duration-300 ' onClick={openToggle}>&#8801;</a>
          {
          openLinks && (
            <div className='   md:min-h-fit'>
       <ul className=' md:flex md:items-end  '>
      
        <li className='mr-16 mt-4 mb-2 font-bold uppercase  hover:shadow-xl transition-all duration-300  p-1 m-1 rounded-md text-lg'><Link to="/signin" >Signin</Link></li>
      <li className='mr-16 mt-4  p-1 m-1 rounded-md font-bold text-lg  mb-2 transition-all duration-300 hover:shadow-xl uppercase'><Link to="/signup">Signup</Link></li>
      </ul>
      </div>
          )
        }
           <div className=' hidden  md:block md:min-h-fit'>
       <ul className=' md:flex md:items-end  '>
      
        <li className='mr-16 mt-4 mb-2 font-bold uppercase  hover:shadow-xl transition-all duration-300  p-1 m-1rounded-md text-lg'><Link to="/signin" >Signin</Link></li>
      <li className='mr-16 mt-4  p-1 m-1 rounded-md font-bold text-lg  mb-2 transition-all duration-300 hover:shadow-xl uppercase'><Link to="/signup" >Signup</Link></li>
      </ul>
      </div>
    </div>
        ]
       
    } else{
        return [
          
          <div>
          <a  className='md:hidden  transition-all duration-400 ease-out cursor-pointer text-4xl' onClick={openToggle}>&#8801;</a>
            {
            openLinks && (
              <div className='  md:min-h-fit'>
         <ul className='  md:flex md:items-end  '>
        
          <li className='mr-16 mt-4 mb-2 font-bold uppercase  hover:shadow-xl transition-all duration-300  p-1 m-1 rounded-md text-lg'><Link to="/home/profile" >Profile</Link></li>
        <li className='mr-16 mt-4  p-1 m-1 rounded-md font-bold text-lg  mb-2 transition-all duration-300 hover:shadow-xl uppercase'><Link to="/home/create">Create</Link></li>
        <li onClick={handleLogout} className='mr-16 mt-4  cursor-pointer p-1 m-1 rounded-md font-bold text-lg  mb-2 transition-all duration-300 hover:shadow-xl uppercase'>Logout </li>
        </ul>
        </div>
            )
          }
             <div className=' hidden  md:block  md:min-h-fit'>
         <ul className=' md:flex md:items-end  '>
        
          <li className='mr-16 mt-4 mb-2 font-bold uppercase  hover:shadow-xl transition-all duration-300  p-1 m-1rounded-md text-lg'><Link to="/home/profile" >Profile</Link></li>
        <li className='mr-16 mt-4  p-1 m-1 rounded-md font-bold text-lg  mb-2 transition-all duration-300 hover:shadow-xl uppercase'><Link to="/home/create">Create</Link></li>
        <li onClick={handleLogout} className='mr-16 mt-4 cursor-pointer p-1 m-1 rounded-md font-bold text-lg  mb-2 transition-all duration-300 hover:shadow-xl uppercase'>Logout </li>
        </ul>
        </div>
          
        <button className= 'z-10  transition-all duration-400 ease-out  flex-col relative  float-right  ml-64  h-8 w-8 rounded-full overflow-hidden  border-2 bg-gray-500 focus:outline-none focus:border-white'>
        <img  className="w-full  h-full object-cover  transition-all duration-500 " src={auth?.user?.photo} onClick={hanldleToggle}/>
        </button>
        { open && (
          <div className='bg-white z-10 flex flex-col   float-right   md:ml-32 absolute '>
    
          <li className='no-underline  block px-4 py-2  hover:bg-gray-400 transition-all duration-500'>{auth?.user?.name}</li>
          <li className='no-underline  block px-4 py-2  hover:bg-gray-400 transition-all duration-500'>{auth?.user?.email}</li>
        
        </div>
        )}
        
     </div>
           
        ]
    }
  }
  return (
    <>
        <nav className=' w-[100%] h-20 md:h-0 fixed md:sticky '>
        <ul id="nav-mobile" className='md:flex mx-auto  w-full items-center shadow-md md:flex-row flex flex-wrap  bg-white inset-x-0 ' >
      <Link to={auth.user?"/":'/signin'} className="  font-extrabold text-xl text-teal-600  translate duration-150 hover:transition-shadow ml-8">SocialMe</Link>
  
        <li className="md:ml-80 ">
           {renderList()}
   
           </li>
    

      </ul>
  
  </nav>
    </>
  )
}

export default Navbar
