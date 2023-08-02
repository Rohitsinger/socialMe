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
  const [posts,setPosts] = useState([])

  const fetchPost=async()=>{
    const result = await axios.get("/allPost")
    
      .then((res)=>
    
      setPosts(res.data.posts))
     }
     useEffect(() => {
      fetchPost()
    
     }, [])
  const postDetails =()=>{

try {
  const appenddata = new  FormData()
  appenddata.append("title",title)
  appenddata.append("body",body)

  appenddata.append("photo",photo)

 

const {data} =  axios.post("/createpost",appenddata)
console.log(data);
fetchPost()

  toast.success('Created Successfully')  
navigate('/home/feeds')  



} catch (error) {
  console.log(error);
}

  }

  return (
    <div className='  md:bg-[#ebd7e2] md:h-screen  md:w-full flex justify-center  items-center'>
   <div className='h-[400px] w-[500px]  bg-white  justify-center items-center'>
     <div className='border mt-40 md:mt-0 md:h-full md:w-full flex flex-col space-y-12 bg-white shadow-2xl rounded-xl'>
        <h2 className='font-semibold text-center font-serif text-3xl'>Create Post</h2>
         <input className="outline-none hover:bg-slate-50" type="text" placeholder='Enter the title' value={title} onChange={(e)=>setTitle(e.target.value)} />
      <input className="outline-none hover:bg-slate-50" type="text" placeholder='Enter the description' value={body} onChange={(e)=>setBody(e.target.value)}/>
        <label className=' mb-2 inline-block text-neutral-700 dark:text-neutral-200 mt-32'   >
            {photo ? photo.name : "Upload Photo"}
              <input type='file' name='photo' accept='image/*' required  onChange={(e)=>setPhoto(e.target.files[0])}  className='relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary' size={25}/>
            </label>
            <button className="m-2 p-2 font-bold bg-blue-500 hover:bg-blue-600 transition-all duration-300 ease-in rounded-md" onClick={postDetails}>Create</button>
    </div>
     </div>
   </div>
   
  
  )
}

export default CreatePost
