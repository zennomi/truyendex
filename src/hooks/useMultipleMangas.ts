"use client"

import useSWR from 'swr'
import { Manga as MangaApi } from '../api'

export default function useMultipleMangas(ids: string[], enable: boolean) {
    return useSWR(enable ? ids : null, () => MangaApi.getSearchManga({
        ids
    }))
}