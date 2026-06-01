"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";



export default function Home() {
  const router =useRouter()


  return (
    <div className="flex flex-col items-center w-full h-screen p-5 ">
      <nav className="flex justify-between w-full px-30 items-center">
        <div>
          <img className="w-[150px] h-15" src="logo.png" alt="" />
        </div>

        <div className="flex gap-5 p-5">
          <button className="hover:bg-amber-400 p-3 rounded-4xl" onClick={()=>{
            router.push("/signup")
          }}>Signup</button>
          <button className="hover:bg-lime-400 p-3 rounded-4xl" onClick={()=>{
            router.push("/signin")
          }}>Login</button>
        </div>
      </nav>

      <div className="flex justify-center items-center">
        <div className="text-[40px]">
        <p>The only app that <br/><b>gets your money into shape</b> </p>

      </div>

      <div>
        <img className="h-175" src="pic.png" alt="" />
      </div>

      </div>
      
      
    </div>
    
  );
}
