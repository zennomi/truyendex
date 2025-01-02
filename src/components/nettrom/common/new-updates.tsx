"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useLastUpdates } from "@/hooks/mangadex";
import { useMangadex } from "@/contexts/mangadex";
import Loading from "@/components/nettrom/layout/loading";
import { ExtendChapter } from "@/types/mangadex";
import { Utils } from "@/utils";
import { Constants } from "@/constants";
import Pagination from "../Pagination";

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
      const mangaId = chapter.manga?.id;
      if (!mangaId) continue;
      if (!updates[mangaId]) {
        updates[mangaId] = [];
      }
      updates[mangaId].push(chapter);
    }
  }

  useEffect(() => {
    if (chapters?.length > 0) {
      updateMangas({
        ids: chapters.filter((c) => !!c?.manga?.id).map((c) => c.manga!.id),
      });
    }
  }, [chapters]);

  useEffect(() => {
    if (chapters?.length > 0) {
      updateMangaStatistics({
        manga: chapters.filter((c) => !!c?.manga?.id).map((c) => c.manga!.id!),
      });
    }
  }, [chapters]);

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
              href={Constants.Routes.nettrom.search}
            >
              <i className="fa fa-filter"></i>
            </Link>
          </div>
          <div className="row">
            {Object.entries(updates).map(([mangaId, chapterList]) => {
              const coverArt = Utils.Mangadex.getCoverArt(mangas[mangaId]);
              const mangaTitle = Utils.Mangadex.getMangaTitle(mangas[mangaId]);
              return (
                <div className="item" key={chapterList[0].id}>
                  <figure className="clearfix">
                    <div className="image">
                      <Link
                        title={mangaTitle}
                        href={Constants.Routes.nettrom.manga(mangaId)}
                      >
                        <img
                          src={coverArt}
                          className="lazy h-full w-full object-cover"
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
                          href={Constants.Routes.nettrom.manga(mangaId)}
                        >
                          {mangaTitle}
                        </Link>
                      </h3>
                      <ul className="comic-item">
                        {chapterList.slice(0, 3).map((chapter) => (
                          <li
                            className="flex items-center justify-between gap-x-1"
                            key={chapter.id}
                          >
                            <Link
                              href={Constants.Routes.nettrom.chapter(
                                chapter.id,
                              )}
                              title={Utils.Mangadex.getChapterTitle(chapter)}
                              className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap text-[13px] !text-white"
                            >
                              {Utils.Mangadex.getChapterTitle(chapter)}
                            </Link>
                            <i className="whitespace-nowrap text-[11px] italic leading-[13px] text-[#999]">
                              {Utils.Date.formatNowDistance(
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
        <Pagination
          onPageChange={(event) => {
            setPage(event.selected);
          }}
          pageCount={Math.floor(total / Constants.Mangadex.LAST_UPDATES_LIMIT)}
          forcePage={page}
        />
      </div>
    </div>
  );
}
