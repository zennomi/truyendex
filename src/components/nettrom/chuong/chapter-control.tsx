import Link from "next/link";
import { format } from "date-fns";
import { useChapterContext } from "@/contexts/chapter";
import { Utils } from "@/utils";
import { Constants } from "@/constants";
import { DataLoader } from "@/components/DataLoader";
import { ChapterControlBar } from "./chapter-control-bar";
import { useMemo } from "react";
import { FaClock } from "react-icons/fa";
import RandomAlert from "./random-alert";

export default function ChapterControl() {
  const { manga, chapter, others, group } = useChapterContext();

  const mangaTitle = useMemo(() => {
    return Utils.Mangadex.getMangaTitle(manga);
  }, [manga]);
  const chapterTitle = useMemo(() => {
    return Utils.Mangadex.getChapterTitle(chapter);
  }, [chapter]);

  return (
    <DataLoader isLoading={!chapter} loadingText="Đang tải thông tin chương...">
      <div className="flex flex-col gap-0">
        <h1 className="mb-1 mt-0 md:mb-4">
          <Link
            className="text-[16px] text-web-title transition hover:text-web-titleLighter"
            href={Constants.Routes.nettrom.manga(manga?.id || "")}
          >
            {mangaTitle}
          </Link>{" "}
          <p className="my-0 text-[24px] leading-none text-foreground">
            {chapterTitle}{" "}
          </p>
        </h1>
        <p className="mb-2 md:mb-5">
          <span className="text-[14px] text-muted-foreground">
            <FaClock className="mr-2 inline" />
            Cập nhật lúc:{" "}
            <span className="">
              {chapter &&
                format(
                  new Date(chapter.attributes.publishAt),
                  "HH:mm dd/MM/yyyy",
                )}
            </span>
            {group && (
              <span className="text-muted-foreground">
                {" "}
                bởi{" "}
                <Link href={Constants.Routes.nettrom.scanlationGroup(group.id)}>
                  {group.attributes.name}
                </Link>
              </span>
            )}
          </span>
        </p>
        <i></i>
      </div>
      <div className="reading-control">
        {others.length > 0 && (
          <div className="mrb5">
            Chuyển sang đọc bản dịch nhóm khác
            <div className="mrt10">
              {others.map((other, idx) => (
                <Link
                  rel="nofollow"
                  key={other}
                  data-server={1}
                  className="loadchapter btn btn-primary btn-success mrb5"
                  href={Constants.Routes.nettrom.chapter(other)}
                >
                  Nhóm {idx}
                </Link>
              ))}
            </div>
          </div>
        )}
        <RandomAlert />
        <ChapterControlBar></ChapterControlBar>
        <div className="mb-4"></div>
      </div>
    </DataLoader>
  );
}
