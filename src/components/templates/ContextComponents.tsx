"use client";

import { createContext, useContext, useState } from "react";

// APIS:
// createContext: https://react.dev/reference/react/createContext
// useContext: https://react.dev/reference/react/useContext

// Define the context type
type NewContextType = {
  value: string;
  updateValue: (newValue: string) => void;
};

// Create the context
const NewContext = createContext<NewContextType | undefined>(undefined);

// Context provider component
type NewContextProviderProps = {
  children: React.ReactNode;
};

export function NewContextProvider({ children }: NewContextProviderProps) {
  const [value, setValue] = useState<string>("");

  function updateValue(newValue: string) {
    setValue(newValue);
  }

  return (
    <NewContext.Provider value={{ value, updateValue }}>
      {children}
    </NewContext.Provider>
  );
}

// Custom hook for using the context
export function useNewContext() {
  const context = useContext(NewContext);

  if (!context) {
    throw new Error("useNewContext must be used within a NewContextProvider");
  }

  return context;
}
