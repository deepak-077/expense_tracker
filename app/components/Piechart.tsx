"use client"
import React from "react"
import { PieChart, Pie, Legend, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { PieShape } from "recharts"


interface ExpenseCharts{
    monthlyExpense:any[];
}

const COLORS = ['#A3E635', '#FB923C', '#60A5FA', '#F472B6', '#38BDF8', '#FBBF24', '#C084FC'];

export default function Piechart({monthlyExpense}:ExpenseCharts){
    const categoryData = monthlyExpense.reduce((acc:any[],item)=>{
        const category = item.category || "EXTRA";
        const amount = item.amount || 0;

        const existing = acc.find(c=>c.name ===category);
        if(existing){
            existing.value +=amount; 
        }
        else{
            acc.push({name:category, value:amount});
        }
        return acc;
    },[])
    return(

        <div className="flex flex-col lg:flex-row gap-8 w-full justify-center items-center mt-6">
      
      
      <div className="bg-gray-800 border border-gray-700 p-6 rounded-3xl w-full lg:w-[450px] h-[350px] flex flex-col shadow-xl">
        <h3 className="text-lime-300 font-bold mb-2 text-lg">Spending by Category</h3>
        
        {categoryData.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-gray-400 italic text-sm">No data available</div>
        ) : (
          <div className="flex-1 w-full h-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '12px', color: '#fff' }}
                  formatter={(value) => [` ₹${parseFloat(value as string).toFixed(2)}`, 'Total spent']}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

        </div>
        
    )

}