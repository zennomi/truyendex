"use client"

import useSWR from 'swr'
import { mangadexAxios } from '../utils/axios';
import { useState } from 'react';

export default function useLastUpdates() {
    const [chapters, setChapters] = useState([])
    const { data, isLoading, error, } = useSWR('last-updates', () => mangadexAxios.get("chapter?includes%5B%5D=scanlation_group&translatedLanguage%5B%5D=en&translatedLanguage%5B%5D=ja&translatedLanguage%5B%5D=vi&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&contentRating%5B%5D=pornographic&order%5BreadableAt%5D=desc&limit=64"))
    // const {data: mangasData} = useSWR((isLoading || error) ? null : data?.data.)
    return {
        chapters, isLoading, error
    }
}