// Basic Lib Import
const express =require('express');
const router =require('./src/routes/api');
const app= new express();
const bodyParser =require('body-parser');
const path= require('path');

// Security Middleware Lib Import
const rateLimit =require('express-rate-limit');
const helmet =require('helmet');
const mongoSanitize =require('express-mongo-sanitize');
const xss =require('xss-clean');
const hpp =require('hpp');
const cors =require('cors');

// Database Lib Import
const mongoose =require('mongoose');
app.use(express.static('client/build'));

// Security Middleware Implement
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

// Body Parser Implement
app.use(bodyParser.json())

// Request Rate Limit
const limiter= rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)


// Mongo DB Database Connection
let URI="mongodb://127.0.0.1:27017/businessTable";
let OPTION={user:'',pass:'',autoIndex:true}
mongoose.connect(URI,OPTION,(error)=>{
    console.log("Connection Success")
    console.log(error)
})

// Routing Implement
app.use("/api/v1",router)

// Add React Front End Routing
app.get('*',function (req,res) {
    res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
})

module.exports=app;
















