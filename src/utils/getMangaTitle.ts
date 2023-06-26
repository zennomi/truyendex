import { ExtendManga } from "../api/extend";

export function getMangaTitle(manga: ExtendManga | null | undefined) {
    if (!manga) return ""
    return manga.attributes.altTitles.find(t => t['vi'])?.['vi'] || manga.attributes.title?.['en'] || Object.values(manga.attributes.title)?.[0] || "No title";
}

export function getAltMangaTitle(manga: ExtendManga | null | undefined) {
    if (!manga) return ""
    const originalLanguage = manga.attributes.originalLanguage || 'ja'
    return manga.attributes.altTitles.find(t => t[originalLanguage])?.[originalLanguage] || manga.attributes.title?.['ja-ro'] || "";
}