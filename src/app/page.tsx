"use client";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Modal from "@/components/ui/Modal";
import Paginator from "@/components/ui/Paginator";
import RecipeCardsGrid from "@/components/ui/RecipeCardsGrid";
import { useState } from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-stretch justify-start gap-24 py-32 md:py-48">
      <Container className="rounded-3xlpy-52 items-center justify-center text-center">
        <RecipeCardsGrid />
        <PaginatorTester />
        <ModalTester />
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
