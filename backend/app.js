// const dotenv = require("dotenv")
const express = require('express')
const http = require('http')
const app = express()
const mongoose = require('mongoose')
// const cors = require('cors')

const {MONGOURI,PORT} = require('./keys')

//for chats
const {Server} = require('socket.io')
const server = http.createServer(app)
const io = new Server(server,{cors:{origin:"http://127.0.0.1:5173/"}})
 const fileUpload = require('express-fileupload')
app.use(fileUpload({
    useTempFiles:true
}))
app.get('/', (req,res)=>{
         console.log("home");
         res.send("hello world")
     })


mongoose.connect(MONGOURI),{
    useNewUrlParser:true,
    useUnifiedTopology:true
}


mongoose.connection.on('connected',()=>{
    console.log("connected to mongo yeah");
})
mongoose.connection.on('err',()=>{
    console.log("err to mongo err");
})

require('./models/user')
require('./models/post')
// require('./models/like')

app.use(express.json())
app.use(express.urlencoded({
    extended:false
}))

app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))


io.on("connection", (socket) => {
    // console.log(`New connection:${socket.id}`);
  
    // socket.on('join_room',(data)=>{
    //   socket.join(data)
    //   console.log(`User joined with Id: ${socket.id} joined room :${data}`);
    // })
  
    // socket.on('send_message',(data)=>{
    //  console.log(data);
     
    // })
  
    socket.on('joined',({user})=>{
      users[socket.id] = user;
        console.log(`${user} has joined`);
        socket.broadcast.emit("userJoined",{user:"Admin",message : `${users[socket.id]} has joined`})
        socket.emit('welcome',{user:"Admin", message:`Welcome to the chat , ${users[socket.id]}`})
    })
  
    socket.on('message',({message,id})=>{
     
        io.emit('sendMessage',{user:users[id],message,id})
        
    })
    
    socket.on('disconnect',()=>{
      socket.broadcast.emit('leave',{user:"Admin",message :`${users[socket.id]}`})
      console.log('user left',socket.id);
    })
    
    
  });

app.listen(PORT,()=>{
    console.log("server is running on port 5000", PORT);
})