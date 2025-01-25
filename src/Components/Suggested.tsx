import React, { useEffect, useState } from 'react'
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IProject } from './Shining';
import Card from './Card';
import { useModal } from '@/Contexts/ModalContext';

const Suggested = () => {
    const [Data, setData] = useState<IProject[] | null>(null)
    const {setSData} = useModal()
    useEffect(() => {
        const FetchSuggestions = async () => { 
            const res = await fetch('/api/suggestions')
            const data = await res.json()
            const trimmedData = data.data.slice(0, 4)
            setData(trimmedData)
            console.log(data.data);
            setSData(data.data)
        }
        FetchSuggestions()
    },[])
  return (
      <div className="w-[60%]  min-h-[22vw] flex flex-col gap-4">
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
          <div className="grid md:grid-cols-4 grid-cols-1 h-full my-5 gap-5">
              {Data && Data.map((item) => (
                  <Card
                      Data={{
                          id: item.id,
                          name: item.name,
                          full_name: item.full_name,
                          html_url: item.html_url,
                          description: item.description,
                          language: item.language,
                          owner: item.owner,
                          homepage: item.homepage,
                          stargazers_count: item.stargazers_count,
                          forks_count: item.forks_count,
                          open_issues_count: item.open_issues_count,
                      }}
                      key={item.id}
                  />
              ))}
          </div>
      </div>  )
}

export default Suggested