"use client";

import { useParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Constants } from "@/constants";
import { useMangadex } from "@/contexts/mangadex";
import { useSettingsContext } from "@/contexts/settings";
import {
  useChapter,
  useMangaAggregate,
  useScanlationGroup,
} from "@/hooks/mangadex";
import { useChapterPreloader } from "@/hooks/useChapterPreloader";
import useReadingHistory from "@/hooks/useReadingHistory";
import { ExtendChapter } from "@/types/mangadex";
import { Utils } from "@/utils";

interface ChapterContextType {
  chapterId: string | null;
  chapter: ExtendChapter | null;
  manga: any;
  chapters: any[];
  next: () => void;
  prev: () => void;
  goTo: (desId: string) => void;
  canNext: boolean;
  canPrev: boolean;
  others: any[];
  group: any;
}

export const ChapterContext = createContext<ChapterContextType>({
  chapterId: null,
  chapter: null,
  manga: null,
  chapters: [],
  next: () => {},
  prev: () => {},
  goTo: () => {},
  canNext: false,
  canPrev: false,
  others: [],
  group: null,
});

export const ChapterContextProvider = ({
  children,
  prefectchedChapter,
}: {
  children: React.ReactNode;
  prefectchedChapter: ExtendChapter;
}) => {
  const params = useParams<{ chapterId: string }>();
  const [chapterId, setChapterId] = useState(params.chapterId);
  const router = useRouter();

  // Sync chapterId with URL params when navigation occurs
  useEffect(() => {
    if (params.chapterId && params.chapterId !== chapterId) {
      setChapterId(params.chapterId);
    }
  }, [params.chapterId, chapterId]);

  const { chapter } = useChapter(chapterId, prefectchedChapter);
  const { updateMangas, mangas } = useMangadex();

  const { addHistory } = useReadingHistory();

  const { filteredLanguages } = useSettingsContext();

  const mangaId = chapter?.manga?.id
    ? chapter.manga.id
    : prefectchedChapter.manga?.id || null;
  const manga = mangaId ? mangas[mangaId] || prefectchedChapter.manga : null;
  const groupId = chapter?.scanlation_group?.id
    ? chapter.scanlation_group.id
    : null;

  const { data: group } = useScanlationGroup(groupId);

  const { chapterList: chapters } = useMangaAggregate(mangaId, {
    translatedLanguage: chapter
      ? [chapter.attributes.translatedLanguage]
      : filteredLanguages,
    groups: groupId ? [groupId] : undefined,
  });

  const currentChapterIndex = useMemo(
    () => chapters.findIndex((c) => c.id === chapterId),
    [chapters, chapterId],
  );
  const canPrev = currentChapterIndex > 0;
  const canNext =
    currentChapterIndex >= 0 && currentChapterIndex < chapters.length - 1;

  const others =
    (currentChapterIndex >= 0 && chapters[currentChapterIndex]?.others) || [];

  // Use the preloader hook for better chapter preloading
  useChapterPreloader({
    chapters,
    currentChapterIndex,
    canNext,
    canPrev,
  });

  const prev = useCallback(() => {
    if (canPrev) {
      const prevChapterId = chapters[currentChapterIndex - 1].id;
      // Optimistic update: Update UI immediately
      setChapterId(prevChapterId);
      // Then update URL in background
      router.replace(Constants.Routes.nettrom.chapter(prevChapterId));
    }
  }, [currentChapterIndex, chapters, canPrev, router]);

  const next = useCallback(() => {
    if (canNext) {
      const nextChapterId = chapters[currentChapterIndex + 1].id;
      // Optimistic update: Update UI immediately
      setChapterId(nextChapterId);
      // Then update URL in background
      router.replace(Constants.Routes.nettrom.chapter(nextChapterId));
    }
  }, [currentChapterIndex, chapters, canNext, router]);

  const goTo = useCallback(
    (desId: string) => {
      // Use replace for chapter navigation to avoid history stack buildup
      router.replace(Constants.Routes.nettrom.chapter(desId));
    },
    [router],
  );

  useEffect(() => {
    if (mangaId) {
      updateMangas({ ids: [mangaId] });
    }
  }, [mangaId]);

  useEffect(() => {
    if (!chapter) return;
    document.title = `Đọc ${Utils.Mangadex.getChapterTitle(chapter)} - ${Utils.Mangadex.getMangaTitle(manga)}`;
  }, [chapter?.id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [chapterId]);

  useEffect(() => {
    if (manga?.cover_art && chapter) {
      addHistory(manga.id, {
        mangaTitle: Utils.Mangadex.getMangaTitle(manga),
        cover: Utils.Mangadex.getCoverArt(manga),
        chapterTitle: Utils.Mangadex.getChapterTitle(chapter),
        chapterId: chapter.id,
      });
    }
  }, [manga, chapter, addHistory]);

  // user keyboard
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.target || (event.target as HTMLElement).tagName !== "BODY")
        return;
      if (event.key === "ArrowRight") {
        next();
      } else if (event.key === "ArrowLeft") {
        prev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [next, prev]);

  return (
    <ChapterContext.Provider
      value={{
        chapterId,
        chapter,
        manga,
        chapters,
        next,
        prev,
        goTo,
        canNext,
        canPrev,
        others,
        group,
      }}
    >
      {children}
    </ChapterContext.Provider>
  );
};

export const useChapterContext = () => useContext(ChapterContext);
