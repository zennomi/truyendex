import { Manga, Chapter, Cover, Author, ScanlationGroup } from "./schema";

export type ExtendChapter = Chapter & {
    manga?: Partial<Manga> & Pick<Manga, 'id' | 'type'>,
    scanlation_group?: Partial<ScanlationGroup> & Pick<ScanlationGroup, 'id' | 'type'>
}

export type ExtendManga = Manga & {
    cover_art?: Partial<Cover> & Pick<Cover, 'id' | 'type'>,
    author?: Partial<Author> & Pick<Author, 'id' | 'type'>,
    artist?: Partial<Author> & Pick<Author, 'id' | 'type'>,
}