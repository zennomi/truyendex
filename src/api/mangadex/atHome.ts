/********************
 * IMPORT STATEMENTS
 ********************/

import type { ErrorResponse } from '../../types/mangadex';
import * as util from './util';

/***********************
 * API REQUEST/RESPONSE
 ***********************/

/** Request parameters for `GET /at-home/server/{chapterId}` */
export type GetAtHomeServerChapterIdRequestOptions = {
    /**
     * Force selecting from MangaDex@Home servers that use the standard HTTPS port 443.
     * 
     * While the conventional port for HTTPS traffic is 443 and servers are encouraged to
     * use it, it is not a hard requirement as it technically isn't anything special.
     * 
     * However, some misbehaving school/office network will at time block traffic to
     * non-standard ports, and setting this flag to `true` will ensure selection of a
     * server that uses these.
     * 
     * Default: false
     */
    forcePort443?: boolean
};

/** Response from `GET /at-home/server/{chapterId}` */
export type GetAtHomeServerChapterIdResponse = {
    /** Default: "ok" */
    result: string
    /**
     * The base URL to construct final image URLs from.
     * 
     * The URL returned is valid for the requested chapter only, and for a duration of
     * 15 minutes from the time of the response.
     */
    baseUrl: string
    chapter: {
        hash: string
        data: string[]
        dataSaver: string[]
    }
};

/**
 * Get MangaDex@Home server URL.
 * 
 * @param {string} chapterId UUID formatted string
 * @param {GetAtHomeServerChapterIdRequestOptions} [options] See {@link GetAtHomeServerChapterIdRequestOptions}
 * @returns A promise that resolves to a {@link GetAtHomeServerChapterIdResponse} object.
 * Can also resolve to an {@link ErrorResponse} object.
 */
export const getAtHomeServerChapterId = function (chapterId: string, options?: GetAtHomeServerChapterIdRequestOptions) {
    if (chapterId === undefined) {
        return Promise.reject('ERROR - getAtHomeServerChapterId: Parameter `chapterId` cannot be undefined');
    } else if (chapterId === '') {
        return Promise.reject('ERROR - getAtHomeServerChapterId: Parameter `chapterId` cannot be blank');
    }
    
    const qs = util.buildQueryStringFromOptions(options);
    const path = `/at-home/server/${chapterId}${qs}`;

    return util.createHttpsRequestPromise<GetAtHomeServerChapterIdResponse>('GET', path);
};
