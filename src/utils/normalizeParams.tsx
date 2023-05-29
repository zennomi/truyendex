import { ReadonlyURLSearchParams } from "next/navigation";
import { GetSearchMangaRequestOptions, MangaPublicationDemographic } from "../api/manga";
import { Order } from "../api/static";

export default function normalizeParams(params: ReadonlyURLSearchParams): GetSearchMangaRequestOptions {
    const result: GetSearchMangaRequestOptions = {}
    const limit = params.get('limit')
    result.limit = limit ? parseInt(limit) : 24

    const offset = params.get('offset')
    result.offset = offset ? parseInt(offset) : 0

    if (params.getAll('authors').length > 0) {
        result.authors = params.getAll('authors')
    }
    if (params.getAll('artists').length > 0) {
        result.artists = params.getAll('artists')
    }
    if (params.getAll('includedTags').length > 0) {
        result.includedTags = params.getAll('includedTags')
    }
    if (params.getAll('excludedTags').length > 0) {
        result.excludedTags = params.getAll('excludedTags')
    }
    if (params.getAll('excludedTags').length > 0) {
        result.excludedTags = params.getAll('excludedTags')
    }
    if (params.getAll('originalLanguage').length > 0) {
        result.originalLanguage = params.getAll('originalLanguage')
    }
    if (params.getAll('publicationDemographic').length > 0) {
        result.publicationDemographic = params.getAll('publicationDemographic') as MangaPublicationDemographic[]
    }
    const availableTranslatedLanguage = params.getAll('availableTranslatedLanguage')
    result.availableTranslatedLanguage = availableTranslatedLanguage.length > 0 ? availableTranslatedLanguage : ['vi']
    const includedTagsMode = params.get('includedTagsMode')
    if (includedTagsMode) {
        result.includedTagsMode = includedTagsMode === "AND" ? "AND" : "OR"
    }
    const excludedTagsMode = params.get('excludedTagsMode')
    if (excludedTagsMode) {
        result.excludedTagsMode = excludedTagsMode === "AND" ? "AND" : "OR"
    }
    // order
    result.order = {}
    if (params.get("order[latestUploadedChapter]")) {
        result.order.latestUploadedChapter = params.get("order[latestUploadedChapter]") as Order
    }
    if (params.get("order[title]")) {
        result.order.title = params.get("order[title]") as Order
    }
    if (params.get("order[createdAt]")) {
        result.order.createdAt = params.get("order[createdAt]") as Order
    }
    if (params.get("order[followedCount]")) {
        result.order.followedCount = params.get("order[followedCount]") as Order
    }
    if (params.get("order[relevance]")) {
        result.order.relevance = params.get("order[relevance]") as Order
    }
    if (params.get("order[rating]")) {
        result.order.rating = params.get("order[rating]") as Order
    }
    return result
}