
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const {MONGOURI,PORT} = require('./keys');

 const fileUpload = require('express-fileupload')
app.use(fileUpload({
    useTempFiles:true
}))



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

app.use(express.json())
app.use(express.urlencoded({
    extended:false
}))
app.use(cors())

app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))


app.get('/',(req,res)=>{
    res.send("Hello users")
})

app.listen(PORT,()=>{
    console.log("server is running on port 8000", PORT);
})