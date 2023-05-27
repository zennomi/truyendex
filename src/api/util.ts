/********************
 * IMPORT STATEMENTS
 ********************/

import { AuthenticationToken } from './authentication';
import axios, { AxiosRequestConfig } from 'axios';
import { ErrorResponse } from './schema';
import config from '../config';

/*******************
 * TYPE DEFINITIONS
 *******************/

/** HTTPS request options with an optional body property */
// export type AxiosRequestConfig = https.AxiosRequestConfig & {
//     body?: object
// };

/************************
 * CONSTANT DECLARATIONS
 ************************/

const MANGADEX_API_URL = 'https://api.mangadex.org';
const CORS = config.corsUrl;

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = process.env.NODE_ENV === "production" ? "1" : "0";

/************************
* FUNCTION DECLARATIONS
************************/

/**
 * Transform an array of strings to query string params of the form
 * `name[]=value1&name[]=value2` etc
 * 
 * @param {string} name
 * @param {string[]} [array]
 * @returns {string} Formatted query string params
 */
const transformArrayForQueryString = function (name: string, array?: string[]) {
    let qs = '';

    if (array === undefined || array.length === 0) {
        return qs;
    }

    for (const s of array) {
        if (qs === '') {
            qs += `${name}[]=${s}`;
        } else {
            qs += `&${name}[]=${s}`;
        }
    }

    return qs;
};

/**
 * Build a query string from a request options object.
 * 
 * @param {object} [options] A request options object to parse
 * @returns {string} The query string, including the starting '?' character
 */
export const buildQueryStringFromOptions = function (options?: { [key: string]: any }) {
    const queryParams = [];

    if (options === undefined || Object.keys(options).length === 0) {
        return '';
    }

    for (const key of Object.keys(options)) {
        if (options[key] instanceof Array) {
            queryParams.push(transformArrayForQueryString(key, options[key]));
        } else if (options[key] instanceof Date) {
            if (!isNaN(options[key])) {
                /** @type {Date} */
                const d = options[key];
                queryParams.push(`${key}=${d.toISOString().substring(0, d.toISOString().indexOf('.'))}`);
            }
        } else if (key === 'order') {
            const order = options[key];

            for (const o of Object.keys(order)) {
                queryParams.push(`order[${o}]=${order[o]}`);
            }
        } else {
            queryParams.push(`${key}=${options[key]}`);
        }
    }

    const ret = `?${queryParams.join('&')}`;
    return ret === '?' ? '' : ret;
};

/**
 * @template T
 * @param {string} method The HTTP method.
 * @param {string} path The endpoint path.
 * @param {AxiosRequestConfig} [options] Additional request options (such as request body, headers, etc.)
 * @returns A promise that resolves to a specific response object T.
 */
export const createHttpsRequestPromise = function <T>(method: string, path: string, options?: AxiosRequestConfig) {
    if (method === undefined) {
        return Promise.reject('ERROR - createHttpsRequestPromise: Parameter `method` cannot be undefined');
    } else if (method === '') {
        return Promise.reject('ERROR - createHttpsRequestPromise: Parameter `method` cannot be blank');
    } else if (path === undefined) {
        return Promise.reject('ERROR - createHttpsRequestPromise: Parameter `path` cannot be undefined');
    } else if (path === '') {
        return Promise.reject('ERROR - createHttpsRequestPromise: Parameter `path` cannot be blank');
    }
    // console.log(path)

    const encodedUrl = btoa(`${MANGADEX_API_URL}${path}`).replace(/\+/g, "-").replace(/\//g, "_")
    const headers = new Headers()
    headers.set('x-requested-with', 'cubari')
    const httpsRequestOptions: AxiosRequestConfig = {
        method: method,
        url: `${CORS}/v1/cors/${encodedUrl}`,
        headers: {
            'x-requested-with': 'cubari'
        }
    };

    console.log(httpsRequestOptions)

    let body: unknown = null;

    if (options && ('body' in options)) {
        body = options.body;
        delete options.body;
    }

    // merge the options object if it was provided
    if (options) {
        Object.assign(httpsRequestOptions, options);
    }

    return new Promise<{ data: T | ErrorResponse, statusCode?: number, statusMessage?: string }>((resolve, reject) => {
        console.log('hello')

        axios(httpsRequestOptions).then(res => {
            const resObj = {
                data: res.data,
                statusCode: res.status,
                statusMessage: res.statusText,
            }
            resolve(resObj)
        })
        // const req = https.request(httpsRequestOptions, res => {
        //     const chunks: Buffer[] = [];

        //     res.on('data', chunk => {
        //         chunks.push(Buffer.from(chunk));
        //     });

        //     res.on('error', err => {
        //         reject(err);
        //     });

        //     res.on('end', () => {
        //         const s = Buffer.concat(chunks).toString('utf8');

        //         if (['{', '['].includes(s.charAt(0))) {
        //             const resObj = {
        //                 data: JSON.parse(s),
        //                 statusCode: res.statusCode,
        //                 statusMessage: res.statusMessage,
        //             }
        //             resolve(resObj);
        //         }
        //     });
        // });

        // if (body !== null) {
        //     req.write(JSON.stringify(body));
        // }

        // req.end();
    });
};

/**
 * Adds an authorization header to a request options object.
 * 
 * @param {AuthenticationToken} token See {@link AuthenticationToken}
 * @param {AxiosRequestConfig} [request] AxiosRequestConfig object to add the token to
 * @returns A new {@link AxiosRequestConfig} object with the added authorization token
 */
export const addTokenAuthorization = function (token: AuthenticationToken, request?: AxiosRequestConfig) {
    if (token === undefined) {
        throw new Error('ERROR - addTokenAuthorization: Parameter `token` cannot be undefined');
    } else if (!('session' in token)) {
        throw new Error('ERROR - addTokenAuthorization: Parameter `token` missing required property `session`');
    }

    const headers = request?.headers;

    const o = {
        ...request,
        headers: {
            Authorization: `Bearer ${token.session}`,
            ...headers
        }
    };

    return o;
};

/**
 * Type guarding function for checking if a response is an ErrorResponse.
 * 
 * @param {ErrorResponse | any} res The response to check
 * @returns A boolean value indicating if the response is an ErrorResponse
 */
export const isErrorResponse = function (res: ErrorResponse | any): res is ErrorResponse {
    if (!res) return false;
    return (res as ErrorResponse).errors !== undefined;
};
