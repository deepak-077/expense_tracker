"use client"
import { useState } from "react"

export default function Signin(){
    const [user,setUser] = useState({
        email:"",
        password:""
    })
    
    function handleChange(e){
        const name=e.target.name;
        setUser((prev)=>({...prev,[name]:e.target.value}))
        
    }
    function handleSubmit(){
        
        console.log(user.email);
        console.log(user.password);
    }

    
    return(
        <div className="flex flex-col p-5 justify-center items-center gap-3 h-screen">
            <input className="p-2 w-100 rounded-3xl border" type="text" placeholder="Email " name="email"  value={user.email} onChange={handleChange}/>
            <input className="p-2 w-100 rounded-3xl border" type="password" placeholder="Password " name="password" value={user.password} onChange={handleChange}/>
            <button className="p-2 w-100 rounded-3xl bg-lime-400 font-semibold" onClick={handleSubmit}>Signup</button>

        </div>
    )
}