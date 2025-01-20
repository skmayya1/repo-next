import { useModal } from '@/Contexts/ModalContext'
import React from 'react'
import ProCard from './ProCard'
import Loading1 from '../Loading'

const Projects = () => {
    const {RData,Loading ,Error} = useModal()
  return (
      <div className=' flex flex-col h-full w-[80%] pl-10 gap-4 justify-between'>
          <div className="w-full flex items-center justify-between">
              <h1 className='text-xl font-bold dark:text-zinc-400 '>Top Results</h1>
              <div className=""></div>
          </div>
          <div className="gap-5 h-[40vw] overflow-y-scroll flex flex-col items-center w-full customized-scrollbar px-3">
              {
                  Loading || Error ? <div className="h-full w-full items-center justify-center flex">
                      {
                            Loading ? <Loading1 /> : <h1 className='text-sm font-semibold text-red-500'>Oops! Failed to fetch data</h1>
                      }
                  </div> : 
                      <>
                          {RData.map((item) => (
                              <ProCard Data={item} key={item.id} />
                          ))}
                      </>
              }
          </div>
          <div className="">
              <div className="modal-action">
                  <label htmlFor="search_modal" className="px-4 py-2 text-black dark:bg-[#FEF5EF] border border-[#584B53] cursor-pointer rounded-lg">Close</label>
              </div>
          </div>

      </div>
  )
}

export default Projects