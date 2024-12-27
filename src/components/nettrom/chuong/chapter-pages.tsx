import { useChapterPages } from "@/hooks/mangadex";
import LazyImages from "./lazy-images";
import useWindowSize from "@/hooks/useWindowSize";
import { useChapterContext } from "@/contexts/chapter";
import { DataLoader } from "@/components/DataLoader";
import { Button } from "../Button";
import CommentSection from "../binh-luan/comment-section";

export default function ChapterPages() {
  const { height } = useWindowSize();

  const { chapterId, canNext, canPrev, next, prev } = useChapterContext();

  const { pages, isLoading } = useChapterPages(chapterId);
  return (
    <div>
      <DataLoader
        isLoading={isLoading}
        loadingText="Đang tải nội dung chương..."
      >
        <div className="reading-detail box_doc">
          <LazyImages images={pages} threshold={(height || 1000) * 3} />
        </div>
      </DataLoader>
      <div className="mb-2 mt-4 flex flex-col gap-2">
        <Button disabled={!canNext} onClick={next}>
          Chương tiếp theo
        </Button>
        <Button disabled={!canPrev} onClick={prev}>
          Chương trước
        </Button>
      </div>
      <DataLoader isLoading={!chapterId}>
        {chapterId && <CommentSection type="chapter" typeId={chapterId} />}
      </DataLoader>
    </div>
  );
}
