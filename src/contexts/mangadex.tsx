"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { uniq } from "lodash";

import {
  ExtendManga,
  GetMangasStatisticResponse,
  MangaList,
  MangaResponse,
  MangaStatistic,
} from "@/types/mangadex";
import { MangadexApi } from "@/api";
import { extendRelationship } from "@/utils/mangadex";

export type Mangas = { [k: string]: ExtendManga };
export type MangaStatistics = Record<string, MangaStatistic>;

export const MangadexContext = createContext<{
  mangas: Mangas;
  mangaStatistics: MangaStatistics;
  updateMangas: (
    options: MangadexApi.Manga.GetSearchMangaRequestOptions,
  ) => Promise<void>;
  updateMangaStatistics: (
    options: MangadexApi.Statistic.GetMangasStatisticRequestOptions,
  ) => Promise<void>;
  addMangas: (mangaList: ExtendManga[]) => void;
}>({
  mangas: {},
  mangaStatistics: {},
  updateMangas: () => new Promise(() => null),
  updateMangaStatistics: () => new Promise(() => null),
  addMangas: ([]) => null,
});

export const MangadexContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mangas, setMangas] = useState<Mangas>({});
  const [mangaStatistics, setMangaStatistics] = useState<MangaStatistics>({});

  const updateMangas = useCallback(
    async (options: MangadexApi.Manga.GetSearchMangaRequestOptions) => {
      if (!options.includes) {
        options.includes = [MangadexApi.Static.Includes.COVER_ART];
      }
      if (options.ids) {
        options.ids = uniq(
          options.ids.filter((id) => {
            if (!mangas[id]) return true;
            if (options.includes?.length === 1) return false;
            if (
              options.includes?.includes(MangadexApi.Static.Includes.AUTHOR) &&
              !mangas[id].author?.attributes
            )
              return true;
            if (
              options.includes?.includes(MangadexApi.Static.Includes.ARTIST) &&
              !mangas[id].artist?.attributes
            )
              return true;
            return false;
          }),
        );
      }
      if (!options.includes.includes(MangadexApi.Static.Includes.COVER_ART)) {
        options.includes.push(MangadexApi.Static.Includes.COVER_ART);
      }

      // nothing to update
      if (options.ids?.length === 0) return;

      // only one
      if (options.ids?.length === 1) {
        const mangaId = options.ids[0];
        const { data } = await MangadexApi.Manga.getMangaId(mangaId, {
          includes: options.includes,
        });
        if (data && (data as MangaResponse).data) {
          setMangas((prevMangas) => {
            prevMangas[mangaId] = extendRelationship(
              (data as MangaResponse).data,
            ) as ExtendManga;
            return { ...prevMangas };
          });
        }
        return;
      }

      // rewrite
      options.limit = 100;
      options.contentRating = [
        MangadexApi.Static.MangaContentRating.EROTICA,
        MangadexApi.Static.MangaContentRating.PORNOGRAPHIC,
        MangadexApi.Static.MangaContentRating.SAFE,
        MangadexApi.Static.MangaContentRating.SUGGESTIVE,
      ];
      try {
        const { data } = await MangadexApi.Manga.getSearchManga(options);
        if (data && (data as MangaList).data) {
          setMangas((prevMangas) => {
            for (const manga of (data as MangaList).data) {
              prevMangas[manga.id] = extendRelationship(manga) as ExtendManga;
            }
            return { ...prevMangas };
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    [mangas, setMangas],
  );

  const addMangas = useCallback(
    (mangaList: ExtendManga[]) => {
      setMangas((prevMangas) => {
        for (const manga of mangaList) {
          prevMangas[manga.id] = extendRelationship(manga) as ExtendManga;
        }
        return { ...prevMangas };
      });
    },
    [setMangas],
  );

  const updateMangaStatistics = useCallback(
    async (options: MangadexApi.Statistic.GetMangasStatisticRequestOptions) => {
      options.manga = uniq(options.manga.filter((id) => !mangaStatistics[id]));
      if (options.manga.length === 0) return;
      try {
        const { data } =
          await MangadexApi.Statistic.getMangasStatistic(options);
        if (data && (data as GetMangasStatisticResponse).statistics) {
          setMangaStatistics((prev) => ({
            ...prev,
            ...(data as GetMangasStatisticResponse).statistics,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    },
    [mangaStatistics, setMangaStatistics],
  );

  return (
    <MangadexContext.Provider
      value={{
        mangas,
        updateMangas,
        mangaStatistics,
        updateMangaStatistics,
        addMangas,
      }}
    >
      {children}
    </MangadexContext.Provider>
  );
};

export const useMangadex = () => useContext(MangadexContext);
