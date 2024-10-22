/********************
 * IMPORT STATEMENTS
 ********************/

import type { AuthenticationToken } from "./authentication";
import type { MangaContentRating } from "./static";
import type {
  ChapterList,
  ChapterResponse,
  ReferenceExpansionChapter,
  ErrorResponse,
  ChapterEdit,
  Response,
} from "../../types/mangadex";
import type { Order } from "./static";
import * as util from "./util";

/*******************
 * TYPE DEFINITIONS
 *******************/

/** Order object for GetChapterRequestOptions */
export type GetChapterOrder = {
  createdAt?: Order;
  updatedAt?: Order;
  publishAt?: Order;
  readableAt?: Order;
  volume?: Order;
  chapter?: Order;
};

/***********************
 * API REQUEST/RESPONSE
 ***********************/

/** Request parameters for `GET /chapter` */
export type GetChapterRequestOptions = {
  /**
   * ```console
   * Default: 10
   * Minimum: 0
   * Maximum: 100
   * ```
   */
  limit?: number;
  offset?: number;
  /** UUID formatted strings (limited to 100 per request) */
  ids?: string[];
  title?: string;
  /** UUID formatted strings */
  groups?: string[];
  /** UUID formatted string(s) */
  uploader?: string | string[];
  /** UUID formatted string */
  manga?: string;
  volume?: string | string[];
  chapter?: string | string[];
  /** ISO 639-1 standard two or five letter language code */
  translatedLanguage?: string[];
  /** ISO 639-1 standard two or five letter language code */
  originalLanguage?: string[];
  /** ISO 639-1 standard two or five letter language code */
  excludedOriginalLanguage?: string[];
  contentRating?: MangaContentRating[];
  /** UUID formatted string */
  excludedGroups?: string[];
  /** UUID formatted string */
  excludedUploaders?: string[];
  /** Default: '1' */
  includeFutureUpdates?: "0" | "1";
  includeEmptyPages?: 0 | 1;
  includeFuturePublishAt?: 0 | 1;
  includeExternalUrl?: 0 | 1;
  /** DateTime formatted as YYYY-MM-DDTHH:mm:SS */
  createdAtSince?: string;
  /** DateTime formatted as YYYY-MM-DDTHH:mm:SS */
  updatedAtSince?: string;
  /** DateTime formatted as YYYY-MM-DDTHH:mm:SS */
  publishAtSince?: string;
  order?: GetChapterOrder;
  includes?: ReferenceExpansionChapter;
};

/** Response from `GET /chapter` */
export type GetChapterResponse = ChapterList;

/** Request parameters for `GET /chapter/{id}` */
export type GetChapterIdRequestOptions = {
  includes?: ReferenceExpansionChapter;
};

/** Response from `GET /chapter/{id}` */
export type GetChapterIdResponse = ChapterResponse;

/** Request parameters for `PUT /chapter/{id}` */
export type PutChapterIdRequestOptions = ChapterEdit;

/** Response from `PUT /chapter/{id}` */
export type PutChapterIdResponse = ChapterResponse;

/** Response from `DELETE /chapter/{id}` */
export type DeleteChapterIdResponse = Response;

/***********************
 * FUNCTION DEFINITIONS
 ***********************/

/**
 * Gets a list of chapters based on search options.
 *
 * @param {GetChapterRequestOptions} [options] See {@link GetChapterRequestOptions}
 * @returns A promise that resolves to a {@link GetChapterResponse} object.
 * Can also reject to an {@link ErrorResponse} object.
 */
export const getChapter = function (options?: GetChapterRequestOptions) {
  const qs = util.buildQueryStringFromOptions(options);
  const path = `/chapter${qs}`;

  return util.createHttpsRequestPromise<GetChapterResponse>("GET", path);
};

/**
 * Gets information about a specific manga chapter.
 *
 * @param {string} id UUID formatted string
 * @param {GetChapterIdRequestOptions} [options] See {@link GetChapterIdRequestOptions}
 * @returns A promise that resolves to a {@link GetChapterIdResponse} object.
 * Can also reject to an {@link ErrorResponse} object.
 */
export const getChapterId = function (
  id: string,
  options?: GetChapterIdRequestOptions,
) {
  if (id === undefined) {
    return Promise.reject(
      "ERROR - getChapterId: Parameter `id` cannot be undefined",
    );
  } else if (id === "") {
    return Promise.reject(
      "ERROR - getChapterId: Parameter `id` cannot be blank",
    );
  }

  const qs = util.buildQueryStringFromOptions(options);
  const path = `/chapter/${id}${qs}`;

  return util.createHttpsRequestPromise<GetChapterIdResponse>("GET", path);
};

/**
 * Update a chapter by ID.
 *
 * @param {string} id UUID formatted string
 * @param {PutChapterIdRequestOptions} options See {@link PutChapterIdRequestOptions}
 * @param {AuthenticationToken} token See {@link AuthenticationToken}
 * @returns A promise that resolves to a {@link PutChapterIdResponse} object.
 * Can also reject to an {@link ErrorResponse} object.
 */
export const putChapterId = function (
  id: string,
  options: PutChapterIdRequestOptions,
  token: AuthenticationToken,
) {
  if (id === undefined) {
    return Promise.reject(
      "ERROR - putChapterId: Parameter `id` cannot be undefined",
    );
  } else if (id === "") {
    return Promise.reject(
      "ERROR - putChapterId: Parameter `id` cannot be blank",
    );
  } else if (options === undefined) {
    return Promise.reject(
      "ERROR - putChapterId: Parameter `options` cannot be undefined",
    );
  } else if (!("version" in options)) {
    return Promise.reject(
      "ERROR - putChapterId: Parameter `options` missing required property `version`",
    );
  }

  const req = {
    body: options,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const path = `/chapter/${id}`;

  try {
    const httpsRequestOptions = util.addTokenAuthorization(token, req);
    return util.createHttpsRequestPromise<PutChapterIdResponse>(
      "PUT",
      path,
      httpsRequestOptions,
    );
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Delete a chapter by ID.
 *
 * @param {string} id UUID formatted string
 * @param {AuthenticationToken} token See {@link AuthenticationToken}
 * @returns A promise that resolves to a {@link DeleteChapterIdResponse} object.
 * Can also reject to an {@link ErrorResponse} object.
 */
export const deleteChapterId = function (
  id: string,
  token: AuthenticationToken,
) {
  if (id === undefined) {
    return Promise.reject(
      "ERROR - deleteChapterId: Parameter `id` cannot be undefined",
    );
  } else if (id === "") {
    return Promise.reject(
      "ERROR - deleteChapterId: Parameter `id` cannot be blank",
    );
  }

  const path = `/chapter/${id}`;

  try {
    const httpsRequestOptions = util.addTokenAuthorization(token);
    return util.createHttpsRequestPromise<DeleteChapterIdResponse>(
      "DELETE",
      path,
      httpsRequestOptions,
    );
  } catch (error) {
    return Promise.reject(error);
  }
};
