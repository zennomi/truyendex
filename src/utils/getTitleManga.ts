import { ExtendManga } from "../api/extend";

export default function getTitleManga(manga: ExtendManga) {
    return manga.attributes.altTitles.find(t => t['vi'])?.['vi'] || manga.attributes.title?.['en'] || "No title";
}