import { Router } from "express";
import {userModel} from "../models/userModel.js";


const router = Router()

router.post("/login", async (req,res) =>{
    const{email, password} = req.body    
    
    try{
        const user = await userModel.findOne({email,password})        
        if(user == null) return res.status(404).redirect("/login")
        user["password"] = undefined
        req.session.user = user

        res.status(200).redirect("/")
    }
    catch(error){
        res.status(500).json({mesagge:error.mesagge})

    }
})

router.post("/register", async (req,res)=>{
    const{first_name, last_name,email,age,password,role}=req.body
    if(!first_name|| !last_name|| !email|| !age|| !password) return res.status(404).json({mesagge:"Missing required fields"})
    try{
        const user = await userModel.create({first_name, last_name,email,age,password,role})
        res.status(201).redirect("/login")
    }
    catch(error){
        res.status(500).json({mesagge:error.mesagge})
    }
})

router.get("/logout", async (req,res)=>{
req.session.destroy()
res.redirect("/login")
})


export default router
