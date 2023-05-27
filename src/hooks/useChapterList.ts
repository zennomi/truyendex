import useSWR from 'swr'
import { Manga as MangaApi } from '../api'
import { GetMangaIdFeedRequestOptions } from '../api/manga'
import { Includes, Order } from '../api/static';
import { MangaContentRating } from '../api/manga';

export const chaptersPerPage = 10;

export default function useChapterList(mangaId: string, options: GetMangaIdFeedRequestOptions) {

    // rewrite
    options.translatedLanguage = ['vi'];
    options.includes = [Includes.SCANLATION_GROUP, Includes.USER,];
    options.order = {
        volume: Order.DESC,
        chapter: Order.DESC,
    }
    options.contentRating = [MangaContentRating.EROTICA, MangaContentRating.PORNOGRAPHIC, MangaContentRating.SAFE, MangaContentRating.SUGGESTIVE]
    options.limit = chaptersPerPage;
    const { data, isLoading, error } = useSWR([mangaId, options], () => MangaApi.getMangaIdFeed(mangaId, options))

    return { data, isLoading, error }
}