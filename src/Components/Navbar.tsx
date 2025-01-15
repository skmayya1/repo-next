import { RiGithubFill } from "react-icons/ri"
import DarkModeToggle from "./Toggle"



const Navbar = () => {

  return (
      <div className="h-[9vh] border-b dark:border-zinc-700 border-[#584B53]  w-[60%] flex items-center justify-between select-none ">
          <h1 className="text-2xl font-medium tracking-wider flex items-end"><p className="text-4xl text-bold">R</p>EPOGALLERY</h1>
          <div className="flex gap-3">
              <button className="border p-1 rounded-lg border-[#584B53] dark:border-zinc-700  antialiased dark:opacity-90">
               <RiGithubFill size={22} />
              </button>
              <DarkModeToggle />
          </div>
    </div>
  )
}

export default Navbar