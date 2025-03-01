import { cookies } from "next/headers";
import { GoogleTagManager } from "@next/third-parties/google";

import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@/styles/base/index.scss";
import "react-loading-skeleton/dist/skeleton.css";

import { MangadexContextProvider } from "@/contexts/mangadex";
import { Constants } from "@/constants";
import { SettingsProvider } from "@/contexts/settings";
import { SkeletonTheme } from "react-loading-skeleton";

async function detectSettings() {
  const cookieStore = cookies();

  const settingsStore = cookieStore.get(Constants.Settings.COOKIE_KEY);

  return settingsStore ? JSON.parse(settingsStore.value) : null;
}

export const LayoutWrapper = async ({
  children,
  ...props
}: PropsWithChildren & {
  id: string;
}) => {
  const settings = await detectSettings();
  return (
    <html lang="vi" className="dark" suppressHydrationWarning>
      <GoogleTagManager gtmId={Constants.GTM_ID} />
      <head>
        <link rel="dns-prefetch" href="https://mangadex.org" />
        <link rel="dns-prefetch" href="https://api.truyendex.xyz" />
        <link rel="dns-prefetch" href="https://api-proxy.truyendex.xyz" />
        <link rel="dns-prefetch" href="https://cdn.truyendex.xyz" />

        <link rel="dns-prefetch" href="https://api.truyendex.com" />

        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://www.gstatic.com" />
      </head>
      <body data-layout-id={props.id}>
        <SettingsProvider settings={settings}>
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <MangadexContextProvider>{children}</MangadexContextProvider>
          </SkeletonTheme>
        </SettingsProvider>
        <ToastContainer theme="dark" />
      </body>
    </html>
  );
};
