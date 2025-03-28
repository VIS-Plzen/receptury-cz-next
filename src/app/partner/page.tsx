import { ArrowRightAltIcon } from "@/components/icons";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import RecipeCardsGrid from "@/components/ui/RecipeCardsGrid";
import StyledLink from "@/components/ui/StyledLink";
import Image from "next/image";
import Katalog from "../Katalog";
import { Partner } from "../receptury/[id]/Client";

export default function Home() {
  return (
    <div className="flex flex-col items-stretch justify-start gap-12 py-32 md:py-48">
      <Partner
        jmeno="Jméno partnera"
        heslo="Heslo partnera, nebo krátký popis jejich služeb"
        img={"/public/images/food.jpeg"}
        color="default"
      />
      <Katalog />
      <Kontakt telefon="+420 774 956 123" email="jmeno.prijmeno@parner.cz" />
      <Top receptury={""} />
      <BrandovyObsah
        title={"Další brandový obsah"}
        text={
          "Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
        }
        img={"/images/food.jpeg"}
      />
    </div>
  );

  function Kontakt({ telefon, email }: { telefon: string; email: string }) {
    return (
      <Container>
        <div className="flex flex-col justify-between gap-5 rounded-2xl border-2 border-secondary-700 bg-secondary-700/15 p-5 md:flex-row md:items-center">
          <Heading as="h2" size="sm">
            Kontaktujte obchodního zástupce
          </Heading>
          <div className="flex flex-col gap-3 divide-secondary-700 whitespace-nowrap sm:flex-row sm:divide-x-2">
            <a href={`tel:${telefon}`} className="flex w-min flex-col">
              <span className="font-semibold">Telefon</span>
              <span className="font-bold text-black">{telefon}</span>
            </a>
            <a href={`mailto:${email}`} className="flex flex-col sm:pl-3">
              <span className="font-semibold">Email</span>
              <span className="font-bold text-black">{email}</span>
            </a>
          </div>
        </div>
      </Container>
    );
  }
  function Top({ receptury }: { receptury: any }) {
    return (
      <Container>
        <div className="flex justify-between">
          <Heading>Naše top receptury</Heading>
          <StyledLink hoverEffect="slide-back" href="" className="text-primary">
            Všechny receptury <ArrowRightAltIcon />
          </StyledLink>
        </div>
        <RecipeCardsGrid length={6} gridView className="flex flex-row" />
      </Container>
    );
  }
  function BrandovyObsah({
    title,
    text,
    img,
    className = "",
  }: {
    title: string;
    text: string;
    img?: any;
    className?: string;
  }) {
    return (
      <Container>
        <div
          className={`flex w-full flex-col justify-between gap-x-5 gap-y-10 rounded-3xl border-2 border-secondary-700 bg-secondary-700/15 p-6 md:flex-row lg:p-8 ${className}`}
        >
          <div className="flex max-w-xl flex-col gap-y-7">
            <Heading>{title}</Heading>
            <p>{text}</p>
            <Button asChild className="my-auto w-min">
              <a href="">Zobrazit více</a>
            </Button>
          </div>
          <div className="mx-auto flex h-[200px] flex-shrink-0 rounded-2xl md:mx-0 md:mb-auto md:h-[275px] md:w-2/6 lg:h-[350px] lg:w-3/6">
            <Image
              src={img}
              alt=""
              width={1000}
              height={500}
              className=" rounded-2xl bg-gray-300 object-cover"
            />
          </div>
        </div>
      </Container>
    );
  }
}
