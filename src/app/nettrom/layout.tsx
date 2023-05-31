import "@fortawesome/fontawesome-free/css/all.css";
import Image from "next/image";

import MainNav from "../../components/nettrom/mainNav";
import "./style.css"

import NettromLogo from "../../assets/nettrom-logo.png"
import Link from "next/link";
import Header from "../../components/nettrom/header";

export default function NettromLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen w-full dark">
            <Header />
            <nav className="main-nav hidden-xs" id="mainNav" style={{ "zIndex": 1000, "position": "relative", "top": "0px" }}>
                <div className="inner">
                    <div className="container">
                        <MainNav />
                    </div>
                </div>
            </nav>
            <main className="main">
                <div className="container">
                    {children}
                </div>
            </main>
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div
                            className="col-sm-4 copyright"
                            itemType="http://schema.org/Organization"
                        >
                            <a itemProp="url" href="/">
                                <Image
                                    itemProp="logo"
                                    src={NettromLogo}
                                    width={150}
                                    style={{ aspectRatio: 5 }}
                                    alt="NetTrom - Truyện tranh Online"
                                />
                            </a>
                            <div className="mrt10 row">
                                <div className="col-xs-6">
                                    <Link href="/contact" rel="nofollow noopener">
                                        Liên hệ bản quyền
                                    </Link>
                                </div>
                                <div className="col-xs-6">
                                    <a href="/chinh-sach-bao-mat">Chính sách bảo mật</a>
                                </div>
                            </div>
                            <p></p>
                            <p>Copyright © 2023 NetTrom</p>
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
                                        <Link target="_self" href="/hot">
                                            Truyện tranh hot
                                        </Link>
                                    </li>
                                    <li>
                                        <Link target="_self" href="/">
                                            Truyện tranh hay
                                        </Link>
                                    </li>
                                    <li>
                                        <Link target="_self" href="/tim-truyen/ngon-tinh">
                                            Truyện ngôn tình
                                        </Link>
                                    </li>
                                    <li>
                                        <Link target="_self" href="/tim-truyen/manhwa-11400">
                                            Manhwa
                                        </Link>
                                    </li>
                                    <li>
                                        <Link target="_self" href="/tim-truyen/manga-112">
                                            Manga
                                        </Link>
                                    </li>
                                    <li>
                                        <Link target="_self" href="/tim-truyen/manhua">
                                            Manhua
                                        </Link>
                                    </li>
                                    <li>
                                        <Link target="_self" href="/tag/truyenqq">
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
        </div>
    )
}