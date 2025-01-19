"use client"
import Navbar from "@/Components/Navbar"
import Shining from "@/Components/Shining"
import "./globals.css"
import Featured from "@/Components/Featured"
import SearchModal from "@/Components/SearchModal"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import Suggested from "@/Components/Suggested"
import ProfileModal from "@/Components/ProfileModal"
import Footer from "@/Components/Footer"

const App = () => {
  const { user } = useKindeBrowserClient();
  
  return (
    <div  className='min-h-screen w-full dark:bg-zinc-900 dark:text-[#EFE6DD] text-[#584B53] bg-[#FEF5EF] flex flex-col justify-start items-center relative '>
      <div className="w-full flex items-center justify-center">
        <Navbar />
      </div>
      <div className="h-[25vw] gap-4 w-[60%] border-b dark:border-zinc-700 border-[#584B53] flex items-center  justify-center font-semibold text-6xl flex-col text-center leading-[4vw] mt-10">
        <div className="w-full flex items-center justify-center flex-col ">
          <h1 className="w-[80%] ">Connecting Developers to the </h1>
          <h1 className="w-[60%] flex gap-4 items-center justify-center">Best of <p className="dark:bg-[#FEF5EF] px-5 dark:text-zinc-900  rounded-xl border-2 border-[#584B53]">GitHub</p></h1>
       </div>
      </div>
      {
        user ? <Suggested /> : null
      }
      <Shining />
      <Featured />
      <Footer />
      <input type="checkbox" id="search_modal" className="modal-toggle" />
      <div className="modal " role="dialog">
        <div className="border border-zinc-700 rounded-lg bg-[#18181B] h-[90vh] w-[150vh]">
          <div className="h-full w-full p-5 flex flex-col justify-between">
            <div className="h-full w-full">
              <SearchModal/>
            </div>

          </div>
        </div>
      </div>
      <input type="checkbox" id="profile_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box border border-zinc-700 rounded-lg bg-[#18181B] h-[10vh] w-[30vw]">
          {user && <ProfileModal user={user} />}
        </div>
        <label className="modal-backdrop" htmlFor="profile_modal">Close</label>
      </div>
    </div>
  )
}

export default App

