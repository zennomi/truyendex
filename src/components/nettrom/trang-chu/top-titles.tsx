"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import Skeleton from "react-loading-skeleton";

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
import { Utils } from "@/utils";
import { Constants } from "@/constants";
import { ErrorDisplay } from "../error-display";

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

const MangaTileSkeleton = (props: {
  order: number;
  hideCounter?: boolean;
  icon?: React.ReactNode;
  counter?: number;
}) => {
  const inTop3 = useMemo(() => {
    return props.order < 3;
  }, [props.order]);

  return (
    <li className="relative flex w-full gap-[8px] py-2" key={props.order}>
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
        <div className="relative w-[64px] shrink-0 rounded shadow-[-5px_0_20px_rgba(0,0,0,0.5)]">
          <AspectRatio ratio={1} className="overflow-hidden rounded">
            <div className="h-full w-full">
              <Skeleton height="100%" width="100%" />
            </div>
          </AspectRatio>
        </div>
        <div className="grow">
          <h3>
            <div className="line-clamp-2 font-semibold !text-white transition hover:no-underline">
              <Skeleton />
            </div>
          </h3>
          {!props.hideCounter && (
            <span className="mt-1 flex shrink-0 items-center gap-2 text-muted-foreground">
              {props.icon}
              <Skeleton width={20} />
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
            <h2 className="flex items-center gap-4 text-[20px] font-medium text-web-title">
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
              <ul className="flex flex-col gap-4">
                {topMangaListLoading
                  ? [...Array(7)].map((_, index) => (
                      <MangaTileSkeleton
                        order={index}
                        key={index}
                        icon={<FaStar />}
                      />
                    ))
                  : topMangaList.map((manga, index) => {
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
                {topMangaListError && (
                  <ErrorDisplay error={topMangaListError} />
                )}
              </ul>
            </TabsContent>
            <TabsContent value="favorite">
              <ul className="flex flex-col gap-4">
                {favoriteMangaListLoading
                  ? [...Array(7)].map((_, index) => (
                      <MangaTileSkeleton
                        order={index}
                        key={index}
                        icon={<FaHeart />}
                      />
                    ))
                  : favoriteMangaList.map((manga, index) => {
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
                              (mangaStatistics[manga.id]?.rating?.bayesian ||
                                0) * 10,
                            ) / 10
                          }
                        ></MangaTile>
                      );
                    })}
                {favoriteMangaListError && (
                  <ErrorDisplay error={favoriteMangaListError} />
                )}
              </ul>
            </TabsContent>
            <TabsContent value="new">
              <ul className="flex flex-col gap-4">
                {newMangaListLoading
                  ? [...Array(7)].map((_, index) => (
                      <MangaTileSkeleton
                        order={index}
                        key={index}
                        icon={<FaHeart />}
                      />
                    ))
                  : newMangaList.map((manga, index) => {
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
                {newMangaListError && (
                  <ErrorDisplay error={newMangaListError} />
                )}
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
