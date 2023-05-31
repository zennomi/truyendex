import "@fortawesome/fontawesome-free/css/all.css";
import Image from "next/image";

import MainNav from "../../components/nettrom/mainNav";
import "./style.css"

import NettromLogo from "../../assets/nettrom-logo.png"
import Link from "next/link";
import routes from "../../routes";
import SearchInput from "../../sections/nettrom/searchInput";

export default function NettromLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen w-full dark">
            <header className="header" id="header">
                <div className="navbar">
                    <div className="container">
                        <div className="navbar-header">
                            <div className="navbar-brand">
                                <Link className="logo !flex !items-center" title="Truyện tranh online" href={routes.nettrom.index}>
                                    <Image alt="Logo NetTrom" className="my-auto" src={NettromLogo} width="150" style={{ "aspectRatio": 5 }} />
                                </Link>
                            </div>
                            <div className="navbar-form navbar-left hidden-xs search-box comicsearchbox">
                                <SearchInput />
                            </div>
                            <i className="fa fa-lightbulb-o toggle-dark"></i>
                            <div className="notifications"><a href="#" title="Thông báo"><i className="fa fa-comment"></i></a></div><button type="button" className="search-button-icon visible-xs" aria-label="Search">
                                <i className="fa fa-search"></i>
                            </button>
                            <button type="button" className="navbar-toggle" aria-label="Menu">
                                <i className="fa fa-bars"></i>
                            </button>
                        </div>
                        <ul className="nav-account list-inline hidden-xs pull-right mt-[13px]">
                            <li className="login-link"><Link rel="nofollow" href="#">Đăng truyện</Link></li>
                            <li className="register-link"><Link rel="nofollow" href="#">Đăng ký</Link></li>
                        </ul>
                    </div>
                </div>
            </header>
            <MainNav />
            <main className="main">
                <div className="container">
                    {children}
                </div>
            </main>
        </div>
    )
}