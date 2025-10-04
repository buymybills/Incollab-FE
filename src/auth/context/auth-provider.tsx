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
    verificationKey: string | null;
    logout: () => void;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    setVerificationKey: (key: string | null) => void;
    setAccessToken: (token: string, type?: 'influencer' | 'brand') => void;
    refetchUser: () => void;
    onSignIn: (newToken: string, businessUser: User, type: 'influencer' | 'brand') => Promise<void>;
    token: string | null;
}

interface AuthProviderProps {
    children: React.ReactNode
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
    verificationKey: null,
    logout: () => {},
    setUser: () => {},
    setError: () => {},
    setVerificationKey: () => {},
    setAccessToken: () => {},
    refetchUser: () => {},
    onSignIn: async () => {},
    token: null
});

const PUBLIC_ROUTES = ["/auth/login", "/auth/register", "/auth/verify-otp"];

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [user, setUser] = useState<User|null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string|null>(null);
    const [token, setToken] = useState<string|null>(null);
    const [verificationKey, setVerificationKey] = useState<string|null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const [userType, setUserType] = useState<'influencer' | 'brand' | null>(null);

    const router = useRouter();
    const pathname = usePathname();

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

    useEffect(() => {
        if(typeof window !== 'undefined'){
            const storedToken = localStorage.getItem('token');
            const storedUserType = localStorage.getItem('userType') as 'influencer' | 'brand' | null;
            if(storedToken){
                setToken(storedToken);
                setIsInitialized(false);
            }
            if(storedUserType){
                setUserType(storedUserType);
            }
        }
    },[]);

    const {data: userData, retrieve: refetchInfluencerUser} = useFetchApi({
        endpoint: "influencer/profile",
        cacheEnabled: false,
        retrieveOnMount: !!token && userType === 'influencer',
        refetchOnWindowFocus: !!token && userType === 'influencer',
    })

    const {data: brandUserData, retrieve: refetchBrandUser} = useFetchApi({
        endpoint: "brand/profile",
        cacheEnabled: false,
        retrieveOnMount: !!token && userType === 'brand',
        refetchOnWindowFocus: !!token && userType === 'brand',
    })
    
    useEffect(() => {
      if (token && userType === 'influencer' && userData) {
        setUser(userData as User);
        setLoading(false);
      } else if (token && userType === 'brand' && brandUserData) {
        setUser(brandUserData as User);
        setLoading(false);
      }
    }, [userData, brandUserData, token, userType]);

    const setAccessToken = (accessToken: string, type?: 'influencer' | 'brand') => {
        if(typeof window !== "undefined"){
            localStorage.setItem("token", accessToken);
            if(type){
                localStorage.setItem("userType", type);
            }
        }
        setToken(accessToken);
        if(type){
            setUserType(type);
        }
    }

    const logout = async () => {
        if(typeof window !== "undefined"){
            localStorage.removeItem("token");
            localStorage.removeItem("userType");
        }
        setUser(null);
        setToken(null);
        setUserType(null);
        router.push("/auth");
    }

    const onSignIn = async (newToken: string, businessUser: User, type: 'influencer' | 'brand') => {
        if (typeof window !== "undefined") {
          localStorage.setItem('user', JSON.stringify(businessUser));
          localStorage.setItem('token', newToken);
          localStorage.setItem('userType', type);
        }
        setToken(newToken);
        setUser(businessUser);
        setUserType(type);
        router.push("/auth/profile");
    };

    useEffect(() => {
        if (isInitialized && !token && !isPublicRoute) {
          router.push("/auth/login");
        } else if (token && isPublicRoute) {
          router.push("/");
        }
    }, [token, isPublicRoute, router, isInitialized]);

    const refetchUser = () => {
        if(userType === 'influencer'){
            refetchInfluencerUser();
        } else if(userType === 'brand'){
            refetchBrandUser();
        }
    }

    const value: AuthContextType = {
        isAuthenticated: (!!userData || !!brandUserData) && !!token,
        user,
        loading,
        error,
        verificationKey,
        logout,
        setUser,
        setError,
        setVerificationKey,
        setAccessToken,
        refetchUser,
        onSignIn,
        token
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