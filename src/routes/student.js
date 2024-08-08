const {Router}=require("express");
const router=Router();
const path=require("path");
const {userLogin,userLogOut,userSignUp}=require("../controllers/student");
const multer=require("multer");

const uploadDir=process.env.uploadDir || path.join(__dirname,"..",'public','image');

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

router.post("/login",userLogin);

router.post("/signup",userSignUp);

router.get("/logout",userLogOut);


module.exports=router;