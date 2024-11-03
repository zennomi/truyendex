import TopTitles from "@/components/nettrom/trang-chu/TopTitles";
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
      </div>
      <div>
        <TopTitles />
      </div>
    </div>
  );
}
