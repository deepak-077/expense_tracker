"use client"

import { useEffect } from "react";
import { useExpense } from "../hooks/useExpense"


export default function Transactions(){

    const {monthlyExpense, getExpense, loading} = useExpense();

    useEffect(()=>{
        getExpense()
    },[])

    
    return(
        <div>
            {/* expenses table */}
            <h2>Transactions</h2>
            {loading ?<p>Loading...</p> :(
                <div>
                    {monthlyExpense?.map((item,index)=>{
                        const date= (item.createdAt).split("T")[0]
                        return(
                            <div className="flex gap-4">
                            <p>{date}</p>
                <p>{item.title}</p>
                <p>{item.category}</p>
                <p>{item.amount}</p>
                        </div>
                        )
                    })}
            </div>
            )}
            
        </div>
    )
}