import { ExtendManga, Relationship } from "@/types/mangadex"

const defaultImage = '/images/placeholder.jpg'

export function getCoverArt(manga: ExtendManga | undefined) {
    if (!manga) return defaultImage
    if (manga.cover_art?.attributes) {
        return `https://mangadex.org/covers/${manga.id}/${manga.cover_art.attributes.fileName}.256.jpg`
    }
    return defaultImage
}

export function extendRelationship(object: Record<string, any> & { relationships: Relationship[] }) {
    for (const rela of object.relationships) {
        object[rela.type] = rela;
    }
    return object
}

export function extractRelationship(relationships: Relationship[], type: string) {
    return relationships.find(r => r.type === type) || null;
}