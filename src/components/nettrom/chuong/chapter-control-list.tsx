import { TooltipComponent } from "@/components/shadcn/tooltip";
import { Constants } from "@/constants";
import { useChapterContext } from "@/contexts/chapter";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import Link from "next/link";
import { FC, useEffect, useRef } from "react";
import { FaList } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { Button } from "../Button";

export const ChapterControlList: FC<{}> = () => {
  const { manga, chapters, goTo, chapterId } = useChapterContext();
  const scrollDirection = useScrollDirection();
  const chapterListRef = useRef<HTMLDivElement>(null);
  const currentChapterRef = useRef<HTMLButtonElement>(null);

  const currentChapterIndex = chapters.findIndex((c) => c.id === chapterId);

  // Scroll to current chapter when dropdown is visible
  const scrollToCurrentChapter = () => {
    if (currentChapterRef.current && chapterListRef.current) {
      currentChapterRef.current?.scrollIntoView({
        block: "center",
        inline: "nearest",
      });
    }
  };

  // Scroll when chapterId changes (for navigation)
  useEffect(() => {
    scrollToCurrentChapter();
  }, [chapterId, chapters.length]);

  // Scroll to current chapter when dropdown becomes visible
  useEffect(() => {
    const container = chapterListRef.current?.parentElement;
    if (!container) return;

    const handleMouseEnter = () => {
      // Small delay to ensure dropdown is fully visible
      setTimeout(() => {
        scrollToCurrentChapter();
      }, 50);
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    return () => container.removeEventListener("mouseenter", handleMouseEnter);
  }, []);

  const formatChapterLabel = (item: any) => {
    if (item.volume !== "none") {
      if (item.chapter !== "none") {
        return `Tập ${item.volume} Chương ${item.chapter}`;
      } else {
        return `Oneshot Tập ${item.volume}`;
      }
    } else {
      if (item.chapter !== "none") {
        return `Chương ${item.chapter}`;
      } else {
        return "Oneshot";
      }
    }
  };

  return (
    <div ref={chapterListRef} className="group relative">
      <Link href={Constants.Routes.nettrom.manga(manga?.id || "")}>
        <Button
          variant={"ghost"}
          className="h-16 w-16 shrink-0 bg-transparent text-[40px] [&_svg]:size-8"
          icon={<FaList />}
        ></Button>
      </Link>
      <div
        className={twMerge(
          "hidden",
          (scrollDirection === "up" || scrollDirection === null) &&
            "group-hover:block",
        )}
      >
        {/* Dropdown List */}
        <div className="absolute bottom-full left-1/2 w-80 -translate-x-1/2 transform">
          <div className="rounded-lg border border-neutral-700 bg-neutral-800 shadow-2xl">
            {/* Header */}
            <div className="border-b border-neutral-700 p-3">
              <TooltipComponent
                size="2xl"
                content={
                  manga
                    ? `Danh sách chương - ${
                        manga.attributes?.title?.en ||
                        manga.attributes?.title?.vi
                      }`
                    : "Danh sách chương"
                }
              >
                <h3 className="truncate text-base font-semibold text-white">
                  {manga
                    ? `Danh sách chương - ${
                        manga.attributes?.title?.en ||
                        manga.attributes?.title?.vi
                      }`
                    : "Danh sách chương"}
                </h3>
              </TooltipComponent>
              <p className="mt-1 text-sm text-neutral-400">
                {chapters.length} chương
              </p>
            </div>

            {/* Chapter List */}
            <div className="max-h-96 overflow-y-auto">
              {chapters.map((item, index) => (
                <button
                  key={item.id}
                  ref={item.id === chapterId ? currentChapterRef : null}
                  onClick={() => goTo(item.id)}
                  className={twMerge(
                    "w-full border-b border-neutral-700 px-4 py-3 text-left transition-colors duration-200 last:border-b-0 hover:bg-neutral-700",
                    item.id === chapterId && "bg-neutral-700 font-medium",
                    index === currentChapterIndex &&
                      "bg-neutral-700 font-medium text-web-title",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate text-sm">
                      {formatChapterLabel(item)}
                    </span>
                    {item.id === chapterId && (
                      <span className="text-xs font-medium">Đang đọc</span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-neutral-700 p-2">
              <p className="text-center text-xs text-neutral-400">
                Click để chuyển chương
              </p>
            </div>
          </div>

          {/* Arrow */}
          <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-800"></div>
        </div>
      </div>
    </div>
  );
};
