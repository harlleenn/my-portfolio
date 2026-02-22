import React from 'react'
import Modal from './Modal';
import { useState } from "react";

export default function Projects() {

       const projects = [
          {
            title: "Neural Interface",
            year: "2026",
            tag: "Research",
            desc: "Exploring human-computer interaction through adaptive neural feedback systems.",
          },
          {
            title: "Gradient OS",
            year: "2026",
            tag: "Design Systems",
            desc: "A unified design language built around perceptual color mathematics.",
          },
       
        ];
    const [activeProject, setActiveProject] = useState(null);

    
  return (
    <div>
              <div  className="flex flex-col flex-1 min-h-0">
          <p className="text-sm tracking-[0.3em] uppercase text-left text-black/40 mb-4 shrink-0">Projects</p>

          <style>{`
            .card {
              position: relative;
              border-radius: 12px;
              overflow: hidden;
              cursor: pointer;
              flex: 1;
            }

            /* noise texture via SVG data URI */
            .card::before {
              content: '';
              position: absolute;
              inset: 0;
              border-radius: 12px;
              background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E");
              background-size: 180px 180px;
              pointer-events: none;
              z-index: 1;
              opacity: 0.55;
            }

            .card-inner {
              position: relative;
              z-index: 2;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              padding: 16px;
            }

            /* slide-up "See Live" pill */
            .card-cta {
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              z-index: 3;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 6px;
              padding: 10px;
              border-radius: 0 0 12px 12px;
              transform: translateY(100%);
              opacity: 0;
              transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease;
              font-size: 0.65rem;
              letter-spacing: 0.15em;
              text-transform: uppercase;
              font-family: 'DM Mono', monospace;
            }

            .card:hover .card-cta {
              transform: translateY(0%);
              opacity: 1;
            }
               .card-red {
              background: linear-gradient(135deg, #f8fafc, #a5b4fc, #059669, #f8fafc);
              background-size: 300% 300%;
              animation: gradShift 10s ease infinite;
            }
            .card-red .card-cta { background: rgba(0,0,0,0.28); color: #fff; }
            .card-red .card-tag { color: rgba(255,255,255,0.7); }
            .card-red .card-year { color: rgba(255,255,255,0.65); }
            .card-red .card-title { color: #fff; }
            .card-red .card-desc { color: rgba(255,255,255,0.7); }

            @keyframes gradShift {
              0%   { background-position: 0% 30%; }
              50%  { background-position: 90% 50%; }
              100% { background-position: 0% 20%; }
            }
            .card-gradient {
              background: linear-gradient(135deg, #f59e0b, #dc2626, #eab308, #f59e0b);
              background-size: 300% 300%;
              animation: gradShift 10s ease infinite;
            }
            .card-gradient .card-cta { background: rgba(0,0,0,0.28); color: #fff; }
            .card-gradient .card-tag { color: rgba(255,255,255,0.7); }
            .card-gradient .card-year { color: rgba(255,255,255,0.65); }
            .card-gradient .card-title { color: #fff; }
            .card-gradient .card-desc { color: rgba(255,255,255,0.7); }

            @keyframes gradShift {
              0%   { background-position: 0% 30%; }
              50%  { background-position: 90% 50%; }
              100% { background-position: 0% 10%; }
            }
          `}</style>

          <div className="grid  lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-3 flex-1 min-h-72 max-h-56">
            {projects.map((p, i) => {
              const themes = ["card-red", "card-gradient"];
              const theme = themes[i % themes.length];
              return (
                <div key={i} className={`card ${theme}`}
                onClick={() => setActiveProject(p)}>
                  <div className="card-inner">
                    {/* top: tag + year */}
                    <div className="flex items-center justify-between">
                      <span
                        className="card-tag text-xs tracking-widest uppercase"
                        style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem" }}
                      >
                        {p.tag}
                      </span>
                      <span
                        className="card-year text-xs tracking-widest"
                        style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem" }}
                      >
                        {p.year}
                      </span>
                    </div>

                    {/* bottom: title + desc */}
                    <div className="flex flex-col gap-1">
                      <span
                        className="card-title text-black leading-snug text-left"
                        style={{
                          fontFamily: "'Georgia', serif",
                          fontStyle: "italic",
                          fontSize: "clamp(0.9rem, 1.6vw, 1.15rem)",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {p.title}
                      </span>
                      <p
                        className="card-desc text-black/50 leading-relaxed text-left"
                        style={{ fontSize: "0.65rem", fontFamily: "'DM Mono', monospace" }}
                      >
                        {p.desc}
                      </p>
                    </div>
                  </div>

                  {/* hover CTA */}
                  <div className="card-cta">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M7 7h10v10"/>
                    </svg>
                    See Live
                  </div>
                </div>
              );
            })}
          </div>
        </div>
          {activeProject && (
        <Modal
       project={activeProject}
      onClose={() => setActiveProject(null)}
      //  onClose={onClose()}
        // onClose={() => setActiveProject(null)}  // close modal
        />
        
      )}
      
      
        <button className="text-xs tracking-widest uppercase mt-4">View All Projects</button>
    </div>
  )
}
