import { axiosInstance } from '@/utils/axiosInstance';
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

type useFetchApiOptions<T> = {
    endpoint: string;
    resGetter?: (res: AxiosResponse) => T;
    retrieveOnMount?: boolean;
    refetchOnWindowFocus?: boolean;
    refetchOnReconnect?: boolean;
    options?: {
      headers?: Record<string, string>;
      params?: Record<string, string>;
    };
    retry?: number;
    errorOff?: boolean;
    cacheEnabled?: boolean;
};


function useFetchApi<T>({
    endpoint,
    resGetter = (res) => res?.data?.data || res?.data,
    retrieveOnMount = true,
    refetchOnWindowFocus = false,
    refetchOnReconnect = true,
    options,
    retry = 0,
    errorOff,
    cacheEnabled = true,
  }: useFetchApiOptions<T>) {
    const endpointWithAttrsRef = useRef<string | null>(null);
    const [token, setToken] = useState<string | null>("");
  
    useEffect(() => {
      if (typeof window !== "undefined") {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
      }
    }, []);
  
    const {
      data,
      error,
      failureCount,
      isError,
      isFetchedAfterMount,
      isFetching,
      isLoading,
      isStale,
      isSuccess,
      refetch,
      status,
    } = useQuery({
      queryKey: [endpoint],
      queryFn: () => {
        const apiCode = endpointWithAttrsRef.current || endpoint;
  
        if (apiCode) {
          return axiosInstance.get(apiCode, {
            headers: token
              ? {
                  Authorization: `Bearer ` + token,
                }
              : {},
            ...options,
          });
        }
      },
      staleTime: cacheEnabled ? 300000 : 0,
      enabled: retrieveOnMount,
      refetchOnWindowFocus,
      refetchOnReconnect,
      retry,
    });
  
    const handleRefetch = useCallback(() => {
      return new Promise((resolve, reject) => {
        refetch().then(({ data, error }) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      });
    }, [refetch]);
  
    useEffect(() => {
      if (error && !errorOff) {
        const axiosError = error as AxiosError<{ message?: string }>;
        if (axiosError?.response?.data) {
          toast.error(axiosError?.response?.data?.message || "Please Login again");
        }
        if (axios.isAxiosError(error)) {
          if (error?.response?.status === 401) {
            localStorage.clear();
            window.location.href = "auth/signin";
          }
        }
      }
    }, [error, errorOff]);
  
    return {
      data: resGetter(data as AxiosResponse),
      error,
      loading: isLoading,
      retrieve: refetch,
      retrieveWithAttrs: async (endpointWithAttrs: string) => {
        endpointWithAttrsRef.current = endpointWithAttrs;
        return await handleRefetch();
      },
      failureCount,
      isError,
      isFetchedAfterMount,
      isFetching,
      isStale,
      isSuccess,
      status,
    };
  }

export default useFetchApi