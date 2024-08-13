const User=require("../models/student");
const mongoose=require("mongoose");
// const {v4:uuidv4} = require('uuid');
const session=require("express-session")
const {setUser,getUser}=require("../services/auth");

async function userLogin(req,res){
    const {email,password}=req.body;
    const user=await User.findOne({email,password});
    if(!user)
        {
            console.log("invalid credentials");
            return res.render("registration",);
        }
        // const sessionID=uuidv4();
    // setUser(sessionID,student);
    // res.cookie('uid',sessionID);
    req.session.user=user;
    return res.redirect(`/`);
    // const username=`Welcome,${user.name}`;
    
}

async function userSignUp(req,res){
    const adminDomain='@studybuddy';
    const {username,email,password,role}=req.body;

    
    if(role==='admin' && !username.endsWith(adminDomain)){
        console.log("you are not allowed to register as admin");
        const err="you r not allowed to register as admin!!!"
        return res.render("registration",{"err":"you are not allowed to register as admin registeration FAILED"});
    }

    else{
        await User.create({
            username,
            email,
            password,
            role,
        })

    }
    return res.redirect("/registration"); 

}

async function userLogOut(req,res){
    
        
        res.clearCookie('connect.sid'); 
        res.clearCookie('uid');
        return res.redirect("/"); 
    
}


module.exports={
    userLogin,
    userSignUp,
    userLogOut,
}