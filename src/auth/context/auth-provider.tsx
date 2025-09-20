"use client";

import React, {createContext, useContext, useEffect, useState} from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { User } from '@/types/user.interface';
import useFetchApi from '@/hooks/useFetchApi';
// import { Loader2 } from 'lucide-react';

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    error: string | null;
    logout: () => void;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    refetchUser: () => void;
    onSignIn: (newToken: string, businessUser: User) => Promise<void>;
}

interface AuthProviderProps {
    children: React.ReactNode
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
    logout: () => {},
    setUser: () => {},
    setError: () => {},
    refetchUser: () => {},
    onSignIn: async () => {}
});

const PUBLIC_ROUTES = ["/auth/login", "/auth/register", "/auth/verify-otp"];

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [user, setUser] = useState<User|null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string|null>(null);
    const [token, setToken] = useState<string|null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    const router = useRouter();
    const pathname = usePathname();

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

    useEffect(() => {
        if(typeof window !== 'undefined'){
            const storedToken = localStorage.getItem('token');
            if(storedToken){
                setToken(storedToken);
                setIsInitialized(false);
            }
        }
    },[]);

    const {data: userData, retrieve: refetchUser} = useFetchApi({
        endpoint: "user/profile",
        cacheEnabled: false,
        retrieveOnMount: !!token,
        refetchOnWindowFocus: !!token,
    })

    useEffect(() => {
      if (token && userData) {
        setUser(userData as User);
        setLoading(false);
      }
    }, [userData, token]);

    const logout = async () => {
        if(typeof window !== "undefined"){
            localStorage.removeItem("token");
        }
        setUser(null);
        setToken(null);
        router.push("/auth/login");
    }

    const onSignIn = async (newToken: string, businessUser: User) => {
        if (typeof window !== "undefined") {
          localStorage.setItem('user', JSON.stringify(businessUser));
          localStorage.setItem('token', newToken);
        }
        setToken(newToken);
        setUser(businessUser);
        router.push("/auth/profile");
    };

    useEffect(() => {
        if (isInitialized && !token && !isPublicRoute) {
          router.push("/auth/login");
        } else if (token && isPublicRoute) {
          router.push("/");
        }
    }, [token, isPublicRoute, router, isInitialized]);

    const value: AuthContextType = {
        isAuthenticated: !!userData && !!token,
        user,
        loading,
        error,
        logout,
        setUser,
        setError,
        refetchUser,
        onSignIn
    }
    
    // if ((!loading || !isInitialized) && !isPublicRoute) {
    //     return (
    //       <div className="min-h-screen flex flex-col items-center justify-center">
    //         <Loader2 className="w-10 h-10 animate-spin" />
    //         <h6>Please wait...</h6>
    //       </div>
    //     );
    // }


    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
}