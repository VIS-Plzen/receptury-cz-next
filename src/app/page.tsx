"use client";

import Checkbox from "@/components/forms/Checkbox";
import Radio from "@/components/forms/Radio";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Modal from "@/components/ui/Modal";
import Paginator from "@/components/ui/Paginator";
import RecipeCardsGrid from "@/components/ui/RecipeCardsGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useState } from "react";
import IsGridView from "./ViewContext";

export default function Home() {
  const [selectedRadio, setSelectedRadio] = useState("");

  const handleRadioChange = (event: any) => {
    setSelectedRadio(event.target.id);
  };

  const contextValue = true;
  //const res = await backendWorker("12345VIS", "Test");
  return (
    <IsGridView.Provider value={contextValue}>
      <div className="flex flex-col justify-center gap-24 py-32 md:py-48">
        <Container className="space-y-6">
          <Tabs defaultValue="recommended" className="w-[640px]">
            <TabsList>
              <TabsTrigger value="recommended">Doporučené pro vás</TabsTrigger>
              <TabsTrigger value="favorites">Oblíbené</TabsTrigger>
              <TabsTrigger value="new">Nové recepty</TabsTrigger>
            </TabsList>
            <TabsContent value="recommended">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae
              nostrum dicta, unde deserunt, ipsum, quas repudiandae.
            </TabsContent>
            <TabsContent value="favorites">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi
              reiciendis, fugiat dicta inventore magni ut incidunt ipsam
              impedit, veniam recusandae magnam aliquam aliquid earum rem odit.
            </TabsContent>
            <TabsContent value="new">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae
              nostrum dicta, unde deserunt, ipsum, quas repudiandae excepturi
              ullam sapiente nobis veniam eum.
            </TabsContent>
          </Tabs>
          <RecipeCardsGrid />
          <form className="space-y-2">
            <Radio
              name="radio"
              id="1"
              label="Option 1"
              checked={selectedRadio === "1"}
              onChange={handleRadioChange}
            />
            <Radio
              name="radio"
              id="2"
              label="Option 2"
              checked={selectedRadio === "2"}
              onChange={handleRadioChange}
            />
            <Radio
              name="radio"
              id="3"
              label="Option 3"
              checked={selectedRadio === "3"}
              onChange={handleRadioChange}
            />
          </form>
          <form className="space-y-1">
            {/* 
            <Checkbox
              label="Option 1"
              onChange={(checked) => console.log(checked)}
            /> */}
            <Checkbox label="Option 2" onChange={(checked) => checked} />
          </form>
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
