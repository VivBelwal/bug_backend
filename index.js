const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const PORT = process.env.PORT || 8080;

const app = express();

const SignupRoute = require("./src/routes/signup.route")
const LoginRoute = require("./src/routes/login.route")
app.use(express.json());
app.use(cors());
const connect = require("./src/config/db");

app.use("/signup", SignupRoute);
app.use("/login", LoginRoute);




app.listen(PORT, async () =>{

    try{
         await connect ();
         console.log('listening...')
    } catch(err){
        console.log(err);
    }
})