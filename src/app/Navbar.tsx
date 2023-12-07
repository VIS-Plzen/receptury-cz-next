"use client";

import Logo from "@/components/brand/Logo";
import Avatar from "@/components/ui/Avatar";
import Container from "@/components/ui/Container";
import { cn } from "@/utils/cn";
import clsx from "clsx";
import { useScroll } from "framer-motion";
import Link, { LinkProps } from "next/link";
import { useEffect, useState } from "react";

const menuRoutes = [
  {
    label: "Hlavní strana",
    href: "/",
  },
  {
    label: "Partner 1",
    href: "/partner-1",
  },
  {
    label: "Partner 2",
    href: "/partner-2",
  },
  {
    label: "Partner 3",
    href: "/partner-1",
  },
  {
    label: "Kontakt",
    href: "/about",
  },
];

import { usePathname } from "next/navigation";
import { forwardRef } from "react";

// Wrapper for Next.js Link component that adds an activeClassName prop
// for styling active links (Url pathname matches the href prop)

type Props = LinkProps & {
  activeClassName: string;
  className?: string;
  [key: string]: any;
};

const ActiveLink = forwardRef<HTMLAnchorElement, Props>(
  ({ activeClassName = "", className = "", ...props }, forwardedRef) => {
    const pathname = usePathname();
    const isActive = pathname === props.href;
    return (
      <Link
        ref={forwardedRef}
        className={cn(className, isActive && activeClassName)}
        {...props}
      />
    );
  }
);

ActiveLink.displayName = "ActiveLink";

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
        "z-offcanvas-above group relative flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-xl",
        className
      )}
      onClick={onClick}
    >
      <span
        className={clsx(
          "ease-out-back h-0.5 w-7 origin-center transform-gpu rounded-full bg-gray-900 transition duration-300",
          isOpen && "translate-y-[7px] -rotate-45"
        )}
      />
      <span
        className={clsx(
          "ease-out-back h-0.5 w-7 origin-center transform-gpu rounded-full bg-gray-900 transition duration-300",
          isOpen && "opacity-0"
        )}
      />
      <span
        className={clsx(
          "ease-out-back h-0.5 w-7 origin-center transform-gpu rounded-full bg-gray-900 transition duration-300",
          isOpen && "translate-y-[-7px] rotate-45"
        )}
      />
    </button>
  );
}

export default function Navbar() {
  // Menu open state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Navigation bar state
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

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
        "z-fixed fixed inset-x-0 top-0 w-full transition duration-500",
        "border-b-2 border-primary-200 bg-white",
        !isVisible && "-translate-y-full"
      )}
    >
      <Container className="relative flex items-center justify-between py-3 lg:py-5">
        <Link href="/">
          <Logo />
        </Link>

        <ul className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 gap-7 lg:flex">
          {menuRoutes.map((route) => (
            <li key={route.href}>
              <ActiveLink
                href={route.href}
                className="font-semibold text-gray-600 decoration-current decoration-[0.09375em] underline-offset-[0.25em] hover:underline"
                activeClassName="text-primary"
              >
                {route.label}
              </ActiveLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center justify-start gap-2 lg:flex">
          <Avatar size="sm" name="Jméno a příjmení" />
          Jméno a příjmení
        </div>

        <BurgerButton
          isOpen={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={"flex lg:hidden"}
        />
      </Container>
    </nav>
  );
}
