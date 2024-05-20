"use client";

import Logo from "@/components/brand/Logo";
import { ExpandMoreIcon } from "@/components/icons";
import Avatar from "@/components/ui/Avatar";
import Container from "@/components/ui/Container";
import StyledLink from "@/components/ui/StyledLink";
import { cn } from "@/utils/cn";
import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const menuRoutes = [
  {
    label: "Hlavní strana",
    href: "/",
  },
  {
    label: "Bidfood",
    href: "/bidfood",
  },
  {
    label: "Bonduelle",
    href: "/bonduelle",
  },
  {
    label: "Kontakt",
    href: "/kontakt",
  },
];

type DropdownItem = {
  label: string;
  href: string;
};

const dropdownData: DropdownItem[] = [
  { label: "Osobní informace", href: "/uzivatel?obsah=informace" },
  { label: "Oblíbené receptury", href: "/uzivatel?obsah=receptury" },
];

// Hihlights link with href matching current url
export function ActiveNavLink({
  activeClassName = "",
  className = "",
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  activeClassName: string;
  className?: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === props.href;

  return (
    <StyledLink
      asChild
      hoverEffect="color"
      className={cn(className, isActive && activeClassName)}
    >
      <Link {...props} />
    </StyledLink>
  );
}

function BurgerButton({
  isOpen,
  onClick,
  className = "",
}: {
  isOpen: boolean;
  onClick: () => void;
  className: string;
}) {
  return (
    <button
      aria-label="Otevřít / zavřít menu"
      className={cn(
        "group relative z-offcanvas-above flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-xl",
        className
      )}
      onClick={onClick}
    >
      <span
        className={clsx(
          "h-0.5 w-7 origin-center transform-gpu rounded-full bg-gray-900 transition duration-300 ease-out-back",
          isOpen && "translate-y-[7px] -rotate-45"
        )}
      />
      <span
        className={clsx(
          "h-0.5 w-7 origin-center transform-gpu rounded-full bg-gray-900 transition duration-300 ease-out-back",
          isOpen && "opacity-0"
        )}
      />
      <span
        className={clsx(
          "h-0.5 w-7 origin-center transform-gpu rounded-full bg-gray-900 transition duration-300 ease-out-back",
          isOpen && "translate-y-[-7px] rotate-45"
        )}
      />
    </button>
  );
}

function DropdownMenu({ dropdownItems }: { dropdownItems: DropdownItem[] }) {
  const [mounted, setMounted] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  useEffect(() => setRefresh(!refresh), [pathname]);

  if (!mounted) return null;

  const cookies = new Cookies();
  const name = cookies.get("name");
  const token = cookies.get("token");
  const paid = cookies.get("paid");
  const prepaid = token && paid;

  if (!token)
    return (
      <ul className="hidden gap-x-4 lg:flex">
        <li>
          <ActiveNavLink
            href={"/prihlaseni"}
            className="text-sm font-semibold 2xl:text-base"
            activeClassName="text-primary"
          >
            Přihlásit se
          </ActiveNavLink>
        </li>
        <li>
          <ActiveNavLink
            href={"/registrace"}
            className="text-sm font-semibold 2xl:text-base"
            activeClassName="text-primary"
          >
            Registrovat
          </ActiveNavLink>
        </li>
      </ul>
    );

  return (
    <Menu as="div" className="relative hidden text-left lg:block">
      <Menu.Button className="rounded-lg p-1">
        <div className="flex w-56 cursor-pointer items-center justify-start gap-2">
          <Avatar size="sm" loading="eager" name={name} />
          <span className="mr-auto block font-semibold leading-tight">
            {name}
          </span>
          <ExpandMoreIcon className={cn("shrink-0")} />
        </div>
      </Menu.Button>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 top-full z-10 mt-4 flex w-full flex-col overflow-hidden rounded-2xl border-2 border-primary-200 bg-white shadow-xl">
          <div className="flex flex-col">
            {dropdownItems.map((item: DropdownItem, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <a
                    className={`${active && "bg-primary-100"} rounded-xl p-2`}
                    href={item.href}
                  >
                    {item.label}
                  </a>
                )}
              </Menu.Item>
            ))}
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active && "bg-primary-100"
                  } rounded-xl p-2 text-left`}
                  onClick={() => {
                    cookies.remove("paid");
                    cookies.remove("token");
                    cookies.remove("name");
                    localStorage.removeItem("userInfo");
                    router.push("/prihlaseni", { swallow: false });
                  }}
                >
                  Odhlásit se
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              <button
                className={`${
                  prepaid ? "bg-success-600" : "bg-error-600"
                } px-2 py-1 text-left font-medium text-white`}
              >
                {prepaid ? "Členství aktivní" : "Členství vypršelo!"}
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function TouchMenu({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  // Prevents scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add(
        "overflow-hidden",
        "relative",
        "h-full",
        "touch-none"
      );
    } else {
      document.body.classList.remove(
        "overflow-hidden",
        "relative",
        "h-full",
        "touch-none"
      );
    }
  }, [isOpen, setIsOpen]);

  // Closes the menu when user navigates to another page
  // however it will close the menu after the page is loaded and not immediately
  // (depends on the url)
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const cookies = new Cookies();

  const router = useRouter();
  const name = cookies.get("name");

  const token = cookies.get("token");
  const paid = cookies.get("paid");
  const prepaid = token && paid;

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams, setIsOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.15, ease: [0.33, 1, 0.68, 1] },
            }}
            className="fixed inset-0 z-offcanvas min-h-screen w-screen bg-white"
          >
            <Container className="pt-28">
              <motion.ul className="flex flex-col gap-4">
                {menuRoutes.map((route) => (
                  <li key={route.href}>
                    <ActiveNavLink
                      href={route.href}
                      className="text-xl font-bold"
                      activeClassName="text-primary"
                    >
                      {route.label}
                    </ActiveNavLink>
                  </li>
                ))}
              </motion.ul>

              {cookies.get("token") ? (
                <div className="mt-8 flex flex-col">
                  <div className="flex w-56 cursor-pointer items-center justify-start gap-2">
                    <span className="mr-auto block font-bold leading-tight">
                      {name}
                    </span>
                  </div>
                  <ul className="flex flex-col gap-2 pt-4">
                    {dropdownData.map((item, index) => (
                      <li key={index}>
                        <a href={item.href}>{item.label}</a>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={() => {
                          cookies.remove("paid");
                          cookies.remove("token");
                          cookies.remove("name");
                          localStorage.removeItem("userInfo");
                          router.push("/prihlaseni", { swallow: false });
                        }}
                      >
                        Odhlásit se
                      </button>
                    </li>
                    <li
                      className={`-mx-4 w-[calc(100%+48px)] px-4 sm:-mx-6 sm:px-6 ${
                        prepaid ? "bg-success-600" : "bg-error-600"
                      }`}
                    >
                      <a
                        className={`block w-full text-left font-medium text-white`}
                      >
                        {prepaid ? "Členství aktivní" : "Členství vypršelo!"}
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                <ul>
                  <li>
                    <a
                      href="/prihlaseni"
                      className="mr-auto mt-8 block font-bold leading-tight"
                    >
                      Přihlásit se
                    </a>
                  </li>
                  <li>
                    <a
                      href="/registrace"
                      className="mr-auto mt-4 block font-bold leading-tight"
                    >
                      Registrovat
                    </a>
                  </li>
                </ul>
              )}
            </Container>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  // Dropdown menu state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Menu open state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Navigation bar state
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Thresholds
  const thresholdScrolledPx = 64;
  const thresholHideVisiblePx = 540;

  // Use useScroll hook from framer-motion
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (y) => {
      const current = y;
      const prev = scrollY.getPrevious();

      if (current > thresholdScrolledPx) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (current > thresholHideVisiblePx && current > prev) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    });
  }, [scrollY, setIsVisible]);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-fixed w-full transition duration-500 print:hidden",
        "border-b-2 border-primary-200",
        isScrolled ? "bg-white/80 backdrop-blur-md" : "bg-white",
        !isVisible && "-translate-y-full"
      )}
    >
      <Container className="relative flex items-center justify-between py-3 lg:py-5">
        <Link href="/" className="relative z-offcanvas-above rounded-lg">
          <Logo />
        </Link>

        <ul className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 gap-4 lg:flex 2xl:gap-6">
          {menuRoutes.map((route) => (
            <li key={route.href}>
              <ActiveNavLink
                href={route.href}
                className="text-sm font-semibold 2xl:text-base"
                activeClassName="text-primary"
              >
                {route.label}
              </ActiveNavLink>
            </li>
          ))}
        </ul>

        <DropdownMenu dropdownItems={dropdownData} />

        <BurgerButton
          isOpen={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex lg:hidden"
        />
        <TouchMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      </Container>
    </nav>
  );
}
