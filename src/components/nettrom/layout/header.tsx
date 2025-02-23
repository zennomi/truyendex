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

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useAuth } from "@/hooks/useAuth";
import { Constants } from "@/constants";
import { useSettingsContext } from "@/contexts/settings";

import MainNav from "./main-nav";
import SearchInput from "../common/search-input";

const menuItemClassName =
  "flex gap-2 items-center w-full text-[#333] py-1 px-5 text-nowrap hover:text-[#ae4ad9] hover:bg-[#f5f5f5]";

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
    <Menu>
      <ul
        className={`nav-account list-inline ${desktop ? "hidden-xs pull-right mt-[14px]" : ""}`}
      >
        <li className="dropdown open">
          <MenuButton>
            <a
              data-toggle="dropdown"
              className="user-menu fn-userbox dropdown-toggle flex items-center gap-2"
            >
              <FaList className="inline" />{" "}
              <span className="max-w-[100px] truncate">
                {user?.name || "Menu"}
              </span>{" "}
              <FaCaretDown className="inline" />
            </a>
          </MenuButton>
          <MenuItems
            className="z-3 my-2 min-w-[160px] rounded bg-white py-1"
            anchor="bottom start"
          >
            {user ? (
              <>
                <MenuItem>
                  <Link
                    href={Constants.Routes.dashboard.index}
                    className={menuItemClassName}
                  >
                    <FaHome />
                    Trang cá nhân
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    className={menuItemClassName}
                    href={Constants.Routes.nettrom.following}
                  >
                    <FaBook />
                    Truyện theo dõi
                  </Link>
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem>
                  <Link
                    className={menuItemClassName}
                    href={Constants.Routes.login}
                  >
                    <FaUser />
                    Đăng nhập
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    className={menuItemClassName}
                    href={Constants.Routes.signup}
                  >
                    <FaPencilAlt />
                    Đăng ký
                  </Link>
                </MenuItem>
              </>
            )}
            <MenuItem>
              <Link
                className={menuItemClassName}
                href={Constants.Routes.nettrom.history}
              >
                <FaHistory />
                Lịch sử
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                className={menuItemClassName}
                href={Constants.Routes.report}
                target="_blank"
              >
                <FaBug />
                Báo lỗi
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                className={menuItemClassName}
                href={Constants.Routes.github}
                target="_blank"
              >
                <FaGithub />
                GitHub
              </Link>
            </MenuItem>
            <MenuItem>
              <button className={menuItemClassName} onClick={onToggleDrawer}>
                <FaCog /> Cài đặt
              </button>
            </MenuItem>
            {/* Divider */}
            {user && (
              <>
                <MenuItem>
                  <hr className="my-1" />
                </MenuItem>
                <MenuItem>
                  <a className={menuItemClassName} onClick={logout}>
                    <FaSignOutAlt />
                    Đăng xuất
                  </a>
                </MenuItem>
              </>
            )}
          </MenuItems>
        </li>
      </ul>
    </Menu>
  );
}
