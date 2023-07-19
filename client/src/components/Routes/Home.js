
import Feeds from './Feeds'

import axios from "axios";
import { useEffect, useState } from "react";
const Home = () => {
       //post Context 
   
//        const [posts,setPosts] = useState([])
//        const fetchPost=async()=>{
//        const result = await axios.get("/allPost")
      
//          .then((res)=>
//          setPosts(res.data.posts))
        
//           console.log(posts);
   
//      }
//  useEffect(()=>{
//    fetchPost()
  
 
//  },[])
 
  return (
    <div>
  Hello
      {/* {posts.map((p)=>(
        <Feeds key={p._id} posts={p}/>
      ))} */}
    </div>
  )
}

export default Home
