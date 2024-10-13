import { MangadexApi } from "@/api"
import useSearchManga from "./useSearchManga"

export default function useFeaturedTitles() {
    const createdAtSince = new Date(Date.now() - 30 * 24 * 3600 * 1000)

    return useSearchManga({
        includes: [MangadexApi.Static.Includes.COVER_ART, MangadexApi.Static.Includes.ARTIST, MangadexApi.Static.Includes.AUTHOR],
        order: {
            followedCount: MangadexApi.Static.Order.DESC,
        },
        contentRating: [MangadexApi.Static.MangaContentRating.SAFE, MangadexApi.Static.MangaContentRating.SUGGESTIVE],
        hasAvailableChapters: "true",
        availableTranslatedLanguage: ['vi'],
        createdAtSince: createdAtSince.toISOString().slice(0, -13) + "00:00:00",
        limit: 12,
    })
}