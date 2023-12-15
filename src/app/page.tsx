"use client";
import CheckboxesGroup from "@/components/ui/CheckboxesGroup";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Modal from "@/components/ui/Modal";
import Paginator from "@/components/ui/Paginator";
import RadioButtonsGroup from "@/components/ui/RadioButtonsGroup";
import { useState } from "react";
import IsGridView from "./ViewContext";

export default function Home() {
  const contextValue = true;
  //const res = await backendWorker("12345VIS", "Test");
  return (
    <IsGridView.Provider value={contextValue}>
      <div className="flex flex-col justify-center gap-24 py-32 md:py-48">
        <Container className="space-y-6">
          {/* <RecipeCardsGrid /> */}
          <RadioButtonsGroup />
          <CheckboxesGroup />
        </Container>
        {/* <PaginatorTester /> */}
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
    </IsGridView.Provider>
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
