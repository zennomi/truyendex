import TopTitles from "@/components/sections/nettrom/common/top-titles-table";
import Manga from "@/components/sections/nettrom/truyen-tranh/manga";

export default function TruyenTranh({
  params,
}: {
  params: { mangaId: string };
}) {
  return (
    <div className="row">
      <div id="ctl00_divCenter" className="center-side col-md-8">
        <Manga mangaId={params.mangaId} />
      </div>
      <div id="ctl00_divRight" className="right-side col-md-4 cmszone">
        <TopTitles />
      </div>
    </div>
  );
}
