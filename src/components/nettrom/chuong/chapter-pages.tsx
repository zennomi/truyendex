import { useChapterPages } from "@/hooks/mangadex";
import LazyImages from "./lazy-images";
import useWindowSize from "@/hooks/useWindowSize";
import { useChapterContext } from "@/contexts/chapter";
import { DataLoader } from "@/components/DataLoader";
import { Button } from "../Button";
import CommentSection from "../binh-luan/comment-section";
import { Alert } from "../Alert";
import ScanlationGroupInformation from "./scanlation-group-information";
import Link from "next/link";
import Iconify from "@/components/iconify";
import { Constants } from "@/constants";
import { useMemo } from "react";
import { MangadexApi } from "@/api";
import { useSettingsContext } from "@/contexts/settings";

export default function ChapterPages() {
  const { height } = useWindowSize();

  const { chapterId, canNext, canPrev, next, prev, chapter, group, manga } =
    useChapterContext();

  const { filteredContent } = useSettingsContext();

  const shouldBlock = useMemo(() => {
    if (!manga) return false;
    return (
      (!filteredContent.includes(
        MangadexApi.Static.MangaContentRating.PORNOGRAPHIC,
      ) &&
        manga?.attributes.contentRating ===
          MangadexApi.Static.MangaContentRating.PORNOGRAPHIC) ||
      (!filteredContent.includes(
        MangadexApi.Static.MangaContentRating.EROTICA,
      ) &&
        manga?.attributes.contentRating ===
          MangadexApi.Static.MangaContentRating.EROTICA)
    );
  }, [manga, filteredContent]);

  const { pages, isLoading, error } = useChapterPages(
    chapter?.attributes.externalUrl ? null : chapterId,
  );

  return (
    <div>
      {error ? (
        <div className="container flex flex-col items-center justify-center gap-2">
          <div className="text-2xl font-bold">Chương này đã bị xoá</div>
          <Link href={Constants.Routes.nettrom.manga(manga?.id || "")}>
            <Button icon={<Iconify icon="fa:arrow-left" />}>
              Quay lại trang chủ
            </Button>
          </Link>
        </div>
      ) : chapter?.attributes.externalUrl ? (
        <div className="container flex justify-center">
          <Link href={chapter.attributes.externalUrl} target="_blank">
            <Button icon={<Iconify icon="fa:external-link" />}>
              Đọc tại trang chủ của {group?.attributes.name}
            </Button>
          </Link>
        </div>
      ) : shouldBlock ? (
        <div className="container flex flex-col items-center justify-center gap-2">
          <div className="text-2xl font-bold">
            Chương này có thể có nội dung phản cảm, vui lòng đọc trên MangaDex
          </div>
          <Link
            href={`https://mangadex.org/chapter/${chapterId}`}
            target="_blank"
          >
            <Button icon={<Iconify icon="fa:external-link" />}>
              Đọc trên MangaDex
            </Button>
          </Link>
        </div>
      ) : (
        <DataLoader
          isLoading={isLoading}
          loadingText="Đang tải nội dung chương..."
        >
          {manga &&
            (manga.attributes.contentRating ===
              MangadexApi.Static.MangaContentRating.PORNOGRAPHIC ||
              manga.attributes.contentRating ===
                MangadexApi.Static.MangaContentRating.EROTICA) && (
              <div className="mb-10">
                <Alert
                  title="Phát hiện truyện có thể có nội dung phản cảm theo đánh giá của MangaDex. TruyenDex không chịu trách nhiệm với nội dung của truyện."
                  classNames={{
                    alert: "[&>svg]:text-red-500 text-red-500 bg-red-100",
                  }}
                />
              </div>
            )}
          <div className="reading-detail box_doc">
            <LazyImages images={pages} threshold={(height || 1000) * 3} />
          </div>
        </DataLoader>
      )}
      <div className="container">
        <div className="mb-2 mt-4 flex flex-col gap-2">
          <Button disabled={!canNext} onClick={next}>
            Chương tiếp theo
          </Button>
          <Button disabled={!canPrev} onClick={prev}>
            Chương trước
          </Button>
        </div>
        <DataLoader isLoading={!group} loadingText="Đang tải nhóm dịch...">
          {group && (
            <ScanlationGroupInformation group={group} canNext={canNext} />
          )}
        </DataLoader>
        <DataLoader isLoading={!chapter} loadingText="Đang tải bình luận...">
          {chapterId &&
            (!chapter || chapter.attributes.translatedLanguage === "vi") && (
              <CommentSection type="chapter" typeId={chapterId} />
            )}
          {chapter && chapter.attributes.translatedLanguage !== "vi" && (
            <Alert title="Chỉ hỗ trợ bình luận tại các chương tiếng Việt" />
          )}
        </DataLoader>
      </div>
    </div>
  );
}
