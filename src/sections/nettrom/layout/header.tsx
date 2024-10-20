"use client"

import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useEffect, useState } from "react";

import routes from "@/routes";
import SearchInput from "@/sections/nettrom/common/search-input";
import NettromLogo from "@/assets/nettrom-logo.png"
import Iconify from "@/components/iconify";
import { useAuth } from "@/hooks/useAuth";

import MainNav from "./main-nav";

export default function Header() {
    const [openMenu, setOpenMenu] = useState(false)
    const pathname = usePathname()
    const params = useSearchParams()

    useEffect(() => {
        setOpenMenu(false)
    }, [pathname, params])

    return (
        <header className={`header ${openMenu ? "menu-open fixed top-0 right-0 z-2" : ""}`} id="header">
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
                        <Link href={routes.nettrom.search} type="button" className="search-button-icon visible-xs" aria-label="Search">
                            <i className="fa fa-search"></i>
                        </Link>
                        <div className="toggle-dark">
                            <a title="MangaDex" className="text-white" href="https://mangadex.org/" target="_blank">
                                <Iconify icon="fa6-solid:cat" />
                            </a>
                        </div>
                        <button type="button" className="navbar-toggle block md:hidden" aria-label="Menu"
                            onClick={() => setOpenMenu(prev => !prev)}
                        >
                            {
                                openMenu ?
                                    <i className="fa fa-times"></i>
                                    :
                                    <i className="fa fa-bars"></i>
                            }
                        </button>
                    </div>
                    <AuthDropdown desktop />
                </div>
            </div>
            <div className="navbar-collapse">
                <div className="search-box comicsearchbox">
                    <SearchInput />
                </div>
                <MainNav />
                <AuthDropdown />
            </div>
        </header>
    )
}

function AuthDropdown({ desktop }: { desktop?: boolean }) {
    const { user, logout } = useAuth()
    const menuItemClassName = "flex gap-2 items-center w-full text-[#333] py-1 px-5 text-nowrap hover:text-[#ae4ad9] hover:bg-[#f5f5f5]"
    return (
        <Menu>
            <ul className={`nav-account list-inline ${desktop ? "hidden-xs pull-right mt-[14px]" : ""}`}>
                <li className="dropdown open">
                    <MenuButton>
                        <a
                            data-toggle="dropdown"
                            className="user-menu fn-userbox dropdown-toggle flex items-center gap-2"
                        >
                            <Iconify className="inline" icon="fa:user" />  <span>{user?.name || "Tài khoản"}</span>{" "}
                            <Iconify className="inline" icon="fa:caret-down" />
                        </a>
                    </MenuButton>
                    <MenuItems className="z-3 min-w-[160px] py-1 my-2 rounded bg-white" anchor="bottom start">
                        {
                            user ? <>
                                <MenuItem>
                                    <a className={menuItemClassName}>
                                        <Iconify icon="fa:user" /> Trang cá nhân
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <Link className={menuItemClassName} href={routes.login}>
                                        <Iconify icon="fa:book" /> Truyện theo dõi
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <a className={menuItemClassName} onClick={logout}>
                                        <Iconify icon="fa:sign-out" /> Thoát
                                    </a>
                                </MenuItem>
                            </> :
                                <>
                                    <MenuItem>
                                        <Link className={menuItemClassName} href={routes.login}>
                                            <Iconify icon="fa:user" /> Đăng nhập
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link className={menuItemClassName} href={routes.signup}>
                                            <Iconify icon="fa:pencil" /> Đăng ký
                                        </Link>
                                    </MenuItem>
                                </>
                        }

                    </MenuItems>
                </li>
            </ul>
        </Menu>
    )
}