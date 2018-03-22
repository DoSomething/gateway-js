/**
 * Convert object with query parameters into string.
 *
 * @param  {Object} query
 * @return {String}
 * @see https://stackoverflow.com/a/42604801/4422345 for where this code was taken from.
 */
export const stringifyQuery = (params = {}, prefix) => {
  if (! params) {
    return '';
  }

  const query = Object.keys(params).map((key) => {
    const value = params[key];

    // Properly serialize arrays or objects.
    if (params.constructor === Array) {
      key = `${prefix}[]`;
    } else if (params.constructor === Object) {
      key = (prefix ? `${prefix}[${key}]` : key);
    }

    if (typeof value === 'object') {
      return stringifyQuery(value, key);
    }

    return `${key}=${encodeURIComponent(value)}`;
  });

  return query.join('&');
};

/**
 * Provide a Gateway specific, customized console log output.
 *
 * @param  {string} method
 * @param  {URL} url
 * @param  {Object} options
 * @return {void}
 */
export const gatewayLog = (method, url, options) => {
  console.groupCollapsed('%c GATEWAY: %c [%s] ▷%c︎ %s %c@%c %s %c',
    'background-color: rgba(105,157,215,0.5); color: rgba(33,70,112,1); display: inline-block; font-weight: bold; line-height: 1.5;',
    'background-color: transparent; color: rgba(165, 162, 162, 1); font-weight: normal; letter-spacing: 3px; line-height: 1.5;',
    method,
    'color: black; font-weight: bold; letter-spacing: normal; line-height: 1.5;',
    url.host,
    'color: rgba(165, 162, 162, 0.8); font-weight: normal;',
    'color: black; font-weight: bold;',
    url.pathname,
    'background-color: rgba(105,157,215,0.5);',
  );
  console.log('URL: %s', url.toString());
  console.log('Options:', options);
  console.groupEnd();
};

/**
 * Provide a Gateway specific, customized console error output.
 *
 * @param  {Error} error
 * @return {void}
 */
export const gatewayError = (error) => {
  console.groupCollapsed('%c GATEWAY: %c %s (%i)',
    'background-color: rgba(252,62,73,1); color: rgba(255,255,255,1); display: inline-block; font-weight: bold; line-height: 1.5;',
    'background-color: transparent; color: rgba(252,62,73,1); font-weight: normal; letter-spacing: 3px; line-height: 1.5;',
    error.response.statusText,
    error.response.status,
  );
  console.log('Date: %s', error.date);
  console.log('URL: %s', error.response.url);
  console.log('Code: %s', error.response.status);
  console.log('Message: %s', error.response.statusText);
  console.log('Type: %s', error.response.type);
  console.groupEnd();
}
