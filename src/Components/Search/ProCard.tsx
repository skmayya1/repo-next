import React from 'react';
import { IProject } from '../Shining';
import Image from 'next/image';
import { HiArrowUpRight } from "react-icons/hi2";
import { GoRepoForked } from 'react-icons/go';
import { CiStar } from 'react-icons/ci';

const ProCard = ({ Data }: { Data: IProject }) => {
    function formatNumber(num: number) {
        if (num >= 1_000_000) {
            return (num / 1_000_000).toFixed(1) + 'M';
        } else if (num >= 1_000) {
            return (num / 1_000).toFixed(1) + 'K';
        } else {
            return num.toString();
        }
    }

    return (
        <div className='py-5 flex w-full h-auto md:h-[10vh] border border-zinc-800 rounded-lg shadow-zinc-700 dark:hover:bg-zinc-800 hover:bg-slate-50'>
            <div className="p-4 flex w-full h-full flex-col md:flex-row items-center gap-5 justify-between">
                {/* Left Section: Avatar and Project Info */}
                <div className="flex w-full md:w-auto h-full items-center gap-5">
                    <a href={Data.homepage} className="flex-shrink-0">
                        <Image
                            className='rounded-full'
                            alt='pic'
                            height={45}
                            width={45}
                            src={Data.owner.avatar_url}
                        />
                    </a>
                    <div className="flex flex-col">
                        <a href={Data.homepage} className='text-lg font-semibold dark:hover:text-zinc-300'>
                            {Data.name}
                        </a>
                        <a href={Data.html_url} className='text-zinc-400 text-sm font-light flex gap-1 items-center hover:text-zinc-500'>
                            {Data.full_name} <HiArrowUpRight size={10} />
                        </a>
                    </div>
                </div>

                {/* Right Section: Stats */}
                <div className="flex flex-wrap gap-3 w-full md:w-[70%] dark:text-zinc-500 justify-start md:justify-end">
                    <span className='flex items-center gap-1 font-bold border dark:border-zinc-700 border-[#584B53] h-fit px-1 rounded-lg text-sm'>
                        <p className='font-normal'><CiStar /></p>
                        {formatNumber(Data.stargazers_count)}
                    </span>
                    <span className='flex items-center gap-1 font-bold border dark:border-zinc-700 border-[#584B53] h-fit px-1 rounded-lg text-sm'>
                        <p className='font-normal'>Open Issues:</p>
                        {Data.open_issues_count}
                    </span>
                    {Data.language && (
                        <span className='flex items-center gap-2 border dark:border-zinc-700 border-[#584B53] h-fit w-fit px-1 text-sm rounded-lg'>
                            {Data.language}
                        </span>
                    )}
                    <span className='flex items-center gap-2 border dark:border-zinc-700 border-[#584B53] h-fit w-fit px-1 rounded-lg text-sm'>
                        <GoRepoForked />{Data.forks_count}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProCard;