// export const initialState = null

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()
const PostContext = createContext()

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
    const [post,setPost] = useState([])
    const [posts,setPosts] = useState([])
    const fetchData=async()=>{
      const result = await axios.get("/allPost")
   
      .then((res)=>
      setPosts(res.data.posts))
       console.log(posts);
     
      
  }
  
useEffect(()=>{
 fetchData()
 
},[])

useEffect(()=>{
  localStorage.setItem('posts',JSON.stringify(posts))
  
},[posts])

useEffect(() => {
    const data = localStorage.getItem("posts")
    const  parseData = JSON.parse(data)
      setPosts({...posts,posts:parseData.posts})
    
  }, [])


    
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