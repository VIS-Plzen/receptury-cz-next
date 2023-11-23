import Script from "next/script";

// Props:
// measurementId: string; -> The ID of your Google Analytics account. You can find it in the Google Analytics dashboard.

// Usage:
// ROOT LAYOUT or _app.tsx

// ...
// <GoogleAnalytics measurementId="YOUR_MEASUREMENT_ID" />
// ...

export default function GoogleAnalytics({
  measurementId,
}: {
  measurementId: string;
}) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
