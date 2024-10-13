import { Relationship } from "../types/mangadex";

export default function extendRelationship(object: Record<string, any> & { relationships: Relationship[] }) {
    for (const rela of object.relationships) {
        object[rela.type] = rela;
    }
    return object
}