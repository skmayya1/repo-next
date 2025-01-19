"use client"
import { IProject } from '@/Components/Shining';
import { createContext, ReactNode, useContext, useState } from 'react';

interface AuthContextProps {
    AuthModalOpen: boolean;
    setAuthModalOpenHandler: (value: boolean) => void;
    SearchModalOpen: boolean;
    setSearchModalOpenHandler: (value: boolean) => void;
    setSData: (value: IProject[]) => void;
    RData: IProject[];
    QueryData: ({ selectedTags, selectedLanguages, selectedLabels, Query }: IQueryData) => void;
    Loading: boolean;
    Error: boolean;
}
interface IQueryData { 
    selectedTags: string[];
    selectedLanguages: string[];
    selectedLabels: string[];
    Query: string;
}
interface AuthProviderProps {
    children: ReactNode;
}


const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: AuthProviderProps) => {
    const [AuthModalOpen, setAuthModalOpen] = useState<boolean>(false);
    const [SearchModalOpen, setSearchModalOpen] = useState<boolean>(false);
    const [RData, setRData] = useState<IProject[]>([])
    const [Loading, setLoading] = useState(false)
    const [Error, setError] = useState(false)
    const setAuthModalOpenHandler = (value: boolean) => {
        setAuthModalOpen(value);
    };
    const setSData = (value: IProject[]) => { 
        setRData(value)
    }
    const setSearchModalOpenHandler = (value: boolean) => {
        setSearchModalOpen(value);
    };
    const QueryData = async ({
        selectedTags = [],
        selectedLanguages ,
        selectedLabels ,
        Query = "react",
    }: IQueryData) => {
        console.log("Query Data:", { selectedTags, selectedLanguages, selectedLabels, Query });
        if (!Query && !selectedLanguages.length && !selectedLabels.length) {
            console.error("Query, languages, or labels must be provided");
            setError(true)
            return;
        }
        
        const baseUrl = "https://api.github.com/search/repositories?q=";
        const token = process.env.PAT_TOKEN;
        setLoading(true)
        const queryString =
            Query +
            (selectedLanguages.length
                ? selectedLanguages.map((lang) => `+language:${lang}`).join("")
                : "") +
            (selectedLabels.length
                ? selectedLabels.map((label) => `+topic:${label}`).join("")
                : "");
        console.log("Query String:", queryString);
        
        const url = `${baseUrl}${queryString}&per_page=100`;

        try {
            const res = await fetch(url, {
                headers: {
                    Authorization: `token ${token}`  // Corrected here
                }
            });
            if (!res.ok) {
                console.log(`Error: ${res.status} - ${res.statusText}`);
                
            }
            const data = await res.json();
            console.log("Fetched Data:", data);
            setRData(data.items)
            setLoading(false)
        } catch (error) {
            console.error("Failed to fetch repositories:", error);
            setError(true)
            setLoading(false)
        }
    };


    return (
        <AuthContext.Provider value={{ AuthModalOpen,SearchModalOpen,setAuthModalOpenHandler,setSearchModalOpenHandler ,setSData, RData ,QueryData,Loading ,Error}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
