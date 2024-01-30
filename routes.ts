
/** 
  * array of routes that are accessible by public
  * these routes are not required to authenticate
  * @type {string[]}
*/
export const publicRoutes = [
    "/",
    "/auth/new-verification"
]


/**
  * array of routes that are used to authenticate
  * these routes will redirect to the /settings endpoint
  * @type {string[]}
*/
export const authRoutes = [
    "/auth/login",
    "/auth/register",
];


/** 
  * prefix for api authentication routes
  * these routes used for api authentication purposes
  * @type {string}
*/
export const apiAuthPrefix = "/api/auth"

/** 
  * the default redirect path after logging in
  * @type {string}
*/
export const DEFAULT_LOGIN_REDIRECT = "/settings"