import { MangadexApi } from "@/api";
import CommentSection from "@/components/nettrom/binh-luan/comment-section";
import TopTitles from "@/components/nettrom/trang-chu/top-titles";
import Manga from "@/components/nettrom/truyen-tranh/manga";
import { ExtendManga } from "@/types/mangadex";
import { Utils } from "@/utils";

export default async function TruyenTranh({
  params,
}: {
  params: { mangaId: string };
}) {
  const {
    data: { data: manga },
  } = await MangadexApi.Manga.getMangaId(params.mangaId);

  return (
    <div className="grid grid-cols-1 gap-[40px] lg:grid-cols-[2fr_1fr]">
      <div className="w-full">
        <Manga
          mangaId={params.mangaId}
          prefetchedManga={
            Utils.Mangadex.extendRelationship(manga) as ExtendManga
          }
        />
        <CommentSection typeId={params.mangaId} type="series" />
      </div>
      <div>
        <TopTitles />
      </div>
    </div>
  );
}
