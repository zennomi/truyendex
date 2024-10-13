/********************
 * IMPORT STATEMENTS
 ********************/

import type { AuthenticationToken } from './authentication';
import type { ErrorResponse } from '../../types/mangadex';
import * as util from './util';

/***********************
 * API REQUEST/RESPONSE
 ***********************/

/** Response from `POST /captcha/solve` */
export type PostCaptchaSolveResponse = {
    result: 'ok' | 'error'
};

/***********************
 * FUNCTION DEFINITIONS
 ***********************/

/**
 * Send a solved captcha challenge string. Solved captchas are tracked by IP address.
 * 
 * @param {string} challengeString The challenge string to send
 * @param {AuthenticationToken} [token] Optional. Associate the solved captcha with a user's id
 * @returns A promise that resolves to a {@link PostCaptchaSolveResponse} object.
 * Can also reject to an {@link ErrorResponse} object.
 */
export const postCaptchaSolve = function (challengeString: string, token?: AuthenticationToken) {
    if (challengeString === undefined) {
        return Promise.reject('ERROR - postCaptchaSolve: Parameter `challengeString` cannot be undefined');
    } else if (challengeString === '') {
        return Promise.reject('ERROR - postCaptchaSolve: Parameter `challengeString` cannot be blank');
    }

    const req = {
        body: {
            captchaChallenge: challengeString
        }, headers: {
            'Content-Type': 'application/json'
        }
    };

    const path = '/captcha/solve';

    try {
        let httpsRequestOptions;

        if (token) {
            httpsRequestOptions = util.addTokenAuthorization(token, req);
        } else {
            httpsRequestOptions = { ...req };
        }

        return util.createHttpsRequestPromise<PostCaptchaSolveResponse>('POST', path, httpsRequestOptions);
    } catch (error) {
        return Promise.reject(error);
    }
};
