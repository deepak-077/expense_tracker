"use client"

import { useEffect } from "react";
import Piechart from "../components/Piechart";
import { useExpense } from "../hooks/useExpense";

export default function Reports(){
    const {monthlyExpense,getExpense} = useExpense()
    
    useEffect(()=>{
        getExpense()
    },[])

    return(
        <div>
            <Piechart monthlyExpense={monthlyExpense}></Piechart>
        </div>
    )
}