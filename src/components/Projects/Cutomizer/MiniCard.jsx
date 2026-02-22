
import { Bell } from "lucide-react"
import { Copy } from "lucide-react"
import { Ellipsis } from "lucide-react"
import {motion} from "motion/react"

export default function MiniCard({onBtnClick , selectedColor, setText, text }) {
 
  return (
    <main className="min-h-screen py-20 px-4 max-w-7xl mx-auto flex justify-center items-center flex-col gap-10">
      <motion.div 
      layout
      className=' w-72 h-52  flex '>
        <div className={`p-6 w-full rounded-xl flex flex-col justify-between cursor-pointer ${selectedColor}`} onClick={onBtnClick}>
          <div className="flex flex-row  justify-between">
            <div><Bell className=""/></div>
          <div className="flex flex-row gap-5 "  ><Ellipsis className="cursor-pointer"/></div> 
          {/* copied address when i click on it mabey i can like turn it back to flip it */}
          </div>
          <div className="flex flex-row  gap-10">
             <div className="flex flex-col text-nowrap ">
              <span>
                {text.length !== 0 ? text : "Harleen kaur"}
              </span>
              <span>
                50,60,000
              </span>
              </div>
          </div>
        </div>
      </motion.div>
    </main>
  )
}
