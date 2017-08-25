import merge from 'lodash/merge';
import { stringifyQuery } from './helpers';

class RestApiClient {
  constructor(baseUrl, overrides = {}) {
    if (!baseUrl) {
      baseUrl = window.location.origin;
    }

    this.baseUrl = new URL(baseUrl);

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
   * Send a DELETE request to the given path URI.
   *
   * @param  {String} path
   * @return {Object}
   */
  delete(path) {
    const url = new URL(path, this.baseUrl);

    return this.send('DELETE', url);
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
   * Send a GET request to the given path URI.
   *
   * @param  {String} path
   * @param  {Object} query
   * @return {Object}
   */
  get(path, query = {}) {
    const url = new URL(path, this.baseUrl);

    if (query && typeof query === 'object') {
      url.search = stringifyQuery(query);
    }

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
    const url = new URL(path, this.baseUrl);

    return this.send('POST', url, {
      body: JSON.stringify(body)
    });
  }

  /**
   * Send a PUT request to the given path URI.
   *
   * @param  {String} path
   * @param  {Object} body
   * @param  {Object} headers
   * @return {Object}
   */
   put(path, body = {}) {
    const url = new URL(path, this.baseUrl);

    return this.send('PUT', url, {
      body: JSON.stringify(body)
    });
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
    console.groupCollapsed('%c Gateway: %c %s %s %s',
      'background-color: rgba(105,157,215,0.5); color: rgba(33,70,112,1); display: block; font-weight: bold; line-height: 1.5;',
      'background-color: transparent; color: black; font-weight: bold; line-height: 1.5;',
      method,
      url.host,
      url.pathname
    );
    console.log('URL: %s', url.toString());
    console.log('Options:', options);
    console.groupEnd();

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
