import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@/assets/scss/style.css";
import "@/assets/scss/tailwind.scss";
import "swiper/css";
// Import Swiper styles
import { MangadexContextProvider } from "@/contexts/mangadex";
import Gtag from "@/components/gtag";
import { Metadata } from "next";
import config from "@/config";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${config.appName} - Truyện tranh chất lượng cao không quảng cáo`,
  description: `Đọc truyện miễn phí, chất lượng cao và tham gia ủng hộ nhóm dịch trên ${config.appName}`,
  applicationName: config.appName,
  authors: [{ name: "TruyenDex", url: "https://github.com/zennomi/truyendex" }],
  keywords: [
    "truyện tranh",
    "manga",
    "manhwa",
    "manhua",
    "nettruyen",
    "nettrom",
    "blogtruyen",
    "truyendex",
  ],
  metadataBase: new URL(config.appUrl),
  other: {
    referrer: "same-origin",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="dark">
      <body className={`${inter.className}`}>
        <NextTopLoader color="#ff9601" />
        <MangadexContextProvider>{children}</MangadexContextProvider>
        <ToastContainer />
        <Gtag />
      </body>
    </html>
  );
}
