import useSWR from "swr/immutable";
import { useEffect, useState } from "react";

import { MangadexApi } from "@/api";
import { ExtendChapter } from "@/types/mangadex";
import { extendRelationship } from "@/utils/mangadex";

export default function useChapter(chapterId: string | null) {
  const { data, isLoading, error } = useSWR(
    chapterId ? ["chapter", chapterId] : null,
    () =>
      MangadexApi.Chapter.getChapterId(chapterId!, {
        includes: [MangadexApi.Static.Includes.SCANLATION_GROUP],
      }),
  );

  const [chapter, setChapter] = useState<ExtendChapter | null>(null);

  useEffect(() => {
    if (!data?.data) return;
    setChapter(extendRelationship(data.data?.data) as ExtendChapter);
  }, [data]);

  return { chapter, data, isLoading, error };
}
