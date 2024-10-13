/********************
 * IMPORT STATEMENTS
 ********************/

import { AuthenticationToken } from './authentication';
import { MangaContentRating } from './static';
import { CustomListResponse, CustomListList, ChapterList, ErrorResponse } from '../../types/mangadex';
import { Order, Includes } from './static';
import * as util from './util';

/*******************
 * TYPE DEFINITIONS
 *******************/

// Kenjugs (06/24/2022) TODO: This type is identical to GetUserFollowedMangaFeedOrder.
// These should be consolidated into a base type.
/** Order object for GetListIdFeedRequestOptions */
export type GetListIdFeedOrder = {
    createdAt: Order
    updatedAt: Order
    publishAt: Order
    readableAt: Order
    volume: Order
    chapter: Order
};

/***********************
 * API REQUEST/RESPONSE
 ***********************/

/** Response from `GET /list/{id}` */
export type GetListIdResponse = CustomListResponse;

/** Request parameters for `GET /user/list` */
export type GetUserListRequestOptions = {
    /**
     * ```console
     * Default: 10
     * Minimum: 0
     * Maximum: 100
     * ```
     */
    limit?: number
    offset?: number
};

/** Response from `GET /user/list` */
export type GetUserListResponse = CustomListList;

/** Request parameters for `GET /user/{id}/list` */
export type GetUserIdListRequestOptions = GetUserListRequestOptions;

/** Response from `GET /user/{id}/list` */
export type GetUserIdListResponse = GetUserListResponse;

/** Request parameters for `GET /list/{id}/feed` */
// Kenjugs (06/24/2022) TODO: This type is identical to GetUserFollowedMangaFeedRequestOptions.
// These should be consolidated into a base type.
export type GetListIdFeedRequestOptions = {
    /**
     * ```console
     * Default: 100
     * Minimum: 1
     * Maximum: 500
     */
    limit?: number
    offset?: number
    /** ISO 639-1 standard two or five letter language code */
    translatedLanguage?: string[]
    /** ISO 639-1 standard two or five letter language code */
    originalLanguage?: string[]
    /** ISO 639-1 standard two or five letter language code */
    excludedOriginalLanguage?: string[]
    /** Default: ["safe", "suggestive", "erotica"] */
    contentRating?: MangaContentRating[]
    /** UUID formatted strings */
    excludedGroups?: string[]
    /** UUID formatted strings */
    excludedUploaders?: string[]
    includeFutureUpdates?: '0' | '1'
    /** DateTime formatted as YYYY-MM-DDTHH:mm:SS */
    createdAtSince?: string
    /** DateTime formatted as YYYY-MM-DDTHH:mm:SS */
    updatedAtSince?: string
    /** DateTime formatted as YYYY-MM-DDTHH:mm:SS */
    publishAtSince?: string
    order?: GetListIdFeedOrder
    includes?: Includes[]
};

/** Response from `GET /list/{id}/feed` */
export type GetListIdFeedResponse = ChapterList;

/***********************
 * FUNCTION DEFINITIONS
 ***********************/

// Kenjugs (06/07/2022) TODO: Implement functionality for `POST /list`
// export const createList = function (token, options) { };

/**
 * Get info about a list by its ID.
 * 
 * @param {string} listId UUID formatted string.
 * @returns A promise that resolves to a {@link GetListIdResponse} object.
 * Will resolve to a {@link ErrorResponse} object on error.
 */
export const getListId = function (listId: string) {
    if (listId === undefined) {
        return Promise.reject('ERROR - getListId: Parameter `listId` cannot be undefined');
    } else if (listId === '') {
        return Promise.reject('ERROR - getListId: Parameter `listId` cannot be blank');
    }

    const path = `/list/${listId}`;

    return util.createHttpsRequestPromise<GetListIdResponse>('GET', path);
};

// Kenjugs (06/15/2022) TODO: Implement functionality for `PUT /list/{id}`
// export const updateListId = function (token, listId, options) { };

// Kenjugs (06/15/2022) TODO: Implement functionality for `DELETE /list/{id}`
// export const deleteListId = function (token, listId) { };

// Kenjugs (06/15/2022) TODO: Implement functionality for `POST /list/{id}/follow`
// export const followListId = function (token, listId) { };

// Kenjugs (06/15/2022) TODO: Implement functionality for `DELETE /list/{id}/follow`
// export const unfollowListId = function (token, listId) { };

// Kenjugs (06/15/2022) TODO: Implement functionality for `POST /manga/{id}/list/{listId}`
// export const addMangaIdToListId = function (token, mangaId, listId) { };

// Kenjugs (06/15/2022) TODO: Implement functionality for `DELETE /manga/{id}/list/{listId}`
// export const removeMangaIdFromListId = function (token, mangaId, listId) { };

/**
 * Get the currently logged in user's custom lists (public and private).
 * 
 * @param {AuthenticationToken} token See {@link AuthenticationToken}
 * @param {GetUserListRequestOptions} [options] See {@link GetUserListRequestOptions}
 * @returns A promise that resolves to a {@link GetUserListResponse} object.
 */
export const getUserList = function (token: AuthenticationToken, options?: GetUserListRequestOptions) {
    const qs = util.buildQueryStringFromOptions(options);
    const path = `/user/list${qs}`;

    try {
        const httpsRequestOptions = util.addTokenAuthorization(token);
        return util.createHttpsRequestPromise<GetUserListResponse>('GET', path, httpsRequestOptions);
    } catch (err: any) {
        return Promise.reject(err);
    }
};

/**
 * Get a specific user's custom lists (public only).
 * 
 * @param {string} id UUID formatted string.
 * @param {GetUserIdListRequestOptions} [options] See {@link GetUserIdListRequestOptions}
 * @returns A promise that resolves to a {@link GetUserIdListResponse} object.
 */
export const getUserIdList = function (id: string, options?: GetUserIdListRequestOptions) {
    if (id === undefined) {
        return Promise.reject('ERROR - getUserIdList: Parameter `id` cannot be undefined');
    } else if (id === '') {
        return Promise.reject('ERROR - getUserIdList: Parameter `id` cannot be blank');
    }

    const qs = util.buildQueryStringFromOptions(options);
    const path = `/user/${id}/list${qs}`;

    return util.createHttpsRequestPromise<GetUserIdListResponse>('GET', path);
};

/**
 * Gets a chapter feed from a specific list.
 * 
 * @param {string} id UUID formatted string
 * @param {GetListIdFeedRequestOptions} [options] See {@link GetListIdFeedRequestOptions}
 * @returns A promise that resolves to a {@link GetListIdFeedResponse} object.
 * Will resolve to a {@link ErrorResponse} object on error.
 */
export const getListIdFeed = function (id: string, options?: GetListIdFeedRequestOptions) {
    if (id === undefined) {
        return Promise.reject('ERROR - getListIdFeed: Parameter `id` cannot be undefined');
    } else if (id === '') {
        return Promise.reject('ERROR - getListIdFeed: Parameter `id` cannot be blank');
    }

    const qs = util.buildQueryStringFromOptions(options);
    const path = `/list/${id}/feed${qs}`;

    return util.createHttpsRequestPromise<GetListIdFeedResponse>('GET', path);
};
