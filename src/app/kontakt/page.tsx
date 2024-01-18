"use client";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import StyledLink from "@/components/ui/StyledLink";
import { Disclosure } from "@headlessui/react";

export default function Home() {
  return (
    <div className="flex flex-col items-stretch justify-start gap-24 py-32 md:py-48">
      <Kontakt />
      <FAQ />
    </div>
  );
  function Kontakt() {
    function Column({
      title,
      children,
      className = "",
    }: {
      title: string;
      children: React.ReactNode;
      className?: string;
    }) {
      return (
        <div className={`${className}`}>
          <Heading size="sm" hasMarginBottom>
            {title}
          </Heading>
          <div className="flex flex-col gap-y-3 rounded-xl bg-white px-3 py-5 shadow-xl">
            {children}
          </div>
        </div>
      );
    }
    function Person({
      name,
      job,
      email,
      tel,
    }: {
      name: string;
      job: string;
      email: string;
      tel?: string;
    }) {
      return (
        <div>
          <p className="font-bold">{name}</p>
          <p>{job}</p>
          <div className="flex flex-col">
            <StyledLink
              href={`mailto:${email}`}
              className="whitespace-normal break-all font-bold text-primary"
            >
              {email}
            </StyledLink>
            {tel && (
              <StyledLink
                href={`tel:${tel}`}
                className="font-bold text-primary"
              >
                {tel}
              </StyledLink>
            )}
          </div>
        </div>
      );
    }
    return (
      <Container>
        <Heading as="h1" className="mb-12">
          Kontakty a firemní údaje
        </Heading>
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col gap-y-5">
            <Column title="Tým Knihovna Receptur.cz">
              <div className="flex flex-col">
                <span className="font-semibold">Sekretariát</span>
                <StyledLink
                  href="mailto:info@jidelny.cz"
                  className="font-bold text-primary"
                >
                  info@jidelny.cz
                </StyledLink>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Sídlo</span>
                <StyledLink
                  href="https://maps.app.goo.gl/VhNS1rQfZRGhouGR9"
                  className="font-extrabold"
                  hoverEffect="none"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Farského 14, Plzeň
                </StyledLink>
              </div>
            </Column>
            <Column title="Produkce" className="block md:hidden">
              <Person
                name="Lukáš Doubek"
                job="projektový manažer"
                email="doubek@visplzen.cz"
              />
              <Person
                name="Tereza Ottová"
                job="administrace přihlášek, fakturace"
                email="ottova@visplzen.cz"
                tel="+420 720 962 105"
              />
            </Column>
            <Column
              title="Portál Knihovna Receptur.cz"
              className="block md:hidden"
            >
              <Person
                name="Pavel Ludvík"
                job="redakce, odborný garant"
                email="redakce@jidelny.cz"
              />
              <Person
                name="Michaela Divišová"
                job="redakce"
                email="michaela.divisova@jidelny.cz"
              />
            </Column>
          </div>
          <Column title="Vydavatel">
            <div className="font-bold">
              <p>VIS Plzeň, s.r.o</p>
              <p>Farského 638/14, 326 00 Plzeň</p>
            </div>
            <div>
              <p>IČO:</p>
              <p className="font-bold">45330344</p>
            </div>
            <div>
              <p>DIČ:</p>
              <p className="font-bold">CZ45330344</p>
            </div>
            <div>
              <p>Obchodní resjstřík:</p>
              <p className="font-bold">C 1561/KSPL Krajský soud v Plzni</p>
            </div>
            <div>
              <p>Číslo účtu:</p>
              <p className="font-bold">2700627073/2010 (Fio banka, a.s.)</p>
            </div>
            <div>
              <p>IBAN účtu:</p>
              <p className="font-bold">CZ90 2010 0000 0027 0062 7073</p>
            </div>
            <div>
              <p>BIC kód:</p>
              <p className="font-bold">FIOBCZPPXXX</p>
            </div>
          </Column>
          <Column title="Produkce" className="hidden md:block">
            <Person
              name="Lukáš Doubek"
              job="projektový manažer"
              email="doubek@visplzen.cz"
            />
            <Person
              name="Tereza Ottová"
              job="administrace přihlášek, fakturace"
              email="ottova@visplzen.cz"
              tel="+420 720 962 105"
            />
          </Column>
          <Column
            title="Portál Knihovna Receptur.cz"
            className="hidden md:block"
          >
            <Person
              name="Pavel Ludvík"
              job="redakce, odborný garant"
              email="redakce@jidelny.cz"
            />
            <Person
              name="Michaela Divišová"
              job="redakce"
              email="michaela.divisova@jidelny.cz"
            />
          </Column>
        </div>
      </Container>
    );
  }
  function FAQ() {
    function Disclone({
      title,
      children,
    }: {
      title: string;
      children: React.ReactNode;
    }) {
      return (
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between border-t-2 border-primary-600/30 py-2 text-lg font-bold text-black">
                <span>{title}</span>
                <span className="text-3xl">{open ? "-" : "+"}</span>
              </Disclosure.Button>

              <Disclosure.Panel>{children}</Disclosure.Panel>
            </>
          )}
        </Disclosure>
      );
    }
    return (
      <Container>
        <Heading as="h1" hasMarginBottom>
          FAQ
        </Heading>
        <div className="grid gap-x-5 md:grid-cols-2">
          <div className="w-full space-y-2">
            <Disclone title="Lze toto otevřít?">
              <p>
                Jasně, jde obojí! Dám sem trochu delší text aby to vypadalo
                normálně: Headless UI keeps track of a lot of state about each
                component, like which listbox option is currently selected.
              </p>
            </Disclone>
            <Disclone title="Lze toto otevřít?">
              <p>
                Jasně, jde obojí! Dám sem trochu delší text aby to vypadalo
                normálně: Headless UI keeps track of a lot of state about each
                component, like which listbox option is currently selected.
              </p>
            </Disclone>
          </div>
          <div className="w-full space-y-2">
            <Disclone title="Lze toto otevřít?">
              <p>
                Jasně, jde obojí! Dám sem trochu delší text aby to vypadalo
                normálně: Headless UI keeps track of a lot of state about each
                component, like which listbox option is currently selected.
              </p>
            </Disclone>
            <Disclone title="Lze toto otevřít?">
              <p>
                Jasně, jde obojí! Dám sem trochu delší text aby to vypadalo
                normálně: Headless UI keeps track of a lot of state about each
                component, like which listbox option is currently selected.
              </p>
            </Disclone>
          </div>
        </div>
      </Container>
    );
  }
}
