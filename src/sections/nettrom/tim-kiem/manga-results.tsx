"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";

import { useSearchManga } from "@/hooks/mangadex";
import routes from "@/routes";
import { useMangadex } from "@/contexts/mangadex";
import ReactPaginate from "react-paginate";
import { getSearchNetTromUrl } from "@/utils/url";
import Loading from "@/sections/nettrom/layout/loading";
import { getCoverArt, getMangaTitle, normalizeParams } from "@/utils/mangadex";

export default function MangaResults() {
  const router = useRouter();
  const params = useSearchParams();
  const options = normalizeParams(params);
  const { mangaList, data, isLoading } = useSearchManga(options);
  const { updateMangaStatistics, mangaStatistics, addMangas } = useMangadex();
  const offset = params.get("offset") ? parseInt(params.get("offset")!) : 0;
  const total = data ? data.total : 0;
  const limit = params.get("limit") ? parseInt(params.get("limit")!) : 24;
  const page = Math.floor(offset / limit);
  const goToPage = (toPage: number) => {
    options.offset = toPage * limit;
    router.push(getSearchNetTromUrl(options));
  };

  useEffect(() => {
    if (mangaList.length > 0) {
      addMangas(mangaList);
      updateMangaStatistics({ manga: mangaList.map((m) => m.id) });
    }
  }, [mangaList, addMangas, updateMangaStatistics]);

  if (isLoading) return <Loading title="Đang tìm truyện..." />;

  return (
    <div
      className={`Module Module-223 ${mangaList.length > 0 ? "min-h-0" : "min-h-screen"}`}
      id="results"
    >
      <div className="ModuleContent">
        <div className="items">
          <div className="row">
            {mangaList.map((manga) => {
              const mangaTitle = getMangaTitle(manga);
              const coverArt = getCoverArt(manga);
              return (
                <div className="item" key={manga.id}>
                  <figure className="clearfix">
                    <div className="image">
                      <a
                        title={mangaTitle}
                        href={routes.nettrom.manga(manga.id)}
                      >
                        <Image
                          src={coverArt}
                          className="lazy center"
                          data-original={coverArt}
                          alt={mangaTitle}
                        />
                      </a>
                      <div className="view clearfix">
                        <span className="pull-left">
                          <i className="fa fa-star"></i>{" "}
                          {mangaStatistics[manga.id]?.rating.bayesian.toFixed(
                            2,
                          ) || "N/A"}{" "}
                          <i className="fa fa-comment" />{" "}
                          {mangaStatistics[manga.id]?.comments?.repliesCount ||
                            "N/A"}{" "}
                          <i className="fa fa-heart" />{" "}
                          {mangaStatistics[manga.id]?.follows || "N/A"}
                        </span>
                      </div>
                    </div>
                    <figcaption>
                      <h3>
                        <Link
                          className="jtip"
                          data-jtip="#truyen-tranh-81754"
                          href={routes.nettrom.manga(manga.id)}
                        >
                          {mangaTitle}
                        </Link>
                      </h3>
                    </figcaption>
                  </figure>
                </div>
              );
            })}
          </div>
        </div>
        <div
          id="ctl00_mainContent_ctl02_divPager"
          className="pagination-outter"
        >
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={(event) => {
              goToPage(event.selected);
            }}
            pageRangeDisplayed={5}
            pageCount={Math.floor(total / limit)}
            previousLabel="<"
            renderOnZeroPageCount={null}
            marginPagesDisplayed={2}
            pageClassName="text-center"
            containerClassName="pagination"
            activeClassName="active"
            previousClassName="text-center"
            nextClassName="text-center"
            breakClassName="text-center"
            forcePage={page}
          />
        </div>
      </div>
    </div>
  );
}
