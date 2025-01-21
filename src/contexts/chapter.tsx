"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { useParams } from "next/navigation";

import { useChapter, useMangaAggregate } from "@/hooks/mangadex";
import { ChapterItem, ExtendChapter, ExtendManga } from "@/types/mangadex";
import useReadingHistory from "@/hooks/useReadingHistory";

import { useMangadex } from "./mangadex";
import { Utils } from "@/utils";
import { Constants } from "@/constants";
import { useSettingsContext } from "./settings";

export const ChapterContext = createContext<{
  chapterId: string | null;
  chapter: ExtendChapter | null;
  manga: ExtendManga | null;
  chapters: ChapterItem[];
  next: VoidFunction;
  prev: VoidFunction;
  goTo: (id: string) => void;
  canNext: boolean;
  canPrev: boolean;
  others: string[];
}>({
  chapterId: null,
  chapter: null,
  chapters: [],
  manga: null,
  next: () => null,
  prev: () => null,
  goTo: () => null,
  canNext: false,
  canPrev: false,
  others: [],
});

export const ChapterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const params = useParams<{ chapterId: string }>();
  const [chapterId, setChapterId] = useState(params.chapterId);

  const { chapter } = useChapter(chapterId);
  const { updateMangas, mangas } = useMangadex();

  const { addHistory } = useReadingHistory();

  const { filteredLanguages } = useSettingsContext();

  const mangaId = chapter?.manga?.id ? chapter.manga.id : null;
  const manga = mangaId ? mangas[mangaId] : null;
  const groupId = chapter?.scanlation_group?.id
    ? chapter.scanlation_group.id
    : null;
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

  const prev = useCallback(() => {
    if (canPrev) {
      setChapterId(chapters[currentChapterIndex - 1].id);
    }
  }, [currentChapterIndex, chapters, setChapterId, canPrev]);

  const next = useCallback(() => {
    if (canNext) {
      setChapterId(chapters[currentChapterIndex + 1].id);
    }
  }, [currentChapterIndex, chapters, setChapterId, canNext]);

  const goTo = useCallback(
    (desId: string) => {
      setChapterId(desId);
    },
    [setChapterId],
  );

  useEffect(() => {
    if (mangaId) {
      updateMangas({ ids: [mangaId] });
    }
  }, [mangaId]);

  useEffect(() => {
    if (!chapter) return;
    const newPath = Constants.Routes.nettrom.chapter(chapter.id);
    document.title = `Đọc ${Utils.Mangadex.getChapterTitle(chapter)}`;
    window.history.pushState(
      { ...window.history.state, as: newPath, url: newPath },
      "",
      newPath,
    );
  }, [chapter]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [chapterId]);

  useEffect(() => {
    if (manga && chapter) {
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
      }}
    >
      {children}
    </ChapterContext.Provider>
  );
};

export const useChapterContext = () => useContext(ChapterContext);
