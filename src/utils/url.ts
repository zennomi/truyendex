import { GetSearchMangaRequestOptions } from "../api/manga";
import { buildQueryStringFromOptions } from "../api/util";
import routes from "../routes";

export function getSearchNetTromUrl(options: GetSearchMangaRequestOptions) {
    const queryString = buildQueryStringFromOptions(options)
    return `${routes.nettrom.search}${queryString.replaceAll("[]", "")}#results`
}