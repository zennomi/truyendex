"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  FaBook,
  FaBug,
  FaCaretDown,
  FaCat,
  FaCog,
  FaGithub,
  FaHistory,
  FaHome,
  FaList,
  FaPencilAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/shadcn/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { Constants } from "@/constants";
import { useSettingsContext } from "@/contexts/settings";

import MainNav from "./main-nav";
import SearchInput from "../common/search-input";

const menuItemClassName =
  "flex gap-2 items-center w-full text-[#333] py-2 px-4 text-nowrap hover:text-[#ae4ad9] hover:bg-[#f5f5f5] !text-[15px] [&>svg]:!size-[16px]";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();
  const params = useSearchParams();

  useEffect(() => {
    setOpenMenu(false);
  }, [pathname, params]);

  return (
    <header
      className={`header ${openMenu ? "menu-open fixed right-0 top-0 z-3" : ""}`}
      id="header"
    >
      <div className="navbar">
        <div className="container">
          <div className="navbar-header">
            <div className="navbar-brand">
              <Link
                className="logo !flex !items-center"
                title="Truyện tranh online"
                href={Constants.Routes.nettrom.index}
              >
                <img
                  alt="Logo NetTrom"
                  src={"/images/logo.png"}
                  className="my-auto w-[150px]"
                />
              </Link>
            </div>
            <div className="navbar-form navbar-left hidden-xs search-box comicsearchbox">
              <SearchInput />
            </div>
            <Link
              href={Constants.Routes.nettrom.search}
              type="button"
              className="search-button-icon visible-xs"
              aria-label="Search"
            >
              <i className="fa fa-search"></i>
            </Link>
            <div className="toggle-dark">
              <a
                title="MangaDex"
                className="text-white"
                href="https://mangadex.org/"
                target="_blank"
              >
                <FaCat />
              </a>
            </div>
            <button
              type="button"
              className="navbar-toggle block md:hidden"
              aria-label="Menu"
              onClick={() => setOpenMenu((prev) => !prev)}
            >
              {openMenu ? (
                <i className="fa fa-times"></i>
              ) : (
                <i className="fa fa-bars"></i>
              )}
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
  );
}

function AuthDropdown({ desktop }: { desktop?: boolean }) {
  const { user, logout } = useAuth();
  const { onToggleDrawer } = useSettingsContext();

  if (user === undefined) return null;
  return (
    <DropdownMenu>
      <ul
        className={`nav-account list-inline ${desktop ? "hidden-xs pull-right mt-[14px]" : ""}`}
      >
        <li className="dropdown open">
          <DropdownMenuTrigger asChild>
            <a
              data-toggle="dropdown"
              className="user-menu fn-userbox dropdown-toggle flex cursor-pointer items-center gap-2"
            >
              <FaList className="inline" />{" "}
              <span className="max-w-[100px] truncate">
                {user?.name || "Menu"}
              </span>{" "}
              <FaCaretDown className="inline" />
            </a>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="z-50 my-2 min-w-[160px] rounded bg-white py-1"
            align="start"
          >
            {user ? (
              <>
                <DropdownMenuItem asChild>
                  <Link
                    href={Constants.Routes.dashboard.index}
                    className={menuItemClassName}
                  >
                    <FaHome />
                    Trang cá nhân
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    className={menuItemClassName}
                    href={Constants.Routes.nettrom.following}
                  >
                    <FaBook />
                    Truyện theo dõi
                  </Link>
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem asChild>
                  <Link
                    className={menuItemClassName}
                    href={Constants.Routes.login}
                  >
                    <FaUser />
                    Đăng nhập
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    className={menuItemClassName}
                    href={Constants.Routes.signup}
                  >
                    <FaPencilAlt />
                    Đăng ký
                  </Link>
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuItem asChild>
              <Link
                className={menuItemClassName}
                href={Constants.Routes.nettrom.history}
              >
                <FaHistory />
                Lịch sử
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                className={menuItemClassName}
                href={Constants.Routes.report}
                target="_blank"
              >
                <FaBug />
                Báo lỗi
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                className={menuItemClassName}
                href={Constants.Routes.github}
                target="_blank"
              >
                <FaGithub />
                GitHub
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <button className={menuItemClassName} onClick={onToggleDrawer}>
                <FaCog /> Cài đặt
              </button>
            </DropdownMenuItem>
            {/* Divider */}
            {user && (
              <>
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuItem asChild>
                  <a
                    className={`${menuItemClassName} cursor-pointer`}
                    onClick={logout}
                  >
                    <FaSignOutAlt />
                    Đăng xuất
                  </a>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </li>
      </ul>
    </DropdownMenu>
  );
}
