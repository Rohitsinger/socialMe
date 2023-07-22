import Message from '../components/Message'
import ReactScrollToBottom from 'react-scroll-to-bottom'
import '../components/Home.css'
import {io} from 'socket.io-client'
// import { UserContexts } from './Enter'

const ENDPOINT = 'http://localhost:5000/';
let socket;

 
const ChatRoutes = () => {

    const [id,setId]= useState("")
    const [messages,setMessages]= useState([])
    const send =(e)=>{
      const message =  document.getElementById('chatInput').value
       socket.emit('message',{message,id});
      
       console.log(id);
        document.getElementById('chatInput').value="";
    } 
    const reload =(e)=>{
       e.preventDefault();
    // localStorage.setItem("userId", messages)
    }
 
    const combine=()=>{
       reload()
       send()
    }
 
   console.log(messages);
 
 useEffect(()=>{
    socket = io(ENDPOINT,{transports: ['websocket']})
    socket.on('connect',()=>{
      
        setId(socket.id)
       console.log(socket.id);
    })
    // console.log(socket);
    socket.emit('joined',{user});
 
    socket.on('welcome',(data)=>{
       setMessages([...messages,data])
       console.log(data.user,data.message);
    })
 
    socket.on('userJoined',(data)=>{
       setMessages([...messages,data])
       console.log(data.user, data.message);
    })
 
    socket.on('leave',(data)=>{
       console.log(data);
       setMessages([...messages,data])
       
       console.log(data.user,data.message,data.id);
    })
 
    
    
 
    return ()=>{
      socket.on('disconnect');
      socket.off();
    }
 },[])
    
 useEffect(()=>{
    socket.on('sendMessage',(data)=>{
       setMessages([...messages,data])
      
       console.log(data.user,data.message,data.id);
    })
    return()=>{
       socket.off()
    }
 },[messages])
 
 
 return (
     <div className='flex h-screen bg-slate-50'>
    
        <div className='w-1/3 bg-fuchsia-100  p-4 '>
        <div className='text-blue-700 font-bold flex gap-2 pb-4'><BsFillChatLeftDotsFill/>ChatMe</div>
        {user}
        </div>
        <div >
          <h2>C hat Me </h2>
        </div>
        <ReactScrollToBottom className='w-2/3 flex flex-col bg-slate-300 overflow-y-auto '>
        <div className='flex-grow ml-32 clear-both outline-none '>
         
        {messages.map((data,index)=>{
          console.log(data)
          if(data){
          return(
             <Message  user={data.id===id?"":data.user}  message={data.message} classes={data.id===id}/>
          )
          }
        })}
         
        </div> <br /> 
        <div className='flex gap-2 mx-2'>
           
           <input type="text"  placeholder='Enter the Message' id='chatInput' className='  bg-white flex-grow sticky rounded-md border p-2 m-2 outline-none' />
            
           <button onClick={combine} className='bg-slate-400  w-8 mt-2  h-9 p-2'  ><AiOutlineSend /></button>
           </div>
        </ReactScrollToBottom>
      
     </div>
   )
 }
 

 

export default ChatRoutes