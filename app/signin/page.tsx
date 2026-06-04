"use client"
import axios from "axios";
import { useState } from "react"
import { useRouter } from "next/navigation";

export default function Signin(){
    const router =useRouter();

    const [credentials,setCredentials] = useState({
        email:"",
        password:""
    })
    
    function handleChange(e){
        const name=e.target.name;
        setCredentials((prev)=>({...prev,[name]:e.target.value}))
        
    }
    async function handleSubmit(){
        try{
            const response = await axios.post("http://localhost:3001/signin",credentials)
            if(response.status===200){
                localStorage.setItem("token",response.data.token)
                localStorage.setItem("name",response.data.user.firstname)
                alert("signin successfull")
                console.log("token = ", response.data.token);
                console.log("username = ", response.data.user.firstname);

                router.push("/dashboard")
            }
        }
        catch(error){
            console.log("failed to login",error)
        }
    }

    return(
        <div className="flex flex-col p-5 justify-center items-center gap-3 h-screen">
            <input className="p-2 w-100 rounded-3xl border" type="text" placeholder="Email " name="email"  value={credentials.email} onChange={handleChange}/>
            <input className="p-2 w-100 rounded-3xl border" type="password" placeholder="Password " name="password" value={credentials.password} onChange={handleChange}/>
            <button className="p-2 w-100 rounded-3xl bg-lime-400 font-semibold" onClick={handleSubmit}>Signup</button>

        </div>
    )
}