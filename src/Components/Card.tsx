import React from 'react';
import { IProject } from './Shining';
import Image from 'next/image';
import { CiStar } from "react-icons/ci";
import { GoRepoForked } from "react-icons/go";
import { RiGitRepositoryLine } from "react-icons/ri";
import { GoLink } from "react-icons/go";

const Card = ({ Data }: { Data: IProject | null }) => {
  function formatNumber(num:number) {
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1) + 'M';
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(1) + 'K';
    } else {
      return num.toString();
    }
  }
  return (
    <div className='h-[30vh] border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 border-[#584B53]  flex flex-col items-center justify-center overflow-hidden shadow-md shadow-[#efe6dd1a] hover:scale-105 hover:shadow-lg transition-all ease-in-out duration-200 dark:hover:shadow-[#ffffff13] cursor-pointer hover:-translate-y-2'>
      {
        Data ? (
          <div className='h-full w-[90%] flex flex-col justify-around'>
            <div className="w-full flex items-center justify-center h-[30%]">
              <Image width={100} height={100} src={Data.owner.avatar_url} alt='avatar' className='w-12 h-12 rounded-full' />
            </div>
            <div className="text-sm h-[5%] flex w-full justify-between">
              <span className='flex items-center gap-1 font-bold border dark:border-zinc-700 border-[#584B53] h-fit w-fit px-1 rounded-lg dark:bg-green-900 '><p className='font-normal'>Open Issues:</p>{Data.open_issues_count}</span>
              <div className="flex  opacity-85  gap-2">
                <a className='hover:scale-105 transition-all ease-in-out duration-150  hover:opacity-100' href={Data.homepage}>
                  <GoLink size={18} />
                </a>
                <a className='hover:scale-105 transition-all ease-in-out duration-150  hover:opacity-100' href={Data.html_url}>
                  <RiGitRepositoryLine size={18} />
                </a>
              </div>
            </div>
            <div className="flex w-full gap-1 h-[10%]">
              <h2 className="text-lg font-bold w-[65%] h-fit overflow-hidden whitespace-nowrap text-ellipsis">
                {Data.name}
              </h2>
              <span className='w-fit border dark:border-zinc-700 border-[#584B53] h-fit py-0.5 rounded-lg flex items-center gap-1 px-2 shadow-md shadow-[#efe6dd1a] '><CiStar/>{formatNumber(Data.stargazers_count)}</span>
            </div>
            <div className="h-[35%] flex flex-col gap-3">
              <p className='text-sm dark:text-zinc-300 line-clamp-2'>
                {Data.description}
              </p>
              <div className="flex gap-3">
                {Data.language && <span className='flex items-center gap-2 border dark:border-zinc-700 border-[#584B53] h-fit w-fit px-1 rounded-lg shadow-md shadow-[#efe6dd1a] '>{Data.language}</span>
                }
                <span className='flex items-center gap-2 border dark:border-zinc-700 border-[#584B53] h-fit w-fit px-1 rounded-lg shadow-md shadow-[#efe6dd1a]'><GoRepoForked />{Data.forks_count}</span>
              </div>
            </div>

          </div>
        ) : (
          <p>No data available</p>
        )
      }
    </div>
  );
}

export default Card;
