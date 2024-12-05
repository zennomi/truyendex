import { useChapterPages } from "@/hooks/mangadex";
import LazyImages from "./lazy-images";
import useWindowSize from "@/hooks/useWindowSize";
import { useChapterContext } from "@/contexts/chapter";
import { DataLoader } from "@/components/DataLoader";

export default function ChapterPages() {
  const { height } = useWindowSize();

  const { chapterId } = useChapterContext();

  const { pages, isLoading } = useChapterPages(chapterId);
  return (
    <DataLoader isLoading={isLoading} loadingText="Đang tải nội dung chương...">
      <div className="reading-detail box_doc">
        <LazyImages images={pages} threshold={(height || 1000) * 3} />
      </div>
    </DataLoader>
  );
}
