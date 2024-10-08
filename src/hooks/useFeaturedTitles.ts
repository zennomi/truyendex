import useSWR from "swr/immutable"
import { useMemo } from "react"
import { ExtendManga } from "../api/extend"
import { MangaContentRating } from "../api/manga"
import { MangaList } from "../api/schema"
import { Includes, Order } from "../api/static"
import extendRelationship from "../utils/extendRelationship"
import { Manga as MangaApi } from "../api"
import useSearchManga from "./useSearchManga"

export default function useFeaturedTitles() {
    const createdAtSince = new Date(Date.now() - 30 * 24 * 3600 * 1000)

    return useSearchManga({
        includes: [Includes.COVER_ART, Includes.ARTIST, Includes.AUTHOR],
        order: {
            followedCount: Order.DESC,
        },
        contentRating: [MangaContentRating.SAFE, MangaContentRating.SUGGESTIVE],
        hasAvailableChapters: "true",
        availableTranslatedLanguage: ['vi'],
        createdAtSince: createdAtSince.toISOString().slice(0, -13) + "00:00:00",
        limit: 12,
    })
}