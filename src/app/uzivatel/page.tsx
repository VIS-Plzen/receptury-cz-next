import { compareDates, returnBetterDate } from "@/utils/dateWorker";
import { cookies } from "next/headers";
import ContentSelector from "./client";

export default function Home({ searchParams }: any) {
  const cookie = cookies();
  const paidTo = cookie.get("paid")?.value;
  const paid = compareDates(paidTo);
  const paidToDate = returnBetterDate(paidTo, ".", "DMY");
  const gridView = cookie.get("gridView")?.value ?? "false";

  return (
    <>
      {paid && (
        <div className={`w-full bg-success-600 py-3 text-center text-white`}>
          Prémium účet aktivní do: {paidToDate}
        </div>
      )}
      <div className={`flex flex-col items-stretch justify-start gap-24 pb-16`}>
        <ContentSelector
          searchParams={searchParams}
          isGridView={gridView === "true"}
        />
      </div>
    </>
  );
}
