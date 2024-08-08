const Video=require("../models/videos");
const mongoose=require("mongoose");
const multer=require('multer');

async function addVideo(req,res){
    const {videoTitle,videoImageUrl}=req.body;
    const imageUrl=`/public/image/${videoImageUrl}`
    Video.create({
        videoTitle,
        videoImageUrl:imageUrl,
    }) 
    return res.redirect("/");
}



module.exports={
    addVideo,
}