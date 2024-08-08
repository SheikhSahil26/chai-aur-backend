const {model,Schema}=require("mongoose");


const userSchema=new Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    enrollment:{
        type:Number,
        
    },
    branch:{
        type:String,
        
    },
    semester:{
        type:String,
        
    },
    college:{
        type:String,
        
    },
    profileImageUrl:{
        type:String,
        required:false,
    },
    role:{
        type:String,
        enum:['student','admin'],
        default:'student',
        required:true,
    }


},{timestamps:true});

const user=model('user',userSchema);

module.exports=user;