"use client";

import React, { createContext, useState, useEffect, useContext, useMemo, useCallback } from "react";
import { MangadexApi } from "@/api";
import { useMangadex } from "./mangadex";
import { useMangaAggregate } from "@/hooks/mangadex";
import { useParams, useRouter } from "next/navigation";
import routes from "@/routes";
import { ChapterItem, ChapterResponse, ExtendChapter, ExtendManga } from "@/types/mangadex";
import useReadingHistory from "@/hooks/useReadingHistory";
import { extendRelationship, getCoverArt, getMangaTitle, getChapterTitle } from "@/utils/mangadex";

export const ChapterContext = createContext<{
    chapterId: string | null,
    chapter: ExtendChapter | null,
    manga: ExtendManga | null,
    chapters: ChapterItem[],
    next: VoidFunction,
    prev: VoidFunction,
    goTo: (id: string) => void,
    canNext: boolean,
    canPrev: boolean,
    others: string[],
}>({
    chapterId: null,
    chapter: null,
    chapters: [],
    manga: null,
    next: () => null,
    prev: () => null,
    goTo: (_: string) => null,
    canNext: false,
    canPrev: false,
    others: []
});

export const ChapterContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {

    const router = useRouter()
    const params = useParams<{ chapterId: string }>()
    const [chapterId, setChapterId] = useState(params.chapterId)

    const [chapter, setChapter] = useState<ExtendChapter | null>(null)
    const { updateMangas, mangas } = useMangadex()

    const { addHistory } = useReadingHistory()

    const mangaId = chapter?.manga?.id ? chapter.manga.id : null
    const manga = mangaId ? mangas[mangaId] : null
    const groupId = chapter?.scanlation_group?.id ? chapter.scanlation_group.id : null
    const { chapterList: chapters } = useMangaAggregate(mangaId, { translatedLanguage: ["vi"], groups: groupId ? [groupId] : undefined })

    const currentChapterIndex = useMemo(() => chapters.findIndex(c => c.id === chapterId), [chapters, chapterId])
    const canPrev = currentChapterIndex > 0
    const canNext = currentChapterIndex >= 0 && currentChapterIndex < chapters.length - 1

    const others = currentChapterIndex >= 0 && chapters[currentChapterIndex]?.others || []

    const prev = useCallback(() => {
        if (canPrev) {
            setChapterId(chapters[currentChapterIndex - 1].id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [currentChapterIndex, chapters, router, setChapterId])

    const next = useCallback(() => {
        if (canNext) {
            setChapterId(chapters[currentChapterIndex + 1].id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [currentChapterIndex, chapters, router, setChapterId])

    const goTo = useCallback((desId: string) => {
        setChapterId(desId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [setChapterId])

    useEffect(() => {
        if (mangaId) {
            updateMangas({ ids: [mangaId] })
        }
    }, [mangaId, groupId])

    useEffect(() => {
        const updateChapter = async () => {
            const { data } = await MangadexApi.Chapter.getChapterId(chapterId!, {
                includes: [MangadexApi.Static.Includes.SCANLATION_GROUP,]
            })
            const result = (data && (data as ChapterResponse)?.data) ? extendRelationship((data as ChapterResponse)?.data) as ExtendChapter : null
            if (result) {
                setChapter(result)
            }
        }
        updateChapter()
        const newPath = routes.nettrom.chapter(chapterId)
        window.history.pushState(
            { ...window.history.state, as: newPath, url: newPath },
            '',
            newPath
        );
    }, [chapterId])

    useEffect(() => {
        if (manga && chapter) {
            addHistory(manga.id, {
                mangaTitle: getMangaTitle(manga),
                cover: getCoverArt(manga),
                chapterTitle: getChapterTitle(chapter),
                chapterId: chapter.id,
            })
        }
    }, [manga, chapter])

    return (
        <ChapterContext.Provider value={{
            chapterId,
            chapter,
            manga,
            chapters,
            next,
            prev,
            goTo,
            canNext,
            canPrev,
            others
        }}>
            {children}
        </ChapterContext.Provider>
    );
};


export const useChapterContext = () => useContext(ChapterContext)