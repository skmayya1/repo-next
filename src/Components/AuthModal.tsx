import { LoginLink } from '@kinde-oss/kinde-auth-nextjs'
import React from 'react'
import { FaGithub } from "react-icons/fa";

const AuthModal = () => 
{
  return (
      <div className='absolute top-48 blur-0 '>
      <div className='flex justify-center items-center w-[30vw] rounded-xl h-[12vw] border bg-[#FEF5EF] dark:bg-zinc-800 border-zinc-600 shadow-md relative flex-col  gap-6 '>
        <h1 className='text-2xl fonnt-bold'>Sign in to RepoGallery</h1>
        <LoginLink className='flex items-center gap-3 border font-mono border-zinc-700 font-medium tracking-normal py-3 px-8 rounded-xl text-lg hover:bg-[#252525] transition-all ease-in-out duration-150'
          authUrlParams={{
            connection_id: process.env.GOOGLE_CONNECTION_ID || "conn_01946e53bb9d7e9dec5c889a81f3f982"
          }}
        > <FaGithub/>  Sign In with Githiub 
        </LoginLink>
        </div>  
      </div>
  )
}

export default AuthModal