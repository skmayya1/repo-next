import { RiGithubFill } from "react-icons/ri";
import DarkModeToggle from "./Toggle";
import { IoIosSearch } from "react-icons/io";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";




const Navbar = () => {


  const { user, isLoading } = useKindeBrowserClient();

  return (
    <div className="fixed top-0 left-45 w-[60%] h-[9vh] bg-opacity-60  bg-transparent backdrop-blur-md border-b dark:border-zinc-700 border-[#584B53] flex items-center justify-between px-10 z-50">
      <div className="flex items-center gap-10">
        <h1 className="text-2xl font-medium tracking-wider flex items-end">
          <p className="text-4xl font-bold">R</p>EPOGALLERY
        </h1>
      </div>
 
      <div className="flex gap-3 items-center">

        <label htmlFor="search_modal" className="px-4 flex gap-2 items-center border rounded-lg py-1.5 dark:text-zinc-400 border-[#584B53] dark:border-zinc-700 cursor-pointer dark:hover:bg-[#2c2b2b]">
          <IoIosSearch size={18} />
          <p className="tracking-tight font-medium text-sm opacity-75">Find the right open-source repo</p>
        </label>
        <button className="border p-1.5 rounded-lg border-[#584B53] dark:border-zinc-700 dark:hover:bg-[#2c2b2b]">
          <RiGithubFill size={22} />
        </button>
        <DarkModeToggle />
        {
          !isLoading && <div className="flex items-center">
            {
              user ? <div className="">
                        <Image src={user.picture as string} alt="user" width={35} height={35} className="rounded-full cursor-pointer"/>
                    </div>
                :
                <label htmlFor="my_modal_7" className=" px-2 py-1.5 rounded-lg cursor-pointer hover:bg-[#e2dcd6] transition-all duration-150 ease-in-out  text-black bg-[#FEF5EF]">Sign In</label>
            }
          </div>
        }
      </div>
      
    </div>
  );
};

export default Navbar;
