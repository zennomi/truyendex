"use client"

import useSWR from 'swr'
import { Manga as MangaApi } from '../api'
import { GetSearchMangaRequestOptions } from '../api/manga'
import { Includes } from '../api/static'
import { MangaList } from '../api/schema'
import { ExtendManga } from '../api/extend'
import extendRelationship from '../utils/extendRelationship'
import { useMemo } from 'react'
import { useMangadex } from '../contexts/mangadex'

export default function useSearchManga(options: GetSearchMangaRequestOptions) {
    if (!options.includes) {
        options.includes = [Includes.COVER_ART]
    }
    const { data, error, isLoading } = useSWR(['search-manga', options], () => MangaApi.getSearchManga(options))
    const successData = data && data.data.result === "ok" && (data.data as MangaList)

    const mangaList = useMemo(() => {
        if (successData) return successData.data.map(m => extendRelationship(m) as ExtendManga)
        return []
    }, [successData])

    return { data: successData, error, isLoading, mangaList }
}