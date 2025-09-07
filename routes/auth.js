import express from "express";
import User from "../models/user.js";
import validateSignUp from "../utills/validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


 const authRouter = express.Router();

   authRouter.post("/signup",async(req,res)=>{
            try{
                  validateSignUp(req);
                  const{emailId, password} = req.body;
                  const passwordHash = await bcrypt.hash(password, 10);
                   
                    const existingUser = await User.findOne({emailId})
                   
                        if (existingUser) {
                return res.status(400).json({ error: "Email already registered" });
                        }
                      
                     const user = new User ({
                          emailId,
                          password: passwordHash
                     });
    
                        const saveUser = await user.save();
                       const token = await jwt.sign({ _id: user._id}, "Monik@2002")

                    res.cookie("token", token);
                          res.json({ message: "User Added Successfully", data: saveUser });
                    }
        
        
            catch(err){
                res.status(400).send("ERROR: " + err.message);
            }     

   } )

  export default authRouter;