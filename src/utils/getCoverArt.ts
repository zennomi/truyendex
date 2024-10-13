import { ExtendManga } from "@/types/mangadex"

const defaultImage = '/images/placeholder.jpg'

export default function getCoverArt(manga: ExtendManga | undefined) {
    if (!manga) return defaultImage
    if (manga.cover_art?.attributes) {
        return `https://mangadex.org/covers/${manga.id}/${manga.cover_art.attributes.fileName}.256.jpg`
    }
    return defaultImage
}