
import { Bell } from "lucide-react"
import { Copy } from "lucide-react"
import { useState } from "react"
import MiniCard from './MiniCard'
import {motion} from "motion/react"
import Customize from "./Customize"


export default function Card() {
  const [active , setActive] = useState(true);
  const [custom , setCustom] = useState(false)
   const [selectedColor, setSelectedColor] = useState("bg-pink-700");
   const [text, setText] = useState("")

    const handleActive = () => {
    setActive((prev) => !prev)
    console.log(`active is ${active}`)
  }

const handleSave = () => {
  setCustom(false)
  setActive(true)
}
const handleCustom = () => {
  setCustom((prev) => !prev)
}
  return (
    <main className="min-h-screen py-20 px-4 max-w-7xl mx-auto bg-[#f8f8f8aa] flex flex-col justify-center items-center  gap-10">
      {active ? 
      <MiniCard onBtnClick={handleActive} selectedColor={selectedColor} setSelectedColor={setSelectedColor} setText={setText}  text={text}/> 
          :
        <>
                  <motion.div 
          layout
          className= {` p-6 rounded-xl flex flex-col justify-between ${selectedColor} w-96 h-60  flex  flex-col gap-10 `}>
          <div className="flex flex-col justify-between w-full h-full">
              <div className="flex flex-row  justify-between">
                <div><Bell className=""/></div>
                <div className="flex flex-row gap-5">Copy Address <Copy className=" cursor-pointer"/></div> 
          {/* copied address when i click on it mabey i can like turn it back to flip it */}
              </div>
        
          <div className="flex flex-row  justify-between">
             <div className="flex flex-col text-nowrap ">
              <span>
                {custom ? 
                <input 
                value={text}
                onChange={(e) => setText(e.target.value)}
              className="bg-transparent text-white outline-1 w-32 " placeholder="Wallet Name"/> : text}</span>
              <span>50,60,000</span>
              </div>
             {/* <button className="w-36 h-10 bg-teal-100 text-black cursor-pointer rounded-3xl">Edit Nickname</button> */}
                 <button className="w-36 h-10  bg-[#ffffff51] text-black cursor-pointer rounded-3xl " 
               onClick={handleCustom} >{custom ? "Edit name" : "Customize"}
               </button>
             
          </div>
        </div>
      </motion.div> 
        <div>  
          {custom  && 
        <Customize selectedColor={selectedColor} setSelectedColor={setSelectedColor} onBtnClick={handleSave}/>
       }</div>
        </>
       
     
     
     
       }
        
  
    
    </main>
  )
}
