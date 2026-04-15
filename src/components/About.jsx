import React from 'react'

export default function About() {
  return (
    <div id="about">
        <div  className="mb-8 shrink-0">
          <p className="text-sm text-left tracking-[0.3em] uppercase text-black/40 mb-3">About me</p>
          <p
            className="text-black text-justify leading-relaxed"
            style={{
              fontSize: "clamp(0.75rem, 1.2vw, 0.88rem)",
              letterSpacing: "0.01em",
            }}
          >
          I'm a <span className="text-black font-semibold">frontend-focused design engineer</span> from
           India who loves crafting beautiful things in code.<br></br> I think the best experiences are the ones that feel effortless
           — and I obsess over getting there. <br></br>Currently building, always learning, always shipping.
          </p>
        </div>
    
    </div>
  )
}
