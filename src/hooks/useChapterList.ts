import useSWR from 'swr'
import { Manga as MangaApi } from '../api'
import { GetMangaIdFeedRequestOptions } from '../api/manga'
import { Includes, Order } from '../api/static';
import { MangaContentRating } from '../api/manga';
import { ChapterList } from '../api/schema';
import { ExtendChapter } from '../api/extend';
import extendRelationship from '../utils/extendRelationship';

export const chaptersPerPage = 10;

export default function useChapterList(mangaId: string, options: GetMangaIdFeedRequestOptions) {
    let chapters: ExtendChapter[] = []
    // rewrite
    options.translatedLanguage = ['vi'];
    options.includes = [Includes.SCANLATION_GROUP, Includes.USER,];
    options.order = {
        volume: Order.DESC,
        chapter: Order.DESC,
    }
    options.contentRating = [MangaContentRating.EROTICA, MangaContentRating.PORNOGRAPHIC, MangaContentRating.SAFE, MangaContentRating.SUGGESTIVE]
    options.limit = chaptersPerPage;
    if (options.offset && options.offset > 10000) {
        options.offset = 10000 - options.limit
    }
    const { data, isLoading, error } = useSWR([mangaId, options], () => MangaApi.getMangaIdFeed(mangaId, options))
    const successData = data && (data.data as ChapterList).data
    if (successData) {
        chapters = successData.map(d => extendRelationship(d) as ExtendChapter)
    }
    return { chapters, data, isLoading, error }
}