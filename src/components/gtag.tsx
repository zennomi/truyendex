"use client";

import Script from "next/script";
import { Constants } from "@/constants";

function Gtag() {
  return (
    <div>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${Constants.GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', "${Constants.GA_MEASUREMENT_ID}");
        `}
      </Script>
    </div>
  );
}

export default Gtag;
