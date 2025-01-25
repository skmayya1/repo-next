import React, { ChangeEvent, useEffect, useState } from "react";
import { GrSearch } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import Loading1 from "../Loading";
import { useModal } from "@/Contexts/ModalContext";

const QuerySection = () => {
    const [tags, setTags] = useState<string[]>([
        "NextJs", "ReactJS", "web3", "solana", "ethereum", "blockchain","contract"
    ]);
    const [languages, setLanguages] = useState<string[]>([
        "C", "Java", "Go", "Ruby", "Kotlin", "Swift", "cpp", "csharp", "Python","solidity"
    ]);

    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

    const [newItem, setNewItem] = useState("");
    const [inputOpen, setInputOpen] = useState<"tags" | "languages" | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const { QueryData, Loading,Page } = useModal();

    const toggleSelection = (item: string, setSelected: React.Dispatch<React.SetStateAction<string[]>>) => {
        setSelected((prev) =>
            prev.includes(item) ? prev.filter((t) => t !== item) : [...prev, item]
        );
    };

    const handleSearchChange = (e: ChangeEvent) => {
        setSearchQuery((e.target as HTMLInputElement).value);
    };

    const handleAddItem = (type: "tags" | "languages") => {
        if (newItem.trim()) {
            const setItem = type === "tags" ? setTags : setLanguages;
            const updatedList = type === "tags" ? tags : languages;

            if (!updatedList.includes(newItem)) {
                const newList = [...updatedList, newItem];
                setItem(newList);
                localStorage.setItem(type, JSON.stringify(newList));
                setNewItem("");
                setInputOpen(null);
            }
        }
    };

    useEffect(() => {
        if (searchQuery.length > 0 || selectedTags.length > 0 || selectedLanguages.length > 0 ) {
            QueryData({ selectedTags, selectedLanguages, Query: searchQuery });
        }
    }, [selectedTags, selectedLanguages, searchQuery, Page]);



    useEffect(() => {
        const storedTags = localStorage.getItem("tags");
        const storedLanguages = localStorage.getItem("languages");

        if (storedTags) setTags(JSON.parse(storedTags));
        if (storedLanguages) setLanguages(JSON.parse(storedLanguages));
    }, []);

    return (
        <div className="flex flex-col items-center h-full w-[20%] border-r border-zinc-800 py-10 px-3 gap-5 dark:bg-zinc-900 dark:text-white">
            {/* Search Section */}
            <div className="w-full">
                <div className="w-full h-10 border border-zinc-800 rounded-md px-2 flex items-center">
                    <input
                        className="outline-none bg-transparent w-full text-sm dark:text-white placeholder:text-zinc-500"
                        type="text"
                        placeholder="Search repos"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button disabled={Loading} className="p-1 text-zinc-400 darK:hover:text-white">
                        {Loading ? <Loading1 /> : <GrSearch size={16} />}
                    </button>
                </div>
            </div>

            {[
                { title: "Tags", items: tags, selected: selectedTags, setSelected: setSelectedTags, type: "tags" },
                { title: "Languages", items: languages, selected: selectedLanguages, setSelected: setSelectedLanguages, type: "languages" },
            ].map(({ title, items, selected, setSelected, type }) => (
                <div key={type} className="w-full">
                    <p className="text-sm font-medium dark:text-zinc-400 mb-2">{title}</p>
                    <div className="flex flex-wrap gap-2">
                        {items.map((item) => (
                            <button
                                key={item}
                                onClick={() => toggleSelection(item, setSelected)}
                                className={`px-2 py-1 text-sm font-light border border-zinc-700 rounded-lg ${selected.includes(item)
                                    ? "bg-white text-black"
                                    : "dark:text-zinc-300 text-zinc-700 dark:hover:bg-zinc-700"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                        <button
                            onClick={() => setInputOpen(inputOpen === type ? null : (type as "tags" | "languages"))}
                            className="px-2 py-0.5 text-sm font-light border border-zinc-600 rounded-lg"
                        >
                            <IoMdAdd size={15} />
                        </button>
                        {inputOpen === type && (
                            <div className="w-full h-8 border border-zinc-800 rounded-md px-2 flex items-center">
                                <input
                                    className="outline-none bg-transparent w-full text-sm dark:text-white placeholder:text-zinc-500"
                                    type="text"
                                    placeholder={`Add new ${title.toLowerCase()}`}
                                    value={newItem}
                                    onChange={(e) => setNewItem(e.target.value)}
                                />
                                <button
                                    onClick={() => handleAddItem(type)}
                                    className="p-1 text-zinc-400 dark:hover:text-white"
                                >
                                    Add
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default QuerySection;
