const dotenv=require("dotenv");
dotenv.config();

const {Router}=require("express");
const router=Router();
const Video=require("../models/videos");
const { GoogleGenerativeAI } = require("@google/generative-ai");

router.get("/registration",(req,res)=>{
    return res.render("registration",{"err":""});
})

router.get("/",async(req,res)=>{
    var user=null
    if(req)
        user=req.session.user;
    const allVideos=await Video.find();
    return res.render("home",{user:user,allVideos:allVideos,"err":""});
})

router.post("/search",async(req,res)=>{
    const courseName=req.body;
    console.log(courseName.search_box);
    console.log(req.session.user);
    const allVideos=await Video.find({videoTitle:courseName.search_box});
    if(!allVideos)return res.render("home",{user:req.session.user,err:"video not found"});
    return res.render("home",{user:req.session.user,allVideos:allVideos,err:""});
})



router.get("/test",(req,res)=>{
    return res.render("test");
})

router.post("/test/subject",async(req,res)=>{
    const {subjectName}=req.body
    const name=subjectName
    const genAI = new GoogleGenerativeAI(process.env.apikey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const result=await model.generateContent(`generate me 5  multiple choice questions of ${name} without answer key`)
    const response=await result.response
    const text=response.text();
    const questionArray=text.split("\n")
    console.log(questionArray.length)
    console.log(questionArray);
    console.log(questionArray[4]);
    return res.render("test",{questionArray:questionArray,subjName:name});
})

router.get("/playlist/:videoId",(req,res)=>{
    return res.render('playlist');
})
module.exports=router;