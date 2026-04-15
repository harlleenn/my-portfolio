import React, { useEffect, useState } from "react";
import { LogIn, UserPlus, Zap, BookOpen, Users, FileText, Info } from "lucide-react";

export default function Command() {
  const [active, setActive] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [index, setIndex] = useState(0);

  const commandItems = [
    {
      section: "App",
      items: [
        { id: 1, title: "Log in to Linear", shortcut: ["L"], icon: <LogIn size={16} /> },
        { id: 2, title: "Sign up to Linear", shortcut: [], icon: <UserPlus size={16} /> },
      ],
    },
    {
      section: "Navigation",
      items: [
        { id: 3, title: "Go to Features", shortcut: ["G", "F"], icon: <Zap size={16} /> },
        { id: 4, title: "Go to Linear Method", shortcut: ["G", "M"], icon: <BookOpen size={16} /> },
        { id: 5, title: "Go to Customers", shortcut: ["G", "C"], icon: <Users size={16} /> },
        { id: 6, title: "Go to Changelog", shortcut: ["G", "C"], icon: <FileText size={16} /> },
        { id: 7, title: "Go to About", shortcut: ["G", "A"], icon: <Info size={16} /> },
      ],
    },
  ];

  const handleModal = () => setActive((prev) => !prev);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchItem(value);
    if (value === "") { setFilteredUsers([]); setIndex(0); return; }
    const filtered = users.filter((user) =>
      user.firstName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
    setIndex(0);
  };

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
      .catch((err) => { console.error(err); setError(true); })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setActive(true); console.log("key was pressed"); }
      if (e.key === "Escape") setActive(false);
      if (!active) return;
      if (e.key === "ArrowDown") { e.preventDefault(); setIndex((prev) => prev < filteredUsers.length - 1 ? prev + 1 : prev); }
      if (e.key === "ArrowUp") { e.preventDefault(); setIndex((prev) => prev > 0 ? prev - 1 : prev); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredUsers.length, active]);

  // Reusable item row component
  const ItemRow = ({ item }) => (
    <div className="flex items-center justify-between px-3 py-2 mx-1.5 rounded-lg cursor-pointer hover:bg-black/5 transition-colors duration-100">
      <div className="flex items-center gap-2.5 text-sm text-black/75">
        <span className="text-black/30">{item.icon}</span>
        {item.title}
      </div>
      <div className="flex gap-1">
        {item.shortcut.map((key) => (
          <span
            key={key}
            className="px-1.5 py-0.5 rounded text-[10px] text-black/40 bg-black/5 border border-black/10 font-mono"
          >
            {key}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h1 className="mb-10 text-sm text-gray-400 tracking-widest uppercase">
        Ctrl+K to open the command
      </h1>

      {!active ? (
        <button
          className="px-4 py-2.5 rounded-lg bg-black text-white text-sm tracking-wide cursor-pointer hover:bg-black/80 transition-colors"
          onClick={handleModal}
        >
          Open Command Palette
        </button>
      ) : (
        <div className="w-96 rounded-xl shadow-2xl overflow-hidden bg-white border border-black/10">

          {/* Input */}
          <input
            type="text"
            value={searchItem}
            onChange={handleInputChange}
            placeholder="Search..."
            autoFocus
            className="w-full px-4 py-3 text-sm text-black placeholder-black/25 bg-white outline-none border-b border-black/8"
          />

          {loading && <p className="px-4 py-3 text-sm text-black/40">Loading...</p>}
          {error && <p className="px-4 py-3 text-sm text-red-500">Error loading users</p>}

          {!loading && !error && (
            <>
              {/* Default state — show commandItems */}
              {searchItem === "" && (
                <div className="py-2">
                  {commandItems.map((group, gi) => (
                    <div key={gi}>
                      <p className="px-3 pt-3 pb-1 text-[10px] tracking-widest uppercase text-black/30">
                        {group.section}
                      </p>
                      {group.items.map((item) => (
                        <ItemRow key={item.id} item={item} />
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {/* Filter commandItems by search */}
              {searchItem !== "" && (() => {
                const filtered = commandItems
                  .map((group) => ({
                    ...group,
                    items: group.items.filter((item) =>
                      item.title.toLowerCase().includes(searchItem.toLowerCase())
                    ),
                  }))
                  .filter((group) => group.items.length > 0);

                return filtered.length === 0 ? (
                  <div className="flex flex-col items-center justify-center min-h-28 gap-1">
                    <p className="text-sm text-black/30">No results for "{searchItem}"</p>
                    <p className="text-xs text-black/20">Try a different term</p>
                  </div>
                ) : (
                  <div className="py-2">
                    {filtered.map((group, gi) => (
                      <div key={gi}>
                        <p className="px-3 pt-3 pb-1 text-[10px] tracking-widest uppercase text-black/30">
                          {group.section}
                        </p>
                        {group.items.map((item) => (
                          <ItemRow key={item.id} item={item} />
                        ))}
                      </div>
                    ))}
                  </div>
                );
              })()}
            </>
          )}

          {/* Footer */}
          <div className="flex gap-4 px-4 py-2.5 border-t border-black/8">
            <span className="text-[10px] text-black/25 tracking-wide">↑↓ navigate</span>
            <span className="text-[10px] text-black/25 tracking-wide">↵ select</span>
            <span className="text-[10px] text-black/25 tracking-wide">esc close</span>
          </div>
        </div>
      )}
    </div>
  );
}