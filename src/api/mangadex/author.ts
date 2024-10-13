/********************
 * IMPORT STATEMENTS
 ********************/

import type { AuthenticationToken } from './authentication';
import type { AuthorList, AuthorResponse, AuthorCreate, AuthorEdit, Response, ErrorResponse, ReferenceExpansionAuthor } from '../../types/mangadex';
import type { Order } from './static';
import * as util from './util';

/*******************
 * TYPE DEFINITIONS
 *******************/

/** Order object for GetAuthorRequestOptions */
export type GetAuthorOrder = {
    name?: Order
};

/***********************
 * API REQUEST/RESPONSE
 ***********************/

/** Request parameters for `GET /author` */
export type GetAuthorRequestOptions = {
    /** ```console
     * Default: 10
     * Minimum: 0
     * Maximum: 100
     * ```*/
    limit?: number
    /** ```console
     * Minimum: 0
     * ``` */
    offset?: number
    /**
     * UUID formatted strings
     * 
     * Author IDs (limited to 100 per request)
     */
    ids?: string[]
    name?: string
    order?: GetAuthorOrder
    includes?: ReferenceExpansionAuthor
};

/** Response from `GET /author` */
export type GetAuthorResponse = AuthorList;

/** Request parameters for `GET /author/{id}` */
export type GetAuthorIdRequestOptions = {
    includes?: ReferenceExpansionAuthor
};

/** Request parameters for `POST /author` */
export type PostAuthorRequestOptions = AuthorCreate;

/** Response from `POST /author` */
export type PostAuthorResponse = AuthorResponse;

/** Response from `GET /author/{id}` */
export type GetAuthorIdResponse = AuthorResponse;

/** Request parameters for `PUT /author/{id}` */
export type PutAuthorIdRequestOptions = AuthorEdit;

/** Response from `PUT /author/{id}` */
export type PutAuthorIdResponse = AuthorResponse;

/** Response from `DELETE /author/{id}` */
export type DeleteAuthorIdResponse = Response;

/***********************
 * FUNCTION DEFINITIONS
 ***********************/

/**
 * Search for author based on search criteria
 * 
 * @param {GetAuthorRequestOptions} [options] See {@link GetAuthorRequestOptions}
 * @returns A promise that resolves to a {@link GetAuthorResponse} object.
 * Can also resolve to an {@link ErrorResponse} object.
 */
export const getAuthor = function (options?: GetAuthorRequestOptions) {
    const qs = util.buildQueryStringFromOptions(options);
    const path = `/author${qs}`;

    return util.createHttpsRequestPromise<GetAuthorResponse>('GET', path);
};

/**
 * Create a new author
 * 
 * @param {PostAuthorRequestOptions} options See {@link PostAuthorRequestOptions}
 * @param {AuthenticationToken} token See {@link AuthenticationToken}
 * @returns A promise that resolve to a {@link PostAuthorResponse} object.
 * Can also resolve to an {@link ErrorResponse} object.
 */
export const postAuthor = function (options: PostAuthorRequestOptions, token: AuthenticationToken) {
    if (options === undefined) {
        return Promise.reject('ERROR - postAuthor: Parameter `options` cannot be undefined');
    } else if (!('name' in options)) {
        return Promise.reject('ERROR - postAuthor: Parameter `options` missing required property `name`');
    }

    const req = {
        body: options,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const path = '/author';
    
    try {
        const httpsRequestOptions = util.addTokenAuthorization(token, req);
        return util.createHttpsRequestPromise<PostAuthorResponse>('POST', path, httpsRequestOptions);
    } catch (error: any) {
        return Promise.reject(error);
    }
};

/**
 * Get author info by ID
 * 
 * @param {string} id UUID formatted string
 * @param {GetAuthorIdRequestOptions} [options] See {@link GetAuthorIdRequestOptions}
 * @returns A promise that resolves to a {@link GetAuthorIdResponse} object.
 * Can also resolve to an {@link ErrorResponse} object.
 */
export const getAuthorId = function (id: string, options?: GetAuthorIdRequestOptions) {
    if (id === undefined) {
        return Promise.reject('ERROR - getAuthorId: Parameter `id` cannot be undefined');
    } else if (id === '') {
        return Promise.reject('ERROR - getAuthorId: Parameter `id` cannot be blank');
    }

    const qs = util.buildQueryStringFromOptions(options);
    const path = `/author/${id}${qs}`;

    return util.createHttpsRequestPromise<GetAuthorIdResponse>('GET', path);
};

/**
 * Update author info by ID
 * 
 * @param {string} id UUID formatted string
 * @param {PutAuthorIdRequestOptions} options See {@link PutAuthorIdRequestOptions}
 * @param {AuthenticationToken} token See {@link AuthenticationToken}
 * @returns A promise that resolves to a {@link PutAuthorIdResponse} object.
 * Can also resolve to an {@link ErrorResponse} object.
 */
export const putAuthorId = function (id: string, options: PutAuthorIdRequestOptions, token: AuthenticationToken) {
    if (id === undefined) {
        return Promise.reject('ERROR - putAuthorId: Parameter `id` cannot be undefined');
    } else if (id === '') {
        return Promise.reject('ERROR - putAuthorId: Parameter `id` cannot be blank');
    } else if (options === undefined) {
        return Promise.reject('ERROR - putAuthorId: Parameter `options` cannot be undefined');
    } else if (!('version' in options)) {
        return Promise.reject('ERROR - putAuthorId: Parameter `options` missing required property `version`');
    }

    const req = {
        body: options,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const path = `/author/${id}`;

    try {
        const httpsRequestOptions = util.addTokenAuthorization(token, req);
        return util.createHttpsRequestPromise<PutAuthorIdResponse>('PUT', path, httpsRequestOptions);
    } catch (error: any) {
        return Promise.reject(error);
    }
};

/**
 * Delete author by ID
 * 
 * @param {string} id UUID formatted string
 * @param {AuthenticationToken} token See {@link AuthenticationToken}
 * @returns A promise that resolves to a {@link DeleteAuthorIdResponse} object.
 * Can also resolve to an {@link ErrorResponse} object.
 */
export const deleteAuthorId = function (id: string, token: AuthenticationToken) {
    if (id === undefined) {
        return Promise.reject('ERROR - deleteAuthorId: Parameter `id` cannot be undefined');
    } else if (id === '') {
        return Promise.reject('ERROR - deleteAuthorId: Parameter `id` cannot be blank');
    }

    const path = `/author/${id}`;

    try {
        const httpsRequestOptions = util.addTokenAuthorization(token);
        return util.createHttpsRequestPromise<DeleteAuthorIdResponse>('DELETE', path, httpsRequestOptions);
    } catch (error: any) {
        return Promise.reject(error);
    }
};
