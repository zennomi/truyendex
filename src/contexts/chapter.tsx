"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { ExtendChapter, ExtendManga } from "../api/extend";
import { useMangadex } from "./mangadex";
import { ChapterItem } from "../hooks/useAggregate";
import { useParams, useRouter } from "next/navigation";
import routes from "../routes";
import { Chapter, Manga } from "../api";
import { GetMangaIdAggregateRequestOptions, GetMangaIdAggregateResponse } from "../api/manga";
import { Includes } from "../api/static";
import { ChapterResponse } from "../api/schema";
import extendRelationship from "../utils/extendRelationship";

export const ChapterContext = createContext<{
    chapter: ExtendChapter | null,
    manga: ExtendManga | null,
    chapters: ChapterItem[],
    next: VoidFunction,
    prev: VoidFunction,
    goTo: (id: string) => void,
    canNext: boolean,
    canPrev: boolean,
}>({
    chapter: null,
    chapters: [],
    manga: null,
    next: () => null,
    prev: () => null,
    goTo: (id: string) => null,
    canNext: false,
    canPrev: false,
});

export const ChapterContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {

    const router = useRouter()
    const params = useParams()
    const chapterId = params.chapterId
    const [chapters, setChapters] = useState<ChapterItem[]>([])

    const [chapter, setChapter] = useState<ExtendChapter | null>(null)
    const { updateMangas, mangas } = useMangadex()
    const mangaId = chapter?.manga?.id ? chapter.manga.id : null
    const manga = mangaId ? mangas[mangaId] : null
    const groupId = chapter?.scanlation_group?.id ? chapter.scanlation_group.id : null

    const currentChapterIndex = chapters.findIndex(c => c.id === chapterId)
    const canPrev = currentChapterIndex > 0
    const canNext = currentChapterIndex >= 0 && currentChapterIndex < chapters.length - 1

    const prev = () => {
        if (canPrev) {
            router.push(routes.nettrom.chapter(chapters[currentChapterIndex - 1].id))
        }
    }

    const next = () => {
        if (canNext) {
            router.push(routes.nettrom.chapter(chapters[currentChapterIndex + 1].id))
        }
    }

    const goTo = (desId: string) => {
        router.push(routes.nettrom.chapter(desId))
    }

    useEffect(() => {
        if (mangaId) {
            updateMangas({ ids: [mangaId] })
        }
        if (mangaId) {
            const updateChapterList = async () => {
                const options: GetMangaIdAggregateRequestOptions = { translatedLanguage: ['vi'] }
                if (groupId) options.groups = [groupId]
                const { data } = await Manga.getMangaIdAggregate(mangaId, options)
                const aggregate = data && (data as GetMangaIdAggregateResponse).volumes ? (data as GetMangaIdAggregateResponse).volumes : null
                let chapterList: ChapterItem[] = []
                if (aggregate) {
                    for (const volume of Object.values(aggregate)) {
                        for (const chapter of Object.values(volume.chapters)) {
                            chapterList.push({ volume: volume.volume, chapter: chapter.chapter, id: chapter.id, })
                        }
                    }
                    chapterList = chapterList.sort((a, b) => {
                        if (a.volume === b.volume) {
                            return parseFloat(a.chapter) - parseFloat(b.chapter)
                        }
                        if (a.volume === "none") return 1
                        if (b.volume === "none") return -1
                        return parseFloat(a.volume) - parseFloat(b.volume)
                    })
                }
                setChapters(chapterList)
            }
            updateChapterList()
        }
    }, [mangaId])

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
    }, [chapterId])

    return (
        <ChapterContext.Provider value={{
            chapter,
            manga,
            chapters,
            next,
            prev,
            goTo,
            canNext,
            canPrev
        }}>
            {children}
        </ChapterContext.Provider>
    );
};


export const useChapterContext = () => useContext(ChapterContext)