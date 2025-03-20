"use client";

import { ArrowRightAltIcon } from "@/components/icons";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import StyledLink from "@/components/ui/StyledLink";
import Image from "next/image";

import Carousel from "@/components/ui/EmblaCarousel";
import "/src/styles/globals.css";

function Katalog() {
  const produkty = [
    {
      img: "/images/1.jpg",
      title: "Partner BL83SD30 Perfectmix Cook",
      href: "",
    },
    {
      img: "/images/2.jpg",
      title: "Partner BL83SD30 Perfectmix Cook",
      href: "",
    },
    {
      img: "/images/1.jpg",
      title: "Partner BL83SD30 Perfectmix Cook",
      href: "",
    },
    {
      img: "/images/2.jpg",
      title: "Partner BL83SD30 Perfectmix Cook",
      href: "",
    },
    {
      img: "/images/1.jpg",
      title: "Partner BL83SD30 Perfectmix Cook",
      href: "",
    },
    {
      img: "/images/2.jpg",
      title: "Partner BL83SD30 Perfectmix Cook",
      href: "",
    },
    {
      img: "/images/1.jpg",
      title: "Partner BL83SD30 Perfectmix Cook",
      href: "",
    },
    {
      img: "/images/2.jpg",
      title: "Partner BL83SD30 Perfectmix Cook",
      href: "",
    },
  ];
  return (
    <Container>
      <div>
        <div className="flex justify-between pb-6">
          <Heading>Katalog produktů</Heading>
          <StyledLink hoverEffect="slide-back" href="" className="text-primary">
            Web partnera
            <ArrowRightAltIcon />
          </StyledLink>
        </div>
        <Carousel
          hasArrows
          options={{ align: "start" }}
          className="flex w-[calc(100%-64px)] justify-center overflow-visible!"
          slidesWidth="flex-slides1 min-[500px]:flex-slides2 min-[768px]:flex-slides3 min-[1024px]:flex-slides4"
          slides={produkty.map((produkt, index) => (
            <a
              key={index}
              href={produkt.href}
              className="flex h-[300px] flex-col gap-y-3 overflow-hidden px-5"
            >
              <div className="relative h-4/5">
                <Image
                  src={produkt.img}
                  alt={""}
                  fill
                  className="rounded-xl object-cover"
                />
              </div>
              <span className="mt-auto text-sm font-bold text-black">
                {produkt.title}
              </span>
            </a>
          ))}
        />
      </div>
    </Container>
  );
}

export default Katalog;
