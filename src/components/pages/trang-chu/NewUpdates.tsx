"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import ReactPaginate from "react-paginate";
import { useLastUpdates } from "@/hooks/mangadex";
import { useMangadex } from "@/contexts/mangadex";

import { formatNowDistance } from "@/utils/date-fns";
import routes from "@/routes";
import Loading from "@/sections/nettrom/layout/loading";
import { ExtendChapter } from "@/types/mangadex";
import {
  getCoverArt,
  getMangaTitle,
  getChapterTitle,
  formatViews,
} from "@/utils/mangadex";
import { AppConstants, LAST_UPDATES_LIMIT } from "@/constants";
import { FaClock } from "react-icons/fa";
import { AspectRatio } from "@/components/shadcn/aspect-ratio";

const MangaTile = (props: {
  id: string;
  title: string;
  thumbnail: string;
  chapters: ExtendChapter[];
}) => {
  const { mangaStatistics } = useMangadex();
  return (
    <div className="group">
      <figure className="clearfix">
        <div className="relative mb-2">
          <Link title={props.title} href={routes.nettrom.manga(props.id)}>
            <AspectRatio
              ratio={AppConstants.MANGA_COVER_RATIO}
              className="rounded-lg overflow-hidden group-hover:shadow-lg"
            >
              <div className="z-[1] absolute bottom-0 left-0 w-full duration-500 h-3/5 transition-all bg-gradient-to-t from-black from-[15%] to-transparent"></div>
              <img
                src={props.thumbnail}
                className="lazy w-full h-full object-cover group-hover:scale-[102%] transition duration-500"
                data-original={props.thumbnail}
                alt={props.title}
              />
            </AspectRatio>
          </Link>
          <div className="z-[2] absolute bottom-0 left-0 w-full px-2 py-1.5">
            <h3 className="mb-2 font-semibold text-[16px] text-white transition line-clamp-2 leading-tight">
              {props.title}
            </h3>
            <span className="items-center justify-between gap-[8px] flex text-muted-foreground text-[12px]">
              <span className="flex items-center gap-[4px]">
                <i className="fa fa-star"></i>
                {formatViews(
                  Math.round(
                    (mangaStatistics[props.id]?.rating?.bayesian || 0) * 10,
                  ) / 10,
                )}
              </span>
              <span className="flex items-center gap-[4px]">
                <i className="fa fa-comment" />
                {formatViews(
                  mangaStatistics[props.id]?.comments?.repliesCount || 0,
                )}
              </span>
              <span className="flex items-center gap-[4px]">
                <i className="fa fa-heart" />
                {formatViews(mangaStatistics[props.id]?.follows || 0)}
              </span>
            </span>
          </div>
        </div>
        <figcaption>
          <ul className="flex flex-col gap-[4px]">
            {props.chapters.slice(0, 3).map((chapter) => (
              <li
                className="flex gap-x-2 items-center justify-between text-[12px]"
                key={chapter.id}
              >
                <Link
                  href={routes.nettrom.chapter(chapter.id)}
                  title={getChapterTitle(chapter)}
                  className="flex-grow  whitespace-nowrap overflow-hidden  text-web-title hover:text-web-titleLighter transition text-ellipsis"
                >
                  {getChapterTitle(chapter)}
                </Link>
                <span className="text-muted-foreground leading-[13px] whitespace-nowrap">
                  {formatNowDistance(new Date(chapter.attributes.readableAt))}
                </span>
              </li>
            ))}
          </ul>
        </figcaption>
      </figure>
    </div>
  );
};

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
            <h1 className="items-center flex gap-3 text-web-title text-[20px] mb-5">
              <FaClock />
              <span>Truyện mới cập nhật</span>
            </h1>
            {/* <Link
              className="filter-icon"
              title="Tìm truyện nâng cao"
              href={routes.nettrom.search}
            >
              <i className="fa fa-filter"></i>
            </Link> */}
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-[20px]">
            {Object.entries(updates).map(([mangaId, chapterList]) => {
              const coverArt = getCoverArt(mangas[mangaId]);
              const mangaTitle = getMangaTitle(mangas[mangaId]);
              return (
                <MangaTile
                  id={mangaId}
                  key={mangaId}
                  thumbnail={coverArt}
                  title={mangaTitle}
                  chapters={chapterList}
                />
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
