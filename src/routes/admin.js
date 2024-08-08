const {Router}=require("express");

const router=Router();
const {addVideo}=require("../controllers/admin");
const path=require("path");
const multer=require("multer");
const fs=require("fs");


const uploadDir= path.join(__dirname,"..",'public','image');

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        const uploadPath = path.join(uploadDir,'./');
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename:function(req,file,cb){
        return cb(null,Date.now()+"-"+file.originalname);
    }
})
const upload=multer({storage});

router.get("/",(req,res)=>{
    return res.render("admin");
})

router.post("/addvideo",upload.single('videoImageUrl'),addVideo);

module.exports=router;