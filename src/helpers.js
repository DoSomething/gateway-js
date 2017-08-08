  /**
   * Convert object with query parameters into string.
   *
   * @param  {Object} query
   * @return {String}
   * @see https://stackoverflow.com/a/42604801/4422345 for where this code was taken from.
   */
export const stringifyQuery = (params = {}, prefix) => {
  const query = Object.keys(params ? params : {}).map((key) => {
    const value  = params[key];

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

  return [].concat.apply([], query).join('&');
};
