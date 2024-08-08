const {model,Schema}=require("mongoose");

const videoSchema=new Schema({
    videoTitle:{
        type:String,
        required:true,
    },
    videoImageUrl:{
        type:String,
        required:false,
    }
    
},{timestamps:true});


const video=model('video',videoSchema);

module.exports=video;