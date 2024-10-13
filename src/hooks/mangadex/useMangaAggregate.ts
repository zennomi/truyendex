import useSWR from "swr/immutable"
import { MangadexApi } from "@/api";
import { ChapterItem } from "@/types/mangadex";

export default function useAggregate(id: string | null, options: MangadexApi.Manga.GetMangaIdAggregateRequestOptions) {
    const { data, isLoading, error } = useSWR(id ? [id, options] : null, () => MangadexApi.Manga.getMangaIdAggregate(id!, options))
    const aggregate = data && (data.data as MangadexApi.Manga.GetMangaIdAggregateResponse).volumes ? (data.data as MangadexApi.Manga.GetMangaIdAggregateResponse).volumes : null
    let chapterList: ChapterItem[] = []
    if (aggregate) {
        for (const volume of Object.values(aggregate)) {
            for (const chapter of Object.values(volume.chapters)) {
                chapterList.push({ volume: volume.volume, chapter: chapter.chapter, id: chapter.id, })
            }
        }
        chapterList = chapterList.sort((a, b) => {
            if (a.volume === b.volume) {
                return parseFloat(a.chapter) - parseFloat(b.chapter)
            }
            if (a.volume === "none") return 1
            if (b.volume === "none") return -1
            return parseFloat(a.volume) - parseFloat(b.volume)
        })
    }

    return { chapterList, aggregate, data, isLoading, error }
}