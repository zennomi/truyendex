import { ReadonlyURLSearchParams } from "next/navigation";
import { MangadexApi } from "@/api";

export default function normalizeParams(params: ReadonlyURLSearchParams): MangadexApi.Manga.GetSearchMangaRequestOptions {
    const result: MangadexApi.Manga.GetSearchMangaRequestOptions = {}
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
        result.publicationDemographic = params.getAll('publicationDemographic') as MangadexApi.Static.MangaPublicationDemographic[]
    } else {
        result.publicationDemographic = []
    }
    if (params.getAll('contentRating').length > 0) {
        result.contentRating = params.getAll('contentRating') as MangadexApi.Static.MangaContentRating[]
    } else {
        result.contentRating = []
    }
    if (params.getAll('status').length > 0) {
        result.status = params.getAll('status') as MangadexApi.Static.MangaPublicationStatus[]
    } else {
        result.status = []
    }
    if (params.get("title")) {
        result.title = params.get("title")!
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
        result.order.latestUploadedChapter = params.get("order[latestUploadedChapter]") as MangadexApi.Static.Order
    }
    if (params.get("order[title]")) {
        result.order.title = params.get("order[title]") as MangadexApi.Static.Order
    }
    if (params.get("order[createdAt]")) {
        result.order.createdAt = params.get("order[createdAt]") as MangadexApi.Static.Order
    }
    if (params.get("order[followedCount]")) {
        result.order.followedCount = params.get("order[followedCount]") as MangadexApi.Static.Order
    }
    if (params.get("order[relevance]")) {
        result.order.relevance = params.get("order[relevance]") as MangadexApi.Static.Order
    }
    if (params.get("order[rating]")) {
        result.order.rating = params.get("order[rating]") as MangadexApi.Static.Order
    }

    return result
}