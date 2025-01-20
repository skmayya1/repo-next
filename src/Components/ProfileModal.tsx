import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';
import {  KindeUserBase } from '@kinde-oss/kinde-auth-nextjs/types';
import Image from 'next/image';
import React from 'react'

interface ProfileModalProps { 
    user: KindeUserBase
}

const ProfileModal = ({ user }:ProfileModalProps) => {
  return (
    <div className='h-full w-full items-center flex flex-col px-10'>
          <div className="w-full h-full flex items-center">
              <div className="w-full flex items-center gap-5">
                  <Image src={user.picture as string} alt="user" width={50} height={50} className="rounded-full " />
                  <h1 className='text-xl'>{user.given_name}</h1>
              </div>
              <LogoutLink className='bg-white text-black px-4 py-1.5 rounded-lg border border-black'>Logout</LogoutLink>
          </div>
    </div>
  )
}

export default ProfileModal