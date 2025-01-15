import { RiGithubFill } from "react-icons/ri";
import DarkModeToggle from "./Toggle";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-45 w-[60%] h-[9vh] bg-opacity-60 bg-white bg-transparent backdrop-blur-md border-b dark:border-zinc-700 border-[#584B53] flex items-center justify-between px-10 z-50">
      <h1 className="text-2xl font-medium tracking-wider flex items-end">
        <p className="text-4xl font-bold">R</p>EPOGALLERY
      </h1>
      <div className="flex gap-3">
        <button className="border p-1 rounded-lg border-[#584B53] dark:border-zinc-700">
          <RiGithubFill size={22} />
        </button>
        <DarkModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
