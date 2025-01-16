import { RiGithubFill } from "react-icons/ri";
import DarkModeToggle from "./Toggle";
import { IoIosSearch } from "react-icons/io";
import { BsShiftFill } from "react-icons/bs";
import { useEffect } from "react";

const Navbar = () => {
  const OnSearch = () => { 
    alert("modal on/off");
    
  };
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Shift") {
      OnSearch();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="fixed top-0 left-45 w-[60%] h-[9vh] bg-opacity-60  bg-transparent backdrop-blur-md border-b dark:border-zinc-700 border-[#584B53] flex items-center justify-between px-10 z-50">
      <h1 className="text-2xl font-medium tracking-wider flex items-end">
        <p className="text-4xl font-bold">R</p>EPOGALLERY
      </h1>
      <div className="flex gap-3">
        <button onClick={OnSearch} className="px-4 flex gap-2 items-center border rounded-lg py-1.5 dark:text-zinc-400 border-[#584B53] dark:border-zinc-700">
          <IoIosSearch size={18} />
          <p className="tracking-tight font-medium text-sm opacity-75">Find the right open-source repo</p>
          <span className="border border-[#584B53] dark:border-zinc-700 flex items-center px-1.5  rounded-lg text-xs py-1 gap-1 tracking-wide"><BsShiftFill size={11}/> Shift</span>
        </button>
        <button className="border p-1.5 rounded-lg border-[#584B53] dark:border-zinc-700">
          <RiGithubFill size={22} />
        </button>
        <DarkModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
