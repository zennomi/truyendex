"use client"

import useSWR from 'swr'
import { useEffect, useState } from 'react';
import { Chapter as ChapterApi, Manga as MangaApi } from '../api';
import { ChapterList, Chapter } from '../api/schema';
import { MangaContentRating } from '../api/manga';
import { Order } from '../api/static';
import { ExtendChapter } from '../api/extend';
import extendRelationship from '../utils/extendRelationship';

export const chaptersPerPage = 100

export default function useLastUpdates(options: { page: number, groupId?: string }) {
    const { page, groupId } = options
    let chapters: ExtendChapter[] = []
    let total = 0
    let offset = chaptersPerPage * page
    if (offset > 10000) {
        offset = 10000 - chaptersPerPage
    }
    const { data, isLoading, error } = useSWR(['last-updates', options], () => ChapterApi.getChapter({
        includes: ['scanlation_group'],
        translatedLanguage: ['vi'],
        contentRating: [MangaContentRating.SAFE, MangaContentRating.SUGGESTIVE],
        order: {
            readableAt: Order.DESC
        },
        limit: chaptersPerPage,
        offset,
        groups: groupId ? [groupId] : undefined
    }))
    const successData = data && data.data?.result === "ok" ? (data.data as ChapterList) : null
    if (successData) {
        chapters = ((successData.data).map(c => extendRelationship(c) as ExtendChapter))
        total = successData.total
    }
    return {
        chapters, isLoading, error, total
    }
}
