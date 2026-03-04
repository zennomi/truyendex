"use client";

import Link from "next/link";
import { Clock, BookOpen, Trash2, ChevronRight } from "lucide-react";

import useReadingHistory from "@/hooks/useReadingHistory";
import { Constants } from "@/constants";

export default function HistoryList() {
  const { history, removeHistory } = useReadingHistory();

  // Object keys iteration order gives strings, convert to [id, item] pairs
  const historyEntries = Object.entries(history);

  if (historyEntries.length === 0) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center rounded-xl border border-border/40 bg-card/30 py-24 text-center text-muted-foreground backdrop-blur-sm sm:py-32">
        <div className="mb-4 rounded-full bg-muted/50 p-4">
          <Clock className="h-8 w-8 text-muted-foreground/70" />
        </div>
        <p className="text-lg font-medium text-foreground">Chưa có lịch sử</p>
        <p className="mt-2 max-w-sm text-sm">
          Bạn chưa đọc truyện nào gần đây. Hãy khám phá và đọc thử vài bộ truyện
          nhé!
        </p>
        <Link
          href={Constants.Routes.nettrom.index}
          className="mt-6 flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <BookOpen className="mr-2 h-4 w-4" />
          Khám phá ngay
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4 2xl:grid-cols-5">
      {historyEntries.map(([mangaId, manga]) => (
        <div
          key={mangaId}
          className="group relative flex flex-col overflow-hidden rounded-xl border border-border/40 bg-card text-card-foreground shadow-sm transition-all duration-300 hover:border-border/80 hover:shadow-md"
        >
          {/* Image Container */}
          <Link
            title={manga.mangaTitle}
            href={Constants.Routes.nettrom.manga(mangaId)}
            className="relative block aspect-[2/3] w-full overflow-hidden bg-muted"
          >
            <img
              alt={manga.mangaTitle}
              src={manga.cover}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            {/* Dark overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

            {/* Delete button: visible instantly on mobile, and fades in on desktop hover */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeHistory(mangaId);
              }}
              className="absolute right-2 top-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white opacity-100 backdrop-blur-md transition-all hover:bg-destructive hover:text-destructive-foreground sm:opacity-0 sm:group-hover:opacity-100"
              title="Xóa khỏi lịch sử"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </Link>

          {/* Content Container */}
          <div className="flex flex-1 flex-col justify-between p-3 sm:p-4">
            <div>
              <Link
                title={manga.mangaTitle}
                href={Constants.Routes.nettrom.manga(mangaId)}
                className="line-clamp-2 text-sm font-semibold leading-snug transition-colors hover:text-primary sm:text-base"
              >
                {manga.mangaTitle}
              </Link>
            </div>

            <div className="mt-3 border-t border-border/40 pt-3">
              <Link
                href={Constants.Routes.nettrom.chapter(manga.chapterId)}
                className="group/chapter flex items-center justify-between text-xs font-medium text-foreground/80 transition-colors hover:text-primary sm:text-sm"
                title={`Đọc tiếp ${manga.chapterTitle}`}
              >
                <span className="truncate">Đọc tiếp {manga.chapterTitle}</span>
                <ChevronRight className="ml-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover/chapter:translate-x-1 group-hover/chapter:text-primary" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
