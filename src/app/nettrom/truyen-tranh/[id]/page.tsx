import Manga from "../../../../sections/nettrom/manga"

export default function TruyenTranh({ params }: { params: { id: string } }) {
    return (
        <div className="row">
            <Manga mangaId={params.id} />
        </div>
    )
}