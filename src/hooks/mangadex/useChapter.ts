import useSWR from "swr/immutable";
import { MangadexApi } from "@/api";

import { ChapterResponse, ExtendChapter } from "@/types/mangadex";
import { extendRelationship } from "@/utils/mangadex";

export default function useChapter(chapterId: string | null) {
    const { data, isLoading, error } = useSWR(chapterId ? ['chapter', chapterId] : null, () => MangadexApi.Chapter.getChapterId(chapterId!, {
        includes: [MangadexApi.Static.Includes.SCANLATION_GROUP,]
    }))
    const chapter = (data && (data.data as ChapterResponse)?.data) ? extendRelationship((data.data as ChapterResponse)?.data) as ExtendChapter : null
    return { chapter, data, isLoading, error }
}