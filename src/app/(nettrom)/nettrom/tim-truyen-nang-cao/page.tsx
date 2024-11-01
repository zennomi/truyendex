import Link from "next/link";
import { Metadata } from "next";
import { Suspense } from "react";
import SearchMangaForm from "@/components/sections/nettrom/tim-kiem/search-manga-form";
import MangaResults from "@/components/sections/nettrom/tim-kiem/manga-results";
import { Constants } from "@/constants";

export const metadata: Metadata = {
  title: `Tìm truyện đọc tại ${Constants.APP_NAME}`,
};

export default function AdvancedSearch() {
  return (
    <>
      <div id="ctl00_Breadcrumbs_pnlWrapper">
        <ul className="breadcrumb" itemType="http://schema.org/BreadcrumbList">
          <li itemProp="itemListElement" itemType="http://schema.org/ListItem">
            <Link
              href={Constants.Routes.nettrom.index}
              className="itemcrumb"
              itemProp="item"
              itemType="http://schema.org/Thing"
            >
              <span itemProp="name">Trang chủ</span>
            </Link>
            <meta itemProp="position" content={"1"} />
          </li>
          <li itemProp="itemListElement" itemType="http://schema.org/ListItem">
            <Link
              href={Constants.Routes.nettrom.search}
              className="itemcrumb active"
              itemProp="item"
              itemType="http://schema.org/Thing"
            >
              <span itemProp="name">Tìm truyện</span>
            </Link>
            <meta itemProp="position" content={"2"} />
          </li>
        </ul>
      </div>
      <div className="row">
        <div className="full-width col-sm-12">
          <div className="Module Module-239">
            <div className="ModuleContent">
              <div className="notify_block">
                <div className="info">
                  <em className="fa fa-info-circle" />
                </div>
                Mẹo: Nếu bạn không thích thể loại Trung Quốc có thể bỏ check{" "}
                <span className="icon-cross"> </span> Harem.{" "}
                <span style={{ color: "#ff0000" }}>Nhấn 2 lần để bỏ check</span>
              </div>
            </div>
          </div>
          <div className="Module Module-222">
            <div className="ModuleContent">
              <div className="comic-filter mrb10">
                <h1 className="text-center">Tìm truyện nâng cao</h1>
              </div>
              {/* <div className="text-center mrb5">
                                <button type="button" className="btn btn-info btn-collapse">
                                    <span className="show-text hidden">Hiện </span>
                                    <span className="hide-text">Ẩn </span>khung tìm kiếm{" "}
                                    <i className="fa fa-angle-double-up" />
                                </button>
                            </div> */}
              <Suspense>
                <SearchMangaForm />
              </Suspense>
            </div>
          </div>
          <Suspense>
            <MangaResults />
          </Suspense>
        </div>
      </div>
    </>
  );
}
