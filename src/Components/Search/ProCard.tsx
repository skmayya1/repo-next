import React from 'react'
import { IProject } from '../Shining'
import Image from 'next/image'
import { HiArrowUpRight } from "react-icons/hi2";
import { GoRepoForked } from 'react-icons/go';

const ProCard = ({Data}:{Data:IProject}) => {
  return (
      <div className='py-5 flex w-full h-[10vh] border border-zinc-800 rounded-lg -= shadow-zinc-700 hover:bg-zinc-800'>
          <div className="p-4 flex w-full h-full items-center gap-5 justify-between">
              <div className="flex w-full h-full items-center gap-5">
                  <a href={Data.homepage} className="">
                      <Image className='rounded-full ' alt='pic' height={45} width={45} src={Data.owner.avatar_url} />
                  </a>
                  <div className="">
                      <a href={Data.homepage} className='text-lg font-semibold hover:text-zinc-300'>{Data.name}</a>
                      <a href={Data.html_url} className='text-zinc-400 text-sm font-light flex gap-1 items-center hover:text-zinc-500'>{Data.full_name} <HiArrowUpRight size={10} /></a>
                  </div>
              </div>
              <div className="flex gap-3 w-[50%] dark:  text-zinc-500">
                  <span className='flex items-center gap-1 font-bold border dark:border-zinc-700 border-[#584B53] h-fit  px-1 rounded-lg text-sm '><p className='font-normal'>Open Issues:</p>{Data.open_issues_count}</span>
                  {Data.language && <span className='flex items-center gap-2 border dark:border-zinc-700 border-[#584B53] h-fit w-fit px-1 text-smtext-sm rounded-lg text-sm '>{Data.language}</span>
                  }
                  <span className='flex items-center gap-2 border dark:border-zinc-700 border-[#584B53] h-fit w-fit px-1 rounded-lg text-sm '><GoRepoForked />{Data.forks_count}</span>

              </div>
          </div>  
      </div>
  )
}

export default ProCard