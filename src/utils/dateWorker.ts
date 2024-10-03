export function compareDates(date?: string) {
  if (!date) return false;

  const tested = new Date(date);
  if (!tested) return false;

  const now = new Date().getTime();

  if (tested.getTime() > now) {
    return true;
  } else {
    return false;
  }
}

import { isValid, parse, parseISO } from "date-fns";

export default function prettyDay(
  date: string,
  dateType: "short" | "middle" | "long",
  lang: "CZ" | "SK" | "EN",
  withoutWords?: boolean
) {
  if (!date) return "";
  if (!date.includes(".")) {
    if (date.includes("-")) {
      date =
        date.split("-")[2] +
        "." +
        date.split("-")[1] +
        "." +
        date.split("-")[0];
    } else {
      const year = date.substring(0, 4);
      const month = date.substring(4, 6);
      const day = date.substring(6, 8);
      date = `${day}.${month}.${year}`;
    }
  }
  const dateTyped =
    lang === "EN"
      ? dateType === "short" || dateType === "middle"
        ? date.split(".")[0] + "/" + date.split(".")[1]
        : date.split(".")[0] +
          "/" +
          date.split(".")[1] +
          "/" +
          parseInt(date.split(".")[2])
      : dateType === "short" || dateType === "middle"
        ? parseInt(date.split(".")[0]) +
          ". " +
          parseInt(date.split(".")[1]) +
          "."
        : parseInt(date.split(".")[0]) +
          ". " +
          parseInt(date.split(".")[1]) +
          ". " +
          parseInt(date.split(".")[2]);

  if (withoutWords) return dateTyped;
  return bigSwitcher(date, dateType, lang) + dateTyped;
}

export function bigSwitcher(
  date: string,
  dateType: "short" | "middle" | "long",
  lang: "CZ" | "SK" | "EN"
) {
  let d: any = dateToJSDate(date);

  d = d.getDay();

  if (lang === "CZ") {
    switch (d) {
      case 1:
        return dateType === "short" ? "Po " : "Pondělí ";
      case 2:
        return dateType === "short" ? "Út " : "Úterý ";
      case 3:
        return dateType === "short" ? "St " : "Středa ";
      case 4:
        return dateType === "short" ? "Čt " : "Čtvrtek ";
      case 5:
        return dateType === "short" ? "Pá " : "Pátek ";
      case 6:
        return dateType === "short" ? "So" : "Sobota ";
      case 0:
        return dateType === "short" ? "Ne " : "Neděle ";
    }
  }
  if (lang === "SK") {
    switch (d) {
      case 1:
        return dateType === "short" ? "Po " : "Pondelok ";
      case 2:
        return dateType === "short" ? "Ut " : "Utorok ";
      case 3:
        return dateType === "short" ? "St " : "Streda ";
      case 4:
        return dateType === "short" ? "Št " : "Štvrtok ";
      case 5:
        return dateType === "short" ? "Pi " : "Piatok ";
      case 6:
        return dateType === "short" ? "So" : "Sobota ";
      case 0:
        return dateType === "short" ? "Ne " : "Nedeľa ";
    }
  }
  if (lang === "EN") {
    switch (d) {
      case 1:
        return dateType === "short" ? "Mon " : "Monday ";
      case 2:
        return dateType === "short" ? "Tue " : "Tuesday ";
      case 3:
        return dateType === "short" ? "Wed " : "Wednesday ";
      case 4:
        return dateType === "short" ? "Thu " : "Thursday ";
      case 5:
        return dateType === "short" ? "Fri " : "Friday ";
      case 6:
        return dateType === "short" ? "Sat " : "Saturday  ";
      case 0:
        return dateType === "short" ? "Sun " : "Sunday ";
    }
  }
  return "!e,l:" + lang + ",d:" + d + ",d2:" + date + " ";
}

export function dateToEng(date: string) {
  const arr = date.split(".");
  return arr[2] + "-" + arr[1] + "-" + arr[0];
}

export function dateToJSDate(date: string) {
  if (date.includes(".")) {
    const [day, month, year] = date.split(".");
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }
  if (date.includes("-")) {
    const [year, month, day] = date.split("-");
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  } else {
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }
}

