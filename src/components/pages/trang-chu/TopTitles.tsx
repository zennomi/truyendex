"use client";

import Link from "next/link";
import { useEffect } from "react";

import { MangadexApi } from "@/api";
import { useMangadex } from "@/contexts/mangadex";
import { useSearchManga } from "@/hooks/mangadex";
import routes from "@/routes";
import {
  getMangaTitle,
  getCoverArt,
  getOriginalMangaTitle,
  formatViews,
} from "@/utils/mangadex";
import { FaClock, FaHeart, FaStar, FaTrophy } from "react-icons/fa";
import { ExtendManga } from "@/types/mangadex";
import { AspectRatio } from "@/components/shadcn/aspect-ratio";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/tabs";

const MangaTile = (props: {
  manga: ExtendManga;
  title: string;
  order: number;
  hideCounter?: boolean;
  counter?: number;
  icon?: React.ReactNode;
}) => {
  return (
    <li className="w-full flex items-center gap-[16px]" key={props.manga.id}>
      <span
        className={`font-semibold text-[24px] txt-rank fn-order pos${props.order + 1}`}
      >
        {props.order + 1}
      </span>
      <div className="flex gap-4 items-start grow">
        <Link
          className="relative shrink-0 w-[64px]"
          title={props.title}
          href={routes.nettrom.manga(props.manga.id)}
        >
          <AspectRatio ratio={1} className="overflow-hidden rounded">
            <img
              className="lazy w-full h-full object-cover"
              src={getCoverArt(props.manga)}
              alt={props.title}
            />
          </AspectRatio>
        </Link>
        <div className="grow">
          <h3>
            <Link
              href={routes.nettrom.manga(props.manga.id)}
              className="line-clamp-2 transition hover:no-underline font-semibold !text-white"
            >
              {props.title}
            </Link>
          </h3>
          <p className="chapter top">
            <span className="text-muted-foreground">
              {getOriginalMangaTitle(props.manga)}
            </span>
          </p>
        </div>
        {!props.hideCounter && (
          <span className="shrink-0 items-center gap-2 flex text-muted-foreground">
            {props.icon}
            {formatViews(props.counter || 0)}
          </span>
        )}
      </div>
    </li>
  );
};

export default function TopTitles({ groupId }: { groupId?: string }) {
  const { mangaList: topMangaList } = useSearchManga({
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
  const { mangaList: newMangaList } = useSearchManga({
    limit: 7,
    includes: [MangadexApi.Static.Includes.COVER_ART],
    order: {
      createdAt: MangadexApi.Static.Order.DESC,
    },
    contentRating: [
      MangadexApi.Static.MangaContentRating.SAFE,
      MangadexApi.Static.MangaContentRating.SUGGESTIVE,
    ],
    hasAvailableChapters: "true",
    availableTranslatedLanguage: ["vi"],
    group: groupId ? groupId : undefined,
  });
  const { mangaList: favoriteMangaList } = useSearchManga({
    limit: 7,
    includes: [MangadexApi.Static.Includes.COVER_ART],
    order: {
      rating: MangadexApi.Static.Order.DESC,
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
    if (topMangaList.length > 0) {
      addMangas(topMangaList);
      updateMangaStatistics({ manga: topMangaList.map((m) => m.id) });
    }
  }, [topMangaList]);

  useEffect(() => {
    if (favoriteMangaList.length > 0) {
      addMangas(favoriteMangaList);
      updateMangaStatistics({ manga: favoriteMangaList.map((m) => m.id) });
    }
  }, [favoriteMangaList]);

  return (
    <div className="">
      <div className="">
        <div className="">
          <div className="flex items-center gap-3 justify-between mb-4">
            <h2 className="text-[20px] text-web-title flex items-center gap-2">
              <FaTrophy />
              Bảng xếp hạng tháng này
            </h2>
          </div>
          <Tabs defaultValue="top" className="w-full">
            <TabsList className="mb-4 grid grid-cols-3 h-[48px] bg-white/10 p-2">
              <TabsTrigger
                value="top"
                className="flex items-center gap-3 rounded h-full text-[14px]"
              >
                <FaStar />
                Top
              </TabsTrigger>
              <TabsTrigger
                value="favorite"
                className="flex items-center gap-3 rounded h-full text-[14px]"
              >
                <FaHeart />
                Yêu thích
              </TabsTrigger>
              <TabsTrigger
                value="new"
                className="flex items-center gap-3 rounded h-full text-[14px]"
              >
                <FaClock />
                Mới
              </TabsTrigger>
            </TabsList>
            <TabsContent value="top">
              <ul className="flex flex-col gap-4">
                {topMangaList.map((manga, index) => {
                  const title = getMangaTitle(manga);
                  return (
                    <MangaTile
                      order={index}
                      key={manga.id}
                      title={title}
                      manga={manga}
                      icon={<FaStar />}
                      counter={mangaStatistics[manga.id]?.follows || 0}
                    ></MangaTile>
                  );
                })}
              </ul>
            </TabsContent>
            <TabsContent value="favorite">
              <ul className="flex flex-col gap-4">
                {favoriteMangaList.map((manga, index) => {
                  const title = getMangaTitle(manga);
                  return (
                    <MangaTile
                      order={index}
                      key={manga.id}
                      title={title}
                      manga={manga}
                      icon={<FaHeart />}
                      counter={
                        Math.round(
                          (mangaStatistics[manga.id]?.rating?.bayesian || 0) *
                            10,
                        ) / 10
                      }
                    ></MangaTile>
                  );
                })}
              </ul>
            </TabsContent>
            <TabsContent value="new">
              <ul className="flex flex-col gap-4">
                {newMangaList.map((manga, index) => {
                  const title = getMangaTitle(manga);
                  return (
                    <MangaTile
                      order={index}
                      key={manga.id}
                      title={title}
                      manga={manga}
                      hideCounter
                    ></MangaTile>
                  );
                })}
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
