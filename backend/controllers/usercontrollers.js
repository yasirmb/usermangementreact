const express = require('express')
const userSchema = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {

    userSignUp: async (req, res) => {

        try {
            const userDetails = {
                userName: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password
            }

            console.log(userDetails.name);
            const user = await userSchema.findOne({ email: userDetails.email })
            console.log(user, 'user');
            if (!user) {
                console.log(user, 'no-user')
                userDetails.password = await bcrypt.hash(userDetails.password, 10)
                userSchema.create(userDetails).then((newUser) => {

                    const user = {
                        username: newUser.userName,
                        userId: newUser._id,
                        email: newUser.email,
                        phone: newUser.phone
                    }
                    console.log(user, 'userdata after created user');
                    //jwt authentication of user
                    const accessToken = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '1d' })
                    res.json({ user, accessToken: accessToken })

                }).catch((err) => {
                    console.log(err, ':error');
                })
            }
            else {
                console.log('user already existsss');
                res.json({ status: false })
            }


        } catch {
            console.log('error');

        }
    },

    apiVerification: async (req, res) => {
       
       try{
        
        const { token } = req.body;
        console.log(token, 'token issss');
        jwt.verify(token, process.env.SECRET_KEY, async (err, data) => {
            if (err) {
                res.json({
                    status: false
                })

            } else {
                console.log(data, 'data-is');
                const userId = data.userId
                const user = await userSchema.findById({ _id: userId })
                console.log(user, ':useriss');
                if (user) {
                    res.json(user)
                }
                else {
                    res.json({
                        status: false
                    })
                }

            }


        })
    
    
    }catch{
        console.log(err,'err');
    }
       

    },

    verifyUserLogin: async (req, res) => {
        try {
            console.log(req.body, 'loginInfio')
            const user = req.body
            const isUser = await userSchema.findOne({ email: user.email })
            if (isUser) {
                console.log('valid email address');
                console.log(user.password,isUser.password,'passwords');
                const password = await bcrypt.compare(user.password, isUser.password)
                console.log(password, ':password is');
                if (password == false) {
                    console.log('incorrect password');
                    res.json({ status: false, message: 'invalid password' })

                } else {

                    if (isUser.status === false) {
                        res.json({ status: false, message: 'user is blocked' })
                    }
                    else {
                        let userIs = {
                            username: isUser.userName,
                            userId: isUser._id,
                            email: isUser.email,
                            phone: isUser.phone
                        }
                        console.log(userIs, 'user is');
                        //jwt authentication of user---------------------------
                        const accessToken = jwt.sign(userIs, process.env.SECRET_KEY, { expiresIn: '1d' })
                        res.json({ userIs, accessToken: accessToken })
                    }
                }
            } else {
                res.json({ status: false, message: 'invalid email address' })
            }

        }
        catch {
            console.log(err, 'error');
        }
    },

    profileUpload:async(req,res)=>{
      try{
          const userId=req.body.userId
          const url=req.body.url
          console.log(userId,url,'useriddd');
          const user = await userSchema.findByIdAndUpdate(userId, { image: url }, { new: true });
          console.log(user,'userrrr')
           if(user){
            console.log('success');
            res.json(user)
           }else{
            console.log('false');
            res.json({status:false})
           }

        } catch{
        console.log(err);
      }

        
    }


}





