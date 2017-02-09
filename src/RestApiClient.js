import merge from 'lodash/merge';

class RestApiClient {
  constructor(url, overrides = {}) {

    if (!url) {
      this.url = this.getLocalUrl();
    } else {
      this.url = url;
    }

    this.options = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    const csrfToken = this.getCsrfToken();

    if (csrfToken) {
      this.options.headers['X-CSRF-Token'] = csrfToken;
    }

    merge(this.options, overrides);
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
}

export default RestApiClient;
