"use client";

import Script from "next/script";
import { Constants } from "@/constants";
import { useEffect, useState } from "react";

function Gtag() {
  const [gtagId, setGtagId] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setGtagId(
        Constants.GTAG_IDS[
          window.location.hostname as keyof typeof Constants.GTAG_IDS
        ],
      ); // Extracts the hostname (e.g., "example.com")
    }
  }, []);

  if (!gtagId) return <></>;

  return (
    <div>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', "${gtagId}");
        `}
      </Script>
    </div>
  );
}

export default Gtag;
