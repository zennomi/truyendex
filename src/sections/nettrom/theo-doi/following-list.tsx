"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";

import routes from "@/routes";
import { useReadList } from "@/hooks/app";
import { getCoverArt, getMangaTitle } from "@/utils/mangadex";
import { AppApi, MangadexApi } from "@/api";
import { useMangadex } from "@/contexts/mangadex";
import { useAuth } from "@/hooks/useAuth";

export default function FollowingList() {
  useAuth({
    middleware: "auth",
    redirectIfNotAuthenticated: routes.loginWithRedirect(
      routes.nettrom.following,
    ),
  });
  const { updateMangas, updateMangaStatistics, mangaStatistics, mangas } =
    useMangadex();
  const [page, setPage] = useState(1);
  const { data, mutate } = useReadList(page);

  const unfollow = useCallback(async (mangaId: string) => {
    const { followed } = await AppApi.Series.followOrUnfollow(mangaId);
    toast(followed ? "Theo dõi thành công" : "Bỏ theo dõi thành công");
    await mutate();
  }, []);

  useEffect(() => {
    if (!data) return;
    const ids = data.data.map((d) => d.series_id);
    updateMangas({ ids, includes: [MangadexApi.Static.Includes.COVER_ART] });
    updateMangaStatistics({ manga: ids });
  }, [data]);

  return (
    <div>
      <div id="follow-content-section" className="center-side col-md-8">
        <div className="comics-followed-page Module Module-178">
          <div className="mrt15">
            <ul
              className="comment-nav text-center"
              style={{ fontSize: 16, marginBottom: 15 }}
            >
              <li className="active">
                {" "}
                <a>Mới cập nhật</a>{" "}
              </li>
            </ul>
          </div>
          <div className="items">
            <div className="row">
              {data?.data.map(({ series_id }) => {
                const manga = mangas[series_id];
                const title = getMangaTitle(manga);
                const coverArt = getCoverArt(manga);
                const url = routes.nettrom.manga(series_id);
                return (
                  <div className="item item-follow unread" key={series_id}>
                    <figure className="clearfix">
                      <div className="image">
                        {" "}
                        <Link title={title} href={url}>
                          {" "}
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
                            {(mangaStatistics[series_id] &&
                              Math.round(
                                (mangaStatistics[series_id].rating.bayesian ||
                                  0) * 10,
                              ) / 10) ||
                              "N/A"}{" "}
                            <i className="fa fa-comment" />{" "}
                            {(mangaStatistics[series_id] &&
                              mangaStatistics[series_id].comments
                                ?.repliesCount) ||
                              "N/A"}{" "}
                            <i className="fa fa-heart" />{" "}
                            {(mangaStatistics[series_id] &&
                              mangaStatistics[series_id].follows) ||
                              "N/A"}
                          </span>
                        </div>
                      </div>
                      <figcaption>
                        <div className="follow-action clearfix">
                          {" "}
                          {/* <a
                                                            href="javascript:void(0)"
                                                            className="mark-as-read"
                                                            data-id={25350}
                                                        >
                                                            <i className="fa fa-check"> </i> Đã đọc{" "}
                                                        </a>{" "} */}
                          <a
                            className="follow-url isFollow follow-link_a"
                            onClick={() => unfollow(series_id)}
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
                      </figcaption>
                    </figure>
                  </div>
                );
              })}
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
      </div>
    </div>
  );
}
