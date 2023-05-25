"use client"

import useSWR from 'swr'
import { mangadexAxios } from '../utils/axios';
import MFA from "mangadex-full-api"

export default function useMultipleMangas(ids: string[]) {
    return useSWR(ids, () => mangadexAxios({
        url: 'manga',
        params: {
            ids
        }
    }))
}