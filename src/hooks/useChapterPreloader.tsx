"use client";

import { Constants } from "@/constants";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useRef } from "react";

interface UseChapterPreloaderProps {
  chapters: any[];
  currentChapterIndex: number;
  canNext: boolean;
  canPrev: boolean;
}

export function useChapterPreloader({
  chapters,
  currentChapterIndex,
  canNext,
  canPrev,
}: UseChapterPreloaderProps) {
  const router = useRouter();
  const preloadedRef = useRef<Set<string>>(new Set());

  // Preload adjacent chapters
  useEffect(() => {
    if (chapters.length === 0 || currentChapterIndex < 0) return;

    const preloadChapter = async (chapterId: string) => {
      if (preloadedRef.current.has(chapterId)) return;

      try {
        // Prefetch the route
        await router.prefetch(Constants.Routes.nettrom.chapter(chapterId));
        preloadedRef.current.add(chapterId);
      } catch (error) {
        console.warn(`Failed to preload chapter ${chapterId}:`, error);
      }
    };

    // Preload next chapter
    if (canNext) {
      const nextChapterId = chapters[currentChapterIndex + 1].id;
      preloadChapter(nextChapterId);
    }

    // Preload previous chapter
    if (canPrev) {
      const prevChapterId = chapters[currentChapterIndex - 1].id;
      preloadChapter(prevChapterId);
    }

    // Preload chapters 2 steps ahead/behind for better UX
    if (canNext && currentChapterIndex + 2 < chapters.length) {
      const nextNextChapterId = chapters[currentChapterIndex + 2].id;
      preloadChapter(nextNextChapterId);
    }

    if (canPrev && currentChapterIndex - 2 >= 0) {
      const prevPrevChapterId = chapters[currentChapterIndex - 2].id;
      preloadChapter(prevPrevChapterId);
    }
    console.log(preloadedRef);
  }, [chapters, currentChapterIndex, canNext, canPrev, router]);

  // Cleanup preloaded chapters when component unmounts
  useEffect(() => {
    return () => {
      preloadedRef.current.clear();
    };
  }, []);

  return {
    isPreloaded: (chapterId: string) => preloadedRef.current.has(chapterId),
  };
}
