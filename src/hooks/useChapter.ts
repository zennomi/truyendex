import useSWR from "swr";
import { Chapter as ChapterApi } from "../api";
import { Includes } from "../api/static";
import { ChapterResponse } from "../api/schema";
import extendRelationship from "../utils/extendRelationship";
import { ExtendChapter } from "../api/extend";

export default function useChapter(chapterId: string | null) {
    const { data, isLoading, error } = useSWR(chapterId ? ['chapter', chapterId] : null, () => ChapterApi.getChapterId(chapterId!, {
        includes: [Includes.SCANLATION_GROUP,]
    }))
    const chapter = (data && (data.data as ChapterResponse)?.data) ? extendRelationship((data.data as ChapterResponse)?.data) as ExtendChapter : null
    return { chapter, data, isLoading, error }
}