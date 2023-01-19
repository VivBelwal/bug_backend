const express = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const SignupRoute = express.Router();
const Auth = require("../models/signup.model");
SignupRoute.use(express.json());
SignupRoute.post("/", async (req,res) =>{
    const {email,password} = req.body;
    const check = await Auth.findOne({email});
    if(email === "" && password === ""){
        return res.json({ message : "Please enter your Credentials"});

    } 
    if(check){
        return res.json({
            status : "failed",
            message : "User already exists !!",
        })
    }
    // bcrypt.hash(password, saltRounds, function(err, hash) {
    //     console.log(password)
    // });
   
    const newUser = await Auth.create({
        email,
        password
    })
    
    return res.status(201).json({status : 'success', message :  "New User Signedup"})

})

module.exports = SignupRoute;