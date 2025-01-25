'use client';

import { useModal } from '@/Contexts/ModalContext';
import React, { useEffect, useState } from 'react';
import ProCard from './ProCard';
import Loading1 from '../Loading';
import { useSearchParams, usePathname } from 'next/navigation';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const Projects = () => {
    const { RData, Loading, Error, setPageno, setSearchModalOpenHandler } = useModal();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    const [disabledLeft, setDisabledLeft] = useState(false);
    const [disabledRight, setDisabledRight] = useState(false);

    const updatePage = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        const newUrl = `${pathname}?${params.toString()}`;
        setPageno(newPage.toString());
        window.history.pushState({}, '', newUrl);
        window.dispatchEvent(new Event('popstate')); // Trigger navigation update
    };

    useEffect(() => {
        setDisabledLeft(currentPage <= 1);
        setDisabledRight(RData.length === 0 || RData.length < 9);
    }, [currentPage, RData]);

    return (
        <div className="flex flex-col min-h-[95%] md:h-[95%] w-full md:pl-10 gap-4 justify-between">
            <div className="w-full flex items-center justify-between">
                <h1 className="text-xl font-bold dark:text-zinc-400">Top Results</h1>
            </div>
            <div className="gap-5 flex-grow overflow-auto flex flex-col items-center w-full customized-scrollbar px-3">
                {Loading || Error ? (
                    <div className="h-full w-full flex items-center justify-center">
                        {Loading && RData.length !== 0 ? (
                            <Loading1 />
                        ) : (
                            <h1 className="text-sm font-semibold text-zinc-500">Nothing to show here! Try searching for a repo</h1>
                        )}
                    </div>
                ) : (
                    RData.map((item) => <ProCard Data={item} key={item.id} />)
                )}
            </div>
            <div className="flex self-end gap-2">
                <button
                    disabled={disabledLeft}
                    onClick={() => updatePage(currentPage - 1)}
                    className={`p-2 text-center hover:bg-zinc-800 rounded-full ${disabledLeft ? 'opacity-50' : ''
                        }`}
                >
                    <FaChevronLeft />
                </button>
                <button
                    disabled={disabledRight}
                    onClick={() => updatePage(currentPage + 1)}
                    className={`p-2 text-center hover:bg-zinc-800 rounded-full ${disabledRight ? 'opacity-50' : ''
                        }`}
                >
                    <FaChevronRight />
                </button>
            </div>
            <div className="flex self-end">
                <div className="">
                    <button onClick={() => setSearchModalOpenHandler(false)} className="px-4 py-2 text-black dark:bg-[#FEF5EF] border border-[#584B53] cursor-pointer rounded-lg">Close</button>
                </div>
            </div>
        </div>
    );
};

export default Projects;