import { useParams } from "next/navigation"
import useChapterPages from "../../hooks/useChapterPages"
import LazyImages from "./lazyImages"
import useWindowSize from "../../hooks/useWindowSize"
import Loading from "../../components/nettrom/loading"

export default function ChapterPages() {
    const params = useParams()
    const { height } = useWindowSize()
    // const height = 1000
    const chapterId = params.chapterId
    const { pages, isLoading, error } = useChapterPages(chapterId)
    if (isLoading) return (<Loading />)
    return (
        <div className="reading-detail box_doc">
            <LazyImages images={pages} threshold={(height || 1000) * 3} />
        </div>
    )
}