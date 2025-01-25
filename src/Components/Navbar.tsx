import { RiGithubFill } from "react-icons/ri";
import DarkModeToggle from "./Toggle";
import { IoIosSearch } from "react-icons/io";
import { LoginLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import { MdLeaderboard } from "react-icons/md";
import { FaGithub, FaStar } from "react-icons/fa";
import { useModal } from "@/Contexts/ModalContext";


const Navbar = () => {

  const { setAuthModalOpenHandler, setSearchModalOpenHandler } = useModal();

  const { user, isLoading } = useKindeBrowserClient()
  

  return (
    <div className="fixed top-0 md:w-[60%] w-[80%] h-[9vh] bg-opacity-60  bg-transparent backdrop-blur-md border-b dark:border-zinc-700 border-[#584B53] flex items-center md:justify-between md:px-10 px-8 justify-between z-49 ">
      <div className="flex items-center gap-10">
        <h1 className="text-2xl font-medium tracking-wider flex items-end">
          <p className="text-4xl font-bold">R</p>EPOGALLERY
        </h1>
      </div>
 
      <div className="flex gap-3 items-center ">

        <button onClick={() => {
          setSearchModalOpenHandler(true)
        }}  className="md:px-4 p-1 flex gap-2 items-center border rounded-lg md:py-1.5 dark:text-white  md:dark:text-zinc-400 border-[#584B53] dark:border-zinc-700 cursor-pointer dark:hover:bg-[#2c2b2b]">
          <IoIosSearch size={22} />
          <p className="tracking-tight font-medium text-sm opacity-75 md:block hidden">Find the right open-source repo</p>
        </button>
        <button className="border p-1.5 rounded-lg border-[#584B53] dark:border-zinc-700 dark:hover:bg-[#2c2b2b] group  items-center gap-2 transition-all duration-500 ease-in-out overflow-hidden w-[40px] hover:w-[150px] md:flex hidden">
          <RiGithubFill size={22} className="flex-shrink-0" />
          <span className="opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-500 ease-in-out md:flex items-center gap-2 hidden">
            Star Repo <FaStar size={15} className="inline" />
          </span>
        </button>

        <div className="tooltip tooltip-bottom tooltip-info md:flex hidden" data-tip="coming soon!" >
        <button className="border p-1.5 rounded-lg border-[#584B53] dark:border-zinc-700 dark:hover:bg-[#2c2b2b] group flex items-center gap-2 transition-all duration-500 ease-in-out overflow-hidden w-[40px] hover:w-[150px] cursor-no-drop">
          <MdLeaderboard size={22} className="flex-shrink-0" />
          <span className="opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-500 ease-in-out">
            LeaderBoard
          </span>
          </button>
        </div>

        <DarkModeToggle />
        {
          !isLoading && <div className="flex items-center">
            {
              user ? <div className="">
                <button onClick={
                  () => setAuthModalOpenHandler(true)
                } className="cursor-pointer">
                  <Image src={user.picture as string} alt="user" width={35} height={35} className="rounded-full " />
                </button>
                    </div>
                :
                <LoginLink className=" px-2 py-1.5 rounded-lg cursor-pointer hover:bg-[#e2dcd6] transition-all duration-150 ease-in-out  text-black bg-[#FEF5EF] flex items-center gap-2"
                    authUrlParams={{
                      connection_id: process.env.GOOGLE_CONNECTION_ID || "conn_01946e53bb9d7e9dec5c889a81f3f982"
                    }}
                >  Sign In with  <FaGithub /> 
                  </LoginLink>
            }
          </div>
        }
      </div>
      
    </div>
  );
};

export default Navbar;
