/********************
 * IMPORT STATEMENTS
 ********************/

import { AuthenticationToken } from "./authentication";
import { MangaContentRating } from "./static";
import {
  UserList,
  UserResponse,
  ChapterList,
  MangaList,
} from "../../types/mangadex";
import { Order, Includes } from "./static";
import * as util from "./util";

/*******************
 * TYPE DEFINITIONS
 *******************/

/** Order object for GetUsersRequestOptions */
export type GetUsersOrder = {
  username?: Order;
};

/** Order object for GetUserFollowedMangaFeedRequestOptions */
export type GetUserFollowedMangaFeedOrder = {
  createdAt: Order;
  updatedAt: Order;
  publishAt: Order;
  readableAt: Order;
  volume: Order;
  chapter: Order;
};

/***********************
 * API REQUEST/RESPONSE
 ***********************/

/** Request parameters for `GET /user` */
export type GetUsersRequestOptions = {
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
  username?: string;
  order?: GetUsersOrder;
};

/** Response from `GET /user` */
export type GetUsersResponse = UserList;

/** Response from `GET /user/{id}` */
export type GetUserIdResponse = UserResponse;

/** Request parameters for `GET /user/follows/manga/feed` */
export type GetUserFollowedMangaFeedRequestOptions = {
  /**
   * ```console
   * Default: 100
   * Minimum: 1
   * Maximum: 500
   */
  limit?: number;
  offset?: number;
  /** ISO 639-1 standard two or five letter language code */
  translatedLanguage?: string[];
  /** ISO 639-1 standard two or five letter language code */
  originalLanguage?: string[];
  /** ISO 639-1 standard two or five letter language code */
  excludedOriginalLanguage?: string[];
  /** Default: ["safe", "suggestive", "erotica"] */
  contentRating?: MangaContentRating[];
  /** UUID formatted strings */
  excludedGroups?: string[];
  /** UUID formatted strings */
  excludedUploaders?: string[];
  includeFutureUpdates?: "0" | "1";
  /** DateTime formatted as YYYY-MM-DDTHH:mm:SS */
  createdAtSince?: string;
  /** DateTime formatted as YYYY-MM-DDTHH:mm:SS */
  updatedAtSince?: string;
  /** DateTime formatted as YYYY-MM-DDTHH:mm:SS */
  publishAtSince?: string;
  order?: GetUserFollowedMangaFeedOrder;
  includes?: Includes[];
};

/** Response from `GET /user/follows/manga/feed` */
export type GetUserFollowedMangaFeedResponse = ChapterList;

/** Request parameters for `GET /user/follows/manga` */
export type GetUserFollowedMangaRequestOptions = {
  /** ```console
   * Default: 10
   * Minimum: 1
   * Maximum: 100
   * ``` */
  limit?: number;
  /** Minimum: 0 */
  offset?: number;
  includes?: Includes[];
};

/** Response from `GET /user/follows/manga` */
export type GetUserFollowedMangaResponse = MangaList;

/** Response from `GET /user/me` */
export type GetUserMeResponse = UserResponse;

/***********************
 * FUNCTION DEFINITIONS
 ***********************/

/**
 * Get a list of users based on search parameters.
 *
 * @param {AuthenticationToken} token See {@link AuthenticationToken}
 * @param {GetUsersRequestOptions} [options] See {@link GetUsersRequestOptions}
 * @returns A promise that resolves to a {@link GetUsersResponse} object.
 */
export const getUsers = function (
  token: AuthenticationToken,
  options?: GetUsersRequestOptions,
) {
  const qs = util.buildQueryStringFromOptions(options);
  const path = `/user${qs}`;

  try {
    const httpsRequestOptions = util.addTokenAuthorization(token);
    return util.createHttpsRequestPromise<GetUsersResponse>(
      "GET",
      path,
      httpsRequestOptions,
    );
  } catch (err: any) {
    return Promise.reject(err);
  }
};

/**
 * Get a specific user's information.
 *
 * @param {string} id UUID formatted string.
 * @returns A promise that resolves to a {@link GetUserIdResponse} object.
 */
export const getUserId = function (id: string) {
  if (id === undefined) {
    return Promise.reject(
      "ERROR - getUserId: Parameter `id` cannot be undefined",
    );
  } else if (id === "") {
    return Promise.reject("ERROR - getUserId: Parameter `id` cannot be blank");
  }

  const path = `/user/${id}`;

  return util.createHttpsRequestPromise<GetUserIdResponse>("GET", path);
};

// Kenjugs (06/22/2022) TODO: Implement functionality for `DELETE /user/{id}`
// export const deleteUserId = function (token, id) { };

// Kenjugs (06/22/2022) TODO: Implement functionality for `POST /user/delete/{code}`
// export const userDeleteCode = function (code) { };

// Kenjugs (06/22/2022) TODO: Implement functionality for `POST /user/password`
// export const updateUserPassword = function (token, oldPassword, newPassword) { };

// Kenjugs (06/22/2022) TODO: Implement functionality for `POST /user/email`
// export const updateUserEmail = function (token, email) { };

/**
 * Gets a chapter feed from currently logged in user's list of followed manga.
 *
 * @param {AuthenticationToken} token See {@link AuthenticationToken}
 * @param {GetUserFollowedMangaFeedRequestOptions} [options] See {@link GetUserFollowedMangaFeedRequestOptions}
 * @returns A promise that resolves to a {@link GetUserFollowedMangaFeedResponse} object.
 * Will resolve to a {@link ErrorResponse} object on error.
 */
export const getUserFollowedMangaFeed = function (
  token: AuthenticationToken,
  options?: GetUserFollowedMangaFeedRequestOptions,
) {
  const qs = util.buildQueryStringFromOptions(options);
  const path = `/user/follows/manga/feed${qs}`;

  try {
    const httpsRequestOptions = util.addTokenAuthorization(token);
    return util.createHttpsRequestPromise<GetUserFollowedMangaFeedResponse>(
      "GET",
      path,
      httpsRequestOptions,
    );
  } catch (err: any) {
    return Promise.reject(err);
  }
};

/**
 * Gets the currently logged in user's followed manga list.
 *
 * @param {AuthenticationToken} token See {@link AuthenticationToken}
 * @param {GetUserFollowedMangaRequestOptions} [options] See {@link GetUserFollowedMangaRequestOptions}
 * @returns A promise that resolves to a {@link GetUserFollowedMangaResponse} object.
 */
export const getUserFollowedManga = function (
  token: AuthenticationToken,
  options?: GetUserFollowedMangaRequestOptions,
) {
  const qs = util.buildQueryStringFromOptions(options);
  const path = `/user/follows/manga${qs}`;

  try {
    const httpsRequestOptions = util.addTokenAuthorization(token);
    return util.createHttpsRequestPromise<GetUserFollowedMangaResponse>(
      "GET",
      path,
      httpsRequestOptions,
    );
  } catch (err: any) {
    return Promise.reject(err);
  }
};

/**
 * Gets the currently logged in user's details.
 *
 * @param {AuthenticationToken} token See {@link AuthenticationToken}
 * @returns A promise that resolves to a {@link GetUserMeResponse} object
 */
export const getUserMe = function (token: AuthenticationToken) {
  const path = `/user/me`;

  try {
    const httpsRequestOptions = util.addTokenAuthorization(token);
    return util.createHttpsRequestPromise<GetUserMeResponse>(
      "GET",
      path,
      httpsRequestOptions,
    );
  } catch (err: any) {
    return Promise.reject(err);
  }
};
