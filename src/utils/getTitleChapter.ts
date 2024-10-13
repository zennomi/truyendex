import { Chapter } from "../types/mangadex";

export default function getTitleChapter(chapter: Chapter | null) {
    if (!chapter) return ""
    if (chapter.attributes.title) return (chapter.attributes.volume !== null ? `T${chapter.attributes.volume} ` : "")
        + (chapter.attributes.chapter !== null ? `C${chapter.attributes.chapter} ` : "")
        + chapter.attributes.title
    if (chapter.attributes.volume) return `Chương ${chapter.attributes.chapter} Tập ${chapter.attributes.volume}`
    if (chapter.attributes.chapter) return `Chương ${chapter.attributes.chapter}`
    return "Oneshot"
}