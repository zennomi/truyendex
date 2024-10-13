import { useChapterPages } from "@/hooks/mangadex"
import LazyImages from "./lazyImages"
import useWindowSize from "@/hooks/useWindowSize"
import Loading from "@/components/nettrom/loading"
import { useChapterContext } from "@/contexts/chapter"

export default function ChapterPages() {
    const { height } = useWindowSize()

    const { chapterId } = useChapterContext()

    const { pages, isLoading } = useChapterPages(chapterId)
    if (isLoading) return (<Loading title="Đang tải trang truyện..." />)
    return (
        <div className="reading-detail box_doc">
            <LazyImages images={pages} threshold={(height || 1000) * 3} />
        </div>
    )
}