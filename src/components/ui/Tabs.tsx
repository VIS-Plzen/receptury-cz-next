"use client";

import { cn } from "@/utils/cn";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { forwardRef } from "react";

// Usage:
//
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
//
// <Tabs>
//   <TabsList>
//     <TabsTrigger value="account">Account</TabsTrigger>
//     <TabsTrigger value="settings">Settings</TabsTrigger>
//   </TabsList>
//   <TabsContent value="account">...</TabsContent>
//   <TabsContent value="settings">...</TabsContent>
// </Tabs>

// Tabs Root
const Tabs = TabsPrimitive.Root;

// Tabs List
const TabsList = forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center gap-1 rounded-full border-2 border-primary-200 bg-white p-1",
      className
    )}
    {...props}
  />
));

// Tabs Trigger (button)
const TabsTrigger = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-full px-2.5 py-1.5  transition-all duration-200 sm:px-3.5 sm:py-2",
      "text-sm font-bold sm:text-base lg:text-lg lg:tracking-wide",
      "data-[state=active]:bg-primary data-[state=active]:text-primary-50 data-[state=active]:shadow-sm",
      "disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
));

// Tabs Content
const TabsContent = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("mt-2 w-full", className)}
    {...props}
  />
));

// Display names
TabsList.displayName = TabsPrimitive.List.displayName;
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
TabsContent.displayName = TabsPrimitive.Content.displayName;

// Exports
export { Tabs, TabsContent, TabsList, TabsTrigger };
