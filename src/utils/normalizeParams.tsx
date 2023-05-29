import { ReadonlyURLSearchParams } from "next/navigation";
import { GetSearchMangaRequestOptions, MangaPublicationDemographic } from "../api/manga";

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
    return result
}