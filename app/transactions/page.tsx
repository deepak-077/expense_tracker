"use client"

import { useEffect } from "react";
import { useExpense } from "../hooks/useExpense"


export default function Transactions(){

    const {monthlyExpense, getExpense, loading} = useExpense();

    useEffect(()=>{
        getExpense()
    },[])

    
    return(
        <div className="flex flex-col gap-4 justify-center p-4">
            {/* expenses table */}
            <h2 className="text-3xl p-1.5 bg-red-400 font-semibold text-center rounded-full">Transactions</h2>
            {loading ?(
                <div className="text-center py-10 font-medium text-lg">
                    <p className="animate-pulse ">Loading transactions...</p>
                </div>
            ) :(
                <div className="overflow-x-auto rounded-xl border border-gray-600">
                    <table className="w-full text-center border-collapse bg-gray-600">
                        <thead>
                            <tr className="bg-gray-700 text-lime-300 text-xs border-b border-gray-600">
                                <th className="p-4 font-semibold">Date</th>
                                <th className="p-4 font-semibold">Title</th>
                                <th className="p-4 font-semibold">Category</th>
                                <th className="p-4 font-semibold text-right">Amount</th>

                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-700">
                            {monthlyExpense?.map((item,index)=>{
                        const date= (item.createdAt).split("T")[0]
                        return(

                            <tr key={index} className=" hover:bg-gray-500 group font-semibold text-sm">
                            <td className="text-gray-200 p-5">{date}</td>
                <td className="text-gray-200 p-5">{item.title}</td>
                <td className="text-gray-200">{item.category}</td>
                <td className="text-red-400">-{item.amount}</td>
                        </tr>
                        )
                    })}

                        </tbody>

                    </table>


                    
            </div>
            )}

            {monthlyExpense?.length === 0 && (
                        <div className="text-center p-8 bg-gray-800 text-gray-400 italic">
                            No transactions found.
                        </div>
                    )}
            
        </div>
    )
}