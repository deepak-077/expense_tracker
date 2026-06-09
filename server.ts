import { PrismaClient,Category } from "@prisma/client";
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
                
            return res.status(200).json({msg:"logged in successfully",token,user:{ firstname:existingUser.firstname, email:existingUser.email }})
            }
            return res.status(401).json({msg:"incorrect password"})
        }
    }
    catch(error){
        return res.status(400).json({error: "failed to signin"})
    }
})

// for updating income
app.put("/income",async (req,res)=>{
    const {email,income}=req.body
    try{
        const upd=await prisma.user.update({
            where:{
                email:email
            },
            data:{
                income:income
            }
        })
        console.log("Income Updated successfully")
        res.status(201).json({msg:"Income updated"})
    }
    catch(error){
        console.log(error)
        res.status(400).json({msg:"failed to update income"})
    }
})

// to render user income on front end
app.get("/income", authenticationToken, async(req,res)=>{
    const userEmail= req.user.email
    try{
        
        const user= await prisma.user.findUnique({
        where:{email:userEmail},
        select:{income:true}
        
    })
    res.json({income:user?.income || 0 })

    }
    catch(error){
        console.log(error, "failed to get user's income")
    }
    
})

app.get("/expense",authenticationToken,async (req,res)=>{
    const userEmail = req.user.email;

    try{
        const exp= await prisma.expense.findMany({
            where:{
                user:{email:userEmail}
            },
            orderBy:{
                createdAt:"desc"
            }
        })
        res.status(200).json(exp)

    }
    catch(error){
        console.log(error)
        res.status(500).json({msg:"failed to get expenses"})
    }

})


app.post("/expense", authenticationToken, async(req,res)=>{

    const {title,category,amount}=req.body
    const parsedAmount =parseFloat(amount);

    console.log("📊 Parsed Values -> Title:", title, " | Category:", category, " | Amount:", parsedAmount);

    if (!category || !title || isNaN(parsedAmount)) {
        console.log("Failed the initial validation !");

        return res.status(400).json({ error: "Missing title, category, or valid amount" });
    }

    const userEmail=req.user.email
    try{
        const user=await prisma.user.findUnique({
            where:{email:userEmail}
        });
        if(!user){
            return res.status(404).json({error:"User not found"});
            
        }
        const normalizedCategory = category.toUpperCase().trim();
        const databaseCategory = normalizedCategory as Category

        //create an expense
        const exp=await prisma.expense.create({
            data:{
                title:title,
                category:databaseCategory,
                amount:parsedAmount,
                userId:user.id
            }
        })
        return res.status(201).json({ msg:"Expense added successfully", expense:exp})
    }
    catch(error){
        console.log("❌ Prisma Database Insert Failed. Error Details:");
        console.log(error)
        return res.status(400).json({error:"failed to add expense"})

    }
})

app.listen(3001,()=>{
    console.log("server started at 3001");
})