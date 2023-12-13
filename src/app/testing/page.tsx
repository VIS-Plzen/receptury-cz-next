"use client";
import MyCombobox from "@/components/forms/Combobox";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import { ModalTester } from "@/components/ui/Modal";

export default function Testing() {
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
  return (
    <div className="min-h-screen pt-40">
      <Container>
        <Heading as="h1" size="2xl" className="text-center">
          Stránka pro testování komponent
        </Heading>
        <Button onClick={readSome}>Zavolej funkci</Button>
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
