import { useEffect, useState } from "react";
import { GiFallingStar } from "react-icons/gi";
import Card from "./Card";
import Skeleton from "./Skeleton"; // Import the Skeleton component

export interface IProject {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description: string;
    language: string;
    owner: {
        avatar_url: string;
    };
    homepage: string;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
}

const Shining = () => {
    const [Data, setData] = useState<IProject[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const FetchData = async () => {
            try {
                const res = await fetch("/api/projects");
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                localStorage.setItem("projects", JSON.stringify(data));
                setData(data); // Set the fetched data
            } catch (err) {
                console.log(err);
                setError("Something went wrong");
            }
        };
        const localData = localStorage.getItem("projects");
        if (localData) {
            setData(JSON.parse(localData));
        } else {
            FetchData();
        }
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="w-[60%] min-h-[40vw] flex flex-col gap-4">
            <div className="text-xl font-semibold mt-6 flex justify-between w-full">
                <h1 className="flex gap-2 items-center">
                    Shining Stars
                    <GiFallingStar className="-rotate-90" size={25} color="yellow" />
                </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 h-full my-5 gap-5">
                {Data
                    ? Data.map((item) => (
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
                    ))
                    : 
                    Array.from({ length: 8 }).map((_, index) => <Skeleton key={index} />)}
            </div>
        </div>
    );
};

export default Shining;
