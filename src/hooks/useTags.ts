import useSWR from "swr/immutable"
import { Manga } from "../api"
import { Tag, TagResponse } from "../api/schema"

export default function useTags() {
    const { data, isLoading, error } = useSWR('tags', () => Manga.getMangaTag())

    let tags: Tag[] = []
    const successData = data && data.data && (data.data as TagResponse).data
    if (successData) {
        tags = successData
    }
    return { tags, isLoading, error }
}