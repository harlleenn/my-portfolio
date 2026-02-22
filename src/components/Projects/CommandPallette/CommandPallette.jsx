import React, { useEffect, useState } from "react";

export default function Command() {
  const [active, setActive] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [index , setIndex] = useState(0);

  const handleModal = () => {
    setActive((prev) => !prev);
  };
  

   const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchItem(value);

    if (value === "") {
      setFilteredUsers([]);
      setIndex(0);
      return;
    }

    const filtered = users.filter((user) =>
      user.firstName.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredUsers(filtered);
    setIndex(0);
  };


  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        // setFilteredUsers(data.users);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });

  }, []);
  useEffect(() => {
    const handleKeyDown = (e) => {
        if((e.metaKey || e.ctrlKey) && e.key === "k") {
          e.preventDefault();
          setActive(true)
          console.log("key was pressed")
        }
         if (e.key === "Escape" ){
          setActive(false)
        }
         if (!active) return;
        if(e.key ==="ArrowDown"){
          e.preventDefault()
         setIndex((prev) => prev < filteredUsers.length-1 ? prev + 1 :prev)
              
        }
          if(e.key ==="ArrowUp"){
            e.preventDefault()
          setIndex((prev) => (prev > 0 ? prev - 1 : prev));
     
        }
    };
    window.addEventListener("keydown", handleKeyDown)
    return  () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  },[filteredUsers.length, active])

  return (
    <div className="h-screen w-full justify-center items-center flex flex-col">
        <h1 className="mb-10 text-sm text-gray-300">Ctrl+k to open the command</h1>
      {!active ? (
        <button
          className="px-4 py-3 rounded-lg bg-black/70 text-white"
          onClick={handleModal}
        >
          Open Command Palette
        </button>
      ) : (
        <div className="w-96  rounded-t-xl shadow-lg  bg-[#f3f2f2]">
          <input
            type="text"
            value={searchItem}
            onChange={handleInputChange}
            placeholder="Search"
            className="w-full px-3 py-2  rounded-t-xl outline-none bg-[#f3f2f2]"
            autoFocus
          />

          {loading && <p className="mt-3 text-sm">Loading...</p>}
          {error && (
            <p className="mt-3 text-sm text-red-500">
              Error loading users
            </p>
          )}

      {
        !loading && !error && (
          <>
          {searchItem === "" && (
                <div className="p-5">
                  <h1 className="text-xs text-gray-400 mb-2">Explore</h1>
                  <p className="p-2 rounded hover:bg-slate-200 cursor-pointer">
                    Browse Extensions
                  </p>
                  <p className="p-2 rounded hover:bg-slate-200 cursor-pointer">
                    Create an Extension
                  </p>

                  <h1 className="text-xs text-gray-400 mt-5 mb-2">Account</h1>
                  <p className="p-2 rounded hover:bg-slate-200 cursor-pointer">
                    View Account
                  </p>
                  <p className="p-2 rounded hover:bg-slate-200 cursor-pointer text-red-600 font-medium">
                    Log out
                  </p>
                </div>
              )}
          {searchItem !== "" && filteredUsers.length === 0 && (
                <div className="min-h-60 flex flex-col justify-center items-center text-sm text-gray-500">
                  <p>Can’t find what you are looking for</p>
                  <p>Build your own extension</p>
                </div>
              )}
                 {filteredUsers.length > 0 && (
                <ul className="max-h-60 overflow-y-clip  p-2">
                  {filteredUsers.map((user, idx) => (
                    <li
                      key={user.id}
                      onMouseEnter={() => setIndex(idx)}
                      className={`cursor-pointer p-2 rounded-lg ${
                        index === idx
                          ? "bg-slate-300"
                          : "hover:bg-slate-200"
                      }`}
                    >
                      {user.firstName} {user.lastName}
                    </li>
                  ))}
                </ul>
              )}
          </>
        )
      }
         
        </div>
      )}
    </div>
  );
}
