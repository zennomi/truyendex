import { Chapter } from "../api/schema";

export default function getTitleChapter(chapter: Chapter | null) {
    if (!chapter) return ""
    if (chapter.attributes.title) return chapter.attributes.title
    if (chapter.attributes.volume) return `Chương ${chapter.attributes.chapter} Tập ${chapter.attributes.volume}`
    if (chapter.attributes.chapter) return `Chương ${chapter.attributes.chapter}`
    return "Oneshot"
}