export function valiDate(value: string | Date, returnDate: boolean) {
  if (value === "") {
    if (!returnDate) return false;
    return value;
  }
  if (value instanceof Date) {
    if (!returnDate) return true;
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  }
  try {
    let parsedDate = parse(value, "dd.MM.yyyy", new Date());
    if (!isValid(parsedDate)) {
      parsedDate = new Date(value);
      if (!isValid(parsedDate)) {
        parsedDate = parseISO(value);
        if (!isValid(parsedDate)) {
          return false;
        }
      }
    }
    if (!returnDate) return true;
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const day = String(parsedDate.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  } catch (error) {
    return false;
  }
}

export function returnBetterDate(
  date: string | Date | undefined,
  splitDateChar = ".",
  returnStyle: "YMD" | "YDM" | "DMY" | "DYM" | "MYD" | "MDY" = "DMY",
  hasZeros = false
) {
  if (!date) return "No date!";
  const validated = valiDate(date, true);
  if (!validated) return date.toString();

  if (typeof validated === "string") {
    switch (returnStyle) {
      case "YMD":
        date =
          validated.substring(0, 4) +
          splitDateChar +
          (hasZeros
            ? validated.substring(4, 6)
            : parseInt(validated.substring(4, 6))) +
          splitDateChar +
          (hasZeros
            ? validated.substring(6, 8)
            : parseInt(validated.substring(6, 8)));
        break;
      case "YDM":
        date =
          validated.substring(0, 4) +
          splitDateChar +
          (hasZeros
            ? validated.substring(6, 8)
            : parseInt(validated.substring(6, 8))) +
          splitDateChar +
          (hasZeros
            ? validated.substring(4, 6)
            : parseInt(validated.substring(4, 6)));
        break;
      case "DMY":
        date =
          (hasZeros
            ? validated.substring(6, 8)
            : parseInt(validated.substring(6, 8))) +
          splitDateChar +
          (hasZeros
            ? validated.substring(4, 6)
            : parseInt(validated.substring(4, 6))) +
          splitDateChar +
          validated.substring(0, 4);
        break;
      case "DYM":
        date =
          (hasZeros
            ? validated.substring(6, 8)
            : parseInt(validated.substring(6, 8))) +
          splitDateChar +
          validated.substring(0, 4) +
          splitDateChar +
          (hasZeros
            ? validated.substring(4, 6)
            : parseInt(validated.substring(4, 6)));
        break;
      case "MDY":
        date =
          (hasZeros
            ? validated.substring(4, 6)
            : parseInt(validated.substring(4, 6))) +
          splitDateChar +
          (hasZeros
            ? validated.substring(6, 8)
            : parseInt(validated.substring(6, 8))) +
          splitDateChar +
          validated.substring(0, 4);
      case "MYD":
        date =
          (hasZeros
            ? validated.substring(4, 6)
            : parseInt(validated.substring(4, 6))) +
          splitDateChar +
          validated.substring(0, 4) +
          splitDateChar +
          (hasZeros
            ? validated.substring(6, 8)
            : parseInt(validated.substring(6, 8)));
        break;
    }
    return date;
  }
  return "Nepovedlo se převést";
}

export function returnTimeStamp() {
  const dateTime = new Date().toLocaleString("cs-CZ", {
    timeZone: "Europe/Prague",
    hour12: false,
  });
  const middleSpace = dateTime.lastIndexOf(" ");
  const date = dateTime.substring(0, middleSpace);
  const time = dateTime.substring(middleSpace);
  let [day, month, year] = date.split(".");
  day = day.replaceAll(" ", "").padStart(2, "0");
  month = month.replaceAll(" ", "").padStart(2, "0");
  year = year.replaceAll(" ", "");
  let [hour, minute, second] = time.split(":");
  hour = hour.replaceAll(" ", "").padStart(2, "0");
  minute = minute.replaceAll(" ", "").padStart(2, "0");
  second = second.replaceAll(" ", "").padStart(2, "0");

  const dateComplete = year + month + day + hour + minute + second;
  return dateComplete;
}

export function convertTimeStamp(value: string) {
  const date = value.substring(0, 8);
  const time = value.substring(8).replace(/(..)(..)(..)/, "$1:$2:$3");

  return time + " " + returnBetterDate(date, ".", "DMY");
}
