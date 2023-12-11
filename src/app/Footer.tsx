import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import StyledLink from "@/components/ui/StyledLink";
import dynamic from "next/dynamic";
import Link from "next/link";

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

const MailIcon = dynamic(() => import("@/components/icons/MailIcon"));
const PhoneIphoneIcon = dynamic(
  () => import("@/components/icons/PhoneIphoneIcon")
);
const HomeIcon = dynamic(() => import("@/components/icons/HomeIcon"));

const contacts = [
  {
    label: "info@jidelny.cz",
    icon: <MailIcon />,
    href: "/",
  },
  {
    label: "+420 720 962 105",
    icon: <PhoneIphoneIcon />,
    href: "/",
  },
  {
    label: "Farského 14, Plzeň",
    icon: <HomeIcon />,
    href: "/",
  },
];

export default function Footer() {
  return (
    <footer className="w-full items-center bg-white">
      <Container className="flex items-center justify-center py-[40px] lg:py-[100px]">
        <div className="grid w-full grid-cols-2 text-sm lg:grid-cols-4 lg:gap-[110px] lg:text-lg">
          {/* Navigation */}
          <div className="flex flex-col justify-between pb-[20px] pr-[20px]">
            <Heading as={"h2"} size="sm" className="lg:pb-[20px]">
              Navigace
            </Heading>
            <ul className="flex flex-col justify-between">
              {footerRoutes.map((route) => (
                <li className="py-[10px] font-bold">
                  <StyledLink asChild hoverEffect="appear">
                    <Link href={route.href}>{route.label}</Link>
                  </StyledLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners */}
          <div className="flex flex-col justify-between pb-[20px]">
            <Heading as={"h2"} size="sm" className="lg:pb-[20px]">
              Partneři
            </Heading>
            <ul className="flex flex-col justify-between ">
              {partners.map((partner) => (
                <li className="py-[10px] font-bold">
                  <StyledLink asChild hoverEffect="appear">
                    <Link href={partner.href}>{partner.label}</Link>
                  </StyledLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col justify-start pr-[20px]">
            <Heading as={"h2"} size="sm" className="lg:pb-[20px]">
              Kontakt
            </Heading>
            <ul className="flex flex-col ">
              {contacts.map((contact) => (
                <li className="pt-[10px] font-bold">
                  <StyledLink asChild hoverEffect="appear">
                    <Link href={contact.href}>
                      <div className="">{contact.icon}</div>
                      {contact.label}
                    </Link>
                  </StyledLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Search */}
          <div className="flex flex-col justify-between">
            <Heading as={"h2"} size="sm" className="lg:pb-[20px]">
              Vyhledávání
            </Heading>
            <ul>
              <li className="py-[10px] text-xs">
                © {currentYear} KnihovnaReceptur.cz
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
