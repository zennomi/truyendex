import useSWR from "swr/immutable"
import { MangadexApi } from "@/api"

export default function useChapterPages(chapterId: string | null) {
    const { data, isLoading, error } = useSWR(chapterId ? ['chapter-pages', chapterId] : null, () => MangadexApi.AtHome.getAtHomeServerChapterId(chapterId!, {
        forcePort443: false
    }))
    const successData = data && (data.data as MangadexApi.AtHome.GetAtHomeServerChapterIdResponse)?.chapter
    const pages = successData ? successData.data.map(originalData => `${(data.data as MangadexApi.AtHome.GetAtHomeServerChapterIdResponse).baseUrl}/data/${successData.hash}/${originalData}`) : []

    return { pages, isLoading, error }
}