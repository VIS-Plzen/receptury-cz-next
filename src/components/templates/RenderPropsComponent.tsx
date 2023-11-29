"use client";

import { cn } from "@/utils/cn";
import { useState } from "react";

// This pattern is useful, when you want to expose some internal state, data or functions to the child components.
// usualy render some UI based on that.

// APIS:
// Render props: https://react.dev/reference/react/cloneElement#passing-data-with-a-render-prop

// Usage:
// <RenderPropsComponent>
//   {({ isEnabled, toggleState }) => (
//     <>
//       <button onClick={toggleState}>Click me</button>
//       <p>{isEnabled ? "Enabled" : "Disabled"}</p>
//     </>
//   )}
// </RenderPropsComponent>

type RenderProps = {
  // Define / Edit the render props
  isEnabled: boolean; // Expose internal state
  toggleState: () => void; // Function to toggle state
};

type Props = {
  children?: (renderProps: RenderProps) => React.ReactNode;
  className?: string;
  [key: string]: any;
};

export default function RenderPropsComponent({
  className = "",
  children,
  ...props
}: Props) {
  const [isEnabled, setIsEnabled] = useState(false);

  function toggleState() {
    setIsEnabled((prevIsEnabled) => !prevIsEnabled);
  }

  const renderProps: RenderProps = {
    // Define / Edit the render props
    isEnabled,
    toggleState,
  };

  if (children && typeof children === "function") {
    return children(renderProps);
  }

  return (
    <div className={cn("", className)} {...props}>
      <button onClick={toggleState}>Update the state</button>
      {children}
    </div>
  );
}
