const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cookieParser=require('cookie-parser');
const session=require("express-session")
const multer=require("multer");


app.use(session({
    secret: '123', // Replace with a secure key
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 6000000000 // Session expiration time in milliseconds
    }
  }));

const port=8000;

//mongoose database connect
mongoose.connect("mongodb://127.0.0.1:27017/studyBuddy")
.then((e)=>console.log("mongoDB connected successfully"));

//setting path for ejs module
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.resolve("./src/views"));


//middlewares 
app.use(express.urlencoded({extended:false}));
app.use('/public',express.static(path.join(__dirname,'/public')));




//registring routes
const userRoute=require("./routes/student");
const staticRoute=require("./routes/static");
const adminRoute=require("./routes/admin");

//using routes
app.use("/student",userRoute);
app.use("/",staticRoute);
app.use("/admin",adminRoute);

app.listen(port,()=>{
    console.log(`server started at port ${port}`);
})