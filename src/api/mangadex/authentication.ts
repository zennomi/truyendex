/********************
 * IMPORT STATEMENTS
 ********************/

import type {
  Login,
  LoginResponse,
  CheckResponse,
  LogoutResponse,
  RefreshResponse,
  ErrorResponse,
} from "../../types/mangadex";
import * as util from "./util";

/*******************
 * TYPE DEFINITIONS
 *******************/

/** Authentication token issued when logging into a user account */
export type AuthenticationToken = {
  session: string;
  refresh: string;
};

/***********************
 * API REQUEST/RESPONSE
 ***********************/

/**
 * Request body for `POST /auth/login`
 *
 * Login object for logging in and obtaining an auth token object.
 * At least one of username or email is required.
 */
export type PostAuthLoginRequestOptions = Login;

/** Response from `POST /auth/login` */
export type PostAuthLoginResponse = LoginResponse;

/** Response from `GET /auth/check` */
export type GetAuthCheckResponse = CheckResponse;

/** Response from `POST /auth/logout` */
export type PostAuthLogoutResponse = LogoutResponse;

/** Response from `POST /auth/refresh` */
export type PostAuthRefreshResponse = RefreshResponse;

/***********************
 * FUNCTION DEFINITIONS
 ***********************/

/**
 * DEPRECATED
 *
 * Send account credentials and receive an authentication token.
 *
 * @param {PostAuthLoginRequestOptions} login Login object containing username/email and password
 * @returns A promise that resolves to an {@link PostAuthLoginResponse} object.
 */
export const postAuthLogin = function (login: PostAuthLoginRequestOptions) {
  console.warn(
    "The function `postAuthLogin` is using a deprecated endpoint. Please consider removing it as it may not work in the future.",
  );

  if (login === undefined) {
    return Promise.reject(
      "ERROR - postAuthLogin: Parameter `login` cannot be undefined",
    );
  } else if (!("username" in login) && !("email" in login)) {
    return Promise.reject(
      "ERROR - postAuthLogin: Parameter `login` missing both `login.username` and `login.email`",
    );
  } else if (!("password" in login)) {
    return Promise.reject(
      "ERROR - postAuthLogin: Parameter `login` missing required property `login.password`",
    );
  }

  const path = "/auth/login";

  const options = {
    body: login,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return util.createHttpsRequestPromise<PostAuthLoginResponse>(
    "POST",
    path,
    options,
  );
};

/**
 * Check if a session token is still valid.
 *
 * @param {AuthenticationToken} token See {@link AuthenticationToken}
 * @returns A promise that resolves to a {@link GetAuthCheckResponse} object.
 */
export const getAuthCheck = function (token: AuthenticationToken) {
  const path = "/auth/check";

  try {
    const httpsRequestOptions = util.addTokenAuthorization(token);
    return util.createHttpsRequestPromise<GetAuthCheckResponse>(
      "GET",
      path,
      httpsRequestOptions,
    );
  } catch (err: any) {
    return Promise.reject(err);
  }
};

/**
 * DEPRECATED
 *
 * Logs out of a currently valid session.
 *
 * @param {AuthenticationToken} token See {@link AuthenticationToken}
 * @returns A promise that resolves to an {@link PostAuthLogoutResponse} object.
 * Can also resolve to an {@link ErrorResponse} object.
 */
export const postAuthLogout = function (token: AuthenticationToken) {
  console.warn(
    "The function `postAuthLogout` is using a deprecated endpoint. Please consider removing it as it may not work in the future.",
  );

  const path = "/auth/logout";

  try {
    const httpsRequestOptions = util.addTokenAuthorization(token);
    return util.createHttpsRequestPromise<PostAuthLogoutResponse>(
      "POST",
      path,
      httpsRequestOptions,
    );
  } catch (err: any) {
    return Promise.reject(err);
  }
};

/**
 * DEPRECATED
 *
 * Refreshes a session token that has expired. Session tokens only last for 15
 * minutes; refresh tokens allow you to refresh session tokens for up to a month
 * without needing to re-authenticate. If the refresh token has expired, you
 * will need to log in again; you cannot refresh a refresh token any other way.
 *
 * @param {AuthenticationToken} token See {@link AuthenticationToken}
 * @returns A promise that resolves to an {@link PostAuthRefreshResponse} object.
 * Can also resolve to an {@link ErrorResponse} object.
 */
export const postAuthRefresh = function (token: AuthenticationToken) {
  console.warn(
    "The function `postAuthRefresh` is using a deprecated endpoint. Please consider removing it as it may not work in the future.",
  );

  if (token === undefined) {
    return Promise.reject(
      "ERROR - postAuthRefresh: Parameter `token` cannot be undefined",
    );
  } else if (!("refresh" in token)) {
    return Promise.reject(
      "ERROR - postAuthRefresh: Parameter `token` missing required property `refresh`",
    );
  }

  const path = "/auth/refresh";

  const httpsRequestOptions = {
    body: {
      token: token.refresh,
    },
    headers: {
      "Content-Type": "application/json",
    },
  };

  return util.createHttpsRequestPromise<PostAuthRefreshResponse>(
    "POST",
    path,
    httpsRequestOptions,
  );
};
