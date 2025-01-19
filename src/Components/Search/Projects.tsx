import { useModal } from '@/Contexts/ModalContext'
import React from 'react'
import ProCard from './ProCard'

const Projects = () => {
    const {RData} = useModal()
  return (
      <div className=' flex flex-col h-full w-[80%] pl-10 gap-4'>
          <div className="w-full flex items-center justify-between">
              <h1 className='text-xl font-bold text-zinc-400 '>Top Results</h1>
              <div className=""></div>
          </div>
          <div className="gap-5  overflow-y-scroll flex flex-col items-center w-full customized-scrollbar px-3">
              {RData.map((item) => (
                  <ProCard Data={item} key={item.id} />
              ))}
          </div>
          <div className="">
              <div className="modal-action">
                  <label htmlFor="search_modal" className="px-4 py-2 text-black bg-[#FEF5EF] cursor-pointer rounded-lg">Close</label>
              </div>
          </div>

      </div>
  )
}

export default Projects