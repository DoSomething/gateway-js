import merge from 'lodash/merge';

class RestApiClient {
  constructor(url, overrides = {}) {

    if (!url) {
      this.url = this.getLocalUrl();
    } else {
      this.url = url;
    }

    this.config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: overrides.credentials || 'same-origin',
    };

    const csrfToken = this.getCsrfToken();

    if (csrfToken) {
      this.config.headers['X-CSRF-Token'] = csrfToken;
    }

    merge(this.config, overrides);
  }

  /**
   * Check the HTTP status of API response.
   *
   * @param  {Object} response
   * @return {Object}
   * @throws {Object}
   */
  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const error = new Error(response.statusText);

      error.response = response;

      throw error;
    }
  }

  /**
   * Get the CSRF token if present as a meta tag in the document.
   *
   * @return {String|null}
   */
  getCsrfToken() {
    const element = document.querySelector('meta[name="csrf-token"]');

    return element ? element.getAttribute('content') : null;
  }

  /**
   * Get the local domain url.
   *
   * @return {String}
   */
  getLocalUrl() {
    return `//${window.location.hostname}${window.location.port}`;
  }

  /**
   * Send a GET request to the given path URI.
   *
   * @param  {String} path
   * @param  {Object} query
   * @return {Object}
   */
  get(path, query = {}) {
    const url = `${this.url}/${path}${this.stringifyQuery(query)}`;

    return this.send('GET', url);
  }

  /**
   * Return the JSON data from API response.
   *
   * @param  {Object} response
   * @return {Object}
   */
  parseJson(response) {
    return response.json();
  }

  /**
   * Send a POST request to the given path URI.
   *
   * @param  {String} path
   * @param  {Object} body
   * @param  {Object} headers
   * @return {Object}
   */
  post(path, body = {}) {
    const url = `${this.url}/${path}`;

    return this.send('POST', url, {
      body: JSON.stringify(body)
    });
  }

  /**
   * Convert object with query parameters into string.
   *
   * @param  {Object} query
   * @return {String}
   */
  stringifyQuery(query = {}) {
    let urlParams = [];

    Object.keys(query).forEach((key) => {
      urlParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`);
    });

    if (urlParams.length === 0) {
      return '';
    }

    return `?${urlParams.join('&')}`;
  }

  /**
   * Send an API request using fetch() and return response.
   *
   * @param  {String} method
   * @param  {String} url
   * @param  {Object} data
   * @return {Promise}
   */
  send(method, url, data = {}) {
    const options = {
      method: method,
      headers: this.config.headers,
      credentials: this.config.credentials,
    };

    merge(options, data);

    // Developer Output:
    console.log('%c API Client %s Request:',
      'background-color: rgba(105,157,215,0.5); color: rgba(33,70,112,1); display: block; font-weight: bold; line-height: 1.5;',
      method
    );
    console.log('URL: \n%s', url);
    console.log('Options: \n%o', options);

    return window.fetch(url, options)
      .then(this.checkStatus)
      .then(this.parseJson)
      .catch((data) => {
        console.log(data);
        console.error('um, there was an error! handle that shizzzzz!');
      });
  }
}

export default RestApiClient;
