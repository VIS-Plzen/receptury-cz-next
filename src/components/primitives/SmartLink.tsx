import Link from "next/link";
import { forwardRef } from "react";

// Custom link component that inteligently handles both internal and external links automaticly.
// Output is resolved based on the `href` prop

// It accepts all the props of an HTML anchor element and Next.js Link Props.

type Props = React.ComponentPropsWithRef<typeof Link> &
  React.ComponentPropsWithRef<"a">;

const SmartLink = forwardRef<HTMLAnchorElement, Props>(
  ({ href, ...props }, forwardedRef) => {
    // Internal links (starting with "/") render with Next's Link component
    if (href.startsWith("/")) {
      return <Link href={href} ref={forwardedRef} {...props} />;
    }

    // External links (http, https, ftp), render with target="_blank" and rel="noopener noreferrer"
    if (href.match(/^(http|https|ftp):/)) {
      return (
        <a
          href={href}
          ref={forwardedRef}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        />
      );
    }

    // In all other cases, render a regular anchor tag
    return <a href={href} ref={forwardedRef} {...props} />;
  }
);

SmartLink.displayName = "SmartLink";
export default SmartLink;
