import { useParams } from "next/navigation"
import useChapterPages from "../../hooks/useChapterPages"
import MangaImage from "../../components/mangaImage"


export default function ChapterPages() {
    const params = useParams()
    const chapterId = params.chapterId
    const { pages, } = useChapterPages(chapterId)
    return (
        <div className="reading-detail box_doc">
            {
                pages.map((page, index) => (
                    <div key={page} className="page-chapter">
                        <MangaImage
                            alt={`Trang ${index}`}
                            data-index={index}
                            src={page}
                        />
                    </div>
                ))
            }
        </div>
    )
}