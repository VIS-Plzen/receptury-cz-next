import Inspirace from "./Inspirace";
import Receptury from "./Receptury";
import Spolupracujeme from "./Spolupracujeme";
import VolitelnyObsah from "./VolitelnyObsah";

export default async function Home() {
  // základní fetch kterej chce dodělat

  let data = await readSome();

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
      await fetch(process.env.NEXT_PUBLIC_URL + "/api", {
        method: "POST",
        body: JSON.stringify({
          sid: "12345VIS",
          funkce: "ObecnyDotaz",
          parametry: {
            Tabulka: "Receptury",
            Operace: "Read",
            Limit: 15,
          },
        }),
      })
    ).json();
  }

  return (
    <div className="flex flex-col items-stretch justify-start gap-24 py-32 md:py-48">
      <Inspirace />
      <Receptury className="border-y-2 border-primary-200" initialData={data} />
      <Spolupracujeme />
      <VolitelnyObsah
        title="Volitelný obsah"
        img="/images/food.jpeg"
        text="Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
      />
    </div>
  );
}
