"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";

import { MangadexApi } from "@/api";
import { useMangadex } from "@/contexts/mangadex";
import { useSearchManga } from "@/hooks/mangadex";
import { FaClock, FaHeart, FaStar, FaTrophy } from "react-icons/fa";
import { ExtendManga } from "@/types/mangadex";
import { AspectRatio } from "@/components/shadcn/aspect-ratio";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/tabs";
import { DataLoader } from "@/components/DataLoader";
import { Utils } from "@/utils";
import { Constants } from "@/constants";
import { twMerge } from "tailwind-merge";

const loadingText = "Đang tải dữ liệu bảng xếp hạng...";

const MangaTile = (props: {
  manga: ExtendManga;
  title: string;
  order: number;
  hideCounter?: boolean;
  counter?: number;
  icon?: React.ReactNode;
}) => {
  const inTop3 = useMemo(() => {
    return props.order < 3;
  }, [props.order]);
  return (
    <li className="relative flex w-full gap-[8px] py-2" key={props.manga.id}>
      <div className="absolute left-4 top-0 flex h-[64px] w-8 items-center justify-center text-right">
        <span
          className={twMerge(
            `fn-order text-[64px] font-black leading-none text-muted-foreground/30 pos${props.order + 1}`,
            inTop3 && "text-muted-foreground",
          )}
        >
          {props.order + 1}
        </span>
      </div>
      <div className="flex grow items-start gap-4 pl-12">
        <Link
          className="relative w-[64px] shrink-0 rounded shadow-[-5px_0_20px_rgba(0,0,0,0.5)]"
          title={props.title}
          href={Constants.Routes.nettrom.manga(props.manga.id)}
        >
          <AspectRatio ratio={1} className="overflow-hidden rounded">
            <img
              className="lazy h-full w-full object-cover"
              src={Utils.Mangadex.getCoverArt(props.manga)}
              alt={props.title}
            />
          </AspectRatio>
        </Link>
        <div className="grow">
          <h3>
            <Link
              href={Constants.Routes.nettrom.manga(props.manga.id)}
              className="line-clamp-2 font-semibold !text-white transition hover:no-underline"
            >
              {props.title}
            </Link>
          </h3>
          {/* <p className="chapter top">
            <span className="text-muted-foreground">
              {Utils.Mangadex.getOriginalMangaTitle(props.manga)}
            </span>
          </p> */}
          {!props.hideCounter && (
            <span className="mt-1 flex shrink-0 items-center gap-2 text-muted-foreground">
              {props.icon}
              {Utils.Number.formatViews(props.counter || 0)}
            </span>
          )}
        </div>
      </div>
    </li>
  );
};

export default function TopTitles({ groupId }: { groupId?: string }) {
  const {
    mangaList: topMangaList,
    isLoading: topMangaListLoading,
    error: topMangaListError,
  } = useSearchManga({
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
  const {
    mangaList: newMangaList,
    isLoading: newMangaListLoading,
    error: newMangaListError,
  } = useSearchManga({
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
  const {
    mangaList: favoriteMangaList,
    isLoading: favoriteMangaListLoading,
    error: favoriteMangaListError,
  } = useSearchManga({
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
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-[20px] text-web-title">
              <FaTrophy />
              Bảng xếp hạng tháng này
            </h2>
          </div>
          <Tabs defaultValue="top" className="w-full">
            <TabsList className="mb-4 grid h-[48px] grid-cols-3 bg-white/10 p-2">
              <TabsTrigger
                value="top"
                className="flex h-full items-center gap-3 rounded text-[12px]"
              >
                <FaStar />
                Top
              </TabsTrigger>
              <TabsTrigger
                value="favorite"
                className="flex h-full items-center gap-3 rounded text-[12px]"
              >
                <FaHeart />
                Yêu thích
              </TabsTrigger>
              <TabsTrigger
                value="new"
                className="flex h-full items-center gap-3 rounded text-[12px]"
              >
                <FaClock />
                Mới
              </TabsTrigger>
            </TabsList>
            <TabsContent value="top">
              <DataLoader
                isLoading={topMangaListLoading}
                error={topMangaListError}
                loadingText={loadingText}
              >
                <ul className="flex flex-col gap-4">
                  {topMangaList.map((manga, index) => {
                    const title = Utils.Mangadex.getMangaTitle(manga);
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
              </DataLoader>
            </TabsContent>
            <TabsContent value="favorite">
              <DataLoader
                isLoading={favoriteMangaListLoading}
                error={favoriteMangaListError}
                loadingText={loadingText}
              >
                <ul className="flex flex-col gap-4">
                  {favoriteMangaList.map((manga, index) => {
                    const title = Utils.Mangadex.getMangaTitle(manga);
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
              </DataLoader>
            </TabsContent>
            <TabsContent value="new">
              <DataLoader
                isLoading={newMangaListLoading}
                error={newMangaListError}
                loadingText={loadingText}
              >
                <ul className="flex flex-col gap-4">
                  {newMangaList.map((manga, index) => {
                    const title = Utils.Mangadex.getMangaTitle(manga);
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
              </DataLoader>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
