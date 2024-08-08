const {Router}=require("express");
const router=Router();
const Video=require("../models/videos");


router.get("/registration",(req,res)=>{
    return res.render("registration");
})

router.get("/",async(req,res)=>{
    var user=null
    if(req)
        user=req.session.user;
    const allVideos=await Video.find();
    return res.render("home",{user:user,allVideos:allVideos,err:""});
})

router.post("/search",async(req,res)=>{
    const courseName=req.body;
    console.log(courseName.search_box);
    console.log(req.session.user);
    const allVideos=await Video.find({videoTitle:courseName.search_box});
    if(!allVideos)return res.render("home",{user:req.session.user,err:"video not found"});
    return res.render("home",{user:req.session.user,allVideos:allVideos,err:""});
})

module.exports=router;