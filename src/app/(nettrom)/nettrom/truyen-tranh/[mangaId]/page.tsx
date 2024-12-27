import CommentSection from "@/components/nettrom/binh-luan/comment-section";
import TopTitles from "@/components/nettrom/trang-chu/top-titles";
import Manga from "@/components/nettrom/truyen-tranh/manga";

export default function TruyenTranh({
  params,
}: {
  params: { mangaId: string };
}) {
  return (
    <div className="grid gap-[40px] lg:grid-cols-[2fr_1fr]">
      <div>
        <Manga mangaId={params.mangaId} />
        <CommentSection typeId={params.mangaId} type="series" />
      </div>
      <div>
        <TopTitles />
      </div>
    </div>
  );
}
