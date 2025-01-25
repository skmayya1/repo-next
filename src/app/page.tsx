"use client";
import Navbar from "@/Components/Navbar";
import Shining from "@/Components/Shining";
import "./globals.css";
import Featured from "@/Components/Featured";
import SearchModal from "@/Components/SearchModal";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Suggested from "@/Components/Suggested";
import ProfileModal from "@/Components/ProfileModal";
import Footer from "@/Components/Footer";
import { useModal } from "@/Contexts/ModalContext";
import { useEffect } from "react";

const App = () => {
  const { user } = useKindeBrowserClient();
  const { RData, AuthModalOpen, SearchModalOpen } = useModal();

  // Prevent background scrolling when modals are open
  useEffect(() => {
    if (AuthModalOpen || SearchModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup function
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [AuthModalOpen, SearchModalOpen]);

  return (
    <div
      className={`min-h-screen w-full dark:bg-zinc-900 dark:text-[#EFE6DD] text-[#584B53] bg-[#FEF5EF] flex flex-col justify-start items-center relative ${AuthModalOpen || SearchModalOpen ? "overflow-hidden" : ""
        }`}
    >
      {/* Backdrop for modals */}
      {(AuthModalOpen || SearchModalOpen) && (
        <div
          className="fixed inset-0 z-50  backdrop-blur-sm  bg-opacity-50 pointer-events-auto"
          aria-hidden="true"
        ></div>
      )}

      <div className="w-full flex items-center justify-center">
        <Navbar />
      </div>
      <div className="h-full py-10 md:py-20 gap-4 w-full md:w-[60%] border-b dark:border-zinc-700 border-[#584B53] md:h-[25vw] flex items-center justify-center font-semibold text-3xl md:text-6xl flex-col text-center leading-normal md:leading-[4vw]">
        <div className="w-full flex items-center md:justify-center flex-col">
          <h1 className="w-full md:w-[80%] px-4">Connecting Developers to the </h1>
          <h1 className="w-full md:w-[60%] flex gap-2 md:gap-4 items-center justify-center">
            Best of{" "}
            <p className="dark:bg-[#FEF5EF] px-3 md:px-5 dark:text-zinc-900 rounded-xl border-2 border-[#584B53]">
              GitHub
            </p>
          </h1>
        </div>
      </div>
      {user && RData ? <Suggested /> : null}
      <Shining />
      {/* <Featured /> */}
      <Footer />
      {AuthModalOpen && user ? <ProfileModal user={user} /> : null}
      {SearchModalOpen ? <SearchModal /> : null}
    </div>
  );
};

export default App;