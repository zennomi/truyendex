import useSWR from 'swr'
import { MangadexApi } from '@/api'

import { ChapterList, ExtendChapter } from '@/types/mangadex';
import { extendRelationship } from '@/utils/mangadex';
import { CHAPTER_LIST_LIMIT } from '@/constants';

export const chaptersPerPage = CHAPTER_LIST_LIMIT;

export default function useChapterList(mangaId: string, options: MangadexApi.Manga.GetMangaIdFeedRequestOptions) {
    let chapters: ExtendChapter[] = []
    // rewrite
    options.translatedLanguage = ['vi'];
    options.includes = [MangadexApi.Static.Includes.SCANLATION_GROUP, MangadexApi.Static.Includes.USER,];
    options.order = {
        volume: MangadexApi.Static.Order.DESC,
        chapter: MangadexApi.Static.Order.DESC,
    }
    options.contentRating = [MangadexApi.Static.MangaContentRating.EROTICA, MangadexApi.Static.MangaContentRating.PORNOGRAPHIC, MangadexApi.Static.MangaContentRating.SAFE, MangadexApi.Static.MangaContentRating.SUGGESTIVE]
    options.limit = chaptersPerPage;
    if (options.offset && options.offset > 10000) {
        options.offset = 10000 - options.limit
    }
    const { data, isLoading, error } = useSWR([mangaId, options], () => MangadexApi.Manga.getMangaIdFeed(mangaId, options))
    const successData = data && (data.data as ChapterList).data
    if (successData) {
        chapters = successData.map(d => extendRelationship(d) as ExtendChapter)
    }
    return { chapters, data, isLoading, error }
}