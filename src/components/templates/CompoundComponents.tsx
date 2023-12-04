import { cn } from "@/utils/cn";

// This pattern defines a set of React components that are designed to be used together to form a single, configurable component.

// APIS:
// Compound components: https://kentcdodds.com/blog/compound-components-with-react-hooks

// Usage:
//
// import Compound from "@/components/templates/CompoundComponents";
//
// <Compound.Root>
//   <Compound.First>First</Compound.First>
//   <Compound.Second>Second</Compound.Second>
// </Compound.Root>

// Root component
export function CompoundRoot({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}

// First component
export function CompoundFirst({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}

// Second component
export function CompoundSecond({
  children,
  className = "",
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}

// Export all components as a single object
export const Compound = {
  Root: CompoundRoot,
  First: CompoundFirst,
  Second: CompoundSecond,
};

export default Compound;
