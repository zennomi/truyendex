import { cookies } from "next/headers";
import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@/styles/base/index.scss";

import { MangadexContextProvider } from "@/contexts/mangadex";
import Gtag from "@/components/gtag";
import { Constants } from "@/constants";
import { SettingsProvider } from "@/contexts/settings";

async function detectSettings() {
  const cookieStore = cookies();

  const settingsStore = cookieStore.get(Constants.Settings.COOKIE_KEY);

  return settingsStore
    ? JSON.parse(settingsStore?.value)
    : Constants.Settings.DEFAULT_SETTINGS;
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
      <body data-layout-id={props.id}>
        <SettingsProvider settings={settings}>
          <MangadexContextProvider>{children}</MangadexContextProvider>
        </SettingsProvider>
        <ToastContainer />
        <Gtag />
      </body>
    </html>
  );
};
