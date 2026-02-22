export default function Customize({selectedColor ,setSelectedColor, onBtnClick}) {
  const colors = [
   "bg-[#ef4444]",   // Red
"bg-[#ec4899] "  ,// Pink
"bg-[#d946ef] ",  // Fuchsia
"bg-[#8b5cf6]",   // Violet
"bg-[#6366f1] ",
"bg-[#2563EB]",
"bg-[#60A5FA]",
"bg-[#0EA5E9]",
"bg-[#14B8A6]",
"bg-[#22C55E]",

"bg-[#84CC16]",
"bg-[#EAB308]",
"bg-[#F59E0B]",
"bg-[#F97316]",

"bg-[#EF4444]",
"bg-[#D4B36B]",
"bg-[#C08457]",
"bg-[#0F172A]",
 , // Indigo
  ]

  return (
    <main className=" flex flex-col items-center justify-center gap-6 ">
      {/* Color Picker */}
      <div className="grid grid-cols-6 gap-3 justify-center items-center ">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            className={`w-8 h-8 rounded-full ${color} border-2 border-white cursor-pointer ${
            selectedColor === color ? "ring-2 ring-black" : ""
          }`}
          />
        ))}
      </div>
<button className={`text-black font-medium w-54 h-10 rounded-4xl cursor-pointer ${selectedColor}  `} onClick={onBtnClick}>Save</button>
    </main>
  )
}
