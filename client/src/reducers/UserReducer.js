

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()
export const PostContext = createContext()

const AuthProvider =({children})=>{

 
    const [auth,setAuth] = useState({
        user:null,
        token:"",

    });
   axios.defaults.headers.common['Authorization'] = auth?.token;
    
    

    useEffect(() => {
      const data = localStorage.getItem("auth")
      if(data){
        const  parseData = JSON.parse(data)
        setAuth({...auth,user:parseData.user,token:parseData.token})
      }
    }, [])

    //post Context 
   
      const [posts,setPosts] = useState([])
      const fetchPosts=async()=>{
      const result = await axios.get("/allPost")
        .then((res)=>
        setPosts(res.data.posts))
    
  
    }
useEffect(()=>{
  fetchPosts()
 },[])
 


    
  return(
    <AuthContext.Provider value={[auth,setAuth]}>
     <PostContext.Provider value={[posts,setPosts]}>
        {children}
        </PostContext.Provider>
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)
const usePosts = () => useContext(PostContext)

export {useAuth,usePosts,AuthProvider} ;