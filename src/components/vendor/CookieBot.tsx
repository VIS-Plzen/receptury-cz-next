import type {} from "next/script";
import Script from "next/script";

// Props:
// cbid: string; -> The ID of your CookieBot account. You can find it in the CookieBot dashboard.
// strategy: string; -> "afterInteractive" | "lazyOnload" | "beforeInteractive" -> https://nextjs.org/docs/pages/api-reference/components/script#strategy

// Usage:
// ROOT LAYOUT or _document.tsx

// <head>
//  <CookieDeclarationScript cbid="YOUR_CBID" />
// </head>
//  ...
// <body>
//  ...
//  ... some content ...
//  ...
//  <CookieConsentBannerRenderer cbid="YOUR_CBID" strategy="afterInteractive" />
// </body>
// ...

// Global declaration of the cookiebot -> should be placed in the <head> of the ROOT LAYOUT or _document.tsx
export function CookieDeclarationScript({ cbid }: { cbid: string }) {
  return (
    <Script
      strategy="afterInteractive"
      id="CookieDeclaration"
      src={`"https://consent.cookiebot.com/${cbid}/cd.js"`}
      type="text/javascript"
      async
    />
  );
}

// Declaration of the banner it self -> should be placed, where the render of html elements should happen (at the end of the <body> tag in the ROOT LAYOUT or _document.tsx)
// !!!!! NOTE: If there is a problem with CORS in production, change the `strategy` prop to "afterInteractive" !!!!!
export function CookieConsentBannerRenderer({
  cbid,
  strategy = "beforeInteractive",
}: {
  cbid: string;
  strategy?: "afterInteractive" | "lazyOnload" | "beforeInteractive";
}) {
  return (
    <Script
      strategy={strategy}
      id="Cookiebot"
      src="https://consent.cookiebot.com/uc.js"
      data-cbid={cbid}
      data-blockingmode="auto"
      type="text/javascript"
    />
  );
}
