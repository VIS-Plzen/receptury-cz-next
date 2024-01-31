"use client";

import { ArrowRightAltIcon } from "@/components/icons";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import StyledLink from "@/components/ui/StyledLink";
import Image from "next/image";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "/src/styles/globals.css";
import "/src/styles/swiper.css";

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
        <Swiper
          spaceBetween={0}
          modules={[Navigation]}
          cssMode={true}
          navigation={true}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            570: {
              slidesPerView: 2,
            },
            820: {
              slidesPerView: 3,
            },
            1120: {
              slidesPerView: 4,
            },
          }}
          className="mySwiper flex items-center justify-center [--swiper-navigation-color:theme(colors.primary.600)] [--swiper-pagination-color:theme(colors.primary.600)]"
        >
          {produkty.map((produkt, index) => (
            <SwiperSlide key={index}>
              <a
                key={index}
                href={produkt.href}
                className="mx-auto flex h-[300px] w-[250px] flex-col gap-y-3 overflow-hidden"
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
}

export default Katalog;
