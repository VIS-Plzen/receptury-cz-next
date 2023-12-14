"use client";

import Badge from "@/components/ui/Badge";
import ButtonIcon from "@/components/ui/ButtonIcon";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";

export default function Home() {
  return (
    <div className="flex flex-col items-stretch justify-start gap-24 py-32 md:py-48">
      <Hero />
    </div>
  );
}

function Hero() {
  const icons: {
    name:
      | "archive"
      | "calendar-view-months"
      | "downloading"
      | "favorite-fill"
      | "favorite"
      | "list"
      | "print"
      | "rate-review"
      | "share"
      | "visibility"
      | "visibility-off";
    label: string;
    onClick: () => void;
  }[] = [
    {
      name: "favorite",
      label: "oblíbené",
      onClick: () => console.log("oblíbené"),
    },
    {
      name: "share",
      label: "sdílet",
      onClick: () => console.log("sdílet"),
    },
    {
      name: "print",
      label: "tisk",
      onClick: () => console.log("tisk"),
    },
    {
      name: "archive",
      label: "MSklad",
      onClick: () => console.log("MSklad"),
    },
    {
      name: "downloading",
      label: ".PDF",
      onClick: () => console.log(".PDF"),
    },
    {
      name: "downloading",
      label: ".XLS",
      onClick: () => console.log(".XLS"),
    },
  ];
  return (
    <Container className="relative flex flex-col gap-y-3 rounded-3xl border border-primary-600/30 bg-white pb-4 md:flex-row-reverse md:justify-between md:gap-x-7 md:!pr-0 md:pb-0">
      <div className="mx-auto h-[200px] w-[300px] rounded-2xl bg-secondary-700 md:mx-0 md:mb-auto md:h-[275px] md:w-[275px] lg:h-[350px] lg:w-[750px]"></div>
      <div className="flex flex-col gap-y-5 p-3 md:max-w-[450px] md:px-0 md:pt-8">
        <div className="flex flex-col gap-y-3 md:flex-col-reverse">
          <div className="flex gap-x-2">
            <span className="flex items-center rounded-md bg-primary-300/30 px-2 font-bold text-black">
              Logo
            </span>
            <span>
              Tento recept pro vás připravila společnost Jméno partnera
            </span>
          </div>
          <Heading as="h1">
            Sumeček v parmazánovém těstíčku s bramborovou kaší
          </Heading>
        </div>
        <div className="flex gap-x-1.5">
          <Badge>Ryby a mořské plody</Badge>
          <Badge>Bezmléčná dieta</Badge>
        </div>
        <div className="absolute right-5 top-5 flex gap-x-3 md:static">
          {icons.map((icon) => (
            <div
              className={`${
                icon.name === "share" || icon.name === "favorite"
                  ? "flex"
                  : "hidden md:flex"
              } w-min flex-col items-center text-center`}
            >
              <ButtonIcon onClick={icon.onClick} icon={icon.name}></ButtonIcon>
              <span className="hidden text-sm font-bold md:block">
                {icon.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
