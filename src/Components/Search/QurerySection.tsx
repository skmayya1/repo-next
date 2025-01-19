import React from 'react'

const QurerySection = () => {
  return (
      <div className='flex flex-col items-center h-full w-[20%] border-r border-zinc-800 py-10 px-3 gap-5'>
          <div className=" w-full">
              <div className="">
                  <input
                       className='w-full h-10 border border-zinc-800 rounded-md px-2 outline-none'
                      type="text"
                      placeholder='Search repos'    
                  />
              </div>
          </div>
          <div className="flex w-full items-start flex-col">
              <div className="">
                  <p className='dark:text-zinc-400'>Tech Stacks</p>
              </div>
          </div>
    </div>
  )
}

export default QurerySection