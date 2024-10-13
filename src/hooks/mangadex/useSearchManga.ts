"use client"

import useSWR from 'swr'
import { useMemo } from 'react'
import { MangadexApi } from '@/api'
import { ExtendManga, MangaList } from '@/types/mangadex'
import { extendRelationship } from '@/utils/mangadex'


export default function useSearchManga(options: MangadexApi.Manga.GetSearchMangaRequestOptions) {
    if (!options.includes) {
        options.includes = [MangadexApi.Static.Includes.COVER_ART]
    }
    if (options.offset && options.offset > 10000) {
        options.offset = 10000 - (options.limit || 10)
    }
    const { data, error, isLoading } = useSWR(['search-manga', options], () => MangadexApi.Manga.getSearchManga(options))
    const successData = data && data.data.result === "ok" && (data.data as MangaList)

    const mangaList = useMemo(() => {
        if (successData) return successData.data.map(m => extendRelationship(m) as ExtendManga)
        return []
    }, [successData])

    return { data: successData, error, isLoading, mangaList }
}