const express=require('express')
const adminSchema =require('../model/adminModel')
const userSchema= require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports={
    adminLoginVerification:async(req,res)=>{
    
    try {
        console.log(req.body, 'loginInfio')
        const admin = req.body
        const isAdmin = await adminSchema.findOne({ email: admin.email })
        if (isAdmin) {
            console.log('valid email address');
            const password = await bcrypt.compare(admin.password, isAdmin.password)
            console.log(password, ':password is');
            if (password == false) {
                console.log('incorrect password');
                res.json({status:false,message:'invalid password'}) 

            } else {
                        let adminIs = {
                        email: isAdmin.email,
                        id: isAdmin._id,
                       
                    }
                    console.log(adminIs, 'admin is');
                    //jwt authentication for admin-----------------
                   const accessToken=jwt.sign(adminIs,process.env.SECRET_KEY,{expiresIn: '1d'})
                    res.json({adminIs,accessToken:accessToken})
                }
            
        } else {
           console.log('in valid email');
           res.json({status:false,message:'invalid email address'})
        }

    }
    catch {
        console.log(err, 'error');
    }
 },
 
 getAllUsers: async(req,res) =>{
      try{
const users= await userSchema.find({})
console.log(users);
res.json(users)
}catch(err){
        console.log('err',err);
        res.status(500)
      }
 },

 deleteUser: async(req,res)=>{
try{ 
   console.log(req.query.id,'userid isss');
   const userId=req.query.id
  let isDelete=await userSchema.findByIdAndDelete(userId)
   console.log(isDelete);
   if(isDelete){
    res.json({status:true})
   }else{
    res.json({status:false})
   }
}catch(err){
       console.log(err,'errr');
    }
 },
 editUserProfile:async(req,res)=>{
    console.log(req?.body,'edit infoooooo')
   try{
     const editInfo=req?.body
     const userId=editInfo.userId

    const user=await userSchema.findByIdAndUpdate(userId,{userName:editInfo.name,email:editInfo.email,phone:editInfo.phone})
    console.log(user,'userisss')
    if(user){
        res.json({status:true})
    }else{
        res.json({status:false})
    }

}catch(err){
       console.log(err,'errorr');  
   }
 },

 changeUserStatus:async(req,res)=>{
    try{
     console.log(req.query.id,'user id is')
    const userId=req.query.id
     const user=await userSchema.findById(userId);
     const status=user.status;
     const userStatus=await userSchema.findByIdAndUpdate(userId,{status:!status});
     res.json({userStatus})
    }catch{

    }
 }


}








