import "@fortawesome/fontawesome-free/css/all.css";
import Image from "next/image";

import MainNav from "../../components/nettrom/mainNav";
import "./style.css"

import NettromLogo from "../../assets/nettrom-logo.png"
import Link from "next/link";

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
                                <Link className="logo !flex !items-center" title="Truyện tranh online" href="/nettrom">
                                    <Image alt="Logo NetTrom" className="my-auto" src={NettromLogo} width="150" style={{ "aspectRatio": 5 }} />
                                </Link>
                            </div>
                            <div className="navbar-form navbar-left hidden-xs search-box comicsearchbox">
                                <div className="input-group">
                                    <input type="text" className="searchinput form-control" placeholder="Tìm truyện..." />
                                    <div className="input-group-btn">
                                        <input type="submit" value="" className="searchbutton btn btn-default" />
                                    </div>
                                </div>
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
                            <li className="login-link"><a rel="nofollow" href="/Secure/Login.aspx?returnurl=%2F">Đăng nhập</a></li>
                            <li className="register-link"><a rel="nofollow" href="/Secure/Register.aspx?returnurl=%2F">Đăng ký</a></li>
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