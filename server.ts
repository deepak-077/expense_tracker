import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken"

const JWT_SECRET = "secret"


const app=express();
app.use(express.json())
app.use(cors())
const prisma = new PrismaClient()


const authenticationToken= (req,res,next) =>{
    const authHeader = req.headers["authorization"];

    const token=authHeader && authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({error:"Access denied. No token Provided"});
    }
    try{
        const decoded =jwt.verify(token,JWT_SECRET);
        req.user=decoded
        next()
    }
    catch(error){
        return res.status(403).json({error:"Invalid token"})
    }
}

app.post("/signup",async(req,res)=>{
    const {firstname,lastname,email,password}=req.body
    try{
        const user=await prisma.user.create({
            data:{
                firstname:firstname,
                lastname:lastname,
                email:email,
                password:password
            }
        })
        res.status(200).json({msg:"user created successfully"})

    }
    catch(error){
        res.status(400).json({error:"failed to create user"})
    }
})

app.post("/signin",async (req,res)=>{
    const {email,password}=req.body
    try{
        const existingUser = await prisma.user.findUnique({
            where:{email}
        })

        if(!existingUser){
            return res.status(404).json({msg:"user not found"})
        }
        if(existingUser){
            if(existingUser.password===password){
                const token= jwt.sign({
                    email:existingUser.email
                    
                },JWT_SECRET,{
                    expiresIn:"1h"
                })
                
            return res.status(200).json({msg:"logged in successfully",token,user:{ firstname:existingUser.firstname }})
            }
            return res.status(401).json({msg:"incorrect password"})
        }
    }
    catch(error){
        return res.status(400).json({error: "failed to signin"})
    }
})

app.post("/expense", authenticationToken, async(req,res)=>{
    const {title,category,amount}=req.body
    const parsedAmount =parseFloat(amount);

    const userEmail=req.user.email
    try{
        
        const user=await prisma.user.findUnique({
            where:{email:userEmail}
        });
        if(!user){
            return res.status(404).json({error:"User not found"});
            
        }
        const normalizedCategory = category.toUpperCase().trim();

        //create an expense
        const exp=await prisma.expense.create({
            data:{
                title:title,
                category:normalizedCategory,
                amount:parsedAmount,
                userId:user.id
            }
        })
        return res.status(201).json({ msg:"Expense added successfully", expense:exp})
    }
    catch(error){
        return res.status(400).json({error:"failed to add expense"})

    }
})

app.listen(3001,()=>{
    console.log("server started at 3001");
})