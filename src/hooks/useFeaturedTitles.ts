import { useState, useEffect } from "react"
import useSWR from "swr"
import { ExtendManga } from "../api/extend"
import { MangaContentRating } from "../api/manga"
import { MangaList } from "../api/schema"
import { Includes, Order } from "../api/static"
import extendRelationship from "../utils/extendRelationship"
import { Manga as MangaApi } from "../api"

export default function useFeaturedTitles() {
    const createdAtSince = new Date(Date.now() - 30 * 24 * 3600 * 1000)
    // const [featuredTitles, setFeaturedTitles] = useState<ExtendManga[]>([])
    const { data, isLoading, error } = useSWR('featured-titles', () => MangaApi.getSearchManga({
        includes: [Includes.COVER_ART, Includes.ARTIST, Includes.AUTHOR],
        order: {
            followedCount: Order.DESC,
        },
        contentRating: [MangaContentRating.SAFE, MangaContentRating.SUGGESTIVE],
        hasAvailableChapters: "true",
        availableTranslatedLanguage: ['vi'],
        createdAtSince: createdAtSince.toISOString().slice(0, -5)
    }))

    const featuredTitles = data && (data.data as MangaList).data ? (data.data as MangaList).data.map(m => extendRelationship(m) as ExtendManga) : []

    return { featuredTitles, isLoading, error }
}