import { LayoutWrapper } from "@/components/LayoutWrapper";
import "@/styles/core/index.scss";

import { Metadata } from "next";
import { Constants } from "@/constants";

export const metadata: Metadata = {
  title: `${Constants.APP_NAME} - Truyện tranh chất lượng cao không quảng cáo`,
  description: `Đọc truyện miễn phí, chất lượng cao và tham gia ủng hộ nhóm dịch trên ${Constants.APP_NAME}`,
  applicationName: Constants.APP_NAME,
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
  metadataBase: new URL(Constants.APP_URL),
  other: {
    referrer: "same-origin",
  },
};

export default function CoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutWrapper id="core">
      <main>{children}</main>;
    </LayoutWrapper>
  );
}
