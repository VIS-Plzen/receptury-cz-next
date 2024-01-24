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
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const menuRoutes = [
  {
    label: "Hlavní strana",
    href: "/",
  },
  {
    label: "Receptura",
    href: "/receptura",
  },
  {
    label: "Partner",
    href: "/partner",
  },
  {
    label: "Uživatel",
    href: "/uzivatel",
  },
  {
    label: "Komponenty",
    href: "/components",
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
  { label: "Osobní informace", href: "/" },
  { label: "Oblíbené recepty", href: "/" },
  { label: "Odhlásit se", href: "/" },
];

// Hihlights link with href matching current url
function ActiveNavLink({
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
      hoverEffect="appear"
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
  return (
    <div className="">
      <Menu as="div" className="relative text-left">
        <Menu.Button>
          <div className="hidden w-56 cursor-pointer items-center justify-start gap-2 lg:flex">
            <Avatar size="sm" loading="eager" name="Jméno Příjmení" />
            <span className="mr-auto block font-semibold leading-tight">
              Jméno Příjmení
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
          <Menu.Items className="absolute right-0 top-full z-10 mt-4 flex w-full flex-col overflow-hidden rounded-2xl border-primary-200 bg-white shadow-xl md:border-2">
            <div className="flex flex-col p-1">
              {dropdownData.map((item: DropdownItem, index) => (
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
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
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
              <motion.ul className="flex flex-col gap-6">
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

              <div className="mt-10 flex flex-col">
                <div className="flex w-56 cursor-pointer items-center justify-start gap-2">
                  <Avatar size="sm" loading="eager" name="Jméno Příjmení" />
                  <span className="mr-auto block font-semibold leading-tight">
                    Jméno Příjmení
                  </span>
                </div>
                <ul className="pl-9 pt-2">
                  {dropdownData.map((item, index) => (
                    <a href={item.href} key={index}>
                      {item.label}
                    </a>
                  ))}
                </ul>
              </div>
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
        "fixed inset-x-0 top-0 z-fixed w-full transition duration-500",
        "border-b-2 border-primary-200",
        isScrolled ? "bg-white/80 backdrop-blur-md" : "bg-white",
        !isVisible && "-translate-y-full"
      )}
    >
      <Container className="relative flex items-center justify-between py-3 lg:py-5">
        <Link href="/" className="relative z-offcanvas-above">
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
