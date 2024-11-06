"use client";
import MyCombobox from "@/components/forms/Combobox";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import { ModalTester } from "@/components/ui/Modal";
import { shortenFoodNames } from "@/utils/shorties";
import { nazvy } from "@/utils/static";

export default function Testing({ params, searchParams }: any) {
  async function createNew() {
    return await (
      await fetch("/api", {
        method: "POST",
        body: JSON.stringify({
          sid: "12345VIS",
          funkce: "ObecnyDotaz",
          parametry: {
            Tabulka: "Receptury",
            Operace: "Create",
          },
          Hodnoty: {
            CisloReceptury: 421112233,
            Druh: "Svačiny Pomazánky sýrové a tvarohové",
            Nazev: "Jidlo",
            Stav: "Rozpracovaná",
          },
        }),
      })
    ).json();
  }
  async function readSome() {
    return await (
      await fetch("/api", {
        method: "POST",
        body: JSON.stringify({
          sid: "12345VIS",
          funkce: "ObecnyDotaz",
          parametry: {
            Tabulka: "Receptury",
            Operace: "Read",
          },
        }),
      })
    ).json();
  }
  async function getData() {
    const result = await readSome();
  }
  async function returnAllNames() {
    const result = await (
      await fetch("/api", {
        method: "POST",
        body: JSON.stringify({
          Sid: "12345VIS",
          Funkce: "Receptury",
          Parametry: {
            Tabulka: "Receptury",
            Operace: "Read",
            Vlastnosti: ["Nazev"],
          },
        }),
      })
    ).json();
    if (!result.Status) return;
    const nazvy = result.Vety.map((veta: any) => veta.Vlastnosti.Nazev);
    console.log(nazvy);
  }
  async function fce() {
    console.log(shortenFoodNames(nazvy));
  }
  return (
    <div className="min-h-screen pt-40">
      <Container>
        <Heading as="h1" size="2xl" className="text-center">
          Stránka pro testování komponent
        </Heading>
        <Button onClick={fce}>Zavolej funkci</Button>
        {/* <RecipeCardsGrid /> */}
        <ModalTester />
        <MyCombobox
          options={["Option 1"]}
          onChange={(value: string) => console.log(value)}
        />
      </Container>
    </div>
  );
}
