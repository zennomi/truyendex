import { GetSearchMangaRequestOptions } from "@/api/manga";
import { buildQueryStringFromOptions } from "@/api/util";
import routes from "@/routes";

const IMAGE_RESIZE_URL = "https://resizer.f-ck.me";

export function getSearchNetTromUrl(options: GetSearchMangaRequestOptions) {
    const queryString = buildQueryStringFromOptions(options)
    return `${routes.nettrom.search}${queryString.replaceAll("[]", "")}#results`
}

export function getResizeImgUrl(url: string, queryParams?: string) {
    return `${IMAGE_RESIZE_URL}/?url=${url}&${queryParams ?? ""}`;
};