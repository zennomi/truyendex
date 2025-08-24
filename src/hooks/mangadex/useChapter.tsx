import { useEffect, useState } from "react";
import useSWR from "swr/immutable";

import { MangadexApi } from "@/api";
import { Chapter, ExtendChapter } from "@/types/mangadex";
import { Utils } from "@/utils";

export default function useChapter(
  chapterId: string | null,
  prefectchedChapter: Chapter,
) {
  const { data, isLoading, error } = useSWR(
    chapterId ? ["chapter", chapterId] : null,
    () =>
      MangadexApi.Chapter.getChapterId(chapterId!, {
        includes: [MangadexApi.Static.Includes.SCANLATION_GROUP],
      }),
    {
      // Disable revalidation for initial load to avoid duplicate API calls
      revalidateOnMount: false,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    },
  );

  const [chapter, setChapter] = useState<ExtendChapter | null>(
    prefectchedChapter,
  );

  useEffect(() => {
    if (!data?.data) return;
    setChapter(
      Utils.Mangadex.extendRelationship(data.data?.data) as ExtendChapter,
    );
  }, [data]);

  return { chapter, data, isLoading, error };
}
