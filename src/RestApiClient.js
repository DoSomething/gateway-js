import { get, merge } from 'lodash';

import { stringifyQuery, gatewayLog, gatewayError } from './helpers';

class RestApiClient {
  constructor(baseUrl, overrides = {}) {
    if (!baseUrl) {
      baseUrl = window.location.origin;
    }

    this.baseUrl = new URL(baseUrl);

    this.config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    };

    const csrfToken = this.getCsrfToken();

    if (csrfToken) {
      this.config.headers['X-CSRF-Token'] = csrfToken;
    }

    this.setConfig(this.config, overrides);
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
      query = stringifyQuery(query);
    }

    url.search = query;

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
   * @param  {FormData|Object} body
   * @param  {Object} headers
   * @return {Object}
   */
  post(path, body = {}) {
    const url = new URL(path, this.baseUrl);

    return this.send('POST', url, {
      body: this.setRequestBody(body),
    });
  }

  /**
   * Send a PUT request to the given path URI.
   *
   * @param  {String} path
   * @param  {FormData|Object} body
   * @param  {Object} headers
   * @return {Object}
   */
  put(path, body = {}) {
    const url = new URL(path, this.baseUrl);

    return this.send('PUT', url, {
      body: this.setRequestBody(body),
    });
  }

  /**
   * Send a PATCH request to the given path URI.
   *
   * @param  {String} path
   * @param  {FormData|Object} body
   * @param  {Object} headers
   * @return {Object}
   */
  patch(path, body = {}) {
    const url = new URL(path, this.baseUrl);

    return this.send('PATCH', url, {
      body: this.setRequestBody(body),
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

    gatewayLog(method, url, options);

    return window.fetch(url, options)
      .then(this.checkStatus)
      .then(this.parseJson)
      .catch((error) => {
        gatewayError(error);

        throw error;
      });
  }

  /**
   * Set the configuration options for the client.
   *
   * @see https://github.com/github/fetch/issues/505#issuecomment-293064470
   * @param  {Object} config
   * @param  {Object} overrides
   * @return {void}
   */
  setConfig(config, overrides) {
    merge(config, overrides);

    const contentType = get(overrides, 'headers[Content-Type]', null);

    if (contentType === 'multipart/form-data') {
      delete(config.headers['Content-Type']);
    }
  }

  /**
  * Set the request body depending on type of data.
  *
  * @param  {FormData|Object} data
  * @return {FormData|string}
  */
  setRequestBody(data) {
    if (data instanceof FormData) {
      return data;
    }

    return JSON.stringify(data);
  }
}

export default RestApiClient;
