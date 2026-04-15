import React, { useEffect, useState } from "react";
import { contents } from "./Elements";
export default function Spotlight() {
  const [step, setStep] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const elementId = contents[step].target; // need to do related to when targetid
   if(!elementId) return ;
    const elements = document.querySelector(elementId);
    const spotlightElement = elements.getBoundingClientRect();
    setPosition(spotlightElement);
  }, [step]);

  const handleNext = () => {
    setStep((prev) => prev + 1);
    console.log(step);
  };
  const spotlightStyle = {
    borderStyle: "solid",
    borderWidth: "0.05rem",

    backgroundColor: "orange ",
    opacity:"0.5",
    boxShadow: "0 0 0 9999px rgba(0,0,0,0.95)",
    position: "absolute",
    top: position.top,
    bottom: position.bottom,
    width: position.width,
    height: position.height,
  zIndex: "9999px"
  };


  return(
    <div >
    
     <div style={spotlightStyle} onClick={handleNext}/> 
    </div>
 
 
         
          
  
  
     
    
   
  )

  
}
