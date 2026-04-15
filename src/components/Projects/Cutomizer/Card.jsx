import { useState } from "react"
import MiniCard from './MiniCard'
import { motion, AnimatePresence } from "motion/react"
import Customize from "./Customize"

export default function Card() {
  const [active, setActive] = useState(true)
  const [custom, setCustom] = useState(false)
  const [selectedColor, setSelectedColor] = useState("#6366f1")
  const [text, setText] = useState("")
  const [copied, setCopied] = useState(false)

  const handleActive = () => setActive(false)
  const handleBack = () => { setActive(true); setCustom(false) }
  const handleSave = () => setCustom(false)
  const handleCopy = () => {
    navigator.clipboard.writeText("0x1a2b...3c4d")
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <main
      className="min-h-screen flex flex-col justify-center items-center gap-6 px-4 bg-pink-50"
      style={{ background: "#0f0f0f", fontFamily: "'DM Mono', monospace" }}
    >
      <AnimatePresence mode="wait">
        {active ? (
          <MiniCard
            key="mini"
            onBtnClick={handleActive}
            selectedColor={selectedColor}
            setText={setText}
            text={text}
          />
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.34, 1.2, 0.64, 1] }}
            className="flex flex-col items-center gap-5"
          >
            {/* Expanded card */}
            <div
              className="relative w-96 h-56 rounded-2xl p-6 flex flex-col justify-between overflow-hidden"
              style={{
                background: selectedColor,
                boxShadow: `0 24px 60px ${selectedColor}55`,
              }}
            >
              {/* noise overlay */}
              <div style={{
                position: "absolute", inset: 0, borderRadius: "16px",
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E")`,
                pointerEvents: "none", zIndex: 1
              }} />

              <div className="relative z-10 flex justify-between items-center">
                <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>
                  Wallet
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full cursor-pointer transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  {copied ? "✓ Copied" : "0x1a2b...3c4d"}
                </button>
              </div>

              <div className="relative z-10 flex justify-between items-end">
                <div className="flex flex-col gap-0.5">
                  {custom ? (
                    <input
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="bg-transparent text-white outline-none w-36 border-b border-white/30 pb-0.5"
                      placeholder="Wallet name"
                      style={{ fontSize: "1rem", fontFamily: "'DM Mono', monospace" }}
                      autoFocus
                    />
                  ) : (
                    <span style={{ fontSize: "1rem", color: "#fff", fontWeight: 500 }}>
                      {text.length !== 0 ? text : "Harleen Kaur"}
                    </span>
                  )}
                  <span style={{ fontSize: "1.4rem", color: "#fff", fontWeight: 700, letterSpacing: "-0.02em" }}>
                    ₹50,60,000
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setCustom((p) => !p)}
                    className="px-3 py-1.5 rounded-full cursor-pointer transition-all duration-200"
                    style={{
                      background: custom ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.15)",
                      color: custom ? "#111" : "#fff",
                      fontSize: "0.6rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    {custom ? "Done" : "Customize"}
                  </button>
                </div>
              </div>
            </div>

            {/* Customize panel */}
            <AnimatePresence>
              {custom && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <Customize
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                    onBtnClick={handleSave}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Back button */}
            <button
              onClick={handleBack}
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              ← Back
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}