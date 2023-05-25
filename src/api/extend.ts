import { Manga, Chapter, Cover } from "./schema";

export type ExtendChapter = Chapter & {
    manga?: Partial<Manga> & Pick<Manga, 'id' | 'type'>,
}

export type ExtendManga = Manga & {
    cover_art?: Partial<Cover> & Pick<Cover, 'id' | 'type'>
}