import Manga from "../../../../sections/nettrom/truyen-tranh/manga"

export default function TruyenTranh({ params }: { params: { mangaId: string } }) {
    return (
        <div className="row">
            <Manga mangaId={params.mangaId} />
        </div>
    )
}