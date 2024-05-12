import ContentSelector from "./client";

export default function Home({ searchParams }: any) {
  return (
    <div className="flex flex-col items-stretch justify-start gap-24 py-32 md:py-48">
      <ContentSelector searchParams={searchParams} />
    </div>
  );
}
