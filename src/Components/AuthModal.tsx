import { LoginLink } from '@kinde-oss/kinde-auth-nextjs'
import React from 'react'
import { IoMdClose } from "react-icons/io";

const AuthModal = () => {
  return (
      <div className='absolute top-48 blur-0 '>
      <div className='flex justify-center items-center w-[30vw] rounded-xl h-[15vw] border bg-[#FEF5EF] dark:bg-zinc-800 border-zinc-600 shadow-md relative flex-col  gap-6'>
        <div className="absolute top-0 right-0 p-3 text-center">
          <button className='cursor-pointer'><IoMdClose/></button>
        </div>
        <h1 className='text-2xl fonnt-bold'>Sign in to RepoGallery</h1>
        <LoginLink className='flex items-center gap-3 border font-mono border-zinc-700 font-medium tracking-normal py-3 px-8 rounded-xl text-lg'
          authUrlParams={{
            connection_id: process.env.GOOGLE_CONNECTION_ID || "conn_01946e53bb9d7e9dec5c889a81f3f982"
          }}
        >  Sign In with Githiub
        </LoginLink>
        </div>  
      </div>
  )
}

export default AuthModal