"use client";

import Iconify from "@/components/iconify";
import { Constants } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export default function UserDashboardLayoutView({
  children,
}: PropsWithChildren) {
  const { user, logout } = useAuth({
    middleware: "auth",
    redirectIfNotAuthenticated: Constants.Routes.login,
  });
  const pathname = usePathname();
  return (
    <section className="relative pb-16 lg:pb-24">
      <div className="container-fluid relative">
        <div className="profile-banner relative text-transparent">
          <input
            id="pro-banner"
            name="profile-banner"
            type="file"
            className="hidden"
          />
          <div className="relative shrink-0">
            <img
              src="/nettruyen/images/default-avatar.jpg"
              className="h-80 w-full object-cover"
              id="profile-banner"
              alt=""
            />
            <div className="absolute inset-0 bg-black/70" />
            <label
              className="absolute inset-0 cursor-pointer"
              htmlFor="pro-banner"
            />
          </div>
        </div>
      </div>
      {/*end container*/}
      <div className="container relative">
        <div className="md:flex">
          <div className="md:w-1/3 md:px-3 lg:w-1/4">
            <div className="relative -mt-32 md:-mt-32">
              <div className="rounded-md bg-white p-6 shadow dark:bg-slate-900 dark:shadow-gray-800">
                <div className="profile-pic mb-5 text-center">
                  <div>
                    <div className="relative mx-auto size-28">
                      <img
                        src="/nettruyen/images/default-avatar.jpg"
                        className="rounded-full shadow ring-4 ring-slate-50 dark:shadow-gray-800 dark:ring-slate-800"
                        id="profile-image"
                        alt=""
                      />
                    </div>
                    <div className="mt-4">
                      <h5 className="text-lg font-semibold">{user?.name}</h5>
                      <p className="text-slate-400">{user?.email}</p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-100 dark:border-gray-700">
                  <ul
                    className="sidebar-nav mb-0 mt-3 list-none"
                    id="navmenu-nav"
                  >
                    <li
                      className={twMerge(
                        "navbar-item account-menu",
                        pathname === Constants.Routes.dashboard.index
                          ? "active"
                          : "",
                      )}
                    >
                      <Link
                        href={Constants.Routes.dashboard.index}
                        className="navbar-link flex items-center rounded py-2 text-slate-400"
                      >
                        <span className="mb-0 me-2 text-[18px]">
                          <Iconify icon="uil-dashboard" />
                        </span>
                        <h6 className="mb-0 font-semibold">Thông tin chung</h6>
                      </Link>
                    </li>
                    <li
                      className={twMerge(
                        "navbar-item account-menu",
                        pathname === Constants.Routes.dashboard.settings
                          ? "active"
                          : "",
                      )}
                    >
                      <Link
                        href={Constants.Routes.dashboard.settings}
                        className="navbar-link flex items-center rounded py-2 text-slate-400"
                      >
                        <span className="mb-0 me-2 text-[18px]">
                          <Iconify icon="uil-setting" />
                        </span>
                        <h6 className="mb-0 font-semibold">Cài đặt</h6>
                      </Link>
                    </li>
                    <li className={"navbar-item account-menu"}>
                      <Link
                        href={Constants.Routes.nettrom.index}
                        className="navbar-link flex items-center rounded py-2 text-slate-400"
                      >
                        <span className="mb-0 me-2 text-[18px]">
                          <Iconify icon="uil-home" />
                        </span>
                        <h6 className="mb-0 font-semibold">Trang chủ</h6>
                      </Link>
                    </li>
                    <li className="navbar-item account-menu">
                      <button
                        onClick={logout}
                        className="navbar-link flex items-center rounded py-2 text-slate-400"
                      >
                        <span className="mb-0 me-2 text-[18px]">
                          <Iconify icon="uil-power" />
                        </span>
                        <h6 className="mb-0 font-semibold">Đăng xuất</h6>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[30px] md:mt-0 md:w-2/3 md:px-3 lg:w-3/4">
            {children}
          </div>
        </div>
        {/*end grid*/}
      </div>
      {/*end container*/}
    </section>
  );
}
