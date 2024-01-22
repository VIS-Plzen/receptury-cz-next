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
    label: "Partner 1",
    href: "/",
  },
  {
    label: "Partner 2",
    href: "/",
  },
  {
    label: "Partner 3",
    href: "/",
  },
  {
    label: "Partner 4",
    href: "/",
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
      <footer className="w-full items-center bg-white">
        <Container className="flex items-center justify-start py-[40px] lg:py-[100px]">
          <div className="grid w-full grid-cols-2 text-sm lg:grid-cols-4 lg:gap-[110px] lg:text-lg">
            {/* Navigation */}
            <div className="flex flex-col justify-start pb-[20px] pr-[20px]">
              <Heading as={"h2"} size="sm" hasMarginBottom>
                Navigace
              </Heading>
              <ul className="flex flex-col justify-between">
                {footerRoutes.map((route, i) => (
                  <li key={i} className="py-[10px] font-bold">
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
              <Heading as={"h2"} size="sm" hasMarginBottom>
                Partneři
              </Heading>
              <ul className="flex flex-col justify-between ">
                {partners.map((partner, i) => (
                  <li key={i} className="py-[10px] font-bold">
                    <StyledLink asChild hoverEffect="appear">
                      <Link href={partner.href}>{partner.label}</Link>
                    </StyledLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="flex flex-col justify-start pr-[20px]">
              <Heading as={"h2"} size="sm" hasMarginBottom>
                Kontakt
              </Heading>
              <ul className="flex flex-col ">
                {contacts.map((contact, i) => (
                  <li key={i} className="pt-[10px] font-bold">
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
              <Heading as={"h2"} size="sm" hasMarginBottom>
                Vyhledávání
              </Heading>
              <ul>
                <li className="py-[10px] text-xs">
                  <button
                    onClick={updateDebugModeClickCount}
                    className="mr-1 cursor-default ring-0"
                  >
                    &copy;
                  </button>
                  {currentYear} KnihovnaReceptur.cz
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </footer>
      {/* Debug Modal */}
      <DebugModal isOpen={isDebugModalOpen} setIsOpen={setIsDebugModalOpen} />
    </>
  );
}
