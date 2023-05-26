import { ExtendManga } from "../api/extend";

const defaultImage = 'https://mangadex.org/covers/f5597893-afed-4537-ab77-80e9b328c6b6/8f6ac9dd-f762-48f0-acbf-4abc5cbec1d8.jpg.256.jpg'

export default function getCoverArt(manga: ExtendManga | undefined) {
    if (!manga) return defaultImage
    if (manga.cover_art?.attributes) {
        return `https://mangadex.org/covers/${manga.id}/${manga.cover_art.attributes.fileName}.256.jpg`
    }
    return defaultImage
}