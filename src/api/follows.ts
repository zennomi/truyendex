/********************
 * IMPORT STATEMENTS
 ********************/

import { AuthenticationToken } from './authentication';
import { ScanlationGroupList, Response, UserList } from './schema';
import { Includes } from './static';
import * as util from './util';

/***********************
 * API REQUEST/RESPONSE
 ***********************/

/** Request parameters for `GET /user/follows/group` */
export type GetUserFollowsGroupRequestOptions = {
    /** ```console
     * Default: 10
     * Minimum: 1
     * Maximum: 100
     * ``` */
    limit?: number
    /** ```console
     * Minimum: 0
     * ``` */
    offset?: number
    includes?: Includes[]
};

/** Response from `GET /user/follows/group` */
export type GetUserFollowsGroupResponse = ScanlationGroupList;

/** Response from `GET /user/follows/group/{id}` */
export type GetUserFollowsGroupIdResponse = Response;

/** Request parameters for `GET /user/follows/user` */
export type GetUserFollowsUserRequestOptions = {
    /** ```console
     * Default: 10
     * Minimum: 1
     * Maximum: 100
     * ``` */
    limit?: number
    /** ```console
     * Minimum: 0
     * ``` */
    offset?: number
};

/** Response from `GET /user/follows/user` */
export type GetUserFollowsUserResponse = UserList;

/***********************
 * FUNCTION DEFINITIONS
 ***********************/

/**
 * Get logged in user's followed groups.
 * 
 * @param {AuthenticationToken} token See {@link AuthenticationToken}
 * @param {GetUserFollowsGroupRequestOptions} [options] See {@link GetUserFollowsGroupRequestOptions}
 * @returns A promise that resolves to a {@link GetUserFollowsGroupResponse} object
 */
export const getUserFollowsGroup = function (token: AuthenticationToken, options?: GetUserFollowsGroupRequestOptions) {
    const qs = util.buildQueryStringFromOptions(options);
    const path = `/user/follows/group${qs}`;

    try {
        const httpsRequestOptions = util.addTokenAuthorization(token);
        return util.createHttpsRequestPromise<GetUserFollowsGroupResponse>('GET', path, httpsRequestOptions);
    } catch (err: any) {
        return Promise.reject(err);
    }
};

/**
 * Check if logged user follows a group.
 * 
 * @param {string} id UUID formatted string
 * @param {AuthenticationToken} token See {@link AuthenticationToken}
 * @returns A promise that resolves to a {@link GetUserFollowsGroupIdResponse} object
 */
export const getUserFollowsGroupId = function (id: string, token: AuthenticationToken) {
    if (id === undefined) {
        return Promise.reject('ERROR - getUserFollowsGroupId: Parameter `id` cannot be undefined');
    } else if (id === '') {
        return Promise.reject('ERROR - getUserFollowsGroupId: Parameter `id` cannot be blank');
    }

    const path = `/user/follows/group/${id}`;

    try {
        const httpsRequestOptions = util.addTokenAuthorization(token);
        return util.createHttpsRequestPromise<GetUserFollowsGroupIdResponse>('GET', path, httpsRequestOptions);
    } catch (err: any) {
        return Promise.reject(err);
    }
};

/**
 * Gets a list of users that the current logged in user follows.
 * 
 * @param {AuthenticationToken} token See {@link AuthenticationToken}
 * @param {GetUserFollowsUserRequestOptions} [options] See {@link GetUserFollowsUserRequestOptions}
 * @returns A promise that resolves to a {@link GetUserFollowsUserResponse} object
 */
export const getUserFollowsUser = function (token: AuthenticationToken, options?: GetUserFollowsUserRequestOptions) {
    const qs = util.buildQueryStringFromOptions(options);
    const path = `/user/follows/user${qs}`;

    try {
        const httpsRequestOptions = util.addTokenAuthorization(token);
        return util.createHttpsRequestPromise<GetUserFollowsUserResponse>('GET', path, httpsRequestOptions);
    } catch (err: any) {
        return Promise.reject(err);
    }
};
