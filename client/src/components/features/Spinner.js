import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Spinner = () => {
    const [count,setCount]=useState(2);
    const navigate =  useNavigate();
    const location = useLocation()

useEffect(() => {
    const interval = setInterval(() => {
        setCount((prev)=>--prev)
    }, 2000);
    count === 0 && navigate('/signin',{
        state:location.pathname
    });

    return ()=> clearInterval(interval)

}, [count,navigate,location])

  return (
  
   <>
    <div className=" h-8 w-8 m-auto mt-64 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
    role="status">
    <span
      className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      ></span>
     
  </div>
  <h1 className='text-2xl text-blue-600 text-center'>Redirecting you in {count} seconds</h1>
  </>
   
  )
}

export default Spinner
