import Image from "next/image"
import Link from "next/link"
import TruyenDexLogo from "@/assets/truyendex-logo.png"
import { getSearchNetTromUrl } from "@/utils/url"
import { MangaPublicationDemographic } from "@/api/manga"
import { tags } from "@/constants"
import transLocalizedStr from "@/utils/transLocalizedStr"
import Iconify from "../iconify"
import routes from "@/routes"

export default function TopNav() {
    return (
        <nav
            id="topnav"
            className="defaultscroll bg-white dark:bg-slate-900"
        >
            <div className="container">
                {/* Logo container*/}
                <Link className="logo pl-0" href={"/"}>
                    <Image
                        src={TruyenDexLogo}
                        className="hidden dark:inline-block"
                        alt="truyendex logo"
                        height={24}
                    />
                </Link>
                {/* End Logo container*/}
                <div className="menu-extras">
                    <div className="menu-item">
                        {/* Mobile menu toggle*/}
                        <a className="navbar-toggle" id="isToggle">
                            <div className="lines">
                                <span />
                                <span />
                                <span />
                            </div>
                        </a>
                        {/* End mobile menu toggle*/}
                    </div>
                </div>
                {/*Login button Start*/}
                <ul className="buy-button list-none mb-0">
                    <li className="inline mb-0">
                        <a
                            href="https://www.facebook.com/Zennomi"
                            target="_blank"
                            className="btn btn-icon rounded-full bg-indigo-600/5 hover:bg-indigo-600 border-indigo-600/10 hover:border-indigo-600 text-indigo-600 hover:text-white"
                        >
                            <Iconify icon="eva:facebook-fill" className="h-4 w-4" />
                        </a>
                    </li>
                    <li className="inline pl-1 mb-0">
                        <a
                            href="https://github.com/zennomi/truyendex"
                            target="_blank"
                            className="btn btn-icon rounded-full bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white"
                        >
                            <Iconify icon="eva:github-fill" className="h-4 w-4" />
                        </a>
                    </li>
                </ul>
                {/*Login button End*/}
                <div id="navigation">
                    {/* Navigation Menu*/}
                    <ul className="navigation-menu">
                        <li>
                            <Link href="/" className="sub-menu-item">
                                Trang chủ
                            </Link>
                        </li>
                        <li>
                            <Link href={routes.nettrom.index} className="sub-menu-item">
                                Bản thử nghiệm
                            </Link>
                        </li>
                        <li className="has-submenu parent-parent-menu-item">
                            <a href="#">Tìm truyện</a>
                            <span className="menu-arrow" />
                            <ul className="submenu">
                                <li className="has-submenu parent-menu-item">
                                    <a href="#"> Chủ đề</a>
                                    <span className="submenu-arrow" />
                                    <ul className="submenu max-h-[80vh] overflow-scroll scrollbar">
                                        {
                                            tags.filter(tag => tag.attributes.group === "theme").map(tag =>
                                                <li key={tag.id}>
                                                    <Link href={getSearchNetTromUrl({ includedTags: [tag.id] })} className="sub-menu-item">
                                                        {transLocalizedStr(tag.attributes.name)}
                                                    </Link>
                                                </li>
                                            )
                                        }
                                    </ul>
                                </li>
                                <li className="has-submenu parent-menu-item">
                                    <a href="#"> Thể loại</a>
                                    <span className="submenu-arrow" />
                                    <ul className="submenu max-h-[80vh] overflow-scroll scrollbar">
                                        {
                                            tags.filter(tag => tag.attributes.group === "genre").map(tag =>
                                                <li key={tag.id}>
                                                    <Link href={getSearchNetTromUrl({ includedTags: [tag.id] })} className="sub-menu-item">
                                                        {transLocalizedStr(tag.attributes.name)}
                                                    </Link>
                                                </li>
                                            )
                                        }
                                    </ul>
                                </li>
                                <li className="has-submenu parent-menu-item">
                                    <a href="#"> Đối tượng </a>
                                    <span className="submenu-arrow" />
                                    <ul className="submenu">
                                        {
                                            Object.values(MangaPublicationDemographic).map((demographic) => (
                                                <li key={demographic}>
                                                    <Link href={getSearchNetTromUrl({ publicationDemographic: [demographic] })} className="sub-menu-item">
                                                        {" "}
                                                        {demographic}
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </li>
                                <li className="has-submenu parent-menu-item">
                                    <a href="#"> Hình thức</a>
                                    <span className="submenu-arrow" />
                                    <ul className="submenu">
                                        {
                                            tags.filter(tag => tag.attributes.group === "format").map(tag =>
                                                <li key={tag.id}>
                                                    <Link href={getSearchNetTromUrl({ includedTags: [tag.id] })} className="sub-menu-item">
                                                        {transLocalizedStr(tag.attributes.name)}
                                                    </Link>
                                                </li>
                                            )
                                        }
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    {/*end navigation menu*/}
                </div>
                {/*end navigation*/}
            </div>
            {/*end container*/}
        </nav>
    )
}