import useSWR from "swr/immutable"
import { getAtHomeServerChapterId } from "../api/atHome"
import { GetAtHomeServerChapterIdResponse } from "../api/atHome"

export default function useChapterPages(chapterId: string | null) {
    const { data, isLoading, error } = useSWR(chapterId ? ['chapter-pages', chapterId] : null, () => getAtHomeServerChapterId(chapterId!, {
        forcePort443: false
    }))
    const successData = data && (data.data as GetAtHomeServerChapterIdResponse)?.chapter
    const pages = successData ? successData.data.map(data => `https://uploads.mangadex.org/data/${successData.hash}/${data}`) : []

    return { pages, isLoading, error }
}