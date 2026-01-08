"use client";
import { createContext, useContext, useState } from "react";

// Define the updated card type
interface Card {
  Stitky: string[];
  Vlastnosti: {
    Dieta1: string;
    Dieta2: string;
    Dieta3: string;
    DruhPodskupina: string;
    DruhSkupina: string;
    Identita: string;
    Nazev: string;
    Obrazek: string;
    TepelnaUprava: string;
  };
}

// Define context type
interface CardContextType {
  cards: Card[] | "hidden";
  addCard: (card: Card) => void;
  removeCard: (id: string) => void;
  setAllCards: (newCards: Card[]) => void;
  cardsLength: number;
}

// Create context
const CardContext = createContext<CardContextType | null>(null);

// Provider component
export function CardProvider({ children }: { children: React.ReactNode }) {
  const [cards, setCards] = useState<Card[] | "hidden">([]);

  // Function to add a new card
  const addCard = (card: Card) => {
    setCards((prev) => {
      // Check if a card with the same Identita already exists
      if (prev === "hidden") return prev;
      const exists = prev.some(
        (existingCard) =>
          existingCard.Vlastnosti.Identita === card.Vlastnosti.Identita
      );

      if (exists) {
        return prev; // If exists, return the same array (no duplicate added)
      }

      return [...prev, card]; // Otherwise, add the new card
    });
  };

  // Function to remove a card by its Identita
  const removeCard = (id: string) => {
    setCards((prev) => {
      if (prev === "hidden") return prev;
      return prev.filter((card) => card.Vlastnosti.Identita !== id);
    });
  };

  // Function to replace all cards
  const setAllCards = (newCards: Card[]) => {
    setCards(newCards);
  };

  const cardsLength = cards.length;

  return (
    <CardContext.Provider
      value={{ cards, addCard, removeCard, setAllCards, cardsLength }}
    >
      {children}
    </CardContext.Provider>
  );
}

// Custom hook for using the context
export function useCard() {
  const context = useContext(CardContext);
  if (!context) throw new Error("useCard must be used within a CardProvider");
  return context;
}
