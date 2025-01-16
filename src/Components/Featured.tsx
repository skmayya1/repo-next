import React from 'react'
import Card from './Card';

const Featured = () => {
    const dummyData = {
        owner: {
            avatar_url: "https://avatars.githubusercontent.com/u/153281469?v=4",
        },
        open_issues_count: 15,
        homepage: "https://example.com",
        html_url: "https://github.com/example/repo",
        name: "Example Project",
        stargazers_count: 1234,
        description: "This is a dummy project description for testing purposes.",
        language: "JavaScript",
        forks_count: 56,
        id: 1,
        full_name: "example/repo",
    };
  return (
      <div className="w-[60%] h-[22vw] flex flex-col gap-4">
          <div className="text-xl font-semibold mt-6 flex justify-between w-full">
              <h1 className="flex gap-2 items-center">
                   Featured
              </h1>
             {   /* <p className="font-light text-base flex items-center cursor-pointer gap-1">
                  View More
                  <IoIosArrowForward size={18} />
              </p> */}
          </div>
          <div className="grid grid-cols-4 h-full my-5 gap-5">
              <Card Data={dummyData} />
              <p className='text-zinc-500 font-normal self-center'>* <a href="https://x.com/Skmayya1" className='underline'>contact</a> to get featured</p>
          </div>
      </div>
  )
}

export default Featured