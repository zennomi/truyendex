"use client"

import useSWR from 'swr'
import { useEffect, useState } from 'react';
import { Chapter as ChapterApi, Manga as MangaApi } from '../api';
import { ChapterList, Chapter } from '../api/schema';
import { MangaContentRating } from '../api/manga';
import { Order } from '../api/static';
import { ExtendChapter } from '../api/extend';
import extendRelationship from '../utils/extendRelationship';

export default function useLastUpdates() {
    const [chapters, setChapters] = useState<ExtendChapter[]>([])

    const { data, isLoading, error } = useSWR('last-updates', () => ChapterApi.getChapter({
        includes: ['scanlation_group'],
        translatedLanguage: ['vi'],
        contentRating: [MangaContentRating.SAFE, MangaContentRating.SUGGESTIVE],
        order: {
            readableAt: Order.DESC
        },
        limit: 64
    }))

    useEffect(() => {
        if (data && data.data?.result === "ok") setChapters(((data.data as ChapterList).data).map(c => extendRelationship(c) as ExtendChapter))
    }, [data])

    return {
        chapters, isLoading, error
    }
}