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
  FaPencilAlt,
  FaSignOutAlt,
  FaUser,
  FaSearch,
  FaBars,
} from "react-icons/fa";
import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/shadcn/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/shadcn/sheet";
import { Skeleton } from "@/components/shadcn/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { Constants } from "@/constants";
import { useSettingsContext } from "@/contexts/settings";

import MainNav from "./main-nav";
import SearchInput from "../common/search-input";

const menuItemClassName = "w-full cursor-pointer";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openMobileSearch, setOpenMobileSearch] = useState(false);
  const pathname = usePathname();
  const params = useSearchParams();

  useEffect(() => {
    setOpenMenu(false);
    setOpenMobileSearch(false);
  }, [pathname, params]);

  return (
    <header
      className="relative sticky top-0 z-50 flex min-h-16 w-full items-center border-b bg-background/95 shadow-sm backdrop-blur"
      id="header"
    >
      {openMobileSearch && (
        <div className="absolute inset-x-0 top-full border-b border-neutral-800 bg-neutral-900 p-3 md:hidden">
          <SearchInput />
        </div>
      )}

      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6 md:gap-10">
          <Link
            className="flex items-center space-x-2"
            title="Truyện tranh online"
            href={Constants.Routes.nettrom.index}
          >
            <img
              alt="Logo NetTrom"
              src={"/images/logo.png"}
              className="w-[120px] md:w-[150px]"
            />
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
          <div className="hidden max-w-sm flex-1 md:flex">
            <SearchInput />
          </div>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-md text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white md:hidden"
            aria-label="Search"
            onClick={() => setOpenMobileSearch((prev) => !prev)}
          >
            <FaSearch className="h-5 w-5" />
          </button>

          <a
            title="MangaDex"
            className="flex h-9 w-9 items-center justify-center rounded-md text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
            href="https://mangadex.org/"
            target="_blank"
            rel="noreferrer"
          >
            <FaCat className="h-5 w-5 text-[#FF6740]" />
          </a>

          <AuthDropdown desktop />

          <Sheet open={openMenu} onOpenChange={setOpenMenu}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-md text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white md:hidden"
                aria-label="Menu"
              >
                <FaBars className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="flex w-[300px] flex-col border-neutral-800 bg-neutral-900 p-0 text-neutral-200 sm:w-[400px]"
            >
              <SheetTitle className="sr-only">Menu Của NetTrom</SheetTitle>
              <div className="border-b border-neutral-800 p-4">
                <Link
                  className="flex items-center space-x-2"
                  title="Truyện tranh online"
                  href={Constants.Routes.nettrom.index}
                  onClick={() => setOpenMenu(false)}
                >
                  <img
                    alt="Logo NetTrom"
                    src={"/images/logo.png"}
                    className="w-[120px]"
                  />
                </Link>
              </div>
              <div className="px-4 py-2">
                <SearchInput />
              </div>
              <div className="flex flex-1 flex-col overflow-y-auto">
                <div className="px-2">
                  <MainNav />
                </div>
              </div>
              <div className="border-t border-neutral-800 p-4">
                <AuthDropdown />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function AuthDropdown({ desktop }: { desktop?: boolean }) {
  const { user, logout } = useAuth();
  const { onToggleDrawer } = useSettingsContext();

  if (user === undefined)
    return (
      <div className={desktop ? "hidden md:flex" : "flex"}>
        <Skeleton className="h-9 w-[120px] rounded-md" />
      </div>
    );

  return (
    <div className={desktop ? "hidden md:flex" : "flex"}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium text-neutral-300 outline-none transition-colors hover:bg-neutral-800 hover:text-white">
            <FaUser className="min-w-4" />
            <span className="max-w-[120px] truncate">
              {user?.name || "Tài khoản"}
            </span>
            <FaCaretDown className="opacity-50" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
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
              <DropdownMenuSeparator />
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
              <DropdownMenuSeparator />
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
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <button className={menuItemClassName} onClick={logout}>
                  <FaSignOutAlt />
                  Đăng xuất
                </button>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
