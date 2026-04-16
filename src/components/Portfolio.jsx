import { useState, useEffect } from "react";

import About from "./About";
import Projects from "./Card";
import Footer from "./Footer";

import ThemeSwitch from "./ThemeSwitch";



// const fadeUp = (visible, delay = 0) => ({
//   opacity: visible ? 1 : 0,
//   transform: visible ? "translateY(0px)" : "translateY(22px)",
//   transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
// });

export default function Portfolio() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="h-auto max-w-4xl mx-auto  flex justify-center px-8 py-6 overflow-visible back"
     
    >
      <div className="w-full max-w-6xl flex flex-col h-full">

        {/* Top bar */}
        <div
          // style={fadeUp(visible, 0)}
          className="flex items-center justify-between py-5 border-b  shrink-0"
        >
          <span className="text-xs tracking-[0.25em] uppercas">Portfolio</span>
          <span className="text-xs tracking-[0.25em] uppercase">2026</span>
         <div>
          <ThemeSwitch/>
         </div>
         
        </div>

        {/* Name */}
        <div  className="mt-10 mb-6 shrink-0  " id="intro">
          <div
            className="text-left leading-tight flex flex-col  ">
            <div className="flex items-center gap-2">
            <span className="text-xl font-medium">Harleen Kaur Kukreja</span>
          </div>
            {/* <p className="text-sm mt-1 flex items-center">Design Engineer</p> */}
          </div>
        </div>

        {/* About */}
       
        <About visible={visible}/>
        <Projects/>
        <Footer/>
         {/* <Spotlight/> */}
      </div>
    </div>
  );
}