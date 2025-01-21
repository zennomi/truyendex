import { cookies } from "next/headers";
import { GoogleTagManager } from "@next/third-parties/google";

import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@/styles/base/index.scss";

import { MangadexContextProvider } from "@/contexts/mangadex";
import { Constants } from "@/constants";
import { SettingsProvider } from "@/contexts/settings";

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
      <body data-layout-id={props.id}>
        <SettingsProvider settings={settings}>
          <MangadexContextProvider>{children}</MangadexContextProvider>
        </SettingsProvider>
        <ToastContainer />
      </body>
    </html>
  );
};
