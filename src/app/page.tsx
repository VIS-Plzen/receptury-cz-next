"use client";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import RecipeCardsGrid from "@/components/ui/RecipeCardsGrid";
import Modal from "@/components/ui/Modal";
import Paginator from "@/components/ui/Paginator";
import { useState } from "react";

export default async function Home() {
  //const res = await backendWorker("12345VIS", "Test");
  return (
    <div className="flex flex-col items-stretch justify-start gap-24 py-32 md:py-48">
      <RecipeCardsGrid />
      <PaginatorTester />
      <ModalTester />
      <Container className="flex items-center justify-center rounded-3xl bg-primary-600 py-52 text-center">
        <Heading as={"h2"} size="xl" className="text-primary-50">
          Sekce Inspirace na vaření
        </Heading>
      </Container>

      <Container className="flex items-center justify-center rounded-3xl bg-secondary-600 py-52 text-center">
        <Heading as={"h2"} size="xl" className="text-secondary-50">
          Sekce Recepty
        </Heading>
      </Container>

      <Container className="flex items-center justify-center rounded-3xl bg-success-600 py-52 text-center">
        <Heading as={"h2"} size="xl" className="text-success-50">
          Sekce Spolupracujeme
        </Heading>
      </Container>

      <Container className="flex items-center justify-center rounded-3xl bg-warning-600 py-52 text-center">
        <Heading as={"h2"} size="xl" className="text-warning-50">
          Volitelný obsah
        </Heading>
      </Container>
    </div>
  );
}
function PaginatorTester() {
  const [page, setPage] = useState<number>(1);
  const totalPages = 47;
  return (
    <div className="mx-auto flex flex-col">
      <Heading size="2xl" className="mb-5 text-center">
        {page}
      </Heading>
      <Paginator
        currentPage={page}
        totalPages={totalPages}
        onArrowLeft={() => page !== 1 && setPage(page - 1)}
        onArrowRight={() => page !== totalPages && setPage(page + 1)}
        onPageClick={(newPage: number) => setPage(newPage)}
      />
    </div>
  );
}
function ModalTester() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>ukaž modal</button>
      <Modal isOpen={open} setIsOpen={setOpen}></Modal>
    </>
  );
}
