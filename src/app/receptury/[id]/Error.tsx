"use client";
import NotFound from "@/app/not-found";
import { useEffect } from "react";

export function ErrorPage({ shared }: { shared: boolean }) {
  useEffect(() => {
    if (!shared) return;
    setTimeout(() => {
      const el = document.getElementById("slt1");
      if (!el) return;
      el.textContent = "Nepodařilo se získat";
    }, 200);
  }, [shared]);

  return (
    <NotFound
      error=" "
      header="Recepturu se nepodařilo získat"
      paragraf="Sdílený kód odkazující na recepturu je již propadlý, nebo se recepturu nepodařilo vyhledat."
    />
  );
}
