import { useParams } from "next/navigation"
import useChapterPages from "../../hooks/useChapterPages"
import LazyImages from "./lazyImages"
import useWindowSize from "../../hooks/useWindowSize"

export default function ChapterPages() {
    const params = useParams()
    const { height } = useWindowSize()
    const chapterId = params.chapterId
    const { pages, } = useChapterPages(chapterId)
    return (
        <div className="reading-detail box_doc">
            <LazyImages images={pages} threshold={(height || 1000) * 3} />
        </div>
    )
}