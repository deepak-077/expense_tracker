"use client"
import { useCallback, useState } from "react";
import axios from "axios";


export function useExpense(){

    const [monthlyExpense,setMonthlyExpense]=useState<any[]>([])
    const [loading, setLoading] = useState(false);

    const getExpense= useCallback(async()=>{
        const token=localStorage.getItem("token");
        if(!token){
            return;
        }

        setLoading(true);
        try{
            const exp= await axios.get("http://localhost:3001/expense",{
                headers:{Authorization:`Bearer ${token}`}
            })
            setMonthlyExpense(exp.data)
        }
        catch(error){
            console.log(error,"failed to get expense")
        }
        finally{
            setLoading(false);
        }
    },[])

    return {monthlyExpense,getExpense,loading}

}