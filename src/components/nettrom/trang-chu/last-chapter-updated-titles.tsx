"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";

import { useMangadex } from "@/contexts/mangadex";
import { Utils } from "@/utils";
import useReadingHistory from "@/hooks/useReadingHistory";
import { useHomepageSeries } from "@/hooks/core/useHomepageSeries";
import { useSettingsContext } from "@/contexts/settings";
import { MangadexApi } from "@/api";

import Pagination from "../Pagination";
import MangaTile, { MangaTileSkeleton } from "../manga-tile";
import { ErrorDisplay } from "../error-display";

export default function LastChapterUpdatedTitles() {
  const { filteredContent } = useSettingsContext();

  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const page = Number(params.get("page")) || 1;
  const [totalPage, setTotalPage] = useState(1);
  const { history } = useReadingHistory();
  const { data, isLoading, error, mutate } = useHomepageSeries({
    limit: 28,
    page,
  });

  const { mangas, mangaStatistics, updateMangas, updateMangaStatistics } =
    useMangadex();

  useEffect(() => {
    if (data?.data && data.data.length > 0) {
      updateMangas({
        ids: data?.data.map((c) => c.uuid),
      });
    }
  }, [data]);

  useEffect(() => {
    if (data?.data && data.data.length > 0) {
      updateMangaStatistics({
        manga: data?.data.map((c) => c.uuid),
      });
    }
  }, [data]);

  useEffect(() => {
    if (!data?.total) return;
    setTotalPage(Math.floor(data.total / 28));
  }, [data]);

  return (
    <div className="Module Module-163" id="new-updates">
      <div className="ModuleContent">
        <div className="items">
          <div className={`grid grid-cols-2 gap-[20px] lg:grid-cols-4`}>
            {isLoading
              ? [...Array(28)].map((_, index) => (
                  <div key={index}>
                    <MangaTileSkeleton />
                  </div>
                ))
              : data?.data.map((series) => {
                  const mangaId = series.uuid;
                  const coverArt = Utils.Mangadex.getCoverArt(
                    mangas[mangaId],
                    512,
                  );
                  const mangaTitle = Utils.Mangadex.getMangaTitle(
                    mangas[mangaId],
                  );
                  const readedChapters = history[mangaId];
                  return (
                    <MangaTile
                      id={mangaId}
                      key={mangaId}
                      thumbnail={coverArt}
                      title={mangaTitle}
                      chapters={series.chapters.map((chapter) => ({
                        id: chapter.uuid,
                        title: chapter.title,
                        updatedAt: chapter.md_updated_at,
                        subTitle: Utils.Date.formatNowDistance(
                          new Date(chapter.md_updated_at),
                        ),
                      }))}
                      readedChapters={readedChapters}
                      mangaStatistic={mangaStatistics[mangaId]}
                      className={
                        !filteredContent.includes(
                          MangadexApi.Static.MangaContentRating.PORNOGRAPHIC,
                        ) &&
                        mangas[mangaId]?.attributes.contentRating ===
                          MangadexApi.Static.MangaContentRating.PORNOGRAPHIC
                          ? "blur"
                          : ""
                      }
                    />
                  );
                })}
          </div>
          {error && <ErrorDisplay error={error} refresh={mutate} />}
        </div>
        <Pagination
          onPageChange={(event) => {
            router.push(`${pathname}?page=${event.selected + 1}#new-updates`);
          }}
          pageCount={totalPage}
          forcePage={page - 1}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
        />
      </div>
    </div>
  );
}
