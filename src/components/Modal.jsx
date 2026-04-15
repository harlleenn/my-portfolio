import Command from "./Projects/CommandPallette/CommandPallette";
import Card from "./Projects/Cutomizer/Card";

export default function Modal({activeProject,  onClose }) {
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
      <style>{`
        @keyframes gradShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .modal-panel {
          // background: linear-gradient(135deg, #f59e0b, #dc2626, #eab308, #f59e0b);
          // background-size: 300% 300%;
          // animation: gradShift 10s ease infinite;
          background: #fff;
          border-radius: 16px;
          padding: 32px;
          max-width: 50vw;
          width: 100%;
          height: fit-content;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 32px 80px rgba(0,0,0,0.25);
        }
      `}</style>

      <div
        className="modal-panel"
        onClick={(e) => e.stopPropagation()}
      >
       {activeProject.id === 1 ? <Command/>  : <Card/>}
       
       
      </div>
    </div>
  );
}