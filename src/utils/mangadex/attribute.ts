import { Chapter, ExtendManga } from "@/types/mangadex";

export function getMangaTitle(manga: ExtendManga | null | undefined) {
  if (!manga) return "";
  return (
    manga.attributes.altTitles.find((t) => t["vi"])?.["vi"] ||
    manga.attributes.title?.["en"] ||
    Object.values(manga.attributes.title)?.[0] ||
    "No title"
  );
}

export function getMangaAltTitles(manga: ExtendManga | null | undefined) {
  if (!manga) return [];
  return manga.attributes.altTitles
    .filter((aT) => aT["ja"] || aT["ja-ro"] || aT["en"])
    .map((aT) => Object.values(aT)[0]);
}

export function getOriginalMangaTitle(manga: ExtendManga | null | undefined) {
  if (!manga) return "";
  const originalLanguage = manga.attributes.originalLanguage || "ja";
  return (
    manga.attributes.altTitles.find((t) => t[originalLanguage])?.[
      originalLanguage
    ] ||
    manga.attributes.title?.["ja-ro"] ||
    ""
  );
}

export function getChapterTitle(chapter: Chapter | null) {
  if (!chapter) return "";
  if (chapter.attributes.title)
    return (
      (chapter.attributes.volume !== null
        ? `T${chapter.attributes.volume} `
        : "") +
      (chapter.attributes.chapter !== null
        ? `C${chapter.attributes.chapter} `
        : "") +
      chapter.attributes.title
    );
  if (chapter.attributes.volume)
    return `Chương ${chapter.attributes.chapter} Tập ${chapter.attributes.volume}`;
  if (chapter.attributes.chapter) return `Chương ${chapter.attributes.chapter}`;
  return "Oneshot";
}
