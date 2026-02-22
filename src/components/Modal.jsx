import Command from "./Projects/CommandPallette/CommandPallette";
import Card from "./Projects/Cutomizer/Card"

export default function Modal({ project, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(7px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#FFFF",
          borderRadius: "16px",
        //   padding: "32px",
          maxWidth: "50vw",
           height: "fit-content",  
          maxHeight:"90vh",
          width: "100%",
          overflowY: "scroll",
          boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
        }}
      >
      <Command />
      <Card/>

        {/* <button onClick={onClose}>Close</button> */}
      </div>
    </div>
  );
}