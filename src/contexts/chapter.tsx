"use client";

import React, { createContext, useState, useEffect, useContext, useMemo, useCallback } from "react";
import { ExtendChapter, ExtendManga } from "../api/extend";
import { useMangadex } from "./mangadex";
import useAggregate, { ChapterItem } from "../hooks/useAggregate";
import { useParams, useRouter } from "next/navigation";
import routes from "../routes";
import { Chapter } from "../api";
import { Includes } from "../api/static";
import { ChapterResponse } from "../api/schema";
import extendRelationship from "../utils/extendRelationship";
import useReadingHistory from "../hooks/useReadingHistory";
import { getMangaTitle } from "../utils/getMangaTitle";
import getCoverArt from "../utils/getCoverArt";
import getTitleChapter from "../utils/getTitleChapter";

export const ChapterContext = createContext<{
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
    chapter: null,
    chapters: [],
    manga: null,
    next: () => null,
    prev: () => null,
    goTo: (id: string) => null,
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
    const params = useParams()
    const chapterId = params.chapterId
    const [chapter, setChapter] = useState<ExtendChapter | null>(null)
    const { updateMangas, mangas } = useMangadex()

    const { addHistory } = useReadingHistory()

    const mangaId = chapter?.manga?.id ? chapter.manga.id : null
    const manga = mangaId ? mangas[mangaId] : null
    const groupId = chapter?.scanlation_group?.id ? chapter.scanlation_group.id : null
    const { chapterList: chapters } = useAggregate(mangaId, { translatedLanguage: ["vi"], groups: groupId ? [groupId] : undefined })

    const currentChapterIndex = useMemo(() => chapters.findIndex(c => c.id === chapterId), [chapters, chapterId])
    const canPrev = currentChapterIndex > 0
    const canNext = currentChapterIndex >= 0 && currentChapterIndex < chapters.length - 1

    const others = currentChapterIndex >= 0 && chapters[currentChapterIndex]?.others || []

    const prev = useCallback(() => {
        if (canPrev) {
            router.replace(routes.nettrom.chapter(chapters[currentChapterIndex - 1].id))
        }
    }, [currentChapterIndex, chapters])

    const next = useCallback(() => {
        if (canNext) {
            router.replace(routes.nettrom.chapter(chapters[currentChapterIndex + 1].id))
        }
    }, [currentChapterIndex, chapters])

    const goTo = useCallback((desId: string) => {
        router.push(routes.nettrom.chapter(desId))
    }, [])

    useEffect(() => {
        if (mangaId) {
            updateMangas({ ids: [mangaId] })
        }
    }, [mangaId, groupId])

    useEffect(() => {
        const updateChapter = async () => {
            const { data } = await Chapter.getChapterId(chapterId!, {
                includes: [Includes.SCANLATION_GROUP,]
            })
            const result = (data && (data as ChapterResponse)?.data) ? extendRelationship((data as ChapterResponse)?.data) as ExtendChapter : null
            if (result) {
                setChapter(result)
            }
        }
        updateChapter()

        return () => setChapter(null)
    }, [chapterId])

    useEffect(() => {
        if (manga && chapter) {
            addHistory(manga.id, {
                mangaTitle: getMangaTitle(manga),
                cover: getCoverArt(manga),
                chapterTitle: getTitleChapter(chapter),
                chapterId: chapter.id,
            })
        }
    }, [manga, chapter])

    return (
        <ChapterContext.Provider value={{
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