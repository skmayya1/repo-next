import React, { useEffect } from 'react'
import { IoMdInformationCircleOutline } from "react-icons/io";

const Suggested = () => {
    useEffect(() => {
        const FetchSuggestions = async () => { 
           // const res = await fetch('/api/suggestions')
          //  const data = await res.json()
            
          //  console.log(data)
        }
        FetchSuggestions()
    },[])
  return (
      <div className="w-[60%] h-[22vw] flex flex-col gap-4">
          <div className="text-xl font-semibold mt-6 flex justify-between w-full">
              <h1 className="flex gap-2 items-center ">
                  Suggestion
                  <div className="tooltip tooltip-right" data-tip="Suggestions are based on your most used coding languages.">
                      <IoMdInformationCircleOutline size={18} color='gray' className='cursor-pointer' />
                    </div>
              </h1>
              {   /* <p className="font-light text-base flex items-center cursor-pointer gap-1">
                  View More
                  <IoIosArrowForward size={18} />
              </p> */}
          </div>
          <div className="grid grid-cols-4 h-full my-5 gap-5">
              
          </div>
      </div>  )
}

export default Suggested