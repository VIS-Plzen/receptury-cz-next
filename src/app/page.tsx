import Button from "@/components/Button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 p-24 text-center">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-4xl lg:text-6xl">
        Receptury - základ projektu
      </h1>
      <p className="mx-auto max-w-prose">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi
        dolores praesentium a minus fuga sequi porro tempora dolor perferendis
        voluptatum!
      </p>
      <Button>Testovací button</Button>
    </main>
  );
}
