import { useEffect, useState } from "react";
import { GiFallingStar } from "react-icons/gi";
import { IoIosArrowForward } from "react-icons/io";
import Card from "./Card";

export interface IProject {
    id: number,
    name: string,
    full_name: string,
    html_url: string,
    description: string,
    language: string,
    owner: {
        avatar_url: string,
    },
    homepage: string,
    stargazers_count: number,
    forks_count: number,
    open_issues_count: number,
}

const Shining = () => {
    const [Data, setData] = useState<IProject[] | null>(null)
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const FetchData = async () => {
            try {
                const res = await fetch('/api/projects');
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                setData(data.items?.slice(0, 8) || []); // Slice to get top 8 elements
                console.log(data.items?.slice(0, 8));
                
            } catch (err) {
                console.log(err);
                setError("something went wrong");  
            }
        }
        FetchData()
    }, [])

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="w-[60%] h-[40vw] flex flex-col gap-4">
            <div className="text-xl font-semibold mt-6 flex justify-between w-full">
                <h1 className="flex gap-2 items-center">
                    Shining Stars
                    <GiFallingStar className="-rotate-90" size={25} color="yellow" />
                </h1>
                <p className="font-light text-base flex items-center cursor-pointer gap-1">
                    View More
                    <IoIosArrowForward size={18} />
                </p>
            </div>
            <div className="grid grid-cols-4 h-full overflow-hidden my-5 gap-5">
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
        </div>
    );
}

export default Shining;
