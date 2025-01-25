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
    QueryData: ({ selectedTags, selectedLanguages, Query }: IQueryData) => void;
    Loading: boolean;
    Error: boolean;
    Page:string
    setPageno: (value: string) => void;
}
interface IQueryData { 
    selectedTags: string[];
    selectedLanguages: string[];
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
    const [Loading, setLoading] = useState(true)
    const [Error, setError] = useState(false)
    const [Page, setPage] = useState('1')
    const setAuthModalOpenHandler = (value: boolean) => {
        setAuthModalOpen(value);
    };
    const setPageno = (value: string) => { 
        setPage(value)
    }
    const setSData = (value: IProject[]) => { 
        setRData(value)
        setLoading(false)
    }
    const setSearchModalOpenHandler = (value: boolean) => {
        setSearchModalOpen(value);
    };

    const QueryData = async ({
        selectedTags = [],
        selectedLanguages ,
        Query = "",
    }: IQueryData) => {
        console.log("Query Data:", { selectedTags, selectedLanguages, Query });
        setError(false)
        const baseUrl = "https://api.github.com/search/repositories?q=";
        const token = process.env.NEXT_PUBLIC_PAT_TOKEN;
        setLoading(true)
        const queryString =
            Query +
            (selectedLanguages.length
                ? selectedLanguages.map((lang) => `+language:${lang}`).join("")
                : "") +
            (selectedTags.length
                ? selectedTags.map((label) => `+topic:${label}`).join("")
                : "");
        console.log("Query String:", queryString);
        
        const url = `${baseUrl}${queryString}&per_page=30&page=${Page}`;

        try {
            const res = await fetch(url, {
                headers: {
                    Authorization: `token ${token}`,
                    Accept: "application/vnd.github+json",
                }
            });
            const data = await res.json();
            console.log("Fetched Data:", data);
            setLoading(false)
            if(!res.ok) return setError(true)
            setRData(data.items)

        } catch (error) {
            console.error("Failed to fetch repositories:", error);
            setError(true)
            setLoading(false)
        }
    };


    return (
        <AuthContext.Provider value={{ AuthModalOpen, SearchModalOpen, setAuthModalOpenHandler, setSearchModalOpenHandler, setSData, RData, QueryData,Page,setPageno,Loading ,Error}}>
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
