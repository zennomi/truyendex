"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import ReactPaginate from "react-paginate";
import { useLastUpdates } from "@/hooks/mangadex";
import { useMangadex } from "@/contexts/mangadex";

import { formatNowDistance } from "@/utils/date-fns";
import routes from "@/routes";
import Loading from "@/sections/nettrom/layout/loading";
import { ExtendChapter } from "@/types/mangadex";
import { getCoverArt, getMangaTitle, getChapterTitle } from "@/utils/mangadex";
import { LAST_UPDATES_LIMIT } from "@/constants";

export default function NewUpdates({
  title,
  groupId,
}: {
  title?: string;
  groupId?: string;
}) {
  const [page, setPage] = useState(0);
  const { chapters, isLoading, error, total } = useLastUpdates({
    page,
    groupId,
  });
  const { mangas, updateMangas, updateMangaStatistics, mangaStatistics } =
    useMangadex();
  const updates: Record<string, ExtendChapter[]> = {};

  if (chapters) {
    for (const chapter of chapters) {
      const mangaId = chapter.manga?.id!;
      if (!updates[mangaId]) {
        updates[mangaId] = [];
      }
      updates[mangaId].push(chapter);
    }
  }

  useEffect(() => {
    if (chapters?.length > 0) {
      updateMangas({
        ids: chapters.filter((c) => !!c?.manga?.id).map((c) => c.manga?.id!),
      });
      updateMangaStatistics({
        manga: chapters.filter((c) => !!c?.manga?.id).map((c) => c.manga?.id!),
      });
    }
  }, [chapters, updateMangaStatistics, updateMangas]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  if (isLoading) return <Loading title="Đang tải các chương mới" />;
  if (error) return <div>error</div>;

  return (
    <div className="Module Module-163">
      <div className="ModuleContent">
        <div className="items">
          <div className="relative">
            <h1 className="page-title">
              {title ?? "Truyện mới cập nhật"}{" "}
              <i className="fa fa-angle-right" />
            </h1>
            <Link
              className="filter-icon"
              title="Tìm truyện nâng cao"
              href={routes.nettrom.search}
            >
              <i className="fa fa-filter"></i>
            </Link>
          </div>
          <div className="row">
            {Object.entries(updates).map(([mangaId, chapterList]) => {
              const coverArt = getCoverArt(mangas[mangaId]);
              const mangaTitle = getMangaTitle(mangas[mangaId]);
              return (
                <div className="item" key={chapterList[0].id}>
                  <figure className="clearfix">
                    <div className="image">
                      <Link
                        title={mangaTitle}
                        href={routes.nettrom.manga(mangaId)}
                      >
                        <Image
                          src={coverArt}
                          className="lazy w-full h-full object-cover"
                          data-original={coverArt}
                          alt={mangaTitle}
                        />
                      </Link>
                      <div className="view clearfix">
                        <span className="pull-left">
                          <i className="fa fa-star"></i>{" "}
                          {(mangaStatistics[mangaId] &&
                            Math.round(
                              (mangaStatistics[mangaId].rating.bayesian || 0) *
                                10,
                            ) / 10) ||
                            "N/A"}{" "}
                          <i className="fa fa-comment" />{" "}
                          {(mangaStatistics[mangaId] &&
                            mangaStatistics[mangaId].comments?.repliesCount) ||
                            "N/A"}{" "}
                          <i className="fa fa-heart" />{" "}
                          {(mangaStatistics[mangaId] &&
                            mangaStatistics[mangaId].follows) ||
                            "N/A"}
                        </span>
                      </div>
                    </div>
                    <figcaption>
                      <h3>
                        <Link
                          className="jtip"
                          data-jtip="#truyen-tranh-83823"
                          href={routes.nettrom.manga(mangaId)}
                        >
                          {mangaTitle}
                        </Link>
                      </h3>
                      <ul className="comic-item">
                        {chapterList.slice(0, 3).map((chapter) => (
                          <li
                            className="flex gap-x-1 items-center justify-between"
                            key={chapter.id}
                          >
                            <Link
                              href={routes.nettrom.chapter(chapter.id)}
                              title={getChapterTitle(chapter)}
                              className="flex-grow text-[13px] whitespace-nowrap overflow-hidden !text-white text-ellipsis"
                            >
                              {getChapterTitle(chapter)}
                            </Link>
                            <i className="text-[11px] text-[#999] italic leading-[13px] whitespace-nowrap">
                              {formatNowDistance(
                                new Date(chapter.attributes.readableAt),
                              )}
                            </i>
                          </li>
                        ))}
                      </ul>
                    </figcaption>
                  </figure>
                </div>
              );
            })}
          </div>
        </div>
        <div
          id="ctl00_mainContent_ctl00_divPager"
          className="pagination-outter"
        >
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={(event) => {
              setPage(event.selected);
            }}
            pageRangeDisplayed={5}
            pageCount={Math.floor(total / LAST_UPDATES_LIMIT)}
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
