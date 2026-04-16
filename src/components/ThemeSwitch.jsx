import React from 'react'
import { Moon , Sun} from "lucide-react";
import { useState } from 'react';

export default function ThemeSwitch() {
  const [active, setActive] = useState(false)

const handleBtn = () => {
  setActive((prev) => !prev)
    const currentTheme = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute(
        "data-theme",
        currentTheme == "dark" ? "light" : "dark"
        
    )
    
    console.log(active, "this is for the togggle")
    console.log(currentTheme)
}


  return (
    <div>
 <div className="flex flex-row gap-5">
   
            <button onClick={handleBtn} id="button">{active ? <Moon/> : <Sun/>}</button>
          </div>
    </div>
  )
}
