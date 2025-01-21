"use client"
import React from 'react'
import { IoChevronBack } from "react-icons/io5";

const Page = () => {
  return (
      <div className='h-screen w-full items-center flex-col justify-between flex p-10'>
          <div className="flex items-center gap-1 text-xl cursor-pointer hover:text-zinc-500 self-start">
              <IoChevronBack size={20} /> Back
          </div>
          <div className="">
              
          </div>
      </div>
  )
}

export default Page