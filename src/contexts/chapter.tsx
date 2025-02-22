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

import {
  useChapter,
  useMangaAggregate,
  useScanlationGroup,
} from "@/hooks/mangadex";
import {
  ChapterItem,
  ExtendChapter,
  ExtendManga,
  ScanlationGroup,
} from "@/types/mangadex";
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
  group: ScanlationGroup | null;
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
    document.title = `Đọc ${Utils.Mangadex.getChapterTitle(chapter)} - ${Utils.Mangadex.getMangaTitle(manga)}`;
    window.history.pushState(
      { ...window.history.state, as: newPath, url: newPath },
      "",
      newPath,
    );
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
