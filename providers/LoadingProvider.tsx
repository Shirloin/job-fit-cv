'use client'
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

interface LoadingContextProps {
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
}

export const useLoading = () => {
  return useContext(LoadingContext);
};

const LoadingContext = createContext<LoadingContextProps>({
  isLoading: false,
  setIsLoading: () => { },
});

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  const value = useMemo(() => ({ isLoading, setIsLoading }), [isLoading, setIsLoading]);
  return (
    <>
      <LoadingContext.Provider value={value}>
        {children}
      </LoadingContext.Provider>
    </>
  );
}
