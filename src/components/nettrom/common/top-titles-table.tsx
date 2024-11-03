"use client";

import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";

import { MangadexApi } from "@/api";
import { useMangadex } from "@/contexts/mangadex";
import { useSearchManga } from "@/hooks/mangadex";
import { Utils } from "@/utils";
import { Constants } from "@/constants";

export default function TopTitles({ groupId }: { groupId?: string }) {
  const { mangaList } = useSearchManga({
    limit: 7,
    includes: [MangadexApi.Static.Includes.COVER_ART],
    order: {
      followedCount: MangadexApi.Static.Order.DESC,
    },
    contentRating: [
      MangadexApi.Static.MangaContentRating.SAFE,
      MangadexApi.Static.MangaContentRating.SUGGESTIVE,
    ],
    hasAvailableChapters: "true",
    availableTranslatedLanguage: ["vi"],
    group: groupId ? groupId : undefined,
  });

  const { addMangas, updateMangaStatistics, mangaStatistics } = useMangadex();

  useEffect(() => {
    if (mangaList.length > 0) {
      addMangas(mangaList);
      updateMangaStatistics({ manga: mangaList.map((m) => m.id) });
    }
  }, [mangaList]);

  return (
    <div className="comic-wrap Module Module-168">
      <div className="ModuleContent">
        <div className="box-tab box darkBox">
          <ul className="tab-nav clearfix">
            <li>
              <Link
                rel="nofollow"
                title="BXH truyện tranh theo tháng"
                className="active"
                href={`${Constants.Routes.nettrom.search}?order[followedCount]=desc#results`}
              >
                Top
              </Link>
            </li>
            <li>
              <Link
                rel="nofollow"
                title="BXH truyện tranh theo tuần"
                href={`${Constants.Routes.nettrom.search}?order[rating]=desc#results`}
              >
                Yêu thích
              </Link>
            </li>
            <li>
              <Link
                rel="nofollow"
                title="BXH truyện tranh theo ngày"
                href={`${Constants.Routes.nettrom.search}?order[createdAt]=desc#results`}
              >
                Mới
              </Link>
            </li>
          </ul>
          <div className="tab-pane">
            <div id="topMonth">
              <ul className="list-unstyled">
                {mangaList.map((manga, index) => {
                  const title = Utils.Mangadex.getMangaTitle(manga);
                  return (
                    <li className="clearfix" key={manga.id}>
                      <span className={`txt-rank fn-order pos${index + 1}`}>
                        0{index + 1}
                      </span>
                      <div className="t-item comic-item" data-id={17696}>
                        <Link
                          className="thumb relative"
                          title={title}
                          href={Constants.Routes.nettrom.manga(manga.id)}
                        >
                          <Image
                            fill={true}
                            className="lazy h-full w-full object-cover"
                            src={Utils.Mangadex.getCoverArt(manga)}
                            alt={title}
                          />
                        </Link>
                        <h3 className="title">
                          <Link href={Constants.Routes.nettrom.manga(manga.id)}>
                            {title}
                          </Link>
                        </h3>
                        <p className="chapter top">
                          <Link
                            title={title}
                            href={Constants.Routes.nettrom.manga(manga.id)}
                          >
                            {Utils.Mangadex.getOriginalMangaTitle(manga)}
                          </Link>
                          <span className="view pull-right">
                            <i className="fa fa-star"></i>{" "}
                            {mangaStatistics[manga.id]?.follows || 0}
                          </span>
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div id="topWeek"></div>
            <div id="topDay"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
