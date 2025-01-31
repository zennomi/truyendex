"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useReadList } from "@/hooks/core";
import { AppApi, MangadexApi } from "@/api";
import { useMangadex } from "@/contexts/mangadex";
import Iconify from "@/components/iconify";
import { Utils } from "@/utils";
import { DataLoader } from "@/components/DataLoader";

import Pagination from "../Pagination";
import MangaTile from "../manga-tile";
import { Button } from "../Button";

export default function FollowingList() {
  const { updateMangas, updateMangaStatistics, mangaStatistics, mangas } =
    useMangadex();
  const [page, setPage] = useState(1);
  const { data, mutate, isLoading, error } = useReadList(page);

  const unfollow = useCallback(
    async (mangaId: string) => {
      const { followed } = await AppApi.Series.followOrUnfollow(mangaId);
      toast(followed ? "Theo dõi thành công" : "Bỏ theo dõi thành công");
      await mutate();
    },
    [mutate],
  );

  useEffect(() => {
    if (!data) return;
    const ids = data.data.map((d) => d.series_uuid);
    updateMangas({ ids, includes: [MangadexApi.Static.Includes.COVER_ART] });
    updateMangaStatistics({ manga: ids });
  }, [data, updateMangaStatistics, updateMangas]);

  return (
    <div>
      <div className="items">
        <div className="row">
          <DataLoader
            loadingText="Đang tải danh sách truyện bạn theo dõi..."
            isLoading={isLoading}
            error={error}
          >
            <div className="grid grid-cols-2 gap-[20px] lg:grid-cols-4">
              {data?.data.map(
                ({
                  series_uuid,
                  latest_chapter_uuid,
                  title,
                  chapter_updated_at,
                  chapter_title,
                }) => {
                  const manga = mangas[series_uuid];

                  return (
                    <div key={series_uuid}>
                      <MangaTile
                        id={series_uuid}
                        thumbnail={Utils.Mangadex.getCoverArt(manga)}
                        title={title}
                        key={series_uuid}
                        mangaStatistic={mangaStatistics[series_uuid]}
                        chapters={[
                          {
                            id: latest_chapter_uuid,
                            title: chapter_title,
                            subTitle: Utils.Date.formatNowDistance(
                              new Date(chapter_updated_at),
                            ),
                          },
                        ]}
                      />
                      <Button
                        onClick={() => unfollow(series_uuid)}
                        icon={<Iconify icon="fa:times-circle" />}
                        className="mt-2 w-full"
                      >
                        Bỏ theo dõi
                      </Button>
                    </div>
                  );
                },
              )}
            </div>
          </DataLoader>
        </div>
      </div>
      {data && (
        <div className="pagination-container pagination-outter">
          <Pagination
            onPageChange={(event) => {
              setPage(event.selected + 1);
            }}
            pageCount={data.last_page}
            forcePage={page - 1}
          />
        </div>
      )}
    </div>
  );
}
