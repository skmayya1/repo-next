import React, { ChangeEvent, useEffect, useState } from "react";
import { GrSearch } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";

const QuerySection = () => {
    const [tags, setTags] = useState<string[]>([
        "NextJs", "ReactJS", "web3", "Rust", "solana", "ethereum", "blockchain"
    ]);
    const [languages, setLanguages] = useState<string[]>([
        "Python", "C++", "Java", "Go", "Ruby", "Kotlin", "Swift"
    ]);
    const [labels, setLabels] = useState<string[]>([
        "good first issue", "help wanted", "documentation", "bug", "enhancement"
    ]);

    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

    const [newItem, setNewItem] = useState("");
    const [inputOpen, setInputOpen] = useState<"tags" | "languages" | "labels" | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const toggleSelection = (item: string, setSelected: React.Dispatch<React.SetStateAction<string[]>>) => {
        setSelected((prev) =>
            prev.includes(item) ? prev.filter((t) => t !== item) : [...prev, item]
        );
    };

    const handleSearchChange = (e: ChangeEvent) => {
        setSearchQuery((e.target as HTMLInputElement).value);
    };

    const handleAddItem = (type: "tags" | "languages" | "labels") => {
        if (newItem.trim()) {
            const setItem = type === "tags" ? setTags : type === "languages" ? setLanguages : setLabels;
            const updated = type === "tags" ? tags : type === "languages" ? languages : labels;

            if (!updated.includes(newItem)) {
                const newList = [...updated, newItem];
                setItem(newList);
                localStorage.setItem(type, JSON.stringify(newList));
                setNewItem("");
                setInputOpen(null);
            }
        }
    };

    useEffect(() => {
        const storedTags = localStorage.getItem("tags");
        const storedLanguages = localStorage.getItem("languages");
        const storedLabels = localStorage.getItem("labels");

        if (storedTags) setTags(JSON.parse(storedTags));
        if (storedLanguages) setLanguages(JSON.parse(storedLanguages));
        if (storedLabels) setLabels(JSON.parse(storedLabels));
    }, []);

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

            {[
                { title: "Tags", items: tags, selected: selectedTags, setSelected: setSelectedTags, type: "tags" },
                { title: "Languages", items: languages, selected: selectedLanguages, setSelected: setSelectedLanguages, type: "languages" },
                { title: "Labels", items: labels, selected: selectedLabels, setSelected: setSelectedLabels, type: "labels" },
            ].map(({ title, items, selected, setSelected, type }) => (
                <div key={type} className="w-full">
                    <p className="text-sm font-medium text-zinc-400 mb-2">{title}</p>
                    <div className="flex flex-wrap gap-2">
                        {items.map((item) => (
                            <button
                                key={item}
                                onClick={() => toggleSelection(item, setSelected)}
                                className={`px-2 py-1 text-sm font-light border border-zinc-700 rounded-lg ${selected.includes(item)
                                        ? "bg-white text-black"
                                        : "text-zinc-300 hover:bg-zinc-700"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                        <button
                            onClick={() => setInputOpen(inputOpen === type ? null : (type as "tags" | "languages" | "labels"))}
                            className="px-2 py-0.5 text-sm font-light border border-zinc-600 rounded-lg"
                        >
                            <IoMdAdd size={15} />
                        </button>
                        {inputOpen === type && (
                            <div className="w-full h-8 border border-zinc-800 rounded-md px-2 flex items-center">
                                <input
                                    className="outline-none bg-transparent w-full text-sm text-white placeholder:text-zinc-500"
                                    type="text"
                                    placeholder={`Add new ${title.toLowerCase()}`}
                                    value={newItem}
                                    onChange={(e) => setNewItem(e.target.value)}
                                />
                                <button
                                    onClick={() => handleAddItem(type)}
                                    className="p-1 text-zinc-400 hover:text-white"
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
