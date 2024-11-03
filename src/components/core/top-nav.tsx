"use client";

import Link from "next/link";

import { MangadexApi } from "@/api";
import Iconify from "@/components/iconify";
import { useToggle } from "@/hooks/useToggle";
import { Utils } from "@/utils";
import { Constants } from "@/constants";

export default function TopNav() {
  const [openMenu, toggleMenu] = useToggle(false);

  return (
    <nav id="topnav" className="defaultscroll bg-white dark:bg-slate-900">
      <div className="container">
        {/* Logo container*/}
        <Link className="logo pl-0" href={"/"}>
          <img
            src={"/images/logo.png"}
            className="hidden h-6 dark:inline-block"
            alt="truyendex logo"
            height={24}
          />
        </Link>
        {/* End Logo container*/}
        <div className="menu-extras">
          <div className="menu-item">
            {/* Mobile menu toggle*/}
            <a className="navbar-toggle" id="isToggle" onClick={toggleMenu}>
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
        <ul className="buy-button mb-0 list-none">
          <li className="mb-0 inline">
            <a
              href="https://www.facebook.com/Zennomi"
              target="_blank"
              className="btn btn-icon rounded-full border-indigo-600/10 bg-indigo-600/5 text-indigo-600 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white"
            >
              <Iconify icon="eva:facebook-fill" className="h-4 w-4" />
            </a>
          </li>
          <li className="mb-0 inline pl-1">
            <a
              href="https://github.com/zennomi/truyendex"
              target="_blank"
              className="btn btn-icon rounded-full border-indigo-600 bg-indigo-600 text-white hover:border-indigo-700 hover:bg-indigo-700"
            >
              <Iconify icon="eva:github-fill" className="h-4 w-4" />
            </a>
          </li>
        </ul>
        {/*Login button End*/}
        <div id="navigation" className={openMenu ? "open" : ""}>
          {/* Navigation Menu*/}
          <ul
            className={`navigation-menu md:flex ${openMenu ? "block" : "hidden"}`}
          >
            <li>
              <Link
                href={Constants.Routes.nettrom.index}
                className="sub-menu-item"
              >
                Bản thử nghiệm
              </Link>
            </li>
            <li className="has-submenu parent-parent-menu-item hidden md:block">
              <a href="#">Tìm truyện</a>
              <span className="menu-arrow" />
              <ul className="submenu">
                <li className="has-submenu parent-menu-item">
                  <a href="#"> Chủ đề</a>
                  <span className="submenu-arrow" />
                  <ul className="submenu scrollbar max-h-[80vh] overflow-scroll">
                    {Constants.Nettrom.tags
                      .filter((tag) => tag.attributes.group === "theme")
                      .map((tag) => (
                        <li key={tag.id}>
                          <Link
                            href={Utils.Url.getSearchNetTromUrl({
                              includedTags: [tag.id],
                            })}
                            className="sub-menu-item"
                          >
                            {Utils.Mangadex.transLocalizedStr(
                              tag.attributes.name,
                            )}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </li>
                <li className="has-submenu parent-menu-item">
                  <a href="#"> Thể loại</a>
                  <span className="submenu-arrow" />
                  <ul className="submenu scrollbar max-h-[80vh] overflow-scroll">
                    {Constants.Nettrom.tags
                      .filter((tag) => tag.attributes.group === "genre")
                      .map((tag) => (
                        <li key={tag.id}>
                          <Link
                            href={Utils.Url.getSearchNetTromUrl({
                              includedTags: [tag.id],
                            })}
                            className="sub-menu-item"
                          >
                            {Utils.Mangadex.transLocalizedStr(
                              tag.attributes.name,
                            )}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </li>
                <li className="has-submenu parent-menu-item">
                  <a href="#"> Đối tượng </a>
                  <span className="submenu-arrow" />
                  <ul className="submenu">
                    {Object.values(
                      MangadexApi.Static.MangaPublicationDemographic,
                    ).map((demographic) => (
                      <li key={demographic}>
                        <Link
                          href={Utils.Url.getSearchNetTromUrl({
                            publicationDemographic: [demographic],
                          })}
                          className="sub-menu-item"
                        >
                          {" "}
                          {demographic}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="has-submenu parent-menu-item">
                  <a href="#"> Hình thức</a>
                  <span className="submenu-arrow" />
                  <ul className="submenu">
                    {Constants.Nettrom.tags
                      .filter((tag) => tag.attributes.group === "format")
                      .map((tag) => (
                        <li key={tag.id}>
                          <Link
                            href={Utils.Url.getSearchNetTromUrl({
                              includedTags: [tag.id],
                            })}
                            className="sub-menu-item"
                          >
                            {Utils.Mangadex.transLocalizedStr(
                              tag.attributes.name,
                            )}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <Link href={Constants.Routes.login} className="sub-menu-item">
                Đăng nhập
              </Link>
            </li>
            <li>
              <a
                href="https://ln.hako.vn/"
                className="sub-menu-item"
                target="_blank"
              >
                Light Novel
              </a>
            </li>
          </ul>
          {/*end navigation menu*/}
        </div>
        {/*end navigation*/}
      </div>
      {/*end container*/}
    </nav>
  );
}
