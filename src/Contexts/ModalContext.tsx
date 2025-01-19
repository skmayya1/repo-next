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
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: AuthProviderProps) => {
    const [AuthModalOpen, setAuthModalOpen] = useState<boolean>(false);
    const [SearchModalOpen, setSearchModalOpen] = useState<boolean>(false);
    const [RData, setRData] = useState<IProject[]>([])
    const setAuthModalOpenHandler = (value: boolean) => {
        setAuthModalOpen(value);
    };
    const setSData = (value: IProject[]) => { 
        setRData(value)
    }
    const setSearchModalOpenHandler = (value: boolean) => {
        setSearchModalOpen(value);
    };
    return (
        <AuthContext.Provider value={{ AuthModalOpen,SearchModalOpen,setAuthModalOpenHandler,setSearchModalOpenHandler ,setSData, RData}}>
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
