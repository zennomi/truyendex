"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { useReadList } from "@/hooks/core";
import { AppApi, MangadexApi } from "@/api";
import { useMangadex } from "@/contexts/mangadex";
import { Utils } from "@/utils";
import { Constants } from "@/constants";
import { DataLoader } from "@/components/DataLoader";

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
            {data?.data.map(
              ({
                series_uuid,
                latest_chapter_uuid,
                title,
                chapter_updated_at,
                chapter_title,
              }) => {
                const manga = mangas[series_uuid];
                if (!title) title = Utils.Mangadex.getMangaTitle(manga);
                const coverArt = Utils.Mangadex.getCoverArt(manga);
                const url = Constants.Routes.nettrom.manga(series_uuid);
                return (
                  <div className="item item-follow unread" key={series_uuid}>
                    <figure className="clearfix">
                      <div className="image">
                        <Link title={title} href={url}>
                          <img
                            src={coverArt}
                            className="lazy center image-thumb"
                            data-original={coverArt}
                            alt={title}
                            referrerPolicy="origin"
                          />
                        </Link>
                        <div className="view clearfix">
                          <span className="pull-left">
                            <i className="fa fa-star"></i>{" "}
                            {(mangaStatistics[series_uuid] &&
                              Math.round(
                                (mangaStatistics[series_uuid].rating.bayesian ||
                                  0) * 10,
                              ) / 10) ||
                              "N/A"}{" "}
                            <i className="fa fa-comment" />{" "}
                            {(mangaStatistics[series_uuid] &&
                              mangaStatistics[series_uuid].comments
                                ?.repliesCount) ||
                              "N/A"}{" "}
                            <i className="fa fa-heart" />{" "}
                            {(mangaStatistics[series_uuid] &&
                              mangaStatistics[series_uuid].follows) ||
                              "N/A"}
                          </span>
                        </div>
                      </div>
                      <figcaption>
                        <div className="follow-action clearfix">
                          <a
                            className="follow-url isFollow follow-link_a"
                            onClick={() => unfollow(series_uuid)}
                          >
                            {" "}
                            <i className="fa fa-times" />{" "}
                            <span>Bỏ theo dõi</span>{" "}
                          </a>{" "}
                        </div>
                        <h3>
                          {" "}
                          <Link className="jtip" href={url}>
                            {title}
                          </Link>{" "}
                        </h3>
                        <ul>
                          <li className="chapter clearfix">
                            <Link
                              href={Constants.Routes.nettrom.chapter(
                                latest_chapter_uuid,
                              )}
                            >
                              {chapter_title || "Không tên"}
                            </Link>
                            <i className="time">
                              {Utils.Date.formatNowDistance(
                                new Date(chapter_updated_at),
                              )}
                            </i>
                          </li>
                        </ul>
                      </figcaption>
                    </figure>
                  </div>
                );
              },
            )}
          </DataLoader>
        </div>
      </div>
      {data && (
        <div className="pagination-container pagination-outter">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={(event) => {
              setPage(event.selected + 1);
            }}
            pageRangeDisplayed={5}
            pageCount={data.last_page}
            previousLabel="<"
            renderOnZeroPageCount={null}
            marginPagesDisplayed={2}
            pageClassName="text-center"
            containerClassName="pagination"
            activeClassName="active"
            previousClassName="text-center"
            nextClassName="text-center"
            breakClassName="text-center"
            forcePage={page - 1}
          />
        </div>
      )}
    </div>
  );
}
