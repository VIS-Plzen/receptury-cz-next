import Link, { LinkProps } from "next/link";
import { forwardRef } from "react";

// Custom link component that inteligently handles both internal and external links automaticly.
// Output is resolved based on the `href` prop

// It accepts all the props of an HTML anchor element and Next.js Link Props.

type InternalLinkProps = LinkProps & {
  href: string;
};

type AnchorProps = React.ComponentPropsWithoutRef<"a"> & {
  href: string;
};

type Props<T extends string> = T extends "/" | `/${string}`
  ? InternalLinkProps
  : AnchorProps;

const SmartLink = forwardRef<HTMLAnchorElement, Props<string>>(
  ({ href, ...props }, forwardedRef) => {
    // Internal links (starting with "/") render with Next's Link component
    if (href.startsWith("/")) {
      return (
        <Link data-internal="true" href={href} ref={forwardedRef} {...props} />
      );
    }

    // External links (http, https, ftp), render with target="_blank" and rel="noopener noreferrer"
    if (href.match(/^(http|https|ftp):/)) {
      return (
        <a
          data-external="true"
          href={href}
          ref={forwardedRef}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        />
      );
    }

    // In all other cases, render a regular anchor tag
    return <a data-external="true" href={href} ref={forwardedRef} {...props} />;
  }
);

SmartLink.displayName = "SmartLink";
export default SmartLink;
