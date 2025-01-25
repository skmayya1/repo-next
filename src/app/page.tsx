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
import { useModal } from "@/Contexts/ModalContext"

const App = () => {
  const { user } = useKindeBrowserClient();
  const { RData } = useModal()

  return (
    <div className='min-h-screen w-full dark:bg-zinc-900 dark:text-[#EFE6DD] text-[#584B53] bg-[#FEF5EF] flex flex-col justify-start items-center relative'>
      <div className="w-full flex items-center justify-center">
        <Navbar />
      </div>
      <div className="h-auto py-10 md:py-20 gap-4 w-full md:w-[60%] border-b dark:border-zinc-700 border-[#584B53] md:h-[25vw] flex items-center justify-center font-semibold text-3xl md:text-6xl flex-col text-center leading-normal md:leading-[4vw]">
        <div className="w-full flex items-center justify-center flex-col">
          <h1 className="w-full md:w-[80%] px-4">Connecting Developers to the </h1>
          <h1 className="w-full md:w-[60%] flex gap-2 md:gap-4 items-center justify-center">Best of <p className="dark:bg-[#FEF5EF] px-3 md:px-5 dark:text-zinc-900 rounded-xl border-2 border-[#584B53]">GitHub</p></h1>
        </div>
      </div>
      {
        user && RData ? <Suggested /> : null
      }
      <Shining />
      { /* <Featured />*/}
      <Footer />
      <input type="checkbox" id="search_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="border border-zinc-700 rounded-lg dark:bg-[#18181B] bg-[#FEF5EF] text-[#584B53] dark:text-zinc-300 h-[90vh] w-full md:w-[150vh]">
          <div className="h-full w-full p-5 flex flex-col justify-between">
            <div className="h-full w-full">
              <SearchModal />
            </div>
          </div>
        </div>
      </div>
      <input type="checkbox" id="profile_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box border border-zinc-700 rounded-lg dark:bg-[#18181B] bg-[#FEF5EF] h-auto md:h-[10vh] w-full md:w-[30vw]">
          {user && <ProfileModal user={user} />}
        </div>
        <label className="modal-backdrop" htmlFor="profile_modal">Close</label>
      </div>
    </div>
  )
}

export default App