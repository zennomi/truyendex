import useSWR from "swr/immutable"
import { useMemo } from "react"
import { ExtendManga } from "../api/extend"
import { MangaContentRating } from "../api/manga"
import { MangaList } from "../api/schema"
import { Includes, Order } from "../api/static"
import extendRelationship from "../utils/extendRelationship"
import { Manga as MangaApi } from "../api"

export default function useFeaturedTitles() {
    const createdAtSince = new Date(Date.now() - 30 * 24 * 3600 * 1000)
    const { data, isLoading, error } = useSWR('featured-titles', () => MangaApi.getSearchManga({
        includes: [Includes.COVER_ART, Includes.ARTIST, Includes.AUTHOR],
        order: {
            followedCount: Order.DESC,
        },
        contentRating: [MangaContentRating.SAFE, MangaContentRating.SUGGESTIVE],
        hasAvailableChapters: "true",
        availableTranslatedLanguage: ['vi'],
        createdAtSince: createdAtSince.toISOString().slice(0, -13) + "00:00:00"
    }))

    const featuredTitles = useMemo(() => {
        const successData = data && data.data.result === "ok" && (data.data as MangaList)
        if (successData) return successData.data.map(m => extendRelationship(m) as ExtendManga)
        return []
    }, [data])

    return { featuredTitles, isLoading, error }
}