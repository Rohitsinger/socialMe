import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
// import {usePosts} from '../../reducers/UserReducer'
const CreatePost = () => {

  const navigate = useNavigate()
  const [title,setTitle] = useState("")
  const [body,setBody] = useState("")
  const [photo,setPhoto] = useState("")
//  const [post,setPost] = useState({
//      title:"",
//      body:"",
//      photo:""
//  })

//  const handleChange = (e)=>{
//   const {name,value} = e.target
//   setPost(prev=>{
//     return({
//       ...prev,[name]:value
//   })
// })
// }

  const postDetails =()=>{

try {
  const appenddata = new  FormData()
  appenddata.append("title",title)
  appenddata.append("body",body)

  appenddata.append("photo",photo)

 

const {data} =  axios.post("/createpost",appenddata)
console.log(appenddata);
// localStorage.setItem('posts',JSON.stringify(...[title,body,photo]))

navigate('/')  
toast.success('Created Successfully')  

} catch (error) {
  console.log(error);
}

  }

// useEffect(()=>{

// postDetails()
// },[])

  return (
    <div className='card input_field' style={{margin:"10px auto", marginTop:"70px", maxWidth:"500px", padding:"20px", textAlign:"center"}}>
   
      <input type="text" placeholder='title' value={title} onChange={(e)=>setTitle(e.target.value)} />
      <input type="text" placeholder='body' value={body} onChange={(e)=>setBody(e.target.value)}/>
      <div className="file-field input-field">
      
     
      <label className=' mb-2 inline-block text-neutral-700 dark:text-neutral-200'   >
            {photo ? photo.name : "Upload Photo"}
              <input type='file' name='photo' accept='image/*' required  onChange={(e)=>setPhoto(e.target.files[0])}  className='relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary' size={25}/>
            </label>
    </div>
    
    <button className="waves-effect waves-dark btn" onClick={postDetails}>Login</button>
    </div>
  )
}

export default CreatePost
