import crypto from "crypto";
import Cookies from "universal-cookie";
import { compareDates } from "./dateWorker";
import { filtrMenu, groupsData } from "./static";

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
  const secretKey = process.env.NEXT_PUBLIC_CDR_KEY;
  if (!secretKey) return { Status: false, error: "No secret key in ENV" };

  // Ensure the key is the right length for AES-256-CBC (32 bytes)
  const keyHash = crypto
    .createHash("sha256")
    .update(String(secretKey))
    .digest();
  const fixedKey = keyHash.subarray(0, 32);

  let currTime =
    length === "short"
      ? new Date().getTime()
      : new Date("9999-12-30").getTime();
  currTime = Math.floor(currTime / 1000);
  if (key) {
    try {
      // Extract IV from the beginning of the encrypted data
      const iv = Buffer.from(key.substring(0, 32), "hex");
      const encryptedText = key.substring(32);

      const decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        fixedKey as any,
        iv as any
      );
      let decryptedData = decipher.update(encryptedText, "hex", "utf8");
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
    } catch (error) {
      return { Status: false, error: "Wrong key format." };
    }
  } else {
    if (!dataString) {
      return { Status: false, error: "No KEY or DataString" };
    }

    dataString += "&" + currTime;

    // Generate a random IV
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      fixedKey as any,
      iv as any
    );
    let encryptedData = cipher.update(dataString, "utf8", "hex");
    encryptedData += cipher.final("hex");

    // Prepend the IV to the encrypted data
    const result = iv.toString("hex") + encryptedData;
    return { Status: true, data: result };
  }
}

export function codeAndCompareDates(paid: string | undefined) {
  if (!paid) return false;
  const coded: any = coder(paid);
  if (!coded.Status) return false;
  return compareDates(coded.data);
}

export function returnPaidTo(data: { paid: boolean; paidTo: string | null }) {
  if (!data.paid) return "false";
  if (!data.paidTo) return infiniteDate;
  if (!compareDates(data.paidTo)) return "false";
  return data.paidTo;
}

export const cFalse =
  "9079d9e16c4eddcc223508bfd3253d7c4cb3d6db59bbba2a5d5fd5abc75eda5e";

export const infiniteDate = "2099-01-01T01:01:01+01:00";

export function getProxiedImageUrl(imageUrl: string | undefined) {
  if (
    !imageUrl ||
    imageUrl.replaceAll("/", "") === process.env.NEXT_PUBLIC_URL_BLOCK
  )
    return null;
  const encodedUrl = encodeURIComponent(imageUrl);
  return `/api/image?url=${encodedUrl}`;
}

export function returnGroups(searchParams: any) {
  if (!searchParams.skupina) return [undefined, undefined];
  let skup = groupsData.find((group) => group.value === searchParams.skupina);
  if (!skup) return [undefined, undefined];

  if (!searchParams.podskupina) return [skup.title, undefined];
  let podskup = skup.options.find(
    (subgroup) => subgroup.value === searchParams.podskupina
  );
  if (!podskup) return [skup.title, undefined];
  return [skup.title, podskup.title];
}

export function returnSideBarValues(searchParams: any, boxSettings: any) {
  let holder: {
    title: string;
    name: string;
    backend: string;
    options: {
      title: string;
      name: string;
      checked: boolean;
      disabled?: boolean;
      backend?: string;
    }[];
  }[] = structuredClone(filtrMenu);

  if (searchParams) {
    Object.keys(searchParams).forEach((key) => {
      const values = searchParams[key].split(",");
      const box = holder.find((b) => b.name === key);
      if (box && Array.isArray(values)) {
        if (box.name === "obecne") {
          const option = box.options.find((o) => o.name === values[0]);
          if (option) option.checked = true;
        } else {
          values.forEach((v) => {
            const option = box.options.find((o) => o.name === v);
            if (option) option.checked = true;
          });
        }
      }
    });
  }
  if (boxSettings) {
    holder.forEach((box) =>
      box.options.forEach((boxValue) => {
        const valueName = boxValue.name;
        if (boxSettings.initialTrue?.includes(valueName))
          boxValue.checked = true;
        if (boxSettings.disabledValues?.includes(valueName))
          boxValue.disabled = true;
      })
    );
  }
  const obecne = holder.find((setting) => setting.name === "obecne");
  if (obecne) {
    const obecneSelected = obecne.options.some((box) => box.checked);
    if (!obecneSelected) {
      const obecneVse = obecne.options.find((box) => box.name === "vse");
      if (obecneVse) obecneVse.checked = true;
    }
  }
  return holder;
}

export function returnComboBoxValues(
  searchParams: any,
  suroviny: any,
  nazvy: any
) {
  const holder = [
    {
      title: "Dle receptury",
      name: "receptura",
      value: "",
      options: nazvy,
    },
    {
      title: "Dle suroviny",
      name: "surovina",
      value: "",
      options: suroviny,
    },
  ];
  // Načte hodnoty z URL
  if (searchParams) {
    Object.keys(searchParams).forEach((key) => {
      const comboBox = holder.find((b) => b.name === key);
      const values = searchParams[key].split(",");
      if (comboBox) {
        comboBox.value = values[0];
      }
    });
  }
  return holder;
}

export function returnFilterBase(
  searchParams: any,
  boxSettings: any,
  suroviny: any,
  nazvy: any
) {
  const [selectedGroup, selectedSubgroup] = returnGroups(searchParams);
  const sideBarValues = returnSideBarValues(searchParams, boxSettings);
  const comboBoxValues = returnComboBoxValues(searchParams, suroviny, nazvy);

  return {
    selectedGroup,
    selectedSubgroup,
    sideBarValues,
    comboBoxValues,
  };
}
