"use client"
import axios from "axios";
import { useState } from "react"
import { useRouter } from "next/navigation";

export default function Signup(){
    const router =useRouter();
    const [user,setUser] = useState({
        firstname:"",
        lastname:"",
        email:"",
        password:""
    })
    
    function handleChange(e){
        const name=e.target.name;
        setUser((prev)=>({...prev,[name]:e.target.value}))
        
    }
    async function handleSubmit(){
        try{
            const response = await axios.post("http://localhost:3001/signup",user)
            if(response.status===200){
                alert("Signup successful")
                router.push("/signin");
            }

        }
        catch(error){
            console.log("failed to create user",error)
        }
    }

    
    return(
        <div className="flex flex-col p-5 justify-center items-center gap-3 h-screen">
            <input className="p-2 w-100 rounded-3xl border" type="text" placeholder="First Name" name="firstname" value={user.firstname} onChange={handleChange}/>
            <input className="p-2 w-100 rounded-3xl border" type="text" placeholder="Last Name" name="lastname" value={user.lastname} onChange={handleChange}/>
            <input className="p-2 w-100 rounded-3xl border" type="text" placeholder="Email " name="email"  value={user.email} onChange={handleChange}/>
            <input className="p-2 w-100 rounded-3xl border" type="password" placeholder="Password " name="password" value={user.password} onChange={handleChange}/>
            <button className="p-2 w-100 rounded-3xl bg-lime-400 font-semibold" onClick={handleSubmit}>Signup</button>

        </div>
    )
}