import { useParams } from "next/navigation"
import useChapterPages from "../../hooks/useChapterPages"


export default function ChapterPages() {
    const params = useParams()
    const chapterId = params.chapterId
    const { pages, } = useChapterPages(chapterId)
    return (
        <div className="reading-detail box_doc">
            {
                pages.map((page, index) => (
                    <div key={page} className="page-chapter">
                        <img
                            alt="Bá Vương Sủng Ái Cô Vợ Mù chap 43 - Trang 1"
                            data-index={index}
                            src={page}
                        />
                    </div>
                ))
            }
        </div>
    )
}