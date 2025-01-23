"use client";

import { useEffect, useState } from "react";

// Usage:
//
// import useLocalStorage from "@/hooks/useLocalStorage";
// ...
// const [name, setName] = useLocalStorage<string>("key", "initialValue");
// ...
// function handleUpdateName() {
//   setName("new value");
// }
//...

type SetValue<T> = (newValue: T | ((prevValue: T) => T)) => void;
type UseLocalStorageReturn<T> = [T, SetValue<T>];

export const useLocalStorage = <T>(
  key: string,
  initialValue?: T
): UseLocalStorageReturn<T> => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item =
        typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const serializedValue = JSON.stringify(value);
      window.localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.log(error);
    }
  }, [key, value]);

  return [value, setValue];
};
