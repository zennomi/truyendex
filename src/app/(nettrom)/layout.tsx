import { Inter } from 'next/font/google'
import Image from "next/image";
import Link from "next/link";

import "@fortawesome/fontawesome-free/css/all.css";
import '../../assets/scss/tailwind.scss'
import "./style.css"
// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import MainNav from "../../components/nettrom/mainNav";

import NettromLogo from "../../assets/nettrom-logo.png"
import Header from "../../components/nettrom/header";
import routes from "../../routes";
import { MangadexContextProvider } from "../../contexts/mangadex";
import Gtag from '../../components/gtag';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Đọc Truyện Tranh Online - Website chính thức - NetTrom',
    description: 'Web đọc truyện tranh online lớn nhất được cập nhật liên tục mỗi ngày - Cùng tham gia đọc truyện và thảo luận với hơn 💚10 triệu thành viên tại NetTrom',
    other: {
        referrer: "same-origin"
    }
}

export default function NettromLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="vi" className='dark'>
            <body className={`homepage vi-vn site1 dark ${inter.className}`}>
                <MangadexContextProvider>
                    <Header />
                    <nav className="main-nav hidden-xs" id="mainNav" style={{ "zIndex": 1000, "position": "relative", "top": "0px" }}>
                        <div className="inner">
                            <div className="container">
                                <div className="notify_block" style={{ margin: 0, borderRadius: 0 }}>
                                    <div className="info">
                                        <em className="fa fa-info-circle" />
                                    </div>
                                    <span className="error !block">
                                        Fact: Web giả mạo chủ yếu là để cướp nguồn view từ nettruyen thôi chứ chả ai hack cái nick nettruyen của bạn làm gì đâu.
                                    </span>
                                </div>
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
                                                <Link target="_self" href={`${routes.nettrom.search}?order[followedCount]=desc#results`}>
                                                    Truyện tranh hot
                                                </Link>
                                            </li>
                                            <li>
                                                <Link target="_self" href="/">
                                                    Truyện tranh hay
                                                </Link>
                                            </li>
                                            <li>
                                                <Link target="_self" href={`${routes.nettrom.search}?publicationDemographic=josei&publicationDemographic=shoujo#results`}>
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
                </MangadexContextProvider>
                <Gtag />
            </body>
        </html>
    )
}