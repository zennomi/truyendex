import { MangadexApi } from "@/api";
import CommentSection from "@/components/nettrom/binh-luan/comment-section";
import TopTitles from "@/components/nettrom/trang-chu/top-titles";
import Manga from "@/components/nettrom/truyen-tranh/manga";
import { ExtendManga } from "@/types/mangadex";
import { Utils } from "@/utils";
import { MangaDexError } from "@/api/mangadex/util";
import { notFound } from "next/navigation";

export default async function TruyenTranh({
  params,
}: {
  params: { mangaId: string };
}) {
  try {
    const {
      data: { data: manga },
    } = await MangadexApi.Manga.getMangaId(params.mangaId);

    return (
      <div className="grid grid-cols-1 gap-[40px] lg:grid-cols-3">
        <div className="lg:col-span-2">
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
  } catch (error) {
    if (error instanceof MangaDexError) {
      if (error.status === 404) {
        return notFound();
      }
    }
    throw error;
  }
}
