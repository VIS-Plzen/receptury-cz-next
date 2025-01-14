import crypto from "crypto";
import Cookies from "universal-cookie";
import { compareDates } from "./dateWorker";

export function shortenFoodNames(foodNames: string[]) {
  const baseNamesMap = new Map();

  foodNames.forEach((name) => {
    // Identify the base name and significant part
    let baseName = name;

    // Remove specific common suffixes or words that are less significant
    // For example, we can remove "s vejcem", "s sýrem", etc.
    const suffixesToRemove = [
      "(bd)",
      "(sd)",
      "(dd)",
      "(bmd)",
      "i.",
      "ii.",
      "na celeru",
      "na smetaně",
      "na kyselo",
      "se sójovým masem",
      "se zeleninou a sýrem",
      "s křenem",
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
}

export function coder(
  key?: string,
  dataString?: string,
  length?: "short" | "long"
) {
  const secretKey = process.env.CDR_KEY;
  if (!secretKey) return { Status: false, error: "No secret key in ENV" };

  let currTime =
    length === "short"
      ? new Date().getTime()
      : new Date("9999-12-30").getTime();
  currTime = Math.floor(currTime / 1000);
  if (key) {
    const decipher = crypto.createDecipher("aes-256-cbc", secretKey);
    let decryptedData = decipher.update(key, "hex", "utf8");
    decryptedData += decipher.final("utf8");
    const splitted = decryptedData.split("&");
    const incTime = parseInt(splitted[splitted.length - 1]);
    if (currTime > incTime + 15) {
      return { Status: false, error: "Time exceeded" };
    } else {
      decryptedData = decryptedData.substring(
        0,
        decryptedData.lastIndexOf("&")
      );
      return { Status: true, data: decryptedData };
    }
  } else {
    if (!dataString) {
      return { Status: false, error: "No KEY or DataString" };
    }

    dataString += "&" + currTime;
    const cipher = crypto.createCipher("aes-256-cbc", secretKey);
    let encryptedData = cipher.update(dataString, "utf8", "hex");
    encryptedData += cipher.final("hex");
    return { Status: true, data: encryptedData };
  }
}

export function useCoderAndCompareDates(paid: string | undefined) {
  if (!paid) return false;
  const coded: any = coder(paid);
  if (!coded.Status) return false;
  return compareDates(coded.data);
}

export function returnPaidTo(data: { paid: boolean; paidTo: string | null }) {
  if (!data.paid) return "false";
  const paidTo = data.paidTo;
  if (paidTo) return paidTo;
  return "2055-01-07T11:29:42+01:00";
}

export const cFalse =
  "9079d9e16c4eddcc223508bfd3253d7c4cb3d6db59bbba2a5d5fd5abc75eda5e";
