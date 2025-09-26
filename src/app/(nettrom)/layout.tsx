import Link from "next/link";
import { Inter } from "next/font/google";
import MainNav from "@/components/nettrom/layout/main-nav";
import Header from "@/components/nettrom/layout/header";
import { Constants } from "@/constants";
import "@/styles/nettrom/index.scss";
import { twMerge } from "tailwind-merge";
import { LayoutWrapper } from "@/components/LayoutWrapper";
import { Metadata } from "next";
import { Suspense } from "react";
import { Alert } from "@/components/nettrom/Alert";
import NextTopLoader from "nextjs-toploader";
import SettingsDialog from "@/components/nettrom/settings-dialog";
import VerifyMailAlert from "@/components/nettrom/verify-mail-alert";

export const metadata: Metadata = {
  title: `${Constants.APP_NAME} - Truyện tranh chất lượng cao không quảng cáo`,
  description: `Đọc truyện miễn phí, chất lượng cao và tham gia ủng hộ nhóm dịch trên ${Constants.APP_NAME}`,
  applicationName: Constants.APP_NAME,
  authors: [{ name: "TruyenDex", url: "https://github.com/zennomi/truyendex" }],
  keywords: [
    "truyện tranh",
    "truyendex",
    "manga",
    "manhwa",
    "manhua",
    "nettruyen",
    "nettrom",
    "blogtruyen",
    "cuutruyen",
  ],
  metadataBase: new URL(Constants.APP_URL),
  other: {
    referrer: "same-origin",
  },
};

const inter = Inter({ subsets: ["latin"] });

export default function NettromLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const copyrightYear = new Date().getFullYear();
  return (
    <LayoutWrapper id="nettrom">
      <NextTopLoader
        zIndex={1000}
        easing="ease-in-out"
        speed={400}
        height={4}
        showSpinner={false}
        template={`
        <div class="bar bg-web-title" role="bar"><div class="peg"></div></div> 
  <div class="spinner text-web-title" role="spinner"><div class="spinner-icon"></div></div>`}
      />
      <Suspense>
        <Header />
      </Suspense>
      <VerifyMailAlert />
      <nav className="main-nav hidden-xs" id="mainNav">
        <div className="inner bg-neutral-900">
          <div className="container">
            <div className="py-4">
              <div className="mb-0 md:mb-4">
                <Alert
                  title="TruyenDex chỉ xây dựng giao diện tiếng Việt, toàn bộ dữ liệu
                thuộc về MangaDex."
                />
              </div>
              <MainNav />
            </div>
          </div>
        </div>
      </nav>
      <main
        className={twMerge(
          "main bg-neutral-900 text-foreground",
          inter.className,
        )}
      >
        <div className="container">{children}</div>
      </main>
      <footer className="footer border-t bg-[#000]">
        <div className="container">
          <div className="row">
            <div
              className="col-sm-4 copyright"
              itemType="http://schema.org/Organization"
            >
              <Link itemProp="url" href="/">
                <img
                  itemProp="logo"
                  src={"/images/logo.png"}
                  alt={`${Constants.APP_NAME} - Truyện tranh Online`}
                  className="max-w-[200px]"
                />
              </Link>
              <div className="mrt10 row">
                <div className="col-xs-6">
                  <Link
                    href={Constants.Routes.termsOfService}
                    className="text-web-title transition hover:!bg-transparent hover:bg-web-titleLighter hover:underline"
                  >
                    Điều khoản dịch vụ
                  </Link>
                </div>
                <div className="col-xs-6">
                  <a
                    href="https://mangadex.org/about"
                    rel="nofollow noopener"
                    target="_blank"
                    className="text-web-title transition hover:!bg-transparent hover:bg-web-titleLighter hover:underline"
                  >
                    MangaDex
                  </a>
                </div>
              </div>
              <p></p>
              <p>
                Copyright © {copyrightYear}{" "}
                <Link
                  href="/"
                  className="text-web-title transition hover:!bg-transparent hover:bg-web-titleLighter hover:underline"
                >
                  {Constants.APP_NAME}
                </Link>
              </p>
            </div>
            <div className="col-sm-8">
              <div className="link-footer">
                <h4>Tuyên bố bãi trừ trách nhiệm</h4>
                <p>
                  {Constants.APP_NAME} chỉ cung cấp giao diện và tổng hợp dữ
                  liệu từ MangaDex; chúng tôi không lưu trữ hay sở hữu nội dung.
                  Thông tin chỉ mang tính tham khảo; chúng tôi không chịu trách
                  nhiệm về độ chính xác, liên kết ngoài hoặc nội dung do bên thứ
                  ba cung cấp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <SettingsDialog />
    </LayoutWrapper>
  );
}
