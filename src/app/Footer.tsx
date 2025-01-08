"use client";
import { HomeIcon, MailIcon, PhoneIphoneIcon } from "@/components/icons";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import StyledLink from "@/components/ui/StyledLink";
import { useDebugMode } from "@/hooks/useDebugMode";
import DebugModal from "@/utils/DebugModal";
import Link from "next/link";
import { useState } from "react";

const currentYear = new Date().getFullYear();

const footerRoutes = [
  {
    label: "Domů",
    href: "/domu",
  },
  {
    label: "Receptury",
    href: "/receptury",
  },
  {
    label: "Jídelníčky",
    href: "/jidelnicky",
  },
  {
    label: "Kontakt",
    href: "/kontakt",
  },
];

const partners = [
  {
    label: "Bidfood",
    href: "/bidfood",
  },
  {
    label: "Bonduelle",
    href: "/bonduelle",
  },
];

const contacts = [
  {
    label: "info@jidelny.cz",
    icon: MailIcon,
    href: "/",
  },
  {
    label: "+420 720 962 105",
    icon: PhoneIphoneIcon,
    href: "/",
  },
  {
    label: "Farského 14, Plzeň",
    icon: HomeIcon,
    href: "/",
  },
];

export default function Footer() {
  // Debug mode
  const [isDebugModalOpen, setIsDebugModalOpen] = useState(false);
  const { isDebugModeEnabled, updateDebugModeClickCount } = useDebugMode();

  return (
    <>
      <footer className="w-full items-center border-t-2 border-primary-200 bg-white">
        <Container className="flex items-center justify-start py-[40px] print:hidden lg:py-[100px]">
          <div className="grid w-full gap-10 text-sm md:grid-cols-2 lg:grid-cols-4 lg:gap-[110px] lg:text-lg">
            {/* Navigation */}
            <div className="flex flex-col justify-start pb-[20px] pr-[20px]">
              <Heading as={"h2"} size="sm" hasMarginBottom>
                Navigace
              </Heading>
              <ul className="flex flex-col justify-between">
                {footerRoutes.map((route, i) => (
                  <li key={i} className="py-[5px] text-base font-bold">
                    <StyledLink asChild hoverEffect="appear">
                      <Link href={route.href}>{route.label}</Link>
                    </StyledLink>
                  </li>
                ))}
                {isDebugModeEnabled && (
                  <li className="py-[10px] font-bold">
                    <button
                      className="hover:text-primary"
                      onClick={() => setIsDebugModalOpen(true)}
                    >
                      Ladící informace
                    </button>
                  </li>
                )}
              </ul>
            </div>

            {/* Partners */}
            <div className="flex flex-col justify-start pb-[20px]">
              {/*<Heading as={"h2"} size="sm" hasMarginBottom>
                Partneři
              </Heading>
              <ul className="flex flex-col justify-between ">
                {partners.map((partner, i) => (
                  <li key={i} className="py-[5px] text-base font-bold">
                    <StyledLink asChild hoverEffect="appear">
                      <Link href={partner.href}>{partner.label}</Link>
                    </StyledLink>
                  </li>
                ))}
              </ul>*/}
            </div>

            {/* Contact */}
            <div className="flex flex-col justify-start pr-[20px]">
              <Heading as={"h2"} size="sm" hasMarginBottom>
                Kontakt
              </Heading>
              <ul className="flex flex-col ">
                {contacts.map((contact, i) => (
                  <li key={i} className="pt-[5px] text-base font-bold">
                    <StyledLink asChild hoverEffect="appear">
                      <Link href={contact.href}>
                        <contact.icon className="translate-x-0 translate-y-0 transform-gpu" />
                        {contact.label}
                      </Link>
                    </StyledLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Search */}
            <div className="flex flex-col justify-start">
              <ul>
                <li className="py-[5px] text-xs">
                  <button
                    onClick={updateDebugModeClickCount}
                    className="mr-1 cursor-default ring-0"
                  ></button>
                  <p className="text-base">
                    &copy; {currentYear} KnihovnaReceptur.cz
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </Container>
        <Container className="hidden print:block">
          <p className="text-end text-base">
            &copy; {currentYear} KnihovnaReceptur.cz
          </p>
        </Container>
      </footer>
      {/* Debug Modal */}
      <DebugModal isOpen={isDebugModalOpen} setIsOpen={setIsDebugModalOpen} />
    </>
  );
}
