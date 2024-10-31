import Cookies from "universal-cookie";

export function shortenFoodNames(foodNames: string[]) {
  const baseNamesMap = new Map();

  foodNames.forEach((name) => {
    // Identify the base name and significant part
    let baseName = name;

    // Remove specific common suffixes or words that are less significant
    // For example, we can remove "s vejcem", "s sýrem", etc.
    const suffixesToRemove = [
      "s vejcem",
      "s sýrem",
      "s tofu",
      "s ricottou",
      "s jáhlami",
      "s rajčaty",
      "s medvědím česnekem",
      "se zakysanou smetanou",
      "s ředkvičkami",
      "s tvarohem",
      "s cuketou",
      "s lučinou",
      "z červené řepy",
      "z hlávkového červeného zelí",
      "z pečené červené řepy",
      "z pečené mrkve",
      "s vejci",
      "s krabím masem",
      "s vejcem a mozzarellou",
      "s červenou řepou",
      "s cizrnovou nádivkou",
      "s vejcem a strouhaným sýrem",
      "s ovocem a kakaem",
      "s vejcem a jáhlovými vločkami",
      "s kuřecím masem",
      "s krustou ze tří druhů sýra",
      "s kuřecím masem a zeleninou",
      "s kuřecím masem",
      "v kukuřičné krustě se smetanou a sýrem",
      "krémová s bramborami",
      "bílá s muškátovým oříškem",
      "s dýní",
      "se sušeným ovocem",
      "se sýrem žervé",
      "se sýrem",
      "s lučinou a pažitkou",
      "se špenátem",
      "s lučinou a červenými fazolemi",
      "s jogurtem",
      "s tuňákem",
      "s brokolicí",
      "s červenou řepou a jablky",
      "s jablky",
      "s jahodami",
      "s ovocem",
      "z lučiny",
      "krémová s bulgurem",
      "se zelím a rajčaty",
      "s bylinkovými krutony",
      "s chlebovými krutony",
      "se zeleninou",
      "s pohankou a zeleninou",
      "s bramborem",
      "s rýží",
      "s francouzskou zeleninou",
      "s cibulkou",
      "s mrkví a žampiony",
      "s hrachem",
      "s česnekem",
      "s kuskusem",
      "",
    ];

    suffixesToRemove.forEach((suffix) => {
      if (baseName.endsWith(suffix)) {
        baseName = baseName.replace(suffix, "").trim(); // Remove the suffix and trim whitespace
      }
    });

    // Normalize base name (optional, to avoid duplicates due to case sensitivity)
    baseName = baseName.toLowerCase();

    // Add the base name to the map
    if (!baseNamesMap.has(baseName)) {
      baseNamesMap.set(baseName, []);
    }
    baseNamesMap.get(baseName).push(name);
  });

  // Create the shortened list of unique base names
  const shortenedList = Array.from(baseNamesMap.keys()).map(
    (key) => key.charAt(0).toUpperCase() + key.slice(1)
  ); // Capitalize the first letter

  return shortenedList;
}

export function returnExpirationTime(hours: number) {
  const date = new Date();
  date.setTime(date.getTime() + hours * 60 * 60 * 1000);
  return date;
}

export function logOut() {
  if (!window) return;
  const cookies = new Cookies();
  cookies.remove("token", { path: "/" });
  cookies.remove("paid", { path: "/" });
  cookies.remove("name", { path: "/" });
  localStorage.removeItem("userInfo");
  console.log(cookies.getAll());
}
