import { Relationship } from "../api/schema";

export default function extractRelationship(relationships: Relationship[], type: string) {
    return relationships.find(r => r.type === type) || null;
}