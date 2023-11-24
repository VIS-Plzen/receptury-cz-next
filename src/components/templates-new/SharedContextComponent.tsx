"use client";

import { cn } from "@/utils/cn";
import { createContext, useContext } from "react";

// This pattern is useful, when you want to share some data or information between components, without passing props manually.

// APIS:
// createContext: https://react.dev/reference/react/createContext
// useContext: https://react.dev/reference/react/useContext

// Usage:
// <ParentComponent>
//   <ChildComponent />
// </ParentComponent>

// Creating context
const SharedContext = createContext<boolean>(false);

//
// Child component
type ChildComponentProps = {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export function ChildComponent({
  children,
  className = "",
  ...props
}: ChildComponentProps) {
  const isUsedInParent = useContext(SharedContext);

  return (
    <div className={cn("", className)} {...props}>
      {isUsedInParent ? "Used in parent" : "Not used in parent"}
      {children}
    </div>
  );
}

//
// Parent component
type ParentComponentProps = {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export function ParentComponent({
  children,
  className = "",
  ...props
}: ParentComponentProps) {
  return (
    <SharedContext.Provider value={true}>
      <div className={cn("", className)} {...props}>
        {children}
      </div>
    </SharedContext.Provider>
  );
}
