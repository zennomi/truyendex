import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Clock, User, Users, ChevronDown, ChevronUp } from "lucide-react";

import { Utils } from "@/utils";
import { Constants } from "@/constants";
import { DataLoader } from "@/components/DataLoader";
import { ChapterList, ExtendChapter } from "@/types/mangadex";
import Pagination from "../Pagination";
import LanguageIcon from "@/components/language-icon";

// Grouping logic
type GroupedChapters = {
  volume: string;
  chapters: {
    chapter: string;
    items: ExtendChapter[];
  }[];
};

export default function ListChapter({
  mangaId: _mangaId,
  ...props
}: {
  mangaId: string;
  onPageChange?: (page: number) => void;
  page: number;
  data?: ChapterList;
  items: ExtendChapter[];
}) {
  const groupedData = useMemo(() => {
    const volumesMap = new Map<string, Map<string, ExtendChapter[]>>();

    props.items.forEach((item) => {
      const vol = item.attributes.volume || "none";
      const ch = item.attributes.chapter || "none";

      if (!volumesMap.has(vol)) {
        volumesMap.set(vol, new Map());
      }
      const chaptersMap = volumesMap.get(vol)!;

      if (!chaptersMap.has(ch)) {
        chaptersMap.set(ch, []);
      }
      chaptersMap.get(ch)!.push(item);
    });

    const result: GroupedChapters[] = [];

    // Volumes sort descending
    const sortedVolumes = Array.from(volumesMap.keys()).sort((a, b) => {
      if (a === "none") return -1;
      if (b === "none") return 1;
      return Number(b) - Number(a);
    });

    sortedVolumes.forEach((vol) => {
      const chaptersMap = volumesMap.get(vol)!;
      // Chapters sort descending
      const sortedChapters = Array.from(chaptersMap.keys()).sort((a, b) => {
        if (a === "none") return 1;
        if (b === "none") return -1;
        return Number(b) - Number(a);
      });

      const chaptersData = sortedChapters.map((ch) => ({
        chapter: ch,
        items: chaptersMap.get(ch)!,
      }));

      result.push({
        volume: vol,
        chapters: chaptersData,
      });
    });

    return result;
  }, [props.items]);

  const [collapsedVolumes, setCollapsedVolumes] = useState<
    Record<string, boolean>
  >({});
  const [collapsedChapters, setCollapsedChapters] = useState<
    Record<string, boolean>
  >({});
  const chapterListRef = useRef<HTMLDivElement>(null);
  const previousPageRef = useRef(props.page);

  useEffect(() => {
    if (previousPageRef.current !== props.page) {
      chapterListRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    previousPageRef.current = props.page;
  }, [props.page]);

  const toggleVolume = (vol: string) => {
    setCollapsedVolumes((prev) => ({ ...prev, [vol]: !prev[vol] }));
  };

  const toggleChapter = (chapterKey: string) => {
    setCollapsedChapters((prev) => ({
      ...prev,
      [chapterKey]: !prev[chapterKey],
    }));
  };

  const getUserName = (chapter: ExtendChapter) => {
    const userRel = chapter.relationships.find((r) => r.type === "user");
    return userRel?.attributes?.username || "Unknown";
  };

  return (
    <div id="nt_listchapter" ref={chapterListRef}>
      <h2 className="mb-2.5 flex items-center gap-2.5 text-[20px] font-medium text-web-title">
        <i className="fa fa-list"></i>
        <span>Danh sách chương</span>
      </h2>
      <DataLoader
        isLoading={!props.data}
        loadingText="Đang tải danh sách chương"
      >
        <div className="flex flex-col gap-4">
          {groupedData.map((volGroup) => {
            const isVolCollapsed = !!collapsedVolumes[volGroup.volume];
            const volTitle =
              volGroup.volume === "none"
                ? "Không tập"
                : `Tập ${volGroup.volume}`;
            // Calculate min-max chapters for this volume if possible
            const chNumbers = volGroup.chapters
              .map((c) => Number(c.chapter))
              .filter((n) => !isNaN(n));
            const chRange =
              chNumbers.length > 0
                ? chNumbers.length > 1
                  ? `Ch. ${Math.min(...chNumbers)} - ${Math.max(...chNumbers)}`
                  : `Ch. ${chNumbers[0]}`
                : "";

            return (
              <div
                key={volGroup.volume}
                className="flex flex-col gap-2 rounded-xl"
              >
                {/* Volume Header */}
                <div
                  className="flex cursor-pointer items-center justify-between rounded-md bg-muted/50 px-4 py-3 hover:bg-muted/80"
                  onClick={() => toggleVolume(volGroup.volume)}
                >
                  <div className="font-semibold text-foreground">
                    {volTitle}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">
                    {chRange}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <span className="font-medium">
                      {volGroup.chapters.reduce(
                        (acc, c) => acc + c.items.length,
                        0,
                      )}
                    </span>
                    {isVolCollapsed ? (
                      <ChevronDown size={18} />
                    ) : (
                      <ChevronUp size={18} />
                    )}
                  </div>
                </div>

                {/* Chapters inside Volume */}
                {!isVolCollapsed && (
                  <div className="flex flex-col gap-2">
                    {volGroup.chapters.map((chGroup) => {
                      const chapterKey = `${volGroup.volume}-${chGroup.chapter}`;
                      const hasSingleTranslation = chGroup.items.length === 1;
                      const isChCollapsed = hasSingleTranslation
                        ? false
                        : !!collapsedChapters[chapterKey];
                      const chTitle =
                        chGroup.chapter === "none"
                          ? "Oneshot"
                          : `Chương ${chGroup.chapter}`;

                      return (
                        <div
                          key={chapterKey}
                          className="flex flex-col rounded-md border border-border bg-card shadow-sm"
                        >
                          {/* Chapter Header */}
                          {hasSingleTranslation ? (
                            <div className="flex cursor-pointer items-center justify-between border-b border-transparent px-4 py-2.5 transition-colors hover:bg-muted/30">
                              <div className="flex items-center gap-2 font-medium text-foreground">
                                <span>{chTitle}</span>
                              </div>
                            </div>
                          ) : (
                            <div
                              className="flex cursor-pointer items-center justify-between border-b border-transparent px-4 py-2.5 transition-colors hover:bg-muted/30"
                              onClick={() => toggleChapter(chapterKey)}
                            >
                              <div className="flex items-center gap-2 font-medium text-foreground">
                                <span>{chTitle}</span>
                              </div>
                              <div className="text-muted-foreground">
                                {isChCollapsed ? (
                                  <ChevronDown size={16} />
                                ) : (
                                  <ChevronUp size={16} />
                                )}
                              </div>
                            </div>
                          )}

                          {/* Translations List */}
                          {!isChCollapsed && (
                            <div className="flex flex-col">
                              {chGroup.items.map((chapter, index) => {
                                const isLast =
                                  index === chGroup.items.length - 1;
                                const groupName =
                                  chapter.scanlation_group?.attributes?.name ||
                                  "Không rõ";
                                const uploaderName = getUserName(chapter);
                                const timeAgo = Utils.Date.formatNowDistance(
                                  new Date(chapter.attributes.readableAt),
                                  { addSuffix: true },
                                );
                                const hasGroupLink =
                                  !!chapter.scanlation_group?.id;

                                return (
                                  <div
                                    key={chapter.id}
                                    className={
                                      hasSingleTranslation
                                        ? "flex flex-col gap-2 px-4 py-2.5 sm:flex-row sm:items-start sm:justify-between"
                                        : "relative flex flex-col gap-2 px-4 pb-2 sm:flex-row sm:items-start sm:justify-between"
                                    }
                                  >
                                    {!hasSingleTranslation && (
                                      <>
                                        {/* Vertical Connecting Line */}
                                        <div className="absolute left-[1.125rem] top-0 h-full w-[2px] bg-muted-foreground/20"></div>
                                        {/* Horizontal Connecting Line Wrapper to keep dot aligned */}
                                        <div className="absolute left-[1.125rem] top-[8px] h-[2px] w-3 bg-muted-foreground/20"></div>

                                        {/* Background cut to make it look like L shape for the last item */}
                                        {isLast && (
                                          <div className="absolute left-[1.125rem] top-[8px] h-[calc(100%-8px)] w-[2px] bg-card"></div>
                                        )}
                                      </>
                                    )}

                                    {/* Content Wrapper */}
                                    <div
                                      className={
                                        hasSingleTranslation
                                          ? "flex flex-1 flex-col gap-1.5 sm:flex-row sm:justify-between sm:gap-2"
                                          : "z-10 ml-6 flex flex-1 flex-col gap-1.5 sm:flex-row sm:justify-between sm:gap-2"
                                      }
                                    >
                                      {/* Left Content */}
                                      <div className="flex min-w-0 flex-col gap-1.5">
                                        <div className="flex min-w-0 items-start gap-2 sm:items-center">
                                          <div className="mt-0.5 flex shrink-0 items-center justify-center sm:mt-0">
                                            <LanguageIcon
                                              languageCode={
                                                chapter.attributes
                                                  .translatedLanguage
                                              }
                                              className="h-[18px] w-[18px]"
                                            />
                                          </div>
                                          <Link
                                            href={Constants.Routes.nettrom.chapter(
                                              chapter.id,
                                            )}
                                            className="min-w-0 flex-1 break-words text-[14px] font-medium leading-tight text-foreground transition-colors hover:text-primary sm:truncate"
                                          >
                                            {chapter.attributes.title
                                              ? chapter.attributes.title
                                              : Utils.Mangadex.getChapterTitle(
                                                  chapter,
                                                )}
                                          </Link>
                                        </div>
                                        <div className="flex min-w-0 items-center gap-2 pl-0 sm:pl-8">
                                          <Users
                                            size={14}
                                            className="shrink-0 text-muted-foreground"
                                          />
                                          {hasGroupLink ? (
                                            <Link
                                              href={Constants.Routes.nettrom.scanlationGroup(
                                                chapter.scanlation_group!.id,
                                              )}
                                              className="truncate text-[12px] font-medium text-muted-foreground hover:text-foreground hover:underline"
                                            >
                                              {groupName}
                                            </Link>
                                          ) : (
                                            <span className="truncate text-[12px] italic text-muted-foreground">
                                              {groupName}
                                            </span>
                                          )}
                                        </div>
                                        {/* Row 3 (Mobile only): Uploader */}
                                        <div className="flex items-center justify-between sm:hidden">
                                          <div className="flex min-w-0 items-center gap-2 pl-0">
                                            <User
                                              size={14}
                                              className="shrink-0 text-muted-foreground"
                                            />
                                            <span className="truncate text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground">
                                              {uploaderName}
                                            </span>
                                          </div>
                                          <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground text-opacity-80">
                                              <Clock
                                                size={14}
                                                className="shrink-0"
                                              />
                                              <span className="whitespace-nowrap">
                                                {timeAgo}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Right Content */}
                                      <div className="flex shrink-0 flex-col items-end gap-1.5 text-[12px] font-medium text-muted-foreground/80 sm:w-[200px]">
                                        {/* Desktop View */}
                                        <div className="hidden flex-col gap-1.5 sm:flex">
                                          <div className="flex min-w-[200px] items-center justify-end gap-4">
                                            <div className="flex w-[120px] items-center justify-end gap-1.5">
                                              <Clock
                                                size={14}
                                                className="shrink-0"
                                              />
                                              <span className="truncate">
                                                {timeAgo}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="flex min-w-[200px] items-center justify-end gap-4">
                                            <div className="flex w-[120px] cursor-pointer items-center justify-end gap-1.5 transition-colors hover:text-foreground">
                                              <User
                                                size={14}
                                                className="shrink-0"
                                              />
                                              <span className="truncate">
                                                {uploaderName}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {props.items.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              Không có chương nào. Bạn hãy thử đổi ngôn ngữ trong phần cài đặt.
              <br />
              Hoặc tệ hơn, bộ truyện này đã bị gỡ khỏi MangaDex.
            </div>
          )}
        </div>
      </DataLoader>

      <div className="my-4 flex flex-col items-center justify-between gap-4">
        <Pagination
          onPageChange={(event) => {
            props.onPageChange?.(event.selected);
          }}
          pageCount={
            Math.floor(
              (props.data?.total || 0) / Constants.Mangadex.CHAPTER_LIST_LIMIT,
            ) + 1
          }
          forcePage={props.page}
        />
        <p className="mb-0 text-sm text-muted-foreground">
          Đã hiển thị{" "}
          <span className="font-medium text-foreground">
            {props.items.length
              ? (props.data?.offset || 0) + props.items.length
              : 0}{" "}
            / {props.data?.total || 0}
          </span>{" "}
          chương
        </p>
      </div>
    </div>
  );
}
