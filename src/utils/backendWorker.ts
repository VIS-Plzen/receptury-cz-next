export async function backendWorker(
  sid: string,
  funkce: string,
  parametry = "",
  crud?: string,
  where?: string
) {
  try {
    const res = await fetch(
      "https://test.receptury.adelis.cz/APIFrontend.aspx",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Uzivatel: process.env.BE_USER,
          Heslo: process.env.BE_PASSWORD,
          SID: sid,
          Funkce: funkce,
          parametry: parametry,
        }),
      }
    );
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}
