"use client"
import axios from "axios";

import { useEffect, useRef, useState } from "react"

const money=[
  {
    title:"Total Balance",
    amount :11150
  },
  {
    title:"Monthly Income",
    amount :12000
  },
  {
    title:"Monthly Expense",
    amount :850
  },
  {
    title:"Savings Rate",
    amount :"92%"
  },
]

export default function Dashboard(){
  const [open, setOpen]=useState(false);
  const [user,setUser]=useState({
    firstname:"",
    email:""
  });

  const [expense,setExpense]=useState({
    title:"",
    amount:"",
    category:""
  })

  const [income,setIncome]= useState<any>(0)
  //interesting fact - input type=number - browser returns value as string 
  const [editIncome,setEditIncome] = useState(false)

  useEffect(()=>{
    getIncome()
  },[])  

  async function getIncome(){
    const token = localStorage.getItem("token")
    try{
      const earnings = await axios.get("http://localhost:3001/income",{
        headers: {Authorization:`Bearer ${token}`}
      })
      const parsedEarning=parseFloat(earnings.data.income)
      setIncome(parsedEarning)
    
    }
    catch(error){
      console.log(error, "failed to get income")
    }
  }


  useEffect(()=>{
    const profileString=localStorage.getItem("user")

    if(profileString){
      try{
        const profile= JSON.parse(profileString)
        setUser({
          firstname: profile.firstname ||"",
          email :profile.email || ""
        });
      }
      catch(e){
        console.log(e)
      }
    }
  },[])

  function handleChange(e){
    const name=e.target.name
    setExpense((prev)=>({...prev,[name]:e.target.value}))
    // console.log(expense.amount)
  }

  

  async function updateIncome(){
    try{
      const parsedIncome= parseFloat(income);
      if(isNaN(parsedIncome)) return alert ("please enter a valid numeric amount")
      
      const updIncome= await axios.put("http://localhost:3001/income",{income:parsedIncome,email:user.email})
      if(updIncome.status===201){
        alert("Income Updated")
        setEditIncome(false)
      }
    }
    catch(error){
      console.log(error, "failed to Update Income")
    }
  }

  async function addExpense(){
    try{
      const token = localStorage.getItem("token");

      const exp= await axios.post("http://localhost:3001/expense",expense,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      if(exp.status===201){
        alert("expense added");
        setOpen(false);
        setExpense({title:"",amount:"",category:""});
      }
    }
    catch(error){
      console.log("failed to add Expense",error)
    }
  }


  function handleToggle(){
    
    setOpen((prev)=>!prev)
  }

    return(
        <div className="flex justify-center h-screen bg-[#3a3f42] text-white ">
      {/* sidebar */}
      <div className="flex flex-col bg-lime-200 w-[250px] text-black font-semibold text-2xl gap-5 p-5">
        {/* user info */}
        <div className="flex flex-col ">
          <img src="" alt="dp"/>
          <p>hi {user.firstname}</p>

        </div>

        <div className="flex flex-col gap-3">
          <button> Dashboard </button>
          <button> Budget </button>
          <button> Transactions </button>
          <button> Reports </button>
          <button> Saving </button>
        </div>

      </div>

      {/* expense */}
      <div className="flex items-center flex-col bg-gray-400 w-full gap-5 p-5">
        {/* cards */}
        <div className="flex gap-5 items-center">
          {money.map((item,index)=>(
            <div className="flex flex-col font-semibold p-7 shadow-2xl rounded-3xl border-2 w-auto  ">
              <p >{item.title}</p>
              <p className="text-3xl">{item.title==="Monthly Income"?income :item.amount}</p>
              
    
              {/* edit button for Income */}
              {item.title==="Monthly Income" && (
                <div className="flex gap-1 bg-rose-400 rounded-2xl p-1.5">
                  <button onClick={()=>{
                    setEditIncome((prev)=>!prev)
                  }}>
                    <img className="size-7" src="edit.png" alt="" />
                  </button>
                  
                  <input type="number" placeholder="Update Income" name="income" value={income} disabled={!editIncome} onChange={(e)=>{setIncome((e.target.value))
                  }}/>

                  {editIncome && (
      <button 
        onClick={updateIncome} 
        className="text-xs font-bold bg-lime-400 text-black px-2 py-1 rounded-xl self-end hover:bg-lime-500 transition-all"
      >
        Save Changes
      </button>
    )}
                </div>
              )}
            </div>
          ))}

          <div className="relative">
            <div>
              <button className="p-3 bg-red-400 rounded-full" onClick={handleToggle}> Add Expense +</button>
            </div>
            
            {/* dropdown */}
            <div className={` flex flex-col  justify-center items-center gap-3 bg-[#fcf5eb] text-black absolute size-100 ${open? "opacity-100 transition-all translate-y-20 " : "opacity-0 transition-all translate-y-0"}`} >
            
            <input className="p-2 w-100 rounded-3xl border border-black " type="text" placeholder="Title " name="title" value={expense.title} onChange={handleChange}/>
            <input className="p-2 w-100 rounded-3xl border border-black" type="text" placeholder="Amount" name="amount" value={expense.amount} onChange={handleChange}/>
            
            <select 
  className="p-2 w-full rounded-3xl border border-black text-black bg-white" 
  name="category" 
  value={expense.category} 
  onChange={handleChange}
>
  <option value="">Select Category</option>
  <option value="GROCERY">Grocery</option>
  <option value="FOOD">Food</option>
  <option value="FUEL">Fuel</option>
  <option value="EXTRA">Rent</option>
  <option value="FUEL">Travel</option>
  <option value="EXTRA">Entertainment</option>

  <option value="EXTRA">Extra</option>
</select>
            <button className="p-2 w-100 rounded-3xl bg-lime-400 font-semibold" onClick={addExpense}>Add expense</button>

            </div>
          </div>

        </div>


        <div className="flex gap-10">
          {/* Spending by category */}
          <div className="bg-amber-400 size-100">

          </div>

          {/* Monthly Overview */}
          <div className="bg-blue-400 size-100">

          </div>

        </div>

      </div>

    </div>
    )
}