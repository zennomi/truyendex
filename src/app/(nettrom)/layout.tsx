import Link from "next/link";
import { Inter } from "next/font/google";
import MainNav from "@/components/sections/nettrom/layout/main-nav";
import Header from "@/components/sections/nettrom/layout/header";
import { Constants } from "@/constants";
import "@/styles/nettrom/index.scss";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"] });
export default function NettromLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <nav className="main-nav hidden-xs" id="mainNav">
        <div className="inner">
          <div className="container">
            <div
              className="notify_block"
              style={{ margin: 0, borderRadius: 0 }}
            >
              <div className="info">
                <em className="fa fa-info-circle" />
              </div>
              <span className="!block">
                TruyenDex chỉ xây dựng giao diện tiếng Việt, toàn bộ dữ liệu
                thuộc về MangaDex
              </span>
            </div>
            <MainNav />
          </div>
        </div>
      </nav>
      <main className={twMerge("main", inter.className)}>
        <div className="container">{children}</div>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div
              className="col-sm-4 copyright"
              itemType="http://schema.org/Organization"
            >
              <Link itemProp="url" href="/">
                <img
                  itemProp="logo"
                  src={"/nettruyen/images/logo.png"}
                  style={{ aspectRatio: 5 }}
                  alt={`${Constants.APP_NAME} - Truyện tranh Online`}
                />
              </Link>
              <div className="mrt10 row">
                <div className="col-xs-6">
                  <a
                    href="https://mangadex.org/about"
                    rel="nofollow noopener"
                    target="_blank"
                  >
                    MangaDex
                  </a>
                </div>
                {/* <div className="col-xs-6">
                      <a href="/chinh-sach-bao-mat">Chính sách bảo mật</a>
                    </div> */}
              </div>
              <p></p>
              <p>Copyright © 2023 {Constants.APP_NAME}</p>
            </div>
            <div className="col-sm-8">
              <div className="link-footer">
                <h4>Từ khóa</h4>
                <ul>
                  <li>
                    <Link target="_self" href="/">
                      Truyện tranh
                    </Link>
                  </li>
                  <li>
                    <Link target="_self" href="/">
                      Truyen tranh online
                    </Link>
                  </li>
                  <li>
                    <Link target="_self" href="/">
                      Đọc truyện tranh
                    </Link>
                  </li>
                  <li>
                    <Link
                      target="_self"
                      href={`${Constants.Routes.nettrom.search}?order[followedCount]=desc#results`}
                    >
                      Truyện tranh hot
                    </Link>
                  </li>
                  <li>
                    <Link target="_self" href="/">
                      Truyện tranh hay
                    </Link>
                  </li>
                  <li>
                    <Link
                      target="_self"
                      href={`${Constants.Routes.nettrom.search}?publicationDemographic=josei&publicationDemographic=shoujo#results`}
                    >
                      Truyện ngôn tình
                    </Link>
                  </li>
                  <li>
                    <Link target="_self" href="/">
                      Manhwa
                    </Link>
                  </li>
                  <li>
                    <Link target="_self" href="/">
                      Manga
                    </Link>
                  </li>
                  <li>
                    <Link target="_self" href="/">
                      Manhua
                    </Link>
                  </li>
                  <li>
                    <Link target="_self" href="/">
                      truyenqq
                    </Link>
                  </li>
                  <li>
                    <Link target="_self" href="/">
                      mi2manga
                    </Link>
                  </li>
                  <li>
                    <Link target="_self" href="/">
                      doctruyen3q
                    </Link>
                  </li>
                  <li>
                    <Link target="_self" href="/">
                      toptruyen
                    </Link>
                  </li>
                  <li>
                    <Link target="_self" href="/">
                      cmanga
                    </Link>
                  </li>
                  <li>
                    <Link target="_self" href="/">
                      vlogtruyen
                    </Link>
                  </li>
                  <li>
                    <Link target="_self" href="/">
                      blogtruyen
                    </Link>
                  </li>
                  <li>
                    <Link target="_self" href="/">
                      truyentranhaudio
                    </Link>
                  </li>
                  <li>
                    <Link target="_self" href="/">
                      vcomi
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
