import NextLink from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, Ref } from "react";
import React, { forwardRef } from "react";

// Popis komponentu:
// - Generický (primitivní) komponent pro vytvoření odkazu na web i mimo něj
// - Komponent inteligentně na základě použitých atributů a obsahu `href` prop rozpozná,
//   zda se jedná o odkaz na jinou stránku webu, externí odkaz, nebo tlačítko
//   a podle toho vrátí správný HTML element nebo komponent
// - Pokud je použit atribut `as`, komponent vrátí zadaný element a ignoruje veškerou další logiku

// <SmartLink as="span" />                      ---->  <span />
// <SmartLink as="button" onClick={...} />      ---->  <button onClick={...} />
// <SmartLink href="/..." />                    ---->  <NextLink href="/..." />
// <SmartLink href="http://..." />              ---->  <a href="http://..." target="_blank" rel="noopener noreferrer" />
// <SmartLink href="#..." />                    ---->  <a href="#..." />
// ... a další kombinace

type Props = {
  as?: React.ElementType;
  href?: string;
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const SmartLink = forwardRef<HTMLAnchorElement | HTMLButtonElement, Props>(
  ({ href, className = "", children, as, ...props }, ref) => {
    // If `as` prop is provided, render the specified element
    if (as) {
      const AsElement = as;
      return (
        <AsElement className={className} ref={ref} {...props}>
          {children}
        </AsElement>
      );
    }

    // If href is not provided, render a button
    if (!href) {
      return (
        <button
          className={className}
          ref={ref as Ref<HTMLButtonElement>}
          {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {children}
        </button>
      );
    }

    // External links (http, https, ftp), render with target="_blank" and rel="noopener noreferrer"
    if (href.match(/^(http|https|ftp):/)) {
      return (
        <a
          href={href}
          ref={ref as Ref<HTMLAnchorElement>}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          {...props}
        >
          {children}
        </a>
      );
    }

    // Internal anchor links, email links, telephone links, file download links, or custom protocols
    if (
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("blob:") ||
      href.startsWith("data:") ||
      props.download ||
      href.match(/^[a-zA-Z0-9-]+:/) // Custom protocols
    ) {
      return (
        <a
          href={href}
          ref={ref as Ref<HTMLAnchorElement>}
          className={className}
          {...props}
        >
          {children}
        </a>
      );
    }

    // In all other cases, render a Next's Link component
    return (
      <NextLink
        href={href}
        ref={ref as Ref<HTMLAnchorElement>}
        className={className}
        {...props}
      >
        {children}
      </NextLink>
    );
  }
);

SmartLink.displayName = "SmartLink";
export default SmartLink;
