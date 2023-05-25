"use client";

import React, { createContext, useContext, useState } from "react";
import { Manga, MangaList } from "../api/schema";
import { Manga as MangaApi } from "../api";
import { GetSearchMangaRequestOptions } from "../api/manga";
import { Includes } from "../api/static";
import extendRelationship from "../utils/extendRelationship";
import { ExtendManga } from "../api/extend";

export type Mangas = { [k: string]: ExtendManga }

export const MangadexContext = createContext<{ mangas: Mangas, addMultipleMangas: (options: GetSearchMangaRequestOptions) => Promise<void> }>({
    mangas: {},
    addMultipleMangas: () => new Promise(() => null),
});

export const MangadexContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [mangas, setMangas] = useState<Mangas>({})
    const addMultipleMangas = async (options: GetSearchMangaRequestOptions) => {
        if (options.ids) {
            options.ids = options.ids.filter(id => !mangas[id])
        }
        if (!options.includes) {
            options.includes = [Includes.COVER_ART]
        }
        if (!options.includes.includes(Includes.COVER_ART)) {
            options.includes.push(Includes.COVER_ART)
        }
        try {
            const { data } = await MangaApi.getSearchManga(options)
            if (data && (data as MangaList).data) {
                setMangas((prevMangas) => {
                    for (const manga of (data as MangaList).data) {
                        prevMangas[manga.id] = extendRelationship(manga) as ExtendManga;
                    }
                    return { ...prevMangas };
                })
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <MangadexContext.Provider value={{ mangas, addMultipleMangas }}>
            {children}
        </MangadexContext.Provider>
    );
};

export const useMangadex = () => useContext(MangadexContext)