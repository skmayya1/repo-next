import React, { ChangeEvent, useEffect, useState } from "react";
import { GrSearch } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";

const QuerySection = () => {
    const [tags, setTags] = useState([
        "Typescript",
        "Javascript",
        "NextJs",
        "ReactJS",
        "web3",
        "Rust",
        "solana",
        "ethereum",
        "blockchain",
    ]);
    const [newTag, setnewTag] = useState('')
    const [InputOpen, setInputOpen] = useState(false)
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    const toggleTagSelection = (tag:string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const handleSearchChange = (e:ChangeEvent) => {
        setSearchQuery((e.target as HTMLInputElement).value);
    };

    useEffect(() => { 
        const Tags = localStorage.getItem('tags')
        if(Tags){
            setTags(JSON.parse(Tags))
        }
    }, [selectedTags, searchQuery]);

    return (
        <div className="flex flex-col items-center h-full w-[20%] border-r border-zinc-800 py-10 px-3 gap-5 bg-zinc-900 text-white">
            {/* Search Section */}
            <div className="w-full">
                <div className="w-full h-10 border border-zinc-800 rounded-md px-2 flex items-center">
                    <input
                        className="outline-none bg-transparent w-full text-sm text-white placeholder:text-zinc-500"
                        type="text"
                        placeholder="Search repos"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button className="p-1 text-zinc-400 hover:text-white">
                        <GrSearch size={16} />
                    </button>
                </div>
            </div>

            {/* Tech Stacks Section */}
            <div className="flex w-full flex-col gap-4">
                <div className="w-full">
                    <p className="text-sm font-medium text-zinc-400 mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => toggleTagSelection(tag)}
                                className={`px-2 py-1 text-sm font-light border border-zinc-600 rounded-lg ${selectedTags.includes(tag)
                                        ? "bg-white text-black "
                                        : " text-zinc-300 hover:bg-zinc-700"
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                        <button onClick={() => setInputOpen(!InputOpen)}
                            className={`px-2 py-1 text-sm font-light border border-zinc-600 rounded-lg 
                                }`}
                        >
                            <IoMdAdd size={15} />
                        </button>
                        {   InputOpen &&
                            <div className="w-full h-8 border border-zinc-800 rounded-md px-2 flex items-center">
                            <input
                                onChange={(e) => setnewTag(e.target.value)}
                                className="outline-none bg-transparent w-full text-sm text-white placeholder:text-zinc-500"
                                type="text"
                                placeholder="Add new tag"
                                value={newTag}
                            />
                            <button
                                onClick={() => { 
                                    setTags([...tags,newTag])
                                        setnewTag('')
                                        localStorage.setItem('tags', JSON.stringify([...tags, newTag]))
                                        setInputOpen(false)
                                }}
                                className="p-1 text-zinc-400 hover:text-white">
                             Add
                            </button>
                        </div>}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuerySection;
