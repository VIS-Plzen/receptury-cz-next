import { cookies } from "next/headers";
import ContentSelector from "./client";

export default function Home({ searchParams }: any) {
  const cookie = cookies();
  const paid = cookie.get("paid")?.value;

  return (
    <>
      <div
        className={`mt-20 w-full py-3 text-center text-white md:mt-24 ${
          paid && paid !== "false" ? "bg-success-600" : "bg-error-600"
        }`}
      >
        {paid && paid !== "false"
          ? "Prémium účet aktivní do: " + paid
          : "Pozor, nemáte aktivní účet prémium!"}
      </div>
      <div className="flex flex-col items-stretch justify-start gap-24 py-16">
        <ContentSelector searchParams={searchParams} />
      </div>
    </>
  );
}
