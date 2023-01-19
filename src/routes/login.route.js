const express = require('express');
require("dotenv").config();
const LoginRoute = express.Router();

const jwt = require("jsonwebtoken");

const Auth = require("../models/signup.model");

LoginRoute.use(express.json());

LoginRoute.post("/", async (req,res) =>{
    const {email,password} = req.body;

    try{
        const user = await Auth.findOne({email});
        if(!user){
            return res.status(401).send({message : "User not found", status:"failed"})
        } else {
            if(password !==user.password){
                return res.status(401).send({message : "Unauthorized", status:"failed"});
            }else{
                const token = jwt.sign({
                    id : user._id,
                    email 
                },
                process.env.token_password,
                {expiresIn : "3days"})
              return  res.status(201).json({token,message : "Login Successful", status : "success"})
            }
        }
    } catch(err){
        console.log(err);
    }
})

module.exports = LoginRoute;