import { compareDates, returnBetterDate } from "@/utils/dateWorker";
import { cookies } from "next/headers";
import ContentSelector from "./client";

export default function Home({ searchParams }: any) {
  const cookie = cookies();
  const paidTo = cookie.get("paid")?.value;
  const paid = compareDates(paidTo);
  const paidToDate = returnBetterDate(paidTo, ".", "DMY");

  return (
    <>
      {paid && (
        <div
          className={`mt-16 w-full bg-success-600 py-3 text-center text-white md:mt-20`}
        >
          Prémium účet aktivní do: {paidToDate}
        </div>
      )}
      <div
        className={`flex flex-col items-stretch justify-start gap-24 pb-16 ${
          !paid && "mt-20"
        }`}
      >
        <ContentSelector searchParams={searchParams} />
      </div>
    </>
  );
}
