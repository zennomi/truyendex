"use client";

import useSWR from "swr";
import { MangadexApi } from "@/api";
import { ExtendChapter } from "@/types/mangadex";
import { Constants } from "@/constants";
import { Utils } from "@/utils";

export const chaptersPerPage = Constants.Mangadex.LAST_UPDATES_LIMIT;

export default function useLastUpdates(options: {
  page: number;
  groupId?: string;
  filteredLanguages?: string[];
  filteredContentRating?: string[];
  originLanguages?: string[];
}) {
  const { page, groupId } = options;

  let total = 0;
  let offset = chaptersPerPage * page;
  if (offset > 10000) {
    offset = 10000 - chaptersPerPage;
  }
  const { data, isLoading, error } = useSWR(["last-updates", options], () =>
    MangadexApi.Chapter.getChapter({
      includes: ["scanlation_group"],
      translatedLanguage: options.filteredLanguages || ["vi"],
      contentRating: options.filteredContentRating
        ? (options.filteredContentRating as MangadexApi.Static.MangaContentRating[])
        : [
            MangadexApi.Static.MangaContentRating.SAFE,
            MangadexApi.Static.MangaContentRating.SUGGESTIVE,
            MangadexApi.Static.MangaContentRating.EROTICA,
          ],
      order: {
        readableAt: MangadexApi.Static.Order.DESC,
      },
      limit: chaptersPerPage,
      offset,
      groups: groupId ? [groupId] : undefined,
      originalLanguage: options.originLanguages || [],
    }),
  );

  if (data) {
    data.data.data.forEach(
      (c) => Utils.Mangadex.extendRelationship(c) as ExtendChapter,
    );
    total = data.data.total;
  }

  return {
    chapters: (data?.data.data || []) as ExtendChapter[],
    isLoading,
    error,
    total,
  };
}
