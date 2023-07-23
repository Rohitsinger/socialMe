import React,{useContext,useState} from 'react'
import { Link} from 'react-router-dom'
import './Style/Navbar.css'

import { useAuth } from '../reducers/UserReducer'

// import { UserContext } from '../App'
const Navbar = () => {
const [auth,setAuth] = useAuth()
const [open,setOpen] = useState("")
const [openLinks,setOpenLinks] = useState("")
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
        <a  className='md:hidden cursor-pointer text-4xl transition-all  duration-300 ' onClick={openToggle}>&#8801;</a>
          {
          openLinks && (
            <div className='   md:min-h-fit'>
       <ul className='md:ml-48  md:flex md:items-end  '>
      
        <li className='mr-16 mt-4 mb-2 font-bold uppercase  hover:shadow-xl transition-all duration-300  p-1 m-1 rounded-md text-lg'><Link to="/signin" >Signin</Link></li>
      <li className='mr-16 mt-4  p-1 m-1 rounded-md font-bold text-lg  mb-2 transition-all duration-300 hover:shadow-xl uppercase'><Link to="/signup">Signup</Link></li>
      </ul>
      </div>
          )
        }
           <div className=' hidden  md:block md:min-h-fit'>
       <ul className='md:ml-48  md:flex md:items-end  '>
      
        <li className='mr-16 mt-4 mb-2 font-bold uppercase  hover:shadow-xl transition-all duration-300  p-1 m-1rounded-md text-lg'><Link to="/signin" >Signin</Link></li>
      <li className='mr-16 mt-4  p-1 m-1 rounded-md font-bold text-lg  mb-2 transition-all duration-300 hover:shadow-xl uppercase'><Link to="/signup" >Signup</Link></li>
      </ul>
      </div>
        
     
     
       
   </div>
        ]
       
    } else{
        return [
          
          <div>
          <a  className='md:hidden cursor-pointer text-4xl' onClick={openToggle}>&#8801;</a>
            {
            openLinks && (
              <div className='   md:min-h-fit'>
         <ul className='md:ml-48  md:flex md:items-end  '>
        
          <li className='mr-16 mt-4 mb-2 font-bold uppercase  hover:shadow-xl transition-all duration-300  p-1 m-1 rounded-md text-lg'><Link to="/profile" >Profile</Link></li>
        <li className='mr-16 mt-4  p-1 m-1 rounded-md font-bold text-lg  mb-2 transition-all duration-300 hover:shadow-xl uppercase'><Link to="/create">Create</Link></li>
        </ul>
        </div>
            )
          }
             <div className=' hidden  md:block md:min-h-fit'>
         <ul className='md:ml-48  md:flex md:items-end  '>
        
          <li className='mr-16 mt-4 mb-2 font-bold uppercase  hover:shadow-xl transition-all duration-300  p-1 m-1rounded-md text-lg'><Link to="/profile" >Profile</Link></li>
        <li className='mr-16 mt-4  p-1 m-1 rounded-md font-bold text-lg  mb-2 transition-all duration-300 hover:shadow-xl uppercase'><Link to="/create">Create</Link></li>
        </ul>
        </div>
          
        <button className= 'z-10 flex flex-col relative  float-right  ml-64 md:ml-32 h-8 w-8 rounded-full overflow-hidden border-2 bg-gray-500 focus:outline-none focus:border-white'>
        <img  className="w-full h-full object-cover  transition-all duration-500 " src={auth?.user?.photo} onClick={hanldleToggle}/>
        </button>
        { open && (
          <div className='bg-white  absolute '>
    
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
        <nav className=' w-[100%]   fixed md:sticky'>
        <ul id="nav-mobile" className='md:flex   w-full items-center px-5 md:flex-row shadow-2xl bg-white  ' >
      <Link to={auth.user?"/":'/signin'} className="mx-4 mt-2  font-extrabold text-3xl text-teal-600 mb-6 translate duration-150 hover:transition-shadow ml-24">Instagram</Link>
  
        <li className="md:ml-96">
           {renderList()}
   
           </li>
    

      </ul>
  
  </nav>
    </>
  )
}

export default Navbar
