"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/auth/context/auth-provider";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

export const MainProvider: React.FC<MainProviderProps> = (props) => {
  const { children } = props;
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
        <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};

interface MainProviderProps {
  children: React.ReactNode;
}
