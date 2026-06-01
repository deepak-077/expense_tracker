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
    return(
        <div className="flex justify-center h-screen bg-[#3a3f42] text-white ">
      {/* sidebar */}
      <div className="flex flex-col bg-lime-200 w-[250px] text-black font-semibold text-2xl gap-5 p-5">
        {/* user info */}
        <div className="flex flex-col ">
          <img src="" alt="dp"/>
          <p>hi name</p>

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
        <div className="flex gap-5 ">
          {money.map((item,index)=>(
            <div className="flex flex-col font-semibold p-7 shadow-2xl rounded-3xl border-2 w-auto">
              <p >{item.title}</p>
              <p className="text-3xl">{item.amount}</p>
            </div>
          ))}
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