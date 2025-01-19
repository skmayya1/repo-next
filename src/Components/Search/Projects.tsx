import { useModal } from '@/Contexts/ModalContext'
import React from 'react'
import ProCard from './ProCard'

const Projects = () => {
    const {RData} = useModal()
  return (
      <div className='customized-scrollbar flex flex-col items-center h-full w-[80%] p-10 gap-5  overflow-y-scroll'>
          {RData.map((item) => (
            <ProCard Data={item} key={item.id}/>
        ))}
      </div>
  )
}

export default Projects